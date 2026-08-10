/* ==========================================================================
   Level 3 — Blends 與 Digraphs
   兩個關鍵區分：
   · blend  = 兩個子音各自唸出來，只是連得很快（st, fl, -nd）
   · digraph = 兩個字母合成一個全新的音（sh, ch, th, ng, ck）
   中文母語者的核心困難：中文音節沒有子音串，你會不自覺塞母音進去。
   ========================================================================== */
(function () {
  'use strict';
  var W = Words, G = WORDS;

  /* ---------------------------------------------------------------- L3-01 */
  Curriculum.register({
    id: 'L3-01', level: 3,
    title: 'Blend 是什麼：兩個子音黏在一起',
    sub: '不要在中間塞母音',
    mins: 25,
    goal: '看到 st-、fl-、tr- 這種開頭，能連續唸出兩個子音而不加母音。',
    rules: [
      { h: 'Blend：兩個音都在，只是黏得很快',
        t: '<b>st</b>op = /s/ + /t/ + /ɑ/ + /p/ — 你聽得到 s，也聽得到 t。' +
           '<br>這和 digraph 不同：<b>sh</b>op 的 sh 是一個全新的音 /ʃ/，聽不到 s 也聽不到 h。' },
      { h: '中間不能有母音',
        t: '錯誤：s(ə)-top → 變成兩個音節「思-塔普」<br>' +
           '正確：stop → 一個音節。<br>' +
           '中文的每個子音後面一定接母音，這個習慣要刻意打破。' }
    ],
    explain:
      '<p><b>怎麼練「不塞母音」？</b></p>' +
      '<p>倒著練。先唸 top，然後在前面「貼」一個很短的 /s/：<br>' +
      'top → s+top → stop。s 只是一個嘶嘶聲，不要變成一個字。</p>' +
      '<p>另一個方法：把 /s/ 拉長，然後直接滑進 top，中間不要斷：<br>' +
      '「sssssstop」→ 慢慢縮短前面的 s。</p>' +
      '<p class="small muted">錄音自我檢查：如果你的 stop 聽起來有兩拍，就是塞了母音。應該只有一拍。</p>',
    trap: '最容易出問題的是三個子音的組合：street、spring、splash。' +
          '中文母語者常唸成「si-treet」三音節。這些字要特別慢慢練。',
    res: ['readingbear', 'sos'],
    ex: [
      { type: 'blend', section: '拼讀', item: G.blends_s[0] },
      { type: 'blend', section: '拼讀', item: G.blends_s[1] },
      { type: 'read-aloud', section: '朗讀', item: G.blends_s[2],
        prompt: '唸這個字。前兩個子音要黏在一起，中間不要有母音。' },
      { type: 'count', section: '數音素', item: G.blends_s[0] },
      { type: 'segment', section: '拆音', item: G.blends_s[3] },
      { type: 'dictation', section: '聽寫', item: G.blends_s[4] }
    ],
    quiz: [
      { type: 'rule-pick', skill: 'concept', prompt: '<b>stop</b> 的 st 是 blend 還是 digraph？',
        options: ['blend：s 和 t 兩個音都聽得到', 'digraph：st 合成一個新音'],
        answer: 0, rule: 'blend-vs-digraph',
        why: 'blend 的每個字母都保留自己的音，只是唸得很快。' },
      { type: 'count', skill: 'seg', item: G.blends_s[1] },
      { type: 'dictation', skill: 'spell', item: G.blends_s[5] },
      { type: 'dictation', skill: 'spell', item: G.blends_s[6] },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.blend[0], rule: 'blend' },
      { type: 'read-aloud', skill: 'decode', item: G.blends_s[8], plain: true }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。聽寫如果漏掉 blend 的其中一個子音，代表耳朵還沒分開——回去做拆音。'
  });

  /* ---------------------------------------------------------------- L3-02 */
  Curriculum.register({
    id: 'L3-02', level: 3,
    title: 'l 和 r 的 blends',
    sub: 'bl cl fl gl pl / br cr dr fr gr pr tr',
    mins: 25,
    goal: '唸出 flag、frog、black、bring 這類字，且 l / r 位置正確。',
    rules: [
      { h: 'l-blends：bl cl fl gl pl sl',
        t: '第二個音是 /l/，舌尖要<b>頂到</b>上齒齦。' },
      { h: 'r-blends：br cr dr fr gr pr tr',
        t: '第二個音是 /r/，舌尖<b>不碰任何地方</b>，往後捲。' },
      { h: 'dr 和 tr 在美式會有點變化',
        t: 'drum 聽起來有點像 "jrum"，tree 有點像 "chree"。' +
           '這是自然的連音現象，不用刻意做，但聽的時候要知道。' }
    ],
    explain:
      '<p><b>l-blend vs r-blend 是雙重難關</b></p>' +
      '<p>你要同時處理兩件事：<br>' +
      '1. 不塞母音（blend 的共同難點）<br>' +
      '2. /l/ 和 /r/ 本身就是中文母語者的痛點</p>' +
      '<p>建議拆開練：先確認單獨的 /l/ 和 /r/ 做得對（回 L1-05 複習），' +
      '再練 blend。兩個都不熟的時候一起練，只會兩個都做不好。</p>' +
      '<p class="small muted">最小配對測試：flee / free、glass / grass、blue / brew。' +
      '如果分不出來，就是 l/r 本身還沒穩。</p>',
    trap: 'fly / fry、play / pray、clown / crown——這幾組會直接暴露你的 l/r 問題。' +
          '錄音唸這幾組，自己聽有沒有差別。',
    res: ['sos', 'rachel-cons'],
    ex: [
      { type: 'blend', section: '拼讀', item: G.blends_l[0] },
      { type: 'blend', section: '拼讀', item: G.blends_r[0] },
      { type: 'read-aloud', section: '朗讀', item: G.blends_l[1] },
      { type: 'read-aloud', section: '朗讀', item: G.blends_r[1] },
      { type: 'dictation', section: '聽寫', item: G.blends_l[3] },
      { type: 'dictation', section: '聽寫', item: G.blends_r[3] },
      { type: 'minimal-pair', section: '最小配對', a: 'rice', b: 'lice', pa: 'r', pb: 'l', zh: 'r / l 基本功' }
    ],
    quiz: [
      { type: 'dictation', skill: 'spell', item: G.blends_l[4] },
      { type: 'dictation', skill: 'spell', item: G.blends_r[4] },
      { type: 'dictation', skill: 'spell', item: G.blends_l[6] },
      { type: 'read-aloud', skill: 'decode', item: G.blends_r[6], plain: true },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.blend[1], rule: 'blend' },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.blend[2], rule: 'blend' }
    ],
    pass: { quiz: 0.75 },
    passText: '6 題答對 5 題。l/r 混淆是長期問題，錯 1 題可接受，但要記下來持續練。'
  });

  /* ---------------------------------------------------------------- L3-03 */
  Curriculum.register({
    id: 'L3-03', level: 3,
    title: '字尾的 blends',
    sub: '-nd -mp -st -lk -sk -ft -nt',
    mins: 22,
    goal: '唸出 hand、jump、best、milk 這類字，字尾兩個子音都要做出來。',
    rules: [
      { h: '字尾 blend 是聽寫最大的失分點',
        t: '中文音節結尾只能是母音、-n、-ng。' +
           'hand 的 -nd、jump 的 -mp、best 的 -st，你的耳朵很可能只聽到一個。' },
      { h: '練法：把最後兩個音「凍住」',
        t: '唸 hand，唸完舌尖要停在上齒齦（做完 d 的動作）。' +
           '唸 jump，唸完嘴唇要閉著（做完 p 的動作）。' }
    ],
    explain:
      '<p><b>常見的字尾 blend 家族</b></p>' +
      '<p>· <b>-nd</b>：hand, land, find, bend, sound<br>' +
      '· <b>-nt</b>：want, plant, point, front<br>' +
      '· <b>-mp</b>：jump, lamp, camp, stamp<br>' +
      '· <b>-st</b>：best, fast, last, must, first<br>' +
      '· <b>-sk</b>：desk, ask, mask, task<br>' +
      '· <b>-ft</b>：gift, left, soft, lift<br>' +
      '· <b>-lk / -lt</b>：milk, silk / belt, felt</p>' +
      '<p class="small muted">這些組合在英文極常見，練熟之後閱讀速度會明顯提升。</p>',
    trap: '注意 -nk 其實是 /ŋk/ 不是 /nk/：think、bank、drink 的 n 唸成 ng。' +
          '這是因為後面的 k 讓 n 往後移了位置。',
    res: ['readinguniverse'],
    ex: [
      { type: 'blend', section: '拼讀', item: G.blends_end[0] },
      { type: 'blend', section: '拼讀', item: G.blends_end[1] },
      { type: 'segment', section: '拆音', item: G.blends_end[2] },
      { type: 'count', section: '數音素', item: G.blends_end[3] },
      { type: 'dictation', section: '聽寫', item: G.blends_end[4] },
      { type: 'dictation', section: '聽寫', item: G.blends_end[5] }
    ],
    quiz: [
      { type: 'dictation', skill: 'spell', item: G.blends_end[6] },
      { type: 'dictation', skill: 'spell', item: G.blends_end[7] },
      { type: 'dictation', skill: 'spell', item: G.blends_end[9] },
      { type: 'count', skill: 'seg', item: G.blends_end[0] },
      { type: 'read-aloud', skill: 'decode', item: G.blends_end[8], plain: true },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.blend[3], rule: 'blend' }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。聽寫漏掉字尾子音是最常見的錯——每次都刻意「凍住」尾巴。'
  });

  /* ---------------------------------------------------------------- L3-04 */
  Curriculum.register({
    id: 'L3-04', level: 3,
    title: 'Digraphs（一）：sh ch th wh',
    sub: '兩個字母，一個全新的音',
    mins: 26,
    goal: '認得 sh / ch / th / wh 是「一個音」，並做得出 th 的兩種讀法。',
    rules: [
      { h: 'digraph 的定義',
        t: '兩個字母合起來發<b>一個</b>音，而且這個音不是任何一個字母原本的音。' +
           '<br>sh = /ʃ/（不是 s+h）、ch = /tʃ/、th = /θ/ 或 /ð/。' },
      { h: 'th 有兩種讀法',
        t: '<b>無聲 /θ/</b>：think, three, bath, math（喉嚨不振動）<br>' +
           '<b>有聲 /ð/</b>：this, that, the, mother（喉嚨振動）<br>' +
           '規則不完全可靠，但：功能字（the, this, that, they）幾乎都是有聲。' },
      { h: 'wh 在美式多半就唸 /w/',
        t: 'when, what, white — 大部分美國人唸成和 w 一樣。' +
           '例外：who, whose, whole 的 wh 唸 /h/。' }
    ],
    explain:
      '<p><b>th 是中文母語者的最大關卡</b></p>' +
      '<p>中文完全沒有這個音。你的大腦會自動代換成最接近的：/s/（think→sink）或 /f/（three→free）。</p>' +
      '<p>做法很簡單但需要練：<br>' +
      '1. 舌尖<b>輕輕</b>伸出上下門牙之間（伸出來一點點就好，看得到即可）<br>' +
      '2. 吹氣 → 這是 /θ/<br>' +
      '3. 吹氣同時讓喉嚨振動 → 這是 /ð/</p>' +
      '<p class="small muted">照鏡子練。如果看不到舌頭，就是沒做對。' +
      '剛開始會覺得很奇怪、很誇張，這是正常的——英語母語者真的就是這樣做。</p>',
    trap: 'th 的高頻程度極高：the 是英文最常出現的字。這個音沒練起來，' +
          '你講的每一句話都會有明顯口音。值得花時間。',
    res: ['sos', 'rachel-cons'],
    demo: [
      { type: 'phoneme-card', id: 'sh' },
      { type: 'phoneme-card', id: 'ch' },
      { type: 'phoneme-card', id: 'th' },
      { type: 'phoneme-card', id: 'dh' }
    ],
    ex: [
      { type: 'minimal-pair', section: '最小配對', a: 'think', b: 'sink', pa: 'th', pb: 's', zh: 'th / s' },
      { type: 'minimal-pair', section: '最小配對', a: 'chip', b: 'ship', pa: 'ch', pb: 'sh', zh: 'ch / sh' },
      { type: 'minimal-pair', section: '最小配對', a: 'they', b: 'day', pa: 'dh', pb: 'd', zh: '有聲 th / d' },
      { type: 'count', section: '數音素', item: G.digraphs[0] },
      { type: 'read-aloud', section: '朗讀', item: G.digraphs[4],
        prompt: '唸這個字。舌尖要伸到牙齒外面，照鏡子確認。' },
      { type: 'dictation', section: '聽寫', item: G.digraphs[2] },
      { type: 'sort', section: '分類', prompt: '這個字的 th 是有聲還是無聲？（摸喉嚨）',
        word: 'this', categories: ['有聲 /ð/（會振動）', '無聲 /θ/（不振動）'], answer: 0, rule: 'th-voicing',
        why: '功能字 the / this / that / they / them 幾乎都是有聲 th。' }
    ],
    quiz: [
      { type: 'minimal-pair', skill: 'listen', a: 'think', b: 'sink', pa: 'th', pb: 's', zh: 'th / s' },
      { type: 'minimal-pair', skill: 'listen', a: 'chip', b: 'ship', pa: 'ch', pb: 'sh', zh: 'ch / sh' },
      { type: 'count', skill: 'seg', item: G.digraphs[0] },
      { type: 'dictation', skill: 'spell', item: G.digraphs[6] },
      { type: 'dictation', skill: 'spell', item: G.digraphs[8] },
      { type: 'sort', skill: 'rule', prompt: '這個字的 th 是有聲還是無聲？', word: 'bath',
        categories: ['有聲 /ð/', '無聲 /θ/'], answer: 1, rule: 'th-voicing',
        why: 'bath 的 th 不振動。但注意動詞 bathe 就變成有聲了。' },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.digraph[0], rule: 'digraph' }
    ],
    pass: { quiz: 0.75 },
    passText: '7 題答對 5 題以上。th 相關的題目錯了要立刻回去看口腔動畫——這個音值得反覆練。'
  });

  /* ---------------------------------------------------------------- L3-05 */
  Curriculum.register({
    id: 'L3-05', level: 3,
    title: 'Digraphs（二）：ng ck ph 與 tch / dge',
    sub: '字尾的特殊組合',
    mins: 24,
    goal: '掌握 -ng、-ck、ph、-tch、-dge 的讀法與使用時機。',
    rules: [
      { h: 'ng = /ŋ/，就是注音的 ㄥ 尾巴',
        t: 'sing, king, long, bring。這個音中文有，相對容易。' +
           '<br>注意 sin / sing、thin / thing 的差別。' },
      { h: 'ck = /k/，只出現在短母音後面的字尾',
        t: 'back, duck, lock, sick。<br>' +
           '前面是短母音 → 用 ck；前面是長母音或子音 → 用 k（book, milk, take）。' },
      { h: 'tch = /tʃ/、dge = /dʒ/，也只跟在短母音後',
        t: 'catch, watch, match / badge, bridge, judge。<br>' +
           '短母音後面用 tch / dge；其他情況用 ch / ge（beach, large）。' },
      { h: 'ph = /f/',
        t: 'phone, graph, photo, elephant。來自希臘文的字才會用 ph。' }
    ],
    explain:
      '<p><b>為什麼要有 ck、tch、dge 這種怪東西？</b></p>' +
      '<p>因為英文需要「保護短母音」。如果寫成 bak、cach、bage，' +
      '看起來像 bake、cache、bage（會被讀成長母音）。' +
      '多加一個字母就等於在說：「這裡的母音是短的」。</p>' +
      '<p>這條規律在 Level 8 的拼寫課會再深入。現在先記住這個對應：<br>' +
      '<b>短母音 + 一個子音音 → 要用三字母版（ck / tch / dge）</b></p>',
    trap: '這幾個規則在「拼寫」時比「讀」時更重要。讀 back 沒問題，' +
          '但聽到 /bæk/ 要選 back 而不是 bak，就需要這條規則。',
    res: ['ufli-toolbox'],
    demo: [{ type: 'phoneme-card', id: 'ng' }],
    ex: [
      { type: 'minimal-pair', section: '最小配對', a: 'sin', b: 'sing', pa: 'n', pb: 'ng', zh: 'n / ng' },
      { type: 'read-aloud', section: '朗讀', item: G.digraphs[12] },
      { type: 'dictation', section: '聽寫', item: G.digraphs[13] },
      { type: 'spell-pick', section: '拼寫選擇', answer: 'duck', options: ['duck', 'duk'],
        rule: 'ck-k', why: '短母音 /ʌ/ 後面的 /k/ 音要寫成 ck。' },
      { type: 'spell-pick', section: '拼寫選擇', answer: 'catch', options: ['catch', 'cach'],
        rule: 'tch-ch', why: '短母音 /æ/ 後面的 /tʃ/ 音要寫成 tch。' },
      { type: 'spell-pick', section: '拼寫選擇', answer: 'badge', options: ['badge', 'bage'],
        rule: 'dge-ge', why: '短母音 /æ/ 後面的 /dʒ/ 音要寫成 dge。' }
    ],
    quiz: [
      { type: 'minimal-pair', skill: 'listen', a: 'sin', b: 'sing', pa: 'n', pb: 'ng', zh: 'n / ng' },
      { type: 'spell-pick', skill: 'spell', answer: 'lock', options: ['lock', 'lok'],
        rule: 'ck-k', why: '短母音後的 /k/ 寫 ck。' },
      { type: 'spell-pick', skill: 'spell', answer: 'milk', options: ['milk', 'milck'],
        rule: 'ck-k', why: '/k/ 前面是子音 l，不是短母音，所以用 k 不用 ck。' },
      { type: 'rule-pick', skill: 'rule', prompt: '<b>phone</b> 的 ph 唸什麼音？',
        options: ['/p/ + /h/ 兩個音', '/f/ 一個音', '/v/ 一個音'],
        answer: 1, rule: 'ph', why: 'ph 是 digraph，合成一個 /f/。' },
      { type: 'dictation', skill: 'spell', item: G.digraphs[10] },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.digraph[4], rule: 'digraph' }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。ck / tch / dge 的選擇題要全對——這是 Level 8 拼寫規則的預習。'
  });

  /* ---------------------------------------------------------------- L3-06 */
  Curriculum.register({
    id: 'L3-06', level: 3,
    title: 'Level 3 綜合驗收',
    sub: '三子音串 + 假字 + 閱讀',
    mins: 28,
    goal: '處理 street、spring、splash 這種三子音開頭，並流暢讀出含 blend 與 digraph 的句子。',
    rules: [
      { h: '三子音開頭：s + blend',
        t: '英文的三子音開頭幾乎都是 s 開頭：<br>' +
           'str-, spr-, spl-, scr-, squ-, spn-<br>' +
           '拆法：先把 s 拉長，再唸後面的 blend。' }
    ],
    explain:
      '<p><b>你現在能讀多少？</b></p>' +
      '<p>短母音 + 20 個子音 + blends + digraphs，這個組合已經涵蓋了英文<b>大部分的單音節字</b>。' +
      '接下來 Level 4 加上 silent e，會再開啟一大批。</p>' +
      '<p>這一課用假字和句子做總驗收。假字全對代表你的解碼真的自動化了，' +
      '不是靠記憶。</p>',
    trap: '讀句子時如果速度掉下來，不要急著加速。準確度優先，' +
          '流暢度會隨著累積自然出現（這在研究上叫 orthographic mapping）。',
    res: ['readinguniverse', 'literacylearn'],
    ex: [
      { type: 'read-aloud', section: '三子音', item: G.blends_3[0], plain: true,
        prompt: '唸這個字。s 拉長，再滑進後面的 tr。中間不能有母音。' },
      { type: 'read-aloud', section: '三子音', item: G.blends_3[1], plain: true },
      { type: 'read-aloud', section: '三子音', item: G.blends_3[2], plain: true },
      { type: 'nonsense', section: '假字', word: WORDS.nonsense.blend[5], rule: 'blend' },
      { type: 'sentence', section: '句子', text: G.sentences.blends[0] },
      { type: 'sentence', section: '句子', text: G.sentences.digraphs[0] }
    ],
    quiz: [
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.blend[6], rule: 'blend' },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.blend[7], rule: 'blend' },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.digraph[2], rule: 'digraph' },
      { type: 'dictation', skill: 'spell', item: G.blends_3[3] },
      { type: 'dictation', skill: 'spell', item: G.digraphs[1] },
      { type: 'dictation', skill: 'spell', item: G.blends_end[3] },
      { type: 'sentence', skill: 'fluency', text: G.sentences.blends[1] },
      { type: 'sentence', skill: 'fluency', text: G.sentences.digraphs[2] }
    ],
    pass: { quiz: 0.8 },
    passText: '8 題答對 7 題才算過 Level 3。假字題是重點——錯了代表還在用記憶而不是規則。'
  });
})();
