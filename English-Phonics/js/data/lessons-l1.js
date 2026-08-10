/* ==========================================================================
   Level 1 — 音素覺識與字母音
   這一級的核心：把「字母名稱」和「字母聲音」徹底分開，
   並且開始訓練耳朵去「拆音」——中文母語者從小沒被訓練過這件事。
   ========================================================================== */
(function () {
  'use strict';
  var W = Words, G = WORDS;

  /* ---------------------------------------------------------------- L1-01 */
  Curriculum.register({
    id: 'L1-01', level: 1,
    title: '字母的「名字」和「聲音」不一樣',
    sub: '整套 phonics 的第一道門檻',
    mins: 20,
    goal: '看到任何字母，能立刻說出它的「聲音」而不是「名字」。',
    rules: [
      { h: '規則一：讀字時用「音」，不用「名」',
        t: '字母 <b>b</b> 的名字是 "bee"，但它在字裡的聲音是 <b>/b/</b>。' +
           '把 b-a-t 唸成 "bee-ay-tee" 永遠拼不出 bat；唸成 /b/-/æ/-/t/ 才會變成 bat。' },
      { h: '規則二：子音的音不要加尾巴',
        t: '/b/ 不是「不」，/t/ 不是「特」。中文每個字都是「子音＋母音」，' +
           '所以你會自動在子音後面加一個母音。這會毀掉整個拼讀——' +
           'c-a-t 變成「可-啊-特」，永遠合不出 cat。' }
    ],
    explain:
      '<p><b>為什麼中文母語者特別容易卡在這裡？</b></p>' +
      '<p>中文的最小單位是「音節」（一個字＝一個音節），英文的最小單位是「音素」。' +
      '你從小訓練的是整塊整塊地聽，英文要求你把一塊拆成好幾個零件。</p>' +
      '<p>再加上台灣的英文教學通常從「ABC 歌」開始，你的大腦裡 b 就等於 "bee"。' +
      '這個連結必須被覆蓋掉，換成 b = /b/。</p>' +
      '<p class="small muted">這一課不難，但如果沒有真正切換過來，後面每一課都會卡。</p>',
    trap: '唸子音時，把手指輕輕放在喉嚨上。如果你唸 /t/ 的時候感覺到「特」的那個母音跑出來了，就是加了尾巴。' +
          '練習方法：把音唸得極短、像被切斷一樣。',
    res: ['sos', 'rachel-cons'],
    demo: [
      { type: 'phoneme-card', id: 'b' },
      { type: 'phoneme-card', id: 't' },
      { type: 'phoneme-card', id: 'm' }
    ],
    ex: [
      { type: 'rule-pick', section: '概念確認',
        prompt: '要把 <b>c-a-t</b> 拼成 cat，你應該唸出哪三個聲音？',
        options: ['see - ay - tee（字母名字）', '可 - 啊 - 特（加了中文母音）', '/k/ - /æ/ - /t/（純音素）'],
        answer: 2, rule: 'letter-sound',
        why: '字母名字和加了母音的唸法都合不出 cat。只有純音素能合成單字。' },
      { type: 'rule-pick', section: '概念確認',
        prompt: '下面哪一個描述是對的？',
        options: ['字母 m 的名字是 /m/，聲音是 "em"',
                  '字母 m 的名字是 "em"，聲音是 /m/',
                  '字母 m 的名字和聲音一樣'],
        answer: 1, rule: 'letter-sound',
        why: '名字是拼字母時用的（M-A-P），聲音才是讀單字時用的。' },
      { type: 'listen-pick', section: '聽音辨識',
        prompt: '聽這個音，它是哪個字母的「聲音」？',
        play: 'buh', options: ['b', 'p', 'd', 'v'], answer: 'b',
        cause: 'listening', diff: '有聲/無聲',
        note: '/b/ 和 /p/ 嘴型一樣，差別在喉嚨有沒有振動。摸喉嚨試試看。' },
      { type: 'count', section: '音素切分', item: W.pick(G.cvc_a, 1)[0] },
      { type: 'segment', section: '音素切分', item: W.pick(G.cvc_i, 1)[0] },
      { type: 'blend', section: '拼讀', item: W.pick(G.cvc_o, 1)[0] }
    ],
    quiz: [
      { type: 'rule-pick', skill: 'concept',
        prompt: '讀單字的時候，你應該在腦中用什麼？',
        options: ['字母的名字', '字母的聲音', '整個字的樣子'],
        answer: 1, rule: 'letter-sound',
        why: '用「聲音」才能處理沒看過的字。用「整個字的樣子」就是死背，遇到生字就當機。' },
      { type: 'rule-pick', skill: 'concept',
        prompt: '把 /t/ 唸成「特」會有什麼後果？',
        options: ['沒差，聽得懂就好', '合音時會多出一個母音，拼不出正確的字', '會讓字聽起來更清楚'],
        answer: 1, rule: 'letter-sound',
        why: 'cat 會變成「可啊特」三個音節，而正確的 cat 只有一個音節三個音素。' },
      { type: 'count', skill: 'seg', item: W.pick(G.cvc_e, 1)[0] },
      { type: 'segment', skill: 'seg', item: W.pick(G.cvc_u, 1)[0] },
      { type: 'listen-pick', skill: 'listen',
        prompt: '聽這個字，它的<b>第一個音</b>是什麼？',
        play: 'mop', options: ['/m/ 像 map', '/n/ 像 net', '/b/ 像 bat', '/p/ 像 pig'],
        answer: '/m/ 像 map', cause: 'phoneme' }
    ],
    pass: { quiz: 0.8 },
    passText: '測驗答對 4/5 以上。重點不是背，而是你的腦子真的把「名字」和「聲音」分成兩件事了。'
  });

  /* ---------------------------------------------------------------- L1-02 */
  Curriculum.register({
    id: 'L1-02', level: 1,
    title: '聽出第一個音',
    sub: '音素覺識訓練（一）',
    mins: 20,
    goal: '聽到一個英文字，能立刻說出它的第一個音是什麼。',
    rules: [
      { h: '「聽到」和「拆得出」是兩回事',
        t: '你聽得懂 cat 是「貓」，不代表你拆得出 cat 的第一個音是 /k/。' +
           '前者是詞彙記憶，後者是<b>音素覺識</b>——這才是拼讀能力的地基。' },
      { h: '先聽，不要看字',
        t: '這一課刻意先播聲音再顯示字。看到字會啟動你的「背過的拼法」記憶，' +
           '干擾耳朵的判斷。' }
    ],
    explain:
      '<p><b>音素覺識（phonemic awareness）是什麼？</b></p>' +
      '<p>就是「不看字，光靠耳朵處理聲音」的能力。四種操作：辨音、拆音、合音、換音。</p>' +
      '<p>閱讀研究裡最一致的發現之一：音素覺識是預測閱讀能力的最強指標之一。' +
      '它不是「先學會讀再自然會」，而是要單獨訓練。</p>' +
      '<p class="small muted">中文使用者的音素覺識天生比較弱，因為中文書寫不需要拆到音素層級。' +
      '這不是你的問題，是語言結構差異——但可以練起來。</p>',
    trap: '如果你發現自己在腦中「拼出字母」才能回答，那就還在用視覺記憶。目標是聽到聲音就能直接回答。',
    res: ['sos'],
    demo: [
      { type: 'phoneme-card', id: 's' },
      { type: 'phoneme-card', id: 'f' }
    ],
    ex: [
      { type: 'listen-pick', section: '首音辨識',
        prompt: '聽這個字，第一個音是什麼？', play: 'sun',
        options: ['/s/ 像 sit', '/z/ 像 zip', '/sh/ 像 ship', '/th/ 像 think'],
        answer: '/s/ 像 sit', cause: 'phoneme' },
      { type: 'listen-pick', section: '首音辨識',
        prompt: '聽這個字，第一個音是什麼？', play: 'van',
        options: ['/v/ 像 van', '/w/ 像 wet', '/b/ 像 bat', '/f/ 像 fan'],
        answer: '/v/ 像 van', cause: 'listening',
        note: '/v/ 牙齒要碰嘴唇，/w/ 只有嘴唇噘圓。中文沒有 /v/，你很可能聽成 /w/。' },
      { type: 'listen-pick', section: '首音辨識',
        prompt: '聽這個字，第一個音是什麼？', play: 'red',
        options: ['/r/ 像 red', '/l/ 像 leg', '/w/ 像 wet', '/y/ 像 yes'],
        answer: '/r/ 像 red', cause: 'listening' },
      { type: 'minimal-pair', section: '最小配對', a: 'rice', b: 'lice', pa: 'r', pb: 'l', zh: 'r / l' },
      { type: 'minimal-pair', section: '最小配對', a: 'vine', b: 'wine', pa: 'v', pb: 'w', zh: 'v / w' },
      { type: 'count', section: '音素切分', item: W.pick(G.cvc_a, 1)[0] }
    ],
    quiz: [
      { type: 'listen-pick', skill: 'listen', prompt: '第一個音是什麼？', play: 'zip',
        options: ['/z/ 像 zip', '/s/ 像 sun', '/j/ 像 jam', '/ch/ 像 chip'],
        answer: '/z/ 像 zip', cause: 'listening' },
      { type: 'listen-pick', skill: 'listen', prompt: '第一個音是什麼？', play: 'think',
        options: ['/th/ 像 think', '/s/ 像 sun', '/f/ 像 fan', '/t/ 像 top'],
        answer: '/th/ 像 think', cause: 'listening' },
      { type: 'minimal-pair', skill: 'listen', a: 'think', b: 'sink', pa: 'th', pb: 's', zh: 'th / s' },
      { type: 'minimal-pair', skill: 'listen', a: 'rice', b: 'lice', pa: 'r', pb: 'l', zh: 'r / l' },
      { type: 'listen-pick', skill: 'listen', prompt: '第一個音是什麼？', play: 'chip',
        options: ['/ch/ 像 chip', '/sh/ 像 ship', '/j/ 像 jam', '/t/ 像 top'],
        answer: '/ch/ 像 chip', cause: 'listening' }
    ],
    pass: { quiz: 0.8 },
    passText: '5 題答對 4 題以上。如果錯在 /v/、/th/、/r/ 這幾個，先去看口腔動畫再重測。'
  });

  /* ---------------------------------------------------------------- L1-03 */
  Curriculum.register({
    id: 'L1-03', level: 1,
    title: '聽出最後一個音',
    sub: '音素覺識訓練（二）· 中文母語者的大破口',
    mins: 22,
    goal: '聽到英文字，能說出最後一個音；並且自己唸的時候不會把尾音吃掉。',
    rules: [
      { h: '英文的字可以用子音結尾，中文幾乎不行',
        t: '中文音節只能用母音、-n、-ng 結尾（「安」「昂」）。' +
           '英文有 cat、map、bus、dog——這些尾巴你的耳朵會自動忽略，嘴巴也不習慣做。' },
      { h: '尾音不做出來，聽寫一定錯',
        t: '如果你把 bad 唸成「掰」，寫的時候就少一個 d。' +
           '這是聽寫錯誤最大的單一來源。' }
    ],
    explain:
      '<p><b>做個實驗</b>：唸 "cat"，然後停住，注意舌尖有沒有真的抵到上齒齦。</p>' +
      '<p>很多中文母語者唸英文尾子音時，只是「想著」那個音，但嘴巴沒真的做完動作。' +
      '聽起來就像少了一截。</p>' +
      '<p>更麻煩的是<b>尾巴的清濁</b>：cab / cap、bed / bet、bag / back。' +
      '這三組的差別只在最後那個音有沒有振動聲帶。中文沒有這種對立，' +
      '所以你的耳朵目前很可能完全分不出來。</p>',
    trap: '練習法：唸完一個以子音結尾的字，把最後的口型「凍住」三秒不放開。' +
          '例如 map 唸完嘴唇要閉著、cat 唸完舌尖要頂著。做 20 次，肌肉就記住了。',
    res: ['sos'],
    demo: [
      { type: 'phoneme-card', id: 'd' },
      { type: 'phoneme-card', id: 'g' }
    ],
    ex: [
      { type: 'listen-pick', section: '尾音辨識',
        prompt: '聽這個字，<b>最後一個音</b>是什麼？', play: 'bag',
        options: ['/g/ 像 go', '/k/ 像 cat', '/d/ 像 dog', '/t/ 像 top'],
        answer: '/g/ 像 go', cause: 'listening',
        note: '/g/ 和 /k/ 嘴型一樣，差在聲帶。/g/ 有振動。' },
      { type: 'minimal-pair', section: '最小配對', a: 'cab', b: 'cap', pa: 'b', pb: 'p', zh: '尾音 b / p' },
      { type: 'minimal-pair', section: '最小配對', a: 'bed', b: 'bet', pa: 'd', pb: 't', zh: '尾音 d / t' },
      { type: 'minimal-pair', section: '最小配對', a: 'bag', b: 'back', pa: 'g', pb: 'k', zh: '尾音 g / k' },
      { type: 'read-aloud', section: '尾音發音', item: W.pick(G.cvc_o, 1)[0],
        prompt: '唸這個字，最後一個音的口型要「凍住」不放開。' },
      { type: 'dictation', section: '聽寫', item: W.pick(G.cvc_u, 1)[0] }
    ],
    quiz: [
      { type: 'minimal-pair', skill: 'listen', a: 'cab', b: 'cap', pa: 'b', pb: 'p', zh: '尾音 b / p' },
      { type: 'minimal-pair', skill: 'listen', a: 'bag', b: 'back', pa: 'g', pb: 'k', zh: '尾音 g / k' },
      { type: 'minimal-pair', skill: 'listen', a: 'bed', b: 'bet', pa: 'd', pb: 't', zh: '尾音 d / t' },
      { type: 'listen-pick', skill: 'listen', prompt: '最後一個音是什麼？', play: 'sing',
        options: ['/ng/ 像 king', '/n/ 像 net', '/g/ 像 go', '/m/ 像 map'],
        answer: '/ng/ 像 king', cause: 'listening' },
      { type: 'dictation', skill: 'spell', item: W.pick(G.cvc_a, 1)[0] },
      { type: 'dictation', skill: 'spell', item: W.pick(G.cvc_i, 1)[0] }
    ],
    pass: { quiz: 0.75 },
    passText: '6 題答對 5 題以上。清濁配對（cab/cap）本來就難，錯 1 題可以接受，錯 2 題以上要回去練。'
  });

  /* ---------------------------------------------------------------- L1-04 */
  Curriculum.register({
    id: 'L1-04', level: 1,
    title: '子音字母音（一）：爆破音與鼻音',
    sub: 'b p t d k g m n',
    mins: 22,
    goal: '看到這 8 個字母能立刻發出正確的音，並且分得出清濁配對。',
    rules: [
      { h: '三組清濁配對：p/b、t/d、k/g',
        t: '每一組的<b>嘴型完全一樣</b>，差別只有聲帶振不振動。' +
           '<br>p t k = 不振動（清音，會送氣）<br>b d g = 振動（濁音，不送氣）' },
      { h: '中文的對立不是清濁，是送氣',
        t: '注音 ㄅ／ㄆ 都是清音，差在送不送氣。' +
           '所以你的 b 其實是英文的「不送氣 p」。' +
           '要練的是<b>讓聲帶提早開始振動</b>。' }
    ],
    explain:
      '<p><b>怎麼確認自己有沒有做對？</b></p>' +
      '<p>把食指和拇指輕輕捏住喉結兩側，唸長長的 /b/（像 "bbbb"）。' +
      '如果有嗡嗡的振動感，就對了。唸 /p/ 應該完全沒有振動，只有一股氣。</p>' +
      '<p>另一個檢查法：把手掌放在嘴前 5 公分。唸 /p/ 應該感覺到一股氣噴到手上；' +
      '唸 /b/ 幾乎沒有氣。</p>' +
      '<p><b>m 和 n</b> 相對簡單，中文都有。但注意字尾的 m 一定要把嘴閉起來（time、come）。</p>',
    trap: '最容易失敗的是<b>字尾</b>的濁音。字首的 b 你大概還做得出來，' +
          'cab 的 b 就常常變成 p。刻意在字尾多撐半秒讓聲帶繼續振動。',
    res: ['sos', 'rachel-cons'],
    demo: [
      { type: 'phoneme-card', id: 'p' },
      { type: 'phoneme-card', id: 'b' },
      { type: 'phoneme-card', id: 'k' },
      { type: 'phoneme-card', id: 'g' },
      { type: 'phoneme-card', id: 'n' }
    ],
    ex: [
      { type: 'sort', section: '清濁分類', prompt: '這個字的<b>第一個音</b>，聲帶會振動嗎？',
        word: 'dog', categories: ['會振動（濁音）', '不振動（清音）'], answer: 0, rule: 'voicing',
        why: '/d/ 是濁音。摸喉嚨唸 dog 和 top 對照看看。' },
      { type: 'sort', section: '清濁分類', prompt: '這個字的<b>第一個音</b>，聲帶會振動嗎？',
        word: 'pig', categories: ['會振動（濁音）', '不振動（清音）'], answer: 1, rule: 'voicing',
        why: '/p/ 是清音，只有氣沒有振動。' },
      { type: 'minimal-pair', section: '最小配對', a: 'cab', b: 'cap', pa: 'b', pb: 'p', zh: 'b / p' },
      { type: 'blend', section: '拼讀', item: W.pick(G.cvc_a, 1)[0] },
      { type: 'blend', section: '拼讀', item: W.pick(G.cvc_o, 1)[0] },
      { type: 'read-aloud', section: '朗讀', item: W.pick(G.cvc_i, 1)[0] }
    ],
    quiz: [
      { type: 'sort', skill: 'voicing', prompt: '第一個音是清音還是濁音？', word: 'bat',
        categories: ['濁音（會振動）', '清音（不振動）'], answer: 0, rule: 'voicing' },
      { type: 'sort', skill: 'voicing', prompt: '第一個音是清音還是濁音？', word: 'top',
        categories: ['濁音（會振動）', '清音（不振動）'], answer: 1, rule: 'voicing' },
      { type: 'minimal-pair', skill: 'listen', a: 'bag', b: 'back', pa: 'g', pb: 'k', zh: 'g / k' },
      { type: 'dictation', skill: 'spell', item: W.pick(G.cvc_o, 1)[0] },
      { type: 'dictation', skill: 'spell', item: W.pick(G.cvc_e, 1)[0] },
      { type: 'nonsense', skill: 'decode', word: 'pab', rule: 'cvc' }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。清濁分類要全對——這是後面所有聽寫的基礎。'
  });

  /* ---------------------------------------------------------------- L1-05 */
  Curriculum.register({
    id: 'L1-05', level: 1,
    title: '子音字母音（二）：中文沒有的那幾個',
    sub: 'f v s z l r w y h j',
    mins: 25,
    goal: '做得出 /v/ /z/ /r/ /l/ 這幾個中文沒有或不對應的音，並分辨得出來。',
    rules: [
      { h: '/v/：牙齒一定要碰到嘴唇',
        t: '中文沒有 /v/。你會唸成 /w/（嘴唇噘圓）。' +
           '判斷法：唸 very 的時候，上排門牙有沒有壓在下嘴唇上？沒有就是錯的。' },
      { h: '/z/：不是注音的ㄗ',
        t: 'ㄗ 是 /ts/（有個 t 開頭），/z/ 沒有。' +
           '/z/ 就是 /s/ 加上聲帶振動，像蜜蜂 zzzz。' +
           '<br>而且英文超多字尾的 s 其實唸 /z/：dogs、is、was、has。' },
      { h: '/r/ 和 /l/：舌頭位置完全不同',
        t: '/l/ 舌尖<b>頂到</b>上齒齦；/r/ 舌尖<b>不碰任何地方</b>，往後捲。' +
           '<br>中文的 ㄖ 不等於 /r/，ㄌ 也不完全等於 /l/。' }
    ],
    explain:
      '<p><b>字尾的 L 是最難的（dark L）</b></p>' +
      '<p>ball、full、well、school——這些字尾的 l，舌根要往後縮，聽起來有點像「歐」。' +
      '很多中文母語者直接省略，把 ball 唸成 "bah"。</p>' +
      '<p>練習法：先唸 "oh"，然後在保持那個嘴型的同時把舌尖抬起來抵住上齒齦。那就是 dark L。</p>' +
      '<p><b>/h/ 很簡單但別用力</b>：英文的 /h/ 只是吐氣，注音的 ㄏ 喉嚨後面有摩擦，太重了。</p>',
    trap: '這一課的音是中文母語者一輩子的痛點。不要求一次做到完美，' +
          '但要「知道正確的做法是什麼」＋「聽得出差別」。發音會隨著練習慢慢到位。',
    res: ['sos', 'rachel-cons'],
    demo: [
      { type: 'phoneme-card', id: 'v' },
      { type: 'phoneme-card', id: 'z' },
      { type: 'phoneme-card', id: 'r' },
      { type: 'phoneme-card', id: 'l' }
    ],
    ex: [
      { type: 'minimal-pair', section: '最小配對', a: 'vine', b: 'wine', pa: 'v', pb: 'w', zh: 'v / w' },
      { type: 'minimal-pair', section: '最小配對', a: 'zoo', b: 'sue', pa: 'z', pb: 's', zh: 'z / s' },
      { type: 'minimal-pair', section: '最小配對', a: 'rice', b: 'lice', pa: 'r', pb: 'l', zh: 'r / l' },
      { type: 'read-aloud', section: '發音', item: { w: 'very', parts: null },
        prompt: '唸這個字，注意上排門牙要壓在下嘴唇上。', mic: true },
      { type: 'read-aloud', section: '發音', item: { w: 'ball', parts: null },
        prompt: '唸這個字，最後的 L 舌尖要抵住上齒齦（不要省略）。', mic: true },
      { type: 'blend', section: '拼讀', item: W.pick(G.cvc_a, 1)[0] }
    ],
    quiz: [
      { type: 'minimal-pair', skill: 'listen', a: 'vine', b: 'wine', pa: 'v', pb: 'w', zh: 'v / w' },
      { type: 'minimal-pair', skill: 'listen', a: 'rice', b: 'lice', pa: 'r', pb: 'l', zh: 'r / l' },
      { type: 'minimal-pair', skill: 'listen', a: 'zoo', b: 'sue', pa: 'z', pb: 's', zh: 'z / s' },
      { type: 'rule-pick', skill: 'concept', prompt: '唸 /v/ 的時候，正確的口型是？',
        options: ['嘴唇噘圓，牙齒不碰', '上排牙齒輕咬下嘴唇', '舌尖伸出齒間'],
        answer: 1, rule: 'articulation',
        why: '嘴唇噘圓是 /w/，舌尖伸出是 /θ/。/v/ 必須牙齒碰嘴唇。' },
      { type: 'rule-pick', skill: 'concept', prompt: '<b>dogs</b> 最後那個 s 唸什麼音？',
        options: ['/s/ 像 sun', '/z/ 像 zip', '/sh/ 像 ship'],
        answer: 1, rule: 'plural-s',
        why: '前面的 /g/ 是濁音，所以 s 也要跟著變濁音 /z/。這叫「同化」，之後 Level 8 會細講。' },
      { type: 'dictation', skill: 'spell', item: W.pick(G.cvc_i, 1)[0] }
    ],
    pass: { quiz: 0.75 },
    passText: '6 題答對 5 題。這一課的音很難，聽辨對了就算過——發音會在後面幾週慢慢進步。'
  });

  /* ---------------------------------------------------------------- L1-06 */
  Curriculum.register({
    id: 'L1-06', level: 1,
    title: '合音、拆音與換音',
    sub: 'blending、segmenting、substitution',
    mins: 28,
    goal: '聽到 /k/-/æ/-/t/ 能合成 cat；聽到 cat 能拆成 /k/-/æ/-/t/；能把 cat 的第一個音換掉變成 bat。',
    rules: [
      { h: 'Blending（合音）＝ 讀',
        t: '看到字 → 拆出每個字母的音 → 快速連起來 → 認出這個字。' +
           '<br>關鍵是「連續」，不是一個一個蹦出來。' },
      { h: 'Segmenting（拆音）＝ 寫',
        t: '聽到字 → 拆成一個一個音 → 每個音想它怎麼拼 → 寫出來。' +
           '<br>這就是「聽音能寫」的完整流程。' },
      { h: 'Substitution（換音）＝ 最高階的音素操作',
        t: '把 cat 的第一個音換成 /b/ → bat。<br>' +
           '這要求你同時做到三件事：拆開整個字、抽掉一個零件、組回去。' +
           '做得到，代表你的音素覺識真的建立起來了。' }
    ],
    explain:
      '<p><b>合音的訣竅：不要停</b></p>' +
      '<p>錯誤做法：/k/（停）/æ/（停）/t/（停）→ 三個分開的聲音，合不起來。<br>' +
      '正確做法：/kkkææættt/ → 像滑音一樣連續，然後越滑越快，最後自然變成 cat。</p>' +
      '<p><b>拆音的訣竅：用手指數</b></p>' +
      '<p>聽到一個字，每聽出一個音就伸一根手指。這個動作看起來幼稚，' +
      '但它把抽象的聲音變成可以「數」的東西，是研究上證實有效的做法（Elkonin boxes）。</p>' +
      '<p class="small muted">本站的拆音練習就是數位版的 Elkonin box——一個音一格。</p>',
    trap: '注意：<b>字母數 ≠ 音數</b>。ship 有 4 個字母但只有 3 個音（/ʃ/-/ɪ/-/p/）。' +
          'box 有 3 個字母但有 4 個音（/b/-/ɑ/-/k/-/s/）。永遠用耳朵數，不要用眼睛數。',
    res: ['readingbear'],
    ex: [
      { type: 'blend', section: '合音', item: W.pick(G.cvc_a, 1)[0] },
      { type: 'blend', section: '合音', item: W.pick(G.cvc_i, 1)[0] },
      { type: 'blend', section: '合音', item: W.pick(G.cvc_u, 1)[0] },
      { type: 'segment', section: '拆音', item: W.pick(G.cvc_o, 1)[0] },
      { type: 'segment', section: '拆音', item: W.pick(G.cvc_e, 1)[0] },
      { type: 'count', section: '數音素', item: { w: 'ship', parts: [
          { g: 'sh', p: 'sh' }, { g: 'i', p: 'i_' }, { g: 'p', p: 'p' }], ph: ['sh', 'i_', 'p'] } },
      { type: 'count', section: '數音素', item: { w: 'box', parts: [
          { g: 'b', p: 'b' }, { g: 'o', p: 'o_' }, { g: 'x', p: 'k' }], ph: ['b', 'o_', 'k'] },
        answer: 4 },
      { type: 'swap', section: '換音', from: 'cat', pos: 'first', newSound: '/b/',
        answer: 'bat', options: ['bat', 'cab', 'hat', 'bad'] },
      { type: 'swap', section: '換音', from: 'pig', pos: 'last', newSound: '/n/',
        answer: 'pin', options: ['pin', 'big', 'pit', 'nip'] },
      { type: 'swap', section: '換音', from: 'hot', pos: 'middle', newSound: '/æ/',
        answer: 'hat', options: ['hat', 'hit', 'hut', 'hop'] }
    ],
    quiz: [
      { type: 'segment', skill: 'seg', item: W.pick(G.cvc_a, 1)[0] },
      { type: 'segment', skill: 'seg', item: W.pick(G.cvc_u, 1)[0] },
      { type: 'count', skill: 'seg', item: W.pick(G.cvc_i, 1)[0] },
      { type: 'swap', skill: 'swap', from: 'map', pos: 'first', newSound: '/k/',
        answer: 'cap', options: ['cap', 'mad', 'lap', 'mop'] },
      { type: 'swap', skill: 'swap', from: 'bed', pos: 'middle', newSound: '/ɪ/',
        answer: 'bid', options: ['bid', 'bad', 'bud', 'bet'] },
      { type: 'dictation', skill: 'spell', item: W.pick(G.cvc_e, 1)[0] },
      { type: 'dictation', skill: 'spell', item: W.pick(G.cvc_o, 1)[0] },
      { type: 'nonsense', skill: 'decode', word: 'vug', rule: 'cvc' }
    ],
    pass: { quiz: 0.75 },
    passText: '8 題答對 6 題以上，而且拆音題要能一次數對。換音是最難的一種，錯一題可以接受。' +
              '這一課過了，Level 1 就完成了。'
  });
})();
