# AI 學習中心

專為**中文母語者**設計的互動式課程集合。純靜態網站，部署在 Cloudflare Workers。

**線上版本：<https://ai-learning-hub.kimfull.workers.dev>**

## 目前的課程

| 課程 | 內容 | 狀態 |
|---|---|---|
| [English Phonics 拼讀教室](English-Phonics/) | 英文自然拼讀，11 個 Level、56 課 | ✅ 可用 |

## 這些課的共同設計

- **診斷先於教學** — 先量出哪一層有洞，再決定從哪開始
- **錯了會歸因** — 判斷是聽力、規則、記憶還是動作出問題，給對應補強
- **間隔複習** — Leitner 盒子排程，答對往後排、答錯拉回來
- **用能力驗收** — 通過標準是「用沒看過的題目證明會了」，不是「上完所有課」

學習紀錄存在瀏覽器的 localStorage，不上傳、不需要帳號。

## 本機開發

```bash
python -m http.server 8123
```

開 <http://localhost:8123>。純靜態、零建置、零相依，直接雙擊 `index.html` 也能跑。

## 部署

Cloudflare Workers（assets-only，沒有後端程式碼）：

```bash
npx wrangler deploy
```

設定在 [wrangler.jsonc](wrangler.jsonc)，不上傳的檔案列在 [.assetsignore](.assetsignore)。

**改過 `js/` 或 `css/` 之後，記得把 HTML 裡的 `?v=` 版本戳記加一**，否則使用者的瀏覽器會用舊快取。

## 加一門新課

1. 開一個新資料夾，放該課程的 `index.html` 與資源
2. 在根目錄 [index.html](index.html) 的 `COURSES` 陣列加一筆
3. 需要顯示進度的話，提供 `progressKey`（localStorage 的 key）與 `readProgress()`

## 目錄結構

```
.
├─ index.html              學習中心首頁（課程列表）
├─ 404.html
├─ css/hub.css             首頁樣式
├─ English-Phonics/        拼讀課程（見該資料夾的 AGENTS.md）
├─ wrangler.jsonc          Cloudflare Workers 設定
└─ .assetsignore           不上傳到 CDN 的檔案
```
