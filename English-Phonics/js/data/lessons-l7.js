/* ==========================================================================
   Level 7 — 音節切分與多音節解碼
   這一級是「見字能讀」的真正關卡：真實英文裡長字佔多數，
   而長字不是用背的，是用切的。
   ========================================================================== */
(function () {
  'use strict';
  var W = Words, G = WORDS;
  function f(w) { return G.multi.filter(function (x) { return x.w === w; })[0] || G.multi[0]; }

  /* ---------------------------------------------------------------- L7-01 */
  Curriculum.register({
    id: 'L7-01', level: 7,
    title: '音節是什麼：一個母音音 = 一個音節',
    sub: '先學會數，才學會切',
    mins: 22,
    goal: '聽到或看到任何單字，能正確數出它有幾個音節。',
    rules: [
      { h: '一個音節 = 一個「母音的音」',
        t: '注意是<b>母音的音</b>，不是母音字母。<br>' +
           'cake 有 3 個母音字母（a、e）？不對——只有 1 個母音音 /eɪ/，所以 1 個音節。' },
      { h: '數音節的方法：下巴',
        t: '手放在下巴下方，唸這個字。下巴往下掉幾次，就是幾個音節。<br>' +
           'com-pu-ter → 下巴掉三次 → 3 個音節。' },
      { h: '中文的優勢',
        t: '中文一個字就是一個音節，你其實對音節很敏感。<br>' +
           '問題只在於英文的音節可以很複雜（strengths 一個音節但有 8 個字母）。' }
    ],
    explain:
      '<p><b>為什麼要學數音節？</b></p>' +
      '<p>因為長單字的解碼流程是：<br>' +
      '1. 數出有幾個音節 → 知道要切成幾塊<br>' +
      '2. 切開 → 每塊變成你已經會的短單字<br>' +
      '3. 逐塊唸 → 連起來</p>' +
      '<p>例如 fantastic：<br>' +
      '3 個音節 → fan / tas / tic → 每塊都是簡單的閉音節 → /fænˈtæstɪk/</p>' +
      '<p class="small muted">這就是為什麼前面六級要打好基礎：' +
      '切開之後的每一小塊，你都已經會讀了。</p>',
    trap: '常見錯誤：把 silent e 算成一個音節。<br>' +
          'cake = 1 個音節（不是 2）、name = 1 個、hope = 1 個。<br>' +
          '但 -le 結尾算一個音節：ta-ble（2）、pur-ple（2）、ap-ple（2）。',
    res: ['ufli-toolbox'],
    ex: [
      { type: 'rule-pick', section: '數音節', prompt: '<b>rabbit</b> 有幾個音節？',
        word: 'rabbit', options: ['1 個', '2 個', '3 個'], answer: 1, rule: 'syllable-count',
        why: 'rab-bit，兩個母音音 /æ/ 和 /ɪ/。' },
      { type: 'rule-pick', section: '數音節', prompt: '<b>cake</b> 有幾個音節？',
        word: 'cake', options: ['1 個', '2 個', '3 個'], answer: 0, rule: 'syllable-count',
        why: '只有一個母音音 /eɪ/。字尾的 e 不發音，不算音節。' },
      { type: 'rule-pick', section: '數音節', prompt: '<b>computer</b> 有幾個音節？',
        word: 'computer', options: ['2 個', '3 個', '4 個'], answer: 1, rule: 'syllable-count',
        why: 'com-pu-ter，三個母音音。' },
      { type: 'rule-pick', section: '數音節', prompt: '<b>table</b> 有幾個音節？',
        word: 'table', options: ['1 個', '2 個', '3 個'], answer: 1, rule: 'syllable-count',
        why: 'ta-ble。-le 結尾自成一個音節，即使裡面的 e 不發音。' },
      { type: 'read-aloud', section: '朗讀', item: f('napkin'), plain: true,
        prompt: '先數音節（下巴會掉幾次），再切開唸。' },
      { type: 'read-aloud', section: '朗讀', item: f('basket'), plain: true }
    ],
    quiz: [
      { type: 'rule-pick', skill: 'syl', prompt: '<b>animal</b> 有幾個音節？', word: 'animal',
        options: ['2 個', '3 個', '4 個'], answer: 1, rule: 'syllable-count',
        why: 'an-i-mal，三個。' },
      { type: 'rule-pick', skill: 'syl', prompt: '<b>smile</b> 有幾個音節？', word: 'smile',
        options: ['1 個', '2 個', '3 個'], answer: 0, rule: 'syllable-count' },
      { type: 'rule-pick', skill: 'syl', prompt: '<b>purple</b> 有幾個音節？', word: 'purple',
        options: ['1 個', '2 個', '3 個'], answer: 1, rule: 'syllable-count' },
      { type: 'rule-pick', skill: 'syl', prompt: '<b>elephant</b> 有幾個音節？', word: 'elephant',
        options: ['2 個', '3 個', '4 個'], answer: 1, rule: 'syllable-count' },
      { type: 'read-aloud', skill: 'decode', item: f('problem'), plain: true },
      { type: 'dictation', skill: 'spell', item: f('napkin') }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。數音節要能自動反應——這是後面所有切分的前提。'
  });

  /* ---------------------------------------------------------------- L7-02 */
  Curriculum.register({
    id: 'L7-02', level: 7,
    title: '六種音節型態',
    sub: '看到一塊，就知道母音怎麼唸',
    mins: 26,
    goal: '認得六種音節型態，並能據此判斷每個音節的母音讀法。',
    rules: [
      { h: '1. 閉音節（Closed）→ 短音',
        t: 'cat, nap, kin — 母音後面有子音關門。<b>最常見</b>，約占 50%。' },
      { h: '2. 開音節（Open）→ 長音',
        t: 'me, go, ti(ger), ro(bot) — 母音是音節最後一個字母。' },
      { h: '3. Silent-e（VCe）→ 長音',
        t: 'cake, bike, home — 母音 + 子音 + 不發音的 e。' },
      { h: '4. Vowel team → 看組合',
        t: 'rain, boat, moon, see — 兩個母音字母一起。' },
      { h: '5. R 控制（Bossy R）→ 特殊音',
        t: 'car, bird, corn — 母音後面接 r。' },
      { h: '6. 子音 + le（Consonant-le）→ 字尾特殊',
        t: 'ta-<b>ble</b>, pur-<b>ple</b>, ap-<b>ple</b>, lit-<b>tle</b><br>' +
           '總是在字尾，唸成 /əl/。' }
    ],
    explain:
      '<p><b>為什麼要分六種？</b></p>' +
      '<p>因為<b>音節型態決定母音讀法</b>。你切開一個長字之後，' +
      '看每一塊屬於哪一型，就知道那個母音要唸長還是短。</p>' +
      '<p>示範：<b>napkin</b><br>' +
      '切成 nap / kin → 兩塊都是閉音節 → 兩個母音都唸短音 → /ˈnæpkɪn/</p>' +
      '<p>示範：<b>tiger</b><br>' +
      '切成 ti / ger → ti 是開音節（長音 /aɪ/）、ger 是 r 控制 → /ˈtaɪɡər/</p>' +
      '<p class="small muted">這六種型態是 Orton-Gillingham 系統的核心工具，' +
      '已經用了近一百年，因為它真的有效。</p>',
    trap: '第六種（子音 + le）最容易忘。看到字尾是 -ble、-ple、-tle、-dle、-gle、-fle、-kle，' +
          '就把最後三個字母切成獨立一個音節。',
    res: ['ufli-toolbox', 'readinguniverse'],
    ex: [
      { type: 'sort', section: '型態判斷', prompt: '<b>nap</b>（napkin 的第一塊）是哪種音節？',
        word: 'nap', categories: ['閉音節', '開音節', 'Silent-e'], answer: 0, rule: 'syllable-type',
        why: 'a 後面有 p 關門 → 閉音節 → 短音 /æ/。' },
      { type: 'sort', section: '型態判斷', prompt: '<b>ro</b>（robot 的第一塊）是哪種音節？',
        word: 'ro', categories: ['閉音節', '開音節', 'Silent-e'], answer: 1, rule: 'syllable-type',
        why: 'o 是最後一個字母，沒有關門 → 開音節 → 長音 /oʊ/。' },
      { type: 'sort', section: '型態判斷', prompt: '<b>car</b> 是哪種音節？',
        word: 'car', categories: ['閉音節', 'R 控制', 'Vowel team'], answer: 1, rule: 'syllable-type' },
      { type: 'sort', section: '型態判斷', prompt: '<b>ble</b>（table 的第二塊）是哪種音節？',
        word: 'table', categories: ['閉音節', '開音節', '子音 + le'], answer: 2, rule: 'syllable-type',
        why: '字尾 -ble 是子音 + le 型，唸 /bəl/。' },
      { type: 'read-aloud', section: '朗讀', item: f('tiger'), plain: true,
        prompt: 'ti（開音節，長音）+ ger（r 控制）' },
      { type: 'read-aloud', section: '朗讀', item: f('table'), plain: true,
        prompt: 'ta（開音節）+ ble（子音+le）' }
    ],
    quiz: [
      { type: 'sort', skill: 'syl', prompt: '<b>ti</b>（tiger）是哪種音節？', word: 'tiger',
        categories: ['閉音節', '開音節'], answer: 1, rule: 'syllable-type' },
      { type: 'sort', skill: 'syl', prompt: '<b>bas</b>（basket）是哪種音節？', word: 'basket',
        categories: ['閉音節', '開音節'], answer: 0, rule: 'syllable-type' },
      { type: 'sort', skill: 'syl', prompt: '<b>ple</b>（purple）是哪種音節？', word: 'purple',
        categories: ['閉音節', '子音 + le'], answer: 1, rule: 'syllable-type' },
      { type: 'rule-pick', skill: 'syl', prompt: '<b>ro·bot</b> 的 ro，o 應該唸什麼？',
        options: ['短音 /ɑ/ 像 hot', '長音 /oʊ/ 像 boat'], answer: 1, rule: 'syllable-type',
        why: 'ro 是開音節，母音唸長音。' },
      { type: 'read-aloud', skill: 'decode', item: f('purple'), plain: true },
      { type: 'dictation', skill: 'spell', item: f('table') }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。六種型態要能立刻辨認——這是解碼長字的判斷依據。'
  });

  /* ---------------------------------------------------------------- L7-03 */
  Curriculum.register({
    id: 'L7-03', level: 7,
    title: '切分法（一）：VC/CV — 兩個子音中間切',
    sub: 'rab·bit, nap·kin, bas·ket',
    mins: 24,
    goal: '看到「母音-子音-子音-母音」的結構，能正確在兩個子音中間切開。',
    rules: [
      { h: 'VC/CV：兩個子音之間切一刀',
        t: 'rab|bit、nap|kin、bas|ket、mag|net、pic|nic<br>' +
           '切完之後，<b>第一個音節變成閉音節 → 短音</b>。' },
      { h: '例外：digraph 和 blend 不能切開',
        t: 'ath|lete 可以（th 是 digraph，整組留在一起）<br>' +
           'mon|ster（st 是 blend，但這裡切在 n 和 s 之間）<br>' +
           '原則：<b>digraph（sh, ch, th, ck, ng）絕不切開</b>。' },
      { h: '雙子音就切中間',
        t: 'rab|bit、let|ter、sum|mer、din|ner、hap|py<br>' +
           '這是最好認的情況。' }
    ],
    explain:
      '<p><b>VC/CV 是最常用的切分法</b></p>' +
      '<p>英文裡大約一半的雙音節字適用這條。步驟：<br>' +
      '1. 找出所有母音<br>' +
      '2. 看兩個母音中間有幾個子音<br>' +
      '3. 剛好兩個 → 中間切開</p>' +
      '<p>示範：<b>napkin</b><br>' +
      'n<u>a</u>pk<u>i</u>n → a 和 i 中間有 p、k 兩個子音 → nap|kin<br>' +
      '→ nap（閉，短 a）+ kin（閉，短 i）→ /ˈnæpkɪn/</p>',
    trap: '切開之後<b>兩塊都是閉音節</b>，所以兩個母音都唸短音。' +
          '這一點對中文母語者很重要——你會傾向把每個音節都唸得很清楚很長，' +
          '但英文的非重音節其實會弱化（下一課的 schwa）。',
    res: ['ufli-toolbox'],
    ex: [
      { type: 'rule-pick', section: '切分', prompt: '<b>rabbit</b> 應該怎麼切？',
        word: 'rabbit', options: ['ra·bbit', 'rab·bit', 'rabb·it'], answer: 1, rule: 'vccv',
        why: '兩個子音 b、b 中間切開 → rab·bit。' },
      { type: 'rule-pick', section: '切分', prompt: '<b>basket</b> 應該怎麼切？',
        word: 'basket', options: ['ba·sket', 'bas·ket', 'bask·et'], answer: 1, rule: 'vccv',
        why: 's 和 k 中間切開 → bas·ket。' },
      { type: 'rule-pick', section: '切分', prompt: '<b>napkin</b> 應該怎麼切？',
        word: 'napkin', options: ['na·pkin', 'nap·kin', 'napk·in'], answer: 1, rule: 'vccv' },
      { type: 'read-aloud', section: '朗讀', item: f('rabbit'), plain: true },
      { type: 'read-aloud', section: '朗讀', item: f('basket'), plain: true },
      { type: 'dictation', section: '聽寫', item: f('napkin') }
    ],
    quiz: [
      { type: 'rule-pick', skill: 'syl', prompt: '<b>problem</b> 應該怎麼切？', word: 'problem',
        options: ['pro·blem', 'prob·lem', 'probl·em'], answer: 1, rule: 'vccv',
        why: 'b 和 l 中間切開。（pr 是 blend 留在前面，bl 不能拆但這裡是 b|l 分屬兩個音節）' },
      { type: 'rule-pick', skill: 'syl', prompt: '<b>magnet</b> 應該怎麼切？', word: 'magnet',
        options: ['ma·gnet', 'mag·net', 'magn·et'], answer: 1, rule: 'vccv' },
      { type: 'read-aloud', skill: 'decode', item: f('rabbit'), plain: true },
      { type: 'dictation', skill: 'spell', item: f('basket') },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.multi[0], rule: 'syllable' },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.multi[2], rule: 'syllable' }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。假字題要能切開唸——那證明你是用規則不是用記憶。'
  });

  /* ---------------------------------------------------------------- L7-04 */
  Curriculum.register({
    id: 'L7-04', level: 7,
    title: '切分法（二）：V/CV 與 VC/V — 只有一個子音時',
    sub: 'ti·ger vs cam·el，「試兩次」再度登場',
    mins: 26,
    goal: '兩個母音中間只有一個子音時，能用「先試 V/CV，不對再試 VC/V」處理。',
    rules: [
      { h: 'V/CV（先試這個）→ 第一個音節是開音節，長音',
        t: 'ti|ger、ro|bot、pa|per、ba|by、mu|sic、o|pen<br>' +
           '子音跟著<b>後面</b>的母音走，第一塊變開音節 → 長音。' },
      { h: 'VC/V（第一種不對再試）→ 第一個音節是閉音節，短音',
        t: 'cam|el、lem|on、rob|in、mod|el、cab|in、sev|en<br>' +
           '子音留在<b>前面</b>，第一塊變閉音節 → 短音。' },
      { h: '策略：先試 V/CV',
        t: '因為 V/CV 比較常見（約 60%）。<br>' +
           '唸出來不像認識的字，就改用 VC/V 再試一次。' }
    ],
    explain:
      '<p><b>這是「試兩次」策略在多音節的應用</b></p>' +
      '<p>看到 <i>lemon</i>：<br>' +
      '第一次 V/CV → le|mon → /ˈliːmən/ → 不像認識的字<br>' +
      '第二次 VC/V → lem|on → /ˈlɛmən/ → 對了，是檸檬</p>' +
      '<p>看到 <i>paper</i>：<br>' +
      '第一次 V/CV → pa|per → /ˈpeɪpər/ → 對了，第一次就中</p>' +
      '<p class="small muted">不要害怕第一次唸錯。熟練的讀者每天都在做這件事，' +
      '只是速度快到你看不出來。</p>',
    trap: '注意：這條規則只適用於「兩個母音中間只有一個子音」的情況。<br>' +
          '如果中間是 digraph（如 mo|ther 的 th），digraph 整組跟著後面走。',
    res: ['ufli-toolbox', 'youglish'],
    ex: [
      { type: 'rule-pick', section: '切分', prompt: '<b>tiger</b> 應該怎麼切？',
        word: 'tiger', options: ['ti·ger（開音節，長 i）', 'tig·er（閉音節，短 i）'],
        answer: 0, rule: 'vcv', why: 'V/CV 第一次就中：ti·ger = /ˈtaɪɡər/。' },
      { type: 'rule-pick', section: '切分', prompt: '<b>camel</b> 應該怎麼切？',
        word: 'camel', options: ['ca·mel（開音節，長 a）', 'cam·el（閉音節，短 a）'],
        answer: 1, rule: 'vcv', why: 'V/CV 試出 /ˈkeɪməl/ 不像字，換 VC/V → cam·el = /ˈkæməl/。' },
      { type: 'rule-pick', section: '切分', prompt: '<b>robot</b> 應該怎麼切？',
        word: 'robot', options: ['ro·bot（長 o）', 'rob·ot（短 o）'], answer: 0, rule: 'vcv' },
      { type: 'rule-pick', section: '切分', prompt: '<b>lemon</b> 應該怎麼切？',
        word: 'lemon', options: ['le·mon（長 e）', 'lem·on（短 e）'], answer: 1, rule: 'vcv' },
      { type: 'read-aloud', section: '朗讀', item: f('tiger'), plain: true },
      { type: 'read-aloud', section: '朗讀', item: f('robot'), plain: true }
    ],
    quiz: [
      { type: 'rule-pick', skill: 'syl', prompt: '<b>paper</b> 怎麼切？', word: 'paper',
        options: ['pa·per（長 a）', 'pap·er（短 a）'], answer: 0, rule: 'vcv' },
      { type: 'rule-pick', skill: 'syl', prompt: '<b>cabin</b> 怎麼切？', word: 'cabin',
        options: ['ca·bin（長 a）', 'cab·in（短 a）'], answer: 1, rule: 'vcv' },
      { type: 'rule-pick', skill: 'syl', prompt: '<b>music</b> 怎麼切？', word: 'music',
        options: ['mu·sic（長 u）', 'mus·ic（短 u）'], answer: 0, rule: 'vcv' },
      { type: 'rule-pick', skill: 'concept', prompt: '兩個母音中間只有一個子音，應該先試哪一種？',
        options: ['先試 VC/V（短音）', '先試 V/CV（長音）', '隨便試'],
        answer: 1, rule: 'vcv', why: 'V/CV 比較常見（約 60%），先試命中率高。' },
      { type: 'read-aloud', skill: 'decode', item: f('robot'), plain: true },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.multi[1], rule: 'syllable' }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。策略題（先試哪個）一定要對。'
  });

  /* ---------------------------------------------------------------- L7-05 */
  Curriculum.register({
    id: 'L7-05', level: 7,
    title: 'Schwa 與重音：非重音節會「糊掉」',
    sub: '中文母語者的最大盲點',
    mins: 28,
    goal: '理解英文的非重音節母音會弱化成 /ə/，並能聽出重音在哪一節。',
    rules: [
      { h: 'Schwa /ə/ 是英文最常出現的母音',
        t: '它出現在<b>沒有重音的音節</b>，聽起來像一個很短很鬆的「呃」。<br>' +
           '<b>a</b>bout、tak<b>e</b>n、penc<b>i</b>l、lem<b>o</b>n、circ<b>u</b>s<br>' +
           '五個母音字母都可能唸成 schwa。' },
      { h: '英文是「重音節奏」語言，中文不是',
        t: '中文每個字都清楚、長度差不多。<br>' +
           '英文只有重音節清楚，其他都被壓縮糊掉。<br>' +
           'ba<b>NA</b>na → /bəˈnænə/ — 只有中間那節是清楚的 /æ/，前後都是 /ə/。' },
      { h: '為什麼這對拼寫很重要',
        t: '聽到 /ə/ 的時候，你完全無法從聲音判斷該寫 a、e、i、o 還是 u。<br>' +
           '解法：想這個字的<b>相關字</b>。<br>' +
           'compet<b>i</b>tion 的 i 不確定？想 compete → 那裡的 e… 不對，想 competitive。<br>' +
           '這叫「詞族策略」，Level 9 會深入。' }
    ],
    explain:
      '<p><b>先確認你聽得出 schwa</b></p>' +
      '<p>唸 banana，注意三個 a 聽起來完全不同：<br>' +
      '· 第一個 a = /ə/（很輕）<br>· 第二個 a = /æ/（清楚、重）<br>· 第三個 a = /ə/（很輕）</p>' +
      '<p>如果你把三個 a 都唸成一樣清楚的 /æ/，聽起來就會有明顯的外國口音，' +
      '而且會影響你的聽力理解（因為母語者說話時那些音節真的很輕）。</p>' +
      '<p><b>怎麼找重音？</b><br>' +
      '把整個字用「大聲/小聲」唸兩次，哪一種聽起來對，重音就在那裡。<br>' +
      'ba-NA-na ✓　　BA-na-na ✗</p>',
    trap: '雙音節名詞多半重音在第一節（TA-ble、WA-ter），<br>' +
          '雙音節動詞多半在第二節（de-CIDE、re-TURN）。<br>' +
          '有些字兩種都有，重音位置決定詞性：<br>' +
          '· RE-cord（名詞，紀錄）／ re-CORD（動詞，錄音）<br>' +
          '· PRE-sent（禮物）／ pre-SENT（呈現）',
    res: ['tophonetics', 'rachel-podcast', 'youglish'],
    demo: [{ type: 'phoneme-card', id: 'schwa' }],
    ex: [
      { type: 'rule-pick', section: 'Schwa 辨識', prompt: '<b>about</b> 的第一個 a 唸什麼？',
        word: 'about', options: ['/æ/ 像 cat', '/ə/（schwa，很輕）', '/eɪ/ 像 cake'],
        answer: 1, rule: 'schwa', why: 'a-BOUT，重音在第二節，第一節的 a 弱化成 schwa。' },
      { type: 'rule-pick', section: 'Schwa 辨識', prompt: '<b>lemon</b> 的 o 唸什麼？',
        word: 'lemon', options: ['/ɑ/ 像 hot', '/oʊ/ 像 boat', '/ə/（schwa）'],
        answer: 2, rule: 'schwa', why: 'LEM-on，重音在第一節，o 弱化成 schwa。' },
      { type: 'rule-pick', section: '重音位置', prompt: '<b>banana</b> 的重音在哪一節？',
        word: 'banana', options: ['第一節 BA', '第二節 NA', '第三節 na'],
        answer: 1, rule: 'stress', why: 'ba-NA-na。前後兩個 a 都是 schwa。' },
      { type: 'rule-pick', section: '重音位置', prompt: '<b>computer</b> 的重音在哪一節？',
        word: 'computer', options: ['第一節 com', '第二節 pu', '第三節 ter'],
        answer: 1, rule: 'stress', why: 'com-PU-ter。第一節的 o 是 schwa。' },
      { type: 'read-aloud', section: '朗讀', item: f('banana'), plain: true,
        prompt: '三個 a 要唸得不一樣：輕、重、輕。' },
      { type: 'dictation', section: '聽寫', item: f('animal'),
        prompt: '這個字有兩個 schwa。想想它們該寫成什麼字母。' }
    ],
    quiz: [
      { type: 'rule-pick', skill: 'schwa', prompt: '<b>pencil</b> 的 i 唸什麼？', word: 'pencil',
        options: ['/ɪ/ 像 sit', '/ə/（schwa）', '/aɪ/ 像 bike'], answer: 1, rule: 'schwa' },
      { type: 'rule-pick', skill: 'stress', prompt: '<b>important</b> 的重音在哪一節？', word: 'important',
        options: ['第一節 im', '第二節 por', '第三節 tant'], answer: 1, rule: 'stress',
        why: 'im-POR-tant。第一和第三節都是 schwa。' },
      { type: 'rule-pick', skill: 'schwa', prompt: 'schwa /ə/ 出現在什麼地方？',
        options: ['重音節', '非重音節', '字的開頭'], answer: 1, rule: 'schwa',
        why: '這是 schwa 的定義：非重音節的弱化母音。' },
      { type: 'dictation', skill: 'spell', item: f('problem') },
      { type: 'read-aloud', skill: 'decode', item: f('elephant'), plain: true },
      { type: 'read-aloud', skill: 'decode', item: f('computer'), plain: true }
    ],
    pass: { quiz: 0.75 },
    passText: '6 題答對 5 題。schwa 是長期功課，但「知道它存在」本身就會改變你聽英文的方式。'
  });

  /* ---------------------------------------------------------------- L7-06 */
  Curriculum.register({
    id: 'L7-06', level: 7,
    title: 'Level 7 綜合驗收：長字實戰',
    sub: '三音節以上的假字與真字',
    mins: 30,
    goal: '面對三音節以上的陌生單字，能切分、判斷型態、唸出合理讀音。',
    rules: [
      { h: '長字解碼 SOP',
        t: '1. 數母音音（有幾個音節）<br>' +
           '2. 找子音串，決定切點（VC/CV 或 V/CV）<br>' +
           '3. 判斷每塊的音節型態<br>' +
           '4. 逐塊唸<br>' +
           '5. 連起來，找重音<br>' +
           '6. 把非重音節弱化成 schwa<br>' +
           '7. 不像認識的字 → 換切法再試一次' }
    ],
    explain:
      '<p><b>這是「見字能讀」的最終形態</b></p>' +
      '<p>能穩定執行這個 SOP，你就能唸出絕大多數沒看過的英文字——' +
      '包括專業術語、人名、地名。</p>' +
      '<p>不用每次都完全正確。母語者也會唸錯不熟的字。' +
      '重點是能產出一個<b>合理的候選讀音</b>，而且通常八九不離十。</p>',
    trap: '假字題會出現三音節的組合。慢慢來，一塊一塊處理。' +
          '這一課的目標不是速度，是流程的完整性。',
    res: ['tophonetics', 'youglish', 'readinguniverse'],
    ex: [
      { type: 'nonsense', section: '假字', word: WORDS.nonsense.multi[3], rule: 'syllable' },
      { type: 'nonsense', section: '假字', word: WORDS.nonsense.multi[4], rule: 'syllable' },
      { type: 'read-aloud', section: '真字', item: f('computer'), plain: true },
      { type: 'read-aloud', section: '真字', item: f('elephant'), plain: true },
      { type: 'sentence', section: '句子', text: G.sentences.multi[0] },
      { type: 'sentence', section: '句子', text: G.sentences.multi[1] }
    ],
    quiz: [
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.multi[5], rule: 'syllable' },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.multi[6], rule: 'syllable' },
      { type: 'nonsense', skill: 'decode', word: WORDS.nonsense.multi[7], rule: 'syllable' },
      { type: 'dictation', skill: 'spell', item: f('animal') },
      { type: 'dictation', skill: 'spell', item: f('computer') },
      { type: 'read-aloud', skill: 'decode', item: f('banana'), plain: true },
      { type: 'sentence', skill: 'fluency', text: G.sentences.multi[2] },
      { type: 'sentence', skill: 'fluency', text: G.sentences.multi[3] }
    ],
    pass: { quiz: 0.75 },
    passText: '8 題答對 6 題以上算過 Level 7。到這裡，「見字能讀」的核心技術你已經完整了。'
  });
})();
