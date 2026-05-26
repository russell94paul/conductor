/* NeuroSpect v2 — Quant Researcher Walkthrough: Dr. Maya Chen's Journey (12 Phases) */

function QuantWalkthroughPage(){
  var phaseSt=React.useState(0);var activePhase=phaseSt[0],setActivePhase=phaseSt[1];
  var trainSt=React.useState('idle');var trainStatus=trainSt[0],setTrainStatus=trainSt[1];
  var pfSt=React.useState(0);var pfKey=pfSt[0],setPfKey=pfSt[1];

  function runTrain(){setTrainStatus('running');setTimeout(function(){setTrainStatus('done');},2500);}

  React.useEffect(function(){
    var secs=document.querySelectorAll('[data-qwt-phase]');if(!secs.length)return;
    var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting)setActivePhase(parseInt(e.target.dataset.qwtPhase));});},{threshold:0.12,rootMargin:'-50px 0px 0px 0px'});
    secs.forEach(function(s){obs.observe(s);});return function(){obs.disconnect();};
  },[]);

  function scrollTo(id){var el=document.getElementById('qwt-'+id);if(el){var top=el.getBoundingClientRect().top+window.pageYOffset-56;window.scrollTo({top:top,behavior:'smooth'});}}

  return(
    <div className="page">
      {/* ═══ HERO ═══ */}
      <Rv><div className="hero-grad" style={{padding:'clamp(1.5rem,4vw,2.5rem)',marginBottom:'1rem',position:'relative',overflow:'hidden'}}>
        <HeroBg color="#06b6d4" variant="flow"/>        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
          <span className="badge badge-blue"><span className="badge-dot" style={{background:'#06b6d4'}}></span>Quant Researcher Walkthrough</span>
          <span className="badge badge-green" style={{fontSize:'0.55rem'}}>12 Phases</span>
        </div>
        <h1 style={{marginBottom:8}}>Meet Dr. Maya Chen. <span className="grad-text-blue">Signal Factory to Live Execution.</span></h1>
        <p style={{fontSize:'0.88rem',color:'var(--text-m)',maxWidth:580,lineHeight:1.65}}>A former ML engineer builds a multi-signal, regime-aware, fully automated trading system on ES/NQ futures. Real code. Real math. Real architecture decisions.</p>
        <div style={{display:'flex',alignItems:'center',gap:10,marginTop:16,padding:'8px 14px',borderRadius:10,background:'rgba(6,182,212,0.06)',border:'1px solid rgba(6,182,212,0.12)',maxWidth:480}}>
          <div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,#06b6d4,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.75rem',fontWeight:700,color:'#fff',flexShrink:0}}>M</div>
          <div><span style={{fontSize:'0.82rem',fontWeight:600,color:'var(--text-h)'}}>Dr. Maya Chen</span><span style={{fontSize:'0.65rem',color:'var(--text-d)',marginLeft:8}}>ES · NQ · 5 funded accounts · Systematic</span></div>
        </div>
      </div></Rv>

      {/* ═══ STICKY NAV ═══ */}
      <div style={{position:'sticky',top:0,zIndex:50,background:'rgba(5,8,16,0.92)',backdropFilter:'blur(12px)',padding:'6px 0',borderBottom:'1px solid var(--border)',marginBottom:'1.5rem'}}>
        <div style={{display:'flex',gap:2,overflowX:'auto',padding:'0 2px'}}>
          {QWT_PHASES.map(function(ph,i){var act=activePhase===i;return(
            <button key={ph.id} onClick={function(){scrollTo(ph.id);}} style={{display:'flex',alignItems:'center',gap:3,padding:'3px 7px',borderRadius:5,whiteSpace:'nowrap',fontSize:'0.58rem',fontWeight:600,fontFamily:'var(--font-m)',background:act?ph.color+'15':'transparent',border:'1px solid '+(act?ph.color+'40':'transparent'),color:act?ph.color:'var(--text-d)',transition:'all 0.2s',cursor:'pointer'}}>
              <span style={{opacity:0.5}}>{ph.num}</span>{ph.title}
            </button>
          );})}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PHASE 1: DATA PIPELINE
         ══════════════════════════════════════════ */}
      <section data-qwt-phase="0" id="qwt-pipeline" style={{marginBottom:'2rem'}}>
        <Rv><PhaseHead num="01" title="Data Pipeline Architecture" color="#06b6d4"/>
        <MayaNote>Before any modeling, I need clean, normalized, multi-timeframe data with ICT event annotations. The data pipeline is the foundation everything else sits on.</MayaNote>

        <MockScreen title="EdgeLab — Data Pipeline Designer" color="#06b6d4">
          <PipelineDiagram/>
        </MockScreen>

        <MockScreen title="Pipeline Configuration" color="#06b6d4">
          <PyBlock code={QWT_CODE.pipeline}/>
        </MockScreen>

        <MockScreen title="Data Quality Dashboard" color="#06b6d4" live={true}>
          <table className="tbl"><thead><tr><th>Feed</th><th>Status</th><th>Latency</th><th>Gap Rate</th><th>Last</th></tr></thead>
          <tbody>{[
            ['ES 1m OHLCV','✅ Live','12ms','0.00%','14:32:05'],['ES Tick','✅ Live','3ms','0.01%','14:32:05'],
            ['NQ 1m OHLCV','✅ Live','14ms','0.00%','14:32:05'],['ICT Events','✅ Live','45ms','—','14:32:04'],['Feature Store','✅ Synced','—','—','14:32:03'],
          ].map(function(r){return <tr key={r[0]}><td className="mono" style={{fontWeight:500}}>{r[0]}</td><td><span style={{color:'#10b981',fontSize:'0.7rem'}}>{r[1]}</span></td><td className="mono" style={{color:'var(--blue-400)'}}>{r[2]}</td><td className="mono">{r[3]}</td><td className="mono" style={{color:'var(--text-d)'}}>{r[4]}</td></tr>;})}</tbody></table>
          <div style={{marginTop:8,fontSize:'0.7rem',color:'var(--text-d)'}}>Historical: ES 2 years (504 trading days, 181,440 5-min bars)</div>
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 2: FEATURE ENGINEERING
         ══════════════════════════════════════════ */}
      <section data-qwt-phase="1" id="qwt-features" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="02" title="Feature Engineering" color="#10b981"/>
        <MayaNote>Raw ICT events are binary — sweep happened or didn't. I need continuous features that capture the quality and context of each event. A sweep that takes out 3 days of lows is different from one that barely clips the session low.</MayaNote>

        <MockScreen title="EdgeLab — Feature Engineering Studio" color="#10b981">
          <PyBlock code={QWT_CODE.features}/>
        </MockScreen>

        <div className="bento bento-2" style={{marginBottom:12}}>
          <MockScreen title="Feature Correlation Matrix (14×14)" color="#10b981">
            <CorrHeatmap data={QWT_CORR}/>
            <div style={{fontSize:'0.6rem',color:'var(--text-d)',marginTop:4}}>Blue = positive · Red = negative · Bright = |r| &gt; 0.6 (remove)</div>
          </MockScreen>
          <MockScreen title="Feature Importance (Preliminary)" color="#10b981">
            <FeatureImpBars data={QWT_FEAT_IMP}/>
          </MockScreen>
        </div>

        <MayaNote>sweep_depth and displacement_size are my top predictors — matches ICT intuition. But order flow imbalance is #4 — that's a microstructure signal the ICT framework doesn't explicitly teach. The model is finding edge I wouldn't have discovered manually.</MayaNote>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 3: SIGNAL CONSTRUCTION
         ══════════════════════════════════════════ */}
      <section data-qwt-phase="2" id="qwt-signals" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="03" title="Signal Construction" color="#8b5cf6"/>
        <MayaNote>Individual features predict weakly. I need to combine them into composite signals with proper normalization, regime conditioning, and decay functions.</MayaNote>

        <MockScreen title="EdgeLab — Signal Builder" color="#8b5cf6">
          <PyBlock code={QWT_CODE.signals}/>
        </MockScreen>

        <MockScreen title="Signal Dashboard — Real-Time" color="#8b5cf6" live={true}>
          <SignalGauges signals={[
            {label:'ICT Quality',value:78,max:100,color:'#10b981'},
            {label:'Micro Conv.',value:42,max:100,color:'#3b82f6'},
            {label:'Entry Timing',value:71,max:100,color:'#8b5cf6'},
            {label:'Confluence',value:82,max:100,color:'#fbbf24'},
          ]}/>
          <div style={{marginTop:6,padding:'6px 10px',borderRadius:6,background:'rgba(16,185,129,0.06)',border:'1px solid rgba(16,185,129,0.15)',textAlign:'center'}}>
            <span className="mono" style={{fontSize:'0.72rem',color:'#10b981',fontWeight:600}}>Regime: Trending Bull · Confluence: 82 → TRADE</span>
          </div>
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 4: MODEL TRAINING
         ══════════════════════════════════════════ */}
      <section data-qwt-phase="3" id="qwt-training" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="04" title="Model Training" color="#3b82f6"/>
        <MayaNote>I'm training an ensemble, not a single model. Each model captures different aspects of the signal. The meta-learner combines them with regime-aware weighting.</MayaNote>

        <MockScreen title="EdgeLab — Model Training Lab" color="#3b82f6"
          toolbar={<button className="btn btn-blue btn-sm" onClick={runTrain} style={{fontSize:'0.68rem',padding:'3px 10px'}}>{trainStatus==='running'?'Training...':trainStatus==='done'?'↻ Retrain':'▶ Train Models'}</button>}>
          <PyBlock code={QWT_CODE.training}/>
        </MockScreen>

        {(trainStatus==='running'||trainStatus==='done')&&<MockScreen title="Training Progress" color="#3b82f6">
          {[{name:'XGBoost',pct:trainStatus==='done'?100:85,metric:'AUC: 0.714',color:'#ef4444'},
            {name:'LSTM',pct:trainStatus==='done'?100:62,metric:trainStatus==='done'?'Val Loss: 0.312':'Epoch 15/25',color:'#8b5cf6'},
            {name:'Logistic',pct:100,metric:'AUC: 0.681',color:'var(--text-m)'},
            {name:'Meta-Learner',pct:trainStatus==='done'?100:0,metric:trainStatus==='done'?'Combined AUC: 0.761':'Waiting...',color:'#10b981'},
          ].map(function(m){return <div key={m.name} style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
            <span className="mono" style={{fontSize:'0.68rem',color:'var(--text-b)',width:80}}>{m.name}</span>
            <div style={{flex:1}}><PBar value={m.pct} color={m.color} h={5}/></div>
            <span className="mono" style={{fontSize:'0.62rem',color:m.pct===100?'#10b981':'var(--text-d)',width:100,textAlign:'right'}}>{m.metric}</span>
          </div>;})}
        </MockScreen>}

        {trainStatus==='done'&&<div className="bento bento-2">
          <MockScreen title="Model Comparison" color="#3b82f6">
            <table className="tbl"><thead><tr><th>Model</th><th>AUC</th><th>Prec</th><th>Sharpe</th><th>PF</th></tr></thead>
            <tbody>{QWT_MODELS.map(function(m){return <tr key={m.name} style={{background:m.best?'rgba(16,185,129,0.04)':'transparent'}}>
              <td style={{fontWeight:m.best?600:400,color:m.best?'var(--text-h)':'var(--text-b)'}}>{m.name}</td>
              <td className="mono" style={{color:m.best?'#10b981':'var(--text-m)'}}>{m.auc}</td>
              <td className="mono">{m.prec}</td>
              <td className="mono" style={{color:m.best?'#10b981':'var(--blue-400)'}}>{m.sharpe}</td>
              <td className="mono" style={{color:m.best?'#10b981':'var(--text-m)'}}>{m.pf}</td>
            </tr>;})}</tbody></table>
          </MockScreen>
          <MockScreen title="ROC Curves" color="#3b82f6">
            <ROCChart curves={QWT_ROC}/>
          </MockScreen>
        </div>}

        {trainStatus==='done'&&<MayaNote>The regime-conditioned ensemble adds +0.19 AUC over the best single model. That's the difference between a marginal edge and a tradeable one. The LSTM's contribution spikes during volatile regimes — it's capturing something the tree model misses.</MayaNote>}
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 5: RIGOROUS VALIDATION
         ══════════════════════════════════════════ */}
      <section data-qwt-phase="4" id="qwt-validation" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="05" title="Rigorous Validation" color="#f59e0b"/>
        <MayaNote>I don't trust any single validation method. The strategy must survive null testing, Monte Carlo, walk-forward, and combinatorial cross-validation.</MayaNote>

        <div className="bento bento-2" style={{marginBottom:12}}>
          <MockScreen title="Null Hypothesis Test" color="#f59e0b">
            <div style={{display:'flex',flexDirection:'column',gap:3}}>
              {[['Strategy Sharpe','2.12','#10b981'],['Random 99th %ile','1.08','#ef4444'],['p-value','< 0.001','var(--gold-400)']].map(function(r){
                return <div key={r[0]} style={{display:'flex',justifyContent:'space-between',padding:'3px 6px',borderRadius:4,background:'rgba(59,130,246,0.03)'}}>
                  <span style={{fontSize:'0.72rem',color:'var(--text-b)'}}>{r[0]}</span>
                  <span className="mono" style={{fontSize:'0.72rem',fontWeight:600,color:r[2]}}>{r[1]}</span>
                </div>;
              })}
            </div>
            <div style={{marginTop:6,padding:'5px 8px',borderRadius:5,background:'rgba(16,185,129,0.06)',border:'1px solid rgba(16,185,129,0.12)'}}>
              <span className="mono" style={{fontSize:'0.65rem',color:'#10b981'}}>✅ REJECT NULL (99.9% confidence)</span>
            </div>
          </MockScreen>
          <MockScreen title="CPCV (Combinatorial Purged)" color="#f59e0b">
            <div style={{display:'flex',flexDirection:'column',gap:3}}>
              {[['10 train/test combos','All positive','#10b981'],['Min test Sharpe','1.41','var(--blue-400)'],['Max test Sharpe','2.68','var(--blue-400)'],['Deflated Sharpe','1.72','var(--gold-400)']].map(function(r){
                return <div key={r[0]} style={{display:'flex',justifyContent:'space-between',padding:'3px 6px',borderRadius:4,background:'rgba(59,130,246,0.03)'}}>
                  <span style={{fontSize:'0.72rem',color:'var(--text-b)'}}>{r[0]}</span>
                  <span className="mono" style={{fontSize:'0.72rem',fontWeight:600,color:r[2]}}>{r[1]}</span>
                </div>;
              })}
            </div>
          </MockScreen>
        </div>

        <div className="bento bento-2">
          <MockScreen title="Monte Carlo — 10,000 Paths" color="#f59e0b">
            <div style={{background:'rgba(5,8,16,0.3)',borderRadius:8,padding:'4px',border:'1px solid var(--border)',marginBottom:6}}>
              <WtMCChart paths={QWT_MC_PATHS} median={QWT_MC_MEDIAN}/>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:2}}>
              {[['Median terminal','$84,200'],['5th %ile','$58,400'],['99th DD','-$8,900'],['Prop survival','91.2%']].map(function(r){
                return <div key={r[0]} style={{display:'flex',justifyContent:'space-between',fontSize:'0.68rem',padding:'2px 4px'}}>
                  <span style={{color:'var(--text-d)'}}>{r[0]}</span><span className="mono" style={{color:'var(--text-b)'}}>{r[1]}</span>
                </div>;
              })}
            </div>
          </MockScreen>
          <MockScreen title="Walk-Forward Efficiency" color="#f59e0b">
            <div style={{background:'rgba(5,8,16,0.3)',borderRadius:8,padding:'4px',border:'1px solid var(--border)',marginBottom:6}}>
              <WtEquity data={QWT_EQUITY} id="qwt" color="#f59e0b" showDD={true}/>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:2}}>
              {[['OOS windows','8 of 8 profitable'],['Walk-forward eff.','84%'],['Min OOS PF','1.62'],['Max OOS DD','-11.4%']].map(function(r){
                return <div key={r[0]} style={{display:'flex',justifyContent:'space-between',fontSize:'0.68rem',padding:'2px 4px'}}>
                  <span style={{color:'var(--text-d)'}}>{r[0]}</span><span className="mono" style={{color:'#10b981'}}>{r[1]}</span>
                </div>;
              })}
            </div>
          </MockScreen>
        </div>

        <div className="card" style={{marginTop:12,background:'rgba(16,185,129,0.04)',border:'1px solid rgba(16,185,129,0.15)',padding:'10px 14px'}}>
          <div className="mono" style={{fontSize:'0.72rem',color:'#10b981',fontWeight:600,marginBottom:4}}>VALIDATION VERDICT</div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
            {['Null: p < 0.001 ✅','CPCV: dSharpe 1.72 ✅','MC: ruin 0.3% ✅','WF: 84% eff ✅'].map(function(v){
              return <span key={v} className="badge badge-green" style={{fontSize:'0.58rem'}}>{v}</span>;
            })}
          </div>
          <div className="mono" style={{fontSize:'0.7rem',color:'#10b981',marginTop:6,textShadow:'0 0 6px rgba(16,185,129,0.3)'}}>CLEARED FOR DEPLOYMENT</div>
        </div>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 6: RISK ARCHITECTURE
         ══════════════════════════════════════════ */}
      <section data-qwt-phase="5" id="qwt-risk" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="06" title="Position Sizing & Risk Architecture" color="#ef4444"/>
        <MayaNote>Edge is necessary but not sufficient. Position sizing is what turns a winning strategy into a surviving one. I'm using fractional Kelly with regime-adjusted scaling.</MayaNote>

        <MockScreen title="Risk Architecture Designer" color="#ef4444">
          <PyBlock code={QWT_CODE.risk}/>
        </MockScreen>

        <MockScreen title="Risk Formulas" color="#ef4444">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <div style={{padding:'8px 10px',borderRadius:6,background:'rgba(59,130,246,0.03)',border:'1px solid rgba(59,130,246,0.06)'}}>
              <div className="label" style={{marginBottom:3}}>Kelly Criterion</div>
              <div className="mono" style={{fontSize:'0.75rem',color:'var(--text-h)'}}>f* = (p·b − q) / b</div>
              <div style={{fontSize:'0.62rem',color:'var(--text-d)',marginTop:2}}>p=win rate, b=win/loss ratio, q=1−p</div>
              <div className="mono" style={{fontSize:'0.7rem',color:'var(--gold-400)',marginTop:4}}>f* = (0.65 × 2.12 − 0.35) / 2.12 = 0.485</div>
              <div className="mono" style={{fontSize:'0.65rem',color:'var(--text-m)'}}>Quarter Kelly: 0.485 × 0.25 = <span style={{color:'#10b981'}}>0.121</span></div>
            </div>
            <div style={{padding:'8px 10px',borderRadius:6,background:'rgba(59,130,246,0.03)',border:'1px solid rgba(59,130,246,0.06)'}}>
              <div className="label" style={{marginBottom:3}}>Regime Scaling</div>
              <div style={{display:'flex',flexDirection:'column',gap:2}}>
                {[['Trending','1.0×','#10b981'],['Ranging','0.6×','var(--gold-400)'],['Volatile','0.4×','#ef4444']].map(function(r){
                  return <div key={r[0]} style={{display:'flex',justifyContent:'space-between',fontSize:'0.7rem'}}>
                    <span style={{color:'var(--text-m)'}}>{r[0]}</span>
                    <span className="mono" style={{color:r[2],fontWeight:600}}>{r[1]}</span>
                  </div>;
                })}
              </div>
            </div>
          </div>
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 7: AGENT SAFETY
         ══════════════════════════════════════════ */}
      <section data-qwt-phase="6" id="qwt-safety" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="07" title="Agent Configuration & Safety Layers" color="#ec4899"/>
        <MayaNote>The agent has 5 safety layers. Any single layer can halt execution. No trade goes through without passing all 5.</MayaNote>

        <MockScreen title="NeuroTrader — 5-Layer Safety Architecture" color="#ec4899">
          <LayerStack/>
        </MockScreen>

        <MockScreen title="Pre-Flight Check — Real-Time" color="#ec4899" live={true}
          toolbar={<button className="btn btn-ghost btn-sm" onClick={function(){setPfKey(pfKey+1);}} style={{fontSize:'0.68rem',padding:'3px 10px'}}>▶ Replay</button>}>
          <div style={{marginBottom:6,padding:'6px 10px',borderRadius:6,background:'rgba(59,130,246,0.04)',border:'1px solid rgba(59,130,246,0.08)'}}>
            <span className="mono" style={{fontSize:'0.72rem',color:'var(--gold-400)'}}>TRADE SIGNAL: Long ES @ 5842.25 — Confluence: 82/100</span>
          </div>
          <ExecLog lines={QWT_PREFLIGHT} trigger={pfKey}/>
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 8: SHADOW → PAPER → LIVE
         ══════════════════════════════════════════ */}
      <section data-qwt-phase="7" id="qwt-deploy" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="08" title="Shadow → Paper → Live Progression" color="#14b8a6"/>
        <MayaNote>I never go straight to live. Shadow mode for 2 weeks, paper for 2 weeks, live with minimum size for 2 weeks. Each stage has pass/fail criteria.</MayaNote>

        <MockScreen title="Deployment Pipeline" color="#14b8a6">
          <DeployPipeline active={2}/>
        </MockScreen>

        <MockScreen title="Stage Comparison" color="#14b8a6">
          <table className="tbl"><thead><tr><th>Metric</th>{QWT_STAGES.map(function(s){return <th key={s.stage} style={{color:s.stage==='Live-Min'?'var(--blue-400)':'var(--text-d)'}}>{s.stage}</th>;})}</tr></thead>
          <tbody>{['trades','wr','pf','avgW','avgL','dd','sharpe','slip'].map(function(key){
            var labels={trades:'Trades',wr:'Win Rate',pf:'Profit Factor',avgW:'Avg Win',avgL:'Avg Loss',dd:'Max DD',sharpe:'Sharpe',slip:'Slippage'};
            return <tr key={key}><td style={{fontWeight:500}}>{labels[key]}</td>
              {QWT_STAGES.map(function(s){return <td key={s.stage} className="mono" style={{fontSize:'0.72rem',color:key==='sharpe'?'var(--blue-400)':'var(--text-b)'}}>{s[key]}</td>;})}</tr>;
          })}</tbody></table>
          <div style={{marginTop:6,padding:'5px 8px',borderRadius:5,background:'rgba(16,185,129,0.06)',border:'1px solid rgba(16,185,129,0.12)'}}>
            <span className="mono" style={{fontSize:'0.65rem',color:'#10b981'}}>All metrics within 2σ of backtest · Proceed to live-full</span>
          </div>
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 9: MULTI-ACCOUNT
         ══════════════════════════════════════════ */}
      <section data-qwt-phase="8" id="qwt-multi" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="09" title="Live Multi-Account Deployment" color="#3b82f6"/>
        <MockScreen title="NeuroSync — Execution Architecture" color="#3b82f6" live={true}>
          <table className="tbl"><thead><tr><th>Account</th><th>Firm</th><th>Size</th><th>Status</th><th>Latency</th><th>DD Rem.</th></tr></thead>
          <tbody>{[
            {n:'Apex #1',f:'Apex',s:'$150K',st:'active',lat:'3.2ms',dd:'$3,420'},
            {n:'Apex #2',f:'Apex',s:'$150K',st:'active',lat:'4.1ms',dd:'$4,100'},
            {n:'Apex #3',f:'Apex',s:'$50K',st:'active',lat:'4.8ms',dd:'$1,800'},
            {n:'MFF #1',f:'MFF',s:'$100K',st:'active',lat:'5.4ms',dd:'$2,900'},
            {n:'MFF #2',f:'MFF',s:'$100K',st:'active',lat:'5.1ms',dd:'$3,200'},
          ].map(function(a){
            return <tr key={a.n}><td className="mono" style={{fontWeight:600}}>{a.n}</td><td>{a.f}</td><td className="mono">{a.s}</td>
              <td><span className="badge badge-green" style={{fontSize:'0.5rem',padding:'1px 5px'}}>✅ Active</span></td>
              <td className="mono" style={{color:'var(--blue-400)'}}>{a.lat}</td><td className="mono" style={{color:'var(--gold-400)'}}>{a.dd}</td></tr>;
          })}</tbody></table>
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 10: BAYESIAN OPTIMIZATION
         ══════════════════════════════════════════ */}
      <section data-qwt-phase="9" id="qwt-bayesian" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="10" title="Bayesian Parameter Optimization" color="#a855f7"/>
        <MockScreen title="EdgeLab — Bayesian Optimizer" color="#a855f7">
          <PyBlock code={QWT_CODE.bayesian}/>
        </MockScreen>

        <MockScreen title="Optimization Progress — Week 8 of 20" color="#a855f7">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {[{p:'min_confluence',curr:72,range:'50–90',best:72},{p:'kelly_fraction',curr:0.22,range:'0.10–0.40',best:0.22},{p:'regime_scaling',curr:0.55,range:'0.2–1.0',best:0.55},{p:'take_profit_r',curr:2.8,range:'1.5–4.0',best:2.8}].map(function(param){
              var pct=typeof param.curr==='number'&&param.curr>1?(param.curr-50)/40*100:(param.curr/1)*100;
              return <div key={param.p} style={{padding:'6px 8px',borderRadius:6,background:'rgba(59,130,246,0.03)',border:'1px solid rgba(59,130,246,0.06)'}}>
                <div className="mono" style={{fontSize:'0.62rem',color:'#a855f7',marginBottom:2}}>{param.p}</div>
                <div style={{display:'flex',alignItems:'baseline',gap:4}}>
                  <span className="mono" style={{fontSize:'0.9rem',fontWeight:700,color:'var(--text-h)'}}>{param.curr}</span>
                  <span style={{fontSize:'0.58rem',color:'var(--text-d)'}}>range: {param.range}</span>
                </div>
                <div style={{width:'100%',height:3,borderRadius:2,background:'rgba(168,85,247,0.08)',marginTop:4}}>
                  <div style={{width:'65%',height:'100%',borderRadius:2,background:'linear-gradient(90deg,#a855f7,#8b5cf6)',boxShadow:'0 0 6px rgba(168,85,247,0.3)'}}></div>
                </div>
              </div>;
            })}
          </div>
          <div style={{marginTop:8,padding:'6px 10px',borderRadius:5,background:'rgba(168,85,247,0.06)',border:'1px solid rgba(168,85,247,0.12)'}}>
            <span className="mono" style={{fontSize:'0.68rem',color:'#a855f7'}}>Posterior narrowing: 62% · Expected convergence: week 14</span>
          </div>
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 11: MODEL MONITORING
         ══════════════════════════════════════════ */}
      <section data-qwt-phase="10" id="qwt-monitor" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="11" title="Model Monitoring & Drift Detection" color="#f59e0b"/>
        <MayaNote>Models decay. The market changes. I need automated monitoring that detects when my edge is eroding before it costs me money.</MayaNote>

        <MockScreen title="Signal Stability — PSI (Population Stability Index)" color="#f59e0b">
          <PSIBars data={QWT_PSI}/>
        </MockScreen>

        <MockScreen title="Drift Alert — 2025-12-15" color="#f59e0b">
          <div style={{padding:'10px 14px',borderRadius:8,background:'rgba(245,158,11,0.04)',border:'1px solid rgba(245,158,11,0.15)'}}>
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:6}}>
              <span style={{fontSize:'0.8rem'}}>⚠️</span>
              <span className="mono" style={{fontSize:'0.75rem',color:'#f59e0b',fontWeight:600}}>Feature Drift Detected</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:3,marginBottom:8}}>
              {[['Feature','ofi_5m (Order Flow Imbalance)'],['PSI','0.18 (threshold: 0.10)'],['Impact','Distribution shifted — model may be stale']].map(function(r){
                return <div key={r[0]} style={{display:'flex',gap:8,fontSize:'0.72rem'}}>
                  <span style={{color:'var(--text-d)',width:50}}>{r[0]}:</span>
                  <span style={{color:'var(--text-b)'}}>{r[1]}</span>
                </div>;
              })}
            </div>
            <div className="label" style={{color:'#f59e0b',marginBottom:4}}>Automated Actions</div>
            <div style={{display:'flex',flexDirection:'column',gap:2}}>
              {['✅ Position sizing reduced to 0.5× (precautionary)','✅ Alert sent to Maya (Slack + email)','✅ EdgeLab re-validation triggered','⏳ Awaiting Maya\'s decision'].map(function(a){
                return <span key={a} className="mono" style={{fontSize:'0.65rem',color:a.indexOf('✅')>-1?'#10b981':'var(--gold-400)'}}>{a}</span>;
              })}
            </div>
            <div style={{display:'flex',gap:6,marginTop:8}}>
              <button className="btn btn-gold btn-sm" style={{fontSize:'0.65rem',padding:'3px 10px'}}>Retrain Model</button>
              <button className="btn btn-ghost btn-sm" style={{fontSize:'0.65rem',padding:'3px 10px'}}>Adjust Feature</button>
              <button className="btn btn-ghost btn-sm" style={{fontSize:'0.65rem',padding:'3px 10px'}}>Dismiss</button>
            </div>
          </div>
        </MockScreen>
        </Rv>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 12: CONTINUOUS RESEARCH
         ══════════════════════════════════════════ */}
      <section data-qwt-phase="11" id="qwt-research" style={{marginBottom:'2rem'}}>
        <Rv delay={40}><PhaseHead num="12" title="Continuous Research Loop" color="#10b981"/>
        <MayaNote>The system isn't finished when it's deployed. Every week, new data generates new research questions. I maintain a research backlog and continuously develop the next generation of signals.</MayaNote>

        <MockScreen title="Research Backlog" color="#10b981">
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))',gap:8}}>
            {[
              {title:'Hypotheses',color:'#8b5cf6',items:['HYP-051: NQ/ES spread regime','HYP-052: London close imbalance','HYP-053: FVG fill exhaustion']},
              {title:'In Testing',color:'#f59e0b',items:['HYP-048: Volume POC migration','HYP-049: OR breakout scoring']},
              {title:'Validated',color:'#10b981',items:['HYP-044: Session gap fill (S:1.6)']},
              {title:'Deployed',color:'#3b82f6',items:['HYP-042: London Sweep (S:2.08)','HYP-038: NY Reversal (S:1.74)']},
            ].map(function(col){return(
              <div key={col.title} style={{background:'rgba(59,130,246,0.03)',border:'1px solid rgba(59,130,246,0.06)',borderRadius:8,padding:'8px'}}>
                <div style={{fontSize:'0.65rem',fontWeight:600,color:col.color,fontFamily:'var(--font-m)',textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:6}}>{col.title}</div>
                {col.items.map(function(it){return <div key={it} style={{fontSize:'0.68rem',color:'var(--text-b)',padding:'3px 6px',marginBottom:3,borderRadius:4,background:'rgba(59,130,246,0.03)',border:'1px solid rgba(59,130,246,0.04)',lineHeight:1.4}}>{it}</div>;})}
              </div>
            );})}
          </div>
        </MockScreen>

        <MockScreen title="Multi-Strategy Portfolio" color="#10b981">
          <table className="tbl"><thead><tr><th>Strategy</th><th>Inst</th><th>Sharpe</th><th>Alloc</th><th>Corr</th><th>Status</th></tr></thead>
          <tbody>{QWT_PORTFOLIO.map(function(s){
            var colors={active:'#10b981',deploying:'var(--blue-400)',testing:'var(--gold-400)',cash:'var(--text-d)'};
            return <tr key={s.name}><td style={{fontWeight:500}}>{s.name}</td><td className="mono">{s.inst}</td>
              <td className="mono" style={{color:s.sharpe?'var(--blue-400)':'var(--text-d)'}}>{s.sharpe||'—'}</td>
              <td className="mono">{s.alloc}%</td><td className="mono">{s.corr}</td>
              <td><span className={'badge badge-'+(s.status==='active'?'green':s.status==='testing'?'gold':'blue')} style={{fontSize:'0.5rem',padding:'1px 5px'}}>{s.status}</span></td>
            </tr>;
          })}</tbody></table>
          <div style={{marginTop:8,display:'flex',gap:8,flexWrap:'wrap'}}>
            {[['Combined Sharpe','2.64'],['Max correlation','0.32'],['Portfolio 95th DD','-7.2%'],['Annual target','48%']].map(function(m){
              return <span key={m[0]} style={{fontSize:'0.68rem',padding:'3px 8px',borderRadius:5,background:'rgba(59,130,246,0.04)',border:'1px solid rgba(59,130,246,0.08)'}}>
                <span style={{color:'var(--text-d)'}}>{m[0]}: </span><span className="mono" style={{color:'#10b981',fontWeight:600}}>{m[1]}</span>
              </span>;
            })}
          </div>
        </MockScreen>
        </Rv>
      </section>

      {/* ═══ CTA ═══ */}
      <Rv delay={60}>
        <div className="card card-active" style={{textAlign:'center',padding:'2rem'}}>
          <h2 style={{fontSize:'1.2rem',marginBottom:8}}>This Is NeuroSpect for <span className="grad-text-blue">Quant Researchers</span></h2>
          <p style={{fontSize:'0.85rem',color:'var(--text-m)',maxWidth:500,margin:'0 auto 16px',lineHeight:1.6}}>From raw market data to a live, multi-signal, multi-account, self-improving systematic trading platform. Built for quants who demand rigor.</p>
          <a href="#pricing" className="btn btn-blue">Join the Waitlist</a>
        </div>
      </Rv>
    </div>
  );
}

window.QuantWalkthroughPage=QuantWalkthroughPage;
