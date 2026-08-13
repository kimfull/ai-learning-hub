/* ==========================================================================
   mouth.js — 口腔剖面圖（自製，不依賴外站）

   為什麼要自己畫：中文母語者做不出 /θ/ /v/ /r/ 的主因不是「不夠努力」，
   而是不知道舌頭該擺哪裡。純文字描述（「舌尖抵上齒齦」）對沒學過語音學的人
   幾乎無效——他不知道上齒齦在哪。一張圖就解決了。

   圖是參數化畫出來的，不是 44 張手繪圖：
     place  = 阻塞或接近的位置（雙唇、唇齒、齒間、齒齦…）
     manner = 氣流方式（爆破、摩擦、鼻音、流音…）
     lips   = 唇形
     voiced = 聲帶振不振動
   母音另外用 tongueX / tongueY 表示舌位高低前後。
   ========================================================================== */
(function (global) {
  'use strict';

  /* 發音位置 → 圖上的座標（面向左的側剖面）與中文名稱 */
  var PLACE = {
    bilabial:     { x: 46,  y: 128, zh: '雙唇' },
    labiodental:  { x: 50,  y: 134, zh: '上齒咬下唇' },
    dental:       { x: 60,  y: 126, zh: '舌尖在上下齒之間' },
    alveolar:     { x: 76,  y: 116, zh: '舌尖抵上齒齦' },
    postalveolar: { x: 96,  y: 110, zh: '舌面靠近硬顎前段' },
    palatal:      { x: 116, y: 106, zh: '舌面貼近硬顎' },
    velar:        { x: 150, y: 110, zh: '舌根抵軟顎' },
    glottal:      { x: 196, y: 156, zh: '聲門（喉嚨）' },
    rhotic:       { x: 104, y: 122, zh: '舌尖捲起但不接觸' }
  };

  var MANNER_ZH = {
    stop:      '完全擋住再放開',
    fricative: '留一條細縫讓氣流摩擦通過',
    affricate: '先擋住，再放成摩擦',
    nasal:     '嘴巴擋住，氣流改走鼻腔',
    lateral:   '舌尖抵住，氣流從舌頭兩側出去',
    rhotic:    '舌尖捲起，不碰到任何地方',
    glide:     '從這個位置快速滑向下一個音',
    vowel:     '口腔完全打開，氣流不受阻'
  };

  var LIPS_ZH = { spread: '嘴角向兩側拉開', neutral: '嘴唇自然放鬆', rounded: '嘴唇噘成圓形' };

  /* ---- 44 個音素的發音參數 ---- */
  var ART = {
    /* 子音 */
    p:  { place:'bilabial',    manner:'stop',      voiced:false, lips:'neutral' },
    b:  { place:'bilabial',    manner:'stop',      voiced:true,  lips:'neutral' },
    t:  { place:'alveolar',    manner:'stop',      voiced:false, lips:'neutral' },
    d:  { place:'alveolar',    manner:'stop',      voiced:true,  lips:'neutral' },
    k:  { place:'velar',       manner:'stop',      voiced:false, lips:'neutral' },
    g:  { place:'velar',       manner:'stop',      voiced:true,  lips:'neutral' },
    f:  { place:'labiodental', manner:'fricative', voiced:false, lips:'neutral' },
    v:  { place:'labiodental', manner:'fricative', voiced:true,  lips:'neutral' },
    th: { place:'dental',      manner:'fricative', voiced:false, lips:'neutral' },
    dh: { place:'dental',      manner:'fricative', voiced:true,  lips:'neutral' },
    s:  { place:'alveolar',    manner:'fricative', voiced:false, lips:'spread' },
    z:  { place:'alveolar',    manner:'fricative', voiced:true,  lips:'spread' },
    sh: { place:'postalveolar',manner:'fricative', voiced:false, lips:'rounded' },
    zh: { place:'postalveolar',manner:'fricative', voiced:true,  lips:'rounded' },
    ch: { place:'postalveolar',manner:'affricate', voiced:false, lips:'rounded' },
    j:  { place:'postalveolar',manner:'affricate', voiced:true,  lips:'rounded' },
    m:  { place:'bilabial',    manner:'nasal',     voiced:true,  lips:'neutral' },
    n:  { place:'alveolar',    manner:'nasal',     voiced:true,  lips:'neutral' },
    ng: { place:'velar',       manner:'nasal',     voiced:true,  lips:'neutral' },
    l:  { place:'alveolar',    manner:'lateral',   voiced:true,  lips:'neutral' },
    r:  { place:'rhotic',      manner:'rhotic',    voiced:true,  lips:'rounded' },
    w:  { place:'bilabial',    manner:'glide',     voiced:true,  lips:'rounded' },
    y:  { place:'palatal',     manner:'glide',     voiced:true,  lips:'spread' },
    h:  { place:'glottal',     manner:'fricative', voiced:false, lips:'neutral' },

    /* 母音：tongueX 0=最前 1=最後；tongueY 0=最高 1=最低 */
    a_:    { manner:'vowel', voiced:true, lips:'spread',  tongueX:.20, tongueY:.85 },
    e_:    { manner:'vowel', voiced:true, lips:'spread',  tongueX:.22, tongueY:.55 },
    i_:    { manner:'vowel', voiced:true, lips:'neutral', tongueX:.25, tongueY:.28 },
    o_:    { manner:'vowel', voiced:true, lips:'neutral', tongueX:.85, tongueY:.90 },
    u_:    { manner:'vowel', voiced:true, lips:'neutral', tongueX:.55, tongueY:.55 },
    oo_:   { manner:'vowel', voiced:true, lips:'rounded', tongueX:.75, tongueY:.30 },
    ay:    { manner:'vowel', voiced:true, lips:'spread',  tongueX:.22, tongueY:.45, glideTo:{x:.28,y:.25} },
    ee:    { manner:'vowel', voiced:true, lips:'spread',  tongueX:.18, tongueY:.15 },
    iy:    { manner:'vowel', voiced:true, lips:'neutral', tongueX:.60, tongueY:.90, glideTo:{x:.28,y:.25} },
    oh:    { manner:'vowel', voiced:true, lips:'rounded', tongueX:.80, tongueY:.50, glideTo:{x:.85,y:.28} },
    oo:    { manner:'vowel', voiced:true, lips:'rounded', tongueX:.88, tongueY:.15 },
    aw:    { manner:'vowel', voiced:true, lips:'rounded', tongueX:.85, tongueY:.75 },
    oy:    { manner:'vowel', voiced:true, lips:'rounded', tongueX:.82, tongueY:.72, glideTo:{x:.28,y:.25} },
    ow:    { manner:'vowel', voiced:true, lips:'neutral', tongueX:.55, tongueY:.90, glideTo:{x:.80,y:.30} },
    schwa: { manner:'vowel', voiced:true, lips:'neutral', tongueX:.50, tongueY:.50 },
    ar:    { manner:'vowel', voiced:true, lips:'neutral', tongueX:.85, tongueY:.88, rColor:true },
    or:    { manner:'vowel', voiced:true, lips:'rounded', tongueX:.85, tongueY:.62, rColor:true },
    er:    { manner:'vowel', voiced:true, lips:'rounded', tongueX:.55, tongueY:.45, rColor:true },
    air:   { manner:'vowel', voiced:true, lips:'neutral', tongueX:.25, tongueY:.55, rColor:true },
    ear:   { manner:'vowel', voiced:true, lips:'neutral', tongueX:.25, tongueY:.28, rColor:true }
  };

  /* 舌位參數 → 圖上座標。口腔內舌頭活動範圍大致是這個矩形 */
  function tonguePos(tx, ty) {
    return { x: 66 + tx * 92, y: 108 + ty * 46 };
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /**
   * 畫出一個音素的口腔剖面圖。
   * @param {string} id phonemes.js 的音素 id
   * @returns {string} SVG 字串（顏色用 CSS 變數，深淺色模式都能看）
   */
  function svg(id) {
    var a = ART[id];
    if (!a) return '';
    var isVowel = a.manner === 'vowel';

    /* 舌頭的位置 */
    var tip, body;
    if (isVowel) {
      body = tonguePos(a.tongueX, a.tongueY);
      tip = { x: 62, y: body.y + 12 };
    } else {
      var p = PLACE[a.place] || PLACE.alveolar;
      if (a.place === 'bilabial' || a.place === 'labiodental' || a.place === 'glottal') {
        /* 這幾個音舌頭不參與，放中性位置 */
        body = tonguePos(0.5, 0.62); tip = { x: 64, y: 140 };
      } else if (a.place === 'velar') {
        body = { x: p.x - 8, y: p.y + 8 }; tip = { x: 64, y: 146 };
      } else {
        body = { x: p.x + 14, y: p.y + 24 }; tip = { x: p.x, y: p.y + 4 };
      }
    }

    /* 唇形：上下唇的開口大小與前突程度 */
    var lipGap = a.lips === 'rounded' ? 9 : (a.lips === 'spread' ? 7 : 11);
    var lipOut = a.lips === 'rounded' ? 7 : 0;
    if (isVowel) lipGap = 6 + a.tongueY * 14;

    var contact = !isVowel && a.manner !== 'rhotic' && a.manner !== 'glide' && a.place !== 'glottal';
    var pl = PLACE[a.place];

    var parts = [];

    parts.push(
      '<svg class="mouth" viewBox="0 0 236 200" xmlns="http://www.w3.org/2000/svg" ' +
      'role="img" aria-label="口腔剖面圖">');

    /* 鼻腔（鼻音時會亮起來） */
    parts.push(
      '<path d="M36 96 Q60 62 118 64 Q168 66 186 92" fill="none" ' +
      'stroke="' + (a.manner === 'nasal' ? 'var(--vowel)' : 'var(--line)') + '" ' +
      'stroke-width="' + (a.manner === 'nasal' ? 3 : 2) + '"/>');
    if (a.manner === 'nasal') {
      parts.push('<text x="112" y="58" class="mouth__tag" fill="var(--vowel)">氣流走鼻腔</text>');
    }

    /* 上顎（硬顎 → 軟顎） */
    parts.push('<path d="M40 ' + (128 - lipGap / 2 - lipOut * 0) + ' L58 116 Q100 96 150 108 Q176 118 190 146" ' +
      'fill="none" stroke="var(--text-2)" stroke-width="2.5" stroke-linecap="round"/>');

    /* 上齒 */
    parts.push('<path d="M56 114 l0 12" stroke="var(--text-2)" stroke-width="3" stroke-linecap="round"/>');

    /* 下顎與下齒 */
    var jawY = 148 + lipGap;
    parts.push('<path d="M40 ' + jawY + ' L60 ' + jawY + ' Q120 ' + (jawY + 26) + ' 190 ' + (jawY + 4) + '" ' +
      'fill="none" stroke="var(--text-2)" stroke-width="2.5" stroke-linecap="round"/>');
    parts.push('<path d="M58 ' + jawY + ' l0 -11" stroke="var(--text-2)" stroke-width="3" stroke-linecap="round"/>');

    /* 咽壁 */
    parts.push('<path d="M190 146 Q198 168 194 190" fill="none" stroke="var(--text-2)" stroke-width="2.5"/>');

    /* 舌頭 */
    parts.push('<path d="M' + tip.x + ' ' + tip.y +
      ' Q' + body.x + ' ' + body.y + ' ' + (body.x + 46) + ' ' + (jawY + 8) +
      ' Q' + (body.x + 10) + ' ' + (jawY + 22) + ' ' + tip.x + ' ' + (tip.y + 18) + ' Z" ' +
      'fill="var(--cons-bg)" stroke="var(--cons)" stroke-width="2.5" stroke-linejoin="round"/>');

    /* 雙母音：第二個舌位用虛線＋箭頭 */
    if (a.glideTo) {
      var g = tonguePos(a.glideTo.x, a.glideTo.y);
      parts.push('<circle cx="' + g.x + '" cy="' + g.y + '" r="7" fill="none" ' +
        'stroke="var(--vowel)" stroke-width="2.5" stroke-dasharray="4 3"/>');
      parts.push('<path d="M' + body.x + ' ' + body.y + ' L' + g.x + ' ' + g.y + '" ' +
        'stroke="var(--vowel)" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#mArrow)"/>');
      parts.push('<text x="' + (g.x + 12) + '" y="' + (g.y - 6) + '" class="mouth__tag" fill="var(--vowel)">滑到這裡</text>');
    }

    /* 接觸點 */
    if (contact && pl) {
      parts.push('<circle cx="' + pl.x + '" cy="' + pl.y + '" r="8" fill="var(--bad)" opacity=".22"/>');
      parts.push('<circle cx="' + pl.x + '" cy="' + pl.y + '" r="4" fill="var(--bad)"/>');
    }
    if (a.manner === 'rhotic') {
      parts.push('<circle cx="' + PLACE.rhotic.x + '" cy="' + PLACE.rhotic.y + '" r="9" fill="none" ' +
        'stroke="var(--bad)" stroke-width="2" stroke-dasharray="3 3"/>');
      parts.push('<text x="' + (PLACE.rhotic.x + 14) + '" y="' + (PLACE.rhotic.y - 4) + '" ' +
        'class="mouth__tag" fill="var(--bad)">不要碰到</text>');
    }

    /* 嘴唇 */
    var lipStroke = (a.place === 'bilabial' || a.place === 'labiodental') ? 'var(--bad)' : 'var(--text-2)';
    var lipW = (a.place === 'bilabial' || a.place === 'labiodental') ? 4 : 2.5;
    parts.push('<path d="M40 ' + (128 - lipGap / 2) + ' q' + (-8 - lipOut) + ' ' + (lipGap / 2) +
      ' 0 ' + lipGap + '" fill="none" stroke="' + lipStroke + '" stroke-width="' + lipW + '" stroke-linecap="round"/>');
    if (a.place === 'labiodental') {
      parts.push('<path d="M52 122 l-6 10" stroke="var(--bad)" stroke-width="3" stroke-linecap="round"/>');
    }

    /* 氣流 */
    if (a.manner !== 'nasal') {
      var flowY = 128 + (isVowel ? (a.tongueY - .5) * 6 : 0);
      parts.push('<path d="M120 ' + flowY + ' L44 ' + flowY + '" stroke="var(--ok)" stroke-width="2" ' +
        'stroke-dasharray="' + (a.manner === 'fricative' || a.manner === 'affricate' ? '3 3' : '8 4') +
        '" marker-end="url(#mArrowG)" opacity=".8"/>');
    }

    /* 聲帶 */
    parts.push('<g transform="translate(186,176)">');
    if (a.voiced) {
      parts.push('<path d="M0 0 q4 -6 8 0 q4 6 8 0 q4 -6 8 0" fill="none" stroke="var(--ok)" stroke-width="2.5"/>');
      parts.push('<text x="0" y="16" class="mouth__tag" fill="var(--ok)">聲帶振動</text>');
    } else {
      parts.push('<path d="M0 0 l24 0" stroke="var(--text-2)" stroke-width="2.5" stroke-dasharray="3 3"/>');
      parts.push('<text x="0" y="16" class="mouth__tag" fill="var(--text-2)">聲帶不動</text>');
    }
    parts.push('</g>');

    /* 箭頭定義 */
    parts.push(
      '<defs>' +
      '<marker id="mArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">' +
      '<path d="M0 0 L10 5 L0 10 z" fill="var(--vowel)"/></marker>' +
      '<marker id="mArrowG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">' +
      '<path d="M0 0 L10 5 L0 10 z" fill="var(--ok)"/></marker>' +
      '</defs>');

    parts.push('</svg>');
    return parts.join('');
  }

  /** 這個音的「怎麼做」逐點說明，配合圖一起看 */
  function steps(id) {
    var a = ART[id];
    if (!a) return [];
    var out = [];
    if (a.manner === 'vowel') {
      var hi = a.tongueY < .35 ? '高' : (a.tongueY > .7 ? '低（下巴放下來）' : '中');
      var fr = a.tongueX < .4 ? '前' : (a.tongueX > .65 ? '後' : '中');
      out.push('舌頭位置：' + fr + '、' + hi);
      out.push(LIPS_ZH[a.lips]);
      if (a.glideTo) out.push('這是滑音——舌頭要從起點滑到終點，不能停在原地');
      if (a.rColor) out.push('接著把舌頭往後捲，做出 r 的尾巴');
    } else {
      if (PLACE[a.place]) out.push('位置：' + PLACE[a.place].zh);
      out.push('方式：' + (MANNER_ZH[a.manner] || ''));
      out.push(LIPS_ZH[a.lips]);
    }
    out.push(a.voiced ? '摸喉嚨：要感覺到振動' : '摸喉嚨：不該有振動，只有氣');
    return out;
  }

  global.Mouth = {
    svg: svg,
    steps: steps,
    has: function (id) { return !!ART[id]; },
    ART: ART
  };
})(window);
