/* ==========================================================================
   Level 2 — CVC 與短母音
   五個短母音是整個英文拼讀的地基，也是中文母語者最大的破口。
   教學順序 a → i → o → u → e：刻意把最容易混的 e 和 i 隔開。
   ========================================================================== */
(function () {
  'use strict';
  var W = Words, G = WORDS;

  /** 產生一課「單一短母音」的模板，減少重複 */
  function vowelLesson(cfg) {
    var p = PHONEMES.get(cfg.ph);
    return {
      id: cfg.id, level: 2,
      title: cfg.title, sub: cfg.sub, mins: 25,
      goal: '看到字中間的 ' + cfg.letter + '，能唸出 ' + p.sym + '；聽到 ' + p.sym + ' 能寫出 ' + cfg.letter + '。',
      rules: [
        { h: '規則：一個母音字母夾在子音中間 → 唸短音',
          t: 'c<b>a</b>t、s<b>i</b>t、h<b>o</b>t 這種 <b>子音-母音-子音</b>（CVC）結構，' +
             '中間的母音一律唸短音。這是英文最基本、也最可靠的規則之一。' },
        { h: cfg.letter + ' 的短音是 ' + p.sym + '（像 ' + p.key + '）',
          t: p.zh }
      ],
      explain: cfg.explain,
      trap: p.trap + (cfg.extraTrap ? '<br><br>' + cfg.extraTrap : ''),
      res: cfg.res || ['sos', 'readingbear'],
      demo: [{ type: 'phoneme-card', id: cfg.ph }],
      ex: [
        { type: 'blend', section: '拼讀', item: cfg.words[0] },
        { type: 'blend', section: '拼讀', item: cfg.words[1] },
        { type: 'read-aloud', section: '朗讀', item: cfg.words[2] },
        { type: 'segment', section: '拆音', item: cfg.words[3] },
        { type: 'dictation', section: '聽寫', item: cfg.words[4] },
        { type: 'dictation', section: '聽寫', item: cfg.words[5] },
        { type: 'minimal-pair', section: '最小配對', a: cfg.pair.a, b: cfg.pair.b,
          pa: cfg.pair.pa, pb: cfg.pair.pb, zh: cfg.pair.zh }
      ],
      quiz: [
        { type: 'minimal-pair', skill: 'listen', a: cfg.pair.a, b: cfg.pair.b,
          pa: cfg.pair.pa, pb: cfg.pair.pb, zh: cfg.pair.zh },
        { type: 'dictation', skill: 'spell', item: cfg.quizWords[0] },
        { type: 'dictation', skill: 'spell', item: cfg.quizWords[1] },
        { type: 'read-aloud', skill: 'decode', item: cfg.quizWords[2], plain: true },
        { type: 'nonsense', skill: 'decode', word: cfg.nonsense, rule: 'cvc' },
        { type: 'segment', skill: 'seg', item: cfg.quizWords[3] }
      ],
      pass: { quiz: 0.8 },
      passText: '6 題答對 5 題以上。聽寫題如果錯在母音字母，代表耳朵還沒分開這個音——回去做最小配對。'
    };
  }

  /* ---------------------------------------------------------------- L2-01 */
  Curriculum.register(vowelLesson({
    id: 'L2-01', ph: 'a_', letter: 'a',
    title: '短母音 a：/æ/',
    sub: 'cat, hat, map',
    explain:
      '<p><b>/æ/ 是中文完全沒有的音。</b></p>' +
      '<p>做法：想像你在牙醫診所被要求張大嘴，下巴往下掉，嘴角同時往兩邊拉開。' +
      '舌頭放低、放前面。發出來的聲音介於「ㄟ」和「ㄚ」之間，但比兩者都更「扁」。</p>' +
      '<p>常見錯誤有兩種：<br>' +
      '· 唸成 ㄟ（/ɛ/）→ bad 變成 bed<br>' +
      '· 唸成 ㄚ（/ɑ/）→ bad 變成 「巴」的感覺</p>' +
      '<p class="small muted">檢查法：把手放在下巴，唸 /æ/ 時下巴應該明顯往下掉。</p>',
    extraTrap: '這個音出現頻率極高（cat、bad、man、hand、black），練到穩定非常划算。',
    words: W.pick(G.cvc_a, 6),
    quizWords: W.pick(G.cvc_a, 4),
    nonsense: 'zad',
    pair: { a: 'bad', b: 'bed', pa: 'a_', pb: 'e_', zh: '短 a / 短 e' }
  }));

  /* ---------------------------------------------------------------- L2-02 */
  Curriculum.register(vowelLesson({
    id: 'L2-02', ph: 'i_', letter: 'i',
    title: '短母音 i：/ɪ/',
    sub: 'sit, big, pin',
    explain:
      '<p><b>/ɪ/ 不是中文的「一」。</b></p>' +
      '<p>中文的「一」是緊繃的長音（等於英文的 /iː/）。/ɪ/ 要<b>放鬆、變短</b>：' +
      '嘴巴微開、舌頭高但不用力、聲音又短又鬆。</p>' +
      '<p>這是 ship / sheep、sit / seat、live / leave 的差別，' +
      '也是中文母語者最常被聽出「口音」的地方之一。</p>' +
      '<p class="small muted">練習法：先唸長長的「一」（緊），然後刻意放鬆舌頭、縮短時間，' +
      '那個「懶懶的一」就是 /ɪ/。</p>',
    extraTrap: '英文有大量高頻字用這個音：it、is、in、this、with、big、will。唸不準會影響整體聽感。',
    words: W.pick(G.cvc_i, 6),
    quizWords: W.pick(G.cvc_i, 4),
    nonsense: 'fim',
    pair: { a: 'ship', b: 'sheep', pa: 'i_', pb: 'ee', zh: '短 i / 長 e' }
  }));

  /* ---------------------------------------------------------------- L2-03 */
  Curriculum.register(vowelLesson({
    id: 'L2-03', ph: 'o_', letter: 'o',
    title: '短母音 o：/ɑ/',
    sub: 'hot, top, dog',
    explain:
      '<p><b>/ɑ/ 是五個短母音裡最好唸的一個。</b></p>' +
      '<p>就是醫生看喉嚨時要你發的「啊」：嘴巴張最大，舌頭放低、放後面。</p>' +
      '<p>要注意的是它和 /ʌ/（短 u）的差別：cop / cup、hot / hut、not / nut。' +
      '/ɑ/ 嘴巴張大，/ʌ/ 嘴巴只微開而且很短。</p>' +
      '<p class="small muted">另外：美式英語裡 father 的 a 也唸 /ɑ/，' +
      'wash、want 的 a 也是。所以 /ɑ/ 不是只有 o 才有。</p>',
    words: W.pick(G.cvc_o, 6),
    quizWords: W.pick(G.cvc_o, 4),
    nonsense: 'pom',
    pair: { a: 'cop', b: 'cup', pa: 'o_', pb: 'u_', zh: '短 o / 短 u' }
  }));

  /* ---------------------------------------------------------------- L2-04 */
  Curriculum.register(vowelLesson({
    id: 'L2-04', ph: 'u_', letter: 'u',
    title: '短母音 u：/ʌ/',
    sub: 'cup, bus, sun',
    explain:
      '<p><b>/ʌ/ 是「最不用力」的母音。</b></p>' +
      '<p>嘴巴微開，舌頭放中間，聲音短促。有點像你被問問題時發出的「呃」，' +
      '但更短更乾脆。</p>' +
      '<p><b>重要：/ʌ/ 和 schwa /ə/ 幾乎是同一個音</b>，差別只在<br>' +
      '· /ʌ/ 出現在<b>重音節</b>（cup、bus）<br>' +
      '· /ə/ 出現在<b>非重音節</b>（about 的 a、lemon 的 o）</p>' +
      '<p class="small muted">現在先把 /ʌ/ 練穩，Level 7 講多音節時 schwa 會直接接上來。</p>',
    extraTrap: '注意：love、come、some、done、month、money 這些字的 o 其實唸 /ʌ/，不是 /ɑ/。' +
               '這是英文拼寫的歷史遺留，要個別記。',
    words: W.pick(G.cvc_u, 6),
    quizWords: W.pick(G.cvc_u, 4),
    nonsense: 'tud',
    pair: { a: 'cup', b: 'cop', pa: 'u_', pb: 'o_', zh: '短 u / 短 o' }
  }));

  /* ---------------------------------------------------------------- L2-05 */
  Curriculum.register(vowelLesson({
    id: 'L2-05', ph: 'e_', letter: 'e',
    title: '短母音 e：/ɛ/',
    sub: 'bed, pen, red',
    explain:
      '<p><b>/ɛ/ 最接近注音的 ㄝ。</b></p>' +
      '<p>嘴巴半開，舌頭放前中位置。中文有近似音，所以「發得出來」通常不是問題。</p>' +
      '<p>問題在<b>分辨</b>：/ɛ/ 和 /æ/ 對很多中文母語者是同一個音。' +
      'bed / bad、pen / pan、men / man、said / sad。</p>' +
      '<p><b>差別在嘴巴開的程度</b>：<br>' +
      '· /ɛ/ 嘴巴半開，下巴不太動<br>' +
      '· /æ/ 嘴巴大開，下巴明顯往下掉、嘴角往兩邊拉</p>' +
      '<p class="small muted">照鏡子唸 bed → bad → bed → bad，看下巴有沒有動。</p>',
    extraTrap: 'ea 也常唸 /ɛ/：head、bread、dead、ready。這在 Level 5 會處理。',
    words: W.pick(G.cvc_e, 6),
    quizWords: W.pick(G.cvc_e, 4),
    nonsense: 'ked',
    pair: { a: 'bed', b: 'bad', pa: 'e_', pb: 'a_', zh: '短 e / 短 a' }
  }));

  /* ---------------------------------------------------------------- L2-06 */
  Curriculum.register({
    id: 'L2-06', level: 2,
    title: '五個短母音大混戰',
    sub: '這一課決定你的耳朵到底分不分得開',
    mins: 30,
    goal: '在不看字的情況下，聽到任何 CVC 字都能判斷中間是哪個母音，並拼出來。',
    rules: [
      { h: '五個短母音的嘴型階梯',
        t: '從嘴巴最開到最閉：<br>' +
           '<b>/æ/</b> cat（最開，下巴掉）→ <b>/ɑ/</b> hot（大開，舌後）→ ' +
           '<b>/ʌ/</b> cup（微開，最鬆）→ <b>/ɛ/</b> bed（半開，舌前）→ ' +
           '<b>/ɪ/</b> sit（微開，舌高）' },
      { h: '最容易混的三組',
        t: '1. /æ/ vs /ɛ/：bad / bed<br>' +
           '2. /ɑ/ vs /ʌ/：cop / cup<br>' +
           '3. /ɪ/ vs /ɛ/：pin / pen' }
    ],
    explain:
      '<p><b>為什麼中文母語者會把五個聽成一兩個？</b></p>' +
      '<p>你的大腦在嬰兒期就把聽覺切成「中文的音類」。' +
      '英文的 /æ/ /ɛ/ /ʌ/ 落在中文沒有分界的區域，所以被歸成同一格。</p>' +
      '<p>好消息：成人的聽覺分類<b>可以重新訓練</b>，方法就是大量的最小配對聽辨。' +
      '一開始會覺得「聽起來一模一樣」，這是正常的。做過幾百次之後，' +
      '差別會突然「浮出來」。</p>' +
      '<p class="small muted">這一課的練習量刻意加大。錯了不要沮喪，錯誤本身就是在校準你的耳朵。</p>',
    trap: '不要用「看字然後想它應該是什麼音」來作答。那是在用視覺記憶作弊，耳朵永遠練不起來。' +
          '閉上眼睛，只用聽的。',
    res: ['sos', 'rachel-vowels', 'readingbear'],
    ex: [
      { type: 'minimal-pair', section: '最小配對', a: 'bad', b: 'bed', pa: 'a_', pb: 'e_', zh: '/æ/ vs /ɛ/' },
      { type: 'minimal-pair', section: '最小配對', a: 'cop', b: 'cup', pa: 'o_', pb: 'u_', zh: '/ɑ/ vs /ʌ/' },
      { type: 'minimal-pair', section: '最小配對', a: 'pen', b: 'pan', pa: 'e_', pb: 'a_', zh: '/ɛ/ vs /æ/' },
      { type: 'listen-pick', section: '母音辨識', prompt: '這個字中間是哪個母音字母？',
        play: 'hut', options: ['hat', 'hot', 'hut', 'hit'], answer: 'hut',
        cause: 'listening', diff: '短母音' },
      { type: 'listen-pick', section: '母音辨識', prompt: '這個字中間是哪個母音字母？',
        play: 'pin', options: ['pan', 'pen', 'pin', 'pun'], answer: 'pin',
        cause: 'listening', diff: '短母音' },
      { type: 'listen-pick', section: '母音辨識', prompt: '這個字中間是哪個母音字母？',
        play: 'bag', options: ['bag', 'beg', 'big', 'bug'], answer: 'bag',
        cause: 'listening', diff: '短母音' },
      { type: 'dictation', section: '聽寫', item: W.pick(G.cvc_u, 1)[0] },
      { type: 'dictation', section: '聽寫', item: W.pick(G.cvc_e, 1)[0] }
    ],
    quiz: [
      { type: 'listen-pick', skill: 'listen', prompt: '你聽到的是哪一個？',
        play: 'bed', options: ['bad', 'bed', 'bid', 'bud'], answer: 'bed', cause: 'listening' },
      { type: 'listen-pick', skill: 'listen', prompt: '你聽到的是哪一個？',
        play: 'cut', options: ['cat', 'cot', 'cut', 'kit'], answer: 'cut', cause: 'listening' },
      { type: 'listen-pick', skill: 'listen', prompt: '你聽到的是哪一個？',
        play: 'hit', options: ['hat', 'hot', 'hut', 'hit'], answer: 'hit', cause: 'listening' },
      { type: 'dictation', skill: 'spell', item: W.pick(G.cvc_a, 1)[0] },
      { type: 'dictation', skill: 'spell', item: W.pick(G.cvc_o, 1)[0] },
      { type: 'dictation', skill: 'spell', item: W.pick(G.cvc_i, 1)[0] },
      { type: 'dictation', skill: 'spell', item: W.pick(G.cvc_u, 1)[0] },
      { type: 'dictation', skill: 'spell', item: W.pick(G.cvc_e, 1)[0] }
    ],
    pass: { quiz: 0.75 },
    passText: '8 題答對 6 題以上。這一課是 Level 2 最難的，錯 2 題完全正常。' +
              '如果錯 3 題以上，別急著往下走——把最小配對再做兩輪，耳朵需要時間重新校準。'
  });

  /* ---------------------------------------------------------------- L2-07 */
  Curriculum.register({
    id: 'L2-07', level: 2,
    title: 'CVC 綜合驗收與第一次閱讀',
    sub: '把單字能力接到真實句子',
    mins: 28,
    goal: '用假字證明你真的會 CVC 解碼，並且能流暢讀出整句由 CVC 組成的句子。',
    rules: [
      { h: '為什麼要用假字測驗',
        t: '真字你可能背過。假字（zib、fom、mub）不可能背過，' +
           '所以只有「真的會拼讀」才唸得出來。<br>' +
           '這是閱讀研究裡判斷解碼能力的標準做法。' },
      { h: '讀句子時的順序',
        t: '先掃一次找出不會的字 → 個別拆解 → 再整句唸一次。' +
           '不要一邊讀一邊卡，那會破壞流暢度。' }
    ],
    explain:
      '<p><b>你現在會多少字？</b></p>' +
      '<p>學會 5 個短母音 + 20 個子音，理論上可以拼讀出<b>上千個</b> CVC 單字。' +
      '這就是 phonics 和背單字的差別：規則會自我繁殖，記憶不會。</p>' +
      '<p>這一課的句子全部由你已經學過的模式組成（decodable text）。' +
      '刻意不放你還沒學的東西——這樣「讀不出來」就一定是你的問題，可以精準修正。</p>',
    trap: '朗讀句子時如果卡住，不要跳過。停下來把那個字拆成音素，唸出來，再繼續。' +
          '養成「卡住就拆」的反射，比讀得快重要得多。',
    res: ['readinguniverse', 'starfall-pdf'],
    ex: [
      { type: 'nonsense', section: '假字解碼', word: WORDS.nonsense.cvc[0], rule: 'cvc' },
      { type: 'nonsense', section: '假字解碼', word: WORDS.nonsense.cvc[1], rule: 'cvc' },
      { type: 'nonsense', section: '假字解碼', word: WORDS.nonsense.cvc[2], rule: 'cvc' },
      { type: 'sentence', section: '句子朗讀', text: G.sentences.cvc[0] },
      { type: 'sentence', section: '句子朗讀', text: G.sentences.cvc[1] },
      { type: 'sentence', section: '句子朗讀', text: G.sentences.cvc[2] }
    ],
    quiz: [
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.cvc[3], rule: 'cvc' },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.cvc[4], rule: 'cvc' },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.cvc[5], rule: 'cvc' },
      { type: 'dictation', skill: 'spell', item: W.pick(G.cvc_a, 1)[0] },
      { type: 'dictation', skill: 'spell', item: W.pick(G.cvc_u, 1)[0] },
      { type: 'dictation', skill: 'spell', item: W.pick(G.cvc_e, 1)[0] },
      { type: 'sentence', skill: 'fluency', text: G.sentences.cvc[3] },
      { type: 'sentence', skill: 'fluency', text: G.sentences.cvc[4] }
    ],
    pass: { quiz: 0.8 },
    passText: '8 題答對 7 題（含假字全對）才算過 Level 2。' +
              '假字錯了代表解碼還沒自動化，回去重做 L2-06。'
  });
})();
