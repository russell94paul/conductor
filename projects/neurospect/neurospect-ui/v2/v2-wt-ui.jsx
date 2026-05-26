/* NeuroSpect v2 — Walkthrough UI Components & Charts (Premium Visual Edition) */

/* ── Shared SVG Defs (glow filters + gradients) ── */
function ChartDefs({id}){
  var p=id||'';
  return(
    <defs>
      <filter id={p+'glow'} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id={p+'glow-lg'} x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <linearGradient id={p+'grad-blue'} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
      <linearGradient id={p+'grad-green'} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#34d399"/></linearGradient>
      <linearGradient id={p+'grad-gold'} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#fbbf24"/></linearGradient>
      <linearGradient id={p+'fill-blue'} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/><stop offset="50%" stopColor="#06b6d4" stopOpacity="0.06"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/></linearGradient>
    </defs>
  );
}

/* ── Pulsing Dot ── */
function PulseDot({cx,cy,r,color}){
  return <g>
    <circle cx={cx} cy={cy} r={(r||3)*2.5} fill={color||'#3b82f6'} opacity="0.08"><animate attributeName="r" values={((r||3)*2)+';'+((r||3)*4)+';'+((r||3)*2)} dur="2.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.12;0.03;0.12" dur="2.5s" repeatCount="indefinite"/></circle>
    <circle cx={cx} cy={cy} r={r||3} fill={color||'#3b82f6'} filter="url(#glow)"><animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite"/></circle>
  </g>;
}

/* ── Mock Screen Chrome ── */
function MockScreen({title,toolbar,children,color,live}){
  var c=color||'var(--blue-400)';
  return(
    <div style={{position:'relative',borderRadius:'var(--radius)',overflow:'hidden',marginBottom:12,background:'var(--surface)',border:'1px solid var(--border)',boxShadow:'0 0 20px rgba(59,130,246,0.04), 0 4px 24px rgba(0,0,0,0.2)',backdropFilter:'blur(12px)'}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,'+c+'33,transparent)' }}></div>
      <div style={{padding:'7px 12px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(5,8,16,0.7)',gap:8}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{display:'flex',gap:5}}>
            <span style={{width:8,height:8,borderRadius:'50%',background:'#ef4444',boxShadow:'0 0 4px rgba(239,68,68,0.3)'}}></span>
            <span style={{width:8,height:8,borderRadius:'50%',background:'#f59e0b',boxShadow:'0 0 4px rgba(245,158,11,0.3)'}}></span>
            <span style={{width:8,height:8,borderRadius:'50%',background:'#10b981',boxShadow:'0 0 4px rgba(16,185,129,0.3)'}}></span>
          </div>
          <span className="mono" style={{fontSize:'0.72rem',color:c,fontWeight:600,textShadow:'0 0 8px '+c+'40'}}>{title}</span>
          {live&&<span style={{display:'inline-flex',alignItems:'center',gap:4,fontSize:'0.55rem',color:'#10b981',fontFamily:'var(--font-m)'}}><span style={{width:5,height:5,borderRadius:'50%',background:'#10b981',boxShadow:'0 0 6px #10b981',animation:'dot-pulse 2s ease-in-out infinite'}}></span>LIVE</span>}
        </div>
        {toolbar}
      </div>
      <div style={{padding:'0.85rem'}}>{children}</div>
    </div>
  );
}

/* ── Alex's Thought ── */
function AlexThought({children}){
  return(
    <div style={{display:'flex',gap:10,padding:'10px 14px',borderRadius:10,background:'linear-gradient(135deg,rgba(139,92,246,0.06),rgba(59,130,246,0.03))',border:'1px solid rgba(139,92,246,0.15)',margin:'10px 0',boxShadow:'0 0 12px rgba(139,92,246,0.05)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',left:0,top:0,bottom:0,width:2,background:'linear-gradient(180deg,#8b5cf6,#3b82f6)',boxShadow:'0 0 8px rgba(139,92,246,0.4)'}}></div>
      <span style={{fontSize:'1rem',flexShrink:0,marginTop:1,marginLeft:4}}>💭</span>
      <p style={{fontSize:'0.8rem',color:'var(--text-b)',lineHeight:1.6,fontStyle:'italic',margin:0}}>{children}</p>
    </div>
  );
}

/* ── Phase Header ── */
function PhaseHead({num,title,color}){
  return(
    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
      <span className="mono" style={{fontSize:'1.8rem',fontWeight:800,color:color+'30',lineHeight:1,textShadow:'0 0 20px '+color+'15'}}>{num}</span>
      <h2 style={{fontSize:'1.05rem',margin:0}}>{title}</h2>
    </div>
  );
}

