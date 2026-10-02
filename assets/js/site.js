/* Shared script for every page. Data lives in projects.js. */
(function(){
  var ROOT=document.body.getAttribute('data-root')||'';
  var S=window.SITE,SECT=S.SECTORS,G={},PLACE=S.PLACES,GSLUG=S.GROUP_PAGES;
  var P=S.PROJECTS.map(function(p){return [p.title,p.group,p.sectors,p.place,p.summary,(p.live?'L':'')+(p.coursework?'C':''),(p.page||('projects/'+p.slug+'.html')),p.link]});
  Object.keys(S.GROUPS).forEach(function(k){var g=S.GROUPS[k];G[k]={t:g.title,q:g.ask,i:g.intro};});
  var PIMG={};S.PROJECTS.forEach(function(p){if(p.image)PIMG[p.title]=p.image;});
  var GN={risk:"Climate Risk",heat:"Extreme Heat",carbon:"Decarbonisation",planning:"Planning",training:"Training & Research"};
  var order=["risk","heat","carbon","planning","training"];
  function esc(t){return t.replace(/&/g,'&amp;')}
  var pc=document.getElementById('projCount');if(pc)pc.textContent=P.length;
  document.querySelectorAll('[data-count]').forEach(function(el){var n=P.filter(function(p){return p[1]===el.dataset.count}).length;if(n)el.textContent=n+' projects →';});

  /* group pages */
  order.forEach(function(k,ix){
    var el=document.querySelector('[data-page="group-'+k+'"]'),g=G[k];if(!el)return;
    var items=P.filter(function(p){return p[1]===k}).sort(function(a,b){return (a[5].indexOf('C')>-1)-(b[5].indexOf('C')>-1)});
    var cards=items.map(function(p){
      var tags=p[2].split('').map(function(c){return '<span class="chip">'+esc(SECT[c])+'</span>'}).join('');
      var badges=(p[5].indexOf('L')>-1?'<span class="live">Live tool</span>':'')+(p[5].indexOf('C')>-1?'<span class="chip course">Columbia coursework</span>':'');
      var acts=(true?'<a class="btn sm p" href="'+ROOT+p[6]+'">View project</a>':'')+(p[7]?'<a class="btn sm" href="'+p[7]+'">Open live tool ↗</a>':'');
      var ik=PIMG[p[0]],thumb=ik?'<div class="pthumb"><img src="'+ROOT+'images/projects/'+ik+'.jpg" loading="lazy" alt=""'+(/^(adaptation-costs-dashboard|economic-benefits-dashboard|evacuation-planner|forensic-building-flood|heat-illness-dashboard|resilience-tracker|solar-dashboard|urban-heat-dashboard)$/.test(ik)?' class="dash"':'')+'></div>':'<div class="pthumb ph"><span>Photo to come · '+esc(PLACE[p[3]]||'')+'</span></div>';
      return '<article class="pcard">'+thumb+(badges?'<div class="meta-row">'+badges+'</div>':'')+'<h3>'+esc(p[0])+'</h3><p>'+esc(p[4])+'</p><div class="chips">'+tags+'</div>'+(acts?'<div class="acts">'+acts+'</div>':'')+'</article>';
    }).join('');
    var nx=order[(ix+1)%order.length];
    el.innerHTML='<div class="page-head'+(k==='heat'?' heat':'')+'"><div class="wrap"><a class="back" href="'+ROOT+'index.html#groups">← All work</a><span class="eyebrow">Group '+(ix+1)+' of 5 · '+items.length+' projects</span><h1>'+esc(g.t)+'</h1><p class="q">'+esc(g.q)+'</p><p class="muted">'+esc(g.i)+'</p></div></div><div class="wrap"><div class="plist">'+cards+'</div>'+
      (items.some(function(p){return p[5].indexOf('C')>-1})?'<p class="pnote">Projects marked Columbia coursework were short consulting projects with real companies, done as part of my master\'s degree.</p>':'')+
      '<div class="next"><a href="'+ROOT+'index.html#groups">← All work</a><a href="'+ROOT+'work/'+GSLUG[nx]+'.html">Next: '+esc(G[nx].t)+' →</a></div></div>';
  });

  
  /* sectors */
  var box=document.getElementById('sectorBtns'),list=document.getElementById('sectorList');if(box){
  function showSector(k){
    var items=P.filter(function(p){return p[2].indexOf(k)>-1});
    list.innerHTML='<span class="eyebrow">'+esc(SECT[k])+' · '+items.length+' projects</span><ul>'+items.map(function(p){return '<li>'+'<a href="'+ROOT+p[6]+'">'+esc(p[0])+'</a>'+' <span>· '+esc(GN[p[1]])+'</span></li>'}).join('')+'</ul>';
    box.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k?'true':'false')});
  }
  Object.keys(SECT).forEach(function(k){
    var n=P.filter(function(p){return p[2].indexOf(k)>-1}).length;
    var b=document.createElement('button');b.type='button';b.id='sec-'+k;b.dataset.k=k;b.setAttribute('aria-pressed','false');
    b.innerHTML='<span>'+esc(SECT[k])+'</span><b>'+n+'</b>';b.addEventListener('click',function(){showSector(k)});box.appendChild(b);
  });
  showSector('W');
  }

  /* canvases */
  function v(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim();}
  function rnd(seed){return function(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};}
  function paint(c){
    var r=c.getBoundingClientRect();if(!r.width)return;
    var w=Math.round(r.width),h=Math.round(w*10/16),dpr=window.devicePixelRatio||1;
    c.width=w*dpr;c.height=h*dpr;var x=c.getContext('2d');x.scale(dpr,dpr);
    var ramp=[v('--r1'),v('--r2'),v('--r3'),v('--r4'),v('--r5')],R=rnd(7);
    x.fillStyle=v('--surface');x.fillRect(0,0,w,h);var k=c.dataset.kind;
    if(k==='heat'){var s=16;for(var i=0;i<w;i+=s)for(var j=0;j<h;j+=s){var d=Math.hypot(i-w*.58,j-h*.45)/(w*.6);var t=Math.max(0,Math.min(4,Math.round((1-d)*4.2+R()*1.2-.4)));x.fillStyle=ramp[t];x.globalAlpha=.85;x.fillRect(i,j,s-1,s-1);}x.globalAlpha=1;}
    else if(k==='dots'){x.fillStyle=v('--accent-soft');x.fillRect(0,0,w,h);for(var n=0;n<520;n++){var a=R()*6.28,rr=Math.pow(R(),.6)*w*.42;x.fillStyle=ramp[Math.floor(R()*5)];x.beginPath();x.arc(w*.5+Math.cos(a)*rr*1.1,h*.5+Math.sin(a)*rr*.6,1.5+R()*2.5,0,6.3);x.fill();}}
    else if(k==='flood'){for(var b=0;b<5;b++){x.fillStyle=ramp[4-b];x.globalAlpha=.2+b*.15;x.beginPath();x.moveTo(0,h);for(var q=0;q<=w;q+=20){x.lineTo(q,h*(.25+b*.15)+Math.sin(q/60+b)*14);}x.lineTo(w,h);x.fill();}x.globalAlpha=1;x.fillStyle=v('--fg');for(var m=0;m<60;m++){x.fillRect(R()*w,R()*h,4,4);}}
    else if(k==='macc'){var bx=24,base=h*.62;x.strokeStyle=v('--line');x.beginPath();x.moveTo(16,base);x.lineTo(w-16,base);x.stroke();[-.55,-.4,-.25,-.12,.08,.2,.34,.5,.7].forEach(function(val,i){var bw=Math.min((w-48)/9*(0.6+R()*.7),w-16-bx);x.fillStyle=val<0?ramp[1]:ramp[3+(i%2)];var bh=val*h*.5;x.fillRect(bx,val<0?base:base-bh,bw-3,Math.abs(bh));bx+=bw;});}
  }
  function paintAll(){document.querySelectorAll('.viz canvas').forEach(paint)}

  /* how I work: one point set drawn four ways */
  (function(){
    var R=rnd(21),pts=[];
    for(var i=0;i<60;i++){var x=18+R()*204,y=16+R()*128;var risk=Math.max(0,1-Math.hypot(x-150,y-58)/130)+R()*.18;pts.push({x:x,y:y,r:Math.min(.999,risk)});}
    var ramp=["#3f9a8e","#6cc2b7","#d9c886","#f0a070","#f08a55"];
    function cls(p){return Math.min(4,Math.floor(p.r*5))}
    var top=pts.slice().sort(function(a,b){return b.r-a.r}).slice(0,3);
    var ns='http://www.w3.org/2000/svg';
    function el(svg,t,a){var e=document.createElementNS(ns,t);for(var k in a)e.setAttribute(k,a[k]);svg.appendChild(e);return e}
    document.querySelectorAll('[data-stage]').forEach(function(svg){
      var st=+svg.dataset.stage;
      if(st===1){pts.forEach(function(p,i){el(svg,'circle',{cx:p.x+(i%3-1)*3,cy:p.y+(i%2)*3,r:2.6,fill:'rgba(255,255,255,.45)'})});}
      if(st===2){[70,48,26].forEach(function(rr,i){el(svg,'circle',{cx:150,cy:58,r:rr,fill:'none',stroke:'rgba(255,255,255,'+(.12+i*.06)+')','stroke-dasharray':'3 3'})});pts.forEach(function(p){el(svg,'circle',{cx:p.x,cy:p.y,r:3.2,fill:ramp[cls(p)]})})}
      if(st===3){el(svg,'rect',{x:10,y:10,width:220,height:140,rx:6,fill:'rgba(255,255,255,.06)',stroke:'rgba(255,255,255,.18)'});el(svg,'rect',{x:10,y:10,width:220,height:14,rx:6,fill:'rgba(255,255,255,.12)'});
        pts.forEach(function(p){el(svg,'circle',{cx:16+p.x*.56,cy:30+p.y*.72,r:2.4,fill:ramp[cls(p)]})});
        var c=[0,0,0,0,0];pts.forEach(function(p){c[cls(p)]++});var mx=Math.max.apply(null,c);
        c.forEach(function(n,i){var bh=n/mx*80;el(svg,'rect',{x:156+i*14,y:136-bh,width:10,height:bh,rx:1.5,fill:ramp[i]})});
        el(svg,'line',{x1:150,y1:136,x2:226,y2:136,stroke:'rgba(255,255,255,.3)'});}
      if(st===4){pts.forEach(function(p){el(svg,'circle',{cx:p.x,cy:p.y,r:2.4,fill:'rgba(255,255,255,.18)'})});
        top.forEach(function(p,i){el(svg,'circle',{cx:p.x,cy:p.y,r:9,fill:'none',stroke:'#f08a55','stroke-width':2});el(svg,'circle',{cx:p.x,cy:p.y,r:3.4,fill:'#f08a55'});var t=el(svg,'text',{x:p.x+13,y:p.y+4,fill:'#ffffff','font-size':'11','font-family':'JetBrains Mono, monospace'});t.textContent=(i+1);});
        var t=el(svg,'text',{x:18,y:148,fill:'#f7c9ae','font-size':'11','font-family':'JetBrains Mono, monospace'});t.textContent='ACT FIRST: TOP 3';}
    });
  })();

  /* map */
  if(document.getElementById('map')){
  var PINS=[{id:"bro",name:"Broward County, Florida",lon:-80.3,lat:26.15,scale:"County"},{id:"clt",name:"Charlotte, North Carolina",lon:-80.84,lat:35.23,scale:"City"},{id:"del",name:"Delhi, Agra & India-wide",lon:77.21,lat:28.61,scale:"City to national"},{id:"lak",name:"Lakshadweep Islands",lon:72.64,lat:10.56,scale:"Islands"},{id:"bgd",name:"Bangladesh",lon:90.4,lat:23.8,scale:"National"},
    {id:"nyc",name:"New York",lon:-74,lat:40.71,scale:"Coursework and curriculum",minor:true},{id:"cal",name:"California",lon:-121.49,lat:38.58,scale:"Coursework",minor:true},{id:"lon",name:"London",lon:-0.12,lat:51.5,scale:"Coursework",minor:true},{id:"che",name:"Switzerland",lon:8.23,lat:46.8,scale:"Coursework",minor:true},{id:"ssa",name:"Sub-Saharan Africa",lon:22,lat:2,scale:"Master's thesis",minor:true}];
  PINS.forEach(function(p){p.items=P.filter(function(x){return x[3]===p.id})});
  var ON=new Set(["United States","India","Bangladesh"]);
  var panel=document.getElementById('panel');
  var chipBox=document.getElementById('placeChips');
  PINS.forEach(function(p){var b=document.createElement('button');b.type='button';b.id='place-'+p.id;b.dataset.id=p.id;b.className=p.minor?'minor':'';b.textContent=p.name.split(',')[0].replace(' & India-wide','');b.addEventListener('click',function(){show(p)});chipBox.appendChild(b);});
  function show(p){
    chipBox.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.id===p.id?'true':'false')});
    panel.innerHTML='<span class="meta">'+esc(p.scale)+'</span><h3>'+esc(p.name)+'</h3><p class="muted" style="font-size:.86rem">'+p.items.length+(p.items.length>1?' projects':' project')+'</p><ul>'+p.items.map(function(i){return '<li>'+'<a href="'+ROOT+i[6]+'">'+esc(i[0])+'</a>'+'</li>'}).join('')+'</ul>';
    document.querySelectorAll('#map .pin').forEach(function(el){el.classList.toggle('sel',el.dataset.id===p.id)});
  }
  show(PINS[0]);
  if(window.d3&&window.topojson&&window.WORLD){
    var world=window.WORLD;
    var land=topojson.feature(world,world.objects[Object.keys(world.objects)[0]]).features.filter(function(f){return f.properties.name!=="Antarctica"});
    var proj=d3.geoNaturalEarth1().fitExtent([[10,10],[950,460]],{type:"MultiPoint",coordinates:[[-132,56],[112,56],[-132,-6],[112,-6]]});
    var path=d3.geoPath(proj),svg=d3.select('#map');
    svg.append('g').selectAll('path').data(land).join('path').attr('class',function(d){return 'land'+(ON.has(d.properties.name)?' on':'')}).attr('d',path);
    var g=svg.append('g');
    PINS.slice().reverse().forEach(function(p){
      var xy=proj([p.lon,p.lat]),x=xy[0],y=xy[1],rad=p.minor?6:Math.min(18,7+Math.sqrt(p.items.length)*3);
      g.append('circle').attr('class','pin'+(p.minor?' minor':'')).attr('cx',x).attr('cy',y).attr('r',rad).attr('tabindex',0).attr('role','button').attr('aria-label',p.name+', '+p.items.length+' projects').attr('data-id',p.id)
       .on('click',function(){show(p)}).on('mouseenter',function(){show(p)}).on('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();show(p);}});
      var left=["bro","lak","cal"].indexOf(p.id)>-1;g.append('text').attr('class','lbl'+(p.minor?' minor':'')).attr('x',x+(left?-1:1)*(rad+5)).attr('y',y+4).attr('text-anchor',left?'end':'start').text(p.name.split(',')[0].replace(' & India-wide',''));
    });
    show(PINS[0]);
  }
  }

  /* light / dark switch, dark by default */
  var root=document.documentElement,lb=document.querySelectorAll('.look button');
  function setLook(m){if(m==='light')root.setAttribute('data-look','light');else root.removeAttribute('data-look');
    lb.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.look===m?'true':'false')});paintAll();}
  var saved='dark';try{saved=localStorage.getItem('hp-look')||'dark'}catch(e){}
  setLook(saved);
  lb.forEach(function(b){b.addEventListener('click',function(){setLook(b.dataset.look);try{localStorage.setItem('hp-look',b.dataset.look)}catch(e){}})});

  /* contact form: validate and submit */
  var f=document.getElementById('contactForm');
  if(f){
    var rules=[['cf-name','err-name',function(v){return v.trim()?'':'Enter your name.'}],
      ['cf-email','err-email',function(v){return !v.trim()?'Enter your email.':(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim())?'':'That email looks incomplete. Check it and try again.')}],
      ['cf-topic','err-topic',function(v){return v?'':'Choose what this is about.'}],
      ['cf-msg','err-msg',function(v){return v.trim().length>=10?'':'Add a few words about what you need.'}]];
    rules.forEach(function(r){var el=document.getElementById(r[0]);el.addEventListener('input',function(){el.removeAttribute('aria-invalid');document.getElementById(r[1]).textContent='';});});
    f.addEventListener('submit',function(e){e.preventDefault();var ok=true,first=null;
      rules.forEach(function(r){var el=document.getElementById(r[0]),m=r[2](el.value);document.getElementById(r[1]).textContent=m;if(m){ok=false;el.setAttribute('aria-invalid','true');el.setAttribute('aria-describedby',r[1]);if(!first)first=el;}else el.removeAttribute('aria-invalid');});
      if(!ok){first.focus();return;}
      var btn=f.querySelector('button[type=submit]');
      btn.textContent='Sending...';
      btn.disabled=true;
      var formData=new FormData(f);
      fetch("https://formsubmit.co/ajax/panwar.heemanshu@gmail.com",{
        method:"POST",
        headers:{'Accept':'application/json'},
        body:formData
      }).then(function(res){
        if(res.ok){
          var done=document.getElementById('cf-done');
          done.textContent="Thank you! Your message has been sent to Himanshhu.";
          done.hidden=false;
          btn.textContent='Message sent';
          f.reset();
        }else{
          throw new Error('Send failed');
        }
      }).catch(function(){
        f.submit();
      });
    });
  }
  var cp=document.getElementById('copyEmail');
  if(cp)cp.addEventListener('click',function(){var t=cp.previousElementSibling.textContent;
    function sel(){var r=document.createRange();r.selectNodeContents(cp.previousElementSibling);var s2=getSelection();s2.removeAllRanges();s2.addRange(r);cp.textContent='Selected';}
    try{navigator.clipboard.writeText(t).then(function(){cp.textContent='Copied'},sel)}catch(e){sel()}});

  /* phone menu */
  var mb=document.getElementById('menuBtn'),topbar=document.querySelector('.top');
  function closeMenu(){topbar.classList.remove('open');mb.setAttribute('aria-expanded','false');mb.setAttribute('aria-label','Open menu');}
  mb.addEventListener('click',function(){var o=topbar.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false');mb.setAttribute('aria-label',o?'Close menu':'Open menu');});
  document.querySelectorAll('#mainNav a').forEach(function(a){a.addEventListener('click',closeMenu)});

  var dd=document.getElementById('docDlg'),dbig=document.getElementById('docBig');
  if(dd&&dd.showModal){document.querySelectorAll('.doc').forEach(function(b){b.addEventListener('click',function(){var im=b.querySelector('img');dbig.src=im.src;dbig.alt=im.alt;dd.showModal();});});
    document.getElementById('docClose').addEventListener('click',function(){dd.close()});
    dd.addEventListener('click',function(e){if(e.target===dd)dd.close()});}
  var cd=document.getElementById('certDlg');
  if(cd&&cd.showModal){document.getElementById('certBtn').addEventListener('click',function(){cd.showModal()});
    document.getElementById('certClose').addEventListener('click',function(){cd.close()});
    cd.addEventListener('click',function(e){if(e.target===cd)cd.close()});}

  paintAll();
  var tm;window.addEventListener('resize',function(){clearTimeout(tm);tm=setTimeout(paintAll,150)});
})();
