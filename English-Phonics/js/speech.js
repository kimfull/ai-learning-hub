/* ==========================================================================
   speech.js — 發音引擎
   用瀏覽器內建的 Web Speech API，不需網路、不需 API key。
   難點：TTS 無法直接唸「單一音素」（例如 /b/），所以每個音素在 phonemes.js
   都帶一個 tts 欄位（可延長的近似拼法，如 "buh"、"sss"），這裡負責調速播放。
   ========================================================================== */
(function (global) {
  'use strict';

  var synth = global.speechSynthesis || null;
  var voices = [];
  var chosen = null;
  var ready = false;
  var queue = [];

  /* 偏好的英語語音（依序），Windows / Mac / Android / iOS 常見值 */
  var PREFERRED = [
    'Microsoft Aria', 'Microsoft Ava', 'Microsoft Jenny', 'Microsoft Emma',
    'Microsoft Zira', 'Microsoft David', 'Microsoft Mark',
    'Samantha', 'Alex', 'Ava', 'Allison', 'Karen', 'Daniel',
    'Google US English', 'Google UK English Female',
    'en-US-language', 'English United States'
  ];

  function loadVoices() {
    if (!synth) return;
    voices = synth.getVoices() || [];
    if (!voices.length) return;

    var en = voices.filter(function (v) { return /^en(-|_)/i.test(v.lang || ''); });
    var pool = en.length ? en : voices;

    /* 1. 使用者手動指定 */
    var saved = null;
    try { saved = localStorage.getItem('phonics.voice'); } catch (e) {}
    if (saved) {
      chosen = pool.filter(function (v) { return v.name === saved; })[0] || null;
    }
    /* 2. 偏好清單 */
    if (!chosen) {
      for (var i = 0; i < PREFERRED.length && !chosen; i++) {
        for (var j = 0; j < pool.length; j++) {
          if (pool[j].name.indexOf(PREFERRED[i]) !== -1) { chosen = pool[j]; break; }
        }
      }
    }
    /* 3. 任一 en-US */
    if (!chosen) chosen = pool.filter(function (v) { return /en(-|_)US/i.test(v.lang); })[0] || pool[0];

    ready = true;
    while (queue.length) queue.shift()();
  }

  if (synth) {
    loadVoices();
    if (synth.addEventListener) synth.addEventListener('voiceschanged', loadVoices);
    else synth.onvoiceschanged = loadVoices;
    /* 某些瀏覽器要延遲才拿得到清單 */
    setTimeout(loadVoices, 250);
    setTimeout(loadVoices, 1200);
    /* 保險：有些系統（部分 Linux / Android WebView）永遠拿不到語音清單。
       3 秒後強制放行，否則等待中的 Promise 不會 resolve，練習會卡在「聽答案」那一步。 */
    setTimeout(function () {
      if (ready) return;
      ready = true;
      while (queue.length) queue.shift()();
    }, 3000);
  }

  function whenReady(fn) { ready ? fn() : queue.push(fn); }

  /** 核心播放；回傳 Promise，播完才 resolve */
  function say(text, opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      if (!synth || !text) { resolve(false); return; }
      whenReady(function () {
        try { synth.cancel(); } catch (e) {}
        var u = new SpeechSynthesisUtterance(String(text));
        if (chosen) { u.voice = chosen; u.lang = chosen.lang; }
        else u.lang = 'en-US';
        u.rate   = opts.rate   != null ? opts.rate   : Speech.rate;
        u.pitch  = opts.pitch  != null ? opts.pitch  : 1;
        u.volume = opts.volume != null ? opts.volume : 1;
        var done = false;
        function finish() { if (!done) { done = true; resolve(true); } }
        u.onend = finish;
        u.onerror = finish;
        /* 安全網：部分瀏覽器 onend 不觸發 */
        setTimeout(finish, 400 + String(text).length * 130 / (u.rate || 1));
        synth.speak(u);
      });
    });
  }

  function pause(ms) {
    return new Promise(function (r) { setTimeout(r, ms); });
  }

  var Speech = {
    rate: 0.9,              /* 全域語速，設定頁可調 */

    get available() { return !!synth; },
    get voiceName() { return chosen ? chosen.name : '（尚未載入）'; },
    listVoices: function () {
      return voices.filter(function (v) { return /^en(-|_)/i.test(v.lang || ''); });
    },
    setVoice: function (name) {
      var v = voices.filter(function (x) { return x.name === name; })[0];
      if (v) { chosen = v; try { localStorage.setItem('phonics.voice', name); } catch (e) {} }
    },
    setRate: function (r) {
      Speech.rate = r;
      try { localStorage.setItem('phonics.rate', String(r)); } catch (e) {}
    },

    stop: function () { if (synth) { try { synth.cancel(); } catch (e) {} } },

    /** 唸一個英文單字或句子 */
    word: function (w, opts) { return say(w, opts); },

    /** 慢速唸（用於示範口型與拆音） */
    slow: function (w) { return say(w, { rate: Math.max(0.45, Speech.rate - 0.35) }); },

    /**
     * 唸單一音素。傳入 phonemes.js 的音素物件或 tts 字串。
     * 子音會刻意壓低音量尾巴，避免加上多餘的 "uh"（schwa）——
     * 這是中文母語者最常見的發音錯誤來源（把 /b/ 唸成「不」）。
     */
    phoneme: function (p) {
      var t = typeof p === 'string' ? p : (p && (p.tts || p.sym)) || '';
      var rate = (p && p.ttsRate) || 0.55;
      return say(t, { rate: rate });
    },

    /** 逐字母拼讀（字母名稱，不是字母音） */
    spell: function (w) {
      return say(String(w).split('').join(', '), { rate: 0.75 });
    },

    /**
     * blending 示範：先逐個音素、再整個字。
     * parts = [phonemeObj|string, ...]
     */
    blend: function (parts, wordText, gap) {
      gap = gap == null ? 260 : gap;
      var chain = Promise.resolve();
      parts.forEach(function (p) {
        chain = chain.then(function () { return Speech.phoneme(p); })
                     .then(function () { return pause(gap); });
      });
      if (wordText) {
        chain = chain.then(function () { return pause(180); })
                     .then(function () { return Speech.slow(wordText); })
                     .then(function () { return pause(140); })
                     .then(function () { return Speech.word(wordText); });
      }
      return chain;
    },

    /** 連續唸一串單字（測驗聽寫用） */
    sequence: function (items, gap) {
      gap = gap == null ? 700 : gap;
      var chain = Promise.resolve();
      items.forEach(function (it) {
        chain = chain.then(function () { return Speech.word(it); })
                     .then(function () { return pause(gap); });
      });
      return chain;
    },

    pause: pause
  };

  try {
    var r = parseFloat(localStorage.getItem('phonics.rate'));
    if (r >= 0.4 && r <= 1.4) Speech.rate = r;
  } catch (e) {}

  /* ---------- 語音辨識（朗讀評測，Chrome / Edge 支援） ---------- */
  var SR = global.SpeechRecognition || global.webkitSpeechRecognition || null;

  Speech.listenAvailable = !!SR;

  /**
   * 聽使用者唸一個字，回傳 {ok, heard, alts}
   * 只做「輔助」用途——辨識不到不代表唸錯，UI 會註明。
   */
  Speech.listen = function (timeoutMs) {
    return new Promise(function (resolve) {
      if (!SR) { resolve({ ok: false, heard: '', alts: [], unsupported: true }); return; }
      var rec = new SR();
      rec.lang = 'en-US';
      rec.interimResults = false;
      rec.maxAlternatives = 5;
      var done = false;
      function finish(res) { if (!done) { done = true; try { rec.stop(); } catch (e) {} resolve(res); } }
      rec.onresult = function (ev) {
        var alts = [];
        var r0 = ev.results[0];
        for (var i = 0; i < r0.length; i++) alts.push(String(r0[i].transcript).trim().toLowerCase());
        finish({ ok: true, heard: alts[0] || '', alts: alts });
      };
      rec.onerror = function (e) { finish({ ok: false, heard: '', alts: [], error: e.error }); };
      rec.onend = function () { finish({ ok: false, heard: '', alts: [] }); };
      try { rec.start(); } catch (e) { finish({ ok: false, heard: '', alts: [], error: 'start' }); }
      setTimeout(function () { finish({ ok: false, heard: '', alts: [], error: 'timeout' }); }, timeoutMs || 6000);
    });
  };

  global.Speech = Speech;
})(window);
