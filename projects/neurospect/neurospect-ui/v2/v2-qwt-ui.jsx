/* NeuroSpect v2 — Quant Walkthrough UI Components */

/* ── Maya's Note (technical callout) ── */
function MayaNote({children}){
  return(
    <div style={{display:'flex',gap:10,padding:'10px 14px',borderRadius:10,background:'linear-gradient(135deg,rgba(6,182,212,0.06),rgba(59,130,246,0.03))',border:'1px solid rgba(6,182,212,0.15)',margin:'10px 0',boxShadow:'0 0 12px rgba(6,182,212,0.05)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',left:0,top:0,bottom:0,width:2,background:'linear-gradient(180deg,#06b6d4,#3b82f6)',boxShadow:'0 0 8px rgba(6,182,212,0.4)'}}></div>
      <span style={{fontSize:'0.85rem',flexShrink:0,marginTop:1,marginLeft:4}}>🔬</span>
      <p style={{fontSize:'0.8rem',color:'var(--text-b)',lineHeight:1.6,fontStyle:'italic',margin:0}}>{children}</p>
    </div>
  );
}

/* ── Python Code Block with syntax highlighting ── */
function PyBlock({code}){
  var KW='def|class|return|if|else|elif|for|while|import|from|True|False|None|and|or|not|in|is|with|as|lambda|try|except|raise|pass|break|continue|yield';
  var kwRe=new RegExp('\\b('+KW+')\\b');
  var lines=code.split('\n');

  function tokenize(line){
    var tokens=[],i=0;
    while(i<line.length){
      if(line[i]==='"'||line[i]==="'"){
        var ch=line[i],j=i+1;
        while(j<line.length&&line[j]!==ch){if(line[j]==='\\')j++;j++;}
        tokens.push({t:'s',v:line.slice(i,j+1)});i=j+1;
      } else if(line[i]==='#'){
        tokens.push({t:'c',v:line.slice(i)});i=line.length;
      } else if(line[i]==='@'){
        var j=i+1;while(j<line.length&&/\w/.test(line[j]))j++;
        tokens.push({t:'d',v:line.slice(i,j)});i=j;
      } else if(/[a-zA-Z_]/.test(line[i])){
        var j=i;while(j<line.length&&/[\w]/.test(line[j]))j++;
        var w=line.slice(i,j);
        tokens.push({t:kwRe.test(w)?'k':'v',v:w});i=j;
      } else if(/\d/.test(line[i])){
        var j=i;while(j<line.length&&/[\d.]/.test(line[j]))j++;
        tokens.push({t:'n',v:line.slice(i,j)});i=j;
      } else {
        var j=i;while(j<line.length&&!/[a-zA-Z_\d"'#@]/.test(line[j]))j++;
        tokens.push({t:'p',v:line.slice(i,j)});i=j;
      }
    }
    return tokens;
  }

  var colors={k:'#c084fc',s:'#34d399',n:'#fbbf24',c:'rgba(255,255,255,0.22)',d:'#f59e0b',v:'var(--text-b)',p:'rgba(255,255,255,0.4)'};

  return(
    <div style={{background:'rgba(5,8,16,0.75)',border:'1px solid rgba(59,130,246,0.08)',borderRadius:8,padding:'10px',fontFamily:'var(--font-m)',fontSize:'0.6rem',lineHeight:1.7,overflowX:'auto',color:'var(--text-b)',maxHeight:340,overflowY:'auto',boxShadow:'inset 0 1px 0 rgba(59,130,246,0.06), 0 0 20px rgba(0,0,0,0.15)'}}>
      {lines.map(function(l,i){
        var toks=tokenize(l);
        return <div key={i} style={{display:'flex',gap:8,minHeight:'1.1em'}}>
          <span style={{color:'rgba(255,255,255,0.15)',width:20,textAlign:'right',flexShrink:0,userSelect:'none'}}>{i+1}</span>
          <span>{toks.map(function(tk,j){return <span key={j} style={{color:colors[tk.t]||'var(--text-b)'}}>{tk.v}</span>;})}</span>
        </div>;
      })}
    </div>
  );
}

/* ── Pipeline Diagram (SVG) ── */
function PipelineDiagram(){
  var W=520,H=340;
  var nodes=[
    {y:20,label:'Market Data',sub:'Tradovate WebSocket',color:'#3b82f6',w:180},
    {y:70,label:'Raw OHLCV Ingest',sub:'1s · 5s · 1m · 5m · 15m · 1H · 4H · D',color:'#06b6d4',w:260},
    {y:130,label:'Processors',items:['Tick Aggregation','Volume Profile','Session Segmentation','Microstructure'],color:'#8b5cf6',w:320},
    {y:200,label:'ICT Event Engine',items:['Sweep Detector','FVG Scanner','OB Identifier','MSS Detector','Session Tracker'],color:'#f59e0b',w:340},
    {y:270,label:'Feature Store',sub:'PostgreSQL + TimescaleDB',color:'#10b981',w:200},
    {y:310,label:'Model Training Pipeline',sub:'',color:'#ec4899',w:200},
  ];
  var cx=W/2;
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',display:'block'}}>
      <defs>
        <filter id="nd-glow" x="-20%" y="-30%" width="140%" height="160%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(59,130,246,0.4)"/></marker>
      </defs>
      {nodes.map(function(n,i){
        var x=cx-n.w/2,h=n.items?38:24;
        if(i<nodes.length-1){
          var ny=n.y+h+2,nextY=nodes[i+1].y;
          return <g key={i}>
            <line x1={cx} y1={ny} x2={cx} y2={nextY-2} stroke="rgba(59,130,246,0.2)" strokeWidth="1" markerEnd="url(#arr)"/>
            <rect x={x} y={n.y} width={n.w} height={h} rx="6" fill="rgba(15,22,41,0.8)" stroke={n.color+'40'} strokeWidth="1" style={{filter:'drop-shadow(0 0 6px '+n.color+'20)'}}/>
            <text x={cx} y={n.y+12} textAnchor="middle" fill={n.color} fontSize="7.5" fontWeight="600" fontFamily="var(--font-m)" style={{textShadow:'0 0 6px '+n.color+'40'}}>{n.label}</text>
            {n.sub&&<text x={cx} y={n.y+21} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="5.5" fontFamily="var(--font-m)">{n.sub}</text>}
            {n.items&&<g>{n.items.map(function(it,j){
              var iw=n.w/n.items.length;
              return <text key={j} x={x+j*iw+iw/2} y={n.y+28} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="5" fontFamily="var(--font-m)">{it}</text>;
            })}</g>}
          </g>;
        }
        return <g key={i}>
          <rect x={x} y={n.y} width={n.w} height={h} rx="6" fill="rgba(15,22,41,0.8)" stroke={n.color+'40'} strokeWidth="1" style={{filter:'drop-shadow(0 0 6px '+n.color+'20)'}}/>
          <text x={cx} y={n.y+14} textAnchor="middle" fill={n.color} fontSize="7.5" fontWeight="600" fontFamily="var(--font-m)" style={{textShadow:'0 0 6px '+n.color+'40'}}>{n.label}</text>
        </g>;
      })}
    </svg>
  );
}

/* ── Feature Importance Horizontal Bars ── */
function FeatureImpBars({data}){
  var W=420,H=data.length*18+8;var maxV=data[0].val;var bL=140;
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',display:'block'}}>
      <defs><filter id="fi-glow" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="fi-bar" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
      </defs>
      {data.map(function(d,i){
        var y=4+i*18,bW=(d.val/maxV)*(W-bL-40);var top=i<3;
        return <g key={i}>
          <text x={bL-4} y={y+10} textAnchor="end" fill={'rgba(255,255,255,'+(top?'0.6':'0.35')+')'} fontSize="5.5" fontFamily="var(--font-m)">{d.name}</text>
          <rect x={bL} y={y+2} width={bW} height={12} rx="2" fill="url(#fi-bar)" opacity={top?0.8:0.4} style={top?{filter:'url(#fi-glow)'}:{}}/>
          <text x={bL+bW+4} y={y+10} fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="var(--font-m)">{d.val.toFixed(3)}</text>
          <text x={W-10} y={y+10} textAnchor="end" fill={'rgba(255,255,255,'+(d.stab>0.85?'0.5':'0.25')+')'} fontSize="5" fontFamily="var(--font-m)">{d.stab.toFixed(2)}</text>
        </g>;
      })}
      <text x={bL-4} y={H} textAnchor="end" fill="rgba(255,255,255,0.1)" fontSize="5" fontFamily="var(--font-m)">Feature</text>
      <text x={W/2+40} y={H} textAnchor="middle" fill="rgba(255,255,255,0.1)" fontSize="5" fontFamily="var(--font-m)">Importance</text>
      <text x={W-10} y={H} textAnchor="end" fill="rgba(255,255,255,0.1)" fontSize="5" fontFamily="var(--font-m)">Stability</text>
    </svg>
  );
}

