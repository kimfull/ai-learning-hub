/* ==========================================================================
   words.js — 單字庫（依 phonics 模式分組）
   每個字都標好 grapheme→phoneme 對應，才能做三件事：
     1. 視覺標色（母音暖色／子音冷色／不發音字母劃掉）
     2. blending 練習（一格一格唸出來再合起來）
     3. segmenting 練習（Elkonin box：一個音一格）

   寫法：W('cake', 'c:k a_e:ay k:k') — 冒號左邊是字母、右邊是音素 id。
   底線 _ 代表該 grapheme 被拆開包住母音（如 a_e = a…e）。
   ========================================================================== */
(function (global) {
  'use strict';

  /** 把 'c:k a:a_ t:t' 解析成 [{g:'c',p:'k'}, ...] */
  function W(word, spec, note) {
    var parts = String(spec).trim().split(/\s+/).map(function (chunk) {
      var i = chunk.lastIndexOf(':');
      var g = chunk.slice(0, i), p = chunk.slice(i + 1);
      return { g: g, p: p === '-' ? null : p };   /* p 為 null = 不發音字母 */
    });
    return { w: word, parts: parts, note: note || null,
             ph: parts.filter(function (x) { return x.p; }).map(function (x) { return x.p; }) };
  }

  function list() {
    return Array.prototype.slice.call(arguments);
  }

  var WORDS = {

    /* ---------- Level 2：CVC 短母音 ---------- */
    cvc_a: list(
      W('cat','c:k a:a_ t:t'), W('hat','h:h a:a_ t:t'), W('bat','b:b a:a_ t:t'),
      W('map','m:m a:a_ p:p'), W('bag','b:b a:a_ g:g'), W('dad','d:d a:a_ d:d'),
      W('ran','r:r a:a_ n:n'), W('sad','s:s a:a_ d:d'), W('jam','j:j a:a_ m:m'),
      W('van','v:v a:a_ n:n'), W('lap','l:l a:a_ p:p'), W('tag','t:t a:a_ g:g'),
      W('nap','n:n a:a_ p:p'), W('wax','w:w a:a_ x:k'), W('gas','g:g a:a_ s:s'),
      W('pan','p:p a:a_ n:n'), W('yam','y:y a:a_ m:m'), W('cab','c:k a:a_ b:b')
    ),
    cvc_i: list(
      W('sit','s:s i:i_ t:t'), W('big','b:b i:i_ g:g'), W('pin','p:p i:i_ n:n'),
      W('lip','l:l i:i_ p:p'), W('dig','d:d i:i_ g:g'), W('win','w:w i:i_ n:n'),
      W('fix','f:f i:i_ x:k'), W('kid','k:k i:i_ d:d'), W('rib','r:r i:i_ b:b'),
      W('zip','z:z i:i_ p:p'), W('hit','h:h i:i_ t:t'), W('mix','m:m i:i_ x:k'),
      W('tin','t:t i:i_ n:n'), W('sip','s:s i:i_ p:p'), W('jig','j:j i:i_ g:g')
    ),
    cvc_o: list(
      W('hot','h:h o:o_ t:t'), W('top','t:t o:o_ p:p'), W('dog','d:d o:o_ g:g'),
      W('box','b:b o:o_ x:k'), W('mop','m:m o:o_ p:p'), W('rod','r:r o:o_ d:d'),
      W('job','j:j o:o_ b:b'), W('log','l:l o:o_ g:g'), W('pot','p:p o:o_ t:t'),
      W('cod','c:k o:o_ d:d'), W('nod','n:n o:o_ d:d'), W('sob','s:s o:o_ b:b'),
      W('fog','f:f o:o_ g:g'), W('hop','h:h o:o_ p:p')
    ),
    cvc_u: list(
      W('cup','c:k u:u_ p:p'), W('bus','b:b u:u_ s:s'), W('sun','s:s u:u_ n:n'),
      W('run','r:r u:u_ n:n'), W('mud','m:m u:u_ d:d'), W('hug','h:h u:u_ g:g'),
      W('nut','n:n u:u_ t:t'), W('bug','b:b u:u_ g:g'), W('cut','c:k u:u_ t:t'),
      W('gum','g:g u:u_ m:m'), W('rug','r:r u:u_ g:g'), W('tub','t:t u:u_ b:b'),
      W('jug','j:j u:u_ g:g'), W('fun','f:f u:u_ n:n')
    ),
    cvc_e: list(
      W('bed','b:b e:e_ d:d'), W('pen','p:p e:e_ n:n'), W('red','r:r e:e_ d:d'),
      W('leg','l:l e:e_ g:g'), W('net','n:n e:e_ t:t'), W('ten','t:t e:e_ n:n'),
      W('web','w:w e:e_ b:b'), W('yes','y:y e:e_ s:s'), W('jet','j:j e:e_ t:t'),
      W('hen','h:h e:e_ n:n'), W('pet','p:p e:e_ t:t'), W('men','m:m e:e_ n:n'),
      W('wet','w:w e:e_ t:t'), W('beg','b:b e:e_ g:g')
    ),

    /* ---------- Level 3：Blends ---------- */
    blends_l: list(
      W('flag','f:f l:l a:a_ g:g'), W('clap','c:k l:l a:a_ p:p'),
      W('blue','b:b l:l ue:oo'), W('glad','g:g l:l a:a_ d:d'),
      W('plan','p:p l:l a:a_ n:n'), W('slip','s:s l:l i:i_ p:p'),
      W('flat','f:f l:l a:a_ t:t'), W('black','b:b l:l a:a_ ck:k'),
      W('clip','c:k l:l i:i_ p:p'), W('plum','p:p l:l u:u_ m:m')
    ),
    blends_r: list(
      W('frog','f:f r:r o:o_ g:g'), W('grab','g:g r:r a:a_ b:b'),
      W('trip','t:t r:r i:i_ p:p'), W('drum','d:d r:r u:u_ m:m'),
      W('crab','c:k r:r a:a_ b:b'), W('brick','b:b r:r i:i_ ck:k'),
      W('press','p:p r:r e:e_ ss:s'), W('grip','g:g r:r i:i_ p:p'),
      W('dress','d:d r:r e:e_ ss:s'), W('truck','t:t r:r u:u_ ck:k')
    ),
    blends_s: list(
      W('stop','s:s t:t o:o_ p:p'), W('spin','s:s p:p i:i_ n:n'),
      W('skin','s:s k:k i:i_ n:n'), W('swim','s:s w:w i:i_ m:m'),
      W('snap','s:s n:n a:a_ p:p'), W('smell','s:s m:m e:e_ ll:l'),
      W('slid','s:s l:l i:i_ d:d'), W('spot','s:s p:p o:o_ t:t'),
      W('star','s:s t:t ar:ar'), W('stamp','s:s t:t a:a_ m:m p:p')
    ),
    blends_3: list(
      W('street','s:s t:t r:r ee:ee t:t'), W('spring','s:s p:p r:r i:i_ ng:ng'),
      W('splash','s:s p:p l:l a:a_ sh:sh'), W('strong','s:s t:t r:r o:aw ng:ng'),
      W('scratch','s:s c:k r:r a:a_ tch:ch'), W('strap','s:s t:t r:r a:a_ p:p'),
      W('spray','s:s p:p r:r ay:ay'), W('split','s:s p:p l:l i:i_ t:t')
    ),
    blends_end: list(
      W('hand','h:h a:a_ n:n d:d'), W('jump','j:j u:u_ m:m p:p'),
      W('lamp','l:l a:a_ m:m p:p'), W('best','b:b e:e_ s:s t:t'),
      W('milk','m:m i:i_ l:l k:k'), W('desk','d:d e:e_ s:s k:k'),
      W('gift','g:g i:i_ f:f t:t'), W('bend','b:b e:e_ n:n d:d'),
      W('cold','c:k o:oh l:l d:d'), W('fast','f:f a:a_ s:s t:t')
    ),

    /* ---------- Level 3：Digraphs ---------- */
    digraphs: list(
      W('ship','sh:sh i:i_ p:p'), W('shop','sh:sh o:o_ p:p'),
      W('chin','ch:ch i:i_ n:n'), W('chat','ch:ch a:a_ t:t'),
      W('think','th:th i:i_ n:ng k:k'), W('bath','b:b a:a_ th:th'),
      W('this','th:dh i:i_ s:s'), W('that','th:dh a:a_ t:t'),
      W('when','wh:w e:e_ n:n'), W('whip','wh:w i:i_ p:p'),
      W('ring','r:r i:i_ ng:ng'), W('sing','s:s i:i_ ng:ng'),
      W('duck','d:d u:u_ ck:k'), W('lock','l:l o:o_ ck:k'),
      W('phone','ph:f o:oh n:n e:-'), W('graph','g:g r:r a:a_ ph:f'),
      W('catch','c:k a:a_ tch:ch'), W('badge','b:b a:a_ dge:j')
    ),

    /* ---------- Level 4：Silent E ---------- */
    silent_e: list(
      W('cake','c:k a:ay k:k e:-'), W('name','n:n a:ay m:m e:-'),
      W('bike','b:b i:iy k:k e:-'), W('time','t:t i:iy m:m e:-'),
      W('home','h:h o:oh m:m e:-'), W('note','n:n o:oh t:t e:-'),
      W('cute','c:k u:y+oo t:t e:-'), W('tube','t:t u:oo b:b e:-'),
      W('five','f:f i:iy v:v e:-'), W('rope','r:r o:oh p:p e:-'),
      W('plane','p:p l:l a:ay n:n e:-'), W('smile','s:s m:m i:iy l:l e:-'),
      W('stone','s:s t:t o:oh n:n e:-'), W('grape','g:g r:r a:ay p:p e:-')
    ),
    /* Silent-e 對照組：同一組字有沒有 e 差很多 */
    silent_e_pairs: [
      ['cap','cape'], ['hat','hate'], ['kit','kite'], ['not','note'],
      ['cub','cube'], ['pin','pine'], ['tap','tape'], ['rid','ride'],
      ['hop','hope'], ['man','mane'], ['fin','fine'], ['rob','robe']
    ],

    /* ---------- Level 5：Vowel Teams ---------- */
    vt_ai_ay: list(
      W('rain','r:r ai:ay n:n'), W('train','t:t r:r ai:ay n:n'),
      W('play','p:p l:l ay:ay'), W('day','d:d ay:ay'),
      W('paint','p:p ai:ay n:n t:t'), W('stay','s:s t:t ay:ay')
    ),
    vt_ee_ea: list(
      W('see','s:s ee:ee'), W('feet','f:f ee:ee t:t'),
      W('eat','ea:ee t:t'), W('team','t:t ea:ee m:m'),
      W('green','g:g r:r ee:ee n:n'), W('beach','b:b ea:ee ch:ch'),
      W('bread','b:b r:r ea:e_ d:d','ea 也可以唸短 e'),
      W('head','h:h ea:e_ d:d','ea 也可以唸短 e')
    ),
    vt_oa_ow: list(
      W('boat','b:b oa:oh t:t'), W('coat','c:k oa:oh t:t'),
      W('snow','s:s n:n ow:oh'), W('grow','g:g r:r ow:oh'),
      W('road','r:r oa:oh d:d'), W('yellow','y:y e:e_ ll:l ow:oh')
    ),
    vt_oo: list(
      W('moon','m:m oo:oo n:n'), W('food','f:f oo:oo d:d'),
      W('book','b:b oo:oo_ k:k'), W('look','l:l oo:oo_ k:k'),
      W('school','s:s ch:k oo:oo l:l'), W('good','g:g oo:oo_ d:d')
    ),
    vt_igh_ie: list(
      W('light','l:l igh:iy t:t'), W('night','n:n igh:iy t:t'),
      W('pie','p:p ie:iy'), W('tie','t:t ie:iy'),
      W('high','h:h igh:iy'), W('field','f:f ie:ee l:l d:d')
    ),

    /* ---------- Level 6：R-controlled + Diphthongs ---------- */
    r_ctrl: list(
      W('car','c:k ar:ar'), W('star','s:s t:t ar:ar'),
      W('bird','b:b ir:er d:d'), W('turn','t:t ur:er n:n'),
      W('her','h:h er:er'), W('corn','c:k or:or n:n'),
      W('for','f:f or:or'), W('chair','ch:ch air:air'),
      W('hear','h:h ear:ear'), W('farm','f:f ar:ar m:m'),
      W('shirt','sh:sh ir:er t:t'), W('north','n:n or:or th:th')
    ),
    diphthongs: list(
      W('boy','b:b oy:oy'), W('coin','c:k oi:oy n:n'),
      W('cow','c:k ow:ow'), W('out','ou:ow t:t'),
      W('house','h:h ou:ow s:s e:-'), W('noise','n:n oi:oy s:z e:-'),
      W('down','d:d ow:ow n:n'), W('join','j:j oi:oy n:n')
    ),

    /* ---------- Level 7：多音節 ---------- */
    multi: list(
      W('rabbit','r:r a:a_ bb:b i:i_ t:t','VC/CV → rab·bit'),
      W('napkin','n:n a:a_ p:p k:k i:i_ n:n','VC/CV → nap·kin'),
      W('tiger','t:t i:iy g:g er:er','V/CV → ti·ger'),
      W('robot','r:r o:oh b:b o:schwa t:t','V/CV → ro·bot'),
      W('table','t:t a:ay b:b le:l','C+le → ta·ble'),
      W('purple','p:p ur:er p:p le:l','C+le → pur·ple'),
      W('basket','b:b a:a_ s:s k:k e:schwa t:t','VC/CV → bas·ket'),
      W('problem','p:p r:r o:o_ b:b le:schwa m:m','prob·lem'),
      W('animal','a:a_ n:n i:schwa m:m a:schwa l:l','an·i·mal'),
      W('computer','c:k o:schwa m:m p:p u:oo t:t er:er','com·pu·ter'),
      W('banana','b:b a:schwa n:n a:a_ n:n a:schwa','ba·na·na — 兩個 a 都是 schwa'),
      W('elephant','e:e_ l:l e:schwa ph:f a:schwa n:n t:t','el·e·phant')
    ),

    /* ---------- 不規則字 / Heart Words（要「用心記」的部分） ---------- */
    heart: [
      { w:'the',   irr:'e',   zh:'e 唸 /ə/' },
      { w:'said',  irr:'ai',  zh:'ai 唸短 e，不是長 a' },
      { w:'was',   irr:'a s', zh:'a 唸 /ʌ/、s 唸 /z/' },
      { w:'of',    irr:'f',   zh:'f 唸 /v/' },
      { w:'one',   irr:'o',   zh:'o 前面多一個 /w/' },
      { w:'two',   irr:'w',   zh:'w 不發音' },
      { w:'have',  irr:'e',   zh:'有 silent e 卻唸短 a' },
      { w:'give',  irr:'e',   zh:'有 silent e 卻唸短 i' },
      { w:'come',  irr:'o',   zh:'o 唸 /ʌ/' },
      { w:'some',  irr:'o',   zh:'o 唸 /ʌ/' },
      { w:'done',  irr:'o',   zh:'o 唸 /ʌ/' },
      { w:'they',  irr:'ey',  zh:'ey 唸長 a' },
      { w:'been',  irr:'ee',  zh:'常唸成短 i' },
      { w:'would', irr:'oul', zh:'l 不發音、ou 唸 /ʊ/' },
      { w:'could', irr:'oul', zh:'同 would' },
      { w:'should',irr:'oul', zh:'同 would' },
      { w:'people',irr:'eo',  zh:'eo 唸長 e' },
      { w:'because',irr:'au', zh:'au 唸 /ɔ/、e 唸 schwa' },
      { w:'friend',irr:'ie',  zh:'ie 唸短 e' },
      { w:'many',  irr:'a',   zh:'a 唸短 e' },
      { w:'any',   irr:'a',   zh:'a 唸短 e' },
      { w:'again', irr:'ai',  zh:'ai 唸短 e' },
      { w:'women', irr:'o',   zh:'o 唸短 i' },
      { w:'answer',irr:'w',   zh:'w 不發音' },
      { w:'island',irr:'s',   zh:'s 不發音' },
      { w:'busy',  irr:'u',   zh:'u 唸短 i' },
      { w:'build', irr:'ui',  zh:'ui 唸短 i' },
      { w:'once',  irr:'o',   zh:'o 前面多一個 /w/' }
    ],

    /* ---------- 假字（Nonsense words）：測「真解碼力」而非記憶 ---------- */
    nonsense: {
      cvc:      ['zib','fom','tid','mub','pag','lem','vus','hib','ked','jop'],
      blend:    ['stell','flon','brup','clest','trisk','glomp','sprad','skint'],
      digraph:  ['shup','chad','thim','whog','ping','lish','ratch','denk'],
      silent_e: ['gade','pite','mune','rone','vike','lope','sabe','fute'],
      vowelteam:['blay','sheem','froat','noost','graif','veech','poad','sight'],
      rctrl:    ['garn','ferp','turst','morb','chirl','sarn','burg','plort'],
      multi:    ['ranmit','soplet','fabtic','dremmish','contrap','mulbern','plabint','tarvest']
    },

    /* ---------- 可解碼句子（每個 Level 一組） ---------- */
    sentences: {
      cvc: [
        'The cat sat on a red mat.',
        'Dad had a big bag of jam.',
        'A bug is on the wet rug.',
        'Tom got a hot pot of ham.',
        'The kid can dig in the mud.'
      ],
      blends: [
        'The frog will jump on the flat rock.',
        'Stop the truck at the last step.',
        'Fred slid fast on the cold pond.',
        'The black bird sat on my desk.'
      ],
      digraphs: [
        'The ship will not sink in the thick fog.',
        'Chad had fish and chips for lunch.',
        'When the bell rings, check the clock.',
        'That shell is on the long path.'
      ],
      silent_e: [
        'Jane rode her bike home in the rain.',
        'Take a note and write the time.',
        'The cute mule ate five grapes.',
        'Mike made a huge cake at home.'
      ],
      vowelteams: [
        'The green boat will float down the stream.',
        'We eat meat and beans each week.',
        'Please keep the book near the coat.',
        'The train may stay in the rain all day.'
      ],
      rctrl: [
        'The bird turned and flew over the dark farm.',
        'Her short skirt got dirt on the corner.',
        'Mark heard a horn near the park.',
        'The nurse wore a purple shirt to work.'
      ],
      multi: [
        'The rabbit ran into the basket in the garden.',
        'My computer problem started this September.',
        'The elephant and the tiger visited the market.',
        'Remember to complete the important project.'
      ],
      advanced: [
        'The scientist described an unusual reaction during the experiment.',
        'Photography requires patience, precision, and constant practice.',
        'Their neighbourhood community organised a magnificent celebration.',
        'Unfortunately, the international negotiation was extremely complicated.'
      ]
    }
  };

  /* ---------- 工具函式 ---------- */
  var Words = {
    all: WORDS,
    W: W,

    /** 取某組單字 */
    group: function (name) { return WORDS[name] || []; },

    /** 把幾組合併 */
    merge: function () {
      var out = [];
      for (var i = 0; i < arguments.length; i++) {
        out = out.concat(WORDS[arguments[i]] || []);
      }
      return out;
    },

    /** 隨機抽 n 個（不重複） */
    pick: function (arr, n) {
      var a = arr.slice(), out = [];
      while (a.length && out.length < n) out.push(a.splice(Math.floor(Math.random() * a.length), 1)[0]);
      return out;
    },

    /** 洗牌 */
    shuffle: function (arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    },

    /** 產生標色 HTML：母音暖色、子音冷色、不發音字母劃掉 */
    colorize: function (item) {
      if (!item || !item.parts) return item ? String(item.w || item) : '';
      return item.parts.map(function (pt) {
        if (!pt.p) return '<span class="g-s">' + pt.g + '</span>';
        var ph = global.PHONEMES.get(pt.p.split('+')[0]);
        var cls = ph && ph.type === 'v' ? 'g-v' : 'g-c';
        if (ph && /^(ar|or|er|air|ear)$/.test(ph.id)) cls = 'g-r';
        /* a_e 這種分開的 grapheme：字母原樣顯示 */
        return '<span class="' + cls + '">' + pt.g + '</span>';
      }).join('');
    },

    /** 取音素物件陣列（給 blending 播放） */
    phonemesOf: function (item) {
      return (item.ph || []).map(function (id) {
        return global.PHONEMES.get(id.split('+')[0]) || { tts: id, sym: id };
      });
    }
  };

  global.WORDS = WORDS;
  global.Words = Words;
})(window);
