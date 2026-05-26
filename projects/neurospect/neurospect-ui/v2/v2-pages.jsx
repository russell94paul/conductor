/* NeuroSpect v2 — Remaining Pages: Features, Performance, Architecture, Compare, Pricing */

/* ═══ UPCOMING FEATURES (EdgeLab Research Studio) ═══ */
function FeaturesPage() {
  var engState = React.useState(null);
  var engine = engState[0], setEngine = engState[1];
  var wfState = React.useState({ running: false, idx: -1 });
  var wfAnim = wfState[0], setWfAnim = wfState[1];

  function runWf() {
    setWfAnim({ running: true, idx: 0 });
    var i = 0;
    var iv = setInterval(function() { i++; if (i >= AEE_WORKFLOW_STEPS.length) { clearInterval(iv); setTimeout(function() { setWfAnim({ running: false, idx: -1 }); }, 1500); } else { setWfAnim({ running: true, idx: i }); } }, 700);
  }

  return (
    <div className="page">
      <Rv>
        <div className="hero-grad" style={{ padding: 'clamp(2rem,4vw,3rem)', marginBottom: '1.5rem' }}>
          <span className="badge badge-blue" style={{ marginBottom: 14 }}><span className="badge-dot" style={{ background: '#8b5cf6' }}></span>Phase 8</span>
          <h1 style={{ marginBottom: 10 }}><span className="grad-text">EdgeLab Research Studio</span></h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-m)', maxWidth: 520, lineHeight: 1.65, marginBottom: 20 }}>
            Every win, loss, and regime shift converted into validated edge. Three engines powering one continuous improvement loop.
          </p>
        </div>
      </Rv>

      {/* Core Engines */}
      <Rv delay={60}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: 14 }}>Core Engines</h2>
        <div className="bento bento-3" style={{ marginBottom: '1.5rem' }}>
          {AEE_CORE_ENGINES.map(function(eng, i) {
            var isOpen = engine === eng.id;
            return (
              <Rv key={eng.id} delay={i * 50}>
                <div className={'card ' + (isOpen ? 'card-active' : '')} style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', borderLeftWidth: 3, borderLeftColor: eng.color }}
                  onClick={function() { setEngine(isOpen ? null : eng.id); }}>
                  <h3 style={{ fontSize: '0.9rem', marginBottom: 4 }}>{eng.name}</h3>
                  <p className="mono" style={{ fontSize: '0.72rem', color: eng.color, fontStyle: 'italic', marginBottom: 8 }}>"{eng.tagline}"</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-m)', lineHeight: 1.5, flex: 1, marginBottom: 8 }}>{eng.desc}</p>
                  <div style={{ maxHeight: isOpen ? 500 : 0, overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
                    <div style={{ height: 1, background: eng.color + '33', marginBottom: 10 }}></div>
                    {eng.capabilities.map(function(cap, ci) {
                      return <div key={ci} style={{ marginBottom: 6, paddingLeft: 10, borderLeft: '2px solid ' + eng.color + '33' }}>
                        <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-h)', marginBottom: 1 }}>{cap.name}</p>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-m)' }}>{cap.desc}</p>
                      </div>;
                    })}
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-d)', textAlign: 'center', marginTop: 4 }}>{isOpen ? '▲ Collapse' : '▼ View capabilities'}</span>
                </div>
              </Rv>
            );
          })}
        </div>
      </Rv>

      {/* E2E Workflow */}
      <Rv delay={100}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: 14 }}>End-to-End: Losing Trade → <span className="grad-text">Validated Edge</span></h2>
        <div className="card card-active" style={{ marginBottom: '1.5rem', padding: 'clamp(1rem,2.5vw,1.5rem)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 16 }}>
            {AEE_WORKFLOW_STEPS.map(function(step, i) {
              var isActive = wfAnim.idx === i, isPast = wfAnim.idx > i;
              return (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', position: 'relative', opacity: wfAnim.running && wfAnim.idx < i ? 0.2 : 1, transition: 'opacity 0.4s' }}>
                  {i < AEE_WORKFLOW_STEPS.length - 1 && <div style={{ position: 'absolute', left: 15, top: 34, width: 2, height: 'calc(100% - 12px)', background: isPast ? step.color + '44' : 'rgba(59,130,246,0.06)' }}></div>}
                  <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, border: '1.5px solid ' + (isActive ? step.color : 'rgba(59,130,246,0.08)'), background: isActive ? step.color + '18' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-m)', fontSize: '0.6rem', color: isActive ? step.color : 'var(--text-d)', zIndex: 2, boxShadow: isActive ? '0 0 14px ' + step.color + '25' : 'none', transition: 'all 0.3s' }}>{step.num}</div>
                  <div style={{ flex: 1, paddingBottom: 12 }}>
                    <p style={{ fontSize: '0.82rem', fontWeight: 600, color: isActive ? 'var(--text-h)' : 'var(--text-b)', marginBottom: 2 }}>{step.title}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-m)', lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={runWf} disabled={wfAnim.running} className="btn btn-blue btn-sm" style={{ opacity: wfAnim.running ? 0.5 : 1 }}>
              {wfAnim.running ? 'Processing...' : '▶ Run Workflow'}
            </button>
          </div>
        </div>
      </Rv>

      {/* Roadmap */}
      <Rv delay={140}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: 14 }}>Roadmap</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {AEE_ROADMAP.map(function(phase, i) {
            var isCurrent = phase.phase === 8;
            return (
              <Rv key={i} delay={i * 50}>
                <div className={'card ' + (isCurrent ? 'card-active' : '')} style={{ borderLeftWidth: 3, borderLeftColor: isCurrent ? 'var(--blue-500)' : 'rgba(59,130,246,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span className="mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: isCurrent ? 'var(--blue-400)' : 'var(--text-d)' }}>Phase {phase.phase}</span>
                    <h3 style={{ fontSize: '0.9rem' }}>{phase.title}</h3>
                    {isCurrent && <span className="badge badge-blue" style={{ fontSize: '0.55rem' }}>Current</span>}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {phase.items.map(function(item) {
                      return <span key={item} style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: 5, background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.08)', color: 'var(--text-m)' }}>{item}</span>;
                    })}
                  </div>
                </div>
              </Rv>
            );
          })}
        </div>
      </Rv>
    </div>
  );
}

/* ═══ PERFORMANCE ═══ */
function PerformancePage() {
  var tierState = React.useState('all');
  var activeTier = tierState[0], setActiveTier = tierState[1];

  var W = 600, H = 200, P = { t: 12, r: 12, b: 20, l: 48 };
  var allV = []; TIER_ORDER.forEach(function(id) { EQUITY_RAW[id].forEach(function(v) { allV.push(v); }); });
  var mn = Math.min.apply(null, allV) - 500, mx = Math.max.apply(null, allV) + 500;
  var xS = (W - P.l - P.r) / (EQUITY_RAW.tier1.length - 1);
  var yS = function(v) { return P.t + (1 - (v - mn) / (mx - mn)) * (H - P.t - P.b); };

  return (
    <div className="page">
      <Rv>
        <div className="hero-grad" style={{ padding: 'clamp(2rem,4vw,3rem)', marginBottom: '1.5rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: 14 }}>Illustrative Demo Data</span>
          <h1 style={{ marginBottom: 10 }}>Structure Changes <span className="grad-text">Performance</span></h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-m)', maxWidth: 520, lineHeight: 1.65 }}>One-month NQ performance lab comparing four trader workflows.</p>
        </div>
      </Rv>
      <Rv delay={60}>
        <div className="card card-active" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
            {TIER_ORDER.map(function(id) {
              var t = TIER_META[id];
              return <button key={id} onClick={function() { setActiveTier(activeTier === id ? 'all' : id); }}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 6, border: '1px solid rgba(59,130,246,0.08)', background: activeTier === id ? t.color + '22' : 'transparent', fontSize: '0.75rem', color: 'var(--text-b)', opacity: activeTier !== 'all' && activeTier !== id ? 0.3 : 1, transition: 'all 0.2s' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: t.color }}></span>{t.short}
              </button>;
            })}
          </div>
          <svg viewBox={'0 0 ' + W + ' ' + H} style={{ width: '100%', display: 'block' }}>
            {[22000,24000,26000,28000,30000,32000,34000].filter(function(v) { return v >= mn && v <= mx; }).map(function(v) {
              return React.createElement('g', { key: v },
                React.createElement('line', { x1: P.l, y1: yS(v), x2: W - P.r, y2: yS(v), stroke: 'rgba(59,130,246,0.06)', strokeWidth: 1 }),
                React.createElement('text', { x: P.l - 4, y: yS(v) + 3, textAnchor: 'end', fill: 'rgba(255,255,255,0.2)', fontSize: 8, fontFamily: 'var(--font-m)' }, '$' + (v / 1000).toFixed(0) + 'k'));
            })}
            {TIER_ORDER.map(function(id) {
              var d = EQUITY_RAW[id];
              var path = d.map(function(v, i) { return (i === 0 ? 'M' : 'L') + (P.l + i * xS) + ',' + yS(v); }).join(' ');
              var show = activeTier === 'all' || activeTier === id;
              return React.createElement('path', { key: id, d: path, fill: 'none', stroke: TIER_META[id].color, strokeWidth: activeTier === id ? 2.5 : 1.5, opacity: show ? 1 : 0.08, style: { transition: 'opacity 0.3s' } });
            })}
          </svg>
        </div>
      </Rv>
      <Rv delay={100}>
        <div className="bento bento-4">
          {TIER_ORDER.map(function(id) {
            var t = TIER_META[id], k = TIER_KPIS[id];
            return <div key={id} className="card" style={{ borderLeftWidth: 3, borderLeftColor: t.color }}>
              <h3 style={{ fontSize: '0.85rem', marginBottom: 8 }}>{t.short}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {[['WR', (k.winRate * 100).toFixed(0) + '%'], ['PF', k.profitFactor], ['DD', '-$' + k.maxDrawdown.toLocaleString()], ['Net', (k.netPnl >= 0 ? '+$' : '-$') + Math.abs(k.netPnl).toLocaleString()]].map(function(p) {
                  return <div key={p[0]}><span className="label">{p[0]}</span><div className="mono" style={{ fontSize: '0.9rem', color: String(p[1]).charAt(0) === '-' ? '#ef4444' : String(p[1]).charAt(0) === '+' ? '#10b981' : 'var(--blue-400)' }}>{p[1]}</div></div>;
                })}
              </div>
            </div>;
          })}
        </div>
      </Rv>
    </div>
  );
}

