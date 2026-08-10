# English-Phonics — 專案說明

專為**中文母語成人**設計的英文自然拼讀（Phonics）互動課程網站。
目標是兩件事：**見字能讀**（看到陌生字能推出讀音）、**聽音能寫**（聽到字能拆音拼出來）。

---

## 怎麼打開

**方法一：直接開檔**
雙擊 `index.html` 即可。程式刻意用傳統 `<script>` 而非 ES modules，所以 `file://` 也能跑。

**方法二：本機伺服器**（建議，快取行為比較正常）

```bash
python -m http.server 8123 -d English-Phonics
```

然後開 <http://localhost:8123>。

專案根目錄已有 `.claude/launch.json`，Claude Code 可用 `preview_start` 直接啟動（設定名稱 `phonics`）。

---

## 技術決策

| 決策 | 原因 |
|---|---|
| 純靜態、零建置、零相依 | 要能離線用、能直接雙擊開啟、十年後還跑得動 |
| 傳統 `<script>` 而非 ES modules | `file://` 協定會擋 module 載入 |
| Web Speech API 做發音 | 免費、免 API key、多數裝置內建；沒有它就沒有聽辨與聽寫練習 |
| localStorage 存進度 | 不需要帳號、不上傳、不處理隱私問題 |
| 手機優先 | 使用情境是通勤、零碎時間；桌機只是加寬版面 |

**已知限制**：TTS 唸不出孤立的音素（例如純粹的 `/b/`）。解法是每個音素都帶一個關鍵字（keyword approach），播例字讓使用者聽出目標音——這也是實體 phonics 教學的標準做法。

---

## 檔案結構

```
English-Phonics/
├─ index.html              單頁應用外殼；script 帶 ?v= 版本戳記
├─ css/style.css           極簡無彩設計；母音暖色／子音冷色是「功能色」
├─ js/
│  ├─ speech.js            TTS 與語音辨識封裝
│  ├─ storage.js           進度、錯誤歸因、Leitner 熟練度
│  ├─ exercises.js         13 種題型 + 拼寫錯誤分析器
│  ├─ diagnose.js          Level 0 五區塊診斷與分級演算法
│  ├─ srs.js               間隔複習排程 + 交錯組題
│  ├─ app.js               路由與所有畫面
│  └─ data/
│     ├─ phonemes.js       44 音素，每個都標中文母語者的典型錯誤
│     ├─ words.js          單字庫，含 grapheme→phoneme 對應
│     ├─ resources.js      外部教材（含「看哪段、學什麼、花多久」）
│     ├─ curriculum.js     Level 0–10 架構、排課、補強建議
│     └─ lessons-l0..l10.js  55 課的完整內容
└─ docs/學習時間表.md      可列印的完整計畫
```

---

## 資料模型重點

### 音素（`phonemes.js`）

每個音素除了 IPA 和例字，都帶兩個關鍵欄位：

- `zh` — 怎麼做出這個音（口腔動作的中文說明）
- `trap` — 中文母語者的典型錯誤，例如「中文的 ㄅ 是不送氣清音不是濁音，所以 cab 會聽起來像 cap」

`hard: 3` 標記的是中文母語者的高難度音，診斷與補強會優先鎖定。

### 單字（`words.js`）

寫法 `W('cake', 'c:k a:ay k:k e:-')`，冒號左邊是字母、右邊是音素 id，`-` 表示不發音。
這個對應撐起三件事：視覺標色、blending 播放、Elkonin box 拆音。

### 課程（`lessons-*.js`）

每課一個物件，欄位對應使用者要求的 13 個區塊：

```js
{
  id, level, title, sub, mins,
  goal,        // 1. 本課目標
  rules: [],   // 2. 必懂規則
  explain,     // 3. 中文解說
  trap,        // 中文母語者專屬提醒
  demo: [],    // 4. 發音示範（phoneme-card）
  ex: [],      // 5–10. 聽辨／拼讀／拆音／聽寫／閱讀
  quiz: [],    // 11. 小測驗
  pass: {},    // 13. 判定標準（12. 錯誤分析由引擎自動產生）
  res: []      // 外部教材 id
}
```

新增課程：在對應的 `lessons-lN.js` 呼叫 `Curriculum.register({...})`，
再把 id 加進 `curriculum.js` 該 Level 的 `lessons` 陣列。

### 錯誤歸因（`exercises.js` 的 `analyzeSpelling`）

這是整套系統最有價值的部分。拼寫錯誤會被歸到六類之一：

| 類別 | 觸發條件範例 |
|---|---|
| `listening` 聽音辨識 | 清濁對調（cab→cap）、母音字母錯 |
| `phoneme` 音素切分 | 漏掉字尾子音、子音串漏字母 |
| `rule` 拼讀規則 | 少了或多了 silent e |
| `articulation` 發音動作 | 朗讀自評「差一點」 |
| `spelling` 拼寫規則 | 音對但選錯同音拼法（ai vs ay） |
| `memory` 記憶提取 | 句子朗讀卡頓 |

歸因結果進 `Store`，首頁的「針對你的補強」和進度頁的分析都由它驅動。

---

## 改東西要注意

**改過 `js/` 或 `css/` 之後，把 `index.html` 裡的 `?v=2` 全部加一。**
否則瀏覽器會用舊快取，你會以為改了沒效。

**驗證方式**：開瀏覽器 console 貼上驗證腳本（見 git 記錄或重寫），逐一渲染每種題型並自動跑完每一課，確認沒有卡點。曾經抓到的問題：

- 拆音題作答後「檢查」按鈕還亮著但按了沒反應 → 已修
- 裝置完全沒有語音時，`whenReady` 佇列永不執行導致練習卡死 → 已加 3 秒 fallback

---

## 課程設計依據

- **Structured Literacy / Science of Reading** — 明示、系統、由簡到繁
- **Orton-Gillingham** — 六種音節型態、母音子音色彩編碼
- **UFLI Foundations** — 教學順序參考（a → i → o → u → e，刻意把易混的 e/i 隔開）
- **Mastery learning** — 沒到標準不放行，到了就跳過
- **Spaced repetition（Leitner）** — 間隔 0/1/2/4/8/16/32 天，答錯退兩格
- **Interleaving** — 複習時刻意混題型，避免假流暢
- **Pseudoword assessment** — 大量假字測驗，排除記憶因素測真解碼力