/* ── ROC Curve ── */
function ROCChart({curves}){
  var W=320,H=280,P={t:8,r:8,b:24,l:28};
  var sx=function(v){return P.l+v*(W-P.l-P.r);};
  var sy=function(v){return P.t+(1-v)*(H-P.t-P.b);};
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',maxWidth:340,display:'block'}}>
      <defs><filter id="roc-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      {/* Grid */}
      {[0,0.25,0.5,0.75,1].map(function(v){return <g key={v}>
        <line x1={sx(v)} y1={P.t} x2={sx(v)} y2={H-P.b} stroke="rgba(59,130,246,0.04)" strokeWidth="1"/>
        <line x1={P.l} y1={sy(v)} x2={W-P.r} y2={sy(v)} stroke="rgba(59,130,246,0.04)" strokeWidth="1"/>
        <text x={sx(v)} y={H-P.b+10} textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="5.5" fontFamily="var(--font-m)">{v.toFixed(1)}</text>
        <text x={P.l-4} y={sy(v)+3} textAnchor="end" fill="rgba(255,255,255,0.15)" fontSize="5.5" fontFamily="var(--font-m)">{v.toFixed(1)}</text>
      </g>;})}
      {/* Diagonal */}
      <line x1={sx(0)} y1={sy(0)} x2={sx(1)} y2={sy(1)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3"/>
      {/* Curves */}
      {curves.map(function(c,ci){
        var d=c.pts.map(function(p,i){return(i===0?'M':'L')+sx(p.fpr).toFixed(1)+','+sy(p.tpr).toFixed(1);}).join(' ');
        var isTop=ci>=3;
        return <g key={ci}>
          <path d={d} fill="none" stroke={c.color} strokeWidth={isTop?2:1.2} opacity={isTop?1:0.5} style={isTop?{filter:'url(#roc-glow)'}:{}}/>
        </g>;
      })}
      {/* Legend */}
      {curves.map(function(c,i){return <g key={i}>
        <line x1={W-P.r-80} y1={P.t+8+i*12} x2={W-P.r-68} y2={P.t+8+i*12} stroke={c.color} strokeWidth="2"/>
        <text x={W-P.r-64} y={P.t+11+i*12} fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="var(--font-m)">{c.name}</text>
      </g>;})}
      <text x={W/2} y={H-3} textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="5.5" fontFamily="var(--font-m)">False Positive Rate</text>
    </svg>
  );
}