/* ═══ ARCHITECTURE ═══ */
function ArchitecturePage() {
  var engState = React.useState(null);
  var engine = engState[0], setEngine = engState[1];
  var wfState = React.useState({ running: false, idx: -1 });
  var wfAnim = wfState[0], setWfAnim = wfState[1];

  function runWf() {
    setWfAnim({ running: true, idx: 0 });
    var i = 0;
    var iv = setInterval(function() { i++; if (i >= AEE_WORKFLOW_STEPS.length) { clearInterval(iv); setTimeout(function() { setWfAnim({ running: false, idx: -1 }); }, 1500); } else { setWfAnim({ running: true, idx: i }); } }, 700);
  }

  return (
    <div className="page">
      <Rv>
        <div className="hero-grad" style={{ padding: 'clamp(2rem,4vw,3rem)', marginBottom: '1.5rem' }}>
          <h1 style={{ marginBottom: 10 }}>Nine Components. <span className="grad-text">One Intelligence Layer.</span></h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-m)', maxWidth: 580, lineHeight: 1.65 }}>From AI coaching to live futures execution, multi-account sync, and 13-signal quant architecture — every component is purpose-built for ICT trading. They connect, feed each other, and compound your edge.</p>
        </div>
      </Rv>

      {/* Component Grid */}
      <Rv delay={60}>
        <div className="bento bento-3" style={{ marginBottom: '1.5rem' }}>
          {COMPONENTS.map(function(c, i) {
            return <Rv key={c.id} delay={i * 40}>
              <div className="card" style={{ height: '100%', borderLeftWidth: 3, borderLeftColor: c.color }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, boxShadow: '0 0 8px ' + c.color + '50' }}></span>
                  <h3 style={{ fontSize: '0.9rem' }}>{c.name}</h3>
                </div>
                <span className="label" style={{ color: c.color, display: 'block', marginBottom: 6 }}>{c.sub}</span>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-m)', lineHeight: 1.5, marginBottom: 8 }}>{c.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {c.features.map(function(f) { return <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.72rem' }}><span style={{ color: c.color, fontSize: '0.5rem' }}>●</span><span style={{ color: 'var(--text-b)' }}>{f}</span></div>; })}
                </div>
              </div>
            </Rv>;
          })}
        </div>
      </Rv>

      {/* Data Flow */}
      <Rv delay={100}>
        <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: 14 }}>Data Flow</h3>
          <div className="bento bento-3">
            {[{n:'01',t:'Ingest',d:'ICT content + journal → NeuroCore index'},{n:'02',t:'Retrieve & Reason',d:'NeuroCore retrieves → NSLM generates with citations'},{n:'03',t:'Research & Validate',d:'EdgeLab backtests → promotes validated models'},{n:'04',t:'Fuse & Score',d:'NeuroFusion-13 fuses 13 signals → NeuroQuant scores'},{n:'05',t:'Execute',d:'Live Trading terminal + NeuroTrader with 5 safety layers'},{n:'06',t:'Sync & Protect',d:'NeuroSync mirrors across all prop accounts with Prop Shield'}].map(function(d) {
              return <div key={d.n}><span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'rgba(59,130,246,0.12)', fontFamily: 'var(--font-h)' }}>{d.n}</span><h3 style={{ fontSize: '0.85rem', marginBottom: 3 }}>{d.t}</h3><p style={{ fontSize: '0.72rem', color: 'var(--text-m)' }}>{d.d}</p></div>;
            })}
          </div>
        </div>
      </Rv>

      {/* EdgeLab Research Studio Deep Dive */}
      <Rv delay={140}>
        <div className="hero-grad" style={{ padding: 'clamp(1.5rem,3vw,2rem)', marginBottom: '1.5rem' }}>
          <span className="badge badge-blue" style={{ marginBottom: 14 }}><span className="badge-dot" style={{ background: '#10b981' }}></span>Deep Dive</span>
          <h2 style={{ marginBottom: 10 }}><span className="grad-text">EdgeLab Research Studio</span></h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-m)', maxWidth: 520, lineHeight: 1.65 }}>
            Every win, loss, and regime shift converted into validated edge. Three engines powering one continuous improvement loop.
          </p>
        </div>
      </Rv>

      {/* Core Engines */}
      <Rv delay={180}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: 14 }}>Core Engines</h2>
        <div className="bento bento-3" style={{ marginBottom: '1.5rem' }}>
          {AEE_CORE_ENGINES.map(function(eng, i) {
            var isOpen = engine === eng.id;
            return (
              <Rv key={eng.id} delay={i * 50}>
                <div className={'card ' + (isOpen ? 'card-active' : '')} style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', borderLeftWidth: 3, borderLeftColor: eng.color }}
                  onClick={function() { setEngine(isOpen ? null : eng.id); }}>
                  <h3 style={{ fontSize: '0.9rem', marginBottom: 4 }}>{eng.name}</h3>
                  <p className="mono" style={{ fontSize: '0.72rem', color: eng.color, fontStyle: 'italic', marginBottom: 8 }}>"{eng.tagline}"</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-m)', lineHeight: 1.5, flex: 1, marginBottom: 8 }}>{eng.desc}</p>
                  <div style={{ maxHeight: isOpen ? 500 : 0, overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
                    <div style={{ height: 1, background: eng.color + '33', marginBottom: 10 }}></div>
                    {eng.capabilities.map(function(cap, ci) {
                      return <div key={ci} style={{ marginBottom: 6, paddingLeft: 10, borderLeft: '2px solid ' + eng.color + '33' }}>
                        <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-h)', marginBottom: 1 }}>{cap.name}</p>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-m)' }}>{cap.desc}</p>
                      </div>;
                    })}
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-d)', textAlign: 'center', marginTop: 4 }}>{isOpen ? '▲ Collapse' : '▼ View capabilities'}</span>
                </div>
              </Rv>
            );
          })}
        </div>
      </Rv>

      {/* E2E Workflow */}
      <Rv delay={220}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: 14 }}>End-to-End: Losing Trade → <span className="grad-text">Validated Edge</span></h2>
        <div className="card card-active" style={{ marginBottom: '1.5rem', padding: 'clamp(1rem,2.5vw,1.5rem)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 16 }}>
            {AEE_WORKFLOW_STEPS.map(function(step, i) {
              var isActive = wfAnim.idx === i, isPast = wfAnim.idx > i;
              return (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', position: 'relative', opacity: wfAnim.running && wfAnim.idx < i ? 0.2 : 1, transition: 'opacity 0.4s' }}>
                  {i < AEE_WORKFLOW_STEPS.length - 1 && <div style={{ position: 'absolute', left: 15, top: 34, width: 2, height: 'calc(100% - 12px)', background: isPast ? step.color + '44' : 'rgba(59,130,246,0.06)' }}></div>}
                  <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, border: '1.5px solid ' + (isActive ? step.color : 'rgba(59,130,246,0.08)'), background: isActive ? step.color + '18' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-m)', fontSize: '0.6rem', color: isActive ? step.color : 'var(--text-d)', zIndex: 2, boxShadow: isActive ? '0 0 14px ' + step.color + '25' : 'none', transition: 'all 0.3s' }}>{step.num}</div>
                  <div style={{ flex: 1, paddingBottom: 12 }}>
                    <p style={{ fontSize: '0.82rem', fontWeight: 600, color: isActive ? 'var(--text-h)' : 'var(--text-b)', marginBottom: 2 }}>{step.title}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-m)', lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={runWf} disabled={wfAnim.running} className="btn btn-blue btn-sm" style={{ opacity: wfAnim.running ? 0.5 : 1 }}>
              {wfAnim.running ? 'Processing...' : '▶ Run Workflow'}
            </button>
          </div>
        </div>
      </Rv>

      {/* Roadmap */}
      <Rv delay={260}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: 14 }}>Roadmap</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {AEE_ROADMAP.map(function(phase, i) {
            var isCurrent = phase.phase === 8;
            return (
              <Rv key={i} delay={i * 50}>
                <div className={'card ' + (isCurrent ? 'card-active' : '')} style={{ borderLeftWidth: 3, borderLeftColor: isCurrent ? 'var(--blue-500)' : 'rgba(59,130,246,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span className="mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: isCurrent ? 'var(--blue-400)' : 'var(--text-d)' }}>Phase {phase.phase}</span>
                    <h3 style={{ fontSize: '0.9rem' }}>{phase.title}</h3>
                    {isCurrent && <span className="badge badge-blue" style={{ fontSize: '0.55rem' }}>Current</span>}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {phase.items.map(function(item) {
                      return <span key={item} style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: 5, background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.08)', color: 'var(--text-m)' }}>{item}</span>;
                    })}
                  </div>
                </div>
              </Rv>
            );
          })}
        </div>
      </Rv>
    </div>
  );
}

/* ═══ COMPARE ═══ */
function ComparePage() {
  return (
    <div className="page">
      <Rv>
        <div className="hero-grad" style={{ padding: 'clamp(2rem,4vw,3rem)', marginBottom: '1.5rem' }}>
          <h1 style={{ marginBottom: 10 }}>Stop Duct-Taping Your <span className="grad-text">Workflow</span></h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-m)', maxWidth: 520, lineHeight: 1.65 }}>Most ICT traders juggle 5–8 disconnected tools. NeuroSpect replaces the patchwork.</p>
        </div>
      </Rv>
      <Rv delay={60}>
        <div className="bento bento-2" style={{ marginBottom: '1.5rem' }}>
          <div className="card" style={{ borderLeftWidth: 3, borderLeftColor: '#ef4444' }}>
            <h3 style={{ fontSize: '0.9rem', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ color: '#ef4444' }}>✗</span> Before NeuroSpect</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {BEFORE_TOOLS.map(function(t) {
                return <div key={t.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', borderRadius: 6, background: 'rgba(239,68,68,0.03)', border: '1px solid rgba(239,68,68,0.06)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-b)' }}>{t.name}</span>
                  <span className="mono" style={{ fontSize: '0.72rem', color: '#ef4444' }}>{t.cost}</span>
                </div>;
              })}
            </div>
            <div style={{ marginTop: 8, padding: '8px', borderRadius: 6, background: 'rgba(239,68,68,0.06)', textAlign: 'center' }}>
              <span className="mono" style={{ fontSize: '1rem', fontWeight: 700, color: '#ef4444' }}>$125–$710/mo</span>
            </div>
          </div>
          <div className="card card-active" style={{ borderLeftWidth: 3, borderLeftColor: 'var(--blue-500)' }}>
            <h3 style={{ fontSize: '0.9rem', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ color: '#10b981' }}>✓</span> With NeuroSpect</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-m)', marginBottom: 12 }}>One platform. Every tool. Shared context across coaching, journal, backtesting, and research.</p>
            {['AI coaching with citations','100+ field trade journal','Event-driven backtesting','Risk limit engine','Strategy research (EdgeLab)','Automated trading agent'].map(function(f) {
              return <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontSize: '0.78rem' }}><span style={{ color: '#10b981' }}>✓</span><span style={{ color: 'var(--text-b)' }}>{f}</span></div>;
            })}
            <div style={{ marginTop: 10, padding: '8px', borderRadius: 6, background: 'rgba(59,130,246,0.06)', textAlign: 'center' }}>
              <span className="mono" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--blue-400)' }}>$29–$349/mo</span>
            </div>
          </div>
        </div>
      </Rv>
    </div>
  );
}

