/* ==========================================================================
   Level 5 — Vowel Teams（兩個母音字母一起走）
   本級的新技能：同一個拼法可能有兩種讀法（ea 在 eat / bread），
   所以要學會「試兩次」策略——這是真正的解碼者跟死背者的分水嶺。
   ========================================================================== */
(function () {
  'use strict';
  var W = Words, G = WORDS;
  function f(group, w) { return G[group].filter(function (x) { return x.w === w; })[0] || G[group][0]; }

  /* ---------------------------------------------------------------- L5-01 */
  Curriculum.register({
    id: 'L5-01', level: 5,
    title: 'ai 與 ay：長 a 的兩種拼法',
    sub: 'rain, train / play, day',
    mins: 24,
    goal: '知道 ai 和 ay 都唸 /eɪ/，並掌握「什麼時候用哪個」的位置規律。',
    rules: [
      { h: 'ai 和 ay 讀音完全一樣，都是 /eɪ/',
        t: 'r<b>ai</b>n、tr<b>ai</b>n、p<b>ay</b>、d<b>ay</b> — 聽起來一模一樣。' },
      { h: '位置規律：ai 在字中間，ay 在字尾',
        t: '<b>ai</b>：rain, train, paint, mail, wait（後面還有子音）<br>' +
           '<b>ay</b>：play, day, stay, way, may（在字的最後）<br>' +
           '這條規律的正確率極高，是聽寫時最好用的判斷法。' }
    ],
    explain:
      '<p><b>為什麼英文要有兩種拼法？</b></p>' +
      '<p>因為英文不喜歡讓 i 出現在字尾（除了少數外來語）。所以字尾的 /eɪ/ 就改用 y。</p>' +
      '<p>這類「位置決定拼法」的規律在英文裡很多，而且是<b>聽寫的核心武器</b>。' +
      '你聽到 /eɪ/ 的時候，先想：這個音在字中間還是字尾？<br>' +
      '中間 → ai　　字尾 → ay</p>' +
      '<p class="small muted">同樣的邏輯之後還會用在 oi/oy、ou/ow。</p>',
    trap: '注意 said 是例外：拼法是 ai，但唸短 e /sɛd/。這是英文最高頻的不規則字之一，' +
          '直接記起來。<br>另外 again、against 的 ai 也常唸短 e。',
    res: ['readingbear', 'ufli-toolbox'],
    ex: [
      { type: 'read-aloud', section: '朗讀', item: f('vt_ai_ay', 'rain') },
      { type: 'read-aloud', section: '朗讀', item: f('vt_ai_ay', 'play') },
      { type: 'spell-pick', section: '拼寫規律', answer: 'train', options: ['train', 'trayn'],
        rule: 'ai-ay', why: '/eɪ/ 在字中間（後面還有 n），所以用 ai。' },
      { type: 'spell-pick', section: '拼寫規律', answer: 'stay', options: ['stay', 'stai'],
        rule: 'ai-ay', why: '/eɪ/ 在字尾，所以用 ay。' },
      { type: 'dictation', section: '聽寫', item: f('vt_ai_ay', 'paint') },
      { type: 'dictation', section: '聽寫', item: f('vt_ai_ay', 'day') }
    ],
    quiz: [
      { type: 'spell-pick', skill: 'spell', answer: 'mail', options: ['mail', 'mayl'], rule: 'ai-ay' },
      { type: 'spell-pick', skill: 'spell', answer: 'way', options: ['way', 'wai'], rule: 'ai-ay' },
      { type: 'dictation', skill: 'spell', item: f('vt_ai_ay', 'rain') },
      { type: 'dictation', skill: 'spell', item: f('vt_ai_ay', 'stay') },
      { type: 'rule-pick', skill: 'rule', prompt: '<b>said</b> 的 ai 唸什麼？',
        options: ['/eɪ/ 像 rain', '/ɛ/ 像 bed', '/aɪ/ 像 bike'],
        answer: 1, rule: 'irregular', why: 'said 是不規則字，ai 唸短 e。' },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.vowelteam[0], rule: 'vowel-team' }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。位置規律（中間 ai／字尾 ay）要能自動反應。'
  });

  /* ---------------------------------------------------------------- L5-02 */
  Curriculum.register({
    id: 'L5-02', level: 5,
    title: 'ee 與 ea：長 e，但 ea 有兩種讀法',
    sub: '「試兩次」策略正式登場',
    mins: 26,
    goal: '掌握 ee = /iː/ 恆定、ea 有 /iː/ 和 /ɛ/ 兩種，並會用「試兩次」處理不確定的字。',
    rules: [
      { h: 'ee 永遠唸 /iː/',
        t: 'see, feet, green, week, tree, sleep — 沒有例外，最可靠的 vowel team。' },
      { h: 'ea 大部分唸 /iː/，少部分唸 /ɛ/',
        t: '<b>/iː/（約 75%）</b>：eat, team, beach, read（現在式）, clean<br>' +
           '<b>/ɛ/（約 20%）</b>：bread, head, dead, ready, weather, sweat<br>' +
           '<b>/eɪ/（極少）</b>：great, break, steak' },
      { h: '「試兩次」策略',
        t: '1. 先用最常見的讀法（ea → /iː/）<br>' +
           '2. 唸出來，聽聽看像不像你認識的字<br>' +
           '3. 不像 → 換第二種讀法（/ɛ/）再試<br>' +
           '這比背例外表有效，而且能處理沒學過的字。' }
    ],
    explain:
      '<p><b>為什麼要教「試兩次」而不是背規則？</b></p>' +
      '<p>因為英文的拼寫有大量歷史遺留，硬要找規則會找到一堆例外的例外。' +
      '而真實的閱讀者其實就是用「先試最可能的，不對就換」在處理。</p>' +
      '<p>這個策略有個名字叫 <b>set for variability</b>（讀音彈性），' +
      '研究顯示它是熟練讀者和困難讀者的關鍵差異之一。</p>' +
      '<p class="small muted">重點：你要允許自己「第一次唸錯」。' +
      '錯了不是失敗，是解碼流程的正常步驟。</p>',
    trap: 'read 這個字兩種讀法都有：<br>' +
          '· 現在式 read = /riːd/（像 reed）<br>' +
          '· 過去式 read = /rɛd/（像 red）<br>' +
          '只能靠句子判斷，這就是為什麼閱讀理解和解碼要一起練。',
    res: ['readingbear', 'youglish'],
    ex: [
      { type: 'read-aloud', section: '朗讀', item: f('vt_ee_ea', 'green') },
      { type: 'read-aloud', section: '朗讀', item: f('vt_ee_ea', 'team') },
      { type: 'read-aloud', section: '朗讀', item: f('vt_ee_ea', 'bread'),
        prompt: '這個字的 ea 是第二種讀法。先試 /iː/，不像字就換 /ɛ/。' },
      { type: 'sort', section: '分類', prompt: '這個字的 ea 唸哪一種？', word: 'beach',
        categories: ['/iː/ 像 see', '/ɛ/ 像 bed'], answer: 0, rule: 'ea',
        why: 'beach = /biːtʃ/，最常見的讀法。' },
      { type: 'sort', section: '分類', prompt: '這個字的 ea 唸哪一種？', word: 'head',
        categories: ['/iː/ 像 see', '/ɛ/ 像 bed'], answer: 1, rule: 'ea',
        why: 'head = /hɛd/。head, bread, dead, ready 這一組要記。' },
      { type: 'dictation', section: '聽寫', item: f('vt_ee_ea', 'feet') },
      { type: 'dictation', section: '聽寫', item: f('vt_ee_ea', 'eat') }
    ],
    quiz: [
      { type: 'sort', skill: 'rule', prompt: 'ea 唸哪一種？', word: 'clean',
        categories: ['/iː/', '/ɛ/'], answer: 0, rule: 'ea' },
      { type: 'sort', skill: 'rule', prompt: 'ea 唸哪一種？', word: 'weather',
        categories: ['/iː/', '/ɛ/'], answer: 1, rule: 'ea' },
      { type: 'dictation', skill: 'spell', item: f('vt_ee_ea', 'green') },
      { type: 'dictation', skill: 'spell', item: f('vt_ee_ea', 'beach') },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.vowelteam[1], rule: 'vowel-team' },
      { type: 'rule-pick', skill: 'concept', prompt: '看到不確定的 vowel team，正確做法是？',
        options: ['查字典', '先用最常見的讀法唸一次，不像字就換另一種再試', '跳過這個字'],
        answer: 1, rule: 'set-for-variability',
        why: '這叫 set for variability，是熟練讀者的核心策略。' }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。最後一題（策略題）一定要對——這是整個 Level 5 的核心觀念。'
  });

  /* ---------------------------------------------------------------- L5-03 */
  Curriculum.register({
    id: 'L5-03', level: 5,
    title: 'oa 與 ow：長 o',
    sub: 'boat, coat / snow, grow — 但 ow 也可能是 /aʊ/',
    mins: 24,
    goal: '掌握 oa = /oʊ/ 恆定、ow 有 /oʊ/ 和 /aʊ/ 兩種，用「試兩次」處理。',
    rules: [
      { h: 'oa 幾乎永遠唸 /oʊ/',
        t: 'boat, coat, road, soap, goat, toast — 很可靠。<br>' +
           '注意 oa 幾乎只出現在字的中間，不出現在字尾。' },
      { h: 'ow 有兩種讀法',
        t: '<b>/oʊ/</b>：snow, grow, know, show, yellow, window<br>' +
           '<b>/aʊ/</b>：cow, now, how, down, town, brown<br>' +
           '沒有可靠規則，只能「試兩次」＋累積字彙。' },
      { h: '小傾向（不是規則）',
        t: '字尾的 ow 比較常唸 /oʊ/（snow, show, know）；' +
           '字中間的 ow 比較常唸 /aʊ/（down, town, brown）。<br>' +
           '但 how、now、cow 就打破這個傾向，所以只能當參考。' }
    ],
    explain:
      '<p><b>這一課要練的其實是「心理彈性」</b></p>' +
      '<p>看到 ow，你的腦中要同時準備兩個候選音，唸出來看哪個像真的字。</p>' +
      '<p>練習方法：拿一個 ow 的字，兩種都唸一次，然後問自己「哪一個是我認識的字？」<br>' +
      '例如 town：/toʊn/（tone？不對，tone 拼法不一樣）→ /taʊn/（對，是城鎮）</p>' +
      '<p class="small muted">如果兩種都不認識，那就是生字——這時候只能查，' +
      '但至少你能唸出兩個合理的候選音，這已經是「見字能讀」了。</p>',
    trap: 'bow 有兩種讀法而且意思不同：<br>' +
          '· /boʊ/ = 蝴蝶結、弓<br>· /baʊ/ = 鞠躬<br>' +
          '同樣的還有 row（一排 /roʊ/ ／ 吵架 /raʊ/）。',
    res: ['readingbear', 'youglish'],
    ex: [
      { type: 'read-aloud', section: '朗讀', item: f('vt_oa_ow', 'boat') },
      { type: 'read-aloud', section: '朗讀', item: f('vt_oa_ow', 'snow') },
      { type: 'sort', section: '分類', prompt: '這個字的 ow 唸哪一種？', word: 'down',
        categories: ['/oʊ/ 像 snow', '/aʊ/ 像 cow'], answer: 1, rule: 'ow',
        why: 'down = /daʊn/。' },
      { type: 'sort', section: '分類', prompt: '這個字的 ow 唸哪一種？', word: 'yellow',
        categories: ['/oʊ/ 像 snow', '/aʊ/ 像 cow'], answer: 0, rule: 'ow',
        why: 'yellow 字尾的 ow 唸 /oʊ/。' },
      { type: 'dictation', section: '聽寫', item: f('vt_oa_ow', 'road') },
      { type: 'dictation', section: '聽寫', item: f('vt_oa_ow', 'grow') }
    ],
    quiz: [
      { type: 'sort', skill: 'rule', prompt: 'ow 唸哪一種？', word: 'town',
        categories: ['/oʊ/', '/aʊ/'], answer: 1, rule: 'ow' },
      { type: 'sort', skill: 'rule', prompt: 'ow 唸哪一種？', word: 'show',
        categories: ['/oʊ/', '/aʊ/'], answer: 0, rule: 'ow' },
      { type: 'dictation', skill: 'spell', item: f('vt_oa_ow', 'coat') },
      { type: 'dictation', skill: 'spell', item: f('vt_oa_ow', 'snow') },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.vowelteam[2], rule: 'vowel-team' },
      { type: 'read-aloud', skill: 'decode', item: { w: 'toast', parts: null }, plain: true }
    ],
    pass: { quiz: 0.75 },
    passText: '6 題答對 5 題。ow 的兩種讀法本來就沒有可靠規則，錯 1 題正常。'
  });

  /* ---------------------------------------------------------------- L5-04 */
  Curriculum.register({
    id: 'L5-04', level: 5,
    title: 'oo 的兩種讀法，以及 ew / ue / ui',
    sub: 'moon vs book',
    mins: 24,
    goal: '分辨 /uː/（長）和 /ʊ/（短）兩種 oo，並認得 /uː/ 的其他拼法。',
    rules: [
      { h: 'oo 有長短兩種',
        t: '<b>長 /uː/</b>：moon, food, school, soon, room, tooth<br>' +
           '<b>短 /ʊ/</b>：book, look, good, foot, cook, wood' },
      { h: '一個實用傾向',
        t: 'oo + k 幾乎都是短音：book, look, cook, took, hook, shook。<br>' +
           '這條小規律命中率很高。' },
      { h: '/uː/ 的其他拼法',
        t: '<b>ew</b>：new, few, grew, threw<br>' +
           '<b>ue</b>：blue, true, glue<br>' +
           '<b>ui</b>：fruit, suit, juice<br>' +
           '<b>u_e</b>：tube, rule（Level 4 學過）' }
    ],
    explain:
      '<p><b>/uː/ 和 /ʊ/ 對中文母語者是難題</b></p>' +
      '<p>中文的「ㄨ」比較接近 /uː/（長、緊、嘴唇圓）。' +
      '/ʊ/ 是短的、鬆的、嘴唇沒那麼圓——中文沒有。</p>' +
      '<p>最小配對：fool / full、pool / pull、Luke / look。' +
      '如果你聽起來一樣，就是還沒分開。</p>' +
      '<p><b>做法差異</b>：<br>' +
      '· /uː/：嘴唇噘成小圓、用力、拉長<br>' +
      '· /ʊ/：嘴唇微圓、放鬆、很短</p>',
    trap: 'blood、flood 的 oo 唸 /ʌ/（像 cup），是完全的例外。<br>' +
          'door、floor 的 oo 唸 /ɔr/。這些都要個別記。',
    res: ['sos', 'rachel-vowels'],
    demo: [
      { type: 'phoneme-card', id: 'oo' },
      { type: 'phoneme-card', id: 'oo_' }
    ],
    ex: [
      { type: 'minimal-pair', section: '最小配對', a: 'full', b: 'fool', pa: 'oo_', pb: 'oo', zh: '短 oo / 長 oo' },
      { type: 'sort', section: '分類', prompt: '這個字的 oo 是長音還是短音？', word: 'book',
        categories: ['長 /uː/ 像 moon', '短 /ʊ/ 像 book'], answer: 1, rule: 'oo',
        why: 'oo + k 幾乎都是短音。' },
      { type: 'sort', section: '分類', prompt: '這個字的 oo 是長音還是短音？', word: 'school',
        categories: ['長 /uː/ 像 moon', '短 /ʊ/ 像 book'], answer: 0, rule: 'oo' },
      { type: 'read-aloud', section: '朗讀', item: f('vt_oo', 'moon') },
      { type: 'dictation', section: '聽寫', item: f('vt_oo', 'food') },
      { type: 'dictation', section: '聽寫', item: f('vt_oo', 'good') }
    ],
    quiz: [
      { type: 'minimal-pair', skill: 'listen', a: 'full', b: 'fool', pa: 'oo_', pb: 'oo', zh: '短/長 oo' },
      { type: 'sort', skill: 'rule', prompt: 'oo 是長音還是短音？', word: 'cook',
        categories: ['長 /uː/', '短 /ʊ/'], answer: 1, rule: 'oo' },
      { type: 'sort', skill: 'rule', prompt: 'oo 是長音還是短音？', word: 'soon',
        categories: ['長 /uː/', '短 /ʊ/'], answer: 0, rule: 'oo' },
      { type: 'dictation', skill: 'spell', item: f('vt_oo', 'look') },
      { type: 'dictation', skill: 'spell', item: f('vt_oo', 'moon') },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.vowelteam[3], rule: 'vowel-team' }
    ],
    pass: { quiz: 0.75 },
    passText: '6 題答對 5 題。/uː/ 和 /ʊ/ 的聽辨很難，錯了要持續回來練。'
  });

  /* ---------------------------------------------------------------- L5-05 */
  Curriculum.register({
    id: 'L5-05', level: 5,
    title: 'igh / ie / y 與 Level 5 綜合驗收',
    sub: '長 i 的其他拼法 + 總複習',
    mins: 28,
    goal: '掌握長 i 的多種拼法，並在混合題組裡穩定運用「試兩次」策略。',
    rules: [
      { h: '長 i /aɪ/ 的四種拼法',
        t: '<b>i_e</b>：bike, time（Level 4）<br>' +
           '<b>igh</b>：light, night, high, right<br>' +
           '<b>ie</b>：pie, tie, lie（多在字尾）<br>' +
           '<b>y</b>：my, cry, sky, why（單音節字尾）' },
      { h: 'y 在字尾的兩種讀法',
        t: '<b>單音節 → /aɪ/</b>：my, cry, sky, fly, why<br>' +
           '<b>多音節 → /iː/</b>：happy, baby, city, funny, family<br>' +
           '這條規律非常可靠，是少數幾乎沒例外的規則。' },
      { h: 'ie 也有 /iː/ 的讀法',
        t: 'field, chief, believe, piece — 這組唸 /iː/。<br>' +
           '記憶口訣：i 在 e 前面（除非跟在 c 後面）。' }
    ],
    explain:
      '<p><b>y 的規律超級好用</b></p>' +
      '<p>看到字尾的 y，先數音節：<br>' +
      '· 一個音節 → y 唸 /aɪ/（my, try, dry）<br>' +
      '· 兩個以上音節 → y 唸 /iː/（happy, city, quickly）</p>' +
      '<p>這條規則命中率極高，而且能處理大量的字（所有 -ly 副詞、所有 -y 形容詞）。</p>' +
      '<p><b>Level 5 到這裡結束。你現在掌握了：</b><br>' +
      '短母音、長母音（silent e）、開閉音節、vowel teams。<br>' +
      '這已經涵蓋英文絕大多數的母音拼法了。</p>',
    trap: '例外提醒：<br>· 一些 -ie 字尾唸 /aɪ/（pie, tie），一些唸 /iː/（movie, cookie）<br>' +
          '· height 的 igh 唸 /aɪ/ 但拼法特殊<br>· 遇到不確定就試兩次。',
    res: ['readinguniverse', 'youglish'],
    ex: [
      { type: 'read-aloud', section: '朗讀', item: f('vt_igh_ie', 'light') },
      { type: 'read-aloud', section: '朗讀', item: f('vt_igh_ie', 'pie') },
      { type: 'sort', section: 'y 的規律', prompt: '字尾的 y 唸哪一種？', word: 'happy',
        categories: ['/aɪ/ 像 my', '/iː/ 像 see'], answer: 1, rule: 'y-ending',
        why: 'happy 是兩個音節，所以 y 唸 /iː/。' },
      { type: 'sort', section: 'y 的規律', prompt: '字尾的 y 唸哪一種？', word: 'sky',
        categories: ['/aɪ/ 像 my', '/iː/ 像 see'], answer: 0, rule: 'y-ending',
        why: 'sky 是一個音節，所以 y 唸 /aɪ/。' },
      { type: 'dictation', section: '聽寫', item: f('vt_igh_ie', 'night') },
      { type: 'sentence', section: '句子', text: G.sentences.vowelteams[0] }
    ],
    quiz: [
      { type: 'sort', skill: 'rule', prompt: '字尾 y 唸哪一種？', word: 'city',
        categories: ['/aɪ/', '/iː/'], answer: 1, rule: 'y-ending' },
      { type: 'sort', skill: 'rule', prompt: '字尾 y 唸哪一種？', word: 'try',
        categories: ['/aɪ/', '/iː/'], answer: 0, rule: 'y-ending' },
      { type: 'dictation', skill: 'spell', item: f('vt_igh_ie', 'high') },
      { type: 'dictation', skill: 'spell', item: f('vt_ee_ea', 'team') },
      { type: 'dictation', skill: 'spell', item: f('vt_oa_ow', 'boat') },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.vowelteam[5], rule: 'vowel-team' },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.vowelteam[6], rule: 'vowel-team' },
      { type: 'sentence', skill: 'fluency', text: G.sentences.vowelteams[1] }
    ],
    pass: { quiz: 0.8 },
    passText: '8 題答對 7 題才算過 Level 5。假字題錯了要回去複習——vowel team 的假字是解碼能力的硬指標。'
  });
})();
