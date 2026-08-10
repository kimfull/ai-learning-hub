/* ==========================================================================
   diagnose.js — Level 0 初始能力診斷
   五個區塊，約 30 分鐘，量出五種能力，決定你的起點 Level 與弱點清單。

   為什麼要診斷：中文母語成人幾乎不會是「零基礎」，而是某幾層有洞。
   直接從 L1 教會浪費幾週，直接跳到 L5 又會塌。用資料決定，不用猜。
   ========================================================================== */
(function (global) {
  'use strict';

  var W = global.Words;

  /* 每個區塊回報一組「技能通過率」，用來定位起點 */
  var SECTIONS = [
    {
      id: 'pa', title: '第 1 區：音素辨識', icon: '👂',
      intro: '我唸一個字，你選出聽到的是哪一個。這兩個字只差一個音——這是最能測出「耳朵有沒有被訓練過」的方式。',
      build: function () {
        var pairs = W.pick(global.PHONEMES.minimalPairs, 10);
        return pairs.map(function (p) {
          return { type: 'minimal-pair', a: p.a, b: p.b, pa: p.pa, pb: p.pb, zh: p.zh, skill: 'pa' };
        });
      }
    },
    {
      id: 'letter', title: '第 2 區：字母音', icon: '🔤',
      intro: '看到字母，選出它的「聲音」——不是它的名字。很多人卡在這裡：知道 b 叫「bee」，但唸不出 /b/。',
      build: function () {
        var set = [
          { L:'b', ans:'b', wrong:['p','d','v'] }, { L:'v', ans:'v', wrong:['w','f','b'] },
          { L:'z', ans:'z', wrong:['s','j','th'] }, { L:'r', ans:'r', wrong:['l','w','y'] },
          { L:'l', ans:'l', wrong:['r','n','y'] }, { L:'g', ans:'g', wrong:['k','j','h'] },
          { L:'j', ans:'j', wrong:['ch','y','zh'] }, { L:'y', ans:'y', wrong:['j','i_','w'] },
          { L:'c', ans:'k', wrong:['s','ch','g'] }, { L:'x', ans:'k', wrong:['z','sh','s'] },
          { L:'w', ans:'w', wrong:['v','oo','y'] }, { L:'h', ans:'h', wrong:['f','ch','sh'] }
        ];
        return W.shuffle(set).slice(0, 10).map(function (s) {
          var ansP = global.PHONEMES.get(s.ans);
          var opts = [ansP.key].concat(s.wrong.map(function (w) {
            var p = global.PHONEMES.get(w); return p ? p.key : w;
          }));
          return {
            type: 'rule-pick', skill: 'letter',
            prompt: '字母 <b style="font-size:34px;font-family:var(--font-word)">' + s.L +
                    '</b> 的「聲音」，出現在下面哪個字的開頭？',
            options: W.shuffle(opts),
            answerWord: ansP.key,
            phoneme: ansP.sym,
            why: '字母 ' + s.L + ' 的音是 ' + ansP.sym + '，像 ' + ansP.key + ' 的開頭。' + ansP.zh
          };
        });
      }
    },
    {
      id: 'decode', title: '第 3 區：解碼（看字讀音）', icon: '👁️',
      intro: '用假字測驗。假字不可能背過，所以能測出你是「真的會拼讀」還是「認得這個字」。難度由淺到深。',
      build: function () {
        var N = global.WORDS.nonsense;
        return [
          { type:'nonsense', word: W.pick(N.cvc,1)[0],       skill:'d_cvc',   rule:'cvc' },
          { type:'nonsense', word: W.pick(N.cvc,1)[0],       skill:'d_cvc',   rule:'cvc' },
          { type:'nonsense', word: W.pick(N.blend,1)[0],     skill:'d_blend', rule:'blend' },
          { type:'nonsense', word: W.pick(N.digraph,1)[0],   skill:'d_blend', rule:'digraph' },
          { type:'nonsense', word: W.pick(N.silent_e,1)[0],  skill:'d_vce',   rule:'silent-e' },
          { type:'nonsense', word: W.pick(N.vowelteam,1)[0], skill:'d_vt',    rule:'vowel-team' },
          { type:'nonsense', word: W.pick(N.rctrl,1)[0],     skill:'d_r',     rule:'r-controlled' },
          { type:'nonsense', word: W.pick(N.multi,1)[0],     skill:'d_multi', rule:'syllable' }
        ];
      }
    },
    {
      id: 'spell', title: '第 4 區：聽寫（聽音寫字）', icon: '✍️',
      intro: '我唸字，你拼出來。這一區同時測「聽得準不準」和「拼寫規則會不會」——錯了我會告訴你是哪一種。',
      build: function () {
        return [
          { type:'dictation', item: W.pick(global.WORDS.cvc_a,1)[0],   skill:'s_cvc' },
          { type:'dictation', item: W.pick(global.WORDS.cvc_e,1)[0],   skill:'s_cvc' },
          { type:'dictation', item: W.pick(global.WORDS.cvc_u,1)[0],   skill:'s_cvc' },
          { type:'dictation', item: W.pick(global.WORDS.blends_s,1)[0],skill:'s_blend' },
          { type:'dictation', item: W.pick(global.WORDS.digraphs,1)[0],skill:'s_blend' },
          { type:'dictation', item: W.pick(global.WORDS.silent_e,1)[0],skill:'s_vce' },
          { type:'dictation', item: W.pick(global.WORDS.vt_ee_ea,1)[0],skill:'s_vt' },
          { type:'dictation', item: W.pick(global.WORDS.r_ctrl,1)[0],  skill:'s_r' }
        ];
      }
    },
    {
      id: 'multi', title: '第 5 區：多音節與音素切分', icon: '🧩',
      intro: '長單字要能切開來處理，還要聽得出一個字有幾個音。這一區決定你能不能讀真實文章。',
      build: function () {
        var m = W.pick(global.WORDS.multi, 2);
        var c = W.pick(global.WORDS.blends_end.concat(global.WORDS.digraphs), 3);
        return [
          { type:'count', item: c[0], skill:'seg' },
          { type:'count', item: c[1], skill:'seg' },
          { type:'segment', item: c[2], skill:'seg' },
          { type:'read-aloud', item: m[0], plain:true, skill:'m_read',
            prompt:'唸出這個字。先想想它可以切成幾節。' },
          { type:'dictation', item: m[1], skill:'m_spell',
            prompt:'聽這個多音節字，拼出來。注意沒有重音的音節會「糊掉」。' }
        ];
      }
    }
  ];

  /* letter 區的 rule-pick 需要特別處理答案索引 */
  function prepare(items) {
    return items.map(function (q) {
      if (q.type === 'rule-pick' && q.answerWord) {
        q.answer = q.options.indexOf(q.answerWord);
      }
      return q;
    });
  }

  /**
   * 依各技能通過率決定起點 Level。
   * 規則：從低往高掃，第一個「沒過」的層級就是起點。
   */
  function computePlacement(rates) {
    function r(k) { return rates[k] == null ? 0 : rates[k]; }

    /* 基礎層：音素辨識與字母音沒過 → 一定從 L1 開始 */
    if (r('pa') < 0.7 || r('letter') < 0.8) return 1;
    if (r('d_cvc') < 0.75 || r('s_cvc') < 0.75 || r('seg') < 0.67) return 2;
    if (r('d_blend') < 0.5 || r('s_blend') < 0.5) return 3;
    if (r('d_vce') < 0.5 || r('s_vce') < 0.5) return 4;
    if (r('d_vt') < 0.5 || r('s_vt') < 0.5) return 5;
    if (r('d_r') < 0.5 || r('s_r') < 0.5) return 6;
    if (r('d_multi') < 0.5 || r('m_read') < 0.5 || r('m_spell') < 0.5) return 7;
    return 8;
  }

  var Diagnose = {
    sections: SECTIONS,

    /** 產生完整診斷題組 */
    build: function () {
      return SECTIONS.map(function (s) {
        return { id: s.id, title: s.title, icon: s.icon, intro: s.intro, items: prepare(s.build()) };
      });
    },

    /**
     * 評分。results = [{skill, correct, cause, word, phoneme}]
     */
    score: function (results) {
      var bySkill = {}, byCause = {}, wrongWords = [], weakSounds = {};

      results.forEach(function (r) {
        var k = r.skill || 'other';
        bySkill[k] = bySkill[k] || { n: 0, ok: 0 };
        bySkill[k].n++;
        if (r.correct) bySkill[k].ok++;
        else {
          if (r.cause) byCause[r.cause] = (byCause[r.cause] || 0) + 1;
          if (r.word) wrongWords.push(r.word);
          if (r.phoneme) weakSounds[r.phoneme] = (weakSounds[r.phoneme] || 0) + 1;
        }
      });

      var rates = {};
      for (var k in bySkill) rates[k] = bySkill[k].ok / bySkill[k].n;

      /* 區塊層級的匯總 */
      var SECTION_SKILLS = {
        pa: ['pa'], letter: ['letter'],
        decode: ['d_cvc','d_blend','d_vce','d_vt','d_r','d_multi'],
        spell:  ['s_cvc','s_blend','s_vce','s_vt','s_r'],
        multi:  ['seg','m_read','m_spell']
      };
      var sectionRates = {};
      for (var sid in SECTION_SKILLS) {
        var n = 0, ok = 0;
        SECTION_SKILLS[sid].forEach(function (sk) {
          if (bySkill[sk]) { n += bySkill[sk].n; ok += bySkill[sk].ok; }
        });
        sectionRates[sid] = n ? ok / n : null;
      }

      var placement = computePlacement(rates);

      /* 主要弱點成因 */
      var causes = Object.keys(byCause).map(function (c) {
        return { cause: c, n: byCause[c], label: global.Store.CAUSES[c].label };
      }).sort(function (a, b) { return b.n - a.n; });

      var weak = Object.keys(weakSounds).sort(function (a, b) {
        return weakSounds[b] - weakSounds[a];
      });

      return {
        date: global.Store.today(),
        placement: placement,
        rates: rates,
        sectionRates: sectionRates,
        causes: causes,
        weakSounds: weak,
        wrongWords: wrongWords,
        total: results.length,
        correct: results.filter(function (r) { return r.correct; }).length
      };
    },

    /** 把診斷結果講成人話 */
    narrate: function (d) {
      var lv = global.Curriculum.level(d.placement);
      var pct = Math.round(d.correct / d.total * 100);
      var lines = [];

      lines.push('你在 ' + d.total + ' 題中答對 ' + d.correct + ' 題（' + pct + '%）。');

      var sr = d.sectionRates;
      function judge(v) {
        if (v == null) return '—';
        if (v >= 0.85) return '穩';
        if (v >= 0.7) return '還可以';
        if (v >= 0.5) return '不穩';
        return '需要重建';
      }
      lines.push('');
      lines.push('五個能力區塊：');
      lines.push('· 音素辨識（耳朵）：' + judge(sr.pa));
      lines.push('· 字母音：' + judge(sr.letter));
      lines.push('· 解碼（見字能讀）：' + judge(sr.decode));
      lines.push('· 聽寫（聽音能寫）：' + judge(sr.spell));
      lines.push('· 多音節與拆音：' + judge(sr.multi));

      lines.push('');
      lines.push('建議起點：Level ' + d.placement + '「' + (lv ? lv.title : '') + '」');

      if (d.causes.length) {
        lines.push('');
        lines.push('你的錯誤主要來自「' + d.causes[0].label + '」。' +
                   global.Store.CAUSES[d.causes[0].cause].hint);
      }
      if (d.weakSounds.length) {
        lines.push('目前最弱的音：' + d.weakSounds.slice(0, 4).join('、'));
      }
      return lines.join('\n');
    }
  };

  global.Diagnose = Diagnose;
})(window);