/* ═══ PRICING ═══ */
function PricingPage() {
  return (
    <div className="page">
      <Rv>
        <div className="hero-grad" style={{ padding: 'clamp(2rem,4vw,3rem)', marginBottom: '1.5rem' }}>
          <h1 style={{ marginBottom: 10 }}>Grow Into Your <span className="grad-text">Edge</span></h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-m)', maxWidth: 520, lineHeight: 1.65 }}>Start free. Upgrade as your trading evolves.</p>
        </div>
      </Rv>
      <Rv delay={60}>
        <div className="bento bento-3">
          {PRICING_TIERS.map(function(t, i) {
            return (
              <Rv key={t.name} delay={i * 40}>
                <div className={'card ' + (t.highlight ? 'card-active' : '')} style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  {t.highlight && <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)' }}><span className="badge badge-blue" style={{ fontSize: '0.55rem', background: 'var(--blue-500)', color: '#fff', border: 'none', fontWeight: 700 }}>Most Popular</span></div>}
                  <h3 style={{ fontSize: '1rem', marginBottom: 2 }}>{t.name}</h3>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-d)', marginBottom: 12 }}>{t.target}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 14 }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-h)', fontFamily: 'var(--font-h)' }}>${t.price}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-d)' }}>{t.period}</span>
                  </div>
                  <button className={'btn btn-sm ' + (t.highlight ? 'btn-blue' : 'btn-ghost')} style={{ width: '100%', marginBottom: 14 }}>
                    {t.price === '0' ? 'Get Started' : 'Join Waitlist'}
                  </button>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    {t.features.map(function(f) {
                      return <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: '0.75rem' }}>
                        <span style={{ color: t.highlight ? 'var(--blue-400)' : 'var(--text-d)', flexShrink: 0, marginTop: 1 }}>✓</span>
                        <span style={{ color: 'var(--text-m)' }}>{f}</span>
                      </div>;
                    })}
                  </div>
                </div>
              </Rv>
            );
          })}
        </div>
      </Rv>
      <Rv delay={200}>
        <div className="card card-gold" style={{ textAlign: 'center', padding: '1.5rem', marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-d)' }}>NeuroSpect is an educational tool. Not financial advice. Past performance does not guarantee future results. Trading involves risk of loss.</p>
        </div>
      </Rv>
    </div>
  );
}

window.FeaturesPage = FeaturesPage;
window.PerformancePage = PerformancePage;
window.ArchitecturePage = ArchitecturePage;
window.ComparePage = ComparePage;
window.PricingPage = PricingPage;