/* ── KPI Grid ── */
function KpiGrid({items}){
  return(
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(95px,1fr))',gap:6,marginBottom:12}}>
      {items.map(function(k){return(
        <div key={k.l} style={{padding:'6px 4px',borderRadius:7,background:'rgba(59,130,246,0.04)',border:'1px solid rgba(59,130,246,0.08)',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,'+(k.c||'var(--blue-400)')+'22,transparent)'}}></div>
          <div className="label" style={{marginBottom:2,fontSize:'0.58rem'}}>{k.l}</div>
          <div className="mono" style={{fontSize:'0.88rem',fontWeight:600,color:k.c||'var(--blue-400)',textShadow:'0 0 8px '+(k.c||'rgba(59,130,246,0.3)')}}>{k.v}</div>
        </div>
      );})}
    </div>
  );
}

/* ── Code Block ── */
function CodeBlock({code}){
  var lines=code.split('\n');
  function hl(line){
    if(line.trim().charAt(0)==='#') return <span style={{color:'var(--text-d)'}}>{line}</span>;
    var ci=line.indexOf('#');
    var main=ci>0?line.slice(0,ci):line;
    var comment=ci>0?line.slice(ci):'';
    var parts=main.split(':');
    if(parts.length>=2){
      var key=parts[0];var val=parts.slice(1).join(':');
      var vc='var(--blue-400)';
      if(val.indexOf('"')>-1) vc='#10b981';
      else if(!isNaN(parseFloat(val.trim()))&&val.trim().length>0) vc='var(--gold-400)';
      var isSec=key.trim().length>0&&key.trim().indexOf(' ')<0&&val.trim()==='';
      return <span><span style={{color:isSec?'var(--gold-400)':'#8b5cf6'}}>{key}</span>:<span style={{color:vc}}>{val}</span>{comment&&<span style={{color:'var(--text-d)'}}>{comment}</span>}</span>;
    }
    if(line.trim().indexOf('- ')===0) return <span style={{color:'var(--blue-400)'}}>{line}</span>;
    return <span>{line}</span>;
  }
  return(
    <div style={{background:'rgba(5,8,16,0.7)',border:'1px solid rgba(59,130,246,0.08)',borderRadius:8,padding:'10px',fontFamily:'var(--font-m)',fontSize:'0.62rem',lineHeight:1.65,overflowX:'auto',color:'var(--text-b)',maxHeight:320,overflowY:'auto',boxShadow:'inset 0 1px 0 rgba(59,130,246,0.06)'}}>
      {lines.map(function(l,i){return <div key={i} style={{display:'flex',gap:10}}><span style={{color:'var(--text-d)',width:18,textAlign:'right',flexShrink:0,userSelect:'none',opacity:0.4}}>{i+1}</span>{hl(l)}</div>;})}
    </div>
  );
}

/* ── Execution Log ── */
function ExecLog({lines,trigger}){
  var st=React.useState(0);var vis=st[0],setVis=st[1];
  React.useEffect(function(){
    if(!trigger){setVis(lines.length);return;}
    setVis(0);var i=0;
    var iv=setInterval(function(){i++;setVis(i);if(i>=lines.length)clearInterval(iv);},140);
    return function(){clearInterval(iv);};
  },[trigger]);
  return(
    <div style={{background:'rgba(5,8,16,0.7)',border:'1px solid rgba(59,130,246,0.08)',borderRadius:8,padding:'8px 10px',fontFamily:'var(--font-m)',fontSize:'0.62rem',lineHeight:1.75,overflowX:'auto',boxShadow:'inset 0 1px 0 rgba(59,130,246,0.06)'}}>
      {lines.slice(0,vis).map(function(l,i){
        var c='var(--text-m)';
        if(l.indexOf('SIGNAL')>-1)c='var(--gold-400)';
        if(l.indexOf('VALIDATE')>-1)c='var(--blue-400)';
        if(l.indexOf('FILL')>-1)c='#10b981';
        if(l.indexOf('SKIP')>-1||l.indexOf('⏸')>-1)c='var(--text-d)';
        if(l.indexOf('AUDIT')>-1)c='#8b5cf6';
        return <div key={i} style={{color:c,opacity:0.85,textShadow:'0 0 6px '+c+'20'}}>{l}</div>;
      })}
      {vis<lines.length&&<span style={{color:'var(--blue-400)',animation:'dot-pulse 1s ease-in-out infinite'}}>▊</span>}
    </div>
  );
}

/* ═══════════════ CHARTS ═══════════════ */

