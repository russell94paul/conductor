/* NeuroSpect v2 — NeuroFusion-13 Walkthrough UI Components (Gold Theme) */

/* ── Signal Status Dot ── */
function SigDot({verdict,size}){
  var s=size||6;
  var c=verdict==='positive'?'#10b981':verdict==='caution'?'#f59e0b':'var(--text-d)';
  return <span style={{display:'inline-block',width:s,height:s,borderRadius:'50%',background:c,boxShadow:'0 0 6px '+c,flexShrink:0}}></span>;
}

/* ── Gold-themed Section Header ── */
function NFSectionHead({num,title}){
  return(
    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
      <span className="mono" style={{fontSize:'1.6rem',fontWeight:800,color:'rgba(251,191,36,0.2)',lineHeight:1,textShadow:'0 0 20px rgba(251,191,36,0.1)'}}>{num}</span>
      <h2 style={{fontSize:'1.05rem',margin:0}}><span className="grad-text-gold">{title}</span></h2>
    </div>
  );
}

/* ── Architecture Layer Diagram (4-layer SVG) ── */
function ArchDiagram({onSelect,selected}){
  var W=520,H=280;
  var layers=[
    {y:6,h:44,label:'LAYER 4: META-ORCHESTRATION',color:'#fbbf24',sigs:[{n:13,name:'Meta-Orchestrator',x:200,w:140}]},
    {y:58,h:52,label:'LAYER 3: SYNTHESIS',color:'#f59e0b',sigs:[{n:10,name:'Causal',x:40,w:100},{n:11,name:'Self-Supervised',x:165,w:110},{n:12,name:'Evolutionary',x:300,w:100}]},
    {y:118,h:68,label:'LAYER 2: ANALYSIS',color:'#8b5cf6',sigs:[{n:4,name:'Semantic',x:10,w:75},{n:5,name:'Adversarial',x:92,w:80},{n:6,name:'Generative',x:180,w:80},{n:7,name:'Temporal',x:268,w:75},{n:8,name:'Uncertainty',x:350,w:80},{n:9,name:'Meta-Learn',x:438,w:75}]},
    {y:194,h:52,label:'LAYER 1: DATA FOUNDATION',color:'#3b82f6',sigs:[{n:1,name:'Statistical',x:55,w:100},{n:2,name:'Structural',x:185,w:100},{n:3,name:'Knowledge',x:315,w:100}]},
  ];
  return(
    <svg viewBox={'0 0 '+W+' '+(H)} style={{width:'100%',display:'block'}}>
      <defs>
        <filter id="arch-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <marker id="arch-arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 0 L 8 4 L 0 8 z" fill="rgba(251,191,36,0.3)"/></marker>
      </defs>
      {/* Connection arrows between layers */}
      {[{y1:50,y2:58},{y1:110,y2:118},{y1:186,y2:194}].map(function(a,i){
        return <line key={i} x1={W/2} y1={a.y1} x2={W/2} y2={a.y2} stroke="rgba(251,191,36,0.15)" strokeWidth="1" markerEnd="url(#arch-arr)"/>;
      })}
      {layers.map(function(lay,li){
        return <g key={li}>
          {/* Layer background */}
          <rect x={4} y={lay.y} width={W-8} height={lay.h} rx="8" fill="rgba(15,22,41,0.5)" stroke={lay.color+'25'} strokeWidth="1"/>
          <text x={12} y={lay.y+12} fill={lay.color} fontSize="5.5" fontWeight="600" fontFamily="var(--font-m)" opacity="0.5">{lay.label}</text>
          {/* Signal nodes */}
          {lay.sigs.map(function(s){
            var sig=NF_SIGNALS.find(function(ss){return ss.num===s.n;})||NF_SIG13;
            var sel=selected===s.n;
            var nodeY=lay.y+(s.n===13?18:lay.h>60?28:22);
            return <g key={s.n} style={{cursor:'pointer'}} onClick={function(){onSelect&&onSelect(s.n);}}>
              <rect x={s.x} y={nodeY} width={s.w} height={22} rx="5" fill={sel?sig.color+'20':'rgba(15,22,41,0.8)'} stroke={sel?sig.color:sig.color+'40'} strokeWidth={sel?1.5:0.8} style={sel?{filter:'url(#arch-glow)'}:{}}/>
              {sel&&<rect x={s.x} y={nodeY} width={s.w} height={22} rx="5" fill="none" stroke={sig.color} strokeWidth="1" opacity="0.5"><animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite"/></rect>}
              <circle cx={s.x+8} cy={nodeY+11} r="3" fill={sig.verdict==='positive'||s.n===13?'#10b981':sig.verdict==='caution'?'#f59e0b':'var(--text-d)'}/>
              <text x={s.x+14} y={nodeY+8} fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="var(--font-m)">S{s.n}</text>
              <text x={s.x+14} y={nodeY+16} fill={sel?'#fff':'rgba(255,255,255,0.55)'} fontSize="6" fontWeight={sel?'600':'400'} fontFamily="var(--font-m)">{s.name}</text>
            </g>;
          })}
        </g>;
      })}
      {/* Data flow label */}
      <text x={W-8} y={H-48} textAnchor="end" fill="rgba(251,191,36,0.15)" fontSize="5" fontFamily="var(--font-m)">Data flows up ↑</text>
    </svg>
  );
}

/* ── Signal Card (expandable) ── */
function SignalCard({sig,open,onToggle,active}){
  var s=sig;
  return(
    <div style={{borderRadius:10,overflow:'hidden',border:'1px solid '+(active?s.color+'40':'var(--border)'),background:active?'rgba(251,191,36,0.02)':'var(--surface)',transition:'all 0.3s',boxShadow:active?'0 0 12px '+s.color+'10':'none',marginBottom:6}}>
      <div onClick={onToggle} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 12px',cursor:'pointer'}}>
        <span className="mono" style={{fontSize:'0.65rem',color:s.color,fontWeight:700,width:20}}>S{s.num}</span>
        <SigDot verdict={s.verdict}/>
        <span style={{fontSize:'0.78rem',fontWeight:500,color:active?'var(--text-h)':'var(--text-b)',flex:1}}>{s.name}</span>
        <span className="mono" style={{fontSize:'0.6rem',color:'var(--text-d)'}}>{s.t}ms</span>
        <span className={'badge '+(s.verdict==='positive'?'badge-green':'badge-gold')} style={{fontSize:'0.5rem',padding:'1px 5px'}}>{s.vLabel}</span>
        <span style={{fontSize:'0.6rem',color:'var(--text-d)',transition:'transform 0.3s',transform:open?'rotate(180deg)':'rotate(0)'}}>▼</span>
      </div>
      <div style={{maxHeight:open?500:0,overflow:'hidden',transition:'max-height 0.5s cubic-bezier(0.16,1,0.3,1)'}}>
        <div style={{padding:'0 12px 10px',borderTop:'1px solid '+s.color+'15'}}>
          <p style={{fontSize:'0.7rem',color:'var(--text-m)',margin:'6px 0 8px',fontStyle:'italic'}}>{s.desc}</p>
          <div style={{display:'flex',flexDirection:'column',gap:3}}>
            {s.details.map(function(d,i){
              var warn=d[0].indexOf('⚠')>-1;
              return <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'2px 6px',borderRadius:4,background:warn?'rgba(245,158,11,0.04)':'rgba(59,130,246,0.02)'}}>
                <span style={{fontSize:'0.68rem',color:warn?'var(--gold-400)':'var(--text-d)'}}>{d[0]}</span>
                <span className="mono" style={{fontSize:'0.68rem',color:warn?'var(--gold-400)':'var(--text-b)'}}>{d[1]}</span>
              </div>;
            })}
          </div>
          <div style={{marginTop:6,fontSize:'0.68rem',color:s.color,fontFamily:'var(--font-m)'}}>{s.summary}</div>
          <div style={{display:'flex',gap:8,marginTop:4}}>
            <span style={{fontSize:'0.6rem',color:'var(--text-d)'}}>Score: <span className="mono" style={{color:'var(--text-b)'}}>{s.rawScore}</span></span>
            <span style={{fontSize:'0.6rem',color:'var(--text-d)'}}>Weight: <span className="mono" style={{color:'var(--text-b)'}}>{s.baseW}→{s.regW}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Radar Chart (12 axes) ── */
function RadarChart({signals,toggles}){
  var W=300,H=300,cx=W/2,cy=H/2,r=110;
  var n=signals.length;
  function polar(i,val){
    var angle=(Math.PI*2*i/n)-Math.PI/2;
    return{x:cx+val*r*Math.cos(angle),y:cy+val*r*Math.sin(angle)};
  }
  // Grid rings
  var rings=[0.25,0.5,0.75,1.0];
  // Data polygon
  var pts=signals.map(function(s,i){
    var val=(toggles&&!toggles[i])?0:(s.rawScore*s.regW);
    return polar(i,val);
  });
  var polyPath=pts.map(function(p,i){return(i===0?'M':'L')+p.x.toFixed(1)+','+p.y.toFixed(1);}).join(' ')+'Z';
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',maxWidth:320,display:'block',margin:'0 auto'}}>
      <defs>
        <filter id="rad-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="rad-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fbbf24" stopOpacity="0.15"/><stop offset="100%" stopColor="#fbbf24" stopOpacity="0.03"/></linearGradient>
      </defs>
      {/* Grid */}
      {rings.map(function(rv){
        var ringPts=[];for(var i=0;i<n;i++){var p=polar(i,rv);ringPts.push(p.x.toFixed(1)+','+p.y.toFixed(1));}
        return <polygon key={rv} points={ringPts.join(' ')} fill="none" stroke="rgba(251,191,36,0.06)" strokeWidth="0.5"/>;
      })}
      {/* Axes */}
      {signals.map(function(s,i){
        var p=polar(i,1.0);var lp=polar(i,1.15);
        return <g key={i}>
          <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(251,191,36,0.06)" strokeWidth="0.5"/>
          <text x={lp.x} y={lp.y+3} textAnchor="middle" fill={toggles&&!toggles[i]?'rgba(255,255,255,0.1)':'rgba(255,255,255,0.3)'} fontSize="5" fontFamily="var(--font-m)">S{s.num}</text>
        </g>;
      })}
      {/* Data polygon */}
      <polygon points={pts.map(function(p){return p.x.toFixed(1)+','+p.y.toFixed(1);}).join(' ')} fill="url(#rad-fill)" stroke="#fbbf24" strokeWidth="1.5" filter="url(#rad-glow)"/>
      {/* Data points */}
      {pts.map(function(p,i){
        var on=!toggles||toggles[i];
        return on?<circle key={i} cx={p.x} cy={p.y} r="3" fill={signals[i].color} style={{filter:'drop-shadow(0 0 4px '+signals[i].color+')'}}/>:null;
      })}
    </svg>
  );
}

