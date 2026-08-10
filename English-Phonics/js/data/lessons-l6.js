/* ==========================================================================
   Level 6 — R 控制母音與雙母音
   R 控制母音（bossy R）：母音後面接 r，整個變成一個新音。
   最大難點：er / ir / ur 唸起來一模一樣，但拼法不同 → 聽寫的地雷區。
   ========================================================================== */
(function () {
  'use strict';
  var W = Words, G = WORDS;
  function f(group, w) { return G[group].filter(function (x) { return x.w === w; })[0] || G[group][0]; }

  /* ---------------------------------------------------------------- L6-01 */
  Curriculum.register({
    id: 'L6-01', level: 6,
    title: 'ar 與 or：最好認的兩個',
    sub: 'car, star / for, corn',
    mins: 24,
    goal: '掌握 ar = /ɑr/、or = /ɔr/，並且 r 要真的捲進去。',
    rules: [
      { h: '母音 + r = 一個新音，不是兩個音',
        t: 'car 不是 /kɑ/ + /r/，而是 /kɑr/ 一個整體。<br>' +
           '英文老師常說 r 是「霸道的 r」（bossy R）：它會把前面的母音改造掉。' },
      { h: 'ar → /ɑr/',
        t: 'car, star, park, hard, farm, dark, garden' },
      { h: 'or → /ɔr/',
        t: 'for, corn, more, north, short, sport<br>' +
           '同樣的音也可以拼成 ore（more, store）、oar（board）、our（four）。' }
    ],
    explain:
      '<p><b>中文母語者的 r 問題</b></p>' +
      '<p>中文的「ㄦ」（兒）舌位和英文的 /r/ 不同：ㄦ 舌尖比較平，英文 /r/ 舌尖往後捲更多、' +
      '而且嘴唇會稍微噘起來。</p>' +
      '<p>檢查法：唸 car 的時候，舌頭應該<b>整個往後縮</b>，' +
      '而且舌尖不碰到上顎任何地方。如果舌尖碰到了，那是 /l/ 不是 /r/。</p>' +
      '<p class="small muted">另外注意：美式英語的 r 一定要唸出來（rhotic），' +
      '英式則常常省略（car 唸成 /kɑː/）。這套課程用美式。</p>',
    trap: 'w 後面的 ar 會變成 /ɔr/：war, warm, ward, toward。<br>' +
          'w 後面的 or 會變成 /ɜr/：word, work, world, worth。<br>' +
          '「w 讓後面的音往後退」，記這個口訣。',
    res: ['sos', 'rachel-vowels'],
    demo: [
      { type: 'phoneme-card', id: 'ar' },
      { type: 'phoneme-card', id: 'or' }
    ],
    ex: [
      { type: 'read-aloud', section: '朗讀', item: f('r_ctrl', 'car') },
      { type: 'read-aloud', section: '朗讀', item: f('r_ctrl', 'corn') },
      { type: 'minimal-pair', section: '最小配對', a: 'car', b: 'core', pa: 'ar', pb: 'or', zh: 'ar / or' },
      { type: 'dictation', section: '聽寫', item: f('r_ctrl', 'farm') },
      { type: 'dictation', section: '聽寫', item: f('r_ctrl', 'north') },
      { type: 'rule-pick', section: '例外', prompt: '<b>warm</b> 的 ar 唸什麼？',
        options: ['/ɑr/ 像 car', '/ɔr/ 像 for', '/ɜr/ 像 bird'],
        answer: 1, rule: 'w-ar', why: 'w 後面的 ar 會變成 /ɔr/。war, warm, ward 都是。' }
    ],
    quiz: [
      { type: 'minimal-pair', skill: 'listen', a: 'car', b: 'core', pa: 'ar', pb: 'or', zh: 'ar / or' },
      { type: 'dictation', skill: 'spell', item: f('r_ctrl', 'star') },
      { type: 'dictation', skill: 'spell', item: f('r_ctrl', 'for') },
      { type: 'read-aloud', skill: 'decode', item: { w: 'sport', parts: null }, plain: true },
      { type: 'rule-pick', skill: 'rule', prompt: '<b>work</b> 的 or 唸什麼？',
        options: ['/ɔr/ 像 for', '/ɜr/ 像 bird', '/ɑr/ 像 car'],
        answer: 1, rule: 'w-or', why: 'w 後面的 or 變 /ɜr/。word, work, world, worth 都是。' },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.rctrl[0], rule: 'r-controlled' }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。w + ar/or 的例外要記住，它們都是高頻字。'
  });

  /* ---------------------------------------------------------------- L6-02 */
  Curriculum.register({
    id: 'L6-02', level: 6,
    title: 'er / ir / ur：三種拼法，一個音',
    sub: '聽寫最容易錯的地方',
    mins: 28,
    goal: '知道 er、ir、ur 讀音完全相同（/ɜr/），並學會用位置與字彙傾向來判斷拼法。',
    rules: [
      { h: '三個拼法唸起來一模一樣',
        t: 'h<b>er</b>、b<b>ir</b>d、t<b>ur</b>n — 中間的母音完全相同，都是 /ɜr/。<br>' +
           '所以「聽」永遠分不出來，只能靠規律和記憶。' },
      { h: '出現頻率：er 最多',
        t: '<b>er</b>（約 40%）：her, term, serve, perfect，以及所有 -er 字尾（teacher, bigger）<br>' +
           '<b>ir</b>（約 25%）：bird, girl, first, shirt, dirt, thirty<br>' +
           '<b>ur</b>（約 25%）：turn, burn, nurse, hurt, purple, Thursday' },
      { h: '實用判斷法',
        t: '1. 字尾的 /ɜr/ 幾乎都是 <b>er</b>（teacher, water, never）<br>' +
           '2. 不確定就先猜 <b>er</b>，命中率最高<br>' +
           '3. ir 和 ur 的字要個別累積——這是少數必須靠記憶的地方' }
    ],
    explain:
      '<p><b>這裡誠實一點：沒有好規則</b></p>' +
      '<p>bird 為什麼不是 berd？turn 為什麼不是 tern？沒有理由，就是歷史。</p>' +
      '<p>所以策略不是「找規則」，而是：<br>' +
      '1. 記住最高頻的 ir 字群：bird, girl, first, shirt, third, thirty, circle, birthday<br>' +
      '2. 記住最高頻的 ur 字群：turn, burn, nurse, hurt, purple, church, Thursday, return<br>' +
      '3. 其他一律猜 er</p>' +
      '<p class="small muted">這是整套課程裡少數「就是要背」的地方。' +
      '好消息是清單不長，而且系統會用間隔複習幫你固定下來。</p>',
    trap: '還有兩個拼法也唸 /ɜr/：<br>' +
          '· <b>ear</b>：earth, early, learn, heard, search<br>' +
          '· <b>or</b>（w 之後）：word, work, world<br>' +
          '所以總共有五種拼法對應同一個音。這是英文最混亂的區域之一。',
    res: ['sos', 'ufli-toolbox'],
    demo: [{ type: 'phoneme-card', id: 'er' }],
    ex: [
      { type: 'read-aloud', section: '朗讀', item: f('r_ctrl', 'bird') },
      { type: 'read-aloud', section: '朗讀', item: f('r_ctrl', 'turn') },
      { type: 'read-aloud', section: '朗讀', item: f('r_ctrl', 'her') },
      { type: 'spell-pick', section: '拼寫選擇', answer: 'bird', options: ['bird', 'berd', 'burd'],
        rule: 'er-ir-ur', why: 'bird 用 ir。這組要記：bird, girl, first, shirt, third。' },
      { type: 'spell-pick', section: '拼寫選擇', answer: 'nurse', options: ['nurse', 'nerse', 'nirse'],
        rule: 'er-ir-ur', why: 'nurse 用 ur。這組要記：turn, burn, nurse, hurt, purple, church。' },
      { type: 'spell-pick', section: '拼寫選擇', answer: 'teacher', options: ['teacher', 'teachir', 'teachur'],
        rule: 'er-ir-ur', why: '字尾的 /ɜr/ 幾乎都是 er。這條規律很可靠。' },
      { type: 'dictation', section: '聽寫', item: f('r_ctrl', 'shirt') }
    ],
    quiz: [
      { type: 'spell-pick', skill: 'spell', answer: 'girl', options: ['girl', 'gerl', 'gurl'], rule: 'er-ir-ur' },
      { type: 'spell-pick', skill: 'spell', answer: 'turn', options: ['turn', 'tern', 'tirn'], rule: 'er-ir-ur' },
      { type: 'spell-pick', skill: 'spell', answer: 'water', options: ['water', 'watir', 'watur'], rule: 'er-ir-ur' },
      { type: 'dictation', skill: 'spell', item: f('r_ctrl', 'her') },
      { type: 'dictation', skill: 'spell', item: f('r_ctrl', 'bird') },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.rctrl[1], rule: 'r-controlled' }
    ],
    pass: { quiz: 0.67 },
    passText: '6 題答對 4 題以上。這一課的通過標準刻意放寬——er/ir/ur 沒有規則可循，' +
              '錯的字會進錯字本，靠間隔複習慢慢固定。'
  });

  /* ---------------------------------------------------------------- L6-03 */
  Curriculum.register({
    id: 'L6-03', level: 6,
    title: 'air / are 與 ear / eer',
    sub: 'chair, care / hear, deer',
    mins: 24,
    goal: '分辨 /ɛr/（air）和 /ɪr/（ear）兩個音，並認得各自的拼法。',
    rules: [
      { h: '/ɛr/ 的拼法：air、are、ear、ere',
        t: 'ch<b>air</b>, h<b>air</b>, f<b>air</b><br>' +
           'c<b>are</b>, sh<b>are</b>, squ<b>are</b><br>' +
           'b<b>ear</b>, p<b>ear</b>, w<b>ear</b>（少數）<br>' +
           'th<b>ere</b>, wh<b>ere</b>' },
      { h: '/ɪr/ 的拼法：ear、eer、ere、ier',
        t: 'h<b>ear</b>, f<b>ear</b>, y<b>ear</b>, n<b>ear</b><br>' +
           'd<b>eer</b>, ch<b>eer</b>, b<b>eer</b><br>' +
           'h<b>ere</b>, sinc<b>ere</b><br>' +
           'p<b>ier</b>, f<b>ier</b>ce' },
      { h: 'ear 是最麻煩的：三種讀法',
        t: '· /ɪr/：hear, near, year, clear（最多）<br>' +
           '· /ɛr/：bear, pear, wear, tear（撕）<br>' +
           '· /ɜr/：earth, early, learn, heard<br>' +
           '只能靠「試」＋累積。' }
    ],
    explain:
      '<p><b>先確定你聽得出 /ɛr/ 和 /ɪr/ 的差別</b></p>' +
      '<p>· <b>/ɛr/</b>（air）：嘴巴半開，像 bed 的母音 + r<br>' +
      '· <b>/ɪr/</b>（ear）：嘴巴較閉，像 sit 的母音 + r</p>' +
      '<p>最小配對：hair / here、bear / beer、air / ear、care / clear。</p>' +
      '<p class="small muted">中文母語者這兩個常常聽成同一個。' +
      '如果你分不出來，先回去確認 /ɛ/ 和 /ɪ/ 的差別（Level 2）。</p>',
    trap: 'tear 有兩種讀法：<br>· /tɪr/ = 眼淚<br>· /tɛr/ = 撕開<br>' +
          '這種字只能靠句子判斷，這就是為什麼閱讀量還是重要。',
    res: ['sos', 'youglish'],
    demo: [
      { type: 'phoneme-card', id: 'air' },
      { type: 'phoneme-card', id: 'ear' }
    ],
    ex: [
      { type: 'minimal-pair', section: '最小配對', a: 'hear', b: 'hair', pa: 'ear', pb: 'air', zh: 'ear / air' },
      { type: 'read-aloud', section: '朗讀', item: f('r_ctrl', 'chair') },
      { type: 'read-aloud', section: '朗讀', item: f('r_ctrl', 'hear') },
      { type: 'sort', section: '分類', prompt: '這個字的 ear 唸哪一種？', word: 'learn',
        categories: ['/ɪr/ 像 hear', '/ɛr/ 像 bear', '/ɜr/ 像 bird'], answer: 2, rule: 'ear',
        why: 'earth, early, learn, heard, search 這組唸 /ɜr/。' },
      { type: 'sort', section: '分類', prompt: '這個字的 ear 唸哪一種？', word: 'bear',
        categories: ['/ɪr/ 像 hear', '/ɛr/ 像 chair', '/ɜr/ 像 bird'], answer: 1, rule: 'ear',
        why: 'bear, pear, wear 這組唸 /ɛr/。' },
      { type: 'dictation', section: '聽寫', item: { w: 'care', parts: null, ph: [] } }
    ],
    quiz: [
      { type: 'minimal-pair', skill: 'listen', a: 'hear', b: 'hair', pa: 'ear', pb: 'air', zh: 'ear / air' },
      { type: 'sort', skill: 'rule', prompt: 'ear 唸哪一種？', word: 'year',
        categories: ['/ɪr/', '/ɛr/', '/ɜr/'], answer: 0, rule: 'ear' },
      { type: 'sort', skill: 'rule', prompt: 'ear 唸哪一種？', word: 'early',
        categories: ['/ɪr/', '/ɛr/', '/ɜr/'], answer: 2, rule: 'ear' },
      { type: 'dictation', skill: 'spell', item: f('r_ctrl', 'chair') },
      { type: 'dictation', skill: 'spell', item: f('r_ctrl', 'hear') },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.rctrl[4], rule: 'r-controlled' }
    ],
    pass: { quiz: 0.67 },
    passText: '6 題答對 4 題以上。ear 的三種讀法是英文最亂的地方之一，標準放寬。'
  });

  /* ---------------------------------------------------------------- L6-04 */
  Curriculum.register({
    id: 'L6-04', level: 6,
    title: '雙母音：oi / oy 與 ou / ow',
    sub: 'boy, coin / cow, out',
    mins: 24,
    goal: '掌握 /ɔɪ/ 和 /aʊ/ 兩個雙母音，並用「位置規律」決定拼法。',
    rules: [
      { h: '/ɔɪ/：oi 在中間，oy 在字尾',
        t: 'c<b>oi</b>n, j<b>oi</b>n, n<b>oi</b>se, p<b>oi</b>nt（中間）<br>' +
           'b<b>oy</b>, t<b>oy</b>, j<b>oy</b>, enj<b>oy</b>（字尾）<br>' +
           '和 ai/ay 是同一套邏輯。' },
      { h: '/aʊ/：ou 在中間，ow 在字尾（傾向）',
        t: '<b>ou</b>：out, house, loud, sound, about（中間）<br>' +
           '<b>ow</b>：cow, now, how, brown, down<br>' +
           '這條沒有 oi/oy 那麼可靠（down、town 的 ow 在中間），但仍有參考價值。' },
      { h: '雙母音要「滑完整」',
        t: '/ɔɪ/ = /ɔ/ 滑到 /ɪ/<br>/aʊ/ = /ɑ/ 滑到 /ʊ/<br>' +
           '嘴型要有明顯的變化過程，不能只停在起點。' }
    ],
    explain:
      '<p><b>好消息：這兩個音中文都有</b></p>' +
      '<p>· /ɔɪ/ ≈ 注音的 ㄛㄧ（像「喔一」快速連讀）<br>' +
      '· /aʊ/ ≈ 注音的 ㄠ</p>' +
      '<p>所以發音通常不是問題，難的是<b>拼法選擇</b>。' +
      '用位置規律就能解決大部分情況。</p>' +
      '<p><b>ou 的其他讀法</b>（要注意）：<br>' +
      '· /ʌ/：country, young, touch, cousin<br>' +
      '· /uː/：you, soup, group, through<br>' +
      '· /ʊ/：would, could, should<br>' +
      '· /ɔ/：bought, thought, ought</p>',
    trap: 'ou 是英文裡讀法最多的組合之一（至少 6 種）。' +
          '遇到不確定的 ou，先試 /aʊ/，不對再試 /ʌ/ 和 /uː/。',
    res: ['readingbear', 'youglish'],
    demo: [
      { type: 'phoneme-card', id: 'oy' },
      { type: 'phoneme-card', id: 'ow' }
    ],
    ex: [
      { type: 'read-aloud', section: '朗讀', item: f('diphthongs', 'boy') },
      { type: 'read-aloud', section: '朗讀', item: f('diphthongs', 'house') },
      { type: 'spell-pick', section: '拼寫規律', answer: 'coin', options: ['coin', 'coyn'],
        rule: 'oi-oy', why: '/ɔɪ/ 在字中間，用 oi。' },
      { type: 'spell-pick', section: '拼寫規律', answer: 'toy', options: ['toy', 'toi'],
        rule: 'oi-oy', why: '/ɔɪ/ 在字尾，用 oy。' },
      { type: 'dictation', section: '聽寫', item: f('diphthongs', 'down') },
      { type: 'dictation', section: '聽寫', item: f('diphthongs', 'join') }
    ],
    quiz: [
      { type: 'spell-pick', skill: 'spell', answer: 'noise', options: ['noise', 'noyse'], rule: 'oi-oy' },
      { type: 'spell-pick', skill: 'spell', answer: 'enjoy', options: ['enjoy', 'enjoi'], rule: 'oi-oy' },
      { type: 'dictation', skill: 'spell', item: f('diphthongs', 'out') },
      { type: 'dictation', skill: 'spell', item: f('diphthongs', 'boy') },
      { type: 'rule-pick', skill: 'rule', prompt: '<b>country</b> 的 ou 唸什麼？',
        options: ['/aʊ/ 像 out', '/ʌ/ 像 cup', '/uː/ 像 you'],
        answer: 1, rule: 'ou', why: 'country, young, touch, cousin 的 ou 唸 /ʌ/。' },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.rctrl[6], rule: 'r-controlled' }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。oi/oy 的位置規律要全對——這條很可靠，沒理由錯。'
  });

  /* ---------------------------------------------------------------- L6-05 */
  Curriculum.register({
    id: 'L6-05', level: 6,
    title: 'Level 6 綜合驗收',
    sub: '所有 r 控制母音 + 雙母音混合',
    mins: 26,
    goal: '在混合題組裡穩定處理五種 r 控制母音與兩種雙母音。',
    rules: [
      { h: '五個 r 控制母音一次看完',
        t: '<b>/ɑr/</b> car ← ar<br>' +
           '<b>/ɔr/</b> for ← or, ore, oar, our<br>' +
           '<b>/ɜr/</b> bird ← er, ir, ur, ear, (w)or<br>' +
           '<b>/ɛr/</b> chair ← air, are, ear, ere<br>' +
           '<b>/ɪr/</b> hear ← ear, eer, ere, ier' }
    ],
    explain:
      '<p><b>你現在完成了英文的整個母音系統</b></p>' +
      '<p>短母音（5）＋長母音（5）＋雙母音（2）＋ r 控制（5）＋ schwa（1）' +
      '＝ 英文的全部母音。</p>' +
      '<p>接下來 Level 7 不再教新的音，而是教你<b>怎麼把長單字切開</b>，' +
      '讓你已經會的規則能用在 computer、important、understand 這種字上。</p>' +
      '<p class="small muted">從這裡開始，你的可讀字量會呈指數成長。</p>',
    trap: '這一課的假字題會混合各種 r 控制母音。錯了不要跳過——' +
          'r 控制母音在真實英文裡出現頻率極高（大約每 10 個字就有 1 個）。',
    res: ['readinguniverse', 'literacylearn'],
    ex: [
      { type: 'nonsense', section: '假字', word: WORDS.nonsense.rctrl[2], rule: 'r-controlled' },
      { type: 'nonsense', section: '假字', word: WORDS.nonsense.rctrl[3], rule: 'r-controlled' },
      { type: 'nonsense', section: '假字', word: WORDS.nonsense.rctrl[5], rule: 'r-controlled' },
      { type: 'sentence', section: '句子', text: G.sentences.rctrl[0] },
      { type: 'sentence', section: '句子', text: G.sentences.rctrl[3] }
    ],
    quiz: [
      { type: 'minimal-pair', skill: 'listen', a: 'car', b: 'core', pa: 'ar', pb: 'or', zh: 'ar / or' },
      { type: 'minimal-pair', skill: 'listen', a: 'hear', b: 'hair', pa: 'ear', pb: 'air', zh: 'ear / air' },
      { type: 'dictation', skill: 'spell', item: f('r_ctrl', 'turn') },
      { type: 'dictation', skill: 'spell', item: f('r_ctrl', 'corn') },
      { type: 'dictation', skill: 'spell', item: f('diphthongs', 'noise') },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.rctrl[7], rule: 'r-controlled' },
      { type: 'sentence', skill: 'fluency', text: G.sentences.rctrl[1] },
      { type: 'sentence', skill: 'fluency', text: G.sentences.rctrl[2] }
    ],
    pass: { quiz: 0.75 },
    passText: '8 題答對 6 題以上算過 Level 6。母音系統到此完整，接下來處理長單字。'
  });
})();