/* ── Equity Curve ── */
function WtEquity({data,color,id,showDD}){
  var W=560,H=155,P={t:8,r:8,b:18,l:46};
  var mn=Math.min.apply(null,data),mx=Math.max.apply(null,data),rng=mx-mn||1;
  mn-=rng*0.05;mx+=rng*0.05;rng=mx-mn;
  var xS=(W-P.l-P.r)/(data.length-1);
  var y=function(v){return P.t+(1-(v-mn)/rng)*(H-P.t-P.b);};
  var clr=color||'#3b82f6';var pfx=(id||'m');
  var path=data.map(function(v,i){return(i===0?'M':'L')+(P.l+i*xS).toFixed(1)+','+y(v).toFixed(1);}).join(' ');
  var area=path+' L'+(P.l+(data.length-1)*xS)+','+(H-P.b)+' L'+P.l+','+(H-P.b)+' Z';
  var ddEls=null;
  if(showDD){
    var peak=data[0],ddPts=data.map(function(v,i){if(v>peak)peak=v;return{x:P.l+i*xS,dd:(v-peak)/peak*100};});
    var ddMin=Math.min.apply(null,ddPts.map(function(p){return p.dd;}))||(-1);
    var ddTop=H+4,ddH=30;
    var dp=ddPts.map(function(p,i){return(i===0?'M':'L')+p.x.toFixed(1)+','+(ddTop+Math.abs(p.dd/ddMin)*ddH).toFixed(1);}).join(' ');
    var ddArea=dp+' L'+(P.l+(data.length-1)*xS)+','+ddTop+' L'+P.l+','+ddTop+' Z';
    ddEls=<g><line x1={P.l} y1={ddTop} x2={W-P.r} y2={ddTop} stroke="rgba(239,68,68,0.1)" strokeWidth="1"/>
      <path d={ddArea} fill="rgba(239,68,68,0.06)"/>
      <path d={dp} fill="none" stroke="#ef4444" strokeWidth="1.2" opacity="0.5" filter={'url(#'+pfx+'glow)'}/>
    </g>;
  }
  var gLines=[];for(var g=mn;g<=mx;g+=rng/4)gLines.push(Math.round(g));
  var endX=P.l+(data.length-1)*xS,endY=y(data[data.length-1]);
  return(
    <svg viewBox={'0 0 '+W+' '+(H+(showDD?38:0))} style={{width:'100%',display:'block'}}>
      <ChartDefs id={pfx}/>
      {gLines.map(function(v,i){return <g key={i}><line x1={P.l} y1={y(v)} x2={W-P.r} y2={y(v)} stroke="rgba(59,130,246,0.05)" strokeWidth="1"/><text x={P.l-4} y={y(v)+3} textAnchor="end" fill="rgba(255,255,255,0.15)" fontSize="6.5" fontFamily="var(--font-m)">${(v/1000).toFixed(0)}k</text></g>;})}
      <path d={area} fill={'url(#'+pfx+'fill-blue)'}/>
      <path d={path} fill="none" stroke={'url(#'+pfx+'grad-blue)'} strokeWidth="2" filter={'url(#'+pfx+'glow)'}/>
      <PulseDot cx={endX} cy={endY} r={3.5} color={clr}/>
      {ddEls}
    </svg>
  );
}

/* ── Monthly Heatmap ── */
function WtHeatmap({data}){
  var mos=['J','F','M','A','M','J','J','A','S','O','N','D'];
  var yrs=['2024','2025'];var cW=34,cH=22,pL=32,pT=14;
  var W=pL+12*cW+4,H=pT+2*cH+4;
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',maxWidth:480,display:'block'}}>
      {mos.map(function(m,i){return <text key={i} x={pL+i*cW+cW/2} y={10} textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="6" fontFamily="var(--font-m)">{m}</text>;})}
      {data.map(function(row,yi){return <g key={yi}>
        <text x={pL-4} y={pT+yi*cH+cH/2+3} textAnchor="end" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="var(--font-m)">{yrs[yi]}</text>
        {row.map(function(v,mi){
          if(v===0&&yi===1&&mi>=10)return null;
          var pos=v>=0,int=Math.min(Math.abs(v)/4,1);
          var fill=pos?'rgba(16,185,129,'+(0.18+int*0.55)+')':'rgba(239,68,68,'+(0.18+int*0.55)+')';
          var glow=Math.abs(v)>2.5;
          return <g key={mi}>
            {glow&&<rect x={pL+mi*cW} y={pT+yi*cH} width={cW} height={cH} rx="3" fill={pos?'rgba(16,185,129,0.08)':'rgba(239,68,68,0.08)'}/>}
            <rect x={pL+mi*cW+1} y={pT+yi*cH+1} width={cW-2} height={cH-2} rx="2.5" fill={fill} style={glow?{filter:'drop-shadow(0 0 4px '+(pos?'rgba(16,185,129,0.4)':'rgba(239,68,68,0.4)')+')'}:{}}/>
            <text x={pL+mi*cW+cW/2} y={pT+yi*cH+cH/2+3} textAnchor="middle" fill={'rgba(255,255,255,'+(glow?'0.85':'0.6')+')'} fontSize="5.5" fontWeight={glow?'600':'400'} fontFamily="var(--font-m)">{(v>0?'+':'')+v.toFixed(1)}</text>
          </g>;
        })}
      </g>;})}
    </svg>
  );
}

