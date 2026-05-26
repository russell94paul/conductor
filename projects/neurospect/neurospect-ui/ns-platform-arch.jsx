/* Platform Components + Architecture Sections */
const { useState, useEffect, useRef } = React;

/* ── Component Card ── */
function ComponentCard({ comp, delay = 0 }) {
  return (
    <Reveal delay={delay} className={`neon-card ${comp.neon}`} style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: comp.color, boxShadow: `0 0 10px ${comp.color}60`, display: 'inline-block' }}></span>
        <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#fff' }}>{comp.name}</h3>
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{comp.sub}</span>
      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0.625rem 0' }}>{comp.desc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {comp.features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem' }}>
            <span style={{ color: comp.color, fontSize: '0.5rem' }}>●</span>
            <span style={{ color: 'var(--text-secondary)' }}>{f}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ── Platform Section ── */
function PlatformSection() {
  return (
    <section id="platform" className="section">
      <div className="container" style={{ position: 'relative' }}>
        <Reveal className="section-header">
          <p className="section-label">Platform</p>
          <h2>Nine Components. One Intelligence Layer.</h2>
          <p className="section-sub">Every component is purpose-built for ICT trading. From AI coaching to live execution, multi-account sync, and 13-signal quant architecture — they connect, feed each other, and compound your edge over time.</p>
        </Reveal>
        <div className="grid-6" style={{ gap: '0.875rem' }}>
          {COMPONENTS.map((c, i) => (
            <ComponentCard key={c.id} comp={c} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Architecture Diagram ── */
function ArchitectureDiagram() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [flowActive, setFlowActive] = useState(false);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Node positions
  const nodes = {
    mentor: { x: 330, y: 60, color: '#06b6d4', name: 'NeuroSpect Mentor', sub: 'AI Coaching Product' },
    neurocore: { x: 150, y: 210, color: '#8b5cf6', name: 'NeuroCore', sub: 'Knowledge Layer' },
    nslm: { x: 510, y: 210, color: '#f59e0b', name: 'NSLM', sub: 'Language Model' },
    edgelab: { x: 150, y: 370, color: '#10b981', name: 'EdgeLab', sub: 'Research Engine' },
    neuroquant: { x: 510, y: 370, color: '#ec4899', name: 'NeuroQuant', sub: 'Production Models' },
    agent: { x: 330, y: 510, color: '#ef4444', name: 'NeuroTrader', sub: 'Trading Agent' },
  };

  // Connections with paths
  const connections = [
    { from: 'neurocore', to: 'mentor', label: 'retrieval', color: '#8b5cf6', path: 'M 210 195 C 210 140, 290 100, 290 90' },
    { from: 'nslm', to: 'mentor', label: 'generation', color: '#f59e0b', path: 'M 450 195 C 450 140, 370 100, 370 90' },
    { from: 'neurocore', to: 'edgelab', label: 'data', color: '#10b981', path: 'M 180 240 L 180 345' },
    { from: 'edgelab', to: 'nslm', label: 'evaluation', color: '#10b981', path: 'M 240 370 C 330 310, 420 310, 460 240' },
    { from: 'edgelab', to: 'neuroquant', label: 'promotion', color: '#ec4899', path: 'M 240 385 L 420 385' },
    { from: 'neuroquant', to: 'agent', label: 'scoring', color: '#ef4444', path: 'M 480 400 C 480 450, 370 470, 370 490' },
  ];

  const isRelated = (nodeId) => {
    if (!hoveredNode) return true;
    if (nodeId === hoveredNode) return true;
    return connections.some(c => (c.from === hoveredNode && c.to === nodeId) || (c.to === hoveredNode && c.from === nodeId));
  };

  const isConnectionActive = (conn) => {
    if (!hoveredNode) return true;
    return conn.from === hoveredNode || conn.to === hoveredNode;
  };

  // Layer labels
  const layers = [
    { y: 22, label: 'CONSUMER' },
    { y: 165, label: 'INTELLIGENCE' },
    { y: 325, label: 'RESEARCH' },
    { y: 465, label: 'AUTOMATION' },
  ];

  return (
    <div ref={ref}>
      <svg viewBox="0 0 660 570" style={{ width: '100%', maxWidth: 600, margin: '0 auto', display: 'block' }}>
        <defs>
          {Object.values(nodes).map(n => (
            <filter key={n.color} id={`glow-${n.color.replace('#', '')}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feFlood floodColor={n.color} floodOpacity="0.25" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          ))}
          <pattern id="archGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          </pattern>
        </defs>

        <rect width="660" height="570" fill="url(#archGrid)" />

        {/* Layer dividers */}
        {[140, 295, 440].map(ly => (
          <line key={ly} x1="40" x2="620" y1={ly} y2={ly} stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4 8" />
        ))}
        {/* Layer labels */}
        {layers.map(l => (
          <text key={l.label} x="625" y={l.y} fill="rgba(255,255,255,0.07)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="end">{l.label}</text>
        ))}

        {/* Connections */}
        {connections.map((c, i) => {
          const active = isConnectionActive(c);
          const animated = flowActive || active;
          return (
            <g key={i} style={{ opacity: visible ? (hoveredNode ? (active ? 1 : 0.1) : 1) : 0, transition: 'opacity 0.4s' }}>
              <path d={c.path} fill="none" stroke={c.color} strokeWidth="2" strokeOpacity="0.12" />
              <path d={c.path} fill="none" stroke={c.color} strokeWidth="2" strokeDasharray="6 6" strokeOpacity={animated ? 0.5 : 0.2}>
                <animate attributeName="stroke-dashoffset" values="0;-24" dur="2s" repeatCount="indefinite" />
              </path>
              {animated && (
                <circle r="3" fill={c.color} opacity="0.85">
                  <animateMotion dur={`${2 + i * 0.3}s`} repeatCount="indefinite" path={c.path} />
                </circle>
              )}
            </g>
          );
        })}
        {/* Connection labels */}
        {connections.map((c, i) => {
          const lps = { retrieval: [245, 140], generation: [415, 140], data: [192, 290], evaluation: [360, 305], promotion: [330, 375], scoring: [440, 450] };
          const pos = lps[c.label] || [330, 300];
          return (
            <text key={c.label} x={pos[0]} y={pos[1]} fill={c.color} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle"
              style={{ opacity: visible ? (hoveredNode && !isConnectionActive(c) ? 0.1 : 0.5) : 0, transition: 'opacity 0.4s' }}>
              {c.label}
            </text>
          );
        })}

        {/* Nodes */}
        {Object.entries(nodes).map(([id, n]) => {
          const related = isRelated(id);
          const hovered = hoveredNode === id;
          return (
            <g key={id}
              style={{ opacity: visible ? (hoveredNode ? (related ? 1 : 0.15) : 1) : 0, transition: 'opacity 0.4s, transform 0.3s', cursor: 'pointer' }}
              onMouseEnter={() => setHoveredNode(id)} onMouseLeave={() => setHoveredNode(null)}>
              <rect x={n.x - 80} y={n.y - 28} width="160" height="55" rx="14"
                fill="rgba(20,20,28,0.92)" stroke={n.color} strokeWidth={hovered ? 2 : 1.5}
                filter={hovered ? `url(#glow-${n.color.replace('#', '')})` : undefined} />
              <circle cx={n.x - 60} cy={n.y} r="4.5" fill={n.color} opacity="0.85">
                {hovered && <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite" />}
              </circle>
              <text x={n.x + 5} y={n.y - 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="var(--font-sans)">{n.name}</text>
              <text x={n.x + 5} y={n.y + 11} textAnchor="middle" fill={n.color} fontSize="8" fontFamily="var(--font-mono)" opacity="0.8">{n.sub}</text>
            </g>
          );
        })}
      </svg>

      {/* Activate Flow button */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button className={flowActive ? 'btn-primary btn-sm' : 'btn-secondary btn-sm'}
          onClick={() => setFlowActive(f => !f)}>
          {flowActive ? '⟳ Flow Active' : '▶ Activate Flow'}
        </button>
      </div>
    </div>
  );
}

/* ── Architecture Section ── */
function ArchitectureSection() {
  return (
    <section id="architecture" className="section">
      <div className="bg-glow" style={{ top: '30%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, background: 'rgba(6,182,212,0.03)' }}></div>
      <div className="container" style={{ position: 'relative' }}>
        <Reveal className="section-header">
          <p className="section-label">Architecture</p>
          <h2>How the Components Connect</h2>
          <p className="section-sub">Hover over any component to see its connections. Each data flow strengthens the platform's intelligence layer.</p>
        </Reveal>
        <Reveal>
          <ArchitectureDiagram />
        </Reveal>
        {/* Data flow steps */}
        <Reveal delay={100}>
          <div className="neon-card" style={{ padding: '1.5rem', marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem' }}>How Data Flows Through NeuroSpect</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="grid-3">
              {[
                { n: '01', t: 'Ingest', d: 'ICT mentorship content, transcripts, and your trade journal flow into NeuroCore\'s hybrid index.' },
                { n: '02', t: 'Retrieve & Reason', d: 'NeuroCore retrieves context. NSLM generates ICT-aware responses with source citations.' },
                { n: '03', t: 'Research & Validate', d: 'EdgeLab Research Studio backtests strategies, evaluates NSLM versions, and runs Monte Carlo simulations.' },
                { n: '04', t: 'Fuse & Score', d: 'NeuroFusion-13 fuses 13 reasoning signals. NeuroQuant promotes validated models to production scoring.' },
                { n: '05', t: 'Execute', d: 'Live Trading terminal executes on CME futures with ICT event overlay. NeuroTrader Agent provides automated execution with 5 safety layers.' },
                { n: '06', t: 'Sync & Protect', d: 'NeuroSync mirrors trades across all prop firm accounts with per-account Prop Shield enforcement and intelligent position sizing.' },
              ].map(s => (
                <div key={s.n}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 700, color: 'rgba(6,182,212,0.15)', marginBottom: '0.5rem' }}>{s.n}</div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff', marginBottom: '0.375rem' }}>{s.t}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { PlatformSection, ArchitectureSection });
