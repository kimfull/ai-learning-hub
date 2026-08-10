/* ==========================================================================
   Level 8 — 進階拼寫規則（Encoding）
   從「聽得懂」到「寫得出」。這些規則能解釋英文絕大多數的拼寫決策。
   ========================================================================== */
(function () {
  'use strict';
  var W = Words, G = WORDS;

  /* ---------------------------------------------------------------- L8-01 */
  Curriculum.register({
    id: 'L8-01', level: 8,
    title: 'FLOSS 規則與 ck / k 的選擇',
    sub: '字尾子音要不要加倍',
    mins: 24,
    goal: '掌握 f、l、s、z 在單音節短母音字尾要加倍，以及 /k/ 音何時寫 ck。',
    rules: [
      { h: 'FLOSS 規則',
        t: '<b>單音節 + 短母音</b>結尾的 f、l、s、z 要寫兩個：<br>' +
           'sti<b>ff</b>, be<b>ll</b>, gra<b>ss</b>, bu<b>zz</b>, o<b>ff</b>, wi<b>ll</b>, mi<b>ss</b><br>' +
           '口訣就是 FLOSS 這個字本身：F-L-O-SS。' },
      { h: 'FLOSS 的例外',
        t: 'if, of, us, bus, gas, this, yes, plus, has, was, his<br>' +
           '這些都是高頻功能字，直接記。' },
      { h: 'ck / k 的選擇',
        t: '<b>短母音 + /k/ 在字尾 → ck</b>：back, duck, lock, sick, rock<br>' +
           '<b>其他情況 → k</b>：book（長母音）、milk（前面是子音）、take（silent e）' }
    ],
    explain:
      '<p><b>這些規則的共同邏輯：保護短母音</b></p>' +
      '<p>英文的拼寫系統一直在傳達一個訊息：「這個母音是短的」。<br>' +
      '· 加倍子音（bell、grass）<br>· 用三字母組（back、catch、badge）<br>' +
      '都是同一個用途。</p>' +
      '<p>反過來說，只有一個子音時，你的大腦會傾向把母音讀成長音。' +
      '這就是為什麼 bel 看起來像 /biːl/，但 bell 明確是 /bɛl/。</p>' +
      '<p class="small muted">理解這個邏輯之後，拼寫就不是死背，而是「在傳達訊息」。</p>',
    trap: '注意 FLOSS 只適用<b>單音節</b>字。<br>' +
          'careful 只有一個 l（因為是兩個音節）、until 只有一個 l。',
    res: ['ufli-toolbox'],
    ex: [
      { type: 'spell-pick', section: 'FLOSS', answer: 'bell', options: ['bell', 'bel'],
        rule: 'floss', why: '單音節 + 短母音 + l 結尾 → 要加倍。' },
      { type: 'spell-pick', section: 'FLOSS', answer: 'grass', options: ['grass', 'gras'],
        rule: 'floss', why: '單音節 + 短母音 + s 結尾 → 要加倍。' },
      { type: 'spell-pick', section: 'FLOSS', answer: 'bus', options: ['bus', 'buss'],
        rule: 'floss', why: 'bus 是 FLOSS 的例外，只有一個 s。這類例外字要記。' },
      { type: 'spell-pick', section: 'ck / k', answer: 'rock', options: ['rock', 'rok'],
        rule: 'ck-k', why: '短母音 /ɑ/ + 字尾 /k/ → ck。' },
      { type: 'spell-pick', section: 'ck / k', answer: 'book', options: ['book', 'boock'],
        rule: 'ck-k', why: 'oo 是 vowel team 不是短母音 → 用 k。' },
      { type: 'dictation', section: '聽寫', item: { w: 'will', parts: null, ph: [] } }
    ],
    quiz: [
      { type: 'spell-pick', skill: 'spell', answer: 'miss', options: ['miss', 'mis'], rule: 'floss' },
      { type: 'spell-pick', skill: 'spell', answer: 'off', options: ['off', 'of'], rule: 'floss',
        why: 'off（離開）要兩個 f；of（的）是例外只有一個 f。兩個不同的字。' },
      { type: 'spell-pick', skill: 'spell', answer: 'sick', options: ['sick', 'sik'], rule: 'ck-k' },
      { type: 'spell-pick', skill: 'spell', answer: 'milk', options: ['milk', 'milck'], rule: 'ck-k' },
      { type: 'dictation', skill: 'spell', item: { w: 'duck', parts: null, ph: [] } },
      { type: 'dictation', skill: 'spell', item: { w: 'grass', parts: null, ph: [] } }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。FLOSS 和 ck 規則命中率很高，值得練到自動反應。'
  });

  /* ---------------------------------------------------------------- L8-02 */
  Curriculum.register({
    id: 'L8-02', level: 8,
    title: 'Soft C / Soft G 與 tch / dge',
    sub: 'c 什麼時候唸 /s/、g 什麼時候唸 /dʒ/',
    mins: 26,
    goal: '掌握 c 和 g 的軟硬音規則，以及 tch / dge 的使用時機。',
    rules: [
      { h: 'Soft C 規則：c 後面接 e、i、y → 唸 /s/',
        t: '<b>軟音 /s/</b>：<b>ce</b>nt, <b>ci</b>ty, <b>cy</b>cle, fa<b>ce</b>, ni<b>ce</b>, cir<b>cl</b>e<br>' +
           '<b>硬音 /k/</b>：<b>ca</b>t, <b>co</b>t, <b>cu</b>t, <b>cl</b>ap, <b>cr</b>ab<br>' +
           '記法：<b>c 遇到 e、i、y 就軟掉</b>。' },
      { h: 'Soft G 規則：g 後面接 e、i、y → 唸 /dʒ/',
        t: '<b>軟音 /dʒ/</b>：<b>ge</b>m, <b>gi</b>ant, <b>gy</b>m, a<b>ge</b>, hu<b>ge</b>, ma<b>gi</b>c<br>' +
           '<b>硬音 /g/</b>：<b>ga</b>me, <b>go</b>, <b>gu</b>m, <b>gl</b>ad, <b>gr</b>ab<br>' +
           '但 g 的例外比 c 多：<b>ge</b>t, <b>gi</b>ve, <b>gi</b>rl, <b>gi</b>ft, <b>ge</b>t 都是硬音。' },
      { h: 'tch / dge：短母音之後',
        t: '<b>短母音 + /tʃ/ → tch</b>：catch, watch, match, pitch<br>' +
           '<b>其他 → ch</b>：beach（vowel team）、lunch（前有子音）<br>' +
           '<b>短母音 + /dʒ/ → dge</b>：badge, bridge, judge, edge<br>' +
           '<b>其他 → ge</b>：large、change、huge' }
    ],
    explain:
      '<p><b>Soft C / G 是解碼與拼寫的雙向規則</b></p>' +
      '<p><b>讀的時候</b>：看到 c 或 g，先看下一個字母。是 e/i/y 就唸軟音。<br>' +
      '<b>寫的時候</b>：聽到 /s/ 音，如果後面接的是 e/i/y，就可能要寫 c 而不是 s。</p>' +
      '<p>例：city 不是 sity、cent 不是 sent（sent 是另一個字）。</p>' +
      '<p><b>為什麼 g 的例外比較多？</b><br>' +
      '因為 get、give、girl 這些是古英語留下的字（本來就唸硬音），' +
      '而 gem、giant 這些是從法語借來的。語源不同，規則不同。</p>',
    trap: '注意 c 在字尾單獨出現時唸 /k/：music, picnic, traffic。<br>' +
          '而且英文字幾乎不以單一個 c 結尾表示 /s/——那個位置會用 ce（face、nice）。',
    res: ['ufli-toolbox'],
    ex: [
      { type: 'sort', section: 'Soft C', prompt: '這個字的 c 唸什麼？',
        word: 'city', categories: ['/s/（軟音）', '/k/（硬音）'], answer: 0, rule: 'soft-c',
        why: 'c 後面是 i → 軟音 /s/。' },
      { type: 'sort', section: 'Soft C', prompt: '這個字的 c 唸什麼？',
        word: 'cat', categories: ['/s/（軟音）', '/k/（硬音）'], answer: 1, rule: 'soft-c',
        why: 'c 後面是 a → 硬音 /k/。' },
      { type: 'sort', section: 'Soft G', prompt: '這個字的 g 唸什麼？',
        word: 'giant', categories: ['/dʒ/（軟音）', '/g/（硬音）'], answer: 0, rule: 'soft-g' },
      { type: 'sort', section: 'Soft G', prompt: '這個字的 g 唸什麼？',
        word: 'girl', categories: ['/dʒ/（軟音）', '/g/（硬音）'], answer: 1, rule: 'soft-g',
        why: 'girl 是例外。get, give, girl, gift 都是硬音。' },
      { type: 'spell-pick', section: 'tch / ch', answer: 'match', options: ['match', 'mach'],
        rule: 'tch-ch', why: '短母音 /æ/ 之後 → tch。' },
      { type: 'spell-pick', section: 'dge / ge', answer: 'bridge', options: ['bridge', 'brige'],
        rule: 'dge-ge', why: '短母音 /ɪ/ 之後 → dge。' }
    ],
    quiz: [
      { type: 'sort', skill: 'rule', prompt: 'c 唸什麼？', word: 'cent',
        categories: ['/s/', '/k/'], answer: 0, rule: 'soft-c' },
      { type: 'sort', skill: 'rule', prompt: 'c 唸什麼？', word: 'cup',
        categories: ['/s/', '/k/'], answer: 1, rule: 'soft-c' },
      { type: 'sort', skill: 'rule', prompt: 'g 唸什麼？', word: 'gym',
        categories: ['/dʒ/', '/g/'], answer: 0, rule: 'soft-g' },
      { type: 'spell-pick', skill: 'spell', answer: 'watch', options: ['watch', 'wach'], rule: 'tch-ch' },
      { type: 'spell-pick', skill: 'spell', answer: 'large', options: ['large', 'lardge'], rule: 'dge-ge',
        why: '/dʒ/ 前面是 r 不是短母音 → 用 ge。' },
      { type: 'dictation', skill: 'spell', item: { w: 'judge', parts: null, ph: [] } }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。Soft C 幾乎沒例外，要全對；Soft G 有例外，錯一題可接受。'
  });

  /* ---------------------------------------------------------------- L8-03 */
  Curriculum.register({
    id: 'L8-03', level: 8,
    title: '加字尾（一）：子音加倍的 1-1-1 規則',
    sub: 'hop → hopping，但 hope → hoping',
    mins: 26,
    goal: '加 -ing、-ed、-er 時，能正確判斷要不要把最後的子音加倍。',
    rules: [
      { h: '1-1-1 規則',
        t: '一個<b>音節</b>、一個<b>母音字母</b>、一個<b>尾子音</b> → 加母音開頭的字尾時，子音要加倍。<br>' +
           'hop → hop<b>p</b>ing、run → run<b>n</b>ing、big → big<b>g</b>er、sit → sit<b>t</b>ing' },
      { h: '不加倍的情況',
        t: '· 兩個母音字母：rain → raining、read → reading<br>' +
           '· 兩個尾子音：jump → jumping、help → helping<br>' +
           '· 字尾是 silent e：hope → hoping（先去 e）<br>' +
           '· 字尾是 w、x、y：snow → snowing、fix → fixing、play → playing' },
      { h: '多音節字：重音在最後一節才加倍',
        t: 'be<b>GIN</b> → beginning（重音在最後）<br>' +
           '<b>VIS</b>it → visiting（重音在第一節，不加倍）<br>' +
           'ad<b>MIT</b> → admitting、<b>OP</b>en → opening' }
    ],
    explain:
      '<p><b>為什麼要加倍？還是為了保護短母音</b></p>' +
      '<p>hop + ing 如果寫成 hoping，中間的 o 會被讀成長音（因為 o-p-i 看起來像開音節）。<br>' +
      '加倍變成 hopping，o 後面有兩個子音 → 明確是閉音節 → 短音。</p>' +
      '<p>所以：<br>· <b>hopping</b> = hop（跳）+ ing → /ˈhɑpɪŋ/<br>' +
      '· <b>hoping</b> = hope（希望）+ ing → /ˈhoʊpɪŋ/</p>' +
      '<p class="small muted">一個字母的差別，兩個完全不同的字。這就是拼寫規則的實際功能。</p>',
    trap: '英式和美式在 l 結尾有差異：<br>' +
          '· travel → 美式 traveling（一個 l）、英式 travelling（兩個 l）<br>' +
          '· 這套課程用美式。',
    res: ['ufli-toolbox'],
    ex: [
      { type: 'spell-pick', section: '加倍判斷', answer: 'running', options: ['running', 'runing'],
        rule: 'doubling', why: 'run 是 1 音節 1 母音 1 尾子音 → 加倍。' },
      { type: 'spell-pick', section: '加倍判斷', answer: 'jumping', options: ['jumping', 'jumpping'],
        rule: 'doubling', why: 'jump 有兩個尾子音（m、p）→ 不加倍。' },
      { type: 'spell-pick', section: '加倍判斷', answer: 'raining', options: ['raining', 'rainning'],
        rule: 'doubling', why: 'rain 有兩個母音字母（ai）→ 不加倍。' },
      { type: 'spell-pick', section: '加倍判斷', answer: 'hopping', options: ['hopping', 'hoping'],
        rule: 'doubling', why: 'hop（跳）要加倍。hoping 是 hope（希望）的變化。' },
      { type: 'spell-pick', section: '多音節', answer: 'beginning', options: ['beginning', 'begining'],
        rule: 'doubling', why: 'be-GIN 重音在最後一節 → 加倍。' },
      { type: 'spell-pick', section: '多音節', answer: 'visiting', options: ['visiting', 'visitting'],
        rule: 'doubling', why: 'VIS-it 重音在第一節 → 不加倍。' }
    ],
    quiz: [
      { type: 'spell-pick', skill: 'spell', answer: 'sitting', options: ['sitting', 'siting'], rule: 'doubling' },
      { type: 'spell-pick', skill: 'spell', answer: 'reading', options: ['reading', 'readding'], rule: 'doubling' },
      { type: 'spell-pick', skill: 'spell', answer: 'bigger', options: ['bigger', 'biger'], rule: 'doubling' },
      { type: 'spell-pick', skill: 'spell', answer: 'playing', options: ['playing', 'playying'], rule: 'doubling' },
      { type: 'spell-pick', skill: 'spell', answer: 'admitted', options: ['admitted', 'admited'], rule: 'doubling' },
      { type: 'dictation', skill: 'spell', item: { w: 'stopping', parts: null, ph: [] } }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。1-1-1 規則是英文拼寫最實用的規則之一，值得練到反射。'
  });

  /* ---------------------------------------------------------------- L8-04 */
  Curriculum.register({
    id: 'L8-04', level: 8,
    title: '加字尾（二）：去 e、y 變 i',
    sub: 'make → making、happy → happier',
    mins: 24,
    goal: '掌握「去 e 加字尾」和「y 變 i」兩條規則及其例外。',
    rules: [
      { h: '去 e 規則：silent e + 母音開頭的字尾 → 去掉 e',
        t: 'make → mak<b>ing</b>、hope → hop<b>ed</b>、use → us<b>able</b>、nice → nic<b>er</b><br>' +
           '但接<b>子音</b>開頭的字尾就保留 e：hope → hope<b>ful</b>、nice → nice<b>ly</b>、use → use<b>less</b>' },
      { h: '去 e 的例外：soft c / g 前要保留 e',
        t: 'notice → notice<b>able</b>（不能寫 noticable，否則 c 會變硬音）<br>' +
           'change → change<b>able</b>、courage → courage<b>ous</b><br>' +
           '因為那個 e 的任務就是讓 c / g 保持軟音。' },
      { h: 'y 變 i 規則：子音 + y → y 變 i',
        t: 'happy → happ<b>i</b>er、city → cit<b>i</b>es、try → tr<b>i</b>ed、baby → bab<b>i</b>es<br>' +
           '但<b>母音 + y</b> 就不變：play → played、boy → boys、key → keys<br>' +
           '而且接 -ing 時 y 永遠不變：try → try<b>ing</b>、cry → cry<b>ing</b>（避免 ii）' }
    ],
    explain:
      '<p><b>三條規則的判斷順序</b></p>' +
      '<p>要加字尾時，依序問自己：<br>' +
      '1. 原字結尾是 silent e 嗎？→ 字尾是母音開頭就去 e<br>' +
      '2. 原字結尾是「子音 + y」嗎？→ 除了 -ing 都要變 i<br>' +
      '3. 符合 1-1-1 嗎？→ 子音加倍</p>' +
      '<p>示範：<b>happy + er</b><br>' +
      '不是 silent e → 是「子音 p + y」→ y 變 i → happier</p>' +
      '<p>示範：<b>make + ing</b><br>' +
      '是 silent e，ing 是母音開頭 → 去 e → making</p>',
    trap: '注意 -ing 的特殊性：y 遇到 -ing 永遠不變（trying、crying、studying），' +
          '因為英文不允許 ii 連寫。',
    res: ['ufli-toolbox'],
    ex: [
      { type: 'spell-pick', section: '去 e', answer: 'making', options: ['making', 'makeing'],
        rule: 'drop-e', why: 'make 的 silent e 遇到母音開頭的 -ing → 去掉。' },
      { type: 'spell-pick', section: '去 e', answer: 'hopeful', options: ['hopeful', 'hopful'],
        rule: 'drop-e', why: '-ful 是子音開頭 → 保留 e。' },
      { type: 'spell-pick', section: '去 e 例外', answer: 'noticeable', options: ['noticeable', 'noticable'],
        rule: 'drop-e', why: '要保留 e 才能讓 c 維持軟音 /s/。' },
      { type: 'spell-pick', section: 'y 變 i', answer: 'happier', options: ['happier', 'happyer'],
        rule: 'y-to-i', why: '子音 p + y → y 變 i。' },
      { type: 'spell-pick', section: 'y 變 i', answer: 'played', options: ['played', 'plaied'],
        rule: 'y-to-i', why: '母音 a + y → 不變。' },
      { type: 'spell-pick', section: 'y 變 i', answer: 'crying', options: ['crying', 'criing'],
        rule: 'y-to-i', why: '接 -ing 時 y 永遠不變。' }
    ],
    quiz: [
      { type: 'spell-pick', skill: 'spell', answer: 'using', options: ['using', 'useing'], rule: 'drop-e' },
      { type: 'spell-pick', skill: 'spell', answer: 'nicely', options: ['nicely', 'nicly'], rule: 'drop-e' },
      { type: 'spell-pick', skill: 'spell', answer: 'cities', options: ['cities', 'citys'], rule: 'y-to-i' },
      { type: 'spell-pick', skill: 'spell', answer: 'boys', options: ['boys', 'boies'], rule: 'y-to-i' },
      { type: 'spell-pick', skill: 'spell', answer: 'studying', options: ['studying', 'studiing'], rule: 'y-to-i' },
      { type: 'dictation', skill: 'spell', item: { w: 'babies', parts: null, ph: [] } }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。這三條規則（去 e、y 變 i、加倍）涵蓋了英文動詞名詞變化的絕大部分。'
  });

  /* ---------------------------------------------------------------- L8-05 */
  Curriculum.register({
    id: 'L8-05', level: 8,
    title: '複數、過去式與不規則字',
    sub: '-s 的三種聲音、-ed 的三種聲音',
    mins: 28,
    goal: '知道 -s 和 -ed 各有三種讀法，並掌握高頻不規則字。',
    rules: [
      { h: '-s 的三種讀法',
        t: '<b>/s/</b>（前面是清音）：cats, books, maps, cliffs<br>' +
           '<b>/z/</b>（前面是濁音或母音）：dogs, beds, cars, keys<br>' +
           '<b>/ɪz/</b>（前面是 s, z, sh, ch, x, ge）：buses, dishes, watches, boxes' },
      { h: '-ed 的三種讀法',
        t: '<b>/t/</b>（前面是清音）：walked, jumped, washed, kissed<br>' +
           '<b>/d/</b>（前面是濁音或母音）：played, cleaned, loved, opened<br>' +
           '<b>/ɪd/</b>（前面是 t 或 d）：wanted, needed, started, decided' },
      { h: '拼法加 es 的時機',
        t: '字尾是 s, x, z, ch, sh → 加 es：buses, boxes, watches, dishes<br>' +
           '子音 + y → 變 ies：cities, babies<br>' +
           '有些 f/fe → ves：leaf → leaves, knife → knives' }
    ],
    explain:
      '<p><b>這是「同化」現象：聲音會被鄰居影響</b></p>' +
      '<p>你不需要背這三種讀法——只要你的發音正確，它會自然發生。' +
      '試試看：唸 "cats"，你的嘴巴根本做不出 /kætz/，' +
      '因為 /t/ 之後接 /z/ 太費力，會自動變成 /s/。</p>' +
      '<p>重點是<b>要知道它們存在</b>，這樣聽的時候才不會困惑，' +
      '寫的時候也不會因為聽到 /z/ 就寫成 z。</p>' +
      '<p class="small muted">中文母語者常見錯誤：把所有 -s 都唸成 /s/、' +
      '把所有 -ed 都唸成 /ɪd/（walked 唸成 "walk-ed"）。</p>',
    trap: '常見不規則複數：child→children, man→men, woman→women, foot→feet, ' +
          'tooth→teeth, mouse→mice, person→people。這些沒有規則，直接記。',
    res: ['sos', 'youglish'],
    ex: [
      { type: 'sort', section: '-s 的讀法', prompt: '<b>dogs</b> 的 s 唸什麼？',
        word: 'dogs', categories: ['/s/', '/z/', '/ɪz/'], answer: 1, rule: 'plural-s',
        why: '/g/ 是濁音，所以 s 唸 /z/。' },
      { type: 'sort', section: '-s 的讀法', prompt: '<b>cats</b> 的 s 唸什麼？',
        word: 'cats', categories: ['/s/', '/z/', '/ɪz/'], answer: 0, rule: 'plural-s',
        why: '/t/ 是清音，所以 s 唸 /s/。' },
      { type: 'sort', section: '-s 的讀法', prompt: '<b>boxes</b> 的 es 唸什麼？',
        word: 'boxes', categories: ['/s/', '/z/', '/ɪz/'], answer: 2, rule: 'plural-s',
        why: 'x 後面加 es，唸 /ɪz/，多出一個音節。' },
      { type: 'sort', section: '-ed 的讀法', prompt: '<b>walked</b> 的 ed 唸什麼？',
        word: 'walked', categories: ['/t/', '/d/', '/ɪd/'], answer: 0, rule: 'past-ed',
        why: '/k/ 是清音，ed 唸 /t/。walked = /wɔkt/，只有一個音節。' },
      { type: 'sort', section: '-ed 的讀法', prompt: '<b>wanted</b> 的 ed 唸什麼？',
        word: 'wanted', categories: ['/t/', '/d/', '/ɪd/'], answer: 2, rule: 'past-ed',
        why: '前面是 t，所以 ed 唸 /ɪd/，多一個音節。' },
      { type: 'spell-pick', section: '拼法', answer: 'watches', options: ['watches', 'watchs'],
        rule: 'plural-spelling', why: 'ch 結尾要加 es。' }
    ],
    quiz: [
      { type: 'sort', skill: 'rule', prompt: '<b>beds</b> 的 s 唸什麼？', word: 'beds',
        categories: ['/s/', '/z/', '/ɪz/'], answer: 1, rule: 'plural-s' },
      { type: 'sort', skill: 'rule', prompt: '<b>dishes</b> 的 es 唸什麼？', word: 'dishes',
        categories: ['/s/', '/z/', '/ɪz/'], answer: 2, rule: 'plural-s' },
      { type: 'sort', skill: 'rule', prompt: '<b>played</b> 的 ed 唸什麼？', word: 'played',
        categories: ['/t/', '/d/', '/ɪd/'], answer: 1, rule: 'past-ed' },
      { type: 'sort', skill: 'rule', prompt: '<b>needed</b> 的 ed 唸什麼？', word: 'needed',
        categories: ['/t/', '/d/', '/ɪd/'], answer: 2, rule: 'past-ed' },
      { type: 'spell-pick', skill: 'spell', answer: 'leaves', options: ['leaves', 'leafs'],
        rule: 'plural-spelling', why: 'leaf → leaves，f 變 ves。' },
      { type: 'dictation', skill: 'spell', item: { w: 'watches', parts: null, ph: [] } }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。-s 和 -ed 的三種讀法會了，你的英文聽起來會自然很多。'
  });

  /* ---------------------------------------------------------------- L8-06 */
  var HEART = WORDS.heart;
  function heartWord(name) {
    return HEART.filter(function (x) { return x.w === name; })[0] || HEART[0];
  }

  Curriculum.register({
    id: 'L8-06', level: 8,
    title: '不規則字（Heart Words）',
    sub: '大部分照規則，只有一小塊要用心記',
    mins: 26,
    goal: '認識英文最高頻的不規則字，並知道每個字「不規則的到底是哪一個字母」。',
    rules: [
      { h: '不規則字不是「整個字都要背」',
        t: '以 <b>said</b> 為例：s、d 都照規則，只有 <b>ai</b> 唸成短 e 是例外。<br>' +
           '所以你只要「用心記」那一小塊，其他照規則拼就好。<br>' +
           '這種教法叫 <b>Heart Word</b>——不規則的部分要「用心（heart）」記。' },
      { h: '為什麼英文有這麼多不規則字',
        t: '英文借過古英語、法語、拉丁語、希臘語的拼寫習慣，' +
           '而且發音在過去 500 年變了很多、拼法卻沒跟著改。<br>' +
           '好消息：不規則字雖然佔高頻字的一大塊，但總數其實不多。' },
      { h: '最該優先記的一批',
        t: 'the, said, was, of, one, two, have, give, come, some, ' +
           'they, been, would, could, should, people, because, friend<br>' +
           '這些在真實英文裡出現的頻率極高，記起來報酬率最好。' }
    ],
    explain:
      '<p><b>怎麼記 Heart Word</b></p>' +
      '<p>1. 先照規則拼一次，看會拼成什麼<br>' +
      '2. 對照正確拼法，找出<b>哪個字母不照規則</b><br>' +
      '3. 只記那一小塊</p>' +
      '<p>示範 <b>because</b>：<br>' +
      '照規則會拼成 bicoz → 對照正確拼法 because → 不規則的是 <b>au</b>（唸 /ɔ/）和字尾的 <b>se</b>（唸 /z/）<br>' +
      '→ 記憶點：「be + cause（原因）」，把它當成 cause 這個字的家族成員</p>' +
      '<p class="small muted">這些字會被排進間隔複習，錯一次就會反覆出現，' +
      '直到你能穩定寫對為止。</p>',
    trap: '注意這幾組長得像但完全不同的字：<br>' +
          '· of /ʌv/（的）vs off /ɔf/（離開）<br>' +
          '· to / too / two<br>· their / there / they\'re<br>' +
          '· were / where / wear<br>這些要靠句子判斷，不能只看拼法。',
    res: ['ufli-toolbox', 'youglish'],
    ex: [
      { type: 'rule-pick', section: '找出不規則的部分', prompt: '<b>said</b> 哪一個部分不照規則？',
        word: 'said', options: ['s 唸 /s/', 'ai 唸短 e（規則上應該唸長 a）', 'd 唸 /d/'],
        answer: 1, rule: 'heart-word',
        why: 'ai 通常唸 /eɪ/（rain），但 said 裡唸 /ɛ/。只有這一塊要記。' },
      { type: 'rule-pick', section: '找出不規則的部分', prompt: '<b>was</b> 哪些部分不照規則？',
        word: 'was', options: ['w 唸 /w/', 'a 唸 /ʌ/ 而且 s 唸 /z/', '完全照規則'],
        answer: 1, rule: 'heart-word',
        why: 'a 照規則應該唸 /æ/，s 照規則應該唸 /s/。兩塊都要記。' },
      { type: 'rule-pick', section: '找出不規則的部分', prompt: '<b>have</b> 哪一個部分不照規則？',
        word: 'have', options: ['h 唸 /h/', '有 silent e 卻唸短 a', 'v 唸 /v/'],
        answer: 1, rule: 'heart-word',
        why: '照 silent-e 規則應該唸 /heɪv/。加 e 只是因為英文字不能以 v 結尾。' },
      { type: 'dictation', section: '聽寫', item: { w: 'said', parts: null, ph: [] } },
      { type: 'dictation', section: '聽寫', item: { w: 'because', parts: null, ph: [] } },
      { type: 'dictation', section: '聽寫', item: { w: 'friend', parts: null, ph: [] } },
      { type: 'spell-pick', section: '易混字', answer: 'their',
        options: ['their', 'there', 'they\'re'], rule: 'homophone',
        why: 'their = 他們的（所有格）。there = 那裡。they\'re = they are。三個唸法一樣。' }
    ],
    quiz: [
      { type: 'dictation', skill: 'heart', item: { w: 'people', parts: null, ph: [] } },
      { type: 'dictation', skill: 'heart', item: { w: 'would', parts: null, ph: [] } },
      { type: 'dictation', skill: 'heart', item: { w: 'answer', parts: null, ph: [] } },
      { type: 'dictation', skill: 'heart', item: { w: 'business', parts: null, ph: [] } },
      { type: 'rule-pick', skill: 'heart', prompt: '<b>one</b> 為什麼不規則？',
        word: 'one', options: ['o 唸 /oʊ/', 'o 前面憑空多一個 /w/ 音', 'e 要發音'],
        answer: 1, rule: 'heart-word',
        why: 'one 唸 /wʌn/，前面多了一個 w 的音。once 也一樣。' },
      { type: 'rule-pick', skill: 'heart', prompt: '學不規則字的正確做法是？',
        options: ['整個字硬背', '找出不照規則的那幾個字母，只記那一塊', '跳過不學'],
        answer: 1, rule: 'heart-word',
        why: '這就是 Heart Word 教法：大部分照規則，只有一小塊要用心記。' }
    ],
    pass: { quiz: 0.67 },
    passText: '6 題答對 4 題以上算過 Level 8。不規則字沒有規則可循，' +
              '寫錯的字會進錯字本，靠間隔複習慢慢固定下來。'
  });
})();