/* ── R-Multiple Histogram ── */
function WtHistogram({data}){
  var maxN=Math.max.apply(null,data.map(function(d){return d.n;}));
  var W=380,H=115,P={t:8,r:8,b:18,l:8};var bW=(W-P.l-P.r)/data.length;
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',maxWidth:420,display:'block'}}>
      <defs>
        <linearGradient id="hist-g" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/><stop offset="100%" stopColor="#10b981" stopOpacity="0.7"/></linearGradient>
        <linearGradient id="hist-r" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#ef4444" stopOpacity="0.3"/><stop offset="100%" stopColor="#ef4444" stopOpacity="0.7"/></linearGradient>
        <filter id="hglow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {data.map(function(d,i){
        var bH=(d.n/maxN)*(H-P.t-P.b);var x=P.l+i*bW;var neg=d.r.indexOf('-')===0;var big=d.n>25;
        return <g key={i}>
          <rect x={x+2} y={H-P.b-bH} width={bW-4} height={bH} rx="2" fill={neg?'url(#hist-r)':'url(#hist-g)'} style={big?{filter:'url(#hglow)'}:{}}/>
          <text x={x+bW/2} y={H-P.b+10} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="5.5" fontFamily="var(--font-m)">{d.r}</text>
          <text x={x+bW/2} y={H-P.b-bH-3} textAnchor="middle" fill={'rgba(255,255,255,'+(big?'0.6':'0.3')+')'} fontSize="5.5" fontFamily="var(--font-m)">{d.n}</text>
        </g>;
      })}
    </svg>
  );
}

/* ── Null Test Distribution ── */
function WtNullChart(){
  var W=420,H=135,P={t:12,r:8,b:22,l:8};
  var pts=[];
  for(var x=0;x<=100;x++){var pf=0.4+x*0.021,z=(pf-0.98)/0.18;pts.push({pf:pf,y:Math.exp(-z*z/2)/(0.18*2.507)});}
  var maxY=Math.max.apply(null,pts.map(function(p){return p.y;}));
  var sx=function(pf){return P.l+((pf-0.4)/2.1)*(W-P.l-P.r);};
  var sy=function(v){return P.t+(1-v/maxY)*(H-P.t-P.b);};
  var curve=pts.map(function(p,i){return(i===0?'M':'L')+sx(p.pf).toFixed(1)+','+sy(p.y).toFixed(1);}).join(' ');
  var areaP=curve+' L'+sx(pts[pts.length-1].pf)+','+(H-P.b)+' L'+sx(pts[0].pf)+','+(H-P.b)+' Z';
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',display:'block'}}>
      <defs>
        <linearGradient id="null-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01"/></linearGradient>
        <filter id="null-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="gold-bloom" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path d={areaP} fill="url(#null-fill)"/>
      <path d={curve} fill="none" stroke="#3b82f6" strokeWidth="1.8" opacity="0.5" filter="url(#null-glow)"/>
      {/* 95th percentile line */}
      <line x1={sx(1.31)} y1={P.t} x2={sx(1.31)} y2={H-P.b} stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" opacity="0.7"/>
      <text x={sx(1.31)} y={P.t-3} textAnchor="middle" fill="#ef4444" fontSize="6.5" fontFamily="var(--font-m)">95th %ile (1.31)</text>
      {/* Your strategy — big glowing marker */}
      <circle cx={sx(2.14)} cy={sy(0.08)} r="12" fill="#fbbf24" opacity="0.06"><animate attributeName="r" values="10;16;10" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.08;0.02;0.08" dur="3s" repeatCount="indefinite"/></circle>
      <circle cx={sx(2.14)} cy={sy(0.08)} r="6" fill="#fbbf24" opacity="0.15" filter="url(#gold-bloom)"/>
      <circle cx={sx(2.14)} cy={sy(0.08)} r="4" fill="#fbbf24" stroke="#fcd34d" strokeWidth="1.5"/>
      <text x={sx(2.14)} y={sy(0.08)-10} textAnchor="middle" fill="#fbbf24" fontSize="7.5" fontWeight="700" fontFamily="var(--font-m)" style={{textShadow:'0 0 8px rgba(251,191,36,0.5)'}}>Your: 2.14</text>
      {[0.5,1.0,1.5,2.0,2.5].map(function(v){return <text key={v} x={sx(v)} y={H-P.b+11} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="var(--font-m)">{v.toFixed(1)}</text>;})}
      <text x={W/2} y={H-2} textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="6" fontFamily="var(--font-m)">Profit Factor</text>
    </svg>
  );
}

