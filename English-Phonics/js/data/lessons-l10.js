/* ==========================================================================
   Level 10 — 實戰流暢度與總驗收
   通過標準不是「上完課」，而是「用沒看過的字證明你會了」。
   三項實測：陌生真字 ≥85%、30 字聽寫 ≥80%、多音節假字 ≥75%。
   ========================================================================== */
(function () {
  'use strict';
  var W = Words;

  function w(s) { return { w: s, parts: null, ph: [] }; }

  /* 這批字刻意沒有出現在前面任何一課的練習裡——真正的「陌生字」 */
  var UNSEEN = [
    'brisk', 'thrift', 'plunge', 'quench', 'scald', 'sprint', 'clutch', 'drench',
    'gnarled', 'squint', 'wharf', 'blight', 'crouch', 'shrewd', 'twinge', 'plaque',
    'yield', 'quaint', 'brooch', 'sleuth', 'gauge', 'wreath', 'scheme', 'trough'
  ];

  var UNSEEN_MULTI = [
    'reluctant', 'meticulous', 'perpetual', 'ambiguous', 'consecutive',
    'inevitable', 'preliminary', 'substantial', 'hypothesis', 'phenomenon',
    'deteriorate', 'unprecedented'
  ];

  /* 30 字聽寫：涵蓋各 Level 的規則字與例外字 */
  var DICTATION_30 = [
    'stamp', 'crunch', 'shelf', 'blend', 'thrill',      /* blends / digraphs */
    'grape', 'strive', 'globe', 'refuse', 'theme',      /* silent e */
    'praise', 'freight', 'coach', 'gloom', 'flight',    /* vowel teams */
    'charm', 'thirst', 'scorch', 'sphere', 'sprout',    /* r-controlled / diphthong */
    'muffin', 'basket', 'silent', 'topic', 'cradle',    /* 多音節 */
    'because', 'friend', 'people', 'answer', 'business' /* 不規則字 */
  ];

  /* ---------------------------------------------------------------- L10-01 */
  Curriculum.register({
    id: 'L10-01', level: 10,
    title: '總驗收（一）：陌生真字解碼',
    sub: '目標 ≥ 85%',
    mins: 30,
    goal: '看到從未在課程裡出現過的真實英文單字，能唸出正確讀音。',
    rules: [
      { h: '這是「見字能讀」的正式測驗',
        t: '下面的字都是真的英文字，但一次都沒在前面的課程出現過。<br>' +
           '不能靠記憶，只能靠規則。' },
      { h: '遇到不確定的字怎麼辦',
        t: '照 SOP 走：切音節 → 判斷型態 → 試最常見的讀法 → 不像字就換一種。<br>' +
           '產出一個「合理的候選讀音」就算成功。' }
    ],
    explain:
      '<p><b>怎麼算通過</b></p>' +
      '<p>12 個字裡唸對 10 個以上（≥85%）。</p>' +
      '<p>「唸對」的定義是：母音長短正確、子音都做出來、重音位置合理。' +
      '不要求口音完美。</p>' +
      '<p class="small muted">誠實自評很重要。這個測驗的目的是給你真實的能力地圖，' +
      '不是給你一張好看的成績單。唬弄系統只是唬弄自己。</p>',
    trap: '有幾個字含不規則拼法（brooch、gauge、plaque、trough）。' +
          '這些字唸錯不代表你的規則有問題——它們本來就是例外。' +
          '重點是其他字要對。',
    res: ['youglish', 'cambridge'],
    ex: [
      { type: 'read-aloud', section: '暖身', item: w(UNSEEN[0]), plain: true,
        prompt: '單音節 + blend。先切音，再合起來。' },
      { type: 'read-aloud', section: '暖身', item: w(UNSEEN[1]), plain: true },
      { type: 'read-aloud', section: '暖身', item: w(UNSEEN[2]), plain: true,
        hint: '注意 -ge 的軟音。' },
      { type: 'read-aloud', section: '暖身', item: w(UNSEEN[3]), plain: true }
    ],
    quiz: UNSEEN.slice(4, 16).map(function (x) {
      return { type: 'read-aloud', skill: 'final-decode', item: w(x), plain: true, mic: true };
    }),
    pass: { quiz: 0.85 },
    passText: '12 題唸對 10 題以上（85%）才算通過這一項。'
  });

  /* ---------------------------------------------------------------- L10-02 */
  Curriculum.register({
    id: 'L10-02', level: 10,
    title: '總驗收（二）：30 字聽寫',
    sub: '目標 ≥ 80%',
    mins: 35,
    goal: '聽到單字能拆出音素、套用拼寫規則，正確寫出來。',
    rules: [
      { h: '這是「聽音能寫」的正式測驗',
        t: '30 個字，涵蓋 blends、digraphs、silent e、vowel teams、' +
           'r 控制母音、多音節，以及 5 個不規則字。' },
      { h: '聽寫流程',
        t: '1. 完整聽一次<br>2. 心裡拆成音素（可以用手指數）<br>' +
           '3. 每個音想它怎麼拼<br>4. 寫出來<br>5. 檢查：唸一次自己寫的，聽起來對嗎？' }
    ],
    explain:
      '<p><b>錯了會告訴你原因</b></p>' +
      '<p>系統會分析你的錯誤屬於哪一類：<br>' +
      '· 聽音辨識（母音聽錯、清濁聽錯）<br>· 音素切分（漏音、多音）<br>' +
      '· 拼寫規則（音對但字母選錯）</p>' +
      '<p>這比單純看「錯幾題」有用得多——它告訴你接下來該練什麼。</p>' +
      '<p class="small muted">建議一次做完 30 題，不要中斷。中間休息會讓你的耳朵重新校準，' +
      '測不出真實狀態。</p>',
    trap: '最後 5 個是不規則字（because、friend、people、answer、business）。' +
          '這些沒有規則可循，只能靠記憶。錯了不影響你的解碼能力評估。',
    res: [],
    ex: DICTATION_30.slice(0, 4).map(function (x, i) {
      return { type: 'dictation', section: '暖身 ' + (i + 1) + '/4', item: w(x) };
    }),
    quiz: DICTATION_30.map(function (x) {
      return { type: 'dictation', skill: 'final-spell', item: w(x) };
    }),
    pass: { quiz: 0.8 },
    passText: '30 題寫對 24 題以上（80%）才算通過這一項。'
  });

  /* ---------------------------------------------------------------- L10-03 */
  Curriculum.register({
    id: 'L10-03', level: 10,
    title: '總驗收（三）：多音節假字解碼',
    sub: '目標 ≥ 75%',
    mins: 28,
    goal: '面對不可能背過的多音節假字，能切分並唸出合理讀音。',
    rules: [
      { h: '這是解碼能力的最硬指標',
        t: '假字不存在於任何字典，你不可能看過。<br>' +
           '唸得出來 = 你真的內化了英文的拼讀系統。' },
      { h: '評分標準',
        t: '只要你的讀音符合英文的拼讀規則就算對，' +
           '不需要和「標準答案」完全一致（假字本來就沒有標準答案）。<br>' +
           '例如 "ranmit" 唸成 /ˈrænmɪt/ 就是對的。' }
    ],
    explain:
      '<p><b>為什麼假字測驗這麼重要</b></p>' +
      '<p>閱讀研究裡，假字朗讀（pseudoword reading）是判斷解碼能力的黃金標準。<br>' +
      '因為它把「詞彙記憶」完全排除，只剩下純粹的字形→字音轉換能力。</p>' +
      '<p>很多人真字讀得不錯（因為背過），但假字一測就露餡——' +
      '這代表遇到新字還是會卡。</p>' +
      '<p class="small muted">你如果這一項過了，就真的擁有可遷移的拼讀能力，' +
      '不是靠死背撐起來的假象。</p>',
    trap: '假字的重音位置可以有多種合理選擇。只要整體符合英文的節奏就算對。',
    res: [],
    ex: [
      { type: 'nonsense', section: '暖身', word: 'blentish', rule: 'final' },
      { type: 'nonsense', section: '暖身', word: 'crandobe', rule: 'final' },
      { type: 'nonsense', section: '暖身', word: 'sperfilate', rule: 'final' }
    ],
    quiz: [
      'ranmit', 'soplet', 'fabtic', 'dremmish', 'contrap', 'mulbern',
      'plabint', 'tarvest', 'quindale', 'phrosculent', 'introspine', 'nabellity'
    ].map(function (x) {
      return { type: 'nonsense', skill: 'final-nonsense', word: x, rule: 'final' };
    }),
    pass: { quiz: 0.75 },
    passText: '12 題唸對 9 題以上（75%）才算通過這一項。'
  });

  /* ---------------------------------------------------------------- L10-04 */
  Curriculum.register({
    id: 'L10-04', level: 10,
    title: '流暢度與能力總結',
    sub: '段落朗讀 + 你到底學會了什麼',
    mins: 30,
    goal: '流暢朗讀真實段落，並確認三項總驗收都通過。',
    rules: [
      { h: '流暢度 = 準確 + 速度 + 語調',
        t: '前兩項你已經有了。語調（prosody）需要的是量——' +
           '持續朗讀，重音和節奏會自己長出來。' },
      { h: '接下來怎麼繼續',
        t: '1. 每天用本站的「複習」功能 5 分鐘（弱項會自動出現）<br>' +
           '2. 每天出聲朗讀 5 分鐘真實文章<br>' +
           '3. 遇到唸不出的字，用 YouGlish 查真人發音<br>' +
           '4. 每兩週回來重測一次假字，確認能力沒退化' }
    ],
    explain:
      '<p><b>你走完了整套課程。回頭看你學了什麼：</b></p>' +
      '<p>· 44 個英語音素，包含中文完全沒有的 /θ/ /ð/ /v/ /z/ /ʒ/<br>' +
      '· 音素覺識：辨音、拆音、合音<br>' +
      '· 五個短母音、五個長母音、雙母音、r 控制母音、schwa<br>' +
      '· Blends、digraphs、silent e、vowel teams<br>' +
      '· 六種音節型態與三種切分法<br>' +
      '· FLOSS、ck/k、tch/dge、soft c/g、1-1-1、去 e、y 變 i<br>' +
      '· 字首、字尾、拉丁與希臘字根</p>' +
      '<p><b>但真正重要的不是這張清單，而是兩件事：</b><br>' +
      '看到陌生字時，你有一套流程可以跑。<br>' +
      '聽到陌生字時，你能拆開它、寫出來。</p>' +
      '<p class="small muted">這就是「見字能讀、聽音能寫」。' +
      '它不會因為你停止上課就消失——它是一套已經裝進你腦子裡的系統。</p>',
    trap: '通過總驗收不代表你的英文口音變完美了。' +
          '拼讀能力和發音精緻度是兩回事——前者是本課程的目標，' +
          '後者需要更長期的口說練習。但沒有前者，後者無從談起。',
    res: ['readinguniverse', 'youglish', 'sor-podcast'],
    ex: [
      { type: 'sentence', section: '段落朗讀', text: WORDS.sentences.advanced[0] },
      { type: 'sentence', section: '段落朗讀', text: WORDS.sentences.advanced[1] },
      { type: 'sentence', section: '段落朗讀', text: WORDS.sentences.advanced[2] },
      { type: 'read-aloud', section: '長字', item: w(UNSEEN_MULTI[0]), plain: true },
      { type: 'read-aloud', section: '長字', item: w(UNSEEN_MULTI[1]), plain: true },
      { type: 'read-aloud', section: '長字', item: w(UNSEEN_MULTI[2]), plain: true }
    ],
    quiz: [
      { type: 'read-aloud', skill: 'final-decode', item: w(UNSEEN_MULTI[3]), plain: true },
      { type: 'read-aloud', skill: 'final-decode', item: w(UNSEEN_MULTI[5]), plain: true },
      { type: 'read-aloud', skill: 'final-decode', item: w(UNSEEN_MULTI[8]), plain: true },
      { type: 'read-aloud', skill: 'final-decode', item: w(UNSEEN_MULTI[11]), plain: true },
      { type: 'dictation', skill: 'final-spell', item: w('reluctant') },
      { type: 'dictation', skill: 'final-spell', item: w('substantial') },
      { type: 'sentence', skill: 'fluency', text: WORDS.sentences.advanced[3] },
      { type: 'sentence', skill: 'fluency', text: WORDS.sentences.advanced[2] }
    ],
    pass: { quiz: 0.75 },
    passText: '8 題答對 6 題以上。加上前三項總驗收都通過，你就正式達成「見字能讀、聽音能寫」。'
  });
})();
