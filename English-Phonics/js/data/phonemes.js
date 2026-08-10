/* ==========================================================================
   phonemes.js — 英語 44 音素表（美式 General American）
   每個音素都標註「中文母語者的典型錯誤」，這是整套課程的診斷基礎。

   欄位說明：
     id        內部識別（也是 mastery key 的一部分）
     sym       IPA
     ph        phonics 常用標記（老師板書寫法）
     type      'c' 子音 / 'v' 母音
     key       關鍵字（keyword approach：用例字帶出音）
     iso       給 TTS 唸「孤立音」的近似拼法
     graph     常見拼法（字母組合）
     ex        例字
     zh        中文發音要領（怎麼做出這個音）
     trap      中文母語者的典型錯誤
     confuse   最容易混淆的音素 id
     hard      1=容易 2=中等 3=中文母語者的高難度
   ========================================================================== */
(function (global) {
  'use strict';

  var P = [

  /* ===================== 子音 Consonants (24) ===================== */
  { id:'p', sym:'/p/', ph:'p', type:'c', key:'pig', iso:'puh', graph:['p','pp'],
    ex:['pig','pen','top','happy','stop'],
    zh:'雙唇閉緊再爆開，聲帶不振動，送氣。像注音 ㄆ。',
    trap:'字尾的 p 常被吃掉（top 唸成 to）。英文的尾子音一定要做出來。',
    confuse:['b'], hard:1 },

  { id:'b', sym:'/b/', ph:'b', type:'c', key:'bat', iso:'buh', graph:['b','bb'],
    ex:['bat','bed','rub','rabbit','job'],
    zh:'雙唇閉緊再爆開，聲帶要振動（喉嚨有嗡嗡感），不送氣。',
    trap:'中文的 ㄅ 是「不送氣清音」，不是濁音。你唸 b 時喉嚨多半沒振動，所以 cab 聽起來像 cap。摸喉嚨練習：/b/ 要震、/p/ 不震。',
    confuse:['p'], hard:3 },

  { id:'t', sym:'/t/', ph:'t', type:'c', key:'top', iso:'tuh', graph:['t','tt','ed'],
    ex:['top','ten','cat','letter','sit'],
    zh:'舌尖抵上齒齦，放開送氣，聲帶不振動。像注音 ㄊ。',
    trap:'美式在母音之間的 t 會變成快閃音（water 像 wader），初期先唸清楚就好。',
    confuse:['d'], hard:1 },

  { id:'d', sym:'/d/', ph:'d', type:'c', key:'dog', iso:'duh', graph:['d','dd','ed'],
    ex:['dog','dad','red','ladder','bed'],
    zh:'舌尖抵上齒齦，放開，聲帶振動、不送氣。',
    trap:'同 /b/：中文 ㄉ 是不送氣清音。bed 容易唸成 bet。',
    confuse:['t'], hard:3 },

  { id:'k', sym:'/k/', ph:'k', type:'c', key:'cat', iso:'kuh', graph:['c','k','ck','ch','q'],
    ex:['cat','kid','duck','school','back'],
    zh:'舌根抵住軟顎再放開，送氣，聲帶不振動。像注音 ㄎ。',
    trap:'尾音容易消失（back 唸成 ba）。',
    confuse:['g'], hard:1 },

  { id:'g', sym:'/g/', ph:'g', type:'c', key:'go', iso:'guh', graph:['g','gg','gu'],
    ex:['go','game','bag','egg','guess'],
    zh:'舌根抵軟顎再放開，聲帶振動、不送氣。',
    trap:'中文 ㄍ 是不送氣清音，bag 常唸成 back。',
    confuse:['k'], hard:3 },

  { id:'f', sym:'/f/', ph:'f', type:'c', key:'fan', iso:'fff', graph:['f','ff','ph','gh'],
    ex:['fan','fish','off','phone','laugh'],
    zh:'上排牙齒輕咬下嘴唇，吹氣。可以拉長：ffff。',
    trap:'中文的 ㄈ 很接近，但別把它唸成 ㄏ（who 的音）。',
    confuse:['v','h'], hard:1 },

  { id:'v', sym:'/v/', ph:'v', type:'c', key:'van', iso:'vvv', graph:['v','ve'],
    ex:['van','very','love','give','five'],
    zh:'上齒輕咬下唇，吹氣同時聲帶振動。可以拉長：vvvv。',
    trap:'中文沒有這個音。你多半會唸成 /w/（very→wery）或 ㄨ。牙齒一定要碰到嘴唇。',
    confuse:['w','f','b'], hard:3 },

  { id:'th', sym:'/θ/', ph:'th（無聲）', type:'c', key:'think', iso:'thhh', graph:['th'],
    ex:['think','three','bath','math','tooth'],
    zh:'舌尖輕輕伸出來夾在上下齒之間，吹氣，聲帶不振動。',
    trap:'中文完全沒有。你會唸成 /s/（think→sink）或 /f/。舌頭必須看得到。',
    confuse:['s','f','dh'], hard:3 },

  { id:'dh', sym:'/ð/', ph:'th（有聲）', type:'c', key:'this', iso:'thuh', graph:['th'],
    ex:['this','that','the','mother','breathe'],
    zh:'舌尖伸出齒間，吹氣＋聲帶振動。',
    trap:'常被唸成 /d/ 或 /z/（this→dis / zis）。這是英文最高頻的音之一，一定要練。',
    confuse:['d','z','th'], hard:3 },

  { id:'s', sym:'/s/', ph:'s', type:'c', key:'sun', iso:'sss', graph:['s','ss','c','ce','se'],
    ex:['sun','sit','bus','city','miss'],
    zh:'舌尖靠近上齒齦，中間留細縫吹氣。可拉長：ssss。像注音 ㄙ。',
    trap:'相對簡單，但 s / th 要分清楚。',
    confuse:['th','z','sh'], hard:1 },

  { id:'z', sym:'/z/', ph:'z', type:'c', key:'zip', iso:'zzz', graph:['z','zz','s','se'],
    ex:['zip','zoo','is','busy','buzz','dogs'],
    zh:'和 /s/ 一樣的口型，但聲帶要振動，像蜜蜂 zzzz。',
    trap:'中文沒有這個音。ㄗ 是 /ts/，不是 /z/。is、was、dogs 的字尾其實都是 /z/，你大概都唸成 /s/。',
    confuse:['s','dh'], hard:3 },

  { id:'sh', sym:'/ʃ/', ph:'sh', type:'c', key:'ship', iso:'shhh', graph:['sh','ti','ci','ss','ch'],
    ex:['ship','shoe','fish','nation','sure'],
    zh:'嘴唇稍微噘起，舌面靠近硬顎吹氣，像叫人安靜的 shhh。',
    trap:'中文的 ㄒ（西）和 ㄕ（是）都不完全一樣。ㄒ 太前面、ㄕ 舌頭太捲。',
    confuse:['s','zh','ch'], hard:2 },

  { id:'zh', sym:'/ʒ/', ph:'zh', type:'c', key:'measure', iso:'zhuh', graph:['s','si','g','ge'],
    ex:['measure','vision','beige','garage','usual'],
    zh:'/ʃ/ 的有聲版：同樣口型，聲帶振動。',
    trap:'中文完全沒有，而且英文裡出現次數少。多半會唸成 /ʃ/ 或 /dʒ/。',
    confuse:['sh','j'], hard:3 },

  { id:'ch', sym:'/tʃ/', ph:'ch', type:'c', key:'chip', iso:'chuh', graph:['ch','tch','t'],
    ex:['chip','chair','much','watch','picture'],
    zh:'先 /t/ 再 /ʃ/，黏成一個音。像注音 ㄑ 和 ㄔ 之間。',
    trap:'中文母語者通常沒問題，但要注意 ch 和 sh 的差別（chip / ship）。',
    confuse:['sh','j'], hard:2 },

  { id:'j', sym:'/dʒ/', ph:'j', type:'c', key:'jam', iso:'juh', graph:['j','g','ge','dge'],
    ex:['jam','jump','age','bridge','giant'],
    zh:'/tʃ/ 的有聲版：/d/ + /ʒ/，聲帶要振動。',
    trap:'常被唸成 /tʃ/（jeep→cheap）或 ㄐ。要有喉嚨振動。',
    confuse:['ch','zh','y'], hard:3 },

  { id:'m', sym:'/m/', ph:'m', type:'c', key:'map', iso:'mmm', graph:['m','mm','mb'],
    ex:['map','me','him','summer','comb'],
    zh:'雙唇閉住，氣從鼻子出來，可拉長 mmmm。',
    trap:'字尾 m 要真的把嘴閉起來（time 不能唸成 tie）。',
    confuse:['n'], hard:1 },

  { id:'n', sym:'/n/', ph:'n', type:'c', key:'net', iso:'nnn', graph:['n','nn','kn','gn'],
    ex:['net','no','sun','dinner','know'],
    zh:'舌尖抵上齒齦，氣從鼻子出來，可拉長 nnnn。',
    trap:'部分中文口音 n / l 不分（南方口音）。sun / sul 要能分辨。',
    confuse:['l','ng','m'], hard:2 },

  { id:'ng', sym:'/ŋ/', ph:'ng', type:'c', key:'sing', iso:'ngng', graph:['ng','n'],
    ex:['sing','king','long','think','bank'],
    zh:'舌根抵軟顎，氣從鼻子出來。就是注音的 ㄥ 尾巴。',
    trap:'這個音中文有（ㄥ），相對簡單。但 sin / sing 要分清楚。',
    confuse:['n'], hard:1 },

  { id:'l', sym:'/l/', ph:'l', type:'c', key:'leg', iso:'lll', graph:['l','ll','le'],
    ex:['leg','look','ball','yellow','apple'],
    zh:'舌尖抵上齒齦，氣從舌頭兩側出來。字尾的 l（dark L）舌根要往後縮，像「歐」。',
    trap:'字尾 l 最難：ball、full、well。中文母語者常整個省略或唸成「歐」。',
    confuse:['r','n'], hard:3 },

  { id:'r', sym:'/r/', ph:'r', type:'c', key:'red', iso:'rrr', graph:['r','rr','wr'],
    ex:['red','run','carrot','write','very'],
    zh:'舌頭往後捲但不碰到上顎，嘴唇稍微噘。英文的 r 舌頭不振動。',
    trap:'中文的 ㄖ（日）舌位不同，而且 r / l 是最經典的難點（rice / lice）。',
    confuse:['l','w'], hard:3 },

  { id:'w', sym:'/w/', ph:'w', type:'c', key:'wet', iso:'wuh', graph:['w','wh','u'],
    ex:['wet','win','away','queen','swim'],
    zh:'嘴唇噘圓再快速放開，像注音 ㄨ 滑到下一個音。',
    trap:'和 /v/ 混淆是最大問題（wine / vine）。',
    confuse:['v'], hard:2 },

  { id:'y', sym:'/j/', ph:'y', type:'c', key:'yes', iso:'yuh', graph:['y','i','u'],
    ex:['yes','you','yellow','onion','cute'],
    zh:'舌面靠近硬顎再放開，像注音 ㄧ 滑到下一個音。',
    trap:'注意不要和 /dʒ/ 混（yell / jell）。',
    confuse:['j'], hard:1 },

  { id:'h', sym:'/h/', ph:'h', type:'c', key:'hat', iso:'hhh', graph:['h','wh'],
    ex:['hat','he','behind','who','hope'],
    zh:'單純從喉嚨送氣，舌頭不動。比注音 ㄏ 更輕、更空。',
    trap:'ㄏ 有摩擦（喉嚨後面），英文 /h/ 只是吐氣。',
    confuse:['f'], hard:1 },

  /* ===================== 短母音 Short Vowels (6) ===================== */
  { id:'a_', sym:'/æ/', ph:'ă (short a)', type:'v', key:'cat', iso:'aaa', graph:['a'],
    ex:['cat','hat','map','bad','apple'],
    zh:'嘴巴張大、往兩邊咧開，舌頭放低放前。介於「ㄟ」和「ㄚ」之間。',
    trap:'中文沒有這個音。你多半唸成 ㄟ（bad→bed）或 ㄚ（bad→ba-d）。下巴要真的往下掉。',
    confuse:['e_','o_','u_'], hard:3 },

  { id:'e_', sym:'/ɛ/', ph:'ĕ (short e)', type:'v', key:'bed', iso:'ehh', graph:['e','ea'],
    ex:['bed','pen','red','head','egg'],
    zh:'嘴巴半開，舌頭放前中位。像注音 ㄝ。',
    trap:'和 /æ/ 混（bed / bad）。/ɛ/ 嘴開得比 /æ/ 小。',
    confuse:['a_','i_'], hard:3 },

  { id:'i_', sym:'/ɪ/', ph:'ĭ (short i)', type:'v', key:'sit', iso:'ihh', graph:['i','y'],
    ex:['sit','big','fish','gym','win'],
    zh:'嘴巴微開、放鬆，舌頭高前但比 /iː/ 鬆。像很短很鬆的「一」。',
    trap:'和長音 /iː/ 混（sit / seat、ship / sheep）。中文的「一」是緊的長音，要刻意放鬆變短。',
    confuse:['ee','e_'], hard:3 },

  { id:'o_', sym:'/ɑ/', ph:'ŏ (short o)', type:'v', key:'hot', iso:'ahh', graph:['o','a'],
    ex:['hot','top','box','father','wash'],
    zh:'嘴巴張大、舌頭放低放後。像醫生看喉嚨的「啊」。',
    trap:'常和 /ʌ/ 混（cop / cup）。/ɑ/ 嘴開得比較大。',
    confuse:['u_','aw'], hard:2 },

  { id:'u_', sym:'/ʌ/', ph:'ŭ (short u)', type:'v', key:'cup', iso:'uhh', graph:['u','o','ou'],
    ex:['cup','bus','sun','love','young'],
    zh:'嘴巴微開放鬆，舌頭中央。像很短的「ㄜ」。',
    trap:'和 /ɑ/、schwa 混。這個音很短、很鬆，不要用力。',
    confuse:['o_','schwa'], hard:2 },

  { id:'oo_', sym:'/ʊ/', ph:'ŏŏ (short oo)', type:'v', key:'book', iso:'uu', graph:['oo','u','ou'],
    ex:['book','look','put','could','full'],
    zh:'嘴唇微圓、放鬆，舌頭高後但不緊。',
    trap:'和長音 /uː/ 混（full / fool、pull / pool）。這個音很短。',
    confuse:['oo'], hard:3 },

  /* ===================== 長母音 Long Vowels (5) ===================== */
  { id:'ay', sym:'/eɪ/', ph:'ā (long a)', type:'v', key:'cake', iso:'ay', graph:['a_e','ai','ay','ey','ea','eigh'],
    ex:['cake','rain','play','they','eight'],
    zh:'從 /ɛ/ 滑到 /ɪ/，是一個滑音。像注音 ㄟ。',
    trap:'記得它是滑動的，不是單一個音。',
    confuse:['e_'], hard:1 },

  { id:'ee', sym:'/iː/', ph:'ē (long e)', type:'v', key:'see', iso:'eee', graph:['e_e','ee','ea','y','ie','e'],
    ex:['see','eat','happy','field','me'],
    zh:'嘴唇往兩邊拉開，舌頭高前且緊。像拉長的「一」。',
    trap:'和 /ɪ/ 混（sheep / ship）。這個要長要緊。',
    confuse:['i_'], hard:2 },

  { id:'iy', sym:'/aɪ/', ph:'ī (long i)', type:'v', key:'bike', iso:'eye', graph:['i_e','igh','y','ie','i'],
    ex:['bike','light','my','pie','find'],
    zh:'從 /ɑ/ 滑到 /ɪ/。像注音 ㄞ。',
    trap:'相對簡單。注意 y 在字尾當長 i（my、cry）還是長 e（happy）。',
    confuse:['ee'], hard:1 },

  { id:'oh', sym:'/oʊ/', ph:'ō (long o)', type:'v', key:'boat', iso:'ohh', graph:['o_e','oa','ow','oe','o'],
    ex:['boat','go','snow','toe','old'],
    zh:'從 /o/ 滑到 /ʊ/，嘴唇由半圓收成小圓。像注音 ㄡ。',
    trap:'不要唸成單一個「ㄛ」，要有收尾的圓唇。',
    confuse:['aw','o_'], hard:2 },

  { id:'oo', sym:'/uː/', ph:'ū (long oo)', type:'v', key:'moon', iso:'ooo', graph:['u_e','oo','ew','ue','ui','o'],
    ex:['moon','blue','new','soup','do'],
    zh:'嘴唇噘成小圓，舌頭高後且緊。像拉長的「ㄨ」。',
    trap:'和 /ʊ/ 混（fool / full）。這個要長要緊要圓。',
    confuse:['oo_'], hard:2 },

  /* ===================== 其他母音 ===================== */
  { id:'aw', sym:'/ɔ/', ph:'aw', type:'v', key:'saw', iso:'aww', graph:['aw','au','al','augh','ough'],
    ex:['saw','law','because','talk','caught'],
    zh:'嘴巴張開並稍微圓唇，舌頭放低後。介於 /ɑ/ 和 /oʊ/ 之間。',
    trap:'很多美國人已經把它和 /ɑ/ 合併（cot–caught merger），初期可以先當成 /ɑ/ 的圓唇版。',
    confuse:['o_','oh'], hard:2 },

  { id:'oy', sym:'/ɔɪ/', ph:'oi / oy', type:'v', key:'boy', iso:'oy', graph:['oi','oy'],
    ex:['boy','coin','toy','noise','join'],
    zh:'從 /ɔ/ 滑到 /ɪ/。',
    trap:'雙母音要滑完整，不要只唸前半。',
    confuse:['oh'], hard:1 },

  { id:'ow', sym:'/aʊ/', ph:'ou / ow', type:'v', key:'cow', iso:'ow', graph:['ou','ow'],
    ex:['cow','out','house','down','loud'],
    zh:'從 /ɑ/ 滑到 /ʊ/。像注音 ㄠ。',
    trap:'ow 有兩種讀法：cow /aʊ/ 和 snow /oʊ/，要靠字彙記憶。',
    confuse:['oh'], hard:2 },

  { id:'schwa', sym:'/ə/', ph:'ə (schwa)', type:'v', key:'about', iso:'uh', graph:['a','e','i','o','u'],
    ex:['about','taken','pencil','lemon','circus'],
    zh:'最放鬆、最短的母音，嘴巴微開、完全不用力。出現在「非重音節」。',
    trap:'這是中文母語者最大的盲點。中文每個字都清楚重讀，英文的非重音節會「糊掉」變成 /ə/。不學 schwa，多音節字永遠拼不對。',
    confuse:['u_'], hard:3 },

  /* ===================== R 控制母音 R-controlled (5) ===================== */
  { id:'ar', sym:'/ɑr/', ph:'ar', type:'v', key:'car', iso:'are', graph:['ar'],
    ex:['car','star','park','hard','farm'],
    zh:'先 /ɑ/ 再捲舌 /r/，兩個黏成一個。',
    trap:'r 一定要捲進來，不能唸成 /ɑ/ + 中文的 ㄦ。',
    confuse:['o_','or'], hard:2 },

  { id:'or', sym:'/ɔr/', ph:'or', type:'v', key:'for', iso:'or', graph:['or','ore','oar','our'],
    ex:['for','corn','more','door','four'],
    zh:'圓唇的 /ɔ/ 加捲舌。',
    trap:'和 /ɑr/ 混（car / core）。',
    confuse:['ar'], hard:2 },

  { id:'er', sym:'/ɜr/', ph:'er / ir / ur', type:'v', key:'bird', iso:'urr', graph:['er','ir','ur','ear','or'],
    ex:['bird','her','turn','earth','work'],
    zh:'舌頭中央捲起，全程捲舌。er、ir、ur 三種拼法唸起來完全一樣。',
    trap:'拼寫是最大問題：聽到 /ɜr/ 要選 er 還是 ir 還是 ur？只能靠字彙記憶＋常見規律。',
    confuse:['ar','or'], hard:3 },

  { id:'air', sym:'/ɛr/', ph:'air / are', type:'v', key:'chair', iso:'air', graph:['air','are','ear','ere'],
    ex:['chair','care','bear','there','hair'],
    zh:'/ɛ/ 加捲舌。',
    trap:'ear 有三種讀法：hear /ɪr/、bear /ɛr/、earth /ɜr/。',
    confuse:['ear','er'], hard:3 },

  { id:'ear', sym:'/ɪr/', ph:'ear / eer', type:'v', key:'hear', iso:'eer', graph:['ear','eer','ere','ier'],
    ex:['hear','deer','here','fear','pier'],
    zh:'/ɪ/ 加捲舌。',
    trap:'和 /ɛr/ 混（beer / bear）。',
    confuse:['air'], hard:3 }
  ];

  var byId = {};
  P.forEach(function (p) { byId[p.id] = p; });

  global.PHONEMES = {
    list: P,
    byId: byId,
    get: function (id) { return byId[id] || null; },
    consonants: P.filter(function (p) { return p.type === 'c'; }),
    vowels:     P.filter(function (p) { return p.type === 'v'; }),
    /** 中文母語者的高難度音（hard=3），診斷與補強優先鎖定這些 */
    hardForChinese: P.filter(function (p) { return p.hard === 3; }),
    /** 常見最小配對，用於聽辨測驗 */
    minimalPairs: [
      { a:'ship',  b:'sheep',  pa:'i_', pb:'ee',  zh:'短 i / 長 e' },
      { a:'bad',   b:'bed',    pa:'a_', pb:'e_',  zh:'短 a / 短 e' },
      { a:'cup',   b:'cop',    pa:'u_', pb:'o_',  zh:'短 u / 短 o' },
      { a:'full',  b:'fool',   pa:'oo_',pb:'oo',  zh:'短 oo / 長 oo' },
      { a:'rice',  b:'lice',   pa:'r',  pb:'l',   zh:'r / l' },
      { a:'vine',  b:'wine',   pa:'v',  pb:'w',   zh:'v / w' },
      { a:'think', b:'sink',   pa:'th', pb:'s',   zh:'th / s' },
      { a:'they',  b:'day',    pa:'dh', pb:'d',   zh:'有聲 th / d' },
      { a:'zoo',   b:'sue',    pa:'z',  pb:'s',   zh:'z / s' },
      { a:'cab',   b:'cap',    pa:'b',  pb:'p',   zh:'尾音 b / p' },
      { a:'bag',   b:'back',   pa:'g',  pb:'k',   zh:'尾音 g / k' },
      { a:'bed',   b:'bet',    pa:'d',  pb:'t',   zh:'尾音 d / t' },
      { a:'chip',  b:'ship',   pa:'ch', pb:'sh',  zh:'ch / sh' },
      { a:'jeep',  b:'cheap',  pa:'j',  pb:'ch',  zh:'j / ch' },
      { a:'sin',   b:'sing',   pa:'n',  pb:'ng',  zh:'n / ng' },
      { a:'car',   b:'core',   pa:'ar', pb:'or',  zh:'ar / or' },
      { a:'hear',  b:'hair',   pa:'ear',pb:'air', zh:'ear / air' },
      { a:'pen',   b:'pan',    pa:'e_', pb:'a_',  zh:'短 e / 短 a' },
      { a:'live',  b:'leave',  pa:'i_', pb:'ee',  zh:'短 i / 長 e' },
      { a:'walk',  b:'work',   pa:'aw', pb:'er',  zh:'aw / er' }
    ]
  };
})(window);
