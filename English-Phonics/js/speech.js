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

  /* ---------- 預錄音檔 ----------
     為什麼需要：Web Speech API 依賴使用者裝置「剛好裝了英語語音包」。
     純繁中系統的手機可能完全沒有英語語音，這時瀏覽器會靜音，
     或更糟——用中文語音去唸英文。學拼讀的人聽到那種發音等於學錯。
     所以核心字詞全部預先錄好放進網站，TTS 只當備援。 */

  var audioIndex = null;    // 小寫單字 -> true
  var current = null;       // 目前正在播的 Audio，切題時要停掉

  function buildIndex() {
    if (audioIndex || !global.AUDIO) return;
    audioIndex = {};
    (global.AUDIO.words || []).forEach(function (w) { audioIndex[w.toLowerCase()] = true; });
  }

  /** 查這段文字有沒有預錄音檔，有的話回傳網址 */
  function fileFor(text) {
    if (!global.AUDIO) return null;
    buildIndex();
    var t = String(text == null ? '' : text).trim();
    if (!t) return null;

    var S = global.AUDIO.sentences || {};
    if (S[t]) return global.AUDIO.base + 's/' + S[t] + '.mp3';

    var w = t.toLowerCase();
    if (audioIndex[w]) return global.AUDIO.base + 'w/' + w.replace(/[^a-z0-9]/g, '') + '.mp3';
    return null;
  }

  function fileForPhoneme(id) {
    if (!global.AUDIO || !id) return null;
    var list = global.AUDIO.phonemes || [];
    return list.indexOf(id) !== -1 ? global.AUDIO.base + 'p/' + id + '.mp3' : null;
  }

  /**
   * 播預錄音檔。播完 resolve(true)；檔案不存在或播不出來 resolve(false)，
   * 由呼叫端決定要不要退回 TTS。
   */
  function playFile(url, rate) {
    return new Promise(function (resolve) {
      /* 換題或連續點擊時，先把上一段停掉，不然會兩個聲音疊在一起 */
      stopFile();
      if (synth) { try { synth.cancel(); } catch (e) {} }
      var a;
      try { a = new Audio(url); } catch (e) { resolve(false); return; }
      current = a;
      /* 慢速時保持原音高，不然會變成卡通聲 */
      a.preservesPitch = true;
      a.mozPreservesPitch = true;
      a.webkitPreservesPitch = true;
      a.playbackRate = Math.min(2, Math.max(0.5, rate || 1));
      var settled = false;
      function done(ok) {
        if (settled) return;
        settled = true;
        if (current === a) current = null;
        resolve(ok);
      }
      a.onended = function () { done(true); };
      a.onerror = function () { done(false); };
      var p = a.play();
      if (p && p.catch) p.catch(function () { done(false); });
      /* 安全網：某些瀏覽器在背景分頁不會觸發 onended */
      setTimeout(function () { done(true); }, 12000);
    });
  }

  function stopFile() {
    if (current) {
      try { current.pause(); current.onended = current.onerror = null; } catch (e) {}
      current = null;
    }
  }

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

    stop: function () {
      stopFile();
      if (synth) { try { synth.cancel(); } catch (e) {} }
    },

    /** 這段文字有沒有預錄音檔（UI 想標示「已錄音」時可用） */
    hasFile: function (text) { return !!fileFor(text); },

    /**
     * 唸一個英文單字或句子。
     * 優先播預錄音檔；檔案不存在或播放失敗，才退回瀏覽器即時合成。
     */
    word: function (w, opts) {
      opts = opts || {};
      var url = fileFor(w);
      if (!url) return say(w, opts);
      /* 錄音時 SAPI 已經設成稍慢（Rate=-1，約等於 0.9 倍速），
         所以這裡把使用者設定的語速換算成相對倍率 */
      var rate = (opts.rate != null ? opts.rate : Speech.rate) / 0.9;
      return playFile(url, rate).then(function (ok) { return ok ? true : say(w, opts); });
    },

    /** 慢速唸（示範口型與拆音用） */
    slow: function (w) {
      var url = fileFor(w);
      var ttsRate = Math.max(0.45, Speech.rate - 0.35);
      if (!url) return say(w, { rate: ttsRate });
      return playFile(url, 0.65).then(function (ok) {
        return ok ? true : say(w, { rate: ttsRate });
      });
    },

    /**
     * 唸單一音素。傳入 phonemes.js 的音素物件，或直接給一段近似拼法。
     * 注意音素物件要用 iso（孤立音的近似拼法，例如 /b/ → "buh"），
     * 不能用 sym——那是 IPA 符號，唸出來會變成「斜線 b 斜線」。
     */
    phoneme: function (p) {
      var isObj = p && typeof p === 'object';
      var url = isObj ? fileForPhoneme(p.id) : null;
      var text = isObj ? (p.iso || p.key || '') : String(p || '');
      var ttsRate = 0.6;
      if (!url) return text ? say(text, { rate: ttsRate }) : Promise.resolve(false);
      return playFile(url, 0.9).then(function (ok) {
        return ok ? true : (text ? say(text, { rate: ttsRate }) : false);
      });
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
