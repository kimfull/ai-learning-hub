/* ==========================================================================
   srs.js — 間隔複習排程（Leitner）＋ 交錯練習組題

   兩個學習原理落在這裡：
   · spaced repetition：到期才複習，答對就拉長間隔，答錯就退回來
   · interleaving：同一輪把「聽辨／解碼／聽寫」打散，不整段只做一種。
     連續做同一類會產生假流暢，交錯練才記得住。
   ========================================================================== */
(function (global) {
  'use strict';

  var W = global.Words;

  /** 從一個 mastery key 反推出一道題 */
  function buildFromKey(key) {
    var bits = key.split(':');
    var kind = bits[0], id = bits.slice(1).join(':');

    if (kind === 'phoneme') {
      var pairs = global.PHONEMES.minimalPairs.filter(function (p) {
        return p.pa === id || p.pb === id;
      });
      if (pairs.length) {
        var p = pairs[Math.floor(Math.random() * pairs.length)];
        return { type: 'minimal-pair', a: p.a, b: p.b, pa: p.pa, pb: p.pb, zh: p.zh, key: key };
      }
      return { type: 'phoneme-card', id: id, key: key };
    }

    if (kind === 'word') {
      var item = findWord(id);
      if (!item) return null;
      /* 隨機在「聽寫」和「朗讀」之間切換——同一個字要能雙向處理才算會 */
      return Math.random() < 0.55
        ? { type: 'dictation', item: item, key: key }
        : { type: 'read-aloud', item: item, key: key, plain: true,
            prompt: '複習：唸出這個字' };
    }

    if (kind === 'rule') {
      var q = pickRuleQuestion(id);
      if (q) { q.key = key; return q; }
      return null;
    }

    if (kind === 'skill') {
      if (id === 'segment' || id === 'count') {
        var w2 = W.pick(W.merge('blends_end', 'digraphs', 'cvc_a', 'cvc_i'), 1)[0];
        return { type: Math.random() < 0.5 ? 'count' : 'segment', item: w2, key: key };
      }
      if (id === 'swap') {
        /* 換音題現成的組合不多，用 CVC 字庫即時湊一組同韻的干擾選項 */
        var pool = W.merge('cvc_a', 'cvc_i', 'cvc_o', 'cvc_u', 'cvc_e');
        var base = W.pick(pool, 1)[0];
        var sameTail = pool.filter(function (x) {
          return x.w !== base.w && x.w.slice(1) === base.w.slice(1);
        });
        if (sameTail.length) {
          var ansW = W.pick(sameTail, 1)[0];
          var firstPh = global.PHONEMES.get(ansW.ph[0]);
          var distractors = W.pick(pool.filter(function (x) {
            return x.w !== base.w && x.w !== ansW.w;
          }), 3).map(function (x) { return x.w; });
          return { type: 'swap', from: base.w, pos: 'first',
                   newSound: firstPh ? firstPh.sym : ansW.w[0],
                   answer: ansW.w, options: [ansW.w].concat(distractors), key: key };
        }
        return { type: 'segment', item: base, key: key };
      }
      if (id === 'nonsense') {
        var pools = Object.keys(global.WORDS.nonsense);
        var pool = pools[Math.floor(Math.random() * pools.length)];
        return { type: 'nonsense', word: W.pick(global.WORDS.nonsense[pool], 1)[0], key: key };
      }
      if (id === 'fluency') {
        var sets = Object.keys(global.WORDS.sentences);
        var s = sets[Math.floor(Math.random() * sets.length)];
        return { type: 'sentence', text: W.pick(global.WORDS.sentences[s], 1)[0], key: key };
      }
    }
    return null;
  }

  var WORD_INDEX = null;
  function findWord(w) {
    if (!WORD_INDEX) {
      WORD_INDEX = {};
      Object.keys(global.WORDS).forEach(function (g) {
        var arr = global.WORDS[g];
        if (!Array.isArray(arr)) return;
        arr.forEach(function (it) { if (it && it.w) WORD_INDEX[it.w] = it; });
      });
    }
    return WORD_INDEX[w] || null;
  }

  /** 從所有課程的測驗題裡撈一題同規則的 */
  var RULE_INDEX = null;
  function pickRuleQuestion(rule) {
    if (!RULE_INDEX) {
      RULE_INDEX = {};
      Object.keys(global.Curriculum.lessons).forEach(function (lid) {
        var l = global.Curriculum.lessons[lid];
        (l.quiz || []).concat(l.ex || []).forEach(function (q) {
          if (!q.rule) return;
          (RULE_INDEX[q.rule] = RULE_INDEX[q.rule] || []).push(q);
        });
      });
    }
    var pool = RULE_INDEX[rule];
    if (!pool || !pool.length) return null;
    return JSON.parse(JSON.stringify(pool[Math.floor(Math.random() * pool.length)]));
  }

  var SRS = {
    /** 今天到期的數量 */
    dueCount: function () { return global.Store.dueItems().length; },

    /**
     * 產生一輪複習題。
     * 取到期項目，交錯排列，最多 n 題（預設 12）。
     */
    session: function (n) {
      n = n || 12;
      var due = global.Store.dueItems(n * 2);
      var qs = [];
      due.forEach(function (d) {
        if (qs.length >= n) return;
        var q = buildFromKey(d.key);
        if (q) { q.__srsKey = d.key; qs.push(q); }
      });

      /* 不足就補「最弱項」，確保每次複習都有事做 */
      if (qs.length < Math.min(6, n)) {
        var weak = global.Store.weakest(n);
        weak.forEach(function (w) {
          if (qs.length >= n) return;
          if (qs.some(function (q) { return q.__srsKey === w.key; })) return;
          var q = buildFromKey(w.key);
          if (q) { q.__srsKey = w.key; qs.push(q); }
        });
      }

      /* 還是不夠（例如剛開始學）→ 用目前解鎖範圍的內容隨機補 */
      if (qs.length < Math.min(6, n)) {
        var d = global.Store.get().diagnosis;
        var lv = d ? d.placement : 2;
        SRS.fallbackQuestions(lv, Math.min(6, n) - qs.length).forEach(function (q) { qs.push(q); });
      }

      return interleave(qs);
    },

    /** 沒有到期項目時的預設練習（依目前 Level 給） */
    fallbackQuestions: function (lv, n) {
      var groups = ['cvc_a', 'cvc_i', 'cvc_o', 'cvc_u', 'cvc_e'];
      if (lv >= 3) groups = groups.concat('blends_s', 'blends_r', 'blends_l', 'digraphs');
      if (lv >= 4) groups = groups.concat('silent_e');
      if (lv >= 5) groups = groups.concat('vt_ai_ay', 'vt_ee_ea', 'vt_oa_ow', 'vt_oo');
      if (lv >= 6) groups = groups.concat('r_ctrl', 'diphthongs');
      if (lv >= 7) groups = groups.concat('multi');

      var pool = W.merge.apply(W, groups);
      var picks = W.pick(pool, n);
      var types = ['dictation', 'read-aloud', 'segment', 'blend'];
      return picks.map(function (item, i) {
        var t = types[i % types.length];
        var q = { type: t, item: item, key: 'word:' + item.w };
        if (t === 'read-aloud') { q.plain = true; q.prompt = '唸出這個字'; }
        return q;
      });
    },

    /** 複習完更新排程（Exercises.render 已經呼叫 Store.record，這裡只補統計） */
    finish: function (results) {
      var ok = results.filter(function (r) { return r.correct; }).length;
      global.Store.touchDay(Math.round(results.length * 0.6));
      global.Store.logEvent('drill', { n: results.length, ok: ok });
      global.Store.save();
      return { total: results.length, ok: ok, rate: results.length ? ok / results.length : 0 };
    }
  };

  /** 交錯：讓相鄰兩題盡量不同型 */
  function interleave(qs) {
    var byType = {};
    qs.forEach(function (q) { (byType[q.type] = byType[q.type] || []).push(q); });
    var types = Object.keys(byType);
    var out = [], guard = 0;
    while (out.length < qs.length && guard++ < 500) {
      types.forEach(function (t) {
        if (byType[t].length) out.push(byType[t].shift());
      });
    }
    return out;
  }

  global.SRS = SRS;
})(window);
