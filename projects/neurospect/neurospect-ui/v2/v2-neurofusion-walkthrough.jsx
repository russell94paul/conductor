/* NeuroSpect v2 — NeuroFusion-13 Walkthrough: Inside the 13-Signal Pipeline */

function NeuroFusionWalkthroughPage(){
  /* State */
  var secSt=React.useState(0);var activeSec=secSt[0],setActiveSec=secSt[1];
  var selSig=React.useState(null);var selectedSig=selSig[0],setSelectedSig=selSig[1];
  var openSigs=React.useState({});var openMap=openSigs[0],setOpenMap=openSigs[1];
  var waterSt=React.useState(-1);var waterLevel=waterSt[0],setWaterLevel=waterSt[1];
  var togglesSt=React.useState(NF_SIGNALS.map(function(){return true;}));
  var toggles=togglesSt[0],setToggles=togglesSt[1];

  function toggleSig(i){var next=openMap[i]?false:true;var m={};m[i]=next;setOpenMap(Object.assign({},openMap,m));}
  function toggleFusion(i){var t=toggles.slice();t[i]=!t[i];setToggles(t);}
  function resetToggles(){setToggles(NF_SIGNALS.map(function(){return true;}));}

  function runWaterfall(){
    setWaterLevel(0);
    var timings=[0,12,28,45,62,95,108,120,135,155,170,185];
    var idx=0;
    function next(){
      if(idx>=timings.length)return;
      var delay=idx===0?200:(timings[idx]-timings[idx-1])*8+100;
      setTimeout(function(){setWaterLevel(idx+1);idx++;next();},delay);
    }
    next();
  }

  /* Scroll tracking */
  React.useEffect(function(){
    var secs=document.querySelectorAll('[data-nf-sec]');if(!secs.length)return;
    var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting)setActiveSec(parseInt(e.target.dataset.nfSec));});},{threshold:0.12,rootMargin:'-50px 0px 0px 0px'});
    secs.forEach(function(s){obs.observe(s);});return function(){obs.disconnect();};
  },[]);

  function scrollTo(id){var el=document.getElementById('nf-'+id);if(el){var top=el.getBoundingClientRect().top+window.pageYOffset-56;window.scrollTo({top:top,behavior:'smooth'});}}

  var SECTIONS=[
    {id:'arch',num:'01',title:'The 13 Signals'},
    {id:'live',num:'02',title:'Live Trade Breakdown'},
    {id:'fusion',num:'03',title:'Meta-Orchestrator'},
    {id:'post',num:'04',title:'Self-Improvement'},
    {id:'no',num:'05',title:'When It Says NO'},
    {id:'compare',num:'06',title:'Why 13 Signals?'},
  ];

  return(
    <div className="page">
      {/* ═══ HERO ═══ */}
      <Rv><div className="hero-grad" style={{padding:'clamp(1.5rem,4vw,2.5rem)',marginBottom:'1rem',background:'linear-gradient(135deg,rgba(251,191,36,0.06),rgba(245,158,11,0.02),transparent 70%)',position:'relative',overflow:'hidden'}}>
        <HeroBg color="#fbbf24" variant="constellation"/>        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
          <span className="badge badge-gold"><span className="badge-dot"></span>Patent Pending</span>
          <span className="badge badge-gold" style={{background:'rgba(251,191,36,0.15)'}}>Deep Technical Walkthrough</span>
        </div>
        <h1 style={{marginBottom:8}}><span className="grad-text-gold">NeuroFusion-13</span></h1>
        <p style={{fontFamily:'var(--font-h)',fontWeight:500,fontSize:'0.78rem',color:'var(--gold-400)',letterSpacing:'0.05em',marginBottom:8}}>SELF-IMPROVING HETEROGENEOUS REASONING ENSEMBLE</p>
        <p style={{fontSize:'0.88rem',color:'var(--text-b)',maxWidth:580,lineHeight:1.65}}>Follow a single trade through all 13 reasoning signals in real-time. See exactly what each signal contributes, how they disagree, and how the meta-orchestrator resolves conflicts into a single decision.</p>
        {/* Trade context card */}
        <div style={{display:'flex',alignItems:'center',gap:10,marginTop:16,padding:'8px 14px',borderRadius:10,background:'rgba(251,191,36,0.04)',border:'1px solid rgba(251,191,36,0.12)',maxWidth:500}}>
          <div className="sihre-ring" style={{width:32,height:32,borderWidth:1.5}}>
            <span style={{fontFamily:'var(--font-h)',fontWeight:800,fontSize:'0.7rem',color:'var(--gold-400)'}}>13</span>
          </div>
          <div>
            <span className="mono" style={{fontSize:'0.72rem',color:'var(--gold-300)'}}>ES Long @ 5842.25</span>
            <span style={{fontSize:'0.62rem',color:'var(--text-d)',marginLeft:8}}>03:14 ET · London Session · Sweep + FVG Retest</span>
          </div>
        </div>
      </div></Rv>

      {/* ═══ STICKY NAV ═══ */}
      <div style={{position:'sticky',top:0,zIndex:50,background:'rgba(5,8,16,0.92)',backdropFilter:'blur(12px)',padding:'6px 0',borderBottom:'1px solid rgba(251,191,36,0.08)',marginBottom:'1.5rem'}}>
        <div style={{display:'flex',gap:3,overflowX:'auto',padding:'0 2px'}}>
          {SECTIONS.map(function(s,i){var act=activeSec===i;return(
            <button key={s.id} onClick={function(){scrollTo(s.id);}} style={{display:'flex',alignItems:'center',gap:3,padding:'4px 8px',borderRadius:5,whiteSpace:'nowrap',fontSize:'0.6rem',fontWeight:600,fontFamily:'var(--font-m)',background:act?'rgba(251,191,36,0.1)':'transparent',border:'1px solid '+(act?'rgba(251,191,36,0.3)':'transparent'),color:act?'var(--gold-400)':'var(--text-d)',transition:'all 0.2s',cursor:'pointer'}}>
              {s.num} {s.title}
            </button>
          );})}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 1: ARCHITECTURE OVERVIEW
         ══════════════════════════════════════════ */}
      <section data-nf-sec="0" id="nf-arch" style={{marginBottom:'2rem'}}>
        <Rv><NFSectionHead num="01" title="The 13 Signals — Architecture"/>
        <MockScreen title="Signal Architecture Map" color="#fbbf24">
          <ArchDiagram selected={selectedSig} onSelect={function(n){setSelectedSig(selectedSig===n?null:n);}}/>
          <div style={{fontSize:'0.62rem',color:'var(--text-d)',textAlign:'center',marginTop:4}}>Click any signal to select · 4 layers of heterogeneous reasoning</div>
        </MockScreen>

        {/* Selected signal detail */}
        {selectedSig&&(function(){
          var sig=NF_SIGNALS.find(function(s){return s.num===selectedSig;})||NF_SIG13;
          return <div className="card card-sihre" style={{marginBottom:12,padding:'12px 16px'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
              <span className="mono" style={{fontSize:'0.85rem',fontWeight:700,color:sig.color}}>Signal {sig.num}</span>
              <span style={{fontSize:'0.9rem',fontWeight:600,color:'var(--text-h)'}}>{sig.name}</span>
              <span className="badge badge-gold" style={{fontSize:'0.5rem',marginLeft:'auto'}}>{sig.type}</span>
            </div>
            <p style={{fontSize:'0.78rem',color:'var(--text-m)',lineHeight:1.5}}>{sig.desc}</p>
            {sig.details&&<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4,marginTop:8}}>
              {sig.details.map(function(d,i){return <div key={i} style={{padding:'3px 6px',borderRadius:4,background:'rgba(59,130,246,0.03)'}}>
                <span style={{fontSize:'0.6rem',color:'var(--text-d)'}}>{d[0]}</span>
                <div className="mono" style={{fontSize:'0.7rem',color:'var(--text-b)'}}>{d[1]}</div>
              </div>;})}
            </div>}
          </div>;
        })()}

        {/* Signal cards grid — compact */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:4}}>
          {NF_SIGNALS.map(function(s){
            return <div key={s.num} onClick={function(){setSelectedSig(s.num);}} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 10px',borderRadius:6,background:'var(--surface)',border:'1px solid '+(selectedSig===s.num?s.color+'40':'var(--border)'),cursor:'pointer',transition:'all 0.2s'}}>
              <span className="mono" style={{fontSize:'0.6rem',color:s.color,fontWeight:700,width:18}}>S{s.num}</span>
              <SigDot verdict={s.verdict} size={5}/>
              <span style={{fontSize:'0.72rem',color:'var(--text-b)',flex:1}}>{s.name}</span>
              <span style={{fontSize:'0.55rem',color:'var(--text-d)',fontFamily:'var(--font-m)'}}>L{s.layer}</span>
            </div>;
          })}
        </div>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2: LIVE TRADE BREAKDOWN
         ══════════════════════════════════════════ */}
      <section data-nf-sec="1" id="nf-live" style={{marginBottom:'2rem'}}>
        <Rv><NFSectionHead num="02" title="Live Trade — Signal-by-Signal"/>
        <div style={{padding:'8px 14px',borderRadius:8,background:'rgba(251,191,36,0.04)',border:'1px solid rgba(251,191,36,0.1)',marginBottom:12}}>
          <p style={{fontSize:'0.78rem',color:'var(--text-b)',margin:0,lineHeight:1.5}}>03:14 AM ET · ES @ 5841.50 · Liquidity sweep below London low (5838.25) · Displacement candle printed · FVG formed (5840.75–5842.25) · Price retesting FVG.</p>
          <p style={{fontSize:'0.82rem',color:'var(--gold-300)',fontWeight:600,margin:'4px 0 0'}}>Should we go long?</p>
        </div>

        <MockScreen title="Signal Processing Waterfall" color="#fbbf24"
          toolbar={<button className="btn btn-gold btn-sm" onClick={runWaterfall} style={{fontSize:'0.65rem',padding:'3px 10px'}}>▶ Process Trade</button>}>
          {waterLevel<0&&<div style={{textAlign:'center',padding:'2rem 0',color:'var(--text-d)',fontSize:'0.8rem'}}>Click <strong style={{color:'var(--gold-400)'}}>Process Trade</strong> to watch all 13 signals fire sequentially</div>}
          {waterLevel>=0&&<div style={{display:'flex',flexDirection:'column',gap:0}}>
            {NF_SIGNALS.slice(0,Math.min(waterLevel,12)).map(function(s,i){
              return <SignalCard key={s.num} sig={s} open={openMap[s.num]} onToggle={function(){toggleSig(s.num);}} active={i===waterLevel-1}/>;
            })}
            {waterLevel<12&&<div style={{textAlign:'center',padding:'8px',color:'var(--gold-400)',fontSize:'0.72rem',fontFamily:'var(--font-m)'}}>
              Processing Signal {waterLevel+1}...<span style={{animation:'dot-pulse 1s ease-in-out infinite',marginLeft:4}}>▊</span>
            </div>}
            {waterLevel>=12&&<div style={{padding:'8px 12px',borderRadius:8,marginTop:4,background:'rgba(251,191,36,0.06)',border:'1px solid rgba(251,191,36,0.15)',textAlign:'center'}}>
              <span className="mono" style={{fontSize:'0.75rem',color:'#fbbf24',fontWeight:600,textShadow:'0 0 8px rgba(251,191,36,0.3)'}}>All 12 signals processed in 185ms → Signal 13 fusing...</span>
            </div>}
          </div>}
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3: META-ORCHESTRATOR (FUSION)
         ══════════════════════════════════════════ */}
      <section data-nf-sec="2" id="nf-fusion" style={{marginBottom:'2rem'}}>
        <Rv><NFSectionHead num="03" title="Signal 13 — Meta-Orchestrator"/>
        <div style={{fontSize:'0.78rem',color:'var(--text-m)',lineHeight:1.5,marginBottom:12,padding:'8px 12px',borderRadius:6,background:'rgba(251,191,36,0.03)',border:'1px solid rgba(251,191,36,0.08)'}}>
          <strong style={{color:'var(--gold-300)'}}>Attention-Weighted Fusion:</strong> Confluence = Σ(signal<sub>i</sub> × weight<sub>i</sub>) / Σ(weight<sub>i</sub>), where weight<sub>i</sub> = base × regime_modifier × recency_decay × confidence_penalty
        </div>

        <div className="bento bento-2" style={{marginBottom:12}}>
          <MockScreen title="Fusion Table — Toggle Signals" color="#fbbf24">
            <FusionTable signals={NF_SIGNALS} toggles={toggles} onToggle={toggleFusion}/>
            <div style={{textAlign:'center',marginTop:6}}>
              <button className="btn btn-ghost btn-sm" onClick={resetToggles} style={{fontSize:'0.62rem',padding:'2px 8px'}}>Reset All</button>
              <span style={{fontSize:'0.58rem',color:'var(--text-d)',marginLeft:8}}>Toggle signals off to see how confluence changes</span>
            </div>
          </MockScreen>
          <MockScreen title="Signal Contribution Radar" color="#fbbf24">
            <RadarChart signals={NF_SIGNALS} toggles={toggles}/>
          </MockScreen>
        </div>

        {/* Conflict resolution */}
        <MockScreen title="Conflict Resolution" color="#fbbf24">
          <div style={{display:'flex',flexDirection:'column',gap:4}}>
            <div style={{display:'flex',justifyContent:'space-between',padding:'4px 8px',borderRadius:5,background:'rgba(16,185,129,0.04)'}}>
              <span style={{fontSize:'0.72rem',color:'var(--text-b)'}}>Agreeing signals</span>
              <span className="mono" style={{fontSize:'0.72rem',color:'#10b981',fontWeight:600}}>11 of 12 ✅</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',padding:'4px 8px',borderRadius:5,background:'rgba(245,158,11,0.04)'}}>
              <span style={{fontSize:'0.72rem',color:'var(--text-b)'}}>Conflicting</span>
              <span className="mono" style={{fontSize:'0.72rem',color:'var(--gold-400)'}}>Signal 5 (Adversarial) — SOFT DISAGREEMENT</span>
            </div>
          </div>
          <div style={{marginTop:8,padding:'8px 12px',borderRadius:6,background:'rgba(251,191,36,0.03)',border:'1px solid rgba(251,191,36,0.08)'}}>
            <div className="label" style={{color:'var(--gold-400)',marginBottom:4}}>Resolution: Acknowledge & Adjust</div>
            <div style={{display:'flex',flexDirection:'column',gap:2}}>
              {['→ Reduce position size 15% (volume concern)','→ Tighten initial stop by 1 tick','→ Log concern for post-trade analysis'].map(function(r){
                return <span key={r} className="mono" style={{fontSize:'0.65rem',color:'var(--text-m)'}}>{r}</span>;
              })}
            </div>
          </div>
        </MockScreen>

        {/* Final Decision */}
        <Rv delay={60}>
          <DecisionCard d={NF_DECISION}/>
        </Rv>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4: POST-TRADE LEARNING
         ══════════════════════════════════════════ */}
      <section data-nf-sec="3" id="nf-post" style={{marginBottom:'2rem'}}>
        <Rv><NFSectionHead num="04" title="Post-Trade — Self-Improvement"/>
        <div style={{padding:'8px 14px',borderRadius:8,background:'rgba(16,185,129,0.04)',border:'1px solid rgba(16,185,129,0.12)',marginBottom:12}}>
          <span className="mono" style={{fontSize:'0.78rem',color:'#10b981',fontWeight:600}}>Trade hit target at 03:52 AM · +2.5R · +$1,250 across 2 contracts</span>
        </div>

        <MockScreen title="Signal Accuracy Scorecard" color="#10b981">
          <table className="tbl"><thead><tr><th>Signal</th><th>Prediction</th><th>Actual</th><th>Accurate</th><th>Weight Update</th></tr></thead>
          <tbody>{NF_POST_TRADE.map(function(p){
            return <tr key={p.sig}><td className="mono" style={{color:NF_SIGNALS[p.sig-1]?NF_SIGNALS[p.sig-1].color:'var(--text-m)'}}>S{p.sig} {NF_SIGNALS[p.sig-1]?NF_SIGNALS[p.sig-1].short:''}</td>
              <td style={{fontSize:'0.72rem'}}>{p.prediction}</td>
              <td style={{fontSize:'0.72rem'}}>{p.actual}</td>
              <td><span className={'badge '+(p.accurate?'badge-green':'badge-red')} style={{fontSize:'0.5rem',padding:'1px 5px'}}>{p.accurate?'✅ Correct':'❌ Over-cautious'}</span></td>
              <td className="mono" style={{fontSize:'0.72rem',color:p.wAfter>p.wBefore?'#10b981':'#ef4444'}}>{p.wBefore} → {p.wAfter} {p.wAfter>p.wBefore?'↑':'↓'}</td>
            </tr>;
          })}</tbody></table>
        </MockScreen>

        <MockScreen title="Learning Loop" color="#10b981">
          <div style={{display:'flex',flexDirection:'column',gap:4}}>
            {[
              ['Signal 5 overcautious about volume','Weight decreased 0.45 → 0.43 (system learns from its own conservatism)','#f59e0b'],
              ['Win rate Bayesian update','62.6% → 62.8% (new data point incorporated)','var(--blue-400)'],
              ['NeuroGraph','1 new node (this trade), 4 new edges (London Sweep, ES, trending regime, FVG level)','#8b5cf6'],
              ['Next validation','Data included in walk-forward window, Monte Carlo set, evolutionary fitness eval','#10b981'],
            ].map(function(r){
              return <div key={r[0]} style={{padding:'6px 10px',borderRadius:6,background:'rgba(59,130,246,0.03)',borderLeft:'2px solid '+r[2]}}>
                <div style={{fontSize:'0.72rem',fontWeight:600,color:'var(--text-h)',marginBottom:1}}>{r[0]}</div>
                <div style={{fontSize:'0.68rem',color:'var(--text-m)'}}>{r[1]}</div>
              </div>;
            })}
          </div>
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5: WHEN IT SAYS NO
         ══════════════════════════════════════════ */}
      <section data-nf-sec="4" id="nf-no" style={{marginBottom:'2rem'}}>
        <Rv><NFSectionHead num="05" title="When NeuroFusion Says NO"/>
        <div style={{padding:'10px 14px',borderRadius:8,background:'rgba(239,68,68,0.04)',border:'1px solid rgba(239,68,68,0.12)',marginBottom:12}}>
          <p style={{fontSize:'0.78rem',color:'var(--text-b)',margin:0,lineHeight:1.5}}>{NF_NO_TRADE.context}</p>
        </div>

        <div className="bento bento-2" style={{marginBottom:12}}>
          <div>
            <div className="label" style={{color:'#10b981',marginBottom:6}}>Signals that agree (looks valid)</div>
            {NF_NO_TRADE.agreeing.map(function(a){
              return <div key={a} style={{padding:'4px 8px',borderRadius:5,background:'rgba(16,185,129,0.04)',border:'1px solid rgba(16,185,129,0.08)',marginBottom:3}}>
                <span className="mono" style={{fontSize:'0.68rem',color:'#10b981'}}>{a}</span>
              </div>;
            })}
          </div>
          <div>
            <div className="label" style={{color:'#ef4444',marginBottom:6}}>Signals that conflict (catch the trap)</div>
            {NF_NO_TRADE.conflicts.map(function(c){
              return <div key={c.sig} style={{padding:'4px 8px',borderRadius:5,background:'rgba(239,68,68,0.04)',border:'1px solid rgba(239,68,68,0.08)',marginBottom:3}}>
                <span className="mono" style={{fontSize:'0.65rem',color:'#ef4444'}}>Signal {c.sig}:</span>
                <span style={{fontSize:'0.68rem',color:'var(--text-m)',marginLeft:4}}>{c.reason}</span>
              </div>;
            })}
          </div>
        </div>

        {/* NO TRADE decision */}
        <div style={{borderRadius:'var(--radius)',overflow:'hidden',border:'1px solid rgba(239,68,68,0.2)',background:'rgba(239,68,68,0.03)',boxShadow:'0 0 20px rgba(239,68,68,0.05)'}}>
          <div style={{padding:'10px 16px',background:'rgba(239,68,68,0.06)',borderBottom:'1px solid rgba(239,68,68,0.1)'}}>
            <span className="mono" style={{fontSize:'0.85rem',fontWeight:700,color:'#ef4444'}}>NEUROFUSION-13 DECISION: ❌ NO TRADE</span>
          </div>
          <div style={{padding:'12px 16px'}}>
            <div style={{display:'flex',gap:12,marginBottom:8}}>
              <div><span style={{fontSize:'0.6rem',color:'var(--text-d)',fontFamily:'var(--font-m)'}}>CONFLUENCE</span><div className="mono" style={{fontSize:'1.2rem',fontWeight:700,color:'#ef4444'}}>{NF_NO_TRADE.confluence}</div></div>
              <div style={{flex:1}}>
                <div style={{width:'100%',height:6,borderRadius:3,background:'rgba(239,68,68,0.08)',marginTop:10}}>
                  <div style={{width:NF_NO_TRADE.confluence+'%',height:'100%',borderRadius:3,background:'#ef4444',boxShadow:'0 0 6px rgba(239,68,68,0.3)'}}></div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:2}}>
                  <span style={{fontSize:'0.5rem',color:'var(--text-d)'}}>0</span>
                  <span style={{fontSize:'0.5rem',color:'rgba(239,68,68,0.4)'}}>Below 65 threshold</span>
                  <span style={{fontSize:'0.5rem',color:'var(--text-d)'}}>100</span>
                </div>
              </div>
            </div>
            <div style={{padding:'6px 10px',borderRadius:5,background:'rgba(239,68,68,0.04)',border:'1px solid rgba(239,68,68,0.08)'}}>
              <p style={{fontSize:'0.75rem',color:'var(--text-b)',margin:0,lineHeight:1.5}}>4 signals conflict. Uncertainty elevated. Timing poor. <strong style={{color:'#ef4444'}}>A single-model system would have taken this trade.</strong> NeuroFusion's heterogeneous reasoning caught what no single signal could.</p>
            </div>
          </div>
        </div>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 6: ARCHITECTURE COMPARISON
         ══════════════════════════════════════════ */}
      <section data-nf-sec="5" id="nf-compare" style={{marginBottom:'2rem'}}>
        <Rv><NFSectionHead num="06" title="Why 13 Signals?"/>
        <MockScreen title="Architecture Comparison" color="#fbbf24">
          <ArchComparison/>
        </MockScreen>

        <div className="card card-sihre" style={{marginTop:12,padding:'12px 16px'}}>
          <h3 style={{fontSize:'0.9rem',marginBottom:8}}><span className="grad-text-gold">Heterogeneous &gt; Homogeneous</span></h3>
          <div className="bento bento-3">
            {[
              {label:'Single Model',value:'1 type',desc:'One type of reasoning. If wrong, no check.',color:'#ef4444'},
              {label:'Ensemble',value:'3-5 similar',desc:'Same reasoning, different parameters. Same blind spots.',color:'#f59e0b'},
              {label:'NeuroFusion-13',value:'13 different',desc:'Fundamentally different reasoning types. They catch each other\'s blind spots.',color:'#fbbf24'},
            ].map(function(c){return(
              <div key={c.label} style={{padding:'8px',borderRadius:8,background:'rgba(59,130,246,0.03)',borderTop:'2px solid '+c.color}}>
                <div style={{fontSize:'0.62rem',color:'var(--text-d)',fontFamily:'var(--font-m)',textTransform:'uppercase',marginBottom:2}}>{c.label}</div>
                <div className="mono" style={{fontSize:'1rem',fontWeight:700,color:c.color,textShadow:'0 0 6px '+c.color+'30',marginBottom:2}}>{c.value}</div>
                <p style={{fontSize:'0.68rem',color:'var(--text-m)',margin:0,lineHeight:1.4}}>{c.desc}</p>
              </div>
            );})}
          </div>
        </div>
        </Rv>
      </section>

      {/* ═══ CTA ═══ */}
      <Rv delay={40}>
        <div className="card card-sihre sihre-glow" style={{textAlign:'center',padding:'2rem'}}>
          <h2 style={{fontSize:'1.2rem',marginBottom:8}}><span className="grad-text-gold">This Is NeuroFusion-13</span></h2>
          <p style={{fontSize:'0.85rem',color:'var(--text-m)',maxWidth:500,margin:'0 auto 16px',lineHeight:1.6}}>13 fundamentally different types of intelligence. One unified decision system. Self-improving with every trade. This is the reasoning engine that powers NeuroSpect.</p>
          <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
            <a href="#pricing" className="btn btn-gold">Join the Waitlist</a>
            <a href="https://sihre.ai" target="_blank" rel="noopener" className="btn btn-ghost">Learn more at sihre.ai →</a>
          </div>
        </div>
      </Rv>
    </div>
  );
}

window.NeuroFusionWalkthroughPage=NeuroFusionWalkthroughPage;