/* ── Correlation Heatmap (14×14) ── */
function CorrHeatmap({data}){
  var n=data.length,cS=18,pL=4,pT=4;
  var W=pL+n*cS+4,H=pT+n*cS+4;
  function cc(v){
    if(v>=0.99)return'rgba(59,130,246,0.5)';
    var abs=Math.abs(v);
    if(v>0)return'rgba(59,130,246,'+(abs*0.45).toFixed(2)+')';
    return'rgba(239,68,68,'+(abs*0.45).toFixed(2)+')';
  }
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',maxWidth:300,display:'block'}}>
      {data.map(function(row,ri){return <g key={ri}>
        {row.map(function(v,ci){
          var high=Math.abs(v)>0.6&&ri!==ci;
          return <rect key={ci} x={pL+ci*cS} y={pT+ri*cS} width={cS-1} height={cS-1} rx="1.5" fill={cc(v)} style={high?{filter:'drop-shadow(0 0 3px rgba(59,130,246,0.3))'}:{}}/>;
        })}
      </g>;})}
    </svg>
  );
}

/* ── Signal Gauges ── */
function SignalGauges({signals}){
  var W=440,gW=100,gH=70;
  return(
    <svg viewBox={'0 0 '+W+' '+gH} style={{width:'100%',display:'block'}}>
      <defs><filter id="sg-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      {signals.map(function(s,i){
        var cx=i*gW+gW/2+10,cy=40,r=22;
        var pct=s.value/s.max;var angle=-140+pct*280;
        var rad=angle*Math.PI/180;
        var ex=cx+r*Math.cos(rad),ey=cy+r*Math.sin(rad);
        var arcEnd=140*Math.PI/180;
        return <g key={i}>
          {/* Background arc */}
          <path d={'M '+(cx+r*Math.cos(-140*Math.PI/180))+' '+(cy+r*Math.sin(-140*Math.PI/180))+' A '+r+' '+r+' 0 1 1 '+(cx+r*Math.cos(arcEnd))+' '+(cy+r*Math.sin(arcEnd))} fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="4" strokeLinecap="round"/>
          {/* Value arc */}
          <path d={'M '+(cx+r*Math.cos(-140*Math.PI/180))+' '+(cy+r*Math.sin(-140*Math.PI/180))+' A '+r+' '+r+' 0 '+(angle>0?1:0)+' 1 '+ex+' '+ey} fill="none" stroke={s.color} strokeWidth="4" strokeLinecap="round" filter="url(#sg-glow)"/>
          {/* Dot */}
          <circle cx={ex} cy={ey} r="3" fill={s.color}><animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/></circle>
          {/* Value */}
          <text x={cx} y={cy+2} textAnchor="middle" fill={s.color} fontSize="9" fontWeight="700" fontFamily="var(--font-m)" style={{textShadow:'0 0 6px '+s.color+'40'}}>{s.value}</text>
          {/* Label */}
          <text x={cx} y={cy+16} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="var(--font-m)">{s.label}</text>
        </g>;
      })}
    </svg>
  );
}