/* ── Monte Carlo Fan ── */
function WtMCChart({paths,median}){
  var W=560,H=175,P={t:8,r:8,b:18,l:46};
  var allV=[];paths.forEach(function(p){p.forEach(function(v){allV.push(v);});});
  var mn=Math.min.apply(null,allV),mx=Math.max.apply(null,allV),rng=mx-mn||1;
  mn-=rng*0.05;mx+=rng*0.05;rng=mx-mn;
  var maxLen=Math.max.apply(null,paths.map(function(p){return p.length;}));
  var xS=(W-P.l-P.r)/(maxLen-1);
  var y=function(v){return P.t+(1-(v-mn)/rng)*(H-P.t-P.b);};
  var sorted=paths.slice().sort(function(a,b){return a[a.length-1]-b[b.length-1];});
  var n=sorted.length;
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',display:'block'}}>
      <defs>
        <filter id="mc-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="mc-med" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#fff" stopOpacity="0.5"/><stop offset="50%" stopColor="#fff" stopOpacity="0.9"/><stop offset="100%" stopColor="#fff" stopOpacity="0.5"/></linearGradient>
      </defs>
      {[mn,mn+rng*0.25,mn+rng*0.5,mn+rng*0.75,mx].map(function(v,i){return <g key={i}><line x1={P.l} y1={y(v)} x2={W-P.r} y2={y(v)} stroke="rgba(59,130,246,0.04)" strokeWidth="1"/><text x={P.l-4} y={y(v)+3} textAnchor="end" fill="rgba(255,255,255,0.12)" fontSize="6" fontFamily="var(--font-m)">${(v/1000).toFixed(0)}k</text></g>;})}
      {sorted.map(function(path,pi){
        var pct=pi/n;var c=pct<0.25?'#ef4444':pct<0.75?'#3b82f6':'#10b981';
        var d=path.map(function(v,i){return(i===0?'M':'L')+(P.l+i*xS).toFixed(1)+','+y(v).toFixed(1);}).join(' ');
        return <path key={pi} d={d} fill="none" stroke={c} strokeWidth="0.7" opacity="0.1" style={{filter:pct<0.1||pct>0.9?'drop-shadow(0 0 2px '+c+')':'none'}}/>;
      })}
      {median&&(function(){
        var d=median.map(function(v,i){return(i===0?'M':'L')+(P.l+i*xS).toFixed(1)+','+y(v).toFixed(1);}).join(' ');
        var endX=P.l+(median.length-1)*xS,endY=y(median[median.length-1]);
        return <g><path d={d} fill="none" stroke="url(#mc-med)" strokeWidth="2.5" filter="url(#mc-glow)"/>
          <PulseDot cx={endX} cy={endY} r={3} color="#fff"/></g>;
      })()}
    </svg>
  );
}

/* ── Walk-Forward Bar+Line ── */
function WtWFChart({data}){
  var W=380,H=115,P={t:14,r:8,b:18,l:28};var bW=(W-P.l-P.r)/data.length;var maxPF=3;
  var sy=function(v){return P.t+(1-v/maxPF)*(H-P.t-P.b);};
  var lp=data.map(function(d,i){return(i===0?'M':'L')+(P.l+i*bW+bW/2).toFixed(1)+','+sy(d.testPF).toFixed(1);}).join(' ');
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',maxWidth:420,display:'block'}}>
      <defs>
        <linearGradient id="wf-bar" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.05"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0.18"/></linearGradient>
        <filter id="wf-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {[1,1.5,2,2.5].map(function(v){return <g key={v}><line x1={P.l} y1={sy(v)} x2={W-P.r} y2={sy(v)} stroke="rgba(59,130,246,0.05)" strokeWidth="1"/><text x={P.l-4} y={sy(v)+3} textAnchor="end" fill="rgba(255,255,255,0.15)" fontSize="6" fontFamily="var(--font-m)">{v}</text></g>;})}
      {data.map(function(d,i){var x=P.l+i*bW;return <g key={i}><rect x={x+3} y={sy(d.trainPF)} width={bW-6} height={(d.trainPF/maxPF)*(H-P.t-P.b)} rx="2" fill="url(#wf-bar)" stroke="rgba(59,130,246,0.15)" strokeWidth="0.5"/><text x={x+bW/2} y={H-P.b+10} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="5.5" fontFamily="var(--font-m)">W{d.win}</text></g>;})}
      <path d={lp} fill="none" stroke="#10b981" strokeWidth="2" filter="url(#wf-glow)"/>
      {data.map(function(d,i){return <PulseDot key={i} cx={P.l+i*bW+bW/2} cy={sy(d.testPF)} r={2.5} color="#10b981"/>;})}
      <line x1={P.l} y1={sy(1)} x2={W-P.r} y2={sy(1)} stroke="rgba(239,68,68,0.15)" strokeWidth="1" strokeDasharray="3 3"/>
    </svg>
  );
}

