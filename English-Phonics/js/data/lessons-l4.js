/* ==========================================================================
   Level 4 — Silent E 與長母音
   英文第一個真正的「規則」：字尾一個不出聲的 e，讓前面的母音唸字母名稱。
   學會這一級，可讀字量會跳一大階。
   ========================================================================== */
(function () {
  'use strict';
  var W = Words, G = WORDS;

  var SE = G.silent_e;
  function find(w) { return SE.filter(function (x) { return x.w === w; })[0] || SE[0]; }

  /* ---------------------------------------------------------------- L4-01 */
  Curriculum.register({
    id: 'L4-01', level: 4,
    title: 'Silent E 的魔法：a_e',
    sub: 'cap → cape、hat → hate',
    mins: 26,
    goal: '看到「母音 + 子音 + e」的結構，知道母音要唸字母名稱、最後的 e 不出聲。',
    rules: [
      { h: '規則：V-C-e → 母音唸「字母名稱」，e 不發音',
        t: 'c<b>a</b>p<b>e</b> → a 唸 /eɪ/（就是字母 A 的名字），e 不出聲。<br>' +
           '這個 e 常被叫做「魔法 e」或「沉默 e」，它自己不出聲，' +
           '但會伸手越過中間的子音，把前面的母音「叫醒」。' },
      { h: '對照組：沒有 e 就是短音',
        t: 'cap /kæp/ ↔ cape /keɪp/<br>' +
           'hat /hæt/ ↔ hate /heɪt/<br>' +
           'man /mæn/ ↔ mane /meɪn/' }
    ],
    explain:
      '<p><b>為什麼這條規則這麼重要？</b></p>' +
      '<p>因為它是英文第一個「一個符號改變另一個符號讀法」的規則。' +
      '學會之後，你看字的方式會改變：不再是從左到右一個一個唸，' +
      '而是<b>先掃一眼整個字，看有沒有結尾的 e</b>，再決定母音怎麼唸。</p>' +
      '<p>這個「先掃描再決定」的習慣，是後面所有進階解碼的基礎。</p>' +
      '<p class="small muted">解碼流程：<br>' +
      '1. 看到字 → 掃一眼有沒有字尾 e<br>' +
      '2. 有 → 母音唸長音（字母名稱）<br>' +
      '3. 沒有 → 母音唸短音</p>',
    trap: '例外要小心：have、give、live（動詞）、come、some、done、love。' +
          '這些字有 silent e 但母音是短音。<br>' +
          '原因是英文有條老規矩「英文字不能以 v 結尾」，所以 hav 要寫成 have。' +
          '這些字要當作「不規則字」個別記。',
    res: ['readingbear', 'rachel-vowels'],
    ex: [
      { type: 'sort', section: '規則應用', prompt: '這個字的母音是長音還是短音？',
        word: 'cape', categories: ['長音（字母名稱）', '短音'], answer: 0, rule: 'silent-e',
        why: '有字尾的 e，所以 a 唸長音 /eɪ/。' },
      { type: 'sort', section: '規則應用', prompt: '這個字的母音是長音還是短音？',
        word: 'cap', categories: ['長音（字母名稱）', '短音'], answer: 1, rule: 'silent-e',
        why: '沒有字尾 e，a 唸短音 /æ/。' },
      { type: 'read-aloud', section: '對照朗讀', item: find('cake') },
      { type: 'read-aloud', section: '對照朗讀', item: find('name') },
      { type: 'listen-pick', section: '聽辨', prompt: '你聽到的是哪一個？',
        play: 'tape', options: ['tap', 'tape'], answer: 'tape', cause: 'listening',
        diff: '短音 /æ/ vs 長音 /eɪ/' },
      { type: 'dictation', section: '聽寫', item: find('plane') },
      { type: 'dictation', section: '聽寫', item: find('grape') }
    ],
    quiz: [
      { type: 'listen-pick', skill: 'listen', prompt: '你聽到的是哪一個？',
        play: 'hate', options: ['hat', 'hate'], answer: 'hate', cause: 'listening' },
      { type: 'listen-pick', skill: 'listen', prompt: '你聽到的是哪一個？',
        play: 'man', options: ['man', 'mane'], answer: 'man', cause: 'listening' },
      { type: 'sort', skill: 'rule', prompt: '母音是長音還是短音？', word: 'made',
        categories: ['長音', '短音'], answer: 0, rule: 'silent-e' },
      { type: 'sort', skill: 'rule', prompt: '母音是長音還是短音？', word: 'have',
        categories: ['長音', '短音'], answer: 1, rule: 'silent-e-exception',
        why: 'have 是例外。英文字不能以 v 結尾，所以加了 e，但母音仍是短音。' },
      { type: 'dictation', skill: 'spell', item: find('cake') },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.silent_e[0], rule: 'silent-e' }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。have 那題答錯沒關係，但要記住這組例外字。'
  });

  /* ---------------------------------------------------------------- L4-02 */
  Curriculum.register({
    id: 'L4-02', level: 4,
    title: 'i_e 與 o_e',
    sub: 'bike, time / home, note',
    mins: 24,
    goal: '掌握 i_e = /aɪ/、o_e = /oʊ/，並和短音對照。',
    rules: [
      { h: 'i_e → /aɪ/（字母 I 的名字）',
        t: 'kit → kite、rid → ride、pin → pine、fin → fine' },
      { h: 'o_e → /oʊ/（字母 O 的名字）',
        t: 'not → note、hop → hope、rob → robe、cod → code' },
      { h: '/oʊ/ 是滑音，要收尾',
        t: '不是單純的「ㄛ」，嘴唇要從半圓收成小圓。' +
           '沒收尾的話 home 會聽起來像 "hom"。' }
    ],
    explain:
      '<p><b>i_e 對中文母語者相對簡單</b></p>' +
      '<p>/aɪ/ 就是注音的 ㄞ，中文有這個音。bike、time、like、five 通常不會有問題。</p>' +
      '<p><b>o_e 要注意收尾</b></p>' +
      '<p>/oʊ/ 是雙母音：從 /o/ 滑到 /ʊ/。中文的 ㄡ 比較接近，但英文的收尾更明顯。' +
      '唸 home 的時候，嘴唇最後要噘得比較圓、比較小。</p>' +
      '<p class="small muted">照鏡子：唸 home，嘴唇應該有「從開到合」的動作。' +
      '如果嘴唇從頭到尾沒動，就是沒滑完。</p>',
    trap: 'i_e 的例外：give、live（動詞）。o_e 的例外：come、some、done、none、love、glove。' +
          '這幾組都是高頻字，值得直接背下來。',
    res: ['readingbear'],
    ex: [
      { type: 'read-aloud', section: '朗讀', item: find('bike') },
      { type: 'read-aloud', section: '朗讀', item: find('home') },
      { type: 'listen-pick', section: '聽辨', prompt: '你聽到的是哪一個？',
        play: 'kite', options: ['kit', 'kite'], answer: 'kite', cause: 'listening' },
      { type: 'listen-pick', section: '聽辨', prompt: '你聽到的是哪一個？',
        play: 'not', options: ['not', 'note'], answer: 'not', cause: 'listening' },
      { type: 'dictation', section: '聽寫', item: find('time') },
      { type: 'dictation', section: '聽寫', item: find('note') },
      { type: 'dictation', section: '聽寫', item: find('stone') }
    ],
    quiz: [
      { type: 'listen-pick', skill: 'listen', prompt: '你聽到的是哪一個？',
        play: 'pine', options: ['pin', 'pine'], answer: 'pine', cause: 'listening' },
      { type: 'listen-pick', skill: 'listen', prompt: '你聽到的是哪一個？',
        play: 'hop', options: ['hop', 'hope'], answer: 'hop', cause: 'listening' },
      { type: 'dictation', skill: 'spell', item: find('five') },
      { type: 'dictation', skill: 'spell', item: find('rope') },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.silent_e[1], rule: 'silent-e' },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.silent_e[3], rule: 'silent-e' }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。假字題要對——那證明你是用規則在讀。'
  });

  /* ---------------------------------------------------------------- L4-03 */
  Curriculum.register({
    id: 'L4-03', level: 4,
    title: 'u_e 與 e_e：兩種 u 的長音',
    sub: 'cute vs tube、these',
    mins: 24,
    goal: '知道 u_e 有 /juː/ 和 /uː/ 兩種讀法，並掌握罕見的 e_e。',
    rules: [
      { h: 'u_e 的兩種讀法',
        t: '<b>/juː/（有 y 音）</b>：cute, mule, use, cube, huge, music<br>' +
           '<b>/uː/（沒有 y 音）</b>：tube, rule, June, blue, flute<br>' +
           '規律：前面是 r、l、j、ch 時多半沒有 y 音（rule, blue, June）。' },
      { h: 'e_e 很少見',
        t: 'these, theme, Pete, complete, extreme。<br>' +
           '長 e 音更常用 ee 或 ea 來拼（見 Level 5）。' }
    ],
    explain:
      '<p><b>/juː/ 對中文母語者其實不難</b></p>' +
      '<p>就是「ㄧㄡ」的感覺（you）。cute = /kjuːt/，前面加一個 y 的滑音。</p>' +
      '<p>難的是<b>判斷什麼時候有 y、什麼時候沒有</b>。' +
      '好消息：唸錯了通常還是聽得懂，這不是高風險錯誤。</p>' +
      '<p><b>比較實用的判斷法</b>：如果 u 前面是 r、l、j、s、ch，通常沒有 y 音。<br>' +
      'rule、blue、June、super、chew — 都沒有 y。<br>' +
      'cute、mute、fuel、human — 都有 y。</p>',
    trap: '注意：美式和英式在這裡有差異。' +
          'tuesday、new、duke — 英式有 y 音（/tjuːzdeɪ/），美式沒有（/tuːzdeɪ/）。' +
          '這套課程以美式為準。',
    res: ['rachel-vowels', 'youglish'],
    ex: [
      { type: 'read-aloud', section: '朗讀', item: find('cute'),
        prompt: '唸這個字。u 前面要有一個 y 的滑音：/kjuːt/。' },
      { type: 'read-aloud', section: '朗讀', item: find('tube'),
        prompt: '唸這個字。這個 u 沒有 y 音：/tuːb/。' },
      { type: 'sort', section: '分類', prompt: '這個字的 u 有沒有 y 音？',
        word: 'mule', categories: ['有 y 音 /juː/', '沒有 y 音 /uː/'], answer: 0, rule: 'u_e',
        why: 'mule = /mjuːl/，m 後面的 u 有 y 音。' },
      { type: 'sort', section: '分類', prompt: '這個字的 u 有沒有 y 音？',
        word: 'rule', categories: ['有 y 音 /juː/', '沒有 y 音 /uː/'], answer: 1, rule: 'u_e',
        why: 'r 後面的 u 沒有 y 音：/ruːl/。' },
      { type: 'dictation', section: '聽寫', item: find('cute') },
      { type: 'dictation', section: '聽寫', item: find('tube') }
    ],
    quiz: [
      { type: 'sort', skill: 'rule', prompt: '這個字的 u 有沒有 y 音？', word: 'cube',
        categories: ['有 y 音', '沒有 y 音'], answer: 0, rule: 'u_e' },
      { type: 'sort', skill: 'rule', prompt: '這個字的 u 有沒有 y 音？', word: 'June',
        categories: ['有 y 音', '沒有 y 音'], answer: 1, rule: 'u_e' },
      { type: 'dictation', skill: 'spell', item: find('cute') },
      { type: 'read-aloud', skill: 'decode', item: { w: 'these', parts: null }, plain: true },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.silent_e[2], rule: 'silent-e' },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.silent_e[5], rule: 'silent-e' }
    ],
    pass: { quiz: 0.75 },
    passText: '6 題答對 4 題以上。y 音的判斷本來就有灰色地帶，不用太苛求。'
  });

  /* ---------------------------------------------------------------- L4-04 */
  Curriculum.register({
    id: 'L4-04', level: 4,
    title: '開音節：為什麼 me、go、hi 是長音',
    sub: '沒有 silent e 也可能是長音',
    mins: 22,
    goal: '理解「開音節 vs 閉音節」，能判斷一個音節該唸長音還是短音。',
    rules: [
      { h: '閉音節：母音後面有子音「關門」→ 短音',
        t: 'c<b>at</b>、s<b>it</b>、h<b>ot</b>、b<b>ed</b> — 母音被子音關起來，唸短音。' },
      { h: '開音節：母音在音節結尾「沒關門」→ 長音',
        t: '<b>me</b>、<b>go</b>、<b>hi</b>、<b>we</b>、<b>no</b>、<b>she</b> — 母音是最後一個字母，唸長音。' },
      { h: '這條規則在多音節字裡更有用',
        t: '<b>ti</b>·ger → ti 是開音節，i 唸長音 /aɪ/<br>' +
           '<b>rab</b>·bit → rab 是閉音節，a 唸短音 /æ/<br>' +
           '這是 Level 7 音節切分的基礎。' }
    ],
    explain:
      '<p><b>「開」和「閉」怎麼理解？</b></p>' +
      '<p>把音節想成一個房間，母音是裡面的人。<br>' +
      '· 後面有子音 = 門關上了 → 母音被壓短（閉音節）<br>' +
      '· 後面沒有子音 = 門開著 → 母音可以拉長（開音節）</p>' +
      '<p>這個比喻不完全精確，但對記憶很有效。</p>' +
      '<p><b>實用價值</b>：遇到不認識的多音節字，先切音節，再看每個音節是開是閉，' +
      '就能推出母音怎麼唸。這是「見字能讀」的核心技術。</p>',
    trap: '常見例外：do、to、who（o 唸 /uː/ 不是 /oʊ/）。' +
          '還有 the、a 這種在句子裡會弱化成 schwa 的功能字。',
    res: ['ufli-toolbox'],
    ex: [
      { type: 'sort', section: '開閉判斷', prompt: '這是開音節還是閉音節？',
        word: 'go', categories: ['開音節（長音）', '閉音節（短音）'], answer: 0, rule: 'syllable-type',
        why: 'o 是最後一個字母，沒有子音關門 → 開音節 → 長音 /oʊ/。' },
      { type: 'sort', section: '開閉判斷', prompt: '這是開音節還是閉音節？',
        word: 'got', categories: ['開音節（長音）', '閉音節（短音）'], answer: 1, rule: 'syllable-type',
        why: 'o 後面有 t 關門 → 閉音節 → 短音 /ɑ/。' },
      { type: 'listen-pick', section: '聽辨', prompt: '你聽到的是哪一個？',
        play: 'he', options: ['he', 'hen'], answer: 'he', cause: 'listening' },
      { type: 'read-aloud', section: '朗讀', item: { w: 'tiger', parts: null }, plain: true,
        prompt: '切成 ti·ger。第一個音節是開音節，所以 i 唸長音。' },
      { type: 'read-aloud', section: '朗讀', item: { w: 'robot', parts: null }, plain: true,
        prompt: '切成 ro·bot。ro 是開音節。' },
      { type: 'dictation', section: '聽寫', item: { w: 'she', parts: null, ph: [] } }
    ],
    quiz: [
      { type: 'sort', skill: 'rule', prompt: '開音節還是閉音節？', word: 'me',
        categories: ['開音節', '閉音節'], answer: 0, rule: 'syllable-type' },
      { type: 'sort', skill: 'rule', prompt: '開音節還是閉音節？', word: 'met',
        categories: ['開音節', '閉音節'], answer: 1, rule: 'syllable-type' },
      { type: 'rule-pick', skill: 'rule', prompt: '<b>ti·ger</b> 的第一個音節，i 應該唸什麼？',
        options: ['短音 /ɪ/ 像 sit', '長音 /aɪ/ 像 bike'],
        answer: 1, rule: 'syllable-type',
        why: 'ti 沒有子音關門，是開音節，所以唸長音。' },
      { type: 'rule-pick', skill: 'rule', prompt: '<b>rab·bit</b> 的第一個音節，a 應該唸什麼？',
        options: ['短音 /æ/ 像 cat', '長音 /eɪ/ 像 cake'],
        answer: 0, rule: 'syllable-type',
        why: 'rab 後面有 b 關門，是閉音節，唸短音。' },
      { type: 'read-aloud', skill: 'decode', item: { w: 'music', parts: null }, plain: true },
      { type: 'dictation', skill: 'spell', item: { w: 'we', parts: null, ph: [] } }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。開/閉音節的判斷要穩——Level 7 全靠這個。'
  });

  /* ---------------------------------------------------------------- L4-05 */
  Curriculum.register({
    id: 'L4-05', level: 4,
    title: 'Level 4 綜合驗收',
    sub: '長短音混合 + 閱讀',
    mins: 26,
    goal: '在混合題組裡穩定判斷長音／短音，並流暢讀出含 silent e 的句子。',
    rules: [
      { h: '解碼流程（記起來）',
        t: '1. 掃一眼整個字<br>2. 有字尾 e？→ 母音唸長音<br>' +
           '3. 沒有，母音後面有子音？→ 短音<br>4. 母音在結尾？→ 長音' }
    ],
    explain:
      '<p><b>「試兩次」策略</b></p>' +
      '<p>遇到不確定的字，先照規則唸一次。如果唸出來不像任何你認識的字，' +
      '就把母音換成另一種長度再試一次。</p>' +
      '<p>例如看到 <i>have</i>：<br>' +
      '第一次照規則 → /heɪv/ → 聽起來不像認識的字<br>' +
      '第二次換短音 → /hæv/ → 對了，是 have</p>' +
      '<p class="small muted">這個「試兩次」的策略，比死背例外表有效得多，' +
      '而且能處理沒學過的字。Level 5 的 vowel teams 更需要它。</p>',
    trap: '不規則字清單（值得直接記）：have, give, live, come, some, done, none, love, glove, above, one, once。',
    res: ['readinguniverse', 'starfall-pdf'],
    ex: [
      { type: 'listen-pick', section: '長短辨識', prompt: '你聽到的是哪一個？',
        play: 'cube', options: ['cub', 'cube'], answer: 'cube', cause: 'listening' },
      { type: 'listen-pick', section: '長短辨識', prompt: '你聽到的是哪一個？',
        play: 'rid', options: ['rid', 'ride'], answer: 'rid', cause: 'listening' },
      { type: 'nonsense', section: '假字', word: WORDS.nonsense.silent_e[4], rule: 'silent-e' },
      { type: 'nonsense', section: '假字', word: WORDS.nonsense.silent_e[6], rule: 'silent-e' },
      { type: 'sentence', section: '句子', text: G.sentences.silent_e[0] },
      { type: 'sentence', section: '句子', text: G.sentences.silent_e[2] }
    ],
    quiz: [
      { type: 'listen-pick', skill: 'listen', prompt: '你聽到的是哪一個？',
        play: 'tape', options: ['tap', 'tape'], answer: 'tape', cause: 'listening' },
      { type: 'listen-pick', skill: 'listen', prompt: '你聽到的是哪一個？',
        play: 'hop', options: ['hop', 'hope'], answer: 'hop', cause: 'listening' },
      { type: 'dictation', skill: 'spell', item: find('smile') },
      { type: 'dictation', skill: 'spell', item: find('grape') },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.silent_e[7], rule: 'silent-e' },
      { type: 'read-aloud', skill: 'decode', item: { w: 'above', parts: null }, plain: true,
        hint: '提示：這是例外字。' },
      { type: 'sentence', skill: 'fluency', text: G.sentences.silent_e[1] },
      { type: 'sentence', skill: 'fluency', text: G.sentences.silent_e[3] }
    ],
    pass: { quiz: 0.8 },
    passText: '8 題答對 7 題才算過 Level 4。到這裡你已經能讀大部分單音節英文字了。'
  });
})();
