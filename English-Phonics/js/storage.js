/* ==========================================================================
   storage.js — 學習狀態儲存（localStorage）
   記錄：完成的課、測驗結果、錯誤歸因、薄弱音素／規則、熟練度、SRS 排程。
   所有資料留在這台裝置，不上傳。
   ========================================================================== */
(function (global) {
  'use strict';

  var KEY = 'phonics.state.v1';

  /* 錯誤歸因的六大類——批改時一定要歸到其中一類，才能給對應補強 */
  var CAUSES = {
    listening:    { label: '聽音辨識', hint: '沒聽清楚聲音本身（音量、語速、相似音混淆）' },
    phoneme:      { label: '音素切分', hint: '聽到了，但拆不出有幾個音、順序是什麼' },
    rule:         { label: '拼讀規則', hint: '不知道或用錯了字母→聲音的規則' },
    articulation: { label: '發音動作', hint: '嘴巴做不出這個音（中文沒有的音最常見）' },
    spelling:     { label: '拼寫規則', hint: '音是對的，但選錯了字母組合' },
    memory:       { label: '記憶提取', hint: '規則會、字認得，但當下想不起來' }
  };

  var LEITNER_DAYS = [0, 1, 2, 4, 8, 16, 32];   /* box 0..6 的複習間隔 */

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function dayNum(dateStr) {
    var p = (dateStr || today()).split('-');
    return Math.floor(Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000);
  }
  function addDays(dateStr, n) {
    var ms = (dayNum(dateStr) + n) * 86400000;
    var d = new Date(ms);
    return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate());
  }

  function blank() {
    return {
      version: 1,
      createdAt: today(),
      profile: { dailyMinutes: 25, startDate: today() },
      diagnosis: null,            /* {date, sections:{}, placement, weakSounds:[]} */
      lessons: {},                /* lessonId -> {status, score, total, attempts, lastAt} */
      tasks: {},                  /* taskId -> true */
      quizzes: [],                /* {lessonId, date, score, total, causes:{}} */
      errors: { byCause: {}, byPhoneme: {}, byRule: {}, byWord: {} },
      mastery: {},                /* key -> {box, streak, seen, wrong, due, lastAt} */
      streak: { days: 0, lastDay: null, totalMinutes: 0 },
      log: []                     /* 最近 200 筆事件 */
    };
  }

  var state = null;

  function load() {
    if (state) return state;
    try {
      var raw = localStorage.getItem(KEY);
      state = raw ? JSON.parse(raw) : blank();
    } catch (e) { state = blank(); }
    /* 欄位補齊，避免舊資料缺 key */
    var b = blank();
    for (var k in b) if (!(k in state)) state[k] = b[k];
    if (!state.errors.byWord) state.errors.byWord = {};
    return state;
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
    if (Store.onchange) Store.onchange(state);
  }

  var Store = {
    CAUSES: CAUSES,
    onchange: null,

    get: function () { return load(); },
    today: today,
    addDays: addDays,
    dayNum: dayNum,

    save: save,

    reset: function () { state = blank(); save(); },

    exportJSON: function () { return JSON.stringify(load(), null, 2); },

    importJSON: function (txt) {
      try {
        var o = JSON.parse(txt);
        if (o && o.version) { state = o; save(); return true; }
      } catch (e) {}
      return false;
    },

    /* ---------- 每日出席 ---------- */
    touchDay: function (minutes) {
      var s = load(), t = today();
      if (s.streak.lastDay !== t) {
        s.streak.days = (s.streak.lastDay && dayNum(t) - dayNum(s.streak.lastDay) === 1)
          ? s.streak.days + 1 : 1;
        s.streak.lastDay = t;
      }
      if (minutes) s.streak.totalMinutes += minutes;
      save();
    },

    /* ---------- 課程 ---------- */
    lesson: function (id) { return load().lessons[id] || null; },

    setLesson: function (id, patch) {
      var s = load();
      s.lessons[id] = Object.assign({ attempts: 0 }, s.lessons[id] || {}, patch, { lastAt: today() });
      save();
      return s.lessons[id];
    },

    completeLesson: function (id, score, total) {
      var s = load();
      var prev = s.lessons[id] || { attempts: 0 };
      s.lessons[id] = {
        status: 'done',
        score: Math.max(score, prev.score || 0),
        total: total,
        attempts: (prev.attempts || 0) + 1,
        lastAt: today()
      };
      Store.logEvent('lesson-done', { id: id, score: score, total: total });
      save();
    },

    isLessonDone: function (id) {
      var l = load().lessons[id];
      return !!(l && l.status === 'done');
    },

    /* ---------- 小任務勾選 ---------- */
    toggleTask: function (taskId, on) {
      var s = load();
      if (on == null) on = !s.tasks[taskId];
      if (on) s.tasks[taskId] = true; else delete s.tasks[taskId];
      save();
      return on;
    },
    isTaskDone: function (taskId) { return !!load().tasks[taskId]; },

    /* ---------- 測驗 ---------- */
    recordQuiz: function (lessonId, score, total, causes) {
      var s = load();
      s.quizzes.push({ lessonId: lessonId, date: today(), score: score, total: total, causes: causes || {} });
      if (s.quizzes.length > 400) s.quizzes = s.quizzes.slice(-400);
      save();
    },

    /* ---------- 錯誤歸因 ---------- */
    /**
     * 記錄一次作答。
     * @param {object} info {key, cause, correct, phoneme, rule, word}
     * key 是熟練度追蹤的識別字串，如 'phoneme:/æ/'、'rule:silent-e'、'word:cake'
     */
    record: function (info) {
      var s = load();
      var ok = !!info.correct;

      if (!ok && info.cause) {
        s.errors.byCause[info.cause] = (s.errors.byCause[info.cause] || 0) + 1;
      }
      ['phoneme', 'rule', 'word'].forEach(function (f) {
        if (!info[f]) return;
        var bucket = s.errors['by' + f.charAt(0).toUpperCase() + f.slice(1)];
        var rec = bucket[info[f]] || { seen: 0, wrong: 0 };
        rec.seen++; if (!ok) rec.wrong++;
        bucket[info[f]] = rec;
      });

      if (info.key) Store.updateMastery(info.key, ok);
      save();
    },

    /* ---------- 熟練度 / Leitner SRS ---------- */
    updateMastery: function (key, correct) {
      var s = load();
      var m = s.mastery[key] || { box: 0, streak: 0, seen: 0, wrong: 0, due: today(), lastAt: null };
      m.seen++;
      if (correct) {
        m.streak++;
        m.box = Math.min(LEITNER_DAYS.length - 1, m.box + 1);
      } else {
        m.wrong++;
        m.streak = 0;
        m.box = Math.max(0, m.box - 2);   /* 錯了退兩格，強迫多練 */
      }
      m.lastAt = today();
      m.due = addDays(today(), LEITNER_DAYS[m.box]);
      s.mastery[key] = m;
      save();
      return m;
    },

    masteryOf: function (key) {
      var m = load().mastery[key];
      if (!m) return 0;
      return Math.round((m.box / (LEITNER_DAYS.length - 1)) * 100);
    },

    /** 今天該複習的項目（box 越低越優先） */
    dueItems: function (limit) {
      var s = load(), t = dayNum(today()), out = [];
      for (var k in s.mastery) {
        var m = s.mastery[k];
        if (dayNum(m.due) <= t) out.push({ key: k, m: m });
      }
      out.sort(function (a, b) {
        if (a.m.box !== b.m.box) return a.m.box - b.m.box;
        return (b.m.wrong / Math.max(1, b.m.seen)) - (a.m.wrong / Math.max(1, a.m.seen));
      });
      return limit ? out.slice(0, limit) : out;
    },

    /** 最弱的 n 個項目（不管到期與否） */
    weakest: function (n, prefix) {
      var s = load(), out = [];
      for (var k in s.mastery) {
        if (prefix && k.indexOf(prefix) !== 0) continue;
        var m = s.mastery[k];
        if (m.seen < 2) continue;
        out.push({ key: k, m: m, rate: m.wrong / m.seen });
      }
      out.sort(function (a, b) { return b.rate - a.rate || a.m.box - b.m.box; });
      return out.slice(0, n || 8);
    },

    /** 錯誤成因排行，用來決定要補「聽力」還是「規則」 */
    topCauses: function () {
      var s = load(), out = [];
      for (var c in s.errors.byCause) out.push({ cause: c, n: s.errors.byCause[c], info: CAUSES[c] });
      out.sort(function (a, b) { return b.n - a.n; });
      return out;
    },

    /* ---------- 診斷 ---------- */
    setDiagnosis: function (d) { var s = load(); s.diagnosis = d; save(); },

    /* ---------- 事件記錄 ---------- */
    logEvent: function (type, data) {
      var s = load();
      s.log.push({ t: type, d: data, at: new Date().toISOString() });
      if (s.log.length > 200) s.log = s.log.slice(-200);
    }
  };

  global.Store = Store;
})(window);