/* ── Fusion Table (with toggles) ── */
function FusionTable({signals,toggles,onToggle}){
  var wSum=0,sSum=0;
  signals.forEach(function(s,i){
    if(!toggles||toggles[i]){var w=s.regW;wSum+=w;sSum+=s.rawScore*w;}
  });
  var confluence=wSum>0?(sSum/wSum*100):0;
  return(
    <div>
      <table className="tbl" style={{marginBottom:8}}>
        <thead><tr><th style={{width:24}}></th><th>Signal</th><th>Verdict</th><th>Score</th><th>Weight</th><th>Contrib</th></tr></thead>
        <tbody>{signals.map(function(s,i){
          var on=!toggles||toggles[i];
          return <tr key={s.num} style={{opacity:on?1:0.3,transition:'opacity 0.3s'}}>
            <td><div onClick={function(){onToggle&&onToggle(i);}} style={{width:16,height:16,borderRadius:4,border:'1.5px solid '+(on?s.color:'var(--text-d)'),background:on?s.color+'20':'transparent',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
              {on&&<span style={{fontSize:'0.55rem',color:s.color}}>✓</span>}
            </div></td>
            <td><span style={{display:'flex',alignItems:'center',gap:4}}><span className="mono" style={{fontSize:'0.6rem',color:s.color}}>S{s.num}</span><span style={{fontSize:'0.72rem'}}>{s.short}</span></span></td>
            <td><span className={'badge '+(s.verdict==='positive'?'badge-green':'badge-gold')} style={{fontSize:'0.45rem',padding:'1px 4px'}}>{s.verdict==='positive'?'✅':'⚠'}</span></td>
            <td className="mono" style={{fontSize:'0.72rem'}}>{s.rawScore}</td>
            <td className="mono" style={{fontSize:'0.72rem',color:'var(--text-m)'}}>{s.regW}</td>
            <td className="mono" style={{fontSize:'0.72rem',color:on?'var(--gold-400)':'var(--text-d)'}}>{on?(s.rawScore*s.regW).toFixed(3):'—'}</td>
          </tr>;
        })}</tbody>
      </table>
      {/* Confluence bar */}
      <div style={{padding:'8px 12px',borderRadius:8,background:'rgba(251,191,36,0.04)',border:'1px solid rgba(251,191,36,0.12)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
          <span className="label" style={{color:'var(--gold-400)'}}>Confluence Score</span>
          <span className="mono" style={{fontSize:'1.1rem',fontWeight:700,color:confluence>=65?'#fbbf24':confluence>=50?'var(--gold-400)':'#ef4444',textShadow:'0 0 8px '+(confluence>=65?'rgba(251,191,36,0.4)':'rgba(239,68,68,0.3)')}}>{confluence.toFixed(1)}</span>
        </div>
        <div style={{width:'100%',height:6,borderRadius:3,background:'rgba(251,191,36,0.08)'}}>
          <div style={{width:Math.min(confluence,100)+'%',height:'100%',borderRadius:3,background:confluence>=65?'linear-gradient(90deg,#f59e0b,#fbbf24)':'linear-gradient(90deg,#ef4444,#f59e0b)',boxShadow:'0 0 8px '+(confluence>=65?'rgba(251,191,36,0.3)':'rgba(239,68,68,0.2)'),transition:'width 0.5s ease'}}></div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:2}}>
          <span style={{fontSize:'0.55rem',color:'var(--text-d)'}}>0</span>
          <span style={{fontSize:'0.55rem',color:confluence>=65?'rgba(251,191,36,0.4)':'rgba(239,68,68,0.3)'}}>Threshold: 65</span>
          <span style={{fontSize:'0.55rem',color:'var(--text-d)'}}>100</span>
        </div>
      </div>
    </div>
  );
}

/* ── Decision Card (final output) ── */
function DecisionCard({d}){
  return(
    <div className="card-sihre sihre-glow" style={{borderRadius:'var(--radius)',overflow:'hidden',padding:0}}>
      <div style={{padding:'10px 16px',background:'linear-gradient(135deg,rgba(251,191,36,0.08),rgba(245,158,11,0.03))',borderBottom:'1px solid rgba(251,191,36,0.15)'}}>
        <span className="mono" style={{fontSize:'0.85rem',fontWeight:700,color:'#fbbf24',textShadow:'0 0 8px rgba(251,191,36,0.4)'}}>NEUROFUSION-13 DECISION</span>
      </div>
      <div style={{padding:'12px 16px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px 16px'}}>
        {[['ACTION',d.action,'#fbbf24'],['ENTRY',d.entry,'var(--text-h)'],['STOP',d.stop,'#ef4444'],['TARGET',d.target,'#10b981'],['SIZE',d.size,'var(--text-h)'],['RISK',d.risk,'var(--text-m)'],['REGIME',d.regime,'var(--blue-400)'],['SESSION',d.session,'var(--blue-400)']].map(function(r){
          return <div key={r[0]}>
            <span style={{fontSize:'0.55rem',color:'var(--text-d)',fontFamily:'var(--font-m)',textTransform:'uppercase',letterSpacing:'0.04em'}}>{r[0]}</span>
            <div className="mono" style={{fontSize:'0.78rem',fontWeight:600,color:r[2]}}>{r[1]}</div>
          </div>;
        })}
      </div>
      <div style={{padding:'8px 16px',borderTop:'1px solid rgba(251,191,36,0.1)',display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:6}}>
        <span className="mono" style={{fontSize:'0.62rem',color:'var(--text-d)'}}>Confluence: <span style={{color:'#fbbf24'}}>{d.confluence}</span>/100</span>
        <span className="mono" style={{fontSize:'0.62rem',color:'var(--text-d)'}}>Confidence: <span style={{color:'#10b981'}}>{d.confidence}</span></span>
        <span className="mono" style={{fontSize:'0.62rem',color:'var(--text-d)'}}>Latency: <span style={{color:'var(--blue-400)'}}>{d.latency}</span></span>
        <span className="mono" style={{fontSize:'0.62rem',color:'var(--text-d)'}}>Audit: {d.audit}</span>
      </div>
    </div>
  );
}

/* ── Architecture Comparison Diagrams ── */
function ArchComparison(){
  var W=480,H=220;
  var models=[
    {y:10,label:'Single Model',color:'#ef4444',desc:'One type of reasoning',nodes:['Market Data','One Model','Decision'],problem:'If the model is wrong, there\'s no check.'},
    {y:80,label:'Standard Ensemble',color:'#f59e0b',desc:'Same reasoning, different params',nodes:['Market Data','Model A\nModel B\nModel C','Average','Decision'],problem:'All models make the same TYPE of mistake.'},
    {y:155,label:'NeuroFusion-13 (SIHRE)',color:'#fbbf24',desc:'13 fundamentally different reasoning types',nodes:['Market Data','12 Heterogeneous\nSignals','Meta-Orchestrator','Decision'],best:true},
  ];
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',display:'block'}}>
      <defs><filter id="cmp-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      {models.map(function(m){
        var nodeW=m.nodes.length===3?[90,120,90]:[80,90,90,80];
        var gap=20,totalW=0;nodeW.forEach(function(w){totalW+=w;});totalW+=(nodeW.length-1)*gap;
        var startX=(W-totalW)/2;
        return <g key={m.label}>
          <text x={8} y={m.y+10} fill={m.color} fontSize="6.5" fontWeight="700" fontFamily="var(--font-m)" style={m.best?{filter:'url(#cmp-glow)'}:{}}>{m.label}</text>
          <text x={8} y={m.y+20} fill="rgba(255,255,255,0.25)" fontSize="5" fontFamily="var(--font-m)">{m.desc}</text>
          {m.nodes.map(function(n,ni){
            var x=startX;for(var k=0;k<ni;k++)x+=nodeW[k]+gap;
            var w=nodeW[ni];
            return <g key={ni}>
              <rect x={x} y={m.y+28} width={w} height={26} rx="5" fill={m.best&&ni>=1?m.color+'12':'rgba(15,22,41,0.7)'} stroke={m.best&&ni>=1?m.color+'40':m.color+'20'} strokeWidth="0.8" style={m.best&&ni>=1?{filter:'url(#cmp-glow)'}:{}}/>
              <text x={x+w/2} y={m.y+43} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="5" fontFamily="var(--font-m)">{n.split('\n')[0]}</text>
              {ni<m.nodes.length-1&&<line x1={x+w+2} y1={m.y+41} x2={x+w+gap-2} y2={m.y+41} stroke={m.color+'30'} strokeWidth="1" markerEnd="url(#arch-arr)"/>}
            </g>;
          })}
          {m.problem&&<text x={W-8} y={m.y+60} textAnchor="end" fill="rgba(239,68,68,0.35)" fontSize="5" fontFamily="var(--font-m)">{m.problem}</text>}
        </g>;
      })}
    </svg>
  );
}

Object.assign(window,{
  SigDot:SigDot,NFSectionHead:NFSectionHead,ArchDiagram:ArchDiagram,
  SignalCard:SignalCard,RadarChart:RadarChart,FusionTable:FusionTable,
  DecisionCard:DecisionCard,ArchComparison:ArchComparison,
});