/* ── Parameter Heatmap ── */
function WtParamHeat({data}){
  var tp=['1.5R','2.0R','2.5R','3.0R','3.5R','4.0R'];
  var sl=['-1','-2','-3','-4'];
  var cW=62,cH=24,pL=40,pT=20;var W=pL+sl.length*cW+4,H=pT+tp.length*cH+4;
  function cc(v){
    if(v<1.0)return'rgba(239,68,68,'+(0.2+(1-v)*0.5)+')';
    if(v<1.5)return'rgba(245,158,11,'+(0.12+(v-1)*0.35)+')';
    return'rgba(16,185,129,'+(0.12+Math.min((v-1.5)/1.5,1)*0.55)+')';
  }
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',maxWidth:360,display:'block'}}>
      <defs><filter id="ph-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      {sl.map(function(s,i){return <text key={i} x={pL+i*cW+cW/2} y={14} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6.5" fontFamily="var(--font-m)">{s} tick</text>;})}
      {data.map(function(row,ri){return <g key={ri}>
        <text x={pL-4} y={pT+ri*cH+cH/2+3} textAnchor="end" fill="rgba(255,255,255,0.25)" fontSize="6.5" fontFamily="var(--font-m)">{tp[ri]}</text>
        {row.map(function(v,ci){
          var cur=ri===2&&ci===1;var best=v>=2.0;
          return <g key={ci}>
            <rect x={pL+ci*cW+1} y={pT+ri*cH+1} width={cW-2} height={cH-2} rx="2.5" fill={cc(v)} style={(cur||best)?{filter:'url(#ph-glow)'}:{}}/>
            {cur&&<rect x={pL+ci*cW} y={pT+ri*cH} width={cW} height={cH} rx="3" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.8"><animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite"/></rect>}
            <text x={pL+ci*cW+cW/2} y={pT+ri*cH+cH/2+3} textAnchor="middle" fill={'rgba(255,255,255,'+(cur?'1':best?'0.8':'0.55')+')'} fontSize="7" fontWeight={cur?'700':'400'} fontFamily="var(--font-m)">{v.toFixed(2)}</text>
          </g>;
        })}
      </g>;})}
      <text x={pL+sl.length*cW/2} y={H-1} textAnchor="middle" fill="rgba(255,255,255,0.1)" fontSize="5.5" fontFamily="var(--font-m)">Stop Offset (ticks below sweep)</text>
    </svg>
  );
}

/* ── Multi-Group Equity ── */
function WtMultiEq({groups}){
  var W=480,H=135,P={t:8,r:8,b:18,l:46};
  var allV=[];groups.forEach(function(g){g.data.forEach(function(v){allV.push(v);});});
  var mn=Math.min.apply(null,allV),mx=Math.max.apply(null,allV),rng=mx-mn||1;
  mn-=rng*0.08;mx+=rng*0.08;rng=mx-mn;
  var y=function(v){return P.t+(1-(v-mn)/rng)*(H-P.t-P.b);};
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',display:'block'}}>
      <defs><filter id="me-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      {groups.map(function(g){
        var xS=(W-P.l-P.r)/(g.data.length-1);
        var d=g.data.map(function(v,i){return(i===0?'M':'L')+(P.l+i*xS).toFixed(1)+','+y(v).toFixed(1);}).join(' ');
        var endX=P.l+(g.data.length-1)*xS,endY=y(g.data[g.data.length-1]);
        return <g key={g.label}><path d={d} fill="none" stroke={g.color} strokeWidth="1.8" filter="url(#me-glow)"/>
          <PulseDot cx={endX} cy={endY} r={2.5} color={g.color}/></g>;
      })}
      {groups.map(function(g,i){return <g key={i}>
        <line x1={P.l+i*100} y1={H-4} x2={P.l+i*100+14} y2={H-4} stroke={g.color} strokeWidth="2" filter="url(#me-glow)"/>
        <text x={P.l+i*100+18} y={H-1} fill="rgba(255,255,255,0.35)" fontSize="6.5" fontFamily="var(--font-m)">{g.label}</text>
      </g>;})}
    </svg>
  );
}

/* ── Day/Hour Bars ── */
function WtBars({data,lKey,vKey,color}){
  var W=260,H=78,P={t:6,r:6,b:16,l:6};var bW=(W-P.l-P.r)/data.length;
  var c=color||'#3b82f6';
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',maxWidth:280,display:'block'}}>
      <defs>
        <linearGradient id={'bar-'+c.replace('#','')} x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor={c} stopOpacity="0.15"/><stop offset="100%" stopColor={c} stopOpacity="0.6"/></linearGradient>
        <filter id="bar-g" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {data.map(function(d,i){
        var val=d[vKey],bH=(val/100)*(H-P.t-P.b);var x=P.l+i*bW;var peak=val>=67;
        return <g key={i}><rect x={x+2} y={H-P.b-bH} width={bW-4} height={bH} rx="2" fill={'url(#bar-'+c.replace('#','')+')'} style={peak?{filter:'url(#bar-g)'}:{}}/>
          <text x={x+bW/2} y={H-P.b-bH-3} textAnchor="middle" fill={'rgba(255,255,255,'+(peak?'0.6':'0.35')+')'} fontSize="6" fontWeight={peak?'600':'400'} fontFamily="var(--font-m)">{val}%</text>
          <text x={x+bW/2} y={H-P.b+9} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="5.5" fontFamily="var(--font-m)">{d[lKey]}</text></g>;
      })}
    </svg>
  );
}

