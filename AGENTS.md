# AI 學習中心 — 專案規範

中文母語者取向的互動式課程集合。純靜態網站，沒有後端、沒有建置流程。

## 發布分支與流程

**`main` 是發布分支。** 推上 `main` 之後，用 wrangler 部署到 Cloudflare Workers：

```bash
npx wrangler deploy
```

沒有測試環境與正式環境之分——這是靜態教材網站，`main` 就是線上版本。
所以推之前請先在本機確認過（見下方「本機驗證」）。

## 本機開發

```bash
python -m http.server 8123
```

開 <http://localhost:8123>。零建置、零相依。直接雙擊 `index.html` 也能跑
（程式刻意用傳統 `<script>` 而非 ES modules，就是為了讓 `file://` 也能用）。

## 本機驗證（改完一定要跑）

課程頁的互動很多，靠肉眼看不出壞掉。開瀏覽器 console 貼上自動化腳本，
逐一渲染每種題型、自動跑完每一課，確認沒有卡點。曾經抓到的問題：

- 拆音題作答後「檢查」按鈕還亮著但按了沒反應
- 裝置完全沒有語音時，語音佇列永不執行，練習卡在「聽答案」

## 快取戳記（最容易忘的一件事）

**改過任何 `js/` 或 `css/` 檔案，就要把引用它的 HTML 裡的 `?v=` 數字加一。**

- 根目錄 `index.html` → `css/hub.css?v=N`
- `English-Phonics/index.html` → 全部 21 個 script 與 1 個 css 的 `?v=N`

沒改版本號的話，使用者的瀏覽器會繼續用舊快取，你會以為改了沒生效。

## 加一門新課

1. 開一個新資料夾（例如 `Japanese-Kana/`），放該課程的 `index.html` 與資源
2. 在根目錄 `index.html` 的 `COURSES` 陣列加一筆
3. 要在首頁顯示進度的話，提供 `progressKey`（該課用的 localStorage key）
   與 `readProgress(state)`，回傳 `{started, pct, label}`
4. 該課程資料夾自己放一份 `AGENTS.md` 說明內部結構

## 不要上傳的東西

`.assetsignore` 控制哪些檔案不會送到 Cloudflare CDN（`.md`、`docs/`、設定檔）。
`.gitignore` 控制哪些不進版控（`node_modules/`、`.wrangler/`、個人的 `settings.local.json`）。

## 隱私

所有學習紀錄存在使用者瀏覽器的 localStorage，不上傳、不需要帳號、沒有後端。
**不要為了加功能而引入需要送出使用者資料的服務**——這是這個專案的設計前提。

## 各課程的詳細說明

- [English-Phonics/AGENTS.md](English-Phonics/AGENTS.md) — 拼讀課程的資料模型、題型、錯誤歸因邏輯
