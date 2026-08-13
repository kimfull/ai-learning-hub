/* ==========================================================================
   resources.js — 外部教材整合
   規則：不只給連結。每一筆都要說清楚「看哪一段、學什麼、花多久、之後做什麼」。
   ========================================================================== */
(function (global) {
  'use strict';

  /* type: video 影片 / audio 音訊 / read 閱讀 / play 互動 / tool 工具 */
  var R = [

    /* ===== 發音基礎（貫穿全程，Level 1 起就要用） ===== */
    {
      id:'sos', type:'tool', levels:[1,2,3,6], mins:10, core:true,
      title:'Sounds of Speech（愛荷華大學）',
      url:'https://soundsofspeech.uiowa.edu/main/english',
      what:'每個英語音素的「口腔剖面動畫」＋真人發音。中文母語者最需要的是「看見舌頭在哪」。',
      how:'點左側的 Consonants / Vowels 分類，找你正在學的音（例如 /θ/ 在 Fricatives）。播動畫 3 次，跟著做口型 5 次。',
      after:'回本站的「音素卡」做 10 題聽辨，錯的音再回來看一次動畫。',
      zhNote:'完全免費、無廣告。手機瀏覽器可用。'
    },
    {
      id:'rachel-cons', type:'video', levels:[1,3], mins:16, core:true,
      title:'Rachel\'s English — 美式子音 IPA 總覽',
      url:'https://www.youtube.com/watch?v=4cU9fqpCqBA',
      what:'24 個子音一次過，每個都有慢動作嘴型特寫。',
      how:'第一次完整看完（約 16 分）。第二次只看你的弱項音：/θ/ /ð/ /v/ /z/ /l/ /r/ /dʒ/，每段倒回跟讀 5 次。',
      after:'做本站 Level 1 的「有聲/無聲配對」測驗，目標 8/10。'
    },
    {
      id:'rachel-vowels', type:'video', levels:[2,4,5,6], mins:20, core:true,
      title:'Rachel\'s English — 母音與雙母音',
      url:'https://rachelsenglish.com/videos/sounds/vowels/',
      what:'每個母音一支獨立短片，含最小配對示範。',
      how:'不要一次看完。學到哪個母音才看哪一支：短 a 看 AA [æ]、短 e 看 EH [ɛ]、短 i 看 IH [ɪ]。每支 2–4 分鐘。',
      after:'跟著本站的最小配對練習（bad/bed、ship/sheep）做 20 題。'
    },
    {
      id:'rachel-yt', type:'video', levels:[1,2,3,4,5,6,7], mins:0,
      title:'Rachel\'s English YouTube 頻道',
      url:'https://www.youtube.com/@rachelsenglish',
      what:'成人向美式發音的主要來源，不是兒童教材，講解細緻。',
      how:'當作字典用：卡在哪個音，就在頻道內搜尋該音。',
      after:'—'
    },

    /* ===== 系統性 phonics 教學 ===== */
    {
      id:'readingbear', type:'play', levels:[1,2,3,4,5,6], mins:15, core:true,
      title:'Reading Bear — 50 組免費 phonics 互動教學',
      url:'https://www.readingbear.org/',
      what:'把每個拼讀模式做成「看字 → 聽拆音 → 聽合音 → 看圖懂意思」的完整流程，1200+ 單字。',
      how:'選 Presentations，依序做。學到 CVC 短 a 就做「Short A」那組，一組約 12–15 分鐘。播放模式選「Slow and complete」。',
      after:'關掉網站，回本站做同一組的聽寫測驗。能寫對 8/10 才算過。',
      zhNote:'免費、非營利、無廣告。需要網路。'
    },
    {
      id:'ufli-toolbox', type:'read', levels:[1,2,3,4,5,6,7,8], mins:20, core:true,
      title:'UFLI Foundations Toolbox（佛羅里達大學）',
      url:'https://ufli.education.ufl.edu/foundations/toolbox/',
      what:'目前 Science of Reading 界最主流的免費教材資源庫：字表、音素卡、拼讀順序表。',
      how:'先下載 Scope and Sequence（教學順序表），對照本站的 Level 表。之後每個 Level 到這裡抓對應的 Word Lists 當額外練習。',
      after:'把抓下來的字表當「假日加練」，每次 20 字唸出聲並錄音。',
      zhNote:'教材原本設計給小學生，但拼讀順序對成人一樣適用；忽略卡通插圖即可。'
    },
    {
      id:'starfall', type:'play', levels:[2,3,4], mins:10,
      title:'Starfall Learn to Read',
      url:'https://www.starfall.com/h/ltr-classic/',
      what:'CVC → 長母音 → digraph 的互動小遊戲，點字母就出聲。',
      how:'只做 Learn to Read 區的 Zac the Rat（短 a）到 Peg the Hen（短 e）。每個單元 8–10 分鐘。',
      after:'做完該單元，把裡面出現的字寫進本站「我的錯字本」再測一次。',
      zhNote:'畫面偏兒童，但點擊即發音的即時回饋對建立字母音直覺很有效。'
    },
    {
      id:'starfall-pdf', type:'read', levels:[2,3,4], mins:8,
      title:'Starfall 免費書本 PDF',
      url:'https://teach.starfall.com/books',
      what:'可下載列印的可解碼小書。',
      how:'每學完一個母音，抓對應的一本，出聲朗讀 3 遍並計時。',
      after:'第三遍要比第一遍快 20% 且零錯誤。'
    },

    /* ===== 可解碼閱讀材料 ===== */
    {
      id:'readinguniverse', type:'read', levels:[2,3,4,5,6,7], mins:10, core:true,
      title:'Reading Universe — 依拼讀技能分類的免費可解碼文章',
      url:'https://readinguniverse.org/article/explore-teaching-topics/word-recognition/phonics/decodable-texts-for-each-phonics-skill',
      what:'95+ 篇短文，每篇只用你「已經學過」的拼讀模式寫成——這是 phonics 學習的關鍵：讀的東西必須可解碼。',
      how:'找到和目前 Level 相符的技能標籤，選一篇。先默讀一次找出不會的字，再出聲讀第二次並錄音。',
      after:'把讀錯的字丟進本站「錯字本」，隔天複習時會自動出現。'
    },
    {
      id:'literacylearn', type:'read', levels:[2,3,4,5], mins:5,
      title:'Literacy Learn — 免費可解碼讀本總匯（15 個來源）',
      url:'https://literacylearn.com/free-decodable-readers/',
      what:'一次列出十幾個免費可解碼讀本網站的直達連結。',
      how:'當作備援書單。本站的閱讀材料做完了，來這裡找同等級的更多素材。',
      after:'—'
    },

    /* ===== 工具 ===== */
    {
      id:'youglish', type:'tool', levels:[3,4,5,6,7,8,9,10], mins:5, core:true,
      title:'YouGlish — 聽真人怎麼唸這個字',
      url:'https://youglish.com/',
      what:'輸入任何英文字，馬上聽到幾十段真實影片裡母語者唸這個字的片段。',
      how:'遇到不確定發音的字就查。連續聽 5 個不同人的版本，注意重音在哪一節。',
      after:'跟讀 3 次並錄音比對。'
    },
    {
      id:'tophonetics', type:'tool', levels:[6,7,8,9,10], mins:3,
      title:'toPhonetics — 英文轉 IPA 音標',
      url:'https://tophonetics.com/',
      what:'貼一段英文，自動轉成 IPA，可選美式或英式。',
      how:'學到多音節與 schwa 之後，把你唸不準的句子貼進去，看非重音節是不是都變成 /ə/。',
      after:'照 IPA 重唸一次，特別注意 schwa 的位置。'
    },
    {
      id:'cambridge', type:'tool', levels:[1,2,3,4,5,6,7,8,9,10], mins:2,
      title:'劍橋線上字典（含美式／英式發音）',
      url:'https://dictionary.cambridge.org/',
      what:'查字時同時看到 IPA 與兩種口音發音。',
      how:'查任何字都先看 IPA 再按喇叭，養成「看音標不看拼字」的習慣。',
      after:'—'
    },
    {
      id:'forvo', type:'tool', levels:[7,8,9,10], mins:3,
      title:'Forvo — 母語者發音資料庫',
      url:'https://forvo.com/languages/en/',
      what:'冷門字、人名、地名的真人發音。',
      how:'字典查不到的字來這裡。',
      after:'—'
    },

    /* ===== Podcast / 音訊 ===== */
    {
      id:'sor-podcast', type:'audio', levels:[0,10], mins:45,
      title:'Science of Reading: The Podcast',
      url:'https://amplify.com/science-of-reading-the-podcast/',
      what:'閱讀科學的研究者訪談。這是「理解學習原理」用，不是練發音用。',
      how:'選一集在通勤時聽。建議聽談 phonemic awareness 或 structured literacy 的集數。',
      after:'不用練習。理解為什麼「拆音」比「背單字」重要，你會更願意做枯燥的拆音練習。'
    },
    {
      id:'rachel-podcast', type:'audio', levels:[2,4,5,6], mins:20,
      title:'Rachel\'s English Podcast — 母音系列',
      url:'https://rachelsenglish.com/podcast/010-vowels-part-1/',
      what:'純音訊講母音差異，適合走路或通勤時「用耳朵練」。',
      how:'聽一集，中途暫停跟讀。',
      after:'回來做最小配對聽辨測驗。'
    },

    /* ===== 進階：構詞 ===== */
    {
      id:'etymonline', type:'tool', levels:[9], mins:5,
      title:'Etymonline — 英文字源字典',
      url:'https://www.etymonline.com/',
      what:'查字根來源。知道 spect 是「看」，就能一口氣拿下 inspect / respect / spectator。',
      how:'學到 Level 9 時，每個新字根查一次來源，記住那個「故事」。',
      after:'用該字根造 5 個字，唸出來並拆音節。'
    },
  ];

  global.RESOURCES = {
    list: R,
    forLevel: function (lv) {
      return R.filter(function (r) { return r.levels.indexOf(lv) !== -1; });
    },
    core: function () { return R.filter(function (r) { return r.core; }); },
    get: function (id) { return R.filter(function (r) { return r.id === id; })[0] || null; },
    TYPE_LABEL: {
      video: '影片', audio: '音訊', read: '閱讀', play: '互動練習', tool: '工具'
    },
    TYPE_ICON: {
      video: '▶️', audio: '🎧', read: '📖', play: '🕹️', tool: '🔧'
    }
  };
})(window);