/* ── Candlestick with ICT Annotations ── */
function WtCandles(){
  var candles=[
    {o:5848,h:5850,l:5843,c:5844},{o:5844,h:5846,l:5840,c:5841},{o:5841,h:5842,l:5836,c:5837},
    {o:5837,h:5838,l:5834,c:5835},{o:5835,h:5845,l:5834,c:5844},{o:5844,h:5851,l:5843,c:5850},
    {o:5850,h:5852,l:5847,c:5848},{o:5848,h:5849,l:5842,c:5843},{o:5843,h:5847,l:5842,c:5846},
    {o:5846,h:5852,l:5845,c:5851},{o:5851,h:5856,l:5850,c:5855},{o:5855,h:5858,l:5853,c:5857},
    {o:5857,h:5860,l:5855,c:5859},
  ];
  var W=480,H=175,P={t:14,r:10,b:20,l:36};
  var allP=[];candles.forEach(function(c){allP.push(c.h,c.l);});
  var mn=Math.min.apply(null,allP)-2,mx=Math.max.apply(null,allP)+3,rng=mx-mn;
  var cw=(W-P.l-P.r)/candles.length;
  var y=function(v){return P.t+((mx-v)/rng)*(H-P.t-P.b);};
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',display:'block'}}>
      <defs>
        <filter id="c-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="fvg-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0.03"/></linearGradient>
        <linearGradient id="session-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.04"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01"/></linearGradient>
      </defs>
      {/* Session shading */}
      <rect x={P.l} y={P.t} width={W-P.l-P.r} height={H-P.t-P.b} fill="url(#session-bg)" rx="3"/>
      <text x={W-P.r-4} y={P.t+10} textAnchor="end" fill="rgba(59,130,246,0.12)" fontSize="6" fontFamily="var(--font-m)">London Session</text>
      {/* Session low */}
      <line x1={P.l} y1={y(5840)} x2={W-P.r} y2={y(5840)} stroke="rgba(239,68,68,0.2)" strokeWidth="1" strokeDasharray="4 3"/>
      {/* FVG zone — animated glow */}
      <rect x={P.l+5*cw-2} y={y(5847)} width={cw*6} height={y(5843)-y(5847)} fill="url(#fvg-fill)" stroke="rgba(59,130,246,0.25)" strokeWidth="0.5" strokeDasharray="3 2" rx="2">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite"/></rect>
      <text x={P.l+8*cw} y={y(5847)-4} textAnchor="middle" fill="var(--blue-400)" fontSize="6" fontFamily="var(--font-m)" opacity="0.8" style={{textShadow:'0 0 6px rgba(59,130,246,0.3)'}}>FVG</text>
      {/* Stop/Target with glow */}
      <line x1={P.l+7*cw} y1={y(5838)} x2={P.l+12*cw} y2={y(5838)} stroke="#ef4444" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" filter="url(#c-glow)"/>
      <line x1={P.l+7*cw} y1={y(5855.75)} x2={P.l+12*cw} y2={y(5855.75)} stroke="#10b981" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" filter="url(#c-glow)"/>
      {/* Candles */}
      {candles.map(function(c,i){
        var cx=P.l+i*cw+cw/2;var bull=c.c>=c.o;
        var bt=y(Math.max(c.o,c.c)),bb=y(Math.min(c.o,c.c)),bh=Math.max(bb-bt,1);
        var highlight=i===3||i===4;
        return <g key={i}>
          <line x1={cx} y1={y(c.h)} x2={cx} y2={y(c.l)} stroke={bull?'#10b981':'#ef4444'} strokeWidth="0.8" opacity="0.5"/>
          <rect x={cx-cw*0.3} y={bt} width={cw*0.6} height={bh} rx="0.5" fill={bull?'#10b981':'#ef4444'} opacity={highlight?1:0.6} style={highlight?{filter:'url(#c-glow)'}:{}}/>
          {i===3&&<text x={cx} y={y(c.l)+9} textAnchor="middle" fill="#ef4444" fontSize="5" fontFamily="var(--font-m)" style={{textShadow:'0 0 4px rgba(239,68,68,0.5)'}}>SWEEP</text>}
          {i===4&&<text x={cx} y={y(c.h)-5} textAnchor="middle" fill="#10b981" fontSize="5" fontFamily="var(--font-m)" style={{textShadow:'0 0 4px rgba(16,185,129,0.5)'}}>DISP</text>}
        </g>;
      })}
      {/* Entry arrow — glowing */}
      <g filter="url(#c-glow)">
        <line x1={P.l+8*cw+cw/2} y1={y(5842)+10} x2={P.l+8*cw+cw/2} y2={y(5842)+2} stroke="#fbbf24" strokeWidth="1.5"/>
        <polygon points={(P.l+8*cw+cw/2-4)+','+(y(5842)+4)+' '+(P.l+8*cw+cw/2+4)+','+(y(5842)+4)+' '+(P.l+8*cw+cw/2)+','+y(5842)} fill="#fbbf24"/>
      </g>
      <text x={P.l+8*cw+cw/2+12} y={y(5842)+5} fill="#fbbf24" fontSize="6" fontWeight="600" fontFamily="var(--font-m)" style={{textShadow:'0 0 6px rgba(251,191,36,0.4)'}}>ENTRY</text>
      {/* Price labels */}
      {[5835,5840,5845,5850,5855,5860].filter(function(v){return v>=mn&&v<=mx;}).map(function(v){
        return <text key={v} x={P.l-4} y={y(v)+3} textAnchor="end" fill="rgba(255,255,255,0.15)" fontSize="5.5" fontFamily="var(--font-m)">{v}</text>;
      })}
    </svg>
  );
}

/* ── Animated Hero Background ── */
function HeroBg({color,variant}){
  var c=color||'#3b82f6';
  /* variant: 'grid' (Alex), 'flow' (Maya), 'constellation' (NF-13) */
  var v=variant||'grid';
  if(v==='constellation'){
    /* Gold constellation — floating dots with faint connections */
    var dots=[];for(var i=0;i<18;i++){dots.push({x:5+Math.sin(i*1.7)*40+50,y:8+Math.cos(i*2.3)*35+50,r:1+Math.random()*1.5,d:15+Math.random()*20});}
    return(
      <div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none'}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{width:'100%',height:'100%',opacity:0.35}}>
          {dots.map(function(d,i){
            var next=dots[(i+3)%dots.length];
            return <g key={i}>
              <line x1={d.x} y1={d.y} x2={next.x} y2={next.y} stroke={c} strokeWidth="0.15" opacity="0.3"/>
              <circle cx={d.x} cy={d.y} r={d.r} fill={c} opacity="0.5"><animate attributeName="opacity" values="0.3;0.7;0.3" dur={d.d+'s'} repeatCount="indefinite"/><animate attributeName="cx" values={(d.x-1)+';'+(d.x+1)+';'+(d.x-1)} dur={(d.d+5)+'s'} repeatCount="indefinite"/></circle>
            </g>;
          })}
        </svg>
      </div>
    );
  }
  if(v==='flow'){
    /* Cyan data flow — horizontal streaming lines */
    return(
      <div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none'}}>
        <svg viewBox="0 0 200 100" preserveAspectRatio="none" style={{width:'100%',height:'100%',opacity:0.2}}>
          {[15,30,45,60,75,88].map(function(y,i){
            var w=40+i*15;
            return <g key={i}>
              <line x1="0" y1={y} x2="200" y2={y} stroke={c} strokeWidth="0.2" opacity="0.15"/>
              <rect x={-w} y={y-0.5} width={w} height="1" rx="0.5" fill={c} opacity="0.6">
                <animate attributeName="x" from={-w} to={200+w} dur={(8+i*3)+'s'} repeatCount="indefinite"/>
              </rect>
            </g>;
          })}
        </svg>
      </div>
    );
  }
  /* Default: grid with pulse */
  return(
    <div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none'}}>
      <svg viewBox="0 0 200 100" preserveAspectRatio="none" style={{width:'100%',height:'100%',opacity:0.15}}>
        {/* Grid lines */}
        {[0,20,40,60,80,100,120,140,160,180,200].map(function(x){return <line key={'v'+x} x1={x} y1="0" x2={x} y2="100" stroke={c} strokeWidth="0.2" opacity="0.3"/>;})}
        {[0,12.5,25,37.5,50,62.5,75,87.5,100].map(function(y){return <line key={'h'+y} x1="0" y1={y} x2="200" y2={y} stroke={c} strokeWidth="0.2" opacity="0.3"/>;})}
        {/* Central glow pulse */}
        <circle cx="140" cy="35" r="15" fill={c} opacity="0.08"><animate attributeName="r" values="12;22;12" dur="6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.06;0.12;0.06" dur="6s" repeatCount="indefinite"/></circle>
      </svg>
    </div>
  );
}

Object.assign(window,{
  MockScreen:MockScreen,AlexThought:AlexThought,PhaseHead:PhaseHead,KpiGrid:KpiGrid,
  CodeBlock:CodeBlock,ExecLog:ExecLog,ChartDefs:ChartDefs,PulseDot:PulseDot,
  WtEquity:WtEquity,WtHeatmap:WtHeatmap,WtHistogram:WtHistogram,WtNullChart:WtNullChart,
  WtMCChart:WtMCChart,WtWFChart:WtWFChart,WtParamHeat:WtParamHeat,WtMultiEq:WtMultiEq,
  WtBars:WtBars,WtCandles:WtCandles,HeroBg:HeroBg,
});