/* ── Layer Stack (5-layer safety) ── */
function LayerStack(){
  var W=420,layers=[
    {n:'5',label:'HUMAN OVERSIGHT',desc:'Kill switch · daily review · manual override',color:'#8b5cf6'},
    {n:'4',label:'PROP SHIELD',desc:'Per-account daily loss · trailing DD · consistency',color:'#f59e0b'},
    {n:'3',label:'PORTFOLIO RISK',desc:'Correlation limits · max positions · DD scaling',color:'#3b82f6'},
    {n:'2',label:'STRATEGY RISK',desc:'Kelly sizing · circuit breakers · regime scaling',color:'#06b6d4'},
    {n:'1',label:'SIGNAL VALIDATION',desc:'Min confluence · data quality · model confidence',color:'#10b981'},
  ];
  var lH=34,gap=3,H=layers.length*(lH+gap)+30;
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',display:'block'}}>
      <defs><filter id="ly-glow" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      {layers.map(function(l,i){
        var y=i*(lH+gap)+4;
        return <g key={i}>
          <rect x={10} y={y} width={W-20} height={lH} rx="6" fill="rgba(15,22,41,0.7)" stroke={l.color+'35'} strokeWidth="1" style={{filter:'drop-shadow(0 0 4px '+l.color+'15)'}}/>
          <rect x={10} y={y} width={4} height={lH} rx="2" fill={l.color} style={{filter:'url(#ly-glow)'}}/>
          <text x={24} y={y+13} fill={l.color} fontSize="7" fontWeight="700" fontFamily="var(--font-m)" style={{textShadow:'0 0 6px '+l.color+'30'}}>Layer {l.n}: {l.label}</text>
          <text x={24} y={y+24} fill="rgba(255,255,255,0.35)" fontSize="5.5" fontFamily="var(--font-m)">{l.desc}</text>
        </g>;
      })}
      <text x={W/2} y={H-6} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6" fontWeight="600" fontFamily="var(--font-m)">Trade must pass ALL 5 layers · Any layer can HALT</text>
    </svg>
  );
}

