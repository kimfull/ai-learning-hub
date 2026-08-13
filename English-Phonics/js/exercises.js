/* ==========================================================================
   exercises.js — 練習題引擎
   支援 12 種題型，每題作答後都會做「錯誤歸因」：
   到底是聽音、音素切分、拼讀規則、發音動作、拼寫規則，還是記憶出問題。
   歸因結果進 Store，首頁與補強頁會據此排下一步。
   ========================================================================== */
(function (global) {
  'use strict';

  var $ = function (h) { var d = document.createElement('div'); d.innerHTML = h; return d.firstElementChild; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------- 錯誤歸因：拼寫分析器 ----------
     中文母語者的拼寫錯誤有固定模式，逐條比對才能給對症的補強。 */

  var VOICE_PAIRS = { b:'p', p:'b', d:'t', t:'d', g:'k', k:'g', v:'f', f:'v', z:'s', s:'z' };
  var VOWEL_LETTERS = 'aeiouy';
  var CONFUSABLE_VOWEL_SPELLINGS = [
    ['ai','ay','a_e','a'], ['ee','ea','e_e','e','ie'], ['oa','ow','o_e','o'],
    ['oo','ew','ue','ui','u_e'], ['igh','ie','y','i_e','i'],
    ['er','ir','ur'], ['oi','oy'], ['ou','ow'], ['au','aw']
  ];

  function stripAll(s) { return String(s || '').toLowerCase().replace(/[^a-z]/g, ''); }

  function sameVowelFamily(a, b) {
    for (var i = 0; i < CONFUSABLE_VOWEL_SPELLINGS.length; i++) {
      var f = CONFUSABLE_VOWEL_SPELLINGS[i];
      if (f.indexOf(a) !== -1 && f.indexOf(b) !== -1) return true;
    }
    return false;
  }

  /**
   * 分析一次拼寫錯誤，回傳 {cause, detail}
   * @param {string} ans  使用者寫的
   * @param {string} corr 正確答案
   * @param {object} item words.js 的字物件（可能沒有）
   */
  function analyzeSpelling(ans, corr, item) {
    var a = stripAll(ans), c = stripAll(corr);
    if (a === c) return null;

    /* 1. 長度短一截，且缺的是最後一個子音 → 尾音沒聽到／沒發出來 */
    if (c.length - a.length >= 1 && c.indexOf(a) === 0) {
      var missing = c.slice(a.length);
      if (VOWEL_LETTERS.indexOf(missing[0]) === -1) {
        return { cause: 'phoneme',
          detail: '你少寫了字尾的「' + missing + '」。中文的音節幾乎不以子音結尾，所以耳朵容易把英文的尾子音濾掉。' +
                  '練習時把手放喉嚨，刻意把最後一個音做出來。' };
      }
    }

    /* 2. 只差 silent e */
    if (c === a + 'e') {
      return { cause: 'rule',
        detail: '少了字尾的 silent e。這個 e 不出聲，但它讓前面的母音唸「字母名稱」。' };
    }
    if (a === c + 'e') {
      return { cause: 'rule', detail: '多加了 silent e。這個字的母音是短音，不該加 e。' };
    }

    /* 3. 只差一個字母 → 看是哪一類 */
    if (a.length === c.length) {
      var diffs = [];
      for (var i = 0; i < c.length; i++) if (a[i] !== c[i]) diffs.push({ i: i, a: a[i], c: c[i] });

      if (diffs.length === 1) {
        var d = diffs[0];
        /* 3a. 清濁對調 → 這是中文母語者的招牌錯誤 */
        if (VOICE_PAIRS[d.c] === d.a) {
          return { cause: 'listening',
            detail: '你把「' + d.c + '」寫成「' + d.a + '」——這兩個音嘴型完全一樣，差別只在聲帶有沒有振動。' +
                    '中文沒有「清濁」對立（ㄅ和ㄆ差在送氣，不是振動），所以你的耳朵預設分不出來。' +
                    '摸著喉嚨唸 ' + d.c + ' 和 ' + d.a + '，感覺震動差別。' };
        }
        /* 3b. 母音字母錯 */
        if (VOWEL_LETTERS.indexOf(d.c) !== -1 && VOWEL_LETTERS.indexOf(d.a) !== -1) {
          return { cause: 'listening',
            detail: '母音寫錯了（' + d.c + ' → ' + d.a + '）。短母音 /æ/ /ɛ/ /ɪ/ /ʌ/ 在中文裡沒有對應，' +
                    '你的耳朵目前把它們歸成同一類。去做最小配對聽辨。' };
        }
        /* 3c. 子音字母錯（非清濁） */
        return { cause: 'phoneme',
          detail: '子音寫錯了（' + d.c + ' → ' + d.a + '）。先確認你聽到的是哪個音，再想它怎麼拼。' };
      }
    }

    /* 4. 母音組合換成同家族的另一種拼法 → 純粹拼寫規則問題，音是對的 */
    var av = a.replace(/[^aeiouy]/g, ''), cv = c.replace(/[^aeiouy]/g, '');
    var ac = a.replace(/[aeiouy]/g, ''), cc = c.replace(/[aeiouy]/g, '');
    if (ac === cc && av !== cv) {
      if (sameVowelFamily(av, cv)) {
        return { cause: 'spelling',
          detail: '音你聽對了，但選錯拼法（' + cv + ' vs ' + av + '）。同一個音有好幾種拼法，' +
                  '要靠「這個音在字的哪個位置」的規律來選——這是 Level 8 的重點。' };
      }
      return { cause: 'listening', detail: '子音都對，母音錯了。問題出在母音辨識，不是拼字。' };
    }

    /* 5. 子音群漏字母 */
    if (cc.length > ac.length && cv === av) {
      return { cause: 'phoneme',
        detail: '子音串漏了字母。英文可以連續好幾個子音（str-、-mpt），中文不行，' +
                '所以你的耳朵會自動簡化。慢速逐音聽一次。' };
    }

    /* 6. 其他 */
    return { cause: 'phoneme',
      detail: '拼出來的字和目標差距較大。先把單字慢速聽 2 次、用手指數出有幾個音，再寫一次。' };
  }

  /* ---------- 共用 UI 元件 ---------- */

  function speakerBtn(text, label, opts) {
    var b = document.createElement('button');
    b.className = 'spk' + (opts && opts.big ? ' spk--big' : '');
    b.type = 'button';
    b.innerHTML = '🔊' + (label ? '<span class="spk__lbl">' + esc(label) + '</span>' : '');
    b.setAttribute('aria-label', '播放發音');
    b.onclick = function () {
      b.classList.add('is-playing');
      var p = (opts && opts.slow) ? global.Speech.slow(text) : global.Speech.word(text);
      p.then(function () { b.classList.remove('is-playing'); });
    };
    return b;
  }

  function feedback(ok, title, html) {
    return $('<div class="fb fb--' + (ok ? 'ok' : 'bad') + '">' +
      '<div class="fb__t">' + (ok ? '✅ ' : '❌ ') + esc(title) + '</div>' +
      (html ? '<div class="small">' + html + '</div>' : '') + '</div>');
  }

  /* ---------- 題型實作 ----------
     每個 renderer 收 (host, q, done)；done(result) 回報結果。
     result = {correct:bool, cause:string|null, detail:string}
  */

  var TYPES = {};

  /* 1. listen-pick：播一個字/音，從選項中選出來 */
  TYPES['listen-pick'] = function (host, q, done) {
    var answered = false;
    host.appendChild($('<p class="lede">' + esc(q.prompt || '聽一次，選出你聽到的') + '</p>'));

    var row = $('<div class="center" style="margin:18px 0"></div>');
    row.appendChild(speakerBtn(q.play, null, { big: true }));
    host.appendChild(row);

    var slow = $('<div class="center" style="margin-bottom:8px"></div>');
    var sb = document.createElement('button');
    sb.className = 'btn btn--sm btn--ghost'; sb.textContent = '🐢 慢速再聽';
    sb.onclick = function () { global.Speech.slow(q.play); };
    slow.appendChild(sb);
    host.appendChild(slow);

    var opts = $('<div class="opts opts--2"></div>');
    global.Words.shuffle(q.options).forEach(function (o) {
      var b = document.createElement('button');
      b.className = 'opt';
      b.innerHTML = esc(o);
      b.onclick = function () {
        if (answered) return; answered = true;
        var ok = o === q.answer;
        b.classList.add(ok ? 'is-right' : 'is-wrong');
        Array.prototype.forEach.call(opts.children, function (x) {
          if (x !== b && x.textContent === q.answer) x.classList.add('is-right');
          else if (x !== b) x.classList.add('is-dim');
        });
        var cause = ok ? null : (q.cause || 'listening');
        host.appendChild(feedback(ok, ok ? '答對' : '答錯，正確是 ' + q.answer,
          ok ? (q.okNote || '') : (q.note || '這兩個選項的差別在「' + (q.diff || '母音') + '」。回去聽慢速版，注意嘴型。')));
        done({ correct: ok, cause: cause, detail: q.note || '' });
      };
      opts.appendChild(b);
    });
    host.appendChild(opts);
  };

  /* 2. minimal-pair：最小配對，聽 A 還是 B */
  TYPES['minimal-pair'] = function (host, q, done) {
    var pick = Math.random() < 0.5 ? q.a : q.b;
    var answered = false;
    host.appendChild($('<p class="lede">聽一次，我唸的是哪一個？（' + esc(q.zh || '') + '）</p>'));

    var row = $('<div class="center" style="margin:18px 0"></div>');
    row.appendChild(speakerBtn(pick, null, { big: true }));
    host.appendChild(row);

    var opts = $('<div class="opts opts--2"></div>');
    [q.a, q.b].forEach(function (w) {
      var b = document.createElement('button');
      b.className = 'opt'; b.textContent = w;
      b.onclick = function () {
        if (answered) return; answered = true;
        var ok = w === pick;
        b.classList.add(ok ? 'is-right' : 'is-wrong');
        var pa = global.PHONEMES.get(q.pa), pb = global.PHONEMES.get(q.pb);
        var wrongPh = (w === q.a) ? pa : pb;
        host.appendChild(feedback(ok, ok ? '答對，是 ' + pick : '答錯，是 ' + pick,
          ok ? '' :
          '<b>' + esc(pa.sym) + '</b>（' + esc(pa.key) + '）vs <b>' + esc(pb.sym) + '</b>（' + esc(pb.key) + '）<br>' +
          esc(wrongPh.zh) + '<br><span class="muted">' + esc(wrongPh.trap) + '</span>'));
        var cmp = $('<div class="btn-row" style="margin-top:8px"></div>');
        [q.a, q.b].forEach(function (x) {
          var s = document.createElement('button');
          s.className = 'btn btn--sm'; s.textContent = '🔊 ' + x;
          s.onclick = function () { global.Speech.slow(x); };
          cmp.appendChild(s);
        });
        host.appendChild(cmp);
        done({ correct: ok, cause: ok ? null : 'listening',
               phoneme: ok ? null : (pick === q.a ? pa.sym : pb.sym),
               key: 'phoneme:' + (pick === q.a ? q.pa : q.pb) });
      };
      opts.appendChild(b);
    });
    host.appendChild(opts);
  };

  /* 3. count：這個字有幾個音素（不是幾個字母！） */
  TYPES['count'] = function (host, q, done) {
    var answered = false;
    var n = q.answer != null ? q.answer : q.item.ph.length;
    host.appendChild($('<p class="lede">聽這個字，它有<b>幾個音</b>？（注意：問的是「音」不是「字母」）</p>'));

    var row = $('<div class="center" style="margin:16px 0"></div>');
    row.appendChild(speakerBtn(q.item.w, null, { big: true }));
    host.appendChild(row);

    var opts = $('<div class="opts opts--3"></div>');
    [2, 3, 4, 5].forEach(function (v) {
      var b = document.createElement('button');
      b.className = 'opt'; b.textContent = v;
      b.onclick = function () {
        if (answered) return; answered = true;
        var ok = v === n;
        b.classList.add(ok ? 'is-right' : 'is-wrong');
        var tiles = renderTiles(q.item, true);
        host.appendChild(feedback(ok, ok ? '答對，' + n + ' 個音' : '答錯，是 ' + n + ' 個音',
          ok ? '' : '注意 <b>' + esc(q.item.w) + '</b> 有 ' + q.item.w.length + ' 個字母、但只有 ' + n + ' 個音。'));
        host.appendChild(tiles);
        done({ correct: ok, cause: ok ? null : 'phoneme', word: q.item.w, key: 'skill:count' });
      };
      opts.appendChild(b);
    });
    host.appendChild(opts);
  };

  /* 音素磚 */
  function renderTiles(item, playable) {
    var box = $('<div class="tiles"></div>');
    item.parts.forEach(function (pt) {
      var ph = pt.p ? global.PHONEMES.get(pt.p.split('+')[0]) : null;
      var cls = !pt.p ? 'tile tile--s' : (ph && ph.type === 'v' ? 'tile tile--v' : 'tile tile--c');
      var t = document.createElement('button');
      t.className = cls; t.type = 'button';
      t.innerHTML = esc(pt.g) + '<small>' + (ph ? esc(ph.sym) : '不發音') + '</small>';
      if (playable && ph) t.onclick = function () { global.Speech.phoneme(ph); };
      box.appendChild(t);
    });
    return box;
  }

  /* 4. segment：Elkonin box，聽字然後點出有幾個音、依序說出 */
  TYPES['segment'] = function (host, q, done) {
    var item = q.item;
    var target = item.ph.length;
    var filled = 0, answered = false;

    host.appendChild($('<p class="lede">聽這個字，然後<b>一格一格</b>把音敲出來。有幾個音就敲幾格。</p>'));
    var row = $('<div class="center" style="margin:14px 0"></div>');
    row.appendChild(speakerBtn(item.w, null, { big: true }));
    host.appendChild(row);

    var boxes = $('<div class="boxes"></div>');
    for (var i = 0; i < 5; i++) {
      var b = document.createElement('div');
      b.className = 'box'; b.dataset.i = i;
      boxes.appendChild(b);
    }
    host.appendChild(boxes);

    var tapRow = $('<div class="btn-row"></div>');
    var tap = document.createElement('button');
    tap.className = 'btn btn--primary'; tap.textContent = '👆 敲一個音';
    var undo = document.createElement('button');
    undo.className = 'btn btn--ghost btn--sm'; undo.textContent = '↩︎ 退一格';
    var chk = document.createElement('button');
    chk.className = 'btn'; chk.textContent = '✓ 檢查';
    tapRow.appendChild(tap); tapRow.appendChild(undo); tapRow.appendChild(chk);
    host.appendChild(tapRow);

    tap.onclick = function () {
      if (answered || filled >= 5) return;
      boxes.children[filled].classList.add('is-filled');
      boxes.children[filled].textContent = '●';
      filled++;
    };
    undo.onclick = function () {
      if (answered || filled <= 0) return;
      filled--;
      boxes.children[filled].classList.remove('is-filled');
      boxes.children[filled].textContent = '';
    };
    chk.onclick = function () {
      if (answered) return; answered = true;
      /* 作答後把作答用的按鈕關掉，否則按鈕還亮著卻沒反應 */
      tap.disabled = undo.disabled = chk.disabled = true;
      var ok = filled === target;
      host.appendChild(feedback(ok, ok ? '答對，' + target + ' 個音' : '應該是 ' + target + ' 個音，你敲了 ' + filled,
        ok ? '' : '把速度放到最慢，一個音一個音聽。字母數 ≠ 音數。'));
      /* 揭曉：一格一音，可點播 */
      var reveal = $('<div class="boxes"></div>');
      item.parts.filter(function (p) { return p.p; }).forEach(function (pt) {
        var ph = global.PHONEMES.get(pt.p.split('+')[0]);
        var d = document.createElement('button');
        d.className = 'box is-filled';
        d.style.cursor = 'pointer';
        d.textContent = ph ? ph.ph.split(' ')[0] : pt.g;
        d.onclick = function () { if (ph) global.Speech.phoneme(ph); };
        reveal.appendChild(d);
      });
      host.appendChild(reveal);
      host.appendChild(renderTiles(item, true));
      done({ correct: ok, cause: ok ? null : 'phoneme', word: item.w, key: 'skill:segment' });
    };
  };

  /* 5. blend：看音素磚，自己拼出來，再對答案 */
  TYPES['blend'] = function (host, q, done) {
    var item = q.item, answered = false;
    host.appendChild($('<p class="lede">看下面的音塊，<b>先自己唸出聲</b>，再按「聽答案」對照。</p>'));
    host.appendChild(renderTiles(item, true));

    var seq = $('<div class="btn-row" style="margin:12px 0"></div>');
    var play = document.createElement('button');
    play.className = 'btn btn--ghost'; play.textContent = '🔉 逐音播放';
    play.onclick = function () { global.Speech.blend(global.Words.phonemesOf(item), null, 320); };
    var ans = document.createElement('button');
    ans.className = 'btn btn--primary'; ans.textContent = '🔊 聽答案';
    seq.appendChild(play); seq.appendChild(ans);
    host.appendChild(seq);

    ans.onclick = function () {
      if (answered) return; answered = true;
      ans.disabled = true;   /* 逐音播放留著可重聽，揭曉只做一次 */
      host.appendChild($('<div class="wordbig">' + global.Words.colorize(item) + '</div>'));
      if (item.note) host.appendChild($('<p class="small muted center">' + esc(item.note) + '</p>'));
      global.Speech.blend(global.Words.phonemesOf(item), item.w, 300);

      var q2 = $('<div class="fb fb--warn"><div class="fb__t">你唸對了嗎？</div>' +
                 '<div class="small">誠實回答——這決定系統要不要再排一次給你。</div></div>');
      host.appendChild(q2);
      var row = $('<div class="btn-row"></div>');
      [['✅ 唸對了', true], ['🤔 差一點', false], ['❌ 唸錯了', false]].forEach(function (pair, idx) {
        var b = document.createElement('button');
        b.className = 'btn' + (idx === 0 ? ' btn--primary' : '');
        b.textContent = pair[0];
        b.onclick = function () {
          row.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
          b.classList.add('btn--primary');
          done({ correct: pair[1], cause: pair[1] ? null : (idx === 1 ? 'articulation' : 'rule'),
                 word: item.w, key: 'word:' + item.w });
        };
        row.appendChild(b);
      });
      host.appendChild(row);
    };
  };

  /* 6. dictation：聽寫（核心的「聽音能寫」訓練） */
  TYPES['dictation'] = function (host, q, done) {
    var item = typeof q.item === 'string' ? { w: q.item, parts: null, ph: [] } : q.item;
    var answered = false;

    host.appendChild($('<p class="lede">' + esc(q.prompt || '聽這個字，把它拼出來。') + '</p>'));
    var row = $('<div class="center" style="margin:14px 0"></div>');
    row.appendChild(speakerBtn(item.w, null, { big: true }));
    host.appendChild(row);

    var tools = $('<div class="btn-row" style="justify-content:center;margin-bottom:12px"></div>');
    var slow = document.createElement('button');
    slow.className = 'btn btn--sm btn--ghost'; slow.textContent = '🐢 慢速';
    slow.onclick = function () { global.Speech.slow(item.w); };
    tools.appendChild(slow);
    if (item.parts) {
      var seg = document.createElement('button');
      seg.className = 'btn btn--sm btn--ghost'; seg.textContent = '🧩 逐音';
      seg.onclick = function () { global.Speech.blend(global.Words.phonemesOf(item), null, 400); };
      tools.appendChild(seg);
    }
    host.appendChild(tools);

    var inp = document.createElement('input');
    inp.className = 'input'; inp.type = 'text';
    inp.autocapitalize = 'off'; inp.autocorrect = 'off'; inp.spellcheck = false;
    inp.setAttribute('autocomplete', 'off');
    inp.placeholder = '拼出來…';
    host.appendChild(inp);

    var sub = document.createElement('button');
    sub.className = 'btn btn--primary btn--block'; sub.textContent = '送出';
    sub.style.marginTop = '10px';
    host.appendChild(sub);

    function submit() {
      if (answered) return;
      var v = inp.value.trim();
      if (!v) { inp.focus(); return; }
      answered = true;
      var ok = stripAll(v) === stripAll(item.w);
      inp.classList.add(ok ? 'is-right' : 'is-wrong');
      inp.disabled = true; sub.disabled = true;

      var an = ok ? null : analyzeSpelling(v, item.w, item);
      host.appendChild(feedback(ok, ok ? '拼對了' : '正確拼法：' + item.w,
        ok ? '' : '<b>' + esc(global.Store.CAUSES[an.cause].label) + '</b>：' + esc(an.detail)));
      if (item.parts) host.appendChild(renderTiles(item, true));
      done({ correct: ok, cause: ok ? null : an.cause, detail: ok ? '' : an.detail,
             word: item.w, key: 'word:' + item.w, rule: q.rule });
    }
    sub.onclick = submit;
    inp.onkeydown = function (e) { if (e.key === 'Enter') submit(); };
    setTimeout(function () { global.Speech.word(item.w); }, 350);
  };

  /* 7. read-aloud：朗讀（可用語音辨識輔助，也可自評） */
  TYPES['read-aloud'] = function (host, q, done) {
    var item = typeof q.item === 'string' ? { w: q.item, parts: null } : q.item;
    var answered = false;

    host.appendChild($('<p class="lede">' + esc(q.prompt || '看到這個字，唸出來。不要先聽答案。') + '</p>'));
    host.appendChild($('<div class="wordbig">' +
      (q.plain ? esc(item.w) : (item.parts ? global.Words.colorize(item) : esc(item.w))) + '</div>'));
    if (q.hint) host.appendChild($('<p class="small muted center">' + esc(q.hint) + '</p>'));

    var row = $('<div class="btn-row" style="margin-top:14px"></div>');

    if (global.Speech.listenAvailable && q.mic !== false) {
      var mic = document.createElement('button');
      mic.className = 'btn btn--primary'; mic.textContent = '🎤 唸給我聽';
      mic.onclick = function () {
        if (answered) return;
        mic.textContent = '🔴 聽取中…'; mic.disabled = true;
        global.Speech.listen(6000).then(function (r) {
          mic.disabled = false; mic.textContent = '🎤 再試一次';
          if (r.unsupported) { host.appendChild($('<p class="small muted">這個瀏覽器不支援語音辨識，請用下面的自評。</p>')); return; }
          if (!r.ok) { host.appendChild($('<p class="small muted">沒聽清楚（' + esc(r.error || '') + '），可以再試或直接自評。</p>')); return; }
          var hit = r.alts.some(function (x) { return stripAll(x) === stripAll(item.w); });
          answered = true;
          mic.disabled = true;
          host.appendChild(feedback(hit, hit ? '辨識到「' + item.w + '」' : '我聽到的是「' + r.heard + '」',
            hit ? '' : '語音辨識不是百分之百準，但連續辨識不到通常代表某個音沒做出來。' +
                  (item.parts ? '看下面的音塊，逐音對照。' : '')));
          if (item.parts) host.appendChild(renderTiles(item, true));
          done({ correct: hit, cause: hit ? null : 'articulation', word: item.w, key: 'word:' + item.w });
        });
      };
      row.appendChild(mic);
    }

    var rev = document.createElement('button');
    rev.className = 'btn'; rev.textContent = '🔊 聽答案';
    rev.onclick = function () {
      if (item.parts) global.Speech.blend(global.Words.phonemesOf(item), item.w, 280);
      else global.Speech.word(item.w);
      if (!host.querySelector('.self-eval')) {
        var ev = $('<div class="self-eval" style="margin-top:12px"></div>');
        ev.appendChild($('<p class="small muted">你剛才唸的一樣嗎？</p>'));
        var r2 = $('<div class="btn-row"></div>');
        [['✅ 一樣', true, null], ['🤔 差一點', false, 'articulation'], ['❌ 唸錯', false, 'rule']].forEach(function (p) {
          var b = document.createElement('button');
          b.className = 'btn btn--sm'; b.textContent = p[0];
          b.onclick = function () {
            if (answered) return; answered = true;
            r2.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
            b.classList.add('btn--primary');
            if (!p[1] && item.parts) host.appendChild(renderTiles(item, true));
            done({ correct: p[1], cause: p[2], word: item.w, key: 'word:' + item.w });
          };
          r2.appendChild(b);
        });
        ev.appendChild(r2);
        host.appendChild(ev);
      }
    };
    row.appendChild(rev);
    host.appendChild(row);
  };

  /* 8. rule-pick：規則選擇題（文字選項） */
  TYPES['rule-pick'] = function (host, q, done) {
    var answered = false;
    host.appendChild($('<p class="lede">' + q.prompt + '</p>'));
    if (q.word) {
      host.appendChild($('<div class="wordbig">' + esc(q.word) + '</div>'));
      var r = $('<div class="center" style="margin-bottom:10px"></div>');
      r.appendChild(speakerBtn(q.word, null, {}));
      host.appendChild(r);
    }
    var opts = $('<div class="opts"></div>');
    q.options.forEach(function (o, i) {
      var b = document.createElement('button');
      b.className = 'opt opt--text';
      b.innerHTML = esc(o);
      b.onclick = function () {
        if (answered) return; answered = true;
        var ok = i === q.answer;
        b.classList.add(ok ? 'is-right' : 'is-wrong');
        if (!ok) opts.children[q.answer].classList.add('is-right');
        host.appendChild(feedback(ok, ok ? '對' : '正確答案：' + q.options[q.answer], q.why || ''));
        done({ correct: ok, cause: ok ? null : 'rule', rule: q.rule, key: 'rule:' + (q.rule || 'general') });
      };
      opts.appendChild(b);
    });
    host.appendChild(opts);
  };

  /* 9. spell-pick：聽音選拼法（練「同音不同拼」） */
  TYPES['spell-pick'] = function (host, q, done) {
    var answered = false;
    host.appendChild($('<p class="lede">聽這個字，選出正確的拼法。</p>'));
    var row = $('<div class="center" style="margin:14px 0"></div>');
    row.appendChild(speakerBtn(q.answer, null, { big: true }));
    host.appendChild(row);
    var opts = $('<div class="opts opts--2"></div>');
    global.Words.shuffle(q.options).forEach(function (o) {
      var b = document.createElement('button');
      b.className = 'opt'; b.textContent = o;
      b.onclick = function () {
        if (answered) return; answered = true;
        var ok = o === q.answer;
        b.classList.add(ok ? 'is-right' : 'is-wrong');
        Array.prototype.forEach.call(opts.children, function (x) {
          if (x.textContent === q.answer) x.classList.add('is-right');
        });
        host.appendChild(feedback(ok, ok ? '對' : '正確是 ' + q.answer, q.why || ''));
        done({ correct: ok, cause: ok ? null : 'spelling', rule: q.rule, word: q.answer,
               key: 'rule:' + (q.rule || 'spelling') });
      };
      opts.appendChild(b);
    });
    host.appendChild(opts);
  };

  /* 10. sort：分類（把字歸到正確類別） */
  TYPES['sort'] = function (host, q, done) {
    var answered = false;
    host.appendChild($('<p class="lede">' + esc(q.prompt) + '</p>'));
    host.appendChild($('<div class="wordbig">' + esc(q.word) + '</div>'));
    var r = $('<div class="center" style="margin-bottom:10px"></div>');
    r.appendChild(speakerBtn(q.word, null, {}));
    host.appendChild(r);

    var opts = $('<div class="opts opts--' + (q.categories.length > 2 ? '3' : '2') + '"></div>');
    q.categories.forEach(function (c, i) {
      var b = document.createElement('button');
      b.className = 'opt'; b.innerHTML = esc(c);
      b.onclick = function () {
        if (answered) return; answered = true;
        var ok = i === q.answer;
        b.classList.add(ok ? 'is-right' : 'is-wrong');
        if (!ok) opts.children[q.answer].classList.add('is-right');
        host.appendChild(feedback(ok, ok ? '對' : '應該是「' + q.categories[q.answer] + '」', q.why || ''));
        done({ correct: ok, cause: ok ? null : (q.cause || 'rule'), rule: q.rule,
               word: q.word, key: 'rule:' + (q.rule || 'sort') });
      };
      opts.appendChild(b);
    });
    host.appendChild(opts);
  };

  /* 11. sentence：句子朗讀 */
  TYPES['sentence'] = function (host, q, done) {
    var answered = false;
    host.appendChild($('<p class="lede">出聲把整句唸完，再按「聽答案」對照。注意每個字都要唸完整。</p>'));
    host.appendChild($('<div class="card" style="font-family:var(--font-word);font-size:22px;line-height:1.9">' +
      esc(q.text) + '</div>'));

    var row = $('<div class="btn-row"></div>');
    var play = document.createElement('button');
    play.className = 'btn'; play.textContent = '🔊 聽答案';
    play.onclick = function () { global.Speech.word(q.text, { rate: 0.8 }); };
    var slow = document.createElement('button');
    slow.className = 'btn btn--ghost'; slow.textContent = '🐢 慢速';
    slow.onclick = function () { global.Speech.word(q.text, { rate: 0.55 }); };
    row.appendChild(play); row.appendChild(slow);
    host.appendChild(row);

    var ev = $('<div style="margin-top:14px"></div>');
    ev.appendChild($('<p class="small muted">你唸得跟示範一樣順嗎？</p>'));
    var r2 = $('<div class="btn-row"></div>');
    [['✅ 全對且順', true, null], ['🤔 有卡頓', false, 'memory'], ['❌ 有字唸不出', false, 'rule']].forEach(function (p) {
      var b = document.createElement('button');
      b.className = 'btn btn--sm'; b.textContent = p[0];
      b.onclick = function () {
        if (answered) return; answered = true;
        r2.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
        b.classList.add('btn--primary');
        done({ correct: p[1], cause: p[2], key: 'skill:fluency' });
      };
      r2.appendChild(b);
    });
    ev.appendChild(r2);
    host.appendChild(ev);
  };

  /* 12. nonsense：假字解碼——測真本事，不能靠記憶 */
  TYPES['nonsense'] = function (host, q, done) {
    var answered = false;
    host.appendChild($('<div class="fb fb--warn"><div class="fb__t">🧪 假字測驗</div>' +
      '<div class="small">這不是真的英文字。這樣才測得出你是「真的會拼讀」還是「背過這個字」。</div></div>'));
    host.appendChild($('<div class="wordbig">' + esc(q.word) + '</div>'));

    var row = $('<div class="btn-row" style="margin-top:12px"></div>');
    if (global.Speech.listenAvailable) {
      var mic = document.createElement('button');
      mic.className = 'btn btn--primary'; mic.textContent = '🎤 唸給我聽';
      mic.onclick = function () {
        if (answered) return;
        mic.textContent = '🔴 聽取中…'; mic.disabled = true;
        global.Speech.listen(6000).then(function (r) {
          mic.disabled = false; mic.textContent = '🎤 再試';
          if (!r.ok) { host.appendChild($('<p class="small muted">沒聽清楚，可直接自評。</p>')); return; }
          host.appendChild($('<p class="small muted">辨識到：<b>' + esc(r.heard) + '</b>（假字辨識常不準，請以自評為準）</p>'));
        });
      };
      row.appendChild(mic);
    }
    var rev = document.createElement('button');
    rev.className = 'btn'; rev.textContent = '🔊 聽正確唸法';
    rev.onclick = function () { global.Speech.slow(q.word); global.Speech.pause(600).then(function () { global.Speech.word(q.word); }); };
    row.appendChild(rev);
    host.appendChild(row);

    var ev = $('<div style="margin-top:14px"></div>');
    var r2 = $('<div class="btn-row"></div>');
    [['✅ 我唸對了', true, null], ['❌ 唸錯了', false, 'rule']].forEach(function (p) {
      var b = document.createElement('button');
      b.className = 'btn btn--sm'; b.textContent = p[0];
      b.onclick = function () {
        if (answered) return; answered = true;
        r2.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
        b.classList.add('btn--primary');
        done({ correct: p[1], cause: p[2], key: 'skill:nonsense', rule: q.rule });
      };
      r2.appendChild(b);
    });
    ev.appendChild(r2);
    host.appendChild(ev);
  };

  /* 13. swap：換音（phoneme substitution）
     音素覺識的第四種操作——前三種是辨音、拆音、合音。
     這一種最難：要在腦中把整個字拆開、抽掉一個零件、換上新的、再組回去。 */
  TYPES['swap'] = function (host, q, done) {
    var answered = false;
    var POS = { first: '第一個', last: '最後一個', middle: '中間的' };
    host.appendChild($('<p class="lede">把 <b>' + esc(q.from) + '</b> 的<b>' +
      (POS[q.pos] || q.pos) + '音</b>換成 <b>' + esc(q.newSound) + '</b>，會變成哪個字？</p>'));

    var row = $('<div class="center" style="margin:14px 0"></div>');
    row.appendChild(speakerBtn(q.from, q.from, {}));
    host.appendChild(row);

    var opts = $('<div class="opts opts--2"></div>');
    global.Words.shuffle(q.options).forEach(function (o) {
      var b = document.createElement('button');
      b.className = 'opt'; b.textContent = o;
      b.onclick = function () {
        if (answered) return; answered = true;
        var ok = o === q.answer;
        b.classList.add(ok ? 'is-right' : 'is-wrong');
        Array.prototype.forEach.call(opts.children, function (x) {
          if (x.textContent === q.answer) x.classList.add('is-right');
        });
        host.appendChild(feedback(ok, ok ? '對，是 ' + q.answer : '正確答案：' + q.answer,
          q.why || ('把 ' + esc(q.from) + ' 的' + (POS[q.pos] || q.pos) + '音抽掉，換成 ' +
                    esc(q.newSound) + '，其他音都不動 → ' + esc(q.answer))));
        var cmp = $('<div class="btn-row" style="margin-top:8px"></div>');
        [q.from, q.answer].forEach(function (x) {
          var s = document.createElement('button');
          s.className = 'btn btn--sm'; s.textContent = '🔊 ' + x;
          s.onclick = function () { global.Speech.slow(x); };
          cmp.appendChild(s);
        });
        host.appendChild(cmp);
        done({ correct: ok, cause: ok ? null : 'phoneme', key: 'skill:swap', word: q.answer });
      };
      opts.appendChild(b);
    });
    host.appendChild(opts);
  };

  /* 14. phoneme-card：音素卡（教學用，不計分） */
  TYPES['phoneme-card'] = function (host, q, done) {
    var p = global.PHONEMES.get(q.id);
    if (!p) { done({ correct: true }); return; }
    var isV = p.type === 'v';
    host.appendChild($('<div class="wordbig ' + (isV ? 'g-v' : 'g-c') + '">' + esc(p.sym) + '</div>'));
    host.appendChild($('<p class="ipa">' + esc(p.ph) + ' — 如 <b>' + esc(p.key) + '</b></p>'));

    var row = $('<div class="btn-row" style="justify-content:center;margin:14px 0"></div>');
    var b1 = document.createElement('button');
    b1.className = 'btn btn--primary'; b1.textContent = '🔊 聽這個音';
    b1.onclick = function () { global.Speech.phoneme(p); };
    var b2 = document.createElement('button');
    b2.className = 'btn'; b2.textContent = '🔊 例字 ' + p.key;
    b2.onclick = function () { global.Speech.slow(p.key); };
    row.appendChild(b1); row.appendChild(b2);
    host.appendChild(row);

    /* 口腔剖面圖：純文字說「舌尖抵上齒齦」對沒學過語音學的人沒用，
       他不知道上齒齦在哪。一張圖就解決了。 */
    if (global.Mouth && global.Mouth.has(p.id)) {
      var fig = $('<figure class="mouthbox"></figure>');
      fig.innerHTML = global.Mouth.svg(p.id);
      var steps = global.Mouth.steps(p.id);
      if (steps.length) {
        fig.appendChild($('<ol class="mouthbox__steps">' +
          steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>'));
      }
      host.appendChild(fig);
    }

    host.appendChild($('<div class="rule"><div class="rule__h">怎麼發這個音</div><div>' + esc(p.zh) + '</div></div>'));
    if (p.trap) {
      host.appendChild($('<div class="fb fb--warn"><div class="fb__t">⚠️ 中文母語者的陷阱</div>' +
        '<div class="small">' + esc(p.trap) + '</div></div>'));
    }
    host.appendChild($('<p class="small muted">常見拼法：' +
      p.graph.map(function (g) { return '<code>' + esc(g) + '</code>'; }).join('、') + '</p>'));

    var wl = $('<div class="wlist"></div>');
    p.ex.forEach(function (w) {
      var b = document.createElement('button');
      b.textContent = w;
      b.onclick = function () { global.Speech.word(w); };
      wl.appendChild(b);
    });
    host.appendChild(wl);

    var next = document.createElement('button');
    next.className = 'btn btn--primary btn--block'; next.style.marginTop = '16px';
    next.textContent = '我聽懂也做得出這個音 →';
    next.onclick = function () { next.disabled = true; done({ correct: true, key: 'phoneme:' + p.id, skip: true }); };
    host.appendChild(next);
  };

  /* ---------- 對外介面 ---------- */
  global.Exercises = {
    TYPES: TYPES,
    analyzeSpelling: analyzeSpelling,
    renderTiles: renderTiles,
    speakerBtn: speakerBtn,
    feedback: feedback,

    /** 渲染單題 */
    render: function (host, q, done) {
      host.innerHTML = '';
      var fn = TYPES[q.type];
      if (!fn) { host.innerHTML = '<p class="muted">（未知題型：' + esc(q.type) + '）</p>'; done({ correct: true }); return; }
      fn(host, q, function (res) {
        res = res || {};
        /* 不計分的教學卡不進統計 */
        if (!res.skip) {
          global.Store.record({
            key: res.key || q.key, cause: res.cause,
            correct: !!res.correct, phoneme: res.phoneme || q.phoneme,
            rule: res.rule || q.rule, word: res.word || q.word
          });
        }
        done(res);
      });
    }
  };
})(window);
