/* ==========================================================================
   app.js — 主程式：路由、畫面、課程播放器
   單頁應用，手機優先。所有畫面都渲染進 #view。
   ========================================================================== */
(function (global) {
  'use strict';

  var view    = document.getElementById('view');
  var appTitle= document.getElementById('appTitle');
  var btnBack = document.getElementById('btnBack');
  var btnTheme= document.getElementById('btnTheme');
  var tabbar  = document.getElementById('tabbar');
  var toastEl = document.getElementById('toast');

  var C = global.Curriculum, S = global.Store, X = global.Exercises;

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
    return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function h(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild; }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2200);
  }

  /* ---------- 主題 ---------- */
  function initTheme() {
    var t = null;
    try { t = localStorage.getItem('phonics.theme'); } catch (e) {}
    if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
  }
  btnTheme.onclick = function () {
    var cur = document.documentElement.getAttribute('data-theme');
    var next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('phonics.theme', next); } catch (e) {}
  };
  initTheme();

  /* ---------- 路由 ---------- */
  var stack = [];
  function go(route, param, replace) {
    if (!replace) stack.push({ route: route, param: param });
    else if (stack.length) stack[stack.length - 1] = { route: route, param: param };
    else stack.push({ route: route, param: param });
    render();
  }
  function back() {
    if (stack.length > 1) { stack.pop(); render(); }
    else go('home', null, true);
  }
  btnBack.onclick = back;

  tabbar.addEventListener('click', function (e) {
    var b = e.target.closest('[data-route]');
    if (!b) return;
    stack = [{ route: b.dataset.route, param: null }];
    render();
  });

  function render() {
    var cur = stack[stack.length - 1] || { route: 'home' };
    view.innerHTML = '';
    view.scrollTop = 0;
    window.scrollTo(0, 0);
    btnBack.hidden = stack.length <= 1;
    Array.prototype.forEach.call(tabbar.children, function (t) {
      t.setAttribute('aria-current', t.dataset.route === cur.route ? 'true' : 'false');
    });
    (VIEWS[cur.route] || VIEWS.home)(cur.param);
    view.focus();
  }

  /* ========================================================================
     畫面：首頁
     ======================================================================== */
  var VIEWS = {};

  VIEWS.home = function () {
    appTitle.textContent = 'Phonics 拼讀教室';
    var s = S.get();

    if (!s.diagnosis) {
      view.appendChild(h(
        '<div class="card card--brand">' +
        '<h1 style="margin-top:0">先花 30 分鐘，找出你的真正起點</h1>' +
        '<p>你多半不是「完全不會」，而是某幾層有洞。診斷會量五件事：耳朵能不能分辨英文的音、' +
        '字母音熟不熟、看到陌生字能不能讀、聽到字能不能寫、長單字能不能拆。</p>' +
        '<p class="small muted">量完才知道要從哪一級開始——省下的是好幾週。</p>' +
        '</div>'));
      var b = el('button', 'btn btn--primary btn--lg btn--block', '🧭 開始初始診斷');
      b.onclick = function () { go('diagnose'); };
      view.appendChild(b);

      view.appendChild(h('<hr class="divider">'));
      view.appendChild(h('<h2>這套課程要帶你到哪</h2>'));
      view.appendChild(h(
        '<div class="card">' +
        '<p><b>見字能讀</b>：看到沒學過的英文字，能推出合理讀音。</p>' +
        '<p><b>聽音能寫</b>：聽到字，能拆出音再拼出來。</p>' +
        '<p class="small muted" style="margin:0">驗收標準是「用沒看過的字證明」，不是「上完所有課」。' +
        '所以測驗大量使用假字——假字不可能背過。</p>' +
        '</div>'));
      renderLevelStrip();
      return;
    }

    /* 已診斷：顯示今日任務 */
    var next = C.nextUp();
    var due = global.SRS.dueCount();
    var overall = Math.round(C.overall() * 100);
    var est = C.estimate();

    view.appendChild(h(
      '<div class="card card--brand">' +
      '<div class="card__label">今天做這個</div>' +
      '<h1 style="margin:2px 0 6px">' + esc(nextTitle(next)) + '</h1>' +
      '<p class="small" style="margin:0">' + esc(next.why) + '</p>' +
      '</div>'));

    var go1 = el('button', 'btn btn--primary btn--lg btn--block',
      next.type === 'drill' ? '🎯 開始複習（' + due + ' 項到期）' : '▶️ 開始這一課');
    go1.onclick = function () {
      if (next.type === 'drill') go('drill');
      else if (next.type === 'lesson') go('lesson', next.id);
      else go('levels');
    };
    view.appendChild(go1);

    if (next.type !== 'drill' && due > 0) {
      var go2 = el('button', 'btn btn--block', '🎯 先複習 ' + due + ' 項到期內容（約 5 分鐘）');
      go2.style.marginTop = '8px';
      go2.onclick = function () { go('drill'); };
      view.appendChild(go2);
    }

    /* 統計 */
    view.appendChild(h(
      '<div class="stat-grid">' +
      '<div class="stat"><div class="stat__n">' + overall + '%</div><div class="stat__l">課程完成度</div></div>' +
      '<div class="stat"><div class="stat__n">' + s.streak.days + '</div><div class="stat__l">連續天數</div></div>' +
      '<div class="stat"><div class="stat__n">' + due + '</div><div class="stat__l">今日待複習</div></div>' +
      '<div class="stat"><div class="stat__n">' + est.weeks + '</div><div class="stat__l">預估剩餘週數</div></div>' +
      '</div>'));

    /* 補強建議 */
    var rem = C.remediation();
    if (rem.length) {
      view.appendChild(h('<h2>針對你的補強</h2>'));
      rem.slice(0, 3).forEach(function (r) {
        view.appendChild(h(
          '<div class="card card--flat">' +
          '<div class="card__label">' + (r.kind === 'cause' ? '錯誤成因' : r.kind === 'phoneme' ? '弱項音' : '弱項規則') + '</div>' +
          '<div style="font-weight:700">' + esc(r.title) + '</div>' +
          '<p class="small muted" style="margin:4px 0 6px">' + esc(r.desc || '') + '</p>' +
          '<p class="small" style="margin:0">→ ' + esc(r.action) + '</p>' +
          '</div>'));
      });
    }

    renderLevelStrip();
  };

  function nextTitle(next) {
    if (next.type === 'lesson') {
      var l = C.lesson(next.id);
      return l ? l.title : next.id;
    }
    if (next.type === 'drill') return '間隔複習';
    return '總驗收';
  }

  function renderLevelStrip() {
    view.appendChild(h('<h2>課程地圖</h2>'));
    C.levels.forEach(function (lv) {
      view.appendChild(levelRow(lv));
    });
    view.appendChild(h('<hr class="divider">'));
    view.appendChild(h('<p class="small center"><a href="../">← 回 AI 學習中心</a></p>'));
  }

  function levelRow(lv) {
    var prog = C.levelProgress(lv.id);
    var unlocked = C.levelUnlocked(lv.id);
    var done = prog >= 1;
    var cls = 'lvl' + (done ? ' lvl--done' : '') + (!unlocked ? ' lvl--lock' : '') +
              (unlocked && !done && prog > 0 ? ' lvl--now' : '');
    var b = el('button', cls);
    b.innerHTML =
      '<div class="lvl__badge">' + (done ? '✓' : (unlocked ? lv.icon : '🔒')) + '</div>' +
      '<div class="lvl__body">' +
        '<div class="lvl__t">L' + lv.id + ' ' + esc(lv.title) + '</div>' +
        '<div class="lvl__s">' + esc(lv.subtitle) + '</div>' +
        (prog > 0 && !done ? '<div class="bar" style="margin-top:6px"><div class="bar__fill" style="width:' +
          Math.round(prog * 100) + '%"></div></div>' : '') +
      '</div>' +
      '<div class="lvl__go">›</div>';
    b.onclick = function () {
      if (!unlocked) { toast('先完成 Level ' + (lv.id - 1) + ' 才會解鎖'); return; }
      go('level', lv.id);
    };
    return b;
  }

  /* ========================================================================
     畫面：課程列表 / 單一 Level
     ======================================================================== */
  VIEWS.levels = function () {
    appTitle.textContent = '課程地圖';
    var est = C.estimate();
    view.appendChild(h(
      '<div class="card card--flat"><p class="small" style="margin:0">' +
      '整體完成 <b>' + Math.round(C.overall() * 100) + '%</b>，' +
      '照你設定的每天 ' + S.get().profile.dailyMinutes + ' 分鐘，' +
      '預估還要 <b>' + est.days + ' 天</b>（約 ' + est.weeks + ' 週）。' +
      '</p></div>'));
    C.levels.forEach(function (lv) { view.appendChild(levelRow(lv)); });

    var b = el('button', 'btn btn--ghost btn--block', '📅 看完整學習時間表');
    b.style.marginTop = '12px';
    b.onclick = function () { go('schedule'); };
    view.appendChild(b);
  };

  VIEWS.level = function (id) {
    var lv = C.level(id);
    if (!lv) { go('levels', null, true); return; }
    appTitle.textContent = 'Level ' + lv.id;

    view.appendChild(h(
      '<div class="card card--brand">' +
      '<div class="card__label">Level ' + lv.id + '</div>' +
      '<h1 style="margin:2px 0 4px">' + lv.icon + ' ' + esc(lv.title) + '</h1>' +
      '<p style="margin:0 0 10px">' + esc(lv.subtitle) + '</p>' +
      '<p class="small" style="margin:0"><b>目標：</b>' + esc(lv.goal) + '</p>' +
      '</div>'));

    view.appendChild(h(
      '<div class="card card--flat">' +
      '<div class="card__label">為什麼這一級重要</div>' +
      '<p class="small" style="margin:0">' + esc(lv.why) + '</p>' +
      '</div>'));

    view.appendChild(h(
      '<div class="card">' +
      '<div class="card__label">通過標準</div>' +
      '<p class="small" style="margin:0">' + esc(lv.criteria) + '</p>' +
      '<p class="small muted" style="margin:8px 0 0">約 ' + lv.days + ' 天 · 每次 ' + lv.mins + ' 分鐘</p>' +
      '</div>'));

    view.appendChild(h('<h2>小任務清單</h2>'));
    var lessons = C.lessonsOf(lv.id);
    if (!lessons.length) {
      view.appendChild(h('<p class="muted small">（這一級的課程內容尚未載入）</p>'));
    }
    lessons.forEach(function (l, i) {
      var done = S.isLessonDone(l.id);
      var rec = S.lesson(l.id);
      var b = el('button', 'lvl' + (done ? ' lvl--done' : ''));
      b.innerHTML =
        '<div class="lvl__badge">' + (done ? '✓' : (i + 1)) + '</div>' +
        '<div class="lvl__body">' +
          '<div class="lvl__t">' + esc(l.title) + '</div>' +
          '<div class="lvl__s">' + esc(l.sub || '') + ' · ' + (l.mins || lv.mins) + ' 分鐘' +
          (rec && rec.total ? ' · 上次 ' + rec.score + '/' + rec.total : '') + '</div>' +
        '</div><div class="lvl__go">›</div>';
      b.onclick = function () { go('lesson', l.id); };
      view.appendChild(b);
    });

    /* 外部教材 */
    var res = global.RESOURCES.forLevel(lv.id);
    if (res.length) {
      view.appendChild(h('<h2>這一級要搭配的外部教材</h2>'));
      res.forEach(function (r) { view.appendChild(resourceCard(r)); });
    }
  };

  function resourceCard(r) {
    var RS = global.RESOURCES;
    var c = el('div', 'card');
    c.innerHTML =
      '<div class="card__label">' + RS.TYPE_ICON[r.type] + ' ' + RS.TYPE_LABEL[r.type] +
        (r.mins ? ' · 約 ' + r.mins + ' 分鐘' : '') + (r.core ? ' · 必做' : '') + '</div>' +
      '<div style="font-weight:700;margin-bottom:6px">' +
        '<a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.title) + ' ↗</a></div>' +
      '<p class="small" style="margin:0 0 8px"><b>學什麼：</b>' + esc(r.what) + '</p>' +
      '<p class="small" style="margin:0 0 8px"><b>怎麼用：</b>' + esc(r.how) + '</p>' +
      '<p class="small" style="margin:0"><b>做完之後：</b>' + esc(r.after) + '</p>' +
      (r.zhNote ? '<p class="small muted" style="margin:8px 0 0">' + esc(r.zhNote) + '</p>' : '');
    return c;
  }

  /* ========================================================================
     畫面：單一課程播放器（13 個區塊）
     ======================================================================== */
  VIEWS.lesson = function (id) {
    var l = C.lesson(id);
    if (!l) { view.appendChild(h('<p class="muted">找不到這一課（' + esc(id) + '）。</p>')); return; }
    appTitle.textContent = l.title;

    var state = { step: 0, results: [], quizResults: [] };
    var steps = buildSteps(l);

    var stepBar = el('div', 'steps');
    var host = el('div');
    view.appendChild(stepBar);
    view.appendChild(host);

    function paintBar() {
      stepBar.innerHTML = '';
      steps.forEach(function (_, i) {
        var d = el('div', 'step-dot' + (i < state.step ? ' is-done' : i === state.step ? ' is-now' : ''));
        stepBar.appendChild(d);
      });
    }

    function show() {
      paintBar();
      host.innerHTML = '';
      window.scrollTo(0, 0);
      var st = steps[state.step];
      if (!st) { finishLesson(); return; }
      st.render(host, function () {
        state.step++;
        show();
      });
    }

    function finishLesson() {
      var qr = state.quizResults;
      var score = qr.filter(function (r) { return r.correct; }).length;
      var total = qr.length;
      var rate = total ? score / total : 1;
      var need = (l.pass && l.pass.quiz) || 0.8;
      var passed = rate >= need;

      host.innerHTML = '';
      host.appendChild(h(
        '<div class="card card--brand center">' +
        '<div style="font-size:44px">' + (passed ? '🎉' : '💪') + '</div>' +
        '<h1 style="margin:6px 0">' + (passed ? '這一課過了' : '再練一次就過') + '</h1>' +
        '<p style="margin:0">測驗 ' + score + '/' + total + '（' + Math.round(rate * 100) + '%），' +
        '通過門檻 ' + Math.round(need * 100) + '%</p>' +
        '</div>'));

      /* 錯誤分析 */
      var wrong = state.results.filter(function (r) { return r.correct === false; });
      if (wrong.length) {
        host.appendChild(h('<h2>錯在哪裡</h2>'));
        var byCause = {};
        wrong.forEach(function (r) {
          if (!r.cause) return;
          (byCause[r.cause] = byCause[r.cause] || []).push(r);
        });
        Object.keys(byCause).sort(function (a, b) { return byCause[b].length - byCause[a].length; })
          .forEach(function (c) {
            var info = S.CAUSES[c];
            var items = byCause[c];
            host.appendChild(h(
              '<div class="card">' +
              '<div class="card__label">' + esc(info.label) + ' · ' + items.length + ' 題</div>' +
              '<p class="small" style="margin:0 0 8px">' + esc(info.hint) + '</p>' +
              (items[0].detail ? '<p class="small muted" style="margin:0 0 8px">' + esc(items[0].detail) + '</p>' : '') +
              '<p class="small" style="margin:0">→ ' + esc(remedyFor(c)) + '</p>' +
              '</div>'));
          });
      } else if (total) {
        host.appendChild(h('<div class="fb fb--ok"><div class="fb__t">全對</div>' +
          '<div class="small">沒有錯誤可以分析。這一課的內容已經進入你的複習排程，之後會在間隔複習裡再出現。</div></div>'));
      }

      /* 通過標準說明 */
      host.appendChild(h(
        '<div class="card card--flat">' +
        '<div class="card__label">這一課的判定標準</div>' +
        '<p class="small" style="margin:0">' + esc(l.passText || ('測驗達 ' + Math.round(need * 100) + '% 以上')) + '</p>' +
        '</div>'));

      var row = el('div', 'btn-row');
      if (passed) {
        var b1 = el('button', 'btn btn--primary btn--lg', '✓ 完成，下一課');
        b1.onclick = function () {
          S.completeLesson(l.id, score, total);
          S.recordQuiz(l.id, score, total, {});
          S.touchDay(l.mins || 25);
          toast('已完成：' + l.title);
          var next = C.nextUp();
          if (next.type === 'lesson') go('lesson', next.id, true);
          else go('home', null, true);
        };
        row.appendChild(b1);
      } else {
        var b2 = el('button', 'btn btn--primary btn--lg', '🔁 重做這一課');
        b2.onclick = function () {
          S.setLesson(l.id, { status: 'retry', attempts: ((S.lesson(l.id) || {}).attempts || 0) + 1 });
          S.recordQuiz(l.id, score, total, {});
          go('lesson', l.id, true);
        };
        row.appendChild(b2);
        var b3 = el('button', 'btn', '先去複習弱項');
        b3.onclick = function () { go('drill'); };
        row.appendChild(b3);
      }
      host.appendChild(row);
      state.step = steps.length;
      paintBar();
    }

    function remedyFor(cause) {
      return ({
        listening:    '去「複習」做最小配對聽辨，並到 Sounds of Speech 看該音的口腔動畫。',
        phoneme:      '多做 segment（拆音格）練習，把速度放到最慢，一個音一格。',
        rule:         '回到本課「必懂規則」重讀一次，然後只做規則題。',
        articulation: '看口腔剖面動畫，對著鏡子做 10 次口型，再唸字。',
        spelling:     '看「同一個音的不同拼法」對照表，記住各拼法出現的位置規律。',
        memory:       '這類字要進「不規則字卡」，用間隔複習硬記住不規則的那一小塊。'
      })[cause] || '再做一次相關練習。';
    }

    /* --- 把課程資料拆成一連串步驟 --- */
    function buildSteps(l) {
      var steps = [];

      /* 1. 本課目標 + 2. 必懂規則 + 3. 中文解說 */
      steps.push({ render: function (host, next) {
        host.appendChild(h(
          '<div class="card card--brand">' +
          '<div class="card__label">本課目標</div>' +
          '<h1 style="margin:2px 0 6px">' + esc(l.title) + '</h1>' +
          '<p style="margin:0">' + esc(l.goal) + '</p>' +
          '</div>'));

        (l.rules || []).forEach(function (r) {
          host.appendChild(h('<div class="rule"><div class="rule__h">' + esc(r.h) + '</div><div>' + r.t + '</div></div>'));
        });

        if (l.explain) host.appendChild(h('<div class="card">' + l.explain + '</div>'));

        if (l.trap) {
          host.appendChild(h('<div class="fb fb--warn"><div class="fb__t">⚠️ 中文母語者要特別注意</div>' +
            '<div class="small">' + l.trap + '</div></div>'));
        }

        if (l.res && l.res.length) {
          host.appendChild(h('<h3>建議搭配（可先跳過，之後補）</h3>'));
          l.res.forEach(function (rid) {
            var r = global.RESOURCES.get(rid);
            if (r) host.appendChild(resourceCard(r));
          });
        }

        var b = el('button', 'btn btn--primary btn--lg btn--block', '我讀懂了，開始練 →');
        b.style.marginTop = '14px';
        b.onclick = next;
        host.appendChild(b);
      }});

      /* 4. 發音示範（音素卡 / 單字示範） */
      if (l.demo && l.demo.length) {
        l.demo.forEach(function (d) {
          steps.push({ render: function (host, next) {
            host.appendChild(h('<div class="card__label">發音示範</div>'));
            var box = el('div');
            host.appendChild(box);
            /* phoneme-card 自帶「我聽懂了」按鈕，作答即前進；其他題型才補一顆下一步 */
            X.render(box, d, function () { if (d.type === 'phoneme-card') next(); });
            if (d.type !== 'phoneme-card') {
              var b = el('button', 'btn btn--primary btn--block', '下一步 →');
              b.style.marginTop = '14px';
              b.onclick = next;
              host.appendChild(b);
            }
          }});
        });
      }

      /* 5–10. 練習區（listen / blend / segment / dictation / read / sentence） */
      var exs = l.ex || [];
      exs.forEach(function (q, i) {
        steps.push({ render: function (host, next) {
          host.appendChild(h('<div class="card__label">練習 ' + (i + 1) + ' / ' + exs.length +
            (q.section ? ' · ' + esc(q.section) : '') + '</div>'));
          var box = el('div');
          host.appendChild(box);
          var nb = el('button', 'btn btn--primary btn--block', '下一題 →');
          nb.style.marginTop = '14px';
          nb.disabled = true;
          nb.onclick = next;
          X.render(box, q, function (res) {
            res.skill = q.skill;
            state.results.push(res);
            nb.disabled = false;
            nb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          });
          host.appendChild(nb);
        }});
      });

      /* 11. 小測驗 */
      var quiz = l.quiz || [];
      if (quiz.length) {
        steps.push({ render: function (host, next) {
          host.appendChild(h(
            '<div class="card card--brand"><div class="card__label">小測驗</div>' +
            '<h1 style="margin:2px 0 6px">驗收時間</h1>' +
            '<p style="margin:0" class="small">共 ' + quiz.length + ' 題，答對 ' +
            Math.ceil(quiz.length * ((l.pass && l.pass.quiz) || 0.8)) + ' 題以上才算過。' +
            '這裡不給提示，也不能重聽太多次——就是要測你自己能不能做到。</p></div>'));
          var b = el('button', 'btn btn--primary btn--lg btn--block', '開始測驗 →');
          b.onclick = next;
          host.appendChild(b);
        }});

        quiz.forEach(function (q, i) {
          steps.push({ render: function (host, next) {
            host.appendChild(h('<div class="card__label">測驗 ' + (i + 1) + ' / ' + quiz.length + '</div>'));
            var box = el('div');
            host.appendChild(box);
            var nb = el('button', 'btn btn--primary btn--block',
              i === quiz.length - 1 ? '看結果 →' : '下一題 →');
            nb.style.marginTop = '14px';
            nb.disabled = true;
            nb.onclick = next;
            X.render(box, q, function (res) {
              res.skill = q.skill;
              state.results.push(res);
              state.quizResults.push(res);
              nb.disabled = false;
              nb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            });
            host.appendChild(nb);
          }});
        });
      }

      return steps;
    }

    show();
  };

  /* ========================================================================
     畫面：診斷
     ======================================================================== */
  VIEWS.diagnose = function () {
    appTitle.textContent = '初始診斷';
    var sections = global.Diagnose.build();
    var si = 0, qi = 0;
    var results = [];
    var host = el('div');
    view.appendChild(host);

    function intro() {
      host.innerHTML = '';
      var s = sections[si];
      host.appendChild(h(
        '<div class="card card--brand">' +
        '<div class="card__label">' + (si + 1) + ' / ' + sections.length + '</div>' +
        '<h1 style="margin:2px 0 8px">' + s.icon + ' ' + esc(s.title) + '</h1>' +
        '<p style="margin:0">' + esc(s.intro) + '</p></div>'));
      var b = el('button', 'btn btn--primary btn--lg btn--block', '開始（' + s.items.length + ' 題）→');
      b.onclick = function () { qi = 0; ask(); };
      host.appendChild(b);
      if (si === 0) {
        host.appendChild(h('<p class="small muted" style="margin-top:14px">' +
          '不用緊張，也不要查答案。這是量尺不是考試——量準了才排得出對的課。' +
          '不確定就選最直覺的那個。</p>'));
      }
    }

    function ask() {
      host.innerHTML = '';
      var s = sections[si];
      if (qi >= s.items.length) {
        si++;
        if (si >= sections.length) { finish(); return; }
        intro(); return;
      }
      host.appendChild(h('<div class="card__label">' + esc(s.title) + ' · ' + (qi + 1) + '/' + s.items.length + '</div>'));
      var bar = el('div', 'bar');
      bar.innerHTML = '<div class="bar__fill" style="width:' + Math.round(qi / s.items.length * 100) + '%"></div>';
      bar.style.marginBottom = '14px';
      host.appendChild(bar);

      var box = el('div');
      host.appendChild(box);
      var q = s.items[qi];
      var nb = el('button', 'btn btn--primary btn--block', '下一題 →');
      nb.style.marginTop = '14px'; nb.disabled = true;
      nb.onclick = function () { qi++; ask(); };
      X.render(box, q, function (res) {
        res.skill = q.skill;
        results.push(res);
        nb.disabled = false;
        nb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      });
      host.appendChild(nb);
    }

    function finish() {
      var d = global.Diagnose.score(results);
      S.setDiagnosis(d);
      S.completeLesson('L0-01', d.correct, d.total);
      S.touchDay(30);

      host.innerHTML = '';
      host.appendChild(h(
        '<div class="card card--brand center">' +
        '<div style="font-size:44px">🧭</div>' +
        '<h1 style="margin:6px 0">診斷完成</h1>' +
        '<p style="margin:0">' + d.correct + ' / ' + d.total + ' 題正確</p></div>'));

      var lv = C.level(d.placement);
      host.appendChild(h(
        '<div class="card">' +
        '<div class="card__label">你的起點</div>' +
        '<h2 style="margin:2px 0 6px">Level ' + d.placement + ' ' + esc(lv ? lv.title : '') + '</h2>' +
        '<p class="small" style="margin:0">' + esc(lv ? lv.goal : '') + '</p></div>'));

      /* 五區塊條 */
      host.appendChild(h('<h2>五個能力區塊</h2>'));
      var NAMES = { pa:'音素辨識（耳朵）', letter:'字母音', decode:'解碼（見字能讀）',
                    spell:'聽寫（聽音能寫）', multi:'多音節與拆音' };
      ['pa','letter','decode','spell','multi'].forEach(function (k) {
        var v = d.sectionRates[k];
        if (v == null) return;
        var pct = Math.round(v * 100);
        host.appendChild(h(
          '<div class="card card--flat" style="padding:12px">' +
          '<div style="display:flex;justify-content:space-between;font-size:14px;font-weight:600">' +
          '<span>' + NAMES[k] + '</span><span>' + pct + '%</span></div>' +
          '<div class="bar' + (v >= 0.8 ? ' bar--ok' : '') + '" style="margin-top:6px">' +
          '<div class="bar__fill" style="width:' + pct + '%"></div></div></div>'));
      });

      if (d.causes.length) {
        host.appendChild(h('<h2>你的錯誤主要出在哪</h2>'));
        d.causes.slice(0, 3).forEach(function (c) {
          host.appendChild(h(
            '<div class="card card--flat"><div class="card__label">' + esc(c.label) + ' · ' + c.n + ' 題</div>' +
            '<p class="small" style="margin:0">' + esc(S.CAUSES[c.cause].hint) + '</p></div>'));
        });
      }

      if (d.weakSounds.length) {
        host.appendChild(h('<h2>目前最弱的音</h2>'));
        var chips = el('div', 'chips');
        d.weakSounds.slice(0, 8).forEach(function (sym) {
          chips.appendChild(h('<span class="chip chip--bad">' + esc(sym) + '</span>'));
        });
        host.appendChild(chips);
        host.appendChild(h('<p class="small muted">這些音會被排進你的複習清單，之後每天都會出現直到穩定。</p>'));
      }

      var b = el('button', 'btn btn--primary btn--lg btn--block', '好，開始 Level ' + d.placement + ' →');
      b.style.marginTop = '16px';
      b.onclick = function () {
        var next = C.nextUp();
        if (next.type === 'lesson') go('lesson', next.id, true);
        else go('level', d.placement, true);
      };
      host.appendChild(b);

      var b2 = el('button', 'btn btn--ghost btn--block', '先看課程地圖');
      b2.style.marginTop = '8px';
      b2.onclick = function () { stack = [{ route: 'levels' }]; render(); };
      host.appendChild(b2);
    }

    intro();
  };

  /* ========================================================================
     畫面：間隔複習
     ======================================================================== */
  VIEWS.drill = function () {
    appTitle.textContent = '間隔複習';
    var qs = global.SRS.session(12);
    var i = 0, results = [];
    var host = el('div');
    view.appendChild(host);

    if (!qs.length) {
      host.appendChild(h('<div class="card center"><div style="font-size:40px">✅</div>' +
        '<h2 style="margin:6px 0">今天沒有到期的複習</h2>' +
        '<p class="small muted">去上新課吧。複習項目會在你學完新內容後自動排進來。</p></div>'));
      var b = el('button', 'btn btn--primary btn--block', '去上課');
      b.onclick = function () { stack = [{ route: 'home' }]; render(); };
      host.appendChild(b);
      return;
    }

    function ask() {
      host.innerHTML = '';
      if (i >= qs.length) { done(); return; }
      host.appendChild(h('<div class="card__label">複習 ' + (i + 1) + ' / ' + qs.length +
        ' · 交錯練習（刻意混題型）</div>'));
      var bar = el('div', 'bar');
      bar.innerHTML = '<div class="bar__fill" style="width:' + Math.round(i / qs.length * 100) + '%"></div>';
      bar.style.marginBottom = '14px';
      host.appendChild(bar);

      var box = el('div');
      host.appendChild(box);
      var nb = el('button', 'btn btn--primary btn--block', i === qs.length - 1 ? '看結果 →' : '下一題 →');
      nb.style.marginTop = '14px'; nb.disabled = true;
      nb.onclick = function () { i++; ask(); };
      X.render(box, qs[i], function (res) {
        results.push(res);
        nb.disabled = false;
        nb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      });
      host.appendChild(nb);
    }

    function done() {
      var sum = global.SRS.finish(results);
      host.innerHTML = '';
      host.appendChild(h(
        '<div class="card card--brand center"><div style="font-size:40px">🎯</div>' +
        '<h1 style="margin:6px 0">複習完成</h1>' +
        '<p style="margin:0">' + sum.ok + ' / ' + sum.total + '（' + Math.round(sum.rate * 100) + '%）</p></div>'));

      var wrong = results.filter(function (r) { return !r.correct; });
      if (wrong.length) {
        host.appendChild(h('<p class="small muted">答錯的項目已經被拉回「明天再練」。' +
          '答對的往後排——這就是間隔複習：你只會花時間在還不熟的東西上。</p>'));
      } else {
        host.appendChild(h('<div class="fb fb--ok"><div class="fb__t">全對</div>' +
          '<div class="small">這些項目的複習間隔已經拉長，之後不會太常出現。</div></div>'));
      }
      var b = el('button', 'btn btn--primary btn--block', '回首頁');
      b.style.marginTop = '12px';
      b.onclick = function () { stack = [{ route: 'home' }]; render(); };
      host.appendChild(b);
    }
    ask();
  };

  /* ========================================================================
     畫面：進度
     ======================================================================== */
  VIEWS.progress = function () {
    appTitle.textContent = '我的進度';
    var s = S.get();

    if (!s.diagnosis) {
      view.appendChild(h('<div class="card"><p style="margin:0">還沒做初始診斷。' +
        '做完才會有進度資料。</p></div>'));
      var b0 = el('button', 'btn btn--primary btn--block', '去做診斷');
      b0.onclick = function () { go('diagnose'); };
      view.appendChild(b0);
      return;
    }

    var est = C.estimate();
    view.appendChild(h(
      '<div class="stat-grid">' +
      '<div class="stat"><div class="stat__n">' + Math.round(C.overall() * 100) + '%</div><div class="stat__l">課程完成</div></div>' +
      '<div class="stat"><div class="stat__n">' + s.streak.days + '</div><div class="stat__l">連續天數</div></div>' +
      '<div class="stat"><div class="stat__n">' + Math.round(s.streak.totalMinutes / 60) + 'h</div><div class="stat__l">累計時數</div></div>' +
      '<div class="stat"><div class="stat__n">' + est.days + '</div><div class="stat__l">預估剩餘天</div></div>' +
      '</div>'));

    /* 各 Level 進度 */
    view.appendChild(h('<h2>各級進度</h2>'));
    C.levels.forEach(function (lv) {
      var p = C.levelProgress(lv.id);
      var doneN = lv.lessons.filter(function (x) { return S.isLessonDone(x); }).length;
      view.appendChild(h(
        '<div class="card card--flat" style="padding:12px">' +
        '<div style="display:flex;justify-content:space-between;font-size:14px;font-weight:600">' +
        '<span>L' + lv.id + ' ' + esc(lv.title) + '</span>' +
        '<span class="muted">' + doneN + '/' + lv.lessons.length + '</span></div>' +
        '<div class="bar' + (p >= 1 ? ' bar--ok' : '') + '" style="margin-top:6px">' +
        '<div class="bar__fill" style="width:' + Math.round(p * 100) + '%"></div></div></div>'));
    });

    /* 錯誤成因 */
    var causes = S.topCauses();
    if (causes.length) {
      view.appendChild(h('<h2>錯誤成因分布</h2>'));
      var maxN = causes[0].n;
      causes.forEach(function (c) {
        view.appendChild(h(
          '<div class="card card--flat" style="padding:12px">' +
          '<div style="display:flex;justify-content:space-between;font-size:14px;font-weight:600">' +
          '<span>' + esc(c.info.label) + '</span><span class="muted">' + c.n + ' 次</span></div>' +
          '<div class="bar" style="margin-top:6px"><div class="bar__fill" style="width:' +
          Math.round(c.n / maxN * 100) + '%"></div></div>' +
          '<p class="small muted" style="margin:6px 0 0">' + esc(c.info.hint) + '</p></div>'));
      });
    }

    /* 弱項音 */
    var weakPh = S.weakest(8, 'phoneme:');
    if (weakPh.length) {
      view.appendChild(h('<h2>弱項音素</h2>'));
      var tw = el('div', 'tbl-wrap');
      var rows = weakPh.map(function (w) {
        var p = global.PHONEMES.get(w.key.split(':')[1]);
        if (!p) return '';
        return '<tr><td><code>' + esc(p.sym) + '</code><br><span class="small muted">' + esc(p.key) + '</span></td>' +
               '<td class="small">' + Math.round((1 - w.rate) * 100) + '%<br>' +
               '<span class="muted">' + w.m.seen + ' 次</span></td>' +
               '<td class="small">' + esc(p.trap || '') + '</td></tr>';
      }).join('');
      tw.innerHTML = '<table class="tbl"><thead><tr><th>音</th><th>正確率</th><th>問題</th></tr></thead><tbody>' +
        rows + '</tbody></table>';
      view.appendChild(tw);
    }

    /* 常錯字 */
    var byWord = s.errors.byWord || {};
    var badWords = Object.keys(byWord).filter(function (w) { return byWord[w].wrong > 0; })
      .sort(function (a, b) { return byWord[b].wrong - byWord[a].wrong; }).slice(0, 20);
    if (badWords.length) {
      view.appendChild(h('<h2>我的錯字本</h2>'));
      view.appendChild(h('<p class="small muted">點一下聽發音。這些字會優先排進複習。</p>'));
      var wl = el('div', 'wlist');
      badWords.forEach(function (w) {
        var b = el('button', null, esc(w));
        b.onclick = function () { global.Speech.slow(w); };
        wl.appendChild(b);
      });
      view.appendChild(wl);
    }

    /* 測驗紀錄 */
    if (s.quizzes.length) {
      view.appendChild(h('<h2>測驗紀錄</h2>'));
      var tw2 = el('div', 'tbl-wrap');
      tw2.innerHTML = '<table class="tbl"><thead><tr><th>日期</th><th>課程</th><th>成績</th></tr></thead><tbody>' +
        s.quizzes.slice(-15).reverse().map(function (q) {
          var l = C.lesson(q.lessonId);
          var pct = q.total ? Math.round(q.score / q.total * 100) : 0;
          return '<tr><td class="small">' + esc(q.date) + '</td>' +
                 '<td class="small">' + esc(l ? l.title : q.lessonId) + '</td>' +
                 '<td class="small"><b>' + q.score + '/' + q.total + '</b> ' +
                 '<span class="chip ' + (pct >= 80 ? 'chip--ok' : 'chip--warn') + '">' + pct + '%</span></td></tr>';
        }).join('') + '</tbody></table>';
      view.appendChild(tw2);
    }

    view.appendChild(h('<hr class="divider">'));
    var bs = el('button', 'btn btn--ghost btn--block', '⚙️ 設定與資料');
    bs.onclick = function () { go('settings'); };
    view.appendChild(bs);
  };

  /* ========================================================================
     畫面：資源
     ======================================================================== */
  VIEWS.resources = function () {
    appTitle.textContent = '外部教材';
    view.appendChild(h('<div class="card card--flat"><p class="small" style="margin:0">' +
      '每一筆都寫清楚「看哪一段、學什麼、花多久、做完之後做什麼」。' +
      '標「必做」的請務必用，其他是備援。</p></div>'));

    var byType = {};
    global.RESOURCES.list.forEach(function (r) { (byType[r.type] = byType[r.type] || []).push(r); });
    ['tool', 'video', 'play', 'read', 'audio'].forEach(function (t) {
      if (!byType[t]) return;
      view.appendChild(h('<h2>' + global.RESOURCES.TYPE_ICON[t] + ' ' + global.RESOURCES.TYPE_LABEL[t] + '</h2>'));
      byType[t].forEach(function (r) {
        var c = resourceCard(r);
        c.appendChild(h('<p class="small muted" style="margin:8px 0 0">適用：' +
          r.levels.map(function (x) { return 'L' + x; }).join('、') + '</p>'));
        view.appendChild(c);
      });
    });
  };

  /* ========================================================================
     畫面：時間表
     ======================================================================== */
  VIEWS.schedule = function () {
    appTitle.textContent = '學習時間表';
    var s = S.get();
    var per = s.profile.dailyMinutes || 25;

    view.appendChild(h(
      '<div class="card card--brand">' +
      '<div class="card__label">排課原則</div>' +
      '<p style="margin:0 0 8px">以「最快建立實際能力」為準，不是把課拖長。</p>' +
      '<p class="small" style="margin:0">已經會的快速通過（測驗一次過就跳過練習），不會的自動加練。' +
      '每天固定 ' + per + ' 分鐘，其中約 5 分鐘是前一天內容的複習。</p></div>'));

    var day = 1;
    C.levels.forEach(function (lv) {
      var prog = C.levelProgress(lv.id);
      var start = day, end = day + lv.days - 1;
      day = end + 1;
      view.appendChild(h(
        '<div class="card' + (prog >= 1 ? ' card--flat' : '') + '">' +
        '<div class="card__label">第 ' + start + '–' + end + ' 天 · 約 ' +
          Math.ceil(lv.days / 6) + ' 週' + (prog >= 1 ? ' · ✅ 已完成' : '') + '</div>' +
        '<div style="font-weight:700;margin-bottom:4px">' + lv.icon + ' L' + lv.id + ' ' + esc(lv.title) + '</div>' +
        '<p class="small" style="margin:0 0 8px">' + esc(lv.subtitle) + '</p>' +
        '<p class="small muted" style="margin:0"><b>過關條件：</b>' + esc(lv.criteria) + '</p>' +
        '</div>'));
    });

    view.appendChild(h('<h2>每天怎麼分配</h2>'));
    view.appendChild(h(
      '<div class="tbl-wrap"><table class="tbl">' +
      '<thead><tr><th>時段</th><th>做什麼</th><th>為什麼</th></tr></thead><tbody>' +
      '<tr><td class="small"><b>0–5 分</b></td><td class="small">間隔複習（到期項目）</td>' +
        '<td class="small">先回想昨天的，記憶才留得住</td></tr>' +
      '<tr><td class="small"><b>5–20 分</b></td><td class="small">新課：規則 → 聽辨 → 拼讀 → 拆音</td>' +
        '<td class="small">先聽後看，先拆後合</td></tr>' +
      '<tr><td class="small"><b>20–28 分</b></td><td class="small">聽寫 + 假字測驗</td>' +
        '<td class="small">聽寫測「聽音能寫」，假字測「真解碼」</td></tr>' +
      '<tr><td class="small"><b>28–30 分</b></td><td class="small">短句朗讀</td>' +
        '<td class="small">把單字能力接到真實閱讀</td></tr>' +
      '</tbody></table></div>'));

    view.appendChild(h('<h2>複習週期</h2>'));
    view.appendChild(h(
      '<div class="card"><p class="small" style="margin:0 0 8px">' +
      '每個項目用 Leitner 盒子排程：答對往後推，答錯拉回來。</p>' +
      '<p class="small muted" style="margin:0">間隔：當天 → 1 天 → 2 天 → 4 天 → 8 天 → 16 天 → 32 天。' +
      '答錯直接退兩格，所以弱項會反覆出現直到穩定。</p></div>'));

    view.appendChild(h('<h2>什麼時候算「真的會了」</h2>'));
    view.appendChild(h(
      '<div class="card"><p class="small" style="margin:0 0 8px">' +
      '不是上完所有課，而是通過 Level 10 的三項實測：</p>' +
      '<p class="small" style="margin:0 0 4px">1. 陌生真字朗讀 ≥ 85%（沒教過的字）</p>' +
      '<p class="small" style="margin:0 0 4px">2. 30 字聽寫 ≥ 80%（含規則字與例外字）</p>' +
      '<p class="small" style="margin:0">3. 多音節假字 ≥ 75%（不可能背過的字）</p></div>'));
  };

  /* ========================================================================
     畫面：設定
     ======================================================================== */
  VIEWS.settings = function () {
    appTitle.textContent = '設定';
    var s = S.get();

    /* 語音 */
    view.appendChild(h('<h2>發音設定</h2>'));
    if (!global.Speech.available) {
      view.appendChild(h('<div class="fb fb--bad"><div class="fb__t">這個瀏覽器不支援語音合成</div>' +
        '<div class="small">請改用 Chrome、Edge 或 Safari。沒有發音，聽辨與聽寫練習無法進行。</div></div>'));
    } else {
      var voices = global.Speech.listVoices();
      var sel = el('select', 'input');
      sel.style.fontFamily = 'var(--font-ui)';
      sel.style.fontSize = '15px';
      sel.style.letterSpacing = 'normal';
      voices.forEach(function (v) {
        var o = document.createElement('option');
        o.value = v.name; o.textContent = v.name + ' (' + v.lang + ')';
        if (v.name === global.Speech.voiceName) o.selected = true;
        sel.appendChild(o);
      });
      var card = el('div', 'card');
      card.appendChild(h('<div class="card__label">英語語音</div>'));
      card.appendChild(sel);
      var test = el('button', 'btn btn--block', '🔊 試聽：The quick brown fox');
      test.style.marginTop = '10px';
      test.onclick = function () { global.Speech.word('The quick brown fox jumps over the lazy dog'); };
      card.appendChild(test);
      sel.onchange = function () { global.Speech.setVoice(sel.value); toast('已切換語音'); };
      view.appendChild(card);

      var rateCard = el('div', 'card');
      rateCard.appendChild(h('<div class="card__label">語速：<span id="rateVal">' +
        global.Speech.rate.toFixed(2) + '</span></div>'));
      var rng = document.createElement('input');
      rng.type = 'range'; rng.min = '0.5'; rng.max = '1.2'; rng.step = '0.05';
      rng.value = String(global.Speech.rate); rng.style.width = '100%';
      rng.oninput = function () {
        global.Speech.setRate(parseFloat(rng.value));
        document.getElementById('rateVal').textContent = parseFloat(rng.value).toFixed(2);
      };
      rateCard.appendChild(rng);
      rateCard.appendChild(h('<p class="small muted" style="margin:8px 0 0">' +
        '初學建議 0.8–0.9。太快聽不出音素，太慢會失真。</p>'));
      view.appendChild(rateCard);
    }

    /* 每日時間 */
    view.appendChild(h('<h2>每天可用時間</h2>'));
    var mCard = el('div', 'card');
    var opts = el('div', 'opts opts--3');
    [15, 25, 40].forEach(function (m) {
      var b = el('button', 'opt' + (s.profile.dailyMinutes === m ? ' is-right' : ''), m + ' 分');
      b.onclick = function () {
        s.profile.dailyMinutes = m; S.save();
        toast('已設定每天 ' + m + ' 分鐘');
        go('settings', null, true);
      };
      opts.appendChild(b);
    });
    mCard.appendChild(opts);
    mCard.appendChild(h('<p class="small muted" style="margin:8px 0 0">' +
      '25 分鐘是最佳點：夠做完一課，又不會累到隔天不想開。</p>'));
    view.appendChild(mCard);

    /* 語音辨識 */
    view.appendChild(h('<h2>朗讀評測</h2>'));
    view.appendChild(h('<div class="card"><p class="small" style="margin:0">' +
      (global.Speech.listenAvailable
        ? '✅ 這個瀏覽器支援語音辨識，朗讀題可以用麥克風自動判斷。<br><span class="muted">辨識不是百分之百準，連續辨識不到才代表某個音真的沒做出來。</span>'
        : '⚠️ 這個瀏覽器不支援語音辨識，朗讀題會用「自評」方式。<br><span class="muted">Chrome 或 Edge 有支援。</span>') +
      '</p></div>'));

    /* 資料 */
    view.appendChild(h('<h2>學習資料</h2>'));
    var dCard = el('div', 'card');
    dCard.appendChild(h('<p class="small" style="margin:0 0 10px">' +
      '所有紀錄只存在這台裝置的瀏覽器裡，不會上傳。換裝置或清瀏覽器資料前記得先匯出。</p>'));
    var row = el('div', 'btn-row');
    var bE = el('button', 'btn btn--sm', '⬇️ 匯出備份');
    bE.onclick = function () {
      var blob = new Blob([S.exportJSON()], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'phonics-progress-' + S.today() + '.json';
      a.click();
      toast('已匯出');
    };
    var bI = el('button', 'btn btn--sm', '⬆️ 匯入備份');
    bI.onclick = function () {
      var f = document.createElement('input');
      f.type = 'file'; f.accept = '.json';
      f.onchange = function () {
        var file = f.files[0]; if (!file) return;
        var r = new FileReader();
        r.onload = function () {
          if (S.importJSON(r.result)) { toast('匯入成功'); go('settings', null, true); }
          else toast('檔案格式不對');
        };
        r.readAsText(file);
      };
      f.click();
    };
    row.appendChild(bE); row.appendChild(bI);
    dCard.appendChild(row);
    view.appendChild(dCard);

    var bR = el('button', 'btn btn--ghost btn--block', '🗑 清除所有紀錄，重新開始');
    bR.style.marginTop = '10px';
    bR.onclick = function () {
      if (confirm('確定要清除全部學習紀錄？這無法復原。建議先匯出備份。')) {
        S.reset(); toast('已清除'); stack = [{ route: 'home' }]; render();
      }
    };
    view.appendChild(bR);

    view.appendChild(h('<hr class="divider">'));
    view.appendChild(h('<p class="small muted center">Phonics 拼讀教室 · 資料存在本機 · ' +
      '課程依 Structured Literacy 與 Science of Reading 原則設計</p>'));
  };

  /* ---------- 啟動 ---------- */
  go('home', null, true);
  global.App = { go: go, back: back, toast: toast, render: render };
})(window);