/* ── PSI Drift Bars ── */
function PSIBars({data}){
  var W=380,H=90,P={t:8,r:8,b:18,l:8};var bW=(W-P.l-P.r)/data.length;
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',maxWidth:400,display:'block'}}>
      <defs><filter id="psi-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      {/* Threshold line */}
      <line x1={P.l} y1={P.t+(1-0.1/0.25)*(H-P.t-P.b)} x2={W-P.r} y2={P.t+(1-0.1/0.25)*(H-P.t-P.b)} stroke="rgba(245,158,11,0.3)" strokeWidth="1" strokeDasharray="3 2"/>
      <text x={W-P.r+2} y={P.t+(1-0.1/0.25)*(H-P.t-P.b)+3} fill="rgba(245,158,11,0.4)" fontSize="5" fontFamily="var(--font-m)">threshold</text>
      {data.map(function(d,i){
        var bH=(d.psi/0.25)*(H-P.t-P.b);var x=P.l+i*bW;
        var warn=d.status==='warn';
        return <g key={i}>
          <rect x={x+3} y={H-P.b-bH} width={bW-6} height={bH} rx="2" fill={warn?'rgba(245,158,11,0.5)':'rgba(59,130,246,0.3)'} style={warn?{filter:'url(#psi-glow)'}:{}}/>
          {warn&&<rect x={x+3} y={H-P.b-bH} width={bW-6} height={bH} rx="2" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.6"><animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite"/></rect>}
          <text x={x+bW/2} y={H-P.b+10} textAnchor="middle" fill={'rgba(255,255,255,'+(warn?'0.5':'0.25')+')'} fontSize="5" fontFamily="var(--font-m)">{d.feat}</text>
          <text x={x+bW/2} y={H-P.b-bH-3} textAnchor="middle" fill={warn?'#f59e0b':'rgba(255,255,255,0.3)'} fontSize="5.5" fontWeight={warn?'600':'400'} fontFamily="var(--font-m)">{d.psi.toFixed(2)}</text>
        </g>;
      })}
    </svg>
  );
}

/* ── Deployment Pipeline Stages ── */
function DeployPipeline({active}){
  var stages=[
    {label:'Shadow 2wk',status:'pass',color:'#10b981'},
    {label:'Paper 2wk',status:'pass',color:'#10b981'},
    {label:'Live-Min 2wk',status:'running',color:'#3b82f6'},
    {label:'Live-Full',status:'pending',color:'var(--text-d)'},
  ];
  var W=440,H=48,sW=90,gap=20;
  return(
    <svg viewBox={'0 0 '+W+' '+H} style={{width:'100%',display:'block'}}>
      <defs><filter id="dp-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      {stages.map(function(s,i){
        var x=10+i*(sW+gap);var isRun=s.status==='running';var isDone=s.status==='pass';
        return <g key={i}>
          <rect x={x} y={8} width={sW} height={30} rx="8" fill={isDone?s.color+'15':isRun?'rgba(59,130,246,0.1)':'rgba(255,255,255,0.02)'} stroke={isDone?s.color+'40':isRun?'#3b82f680':'rgba(255,255,255,0.06)'} strokeWidth="1" style={isDone||isRun?{filter:'url(#dp-glow)'}:{}}/>
          {isRun&&<rect x={x} y={8} width={sW} height={30} rx="8" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.5"><animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite"/></rect>}
          <text x={x+sW/2} y={18} textAnchor="middle" fill={isDone?s.color:isRun?'var(--blue-400)':'var(--text-d)'} fontSize="6" fontWeight="600" fontFamily="var(--font-m)">{s.label}</text>
          <text x={x+sW/2} y={30} textAnchor="middle" fill={isDone?s.color:'rgba(255,255,255,0.3)'} fontSize="7" fontFamily="var(--font-m)">{isDone?'✅':isRun?'🔄':'○'}</text>
          {i<stages.length-1&&<line x1={x+sW+2} y1={23} x2={x+sW+gap-2} y2={23} stroke={isDone?s.color+'40':'rgba(255,255,255,0.06)'} strokeWidth="1" markerEnd="url(#arr)"/>}
        </g>;
      })}
    </svg>
  );
}

Object.assign(window,{
  MayaNote:MayaNote,PyBlock:PyBlock,PipelineDiagram:PipelineDiagram,
  FeatureImpBars:FeatureImpBars,ROCChart:ROCChart,CorrHeatmap:CorrHeatmap,
  SignalGauges:SignalGauges,LayerStack:LayerStack,PSIBars:PSIBars,
  DeployPipeline:DeployPipeline,
});
