/* Level 0 — 初始診斷（實際流程在 diagnose.js，這裡只註冊一個項目給進度系統） */
(function () {
  'use strict';
  Curriculum.register({
    id: 'L0-01', level: 0,
    title: '初始能力診斷',
    sub: '五個區塊 · 約 40 題',
    mins: 30,
    goal: '量出你的音素辨識、字母音、解碼、聽寫、多音節五項能力，決定起點 Level。',
    external: true,     /* 由 VIEWS.diagnose 處理，不走一般課程播放器 */
    pass: { quiz: 0 },
    passText: '完成全部五個區塊即可，沒有及格分數——這是量尺不是考試。'
  });
})();
