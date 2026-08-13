/* ==========================================================================
   Level 9 — 構詞：字首、字尾、字根
   長單字幾乎都是組合出來的。學會零件，一次拿下數千字，
   而且能同時解決 schwa 的拼寫難題（用詞族推測）。
   ========================================================================== */
(function () {
  'use strict';

  function w(s) { return { w: s, parts: null, ph: [] }; }

  /* ---------------------------------------------------------------- L9-01 */
  Curriculum.register({
    id: 'L9-01', level: 9,
    title: '單字是組合出來的：詞素概念',
    sub: 'un + happi + ness = 三個零件',
    mins: 24,
    goal: '看到長單字，能拆出「字首 + 字根 + 字尾」三種零件。',
    rules: [
      { h: '詞素（morpheme）＝ 有意義的最小單位',
        t: '<b>un</b>·<b>happi</b>·<b>ness</b> → un（否定）+ happy（快樂）+ ness（名詞化）<br>' +
           '每個零件都有自己的意思，組起來就是「不快樂的狀態」。' },
      { h: '三種零件',
        t: '<b>字首（prefix）</b>：加在前面改變意思 — un-, re-, pre-, dis-<br>' +
           '<b>字根（root）</b>：核心意思 — happy, port, spect<br>' +
           '<b>字尾（suffix）</b>：改變詞性 — -ness, -ment, -able, -ly' },
      { h: '為什麼構詞比音節切分更好用',
        t: '音節切分處理「怎麼唸」，構詞處理「什麼意思」＋「怎麼拼」。<br>' +
           '而且構詞的邊界通常和音節邊界一致，兩個一起用最有效。' }
    ],
    explain:
      '<p><b>構詞解決了 schwa 的拼寫難題</b></p>' +
      '<p>還記得 Level 7 的問題嗎：聽到 /ə/ 不知道要寫哪個母音字母。<br>' +
      '構詞給了答案：<b>找同一個詞族裡那個音是重音的字</b>。</p>' +
      '<p>例：definition 的第二個 i 不確定？<br>' +
      '→ 想 define（重音在 -fine），那裡的 i 很清楚 → 所以寫 i</p>' +
      '<p>例：competition 的第二個 e？<br>' +
      '→ 想 compete，那裡的 e 是清楚的 /iː/ → 所以寫 e</p>' +
      '<p class="small muted">這叫「詞族策略」，是英文拼寫最強的工具之一。</p>',
    trap: '拆詞素時注意：有些字看起來有字首其實沒有。<br>' +
          '· reason 的 re 不是字首（不是 re + ason）<br>' +
          '· uncle 的 un 不是字首<br>' +
          '判斷法：拆掉之後剩下的部分是不是有意義的字根？',
    res: ['etymonline'],
    ex: [
      { type: 'rule-pick', section: '拆詞素', prompt: '<b>unhappy</b> 由幾個詞素組成？',
        word: 'unhappy', options: ['1 個', '2 個', '3 個'], answer: 1, rule: 'morpheme',
        why: 'un（否定）+ happy（快樂）= 2 個。' },
      { type: 'rule-pick', section: '拆詞素', prompt: '<b>unhappiness</b> 由幾個詞素組成？',
        word: 'unhappiness', options: ['2 個', '3 個', '4 個'], answer: 1, rule: 'morpheme',
        why: 'un + happy + ness = 3 個。' },
      { type: 'rule-pick', section: '詞族策略', prompt: '<b>definition</b> 的第二個母音該寫什麼？想想它的詞族。',
        word: 'definition', options: ['definition（i）', 'defenition（e）', 'defanition（a）'],
        answer: 0, rule: 'word-family',
        why: '想 de-FINE，那裡的 i 是清楚的 /aɪ/ → 所以寫 i。' },
      { type: 'rule-pick', section: '詞族策略', prompt: '<b>competition</b> 的第二個母音該寫什麼？',
        word: 'competition', options: ['compitition（i）', 'competition（e）', 'compatition（a）'],
        answer: 1, rule: 'word-family',
        why: '想 com-PETE，那裡的 e 是清楚的 /iː/ → 所以寫 e。' },
      { type: 'read-aloud', section: '朗讀', item: w('unhappiness'), plain: true,
        prompt: '先拆成 un·happi·ness 三塊再唸。' },
      { type: 'dictation', section: '聽寫', item: w('unhappy') }
    ],
    quiz: [
      { type: 'rule-pick', skill: 'morph', prompt: '<b>rewriting</b> 由幾個詞素組成？', word: 'rewriting',
        options: ['2 個', '3 個', '4 個'], answer: 1, rule: 'morpheme',
        why: 're + write + ing = 3 個。' },
      { type: 'rule-pick', skill: 'morph', prompt: '哪一個字的 "un" <b>不是</b>字首？',
        options: ['unlock', 'unfair', 'under'], answer: 2, rule: 'morpheme',
        why: 'under 不能拆成 un + der（der 不是字根）。' },
      { type: 'rule-pick', skill: 'spell', prompt: '<b>relative</b> 的第二個母音怎麼判斷？',
        options: ['查字典', '想 relate，那裡的 a 是清楚的', '猜 a'],
        answer: 1, rule: 'word-family',
        why: 'RE-late 的 a 清楚 → relative 的 a 也寫 a。' },
      { type: 'dictation', skill: 'spell', item: w('helpful') },
      { type: 'read-aloud', skill: 'decode', item: w('disagreement'), plain: true },
      { type: 'dictation', skill: 'spell', item: w('careless') }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。詞族策略要真的會用——它是解決 schwa 拼寫的唯一可靠方法。'
  });

  /* ---------------------------------------------------------------- L9-02 */
  Curriculum.register({
    id: 'L9-02', level: 9,
    title: '常見字首',
    sub: 'un- re- pre- dis- in/im- mis- sub- inter-',
    mins: 26,
    goal: '認得 12 個高頻字首的意思與讀音，並能用它們推測生字。',
    rules: [
      { h: '否定類',
        t: '<b>un-</b> 不：unhappy, unlock, unfair, unable<br>' +
           '<b>dis-</b> 不、相反：dislike, disagree, disappear<br>' +
           '<b>in- / im- / il- / ir-</b> 不：incorrect, impossible, illegal, irregular<br>' +
           '<span class="muted">im- 用在 b/m/p 前，il- 用在 l 前，ir- 用在 r 前——為了好唸。</span>' },
      { h: '方向與時間類',
        t: '<b>re-</b> 再一次、回：rewrite, return, review, repeat<br>' +
           '<b>pre-</b> 之前：preview, predict, prepare, prevent<br>' +
           '<b>post-</b> 之後：postpone, postwar<br>' +
           '<b>sub-</b> 在下面：submarine, subway, subject' },
      { h: '其他高頻',
        t: '<b>mis-</b> 錯誤：mistake, misunderstand, misuse<br>' +
           '<b>inter-</b> 之間：international, internet, interview<br>' +
           '<b>trans-</b> 越過：transport, translate, transfer<br>' +
           '<b>ex-</b> 出去：exit, export, expand' }
    ],
    explain:
      '<p><b>字首的讀音通常是「弱的」</b></p>' +
      '<p>大部分字首不帶重音，所以母音會弱化成 schwa：<br>' +
      '· <b>a</b>bout、<b>a</b>gree → /ə/<br>· sub<b>MIT</b> 的 sub → /səb/<br>' +
      '· <b>PRE</b>view（名詞，重音在前）vs pre<b>VENT</b>（動詞，重音在後）</p>' +
      '<p><b>用字首推測生字意思</b><br>' +
      '看到不認識的 "irreversible"：<br>' +
      'ir（不）+ re（回）+ vers（轉）+ ible（可以的）→ 「不能轉回來的」→ 不可逆的</p>',
    trap: 'in- 有兩個完全不同的意思：<br>' +
          '· 「不」：incorrect, invisible<br>· 「進入」：include, insert, income<br>' +
          '只能靠上下文判斷。',
    res: ['etymonline', 'membean-roots'],
    ex: [
      { type: 'rule-pick', section: '字首意思', prompt: '<b>preview</b> 的 pre- 是什麼意思？',
        word: 'preview', options: ['之後', '之前', '不'], answer: 1, rule: 'prefix' },
      { type: 'rule-pick', section: '字首意思', prompt: '<b>misunderstand</b> 的 mis- 是什麼意思？',
        word: 'misunderstand', options: ['錯誤', '再一次', '之間'], answer: 0, rule: 'prefix' },
      { type: 'rule-pick', section: '字首選擇', prompt: '「不可能」應該用哪個字首？',
        options: ['unpossible', 'impossible', 'ilpossible'], answer: 1, rule: 'prefix-form',
        why: 'p 前面用 im-（好唸）。同理 b、m 前面也用 im-。' },
      { type: 'rule-pick', section: '字首選擇', prompt: '「不規則」應該用哪個字首？',
        options: ['inregular', 'imregular', 'irregular'], answer: 2, rule: 'prefix-form',
        why: 'r 前面用 ir-。' },
      { type: 'read-aloud', section: '朗讀', item: w('international'), plain: true,
        prompt: 'in·ter·na·tion·al — 五個音節，重音在 na。' },
      { type: 'dictation', section: '聽寫', item: w('disagree') }
    ],
    quiz: [
      { type: 'rule-pick', skill: 'morph', prompt: '<b>submarine</b> 的 sub- 是什麼意思？',
        word: 'submarine', options: ['在上面', '在下面', '在之間'], answer: 1, rule: 'prefix' },
      { type: 'rule-pick', skill: 'morph', prompt: '「不合法」應該是？',
        options: ['unlegal', 'inlegal', 'illegal'], answer: 2, rule: 'prefix-form',
        why: 'l 前面用 il-。' },
      { type: 'rule-pick', skill: 'morph', prompt: '<b>irreversible</b> 大概是什麼意思？',
        options: ['可以轉回來的', '不能轉回來的', '轉很多次的'], answer: 1, rule: 'prefix',
        why: 'ir（不）+ re（回）+ vers（轉）+ ible（可以）。' },
      { type: 'dictation', skill: 'spell', item: w('rewrite') },
      { type: 'dictation', skill: 'spell', item: w('impossible') },
      { type: 'read-aloud', skill: 'decode', item: w('transportation'), plain: true }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。in-/im-/il-/ir- 的變形規則要會——那是拼寫常錯的地方。'
  });

  /* ---------------------------------------------------------------- L9-03 */
  Curriculum.register({
    id: 'L9-03', level: 9,
    title: '常見字尾與詞性',
    sub: '-tion -ment -able -ful -less -ness -ly -er',
    mins: 26,
    goal: '認得高頻字尾的詞性與讀音規律，特別是 -tion / -sion 的特殊讀法。',
    rules: [
      { h: '名詞字尾',
        t: '<b>-tion / -sion</b> 唸 /ʃən/ 或 /ʒən/：nation, action, decision, vision<br>' +
           '<b>-ment</b> 唸 /mənt/：government, movement, agreement<br>' +
           '<b>-ness</b> 唸 /nəs/：happiness, darkness, kindness<br>' +
           '<b>-er / -or</b> 人或工具：teacher, actor, computer' },
      { h: '形容詞字尾',
        t: '<b>-ful</b> 充滿：helpful, careful, beautiful<br>' +
           '<b>-less</b> 沒有：careless, hopeless, useless<br>' +
           '<b>-able / -ible</b> 可以：readable, possible, comfortable<br>' +
           '<b>-ous</b> 有…性質：famous, dangerous, nervous' },
      { h: '重要讀音規律：-tion 前的音節帶重音',
        t: 'na·TION？不對——是 <b>NA</b>·tion。<br>' +
           '規律：<b>-tion / -sion / -ity 的前一個音節帶重音</b>。<br>' +
           'in·for·<b>MA</b>·tion、e·du·<b>CA</b>·tion、pos·si·<b>BI</b>·li·ty' }
    ],
    explain:
      '<p><b>-tion 的讀音是中文母語者的常見錯誤</b></p>' +
      '<p>正確：/ʃən/（像 shun），整個 tion 是一個音節。<br>' +
      '常見錯誤：唸成 /ti-on/ 兩個音節。</p>' +
      '<p><b>重音規律非常有用</b><br>' +
      '看到 -tion 結尾的字，重音自動往前推一格：<br>' +
      '· information → in-for-MA-tion<br>· celebration → cel-e-BRA-tion<br>' +
      '· communication → com-mu-ni-CA-tion</p>' +
      '<p class="small muted">這條規律幾乎沒例外，是唸長字最快的捷徑。</p>',
    trap: '-able 和 -ible 怎麼選？<br>' +
          '· 字根是完整的字 → 多半用 -able：readable, comfortable, acceptable<br>' +
          '· 字根不完整 → 多半用 -ible：possible, terrible, visible<br>' +
          '這條命中率約 80%，不是絕對。',
    res: ['tophonetics', 'youglish'],
    ex: [
      { type: 'rule-pick', section: '讀音', prompt: '<b>nation</b> 的 tion 唸幾個音節？',
        word: 'nation', options: ['1 個音節 /ʃən/', '2 個音節 /ti-ɑn/'], answer: 0, rule: 'tion',
        why: 'tion 整組是一個音節，唸 /ʃən/。' },
      { type: 'rule-pick', section: '重音', prompt: '<b>information</b> 的重音在哪一節？',
        word: 'information', options: ['in', 'for', 'ma', 'tion'], answer: 2, rule: 'tion-stress',
        why: '-tion 前一個音節帶重音 → in-for-MA-tion。' },
      { type: 'rule-pick', section: '重音', prompt: '<b>education</b> 的重音在哪一節？',
        word: 'education', options: ['ed', 'u', 'ca', 'tion'], answer: 2, rule: 'tion-stress' },
      { type: 'rule-pick', section: '字尾意思', prompt: '<b>careless</b> 是什麼意思？',
        word: 'careless', options: ['充滿關心', '沒有關心（粗心）', '可以關心'],
        answer: 1, rule: 'suffix', why: '-less = 沒有。相對的 -ful = 充滿。' },
      { type: 'read-aloud', section: '朗讀', item: w('celebration'), plain: true,
        prompt: 'cel·e·BRA·tion — 重音在 BRA。' },
      { type: 'dictation', section: '聽寫', item: w('movement') }
    ],
    quiz: [
      { type: 'rule-pick', skill: 'stress', prompt: '<b>communication</b> 的重音在哪一節？',
        word: 'communication', options: ['com', 'mu', 'ni', 'ca'], answer: 3, rule: 'tion-stress' },
      { type: 'rule-pick', skill: 'morph', prompt: '<b>hopeless</b> 是什麼意思？',
        word: 'hopeless', options: ['充滿希望', '沒有希望', '可以希望'], answer: 1, rule: 'suffix' },
      { type: 'spell-pick', skill: 'spell', answer: 'possible', options: ['possible', 'possable'],
        rule: 'able-ible', why: 'poss- 不是完整的字 → 用 -ible。' },
      { type: 'spell-pick', skill: 'spell', answer: 'readable', options: ['readable', 'readible'],
        rule: 'able-ible', why: 'read 是完整的字 → 用 -able。' },
      { type: 'dictation', skill: 'spell', item: w('happiness') },
      { type: 'read-aloud', skill: 'decode', item: w('organization'), plain: true }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。-tion 的重音規律要能自動套用——它讓你唸對成千上萬個學術單字。'
  });

  /* ---------------------------------------------------------------- L9-04 */
  Curriculum.register({
    id: 'L9-04', level: 9,
    title: '拉丁與希臘字根',
    sub: 'port spect dict struct scrib tract ject graph phon',
    mins: 28,
    goal: '認得 12 個高頻字根，並能用它們推測完全沒看過的單字。',
    rules: [
      { h: '動作類字根（拉丁）',
        t: '<b>port</b> 攜帶：transport, import, export, portable<br>' +
           '<b>spect</b> 看：inspect, respect, spectator, perspective<br>' +
           '<b>dict</b> 說：predict, dictionary, contradict, dictate<br>' +
           '<b>struct</b> 建造：construct, structure, instruction, destruction' },
      { h: '更多拉丁字根',
        t: '<b>scrib / script</b> 寫：describe, script, prescription, subscribe<br>' +
           '<b>tract</b> 拉：attract, subtract, contract, tractor<br>' +
           '<b>ject</b> 丟：project, reject, inject, eject<br>' +
           '<b>vert / vers</b> 轉：convert, reverse, version, universe' },
      { h: '希臘字根（多見於學術詞）',
        t: '<b>graph</b> 寫、畫：photograph, graphic, biography<br>' +
           '<b>phon</b> 聲音：telephone, phonics, symphony<br>' +
           '<b>bio</b> 生命：biology, biography, antibiotic<br>' +
           '<b>tele</b> 遠：telephone, television, telescope' }
    ],
    explain:
      '<p><b>字根是最划算的投資</b></p>' +
      '<p>學會 spect（看）這一個字根，你立刻能處理：<br>' +
      'inspect（往裡面看＝檢查）、respect（回頭看＝尊敬）、' +
      'suspect（往下看＝懷疑）、prospect（往前看＝前景）、' +
      'spectator（看的人＝觀眾）、spectacular（值得看的＝壯觀）</p>' +
      '<p>一個字根換六個字，而且你連字典都不用查就能猜出大概意思。</p>' +
      '<p class="small muted">這對閱讀學術文章、技術文件特別有用，' +
      '因為那些領域的字幾乎全部是拉丁／希臘字根組成的。</p>',
    trap: '字根的拼法會變形：<br>' +
          '· scrib / scrip / script（describe / description / script）<br>' +
          '· vert / vers（convert / conversion）<br>' +
          '· duc / duct（produce / production）<br>' +
          '認得變形，才不會錯過。',
    res: ['etymonline'],
    ex: [
      { type: 'rule-pick', section: '字根意思', prompt: '<b>spect</b> 是什麼意思？',
        options: ['說', '看', '寫', '拉'], answer: 1, rule: 'root',
        why: 'inspect（檢查）、spectator（觀眾）都有「看」的意思。' },
      { type: 'rule-pick', section: '字根意思', prompt: '<b>dict</b> 是什麼意思？',
        options: ['說', '看', '寫', '走'], answer: 0, rule: 'root',
        why: 'predict（預先說＝預測）、dictionary（說的書＝字典）。' },
      { type: 'rule-pick', section: '推測生字', prompt: '<b>retrospect</b> 大概是什麼意思？',
        word: 'retrospect', options: ['往前看', '往回看（回顧）', '不看'],
        answer: 1, rule: 'root', why: 'retro（往回）+ spect（看）= 回顧。' },
      { type: 'rule-pick', section: '推測生字', prompt: '<b>inaudible</b> 大概是什麼意思？',
        word: 'inaudible', options: ['聽得見的', '聽不見的', '很大聲的'],
        answer: 1, rule: 'root', why: 'in（不）+ aud（聽）+ ible（可以）= 聽不見的。' },
      { type: 'read-aloud', section: '朗讀', item: w('transportation'), plain: true },
      { type: 'dictation', section: '聽寫', item: w('describe') }
    ],
    quiz: [
      { type: 'rule-pick', skill: 'morph', prompt: '<b>port</b> 是什麼意思？',
        options: ['攜帶', '建造', '丟'], answer: 0, rule: 'root' },
      { type: 'rule-pick', skill: 'morph', prompt: '<b>project</b> 的字面意思是？',
        word: 'project', options: ['往前丟', '往後拉', '往下看'], answer: 0, rule: 'root',
        why: 'pro（往前）+ ject（丟）。' },
      { type: 'rule-pick', skill: 'morph', prompt: '<b>biography</b> 的字面意思是？',
        word: 'biography', options: ['生命的圖畫', '生命的書寫（傳記）', '遠方的聲音'],
        answer: 1, rule: 'root', why: 'bio（生命）+ graph（寫）。' },
      { type: 'dictation', skill: 'spell', item: w('predict') },
      { type: 'read-aloud', skill: 'decode', item: w('photography'), plain: true },
      { type: 'read-aloud', skill: 'decode', item: w('construction'), plain: true }
    ],
    pass: { quiz: 0.8 },
    passText: '6 題答對 5 題。字根是可以持續累積的——每學一個，可讀字量就多幾十個。'
  });

  /* ---------------------------------------------------------------- L9-05 */
  Curriculum.register({
    id: 'L9-05', level: 9,
    title: 'Level 9 綜合驗收：學術長字實戰',
    sub: '拆解、朗讀、拼寫五音節以上的字',
    mins: 30,
    goal: '面對學術／專業長單字，能拆詞素、判斷重音、正確朗讀與拼寫。',
    rules: [
      { h: '長字處理 SOP（構詞版）',
        t: '1. 找字首（un-, re-, in-, trans-…）<br>' +
           '2. 找字尾（-tion, -ment, -able…）<br>' +
           '3. 剩下的就是字根<br>' +
           '4. 用 -tion / -ity 規律定重音<br>' +
           '5. 非重音節全部弱化成 schwa<br>' +
           '6. 拼寫不確定時，找詞族裡重音在那的字' }
    ],
    explain:
      '<p><b>你現在有兩套工具</b></p>' +
      '<p>· <b>音節切分</b>（Level 7）：處理沒有明顯詞素的字（rabbit, tiger）<br>' +
      '· <b>構詞拆解</b>（Level 9）：處理組合字（unhappiness, transportation）</p>' +
      '<p>遇到長字時先看有沒有認得的字首字尾。有 → 用構詞；沒有 → 用音節切分。</p>' +
      '<p>兩套都會，就沒有唸不出來的英文字了。</p>',
    trap: '這一課的字會很長。不要急，一個零件一個零件處理。' +
          '母語者遇到 antidisestablishmentarianism 也是這樣拆的。',
    res: ['tophonetics', 'youglish', 'etymonline'],
    ex: [
      { type: 'read-aloud', section: '長字朗讀', item: w('unbelievable'), plain: true,
        prompt: 'un + believe + able。重音在 LIEV。' },
      { type: 'read-aloud', section: '長字朗讀', item: w('responsibility'), plain: true,
        prompt: '-ity 前一節帶重音 → re-spon-si-BIL-i-ty。' },
      { type: 'read-aloud', section: '長字朗讀', item: w('international'), plain: true },
      { type: 'dictation', section: '聽寫', item: w('development') },
      { type: 'dictation', section: '聽寫', item: w('comfortable') },
      { type: 'sentence', section: '句子', text: WORDS.sentences.advanced[0] }
    ],
    quiz: [
      { type: 'read-aloud', skill: 'decode', item: w('representative'), plain: true },
      { type: 'read-aloud', skill: 'decode', item: w('characteristics'), plain: true },
      { type: 'dictation', skill: 'spell', item: w('government') },
      { type: 'dictation', skill: 'spell', item: w('agreement') },
      { type: 'rule-pick', skill: 'stress', prompt: '<b>possibility</b> 的重音在哪一節？',
        word: 'possibility', options: ['pos', 'si', 'bil', 'i'], answer: 2, rule: 'tion-stress',
        why: '-ity 前一節帶重音 → pos-si-BIL-i-ty。' },
      { type: 'sentence', skill: 'fluency', text: WORDS.sentences.advanced[1] },
      { type: 'sentence', skill: 'fluency', text: WORDS.sentences.advanced[3] }
    ],
    pass: { quiz: 0.75 },
    passText: '7 題答對 5 題以上算過 Level 9。接下來是總驗收——用完全沒看過的字證明你會了。'
  });
})();
