/* NeuroSpect v2 — Walkthrough Page: Alex's Complete Journey (13 Phases) */

function WalkthroughPage(){
  var phaseSt=React.useState(0);var activePhase=phaseSt[0],setActivePhase=phaseSt[1];
  /* Backtest interactive */
  var btSt=React.useState('idle');var btStatus=btSt[0],setBtStatus=btSt[1];
  var btPr=React.useState(0);var btProgress=btPr[0],setBtProgress=btPr[1];
  /* Walk-forward rows */
  var wfSt=React.useState(0);var wfVis=wfSt[0],setWfVis=wfSt[1];
  /* Execution log */
  var logSt=React.useState(0);var logKey=logSt[0],setLogKey=logSt[1];

  function runBT(){setBtStatus('running');setBtProgress(0);var p=0;
    var iv=setInterval(function(){p+=Math.random()*15+5;if(p>=100){p=100;clearInterval(iv);setTimeout(function(){setBtStatus('done');},300);}setBtProgress(Math.min(p,100));},200);}
  function runWF(){setWfVis(0);var i=0;var iv=setInterval(function(){i++;setWfVis(i);if(i>=7)clearInterval(iv);},400);}

  /* Track scroll */
  React.useEffect(function(){
    var secs=document.querySelectorAll('[data-wt-phase]');if(!secs.length)return;
    var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting)setActivePhase(parseInt(e.target.dataset.wtPhase));});},{threshold:0.15,rootMargin:'-50px 0px 0px 0px'});
    secs.forEach(function(s){obs.observe(s);});return function(){obs.disconnect();};
  },[]);

  function scrollTo(id){var el=document.getElementById('wt-'+id);if(el){var top=el.getBoundingClientRect().top+window.pageYOffset-56;window.scrollTo({top:top,behavior:'smooth'});}}

  var J=[
    {d:'2025-11-14',r:'+3.2R',pnl:'+$680',res:'W'},{d:'2025-11-12',r:'+2.5R',pnl:'+$531',res:'W'},
    {d:'2025-11-08',r:'-1.0R',pnl:'-$187',res:'L'},{d:'2025-11-05',r:'+3.1R',pnl:'+$620',res:'W'},
    {d:'2025-10-31',r:'+2.7R',pnl:'+$506',res:'W'},{d:'2025-10-28',r:'-1.0R',pnl:'-$187',res:'L'},
  ];

  return(
    <div className="page">
      {/* ═══ HERO ═══ */}
      <Rv><div className="hero-grad" style={{padding:'clamp(1.5rem,4vw,2.5rem)',marginBottom:'1rem',position:'relative',overflow:'hidden'}}>
        <HeroBg color="#3b82f6" variant="grid"/>        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
          <span className="badge badge-blue"><span className="badge-dot" style={{background:'#14b8a6'}}></span>Interactive Walkthrough</span>
          <span className="badge badge-green" style={{fontSize:'0.55rem'}}>13 Phases</span>
        </div>
        <h1 style={{marginBottom:8}}>Meet Alex. From Observation to <span className="grad-text">Live Execution</span>.</h1>
        <p style={{fontSize:'0.88rem',color:'var(--text-m)',maxWidth:560,lineHeight:1.65}}>Follow an ES futures trader through every step: discover a pattern, validate it scientifically, deploy to funded accounts, and optimize live. Every screen is what you'd actually see in NeuroSpect.</p>
        {/* Alex card */}
        <div style={{display:'flex',alignItems:'center',gap:10,marginTop:16,padding:'8px 14px',borderRadius:10,background:'rgba(139,92,246,0.06)',border:'1px solid rgba(139,92,246,0.1)',maxWidth:420}}>
          <div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,#8b5cf6,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.75rem',fontWeight:700,color:'#fff',flexShrink:0}}>A</div>
          <div><span style={{fontSize:'0.82rem',fontWeight:600,color:'var(--text-h)'}}>Alex</span><span style={{fontSize:'0.68rem',color:'var(--text-d)',marginLeft:8}}>ES · ICT · London Session</span></div>
        </div>
      </div></Rv>

      {/* ═══ STICKY NAV ═══ */}
      <div style={{position:'sticky',top:0,zIndex:50,background:'rgba(5,8,16,0.92)',backdropFilter:'blur(12px)',padding:'6px 0',borderBottom:'1px solid var(--border)',marginBottom:'1.5rem'}}>
        <div style={{display:'flex',gap:2,overflowX:'auto',padding:'0 2px'}}>
          {WT_PHASES.map(function(ph,i){var act=activePhase===i;return(
            <button key={ph.id} onClick={function(){scrollTo(ph.id);}} style={{display:'flex',alignItems:'center',gap:3,padding:'3px 7px',borderRadius:5,whiteSpace:'nowrap',fontSize:'0.58rem',fontWeight:600,fontFamily:'var(--font-m)',background:act?ph.color+'15':'transparent',border:'1px solid '+(act?ph.color+'40':'transparent'),color:act?ph.color:'var(--text-d)',transition:'all 0.2s',cursor:'pointer'}}>
              <span style={{opacity:0.5}}>{ph.num}</span>{ph.title}
            </button>
          );})}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PHASE 1: THE OBSERVATION
         ══════════════════════════════════════════ */}
      <section data-wt-phase="0" id="wt-observe" style={{marginBottom:'2rem'}}>
        <Rv><PhaseHead num="01" title="The Observation" color="#8b5cf6"/>
        <AlexThought>I've been trading ES for 8 months. I keep noticing that when price sweeps below the London session low, then displaces up through a Fair Value Gap, the move continues. But I don't know if this is real edge or confirmation bias.</AlexThought>

        <MockScreen title="Trader Workspace — Journal Entry" color="#8b5cf6">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,marginBottom:10}}>
            {[{l:'Date',v:'2025-11-14'},{l:'Instrument',v:'ES'},{l:'Session',v:'London'},{l:'Direction',v:'Long'},{l:'Entry',v:'5842.25'},{l:'Stop',v:'5838.00'},{l:'Target',v:'5855.75'},{l:'Result',v:'+3.2R (+$680)'},{l:'1R',v:'4.25 pts ($212.50)'}].map(function(f){
              return <div key={f.l} style={{padding:'4px 8px',borderRadius:5,background:'rgba(59,130,246,0.03)',border:'1px solid rgba(59,130,246,0.06)'}}>
                <div style={{fontSize:'0.55rem',color:'var(--text-d)',fontFamily:'var(--font-m)',textTransform:'uppercase',letterSpacing:'0.04em'}}>{f.l}</div>
                <div className="mono" style={{fontSize:'0.75rem',color:'var(--text-h)',fontWeight:500}}>{f.v}</div>
              </div>;
            })}
          </div>
          <div style={{display:'flex',gap:4,marginBottom:10}}>
            {['Liquidity Sweep ✓','Displacement ✓','FVG ✓','London Session ✓'].map(function(t){return <span key={t} className="badge badge-green" style={{fontSize:'0.55rem',padding:'2px 6px'}}>{t}</span>;})}
          </div>
          <div style={{fontSize:'0.75rem',color:'var(--text-m)',padding:'6px 10px',background:'rgba(59,130,246,0.03)',borderRadius:6,borderLeft:'2px solid rgba(139,92,246,0.2)',fontStyle:'italic'}}>"Sweep of London low, aggressive displacement, entered on FVG retest"</div>
        </MockScreen>

        <MockScreen title="Journal Analytics" color="#8b5cf6">
          <KpiGrid items={[{l:'"London Sweep+FVG"',v:'14 trades',c:'var(--text-h)'},{l:'Pattern Win Rate',v:'71%',c:'#10b981'},{l:'Average R',v:'+1.8R',c:'var(--gold-400)'},{l:'Other Setups WR',v:'52%',c:'var(--text-m)'}]}/>
        </MockScreen>
        <AlexThought>71% on 14 trades looks promising, but 14 trades isn't enough to be sure. I need to backtest this properly.</AlexThought>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 2: AI-ASSISTED HYPOTHESIS
         ══════════════════════════════════════════ */}
      <section data-wt-phase="1" id="wt-hypothesis" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="02" title="AI-Assisted Hypothesis Formation" color="#06b6d4"/>
        <MockScreen title="NeuroSpect Mentor — Chat" color="#06b6d4">
          <div style={{display:'flex',justifyContent:'flex-end',marginBottom:10}}>
            <div style={{maxWidth:'72%',padding:'8px 12px',borderRadius:'10px 10px 2px 10px',background:'rgba(59,130,246,0.12)',border:'1px solid rgba(59,130,246,0.18)'}}>
              <p style={{fontSize:'0.78rem',color:'var(--text-h)',margin:0}}>What patterns appear in my winning London session trades?</p>
            </div>
          </div>
          <div style={{display:'flex',marginBottom:8}}>
            <div style={{maxWidth:'88%',padding:'10px 14px',borderRadius:'10px 10px 10px 2px',background:'var(--surface)',border:'1px solid var(--border)'}}>
              <p style={{fontSize:'0.76rem',color:'var(--text-b)',lineHeight:1.6,margin:0}}>
                Analyzing your 47 London session trades from the last 3 months, I found a statistically significant cluster: <strong style={{color:'var(--text-h)'}}>Liquidity sweep below session low → displacement candle (&gt;8 tick body) → FVG formation → entry on FVG retest</strong>. This pattern appears in 14 trades with a 71% win rate and 1.8R average gain.
              </p>
              <p style={{fontSize:'0.72rem',color:'var(--text-m)',lineHeight:1.5,margin:'8px 0 0'}}>
                <strong style={{color:'var(--gold-400)'}}>Caution:</strong> 14 occurrences is below the minimum sample size (30+) for statistical confidence. I recommend backtesting this across 12+ months of data.
              </p>
              <div style={{display:'flex',gap:4,marginTop:6}}>
                {['Your Journal','ICT Concepts','Statistical Significance'].map(function(s){return <span key={s} style={{fontSize:'0.55rem',padding:'2px 6px',borderRadius:4,background:'rgba(6,182,212,0.08)',border:'1px solid rgba(6,182,212,0.15)',color:'#06b6d4'}}>{s}</span>;})}
              </div>
            </div>
          </div>
        </MockScreen>

        <MockScreen title="Edge Forensics — Hypothesis Generated" color="#06b6d4">
          <div style={{display:'grid',gridTemplateColumns:'auto 1fr',gap:'4px 12px',fontSize:'0.76rem'}}>
            {[['Hypothesis','HYP-042'],['Name','London Sweep + Displacement + FVG'],['Instrument','ES (E-mini S&P 500)'],['Session','London (02:00–05:00 ET)'],['Status','REGISTERED — Ready for backtest'],['Confidence','Low (n=14, needs backtest)']].map(function(r){
              return <React.Fragment key={r[0]}><span className="mono" style={{color:'var(--text-d)',fontSize:'0.65rem'}}>{r[0]}</span><span style={{color:r[0]==='Status'?'var(--gold-400)':'var(--text-b)'}}>{r[1]}</span></React.Fragment>;
            })}
          </div>
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 3: STRATEGY DEFINITION
         ══════════════════════════════════════════ */}
      <section data-wt-phase="2" id="wt-strategy" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="03" title="Strategy Definition" color="#10b981"/>
        <MockScreen title="EdgeLab — Strategy Builder (YAML)" color="#10b981">
          <CodeBlock code={WT_YAML}/>
        </MockScreen>

        <div className="card" style={{background:'rgba(16,185,129,0.04)',border:'1px solid rgba(16,185,129,0.15)',padding:'10px 14px'}}>
          <div style={{display:'flex',flexDirection:'column',gap:3}}>
            {['✓ Strategy compiled successfully','✓ 4 ICT events required: sweep, displacement, FVG, retest','✓ Session filter: London (02:00–05:00 ET)','✓ Risk parameters valid','✓ Ready for backtest'].map(function(l){
              return <div key={l} className="mono" style={{fontSize:'0.7rem',color:'#10b981'}}>{l}</div>;
            })}
          </div>
        </div>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 4: BACKTEST EXECUTION
         ══════════════════════════════════════════ */}
      <section data-wt-phase="3" id="wt-backtest" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="04" title="Backtest Execution" color="#3b82f6"/>
        <MockScreen title="EdgeLab — Backtest" color="#3b82f6"
          toolbar={<button className="btn btn-blue btn-sm" onClick={runBT} disabled={btStatus==='running'} style={{opacity:btStatus==='running'?0.6:1,fontSize:'0.72rem',padding:'4px 12px'}}>
            {btStatus==='running'?'Running...':btStatus==='done'?'↻ Re-run':'▶ Run Backtest'}</button>}>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:10}}>
            {[['Strategy','London Sweep FVG v1.0'],['Data','Jan 2024 – Nov 2025 (23 mo)'],['Capital','$50,000'],['Slippage','1 tick']].map(function(c){
              return <span key={c[0]} style={{fontSize:'0.68rem',padding:'3px 8px',borderRadius:5,background:'rgba(59,130,246,0.04)',border:'1px solid rgba(59,130,246,0.08)'}}><span style={{color:'var(--text-d)'}}>{c[0]}: </span><span className="mono" style={{color:'var(--blue-400)'}}>{c[1]}</span></span>;
            })}
          </div>

          {btStatus==='running'&&<div style={{textAlign:'center',padding:'2rem 0'}}>
            <p style={{fontSize:'0.85rem',marginBottom:10}}>Running backtest...</p>
            <div style={{maxWidth:300,margin:'0 auto'}}><PBar value={btProgress} h={6}/></div>
            <p className="mono" style={{fontSize:'0.7rem',color:'var(--blue-400)',marginTop:8}}>{Math.round(btProgress)}% — Processing {Math.round(btProgress*1.87)} trades</p>
          </div>}

          {btStatus==='idle'&&<div style={{textAlign:'center',padding:'2rem 0',color:'var(--text-d)',fontSize:'0.82rem'}}>Click <strong>Run Backtest</strong> to see results</div>}

          {btStatus==='done'&&<div>
            <KpiGrid items={[{l:'Total Trades',v:'187',c:'var(--text-h)'},{l:'Win Rate',v:'62.6%',c:'#10b981'},{l:'Profit Factor',v:'2.14',c:'var(--blue-400)'},{l:'Net P&L',v:'+$28,420',c:'#10b981'},{l:'Max DD',v:'-$4,180',c:'#ef4444'},{l:'Avg Win',v:'+$412',c:'#10b981'},{l:'Avg Loss',v:'-$196',c:'#ef4444'},{l:'Expectancy',v:'+$152/trade',c:'var(--gold-400)'},{l:'Sharpe',v:'1.82',c:'#8b5cf6'},{l:'Calmar',v:'6.8',c:'#8b5cf6'}]}/>

            <div style={{marginBottom:10}}>
              <div className="label" style={{marginBottom:4}}>Equity Curve</div>
              <div style={{background:'rgba(5,8,16,0.3)',borderRadius:8,padding:'6px',border:'1px solid var(--border)'}}>
                <WtEquity data={WT_EQUITY} id="bt" showDD={true}/>
              </div>
            </div>
            <div className="bento bento-2" style={{marginBottom:10}}>
              <div><div className="label" style={{marginBottom:4}}>Monthly Returns</div><div style={{background:'rgba(5,8,16,0.3)',borderRadius:8,padding:'6px',border:'1px solid var(--border)'}}><WtHeatmap data={WT_MONTHLY}/></div></div>
              <div><div className="label" style={{marginBottom:4}}>R-Multiple Distribution</div><div style={{background:'rgba(5,8,16,0.3)',borderRadius:8,padding:'6px',border:'1px solid var(--border)'}}><WtHistogram data={WT_R_DIST}/></div></div>
            </div>
            <div className="bento bento-2">
              <div><div className="label" style={{marginBottom:4}}>Win Rate by Day</div><WtBars data={WT_DAY_WR} lKey="d" vKey="v" color="#3b82f6"/></div>
              <div><div className="label" style={{marginBottom:4}}>Win Rate by Hour (London)</div><WtBars data={WT_HOUR_WR} lKey="h" vKey="v" color="#8b5cf6"/></div>
            </div>
          </div>}
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 5: NULL HYPOTHESIS TEST
         ══════════════════════════════════════════ */}
      <section data-wt-phase="4" id="wt-nulltest" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="05" title="Null Hypothesis Test" color="#f59e0b"/>
        <AlexThought>The backtest looks great, but how do I know I'm not curve-fitting?</AlexThought>
        <MockScreen title="EdgeLab — Null Test" color="#f59e0b">
          <div style={{fontSize:'0.78rem',color:'var(--text-m)',lineHeight:1.6,marginBottom:12,padding:'8px 12px',borderRadius:6,background:'rgba(245,158,11,0.04)',border:'1px solid rgba(245,158,11,0.08)'}}>
            Compares your strategy against 1,000 randomized entry strategies using the same exits, risk parameters, and session filter. If your strategy outperforms 95% of random entries, we reject the null hypothesis.
          </div>
          <div className="bento bento-2" style={{marginBottom:10}}>
            <div>
              <div style={{display:'flex',flexDirection:'column',gap:4}}>
                {[['Your strategy PF','2.14','var(--gold-400)'],['Random mean PF','0.98','var(--text-m)'],['Random 95th %ile','1.31','#ef4444'],['Your percentile','99.2%','#10b981']].map(function(r){
                  return <div key={r[0]} style={{display:'flex',justifyContent:'space-between',padding:'4px 8px',borderRadius:5,background:'rgba(59,130,246,0.03)'}}>
                    <span style={{fontSize:'0.72rem',color:'var(--text-b)'}}>{r[0]}</span>
                    <span className="mono" style={{fontSize:'0.75rem',fontWeight:600,color:r[2]}}>{r[1]}</span>
                  </div>;
                })}
              </div>
              <div style={{marginTop:8,padding:'8px 12px',borderRadius:6,background:'rgba(16,185,129,0.06)',border:'1px solid rgba(16,185,129,0.15)'}}>
                <span className="mono" style={{fontSize:'0.72rem',color:'#10b981',fontWeight:600}}>✅ REJECT NULL HYPOTHESIS (p &lt; 0.01)</span>
              </div>
            </div>
            <div style={{background:'rgba(5,8,16,0.3)',borderRadius:8,padding:'6px',border:'1px solid var(--border)'}}>
              <WtNullChart/>
            </div>
          </div>
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 6: MONTE CARLO
         ══════════════════════════════════════════ */}
      <section data-wt-phase="5" id="wt-monte" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="06" title="Monte Carlo Simulation" color="#ec4899"/>
        <MockScreen title="EdgeLab — Monte Carlo (10,000 simulations)" color="#ec4899">
          <div className="label" style={{marginBottom:4}}>Equity Curve Fan Chart — Randomized Trade Ordering</div>
          <div style={{background:'rgba(5,8,16,0.3)',borderRadius:8,padding:'6px',border:'1px solid var(--border)',marginBottom:10}}>
            <WtMCChart paths={WT_MC_PATHS} median={WT_MC_MEDIAN}/>
          </div>
          <div className="bento bento-2">
            <div>
              <div className="label" style={{marginBottom:6}}>Drawdown Distribution</div>
              <table className="tbl"><thead><tr><th>Percentile</th><th>Max DD</th></tr></thead><tbody>
                {[['Best (5th)','-$2,100 (4.2%)'],['Median (50th)','-$4,800 (9.6%)'],['95th %ile','-$7,200 (14.4%)'],['Worst (99th)','-$9,400 (18.8%)']].map(function(r){
                  return <tr key={r[0]}><td style={{fontSize:'0.72rem'}}>{r[0]}</td><td className="mono" style={{fontSize:'0.72rem',color:'#ef4444'}}>{r[1]}</td></tr>;
                })}
              </tbody></table>
            </div>
            <div>
              <div className="label" style={{marginBottom:6}}>Prop Firm Survival — Apex $150K</div>
              <div style={{display:'flex',flexDirection:'column',gap:4}}>
                {[['Daily loss breach prob.','3.2%','#10b981'],['Trailing DD breach','8.1%','var(--gold-400)'],['Pass evaluation','78.4%','#10b981'],['Expected time to payout','14 days','var(--blue-400)']].map(function(r){
                  return <div key={r[0]} style={{display:'flex',justifyContent:'space-between',padding:'4px 8px',borderRadius:5,background:'rgba(59,130,246,0.03)'}}>
                    <span style={{fontSize:'0.72rem',color:'var(--text-b)'}}>{r[0]}</span>
                    <span className="mono" style={{fontSize:'0.72rem',fontWeight:600,color:r[2]}}>{r[1]}</span>
                  </div>;
                })}
              </div>
              <div style={{marginTop:6,padding:'6px 10px',borderRadius:5,background:'rgba(16,185,129,0.06)',border:'1px solid rgba(16,185,129,0.15)'}}>
                <span className="mono" style={{fontSize:'0.68rem',color:'#10b981'}}>✅ VIABLE for Apex $150K accounts</span>
              </div>
            </div>
          </div>
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 7: WALK-FORWARD
         ══════════════════════════════════════════ */}
      <section data-wt-phase="6" id="wt-walkfwd" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="07" title="Walk-Forward Optimization" color="#14b8a6"/>
        <MockScreen title="EdgeLab — Walk-Forward (6mo train / 2mo test)" color="#14b8a6"
          toolbar={<button className="btn btn-ghost btn-sm" onClick={runWF} style={{fontSize:'0.68rem',padding:'3px 10px'}}>▶ Run Walk-Forward</button>}>
          <table className="tbl" style={{marginBottom:10}}><thead><tr><th>Win</th><th>Train Period</th><th>Test Period</th><th>Train PF</th><th>Test PF</th><th>Test WR</th><th></th></tr></thead>
          <tbody>{WT_WF.map(function(r,i){
            if(i>=wfVis)return <tr key={i} style={{opacity:0.15}}><td colSpan="7" style={{textAlign:'center',fontSize:'0.68rem'}}>—</td></tr>;
            return <tr key={i} style={{transition:'opacity 0.4s'}}><td className="mono">{r.win}</td><td>{r.train}</td><td>{r.test}</td><td className="mono" style={{color:'var(--blue-400)'}}>{r.trainPF}</td><td className="mono" style={{color:'#10b981',fontWeight:600}}>{r.testPF}</td><td className="mono">{r.testWR}</td><td><span className="badge badge-green" style={{fontSize:'0.5rem',padding:'1px 5px'}}>✅ Pass</span></td></tr>;
          })}</tbody></table>
          {wfVis>=7&&<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
            <div style={{padding:'6px 10px',borderRadius:5,background:'rgba(20,184,166,0.06)',border:'1px solid rgba(20,184,166,0.15)'}}>
              <span className="mono" style={{fontSize:'0.72rem',color:'#14b8a6',fontWeight:600}}>Walk-Forward Efficiency: 82%</span>
            </div>
            <div style={{background:'rgba(5,8,16,0.3)',borderRadius:8,padding:'4px',border:'1px solid var(--border)',flex:1,minWidth:260}}>
              <WtWFChart data={WT_WF}/>
            </div>
          </div>}
        </MockScreen>
        <AlexThought>The strategy holds up out-of-sample across every window. The edge is real and persistent.</AlexThought>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 8: PARAMETER SENSITIVITY
         ══════════════════════════════════════════ */}
      <section data-wt-phase="7" id="wt-params" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="08" title="Parameter Sensitivity Analysis" color="#a855f7"/>
        <MockScreen title="EdgeLab — Parameter Sweep" color="#a855f7">
          <div className="bento bento-2">
            <div>
              <div className="label" style={{marginBottom:4}}>Stop Loss vs Take Profit — Profit Factor</div>
              <div style={{background:'rgba(5,8,16,0.3)',borderRadius:8,padding:'6px',border:'1px solid var(--border)'}}>
                <WtParamHeat data={WT_PARAM_HEAT}/>
              </div>
              <div style={{fontSize:'0.62rem',color:'var(--text-d)',marginTop:4,textAlign:'center'}}>White border = current parameters (2.5R TP, -2 tick stop)</div>
            </div>
            <div>
              <div className="label" style={{marginBottom:6}}>Robust Ranges</div>
              <div style={{display:'flex',flexDirection:'column',gap:4}}>
                {[['Stop offset','-1 to -3 ticks (current: -2)','✅'],['Take profit','2.0R to 3.0R (current: 2.5R)','✅'],['Min displacement','6–10 ticks (current: 8)','✅'],['Max delay bars','2–4 (current: 3)','✅']].map(function(r){
                  return <div key={r[0]} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'4px 8px',borderRadius:5,background:'rgba(59,130,246,0.03)',border:'1px solid rgba(59,130,246,0.06)'}}>
                    <span style={{fontSize:'0.72rem',color:'var(--text-b)'}}>{r[0]}</span>
                    <span className="mono" style={{fontSize:'0.68rem',color:'#10b981'}}>{r[1]} {r[2]}</span>
                  </div>;
                })}
              </div>
              <div style={{marginTop:8,padding:'6px 10px',borderRadius:5,background:'rgba(16,185,129,0.06)',border:'1px solid rgba(16,185,129,0.15)'}}>
                <span className="mono" style={{fontSize:'0.68rem',color:'#10b981'}}>✅ Parameters in robust zone — NOT curve-fitted</span>
              </div>
            </div>
          </div>
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 9: SHADOW & PAPER TRADING
         ══════════════════════════════════════════ */}
      <section data-wt-phase="8" id="wt-shadow" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="09" title="Shadow & Paper Trading" color="#3b82f6"/>
        <MockScreen title="NeuroTrader — Shadow Mode (Week 1–2)" color="#3b82f6">
          <table className="tbl"><thead><tr><th></th><th>Alex (Manual)</th><th>NeuroTrader (Shadow)</th></tr></thead>
          <tbody>
            {[['Trades taken','2','3'],['Signals matched','2/2','—'],['Missed signals','—','1 (FVG at 03:42)'],['Win rate (2 wk)','60%','67%'],['Avg R','1.6R','1.9R']].map(function(r){
              return <tr key={r[0]}><td style={{fontWeight:600,fontSize:'0.72rem'}}>{r[0]}</td><td className="mono" style={{fontSize:'0.72rem'}}>{r[1]}</td><td className="mono" style={{fontSize:'0.72rem',color:'var(--blue-400)'}}>{r[2]}</td></tr>;
            })}
          </tbody></table>
        </MockScreen>
        <AlexThought>NeuroTrader caught a trade I missed because I was asleep. And it's slightly outperforming my discretionary execution.</AlexThought>

        <MockScreen title="NeuroTrader — Paper Mode (Week 3–4)" color="#3b82f6">
          <WtCandles/>
          <div className="bento bento-2" style={{marginTop:8}}>
            <KpiGrid items={[{l:'Paper P&L',v:'+$2,840',c:'#10b981'},{l:'Max DD',v:'-$620',c:'#ef4444'},{l:'Prop Shield',v:'All ✅',c:'#10b981'}]}/>
            <div>
              <div className="label" style={{marginBottom:4}}>Paper vs Backtest Deviation</div>
              <div style={{display:'flex',flexDirection:'column',gap:3}}>
                {[['Win Rate','62.6% → 64.3%','+1.7% ✅'],['Profit Factor','2.14 → 2.28','+6.5% ✅'],['Max DD','8.4% → 4.2%','✅']].map(function(r){
                  return <div key={r[0]} style={{display:'flex',justifyContent:'space-between',padding:'3px 6px',fontSize:'0.68rem'}}>
                    <span style={{color:'var(--text-d)'}}>{r[0]}</span><span className="mono" style={{color:'var(--text-b)'}}>{r[1]}</span><span style={{color:'#10b981'}}>{r[2]}</span>
                  </div>;
                })}
              </div>
              <div style={{marginTop:4,padding:'4px 8px',borderRadius:5,background:'rgba(16,185,129,0.06)',border:'1px solid rgba(16,185,129,0.12)'}}>
                <span className="mono" style={{fontSize:'0.65rem',color:'#10b981'}}>Within 2σ — Proceed to live</span>
              </div>
            </div>
          </div>
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 10: LIVE DEPLOYMENT
         ══════════════════════════════════════════ */}
      <section data-wt-phase="9" id="wt-live" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="10" title="Live Deployment" color="#ef4444"/>
        <MockScreen title="Live Trading Terminal — ES 5-min" color="#ef4444">
          <WtCandles/>
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:8,padding:'8px 10px',borderRadius:6,background:'rgba(5,8,16,0.4)',border:'1px solid var(--border)'}}>
            {[['Position','ES Long 2 cts @ 5842.25'],['Unrealized','+ $425.00'],['Stop','5838.00'],['Target','5852.75'],['Prop Shield','✅ All clear']].map(function(f){
              return <span key={f[0]} style={{fontSize:'0.68rem',padding:'2px 6px',borderRadius:4,background:'rgba(59,130,246,0.04)',border:'1px solid rgba(59,130,246,0.06)'}}>
                <span style={{color:'var(--text-d)'}}>{f[0]}: </span>
                <span className="mono" style={{color:f[0]==='Unrealized'?'#10b981':f[0]==='Stop'?'#ef4444':'var(--text-h)',fontWeight:600}}>{f[1]}</span>
              </span>;
            })}
          </div>
        </MockScreen>

        <MockScreen title="Prop Shield — Account Status" color="#ef4444">
          <div className="bento bento-2">
            {[{name:'Apex #1 ($150K)',pnl:'+$425',daily:'$1,875 of $2,300',dd:'$3,420',cons:'92/100'},{name:'Apex #2 ($150K)',pnl:'+$425',daily:'$1,875 of $2,300',dd:'$4,100',cons:'88/100'}].map(function(a){
              return <div key={a.name} style={{padding:'8px 10px',borderRadius:8,background:'rgba(59,130,246,0.03)',border:'1px solid rgba(59,130,246,0.08)'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span style={{fontSize:'0.78rem',fontWeight:600,color:'var(--text-h)'}}>{a.name}</span><span className="badge badge-green" style={{fontSize:'0.5rem'}}>✅ TRADING</span></div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4}}>
                  {[['Daily P&L',a.pnl,'#10b981'],['Daily remaining',a.daily,'var(--text-b)'],['Trailing DD',a.dd,'var(--gold-400)'],['Consistency',a.cons,'var(--blue-400)']].map(function(r){
                    return <div key={r[0]}><span style={{fontSize:'0.55rem',color:'var(--text-d)',fontFamily:'var(--font-m)',textTransform:'uppercase'}}>{r[0]}</span><div className="mono" style={{fontSize:'0.75rem',color:r[2]}}>{r[1]}</div></div>;
                  })}
                </div>
              </div>;
            })}
          </div>
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 11: NEUROSYNC
         ══════════════════════════════════════════ */}
      <section data-wt-phase="10" id="wt-sync" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="11" title="NeuroSync — Multi-Account Execution" color="#14b8a6"/>
        <MockScreen title="NeuroSync — Account Manager" color="#14b8a6">
          <table className="tbl"><thead><tr><th>Account</th><th>Firm</th><th>Size</th><th>Status</th><th>Daily Rem.</th><th>DD Rem.</th></tr></thead>
          <tbody>{[
            {n:'Apex #1',f:'Apex',s:'$150K',st:'active',dr:'$1,875',dd:'$3,420'},
            {n:'Apex #2',f:'Apex',s:'$150K',st:'active',dr:'$2,100',dd:'$4,100'},
            {n:'Apex #3',f:'Apex',s:'$50K',st:'active',dr:'$1,200',dd:'$1,800'},
            {n:'MFF #1',f:'MFF',s:'$100K',st:'active',dr:'$1,500',dd:'$2,900'},
            {n:'Tradeify #1',f:'Tradeify',s:'$150K',st:'locked',dr:'—',dd:'$3,800'},
          ].map(function(a){
            return <tr key={a.n}><td className="mono" style={{fontWeight:600}}>{a.n}</td><td>{a.f}</td><td className="mono">{a.s}</td>
              <td><span className={'badge '+(a.st==='active'?'badge-green':'badge-blue')} style={{fontSize:'0.5rem',padding:'1px 5px'}}>{a.st==='active'?'✅ Active':'⏸ Locked'}</span></td>
              <td className="mono">{a.dr}</td><td className="mono" style={{color:'var(--gold-400)'}}>{a.dd}</td></tr>;
          })}</tbody></table>
        </MockScreen>

        <MockScreen title="NeuroSync — Execution Log" color="#14b8a6"
          toolbar={<button className="btn btn-ghost btn-sm" onClick={function(){setLogKey(logKey+1);}} style={{fontSize:'0.68rem',padding:'3px 10px'}}>▶ Replay</button>}>
          <ExecLog lines={WT_EXEC_LOG} trigger={logKey}/>
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 12: PARAMETER-DIVERSIFIED
         ══════════════════════════════════════════ */}
      <section data-wt-phase="11" id="wt-diversify" style={{marginBottom:'2rem'}}>
        <Rv delay={40}>
        <div className="hero-grad" style={{padding:'clamp(1rem,2vw,1.5rem)',marginBottom:12}}>
          <span className="badge badge-gold"><span className="badge-dot"></span>Unprecedented</span>
          <PhaseHead num="12" title="Parameter-Diversified Execution" color="#f59e0b"/>
        </div>

        <div className="bento bento-3" style={{marginBottom:12}}>
          {[
            {name:'Group A — Aggressive',color:'#ef4444',accts:'Apex #1, Apex #2',params:['TP: 3.5R','Stop: -3 ticks','Session: London + NY AM','Min disp: 6 ticks']},
            {name:'Group B — Conservative',color:'#3b82f6',accts:'Apex #3, MFF #1',params:['TP: 1.5R','Stop: -1 tick','Session: London only','Min disp: 10 ticks']},
            {name:'Group C — Regime-Adaptive',color:'#a855f7',accts:'Tradeify #1',params:['Params: NeuroFusion-13','Trending → Group A','Ranging → Group B','Volatile → reduced size']},
          ].map(function(g){return(
            <div key={g.name} className="card" style={{borderLeftWidth:3,borderLeftColor:g.color}}>
              <h3 style={{fontSize:'0.85rem',color:g.color,marginBottom:2}}>{g.name}</h3>
              <div style={{fontSize:'0.62rem',color:'var(--text-d)',marginBottom:8}}>Accounts: {g.accts}</div>
              {g.params.map(function(p){return <div key={p} className="mono" style={{fontSize:'0.65rem',color:'var(--text-m)',marginBottom:2}}>{p}</div>;})}
            </div>
          );})}
        </div>

        <MockScreen title="NeuroSync — Live Comparison (4 weeks)" color="#f59e0b">
          <table className="tbl" style={{marginBottom:10}}><thead><tr><th>Metric</th><th style={{color:'#ef4444'}}>Group A</th><th style={{color:'#3b82f6'}}>Group B</th><th style={{color:'#a855f7'}}>Group C</th></tr></thead>
          <tbody>{[
            ['Trades','48','31','39'],['Win Rate','52%','68%','61%'],['Profit Factor','1.92','1.74','2.41'],
            ['Avg R','2.1R','0.9R','1.6R'],['Max DD','-$2,400','-$680','-$1,100'],['Sharpe','1.4','1.9','2.6'],['Net P&L','+$4,200','+$1,890','+$3,640'],
          ].map(function(r){
            return <tr key={r[0]}><td style={{fontWeight:600,fontSize:'0.72rem'}}>{r[0]}</td><td className="mono" style={{fontSize:'0.72rem',color:'#ef4444'}}>{r[1]}</td><td className="mono" style={{fontSize:'0.72rem',color:'#3b82f6'}}>{r[2]}</td><td className="mono" style={{fontSize:'0.72rem',color:'#a855f7',fontWeight:600}}>{r[3]}</td></tr>;
          })}</tbody></table>
          <div style={{background:'rgba(5,8,16,0.3)',borderRadius:8,padding:'6px',border:'1px solid var(--border)',marginBottom:10}}>
            <WtMultiEq groups={[{data:WT_GRP_EQ.a,color:'#ef4444',label:'Group A'},{data:WT_GRP_EQ.b,color:'#3b82f6',label:'Group B'},{data:WT_GRP_EQ.c,color:'#a855f7',label:'Group C'}]}/>
          </div>
        </MockScreen>

        <div className="card card-gold" style={{padding:'10px 14px'}}>
          <div className="label" style={{color:'var(--gold-400)',marginBottom:6}}>NeuroSync Analysis — Week 4</div>
          <p style={{fontSize:'0.78rem',color:'var(--text-b)',lineHeight:1.55,marginBottom:6}}>Group C (Regime-Adaptive) is outperforming both static groups. In trending conditions (60%), Group A outperformed — NeuroFusion correctly selected aggressive params. In ranging conditions (40%), Group B outperformed — NeuroFusion correctly selected conservative params.</p>
          <p className="mono" style={{fontSize:'0.7rem',color:'var(--gold-400)'}}>Regime detection accuracy: 74% · Recommendation: shift toward Group C parameters</p>
        </div>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 13: CONTINUOUS IMPROVEMENT
         ══════════════════════════════════════════ */}
      <section data-wt-phase="12" id="wt-loop" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="13" title="Continuous Improvement Loop" color="#10b981"/>

        <MockScreen title="EdgeLab — Monthly Re-validation (Nov 2025)" color="#10b981">
          <div style={{display:'flex',flexDirection:'column',gap:4}}>
            {[['Null test','✅ Still significant (p < 0.01)','#10b981'],['Walk-forward','✅ Latest window PF = 1.94','#10b981'],['Parameter drift','✅ Optimal zone unchanged','#10b981'],['Regime shift','⚠️ Volatility increasing — Group C adapting','var(--gold-400)'],['Win rate dev.','62.6% → 59.8% (-2.8%) ✅ Within 2σ','#10b981'],['PF deviation','2.14 → 2.08 (-2.8%) ✅ Within 2σ','#10b981'],['Slippage','−0.3 ticks avg (accounted for)','var(--text-m)']].map(function(r){
              return <div key={r[0]} style={{display:'flex',justifyContent:'space-between',padding:'4px 8px',borderRadius:5,background:'rgba(59,130,246,0.03)',border:'1px solid rgba(59,130,246,0.06)'}}>
                <span style={{fontSize:'0.72rem',color:'var(--text-b)'}}>{r[0]}</span>
                <span className="mono" style={{fontSize:'0.68rem',color:r[2],textAlign:'right'}}>{r[1]}</span>
              </div>;
            })}
          </div>
          <div style={{marginTop:8,padding:'6px 10px',borderRadius:5,background:'rgba(16,185,129,0.06)',border:'1px solid rgba(16,185,129,0.15)'}}>
            <span className="mono" style={{fontSize:'0.7rem',color:'#10b981'}}>✅ Strategy remains healthy · Next check: Dec 1, 2025</span>
          </div>
        </MockScreen>

        <MockScreen title="NeuroScore — Alex's Verified Profile" color="#10b981">
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:10}}>
            <div style={{width:48,height:48,borderRadius:'50%',background:'linear-gradient(135deg,#8b5cf6,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',fontWeight:700,color:'#fff'}}>A</div>
            <div><div style={{fontSize:'1rem',fontWeight:700,color:'var(--text-h)'}}>Alex</div><div className="mono" style={{fontSize:'0.7rem',color:'var(--text-d)'}}>5 verified accounts · ✅ Broker-verified via Tradovate API</div></div>
            <div style={{marginLeft:'auto',textAlign:'center'}}><div className="mono" style={{fontSize:'1.8rem',fontWeight:800,color:'#10b981'}}>87</div><div style={{fontSize:'0.6rem',color:'var(--text-d)'}}>/ 100</div></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))',gap:6}}>
            {[['Performance','92','#10b981'],['DD Control','88','var(--blue-400)'],['Consistency','84','var(--gold-400)'],['Rule Adherence','91','#8b5cf6'],['Execution','82','#06b6d4']].map(function(s){
              return <div key={s[0]} style={{padding:'6px 8px',borderRadius:6,background:'rgba(59,130,246,0.04)',border:'1px solid rgba(59,130,246,0.06)'}}>
                <div style={{fontSize:'0.58rem',color:'var(--text-d)',fontFamily:'var(--font-m)',textTransform:'uppercase',marginBottom:2}}>{s[0]}</div>
                <div className="mono" style={{fontSize:'1rem',fontWeight:700,color:s[2]}}>{s[1]}<span style={{fontSize:'0.55rem',color:'var(--text-d)'}}>/100</span></div>
              </div>;
            })}
          </div>
          <div style={{marginTop:10,display:'flex',gap:8,flexWrap:'wrap'}}>
            {[['Total verified P&L','+$14,220 (4 wk)'],['Longest streak','8 trades'],['Funded accounts','5']].map(function(s){
              return <span key={s[0]} style={{fontSize:'0.68rem',padding:'3px 8px',borderRadius:5,background:'rgba(59,130,246,0.04)',border:'1px solid rgba(59,130,246,0.08)'}}>
                <span style={{color:'var(--text-d)'}}>{s[0]}: </span><span className="mono" style={{color:'#10b981',fontWeight:600}}>{s[1]}</span>
              </span>;
            })}
          </div>
        </MockScreen>
        </Rv>
      </section>

      {/* ═══ CTA ═══ */}
      <Rv delay={60}>
        <div className="card card-active" style={{textAlign:'center',padding:'2rem'}}>
          <h2 style={{fontSize:'1.2rem',marginBottom:8}}>This Is <span className="grad-text">NeuroSpect</span></h2>
          <p style={{fontSize:'0.85rem',color:'var(--text-m)',maxWidth:480,margin:'0 auto 16px',lineHeight:1.6}}>From a journal observation to a live, multi-account, self-optimizing trading system — in one platform. No other tool does this.</p>
          <a href="#pricing" className="btn btn-blue">Join the Waitlist</a>
        </div>
      </Rv>

      <style>{'.page section .card{transition:none}.page section .card:hover{transform:none}'}</style>
    </div>
  );
}

window.WalkthroughPage=WalkthroughPage;
