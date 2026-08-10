/* ==========================================================================
   curriculum.js — Level 0–10 課程架構、排課邏輯、通過標準

   設計原則（有實證基礎的部分）：
   · Structured Literacy：由簡到繁、明示教學、每個規則都先講再練
   · Mastery learning：沒到標準不放行；到了標準就快速通過，不浪費時間
   · Retrieval practice：每課都要「回想」而不是「重看」
   · Interleaving：新東西和舊東西交錯練，不整段只練一種
   · Spaced repetition：Leitner 盒子排程（見 storage.js）
   ========================================================================== */
(function (global) {
  'use strict';

  var LEVELS = [
    {
      id: 0, key: 'L0', icon: '🧭',
      title: '初始能力診斷',
      subtitle: '先找出你的真實起點與弱點',
      goal: '不猜、不假設。用五個小測驗量出你的音素辨識、字母音、解碼、聽寫、多音節能力，據此決定你要從哪一 Level 開始。',
      why: '大多數中文母語成人不是「完全不會」，而是「某幾塊破洞」。直接從頭教會浪費時間，直接跳級又會塌。',
      mins: 30, days: 1,
      criteria: '完成全部五個診斷區塊，取得個人化起點與弱點清單。',
      lessons: ['L0-01']
    },
    {
      id: 1, key: 'L1', icon: '🔤',
      title: '音素覺識與字母音',
      subtitle: '把「字母名稱」和「字母聲音」徹底分開',
      goal: '聽得出英文單字由哪些音組成；看到 26 個字母能立刻說出它的「音」而不是「名字」。',
      why: '中文是音節文字，你的大腦從小沒有被訓練去拆「音素」。這一層沒打好，後面全是死背。',
      mins: 25, days: 6,
      criteria: '字母音測驗 24/26 正確且每題 2 秒內；音素辨識 ≥ 85%；能完成辨音、拆音、合音、換音四種操作。',
      lessons: ['L1-01', 'L1-02', 'L1-03', 'L1-04', 'L1-05', 'L1-06']
    },
    {
      id: 2, key: 'L2', icon: '🐱',
      title: 'CVC 與短母音',
      subtitle: '五個短母音，英文的地基',
      goal: '看到 cat / bed / sit / hot / cup 這類三字母單字，能一次唸對；聽到能拼對。',
      why: '短母音是中文母語者最大的痛點——你的耳朵目前很可能把 /æ/ /ɛ/ /ʌ/ 聽成同一個音。',
      mins: 30, days: 8,
      criteria: '五個短母音的最小配對聽辨 ≥ 85%；CVC 假字朗讀 ≥ 90%；CVC 聽寫 ≥ 85%。',
      lessons: ['L2-01', 'L2-02', 'L2-03', 'L2-04', 'L2-05', 'L2-06', 'L2-07']
    },
    {
      id: 3, key: 'L3', icon: '🚂',
      title: 'Blends 與 Digraphs',
      subtitle: '子音串在一起、兩個字母發一個音',
      goal: '分辨「兩個子音各唸各的」(blend: st-, fl-) 和「兩個字母合成一個新音」(digraph: sh, ch, th)。',
      why: '中文音節沒有子音串（沒有 str- 這種開頭），你會不自覺塞母音進去（street→si-treet）。',
      mins: 30, days: 8,
      criteria: 'blend/digraph 分類 ≥ 90%；含 blend 的假字朗讀 ≥ 85%；聽寫 ≥ 85%。',
      lessons: ['L3-01', 'L3-02', 'L3-03', 'L3-04', 'L3-05', 'L3-06']
    },
    {
      id: 4, key: 'L4', icon: '🎂',
      title: 'Silent E 與長母音',
      subtitle: '字尾一個不出聲的 e，改變整個字',
      goal: '看到 a_e / i_e / o_e / u_e / e_e 就知道母音要唸「字母名稱」；能區分 cap / cape。',
      why: '這是英文第一個真正的「規則」，學會之後你的可讀字量會跳一大階。',
      mins: 30, days: 6,
      criteria: 'cap/cape 型對照辨識 ≥ 90%；silent-e 假字朗讀 ≥ 85%；聽寫 ≥ 80%。',
      lessons: ['L4-01', 'L4-02', 'L4-03', 'L4-04', 'L4-05']
    },
    {
      id: 5, key: 'L5', icon: '🚤',
      title: 'Vowel Teams',
      subtitle: '兩個母音字母一起走',
      goal: '掌握 ai/ay、ee/ea、oa/ow、oo、igh/ie 等組合，並知道哪些有兩種讀法。',
      why: '這裡開始出現「同一個拼法兩種音」（ea 在 eat / bread），必須學會用「試兩次」策略。',
      mins: 30, days: 7,
      criteria: 'vowel team 朗讀 ≥ 85%；「試兩次」策略能正確使用；聽寫 ≥ 80%。',
      lessons: ['L5-01', 'L5-02', 'L5-03', 'L5-04', 'L5-05']
    },
    {
      id: 6, key: 'L6', icon: '🚗',
      title: 'R 控制母音與雙母音',
      subtitle: 'ar / or / er / ir / ur、oi / oy / ou / ow',
      goal: '母音後面接 r 時整個變一個新音；掌握 oi/oy、ou/ow 的雙母音。',
      why: 'er / ir / ur 唸起來完全一樣但拼法不同——這是聽寫最容易錯的地方。',
      mins: 30, days: 6,
      criteria: 'r 控制母音朗讀 ≥ 85%；er/ir/ur 拼寫選擇 ≥ 75%（有例外，標準略低）。',
      lessons: ['L6-01', 'L6-02', 'L6-03', 'L6-04', 'L6-05']
    },
    {
      id: 7, key: 'L7', icon: '🧩',
      title: '音節切分與多音節解碼',
      subtitle: '長單字不用背，用切的',
      goal: '認識六種音節型態，會用 VC/CV、V/CV 等切分法，把 computer、important 這種字切開唸。',
      why: '這一關過了，你才真正達到「見字能讀」——因為真實英文裡長字佔多數。',
      mins: 35, days: 8,
      criteria: '音節切分 ≥ 85%；三音節以上假字朗讀 ≥ 80%；重音位置判斷 ≥ 70%。',
      lessons: ['L7-01', 'L7-02', 'L7-03', 'L7-04', 'L7-05', 'L7-06']
    },
    {
      id: 8, key: 'L8', icon: '✍️',
      title: '進階拼寫規則（Encoding）',
      subtitle: '從「聽得懂」到「寫得出」',
      goal: '掌握 FLOSS、-ck/-k、-tch/-ch、-dge/-ge、子音加倍、去 e 加 ing、y 變 i 等拼寫規則。',
      why: '「聽音能寫」不是靠猜，而是靠規則。這些規則能解釋英文 80% 以上的拼寫決策。',
      mins: 30, days: 8,
      criteria: '拼寫規則測驗 ≥ 85%；20 字聽寫 ≥ 80%（含規則字與例外字）。',
      lessons: ['L8-01', 'L8-02', 'L8-03', 'L8-04', 'L8-05', 'L8-06']
    },
    {
      id: 9, key: 'L9', icon: '🌳',
      title: '構詞：字首、字尾、字根',
      subtitle: '讓拼讀能力延伸到學術與專業單字',
      goal: '用 un-/re-/pre-、-tion/-ment/-able、port/spect/dict 等零件，拆解並拼寫長單字。',
      why: '英文長字幾乎都是組合出來的。學會零件，等於一次拿下數千字。',
      mins: 30, days: 7,
      criteria: '構詞拆解 ≥ 85%；用字根推測生字意思 ≥ 70%；長字聽寫 ≥ 75%。',
      lessons: ['L9-01', 'L9-02', 'L9-03', 'L9-04', 'L9-05']
    },
    {
      id: 10, key: 'L10', icon: '🏁',
      title: '實戰流暢度與總驗收',
      subtitle: '用沒看過的字證明你真的會了',
      goal: '在限時內解碼陌生真字與假字、完成 30 字聽寫、朗讀真實段落。',
      why: '「上完課」不等於「會了」。驗收標準是能力，不是進度條。',
      mins: 40, days: 5,
      criteria: '總驗收三項全過：陌生真字 ≥ 85%、30 字聽寫 ≥ 80%、多音節假字 ≥ 75%。',
      lessons: ['L10-01', 'L10-02', 'L10-03', 'L10-04']
    }
  ];

  /* ---------- 課程註冊表（由 lessons-l*.js 填入） ---------- */
  var LESSONS = {};

  function registerLesson(lesson) {
    LESSONS[lesson.id] = lesson;
  }

  var Curriculum = {
    levels: LEVELS,
    lessons: LESSONS,
    register: registerLesson,

    level: function (id) {
      return LEVELS.filter(function (l) { return l.id === id; })[0] || null;
    },

    lesson: function (id) { return LESSONS[id] || null; },

    lessonsOf: function (levelId) {
      var lv = Curriculum.level(levelId);
      if (!lv) return [];
      return lv.lessons.map(function (id) { return LESSONS[id]; }).filter(Boolean);
    },

    /** 該 Level 的完成率 0–1 */
    levelProgress: function (levelId) {
      var lv = Curriculum.level(levelId);
      if (!lv || !lv.lessons.length) return 0;
      var done = lv.lessons.filter(function (id) { return global.Store.isLessonDone(id); }).length;
      return done / lv.lessons.length;
    },

    levelDone: function (levelId) {
      return Curriculum.levelProgress(levelId) >= 1;
    },

    /** Level 是否解鎖：L0 永遠開；其他要前一 Level 完成，或診斷把你放在這裡 */
    levelUnlocked: function (levelId) {
      if (levelId === 0) return true;
      var d = global.Store.get().diagnosis;
      var placed = d && d.placement != null ? d.placement : 1;
      if (levelId <= placed) return true;
      return Curriculum.levelDone(levelId - 1);
    },

    /** 下一個該做的東西：優先「到期複習」，其次「未完成的課」 */
    nextUp: function () {
      var s = global.Store.get();
      if (!s.diagnosis) return { type: 'lesson', id: 'L0-01', why: '先做診斷，才知道你要從哪開始' };

      var due = global.Store.dueItems(1);
      var doneToday = s.streak.lastDay === global.Store.today();
      if (due.length >= 6 && !doneToday) {
        return { type: 'drill', why: '有 ' + global.Store.dueItems().length + ' 項到了複習時間，先熱身 5 分鐘' };
      }

      for (var i = 0; i < LEVELS.length; i++) {
        var lv = LEVELS[i];
        if (!Curriculum.levelUnlocked(lv.id)) continue;
        for (var j = 0; j < lv.lessons.length; j++) {
          if (!global.Store.isLessonDone(lv.lessons[j])) {
            return { type: 'lesson', id: lv.lessons[j], why: lv.title };
          }
        }
      }
      return { type: 'done', why: '全部課程完成，進總驗收' };
    },

    /** 整體完成度 0–1 */
    overall: function () {
      var all = 0, done = 0;
      LEVELS.forEach(function (lv) {
        all += lv.lessons.length;
        done += lv.lessons.filter(function (id) { return global.Store.isLessonDone(id); }).length;
      });
      return all ? done / all : 0;
    },

    /** 預估剩餘天數（依每天可用分鐘算） */
    estimate: function () {
      var s = global.Store.get();
      var perDay = s.profile.dailyMinutes || 25;
      var mins = 0;
      LEVELS.forEach(function (lv) {
        lv.lessons.forEach(function (id) {
          if (global.Store.isLessonDone(id)) return;
          var l = LESSONS[id];
          mins += (l && l.mins) || lv.mins || 25;
        });
      });
      /* 複習時間約佔 30% */
      mins = mins * 1.3;
      return { minutes: Math.round(mins), days: Math.ceil(mins / perDay), weeks: Math.ceil(mins / perDay / 6) };
    },

    /**
     * 依錯誤紀錄決定「補強優先序」。
     * 回傳建議清單，首頁與錯誤分析頁都會用。
     */
    remediation: function () {
      var out = [];
      var causes = global.Store.topCauses();
      var weakPh = global.Store.weakest(5, 'phoneme:');
      var weakRule = global.Store.weakest(3, 'rule:');

      if (causes.length && causes[0].n >= 3) {
        var c = causes[0];
        out.push({
          kind: 'cause', key: c.cause,
          title: '你最常卡在「' + c.info.label + '」',
          desc: c.info.hint,
          action: c.cause === 'listening' || c.cause === 'phoneme'
            ? '多做聽辨與拆音練習，減少看字作答'
            : c.cause === 'articulation'
              ? '去看口腔動畫（Sounds of Speech），先做對嘴型再練字'
              : '回頭把規則重讀一次，然後只做規則題'
        });
      }
      weakPh.forEach(function (w) {
        var id = w.key.split(':')[1];
        var p = global.PHONEMES.get(id);
        if (!p) return;
        out.push({
          kind: 'phoneme', key: id,
          title: '弱項音：' + p.sym + '（' + p.key + '）',
          desc: p.trap,
          action: '做 10 題最小配對聽辨 + 看口腔動畫'
        });
      });
      weakRule.forEach(function (w) {
        out.push({
          kind: 'rule', key: w.key.split(':')[1],
          title: '弱項規則：' + w.key.split(':')[1],
          desc: '正確率 ' + Math.round((1 - w.rate) * 100) + '%',
          action: '重讀規則卡，再做 10 題規則測驗'
        });
      });
      return out;
    }
  };

  global.Curriculum = Curriculum;
})(window);
