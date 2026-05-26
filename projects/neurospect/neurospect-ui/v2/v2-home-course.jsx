/* NeuroSpect v2 — Home + Course Pages */

/* ═══ SIHRE USE-CASE SCENARIOS ═══ */
function SihreScenarios() {
  var st = React.useState(null);
  var open = st[0], setOpen = st[1];

  var scenarios = [
    { id: 'nfp',
      title: 'High-Impact News (NFP Friday)',
      icon: '\u{1F4F0}',
      situation: 'Non-Farm Payrolls drops in 10 minutes. Volatility is about to spike. Most systems either freeze or get whipsawed by the noise.',
      sihre: 'Multiple specialist signals activate simultaneously: one reads historical NFP reactions for this instrument, another detects the current regime shift in real time, another stress-tests whether the pre-news setup survives adverse scenarios. The orchestrator dynamically re-weights — suppressing signals that perform poorly in news volatility, amplifying those calibrated for it. If consensus is low, the system abstains entirely rather than gambling.',
      edge: 'Adapts in real time to the specific type of volatility — doesn\'t treat all news events the same.'
    },
    { id: 'regime',
      title: 'Silent Regime Change',
      icon: '\u{1F30A}',
      situation: 'The market gradually shifts from trending to range-bound over two weeks. No single day looks different. Your trend-following strategy starts bleeding slowly.',
      sihre: 'Dedicated regime-detection intelligence continuously monitors market microstructure, volatility patterns, and behavioral shifts — detecting the transition before performance degrades. As confidence in the new regime grows, the orchestrator smoothly rotates trust toward specialists calibrated for mean-reversion conditions. The transition is gradual, governed, and logged.',
      edge: 'Catches regime transitions that are invisible on any single day but obvious in aggregate — and adapts before the drawdown compounds.'
    },
    { id: 'drawdown',
      title: 'Drawdown Spiral Prevention',
      icon: '\u{1F6E1}',
      situation: 'Three losses in a row. A traditional system keeps trading. A human trader tilts. Both make it worse.',
      sihre: 'Behavioral and risk-governance layers detect the compounding drawdown. Uncertainty quantification widens — the system demands higher conviction before the next entry. Adversarial intelligence actively searches for reasons NOT to trade, raising the bar. If drawdown hits governance thresholds, the system enforces a cooldown period — not because a human set a rule, but because the ensemble\'s own confidence has degraded below its execution threshold.',
      edge: 'Self-imposed discipline that tightens dynamically — the worse the streak, the higher the bar for the next trade.'
    },
    { id: 'discovery',
      title: 'Edge Discovery From Failure',
      icon: '\u{1F50D}',
      situation: 'You\'ve been losing on London session entries for three weeks. You don\'t know why.',
      sihre: 'Memory and forensics layers mine the loss pattern: same session, same instrument, same setup type. Causal intelligence proposes hypotheses — maybe the failure correlates with a specific volatility regime during Asia-to-London handoff. Backtesting intelligence validates the hypothesis against historical data. If confirmed, the orchestrator learns a new routing rule: suppress that setup type under those specific conditions. The failure becomes a permanent improvement.',
      edge: 'Turns repeated losses into testable hypotheses and permanent system upgrades — no manual analysis required.'
    },
    { id: 'compound',
      title: 'The 1,000-Trade Advantage',
      icon: '\u{1F4C8}',
      situation: 'Two traders start on the same day with the same capital. One uses a static model. One uses SIHRE.',
      sihre: 'After 1,000 trades, SIHRE has accumulated a memory of every outcome, every regime encountered, every failure mode discovered, every causal relationship validated. Its routing intelligence has learned nuanced instrument-specific, session-specific, regime-specific trust weightings. Its adversarial layer has catalogued hundreds of "traps" to avoid. Its uncertainty calibration has been refined across diverse market conditions. The static model is exactly where it started.',
      edge: 'The gap between SIHRE and any fixed system widens with every trade — compounding intelligence is the moat.'
    },
  ];

  return (
    <div style={{ marginBottom: 20 }}>
      <h3 style={{ fontSize: '0.95rem', marginBottom: 12, color: 'var(--gold-300)' }}>See It In Action</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {scenarios.map(function(s) {
          var isOpen = open === s.id;
          return (
            <div key={s.id} className={'card ' + (isOpen ? 'card-active' : '')}
              style={{ cursor: 'pointer', borderLeftWidth: 3, borderLeftColor: isOpen ? 'var(--gold-400)' : 'rgba(251,191,36,0.15)', padding: '0.8rem 1rem', background: isOpen ? 'rgba(251,191,36,0.04)' : 'var(--surface)' }}
              onClick={function() { setOpen(isOpen ? null : s.id); }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '1rem' }}>{s.icon}</span>
                  <strong style={{ fontSize: '0.85rem', color: isOpen ? 'var(--gold-300)' : 'var(--text-h)' }}>{s.title}</strong>
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-d)', transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', fontFamily: 'var(--font-m)' }}>&#9660;</span>
              </div>
              <div style={{ maxHeight: isOpen ? 600 : 0, overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
                <div style={{ paddingTop: 14 }}>
                  <div style={{ marginBottom: 10 }}>
                    <span className="label" style={{ color: 'var(--text-d)', marginBottom: 4, display: 'block' }}>The Situation</span>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-m)', lineHeight: 1.6 }}>{s.situation}</p>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <span className="label" style={{ color: 'var(--gold-400)', marginBottom: 4, display: 'block' }}>How SIHRE Responds</span>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-b)', lineHeight: 1.6 }}>{s.sihre}</p>
                  </div>
                  <div style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(251,191,36,0.06)', borderLeft: '2px solid rgba(251,191,36,0.3)' }}>
                    <span className="label" style={{ color: 'var(--gold-400)', marginBottom: 2, display: 'block' }}>The Edge</span>
                    <p style={{ fontSize: '0.78rem', color: 'var(--gold-300)', lineHeight: 1.5, fontStyle: 'italic' }}>{s.edge}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══ HOME ═══ */
function HomePage() {
  return (
    <div className="page">
      {/* Hero */}
      <Rv>
        <div className="hero-grad" style={{ padding: 'clamp(2rem,4vw,3.5rem)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span className="badge badge-blue"><span className="badge-dot"></span>Early Access</span>
          </div>
          <h1 style={{ marginBottom: 12, maxWidth: 600 }}>
            The Intelligence Layer for <span className="grad-text">ICT Traders</span>
          </h1>
          <p style={{ fontSize: '1rem', fontFamily: "'Orbitron',sans-serif", fontWeight: 500, color: 'var(--text-b)', maxWidth: 520, lineHeight: 1.7, marginBottom: 8, letterSpacing: '0.01em' }}>
            Discretionary execution. Quantitative validation. Hybrid intelligence.
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-m)', maxWidth: 520, lineHeight: 1.65, marginBottom: 24 }}>
            AI-native models, event-driven backtesting, and a knowledge engine no platform has assembled before — for discretionary, quant, and hybrid traders.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="#pricing" className="btn btn-blue">Join the Waitlist</a>
            <a href="#backtesting" className="btn btn-ghost">Explore EdgeLab</a>
          </div>
        </div>
      </Rv>

      {/* Stats */}
      <Rv delay={80}>
        <div className="bento bento-4" style={{ marginBottom: '1.5rem' }}>
          <StatCard label="ICT Content" value="36K+" sub="lines indexed" />
          <StatCard label="Entry Models" value="7" sub="machine-readable" color="var(--gold-400)" />
          <StatCard label="Course Modules" value="5" sub="17 lessons" />
          <StatCard label="Journal Fields" value="100+" sub="ICT-specific" color="var(--gold-400)" />
        </div>
      </Rv>

      {/* Platform components — bento grid */}
      <Rv delay={120}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 14 }}>Platform Components</h2>
          <div className="bento bento-3">
            {COMPONENTS.map(function(c, i) {
              return (
                <Rv key={c.id} delay={i * 50}>
                  <div className="card" style={{ height: '100%', borderLeftWidth: 3, borderLeftColor: c.color }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, boxShadow: '0 0 8px ' + c.color + '50' }}></span>
                      <h3 style={{ fontSize: '0.9rem' }}>{c.name}</h3>
                    </div>
                    <span className="label" style={{ color: c.color, marginBottom: 6, display: 'block' }}>{c.sub}</span>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-m)', lineHeight: 1.55, marginBottom: 10 }}>{c.desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {c.features.map(function(f) {
                        return <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem' }}>
                          <span style={{ color: c.color, fontSize: '0.5rem' }}>●</span>
                          <span style={{ color: 'var(--text-b)' }}>{f}</span>
                        </div>;
                      })}
                    </div>
                  </div>
                </Rv>
              );
            })}
          </div>
        </div>
      </Rv>

      {/* NeuroFusion (SIHRE) */}
      <Rv delay={140}>
        <div className="card card-sihre sihre-glow" style={{ marginBottom: '1.5rem', padding: 'clamp(1.5rem,3vw,2.5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div className="sihre-ring">
              <span style={{ fontFamily: 'var(--font-h)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--gold-400)' }}>N</span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.3rem', margin: 0 }}>
                  <span className="grad-text-gold">NeuroFusion</span>
                </h2>
                <span className="badge badge-gold"><span className="badge-dot"></span>Patent Pending</span>
              </div>
              <p style={{ fontFamily: 'var(--font-m)', fontSize: '0.7rem', letterSpacing: '0.06em', color: 'var(--gold-400)' }}>
                SELF-IMPROVING HETEROGENEOUS REASONING ENSEMBLE (SIHRE)
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 8, maxWidth: 640 }}>
            A first-of-its-kind AI architecture that fuses <strong style={{ color: 'var(--gold-300)' }}>fundamentally different types of intelligence</strong> into a single reasoning system — not a bigger model, but a new <em>kind</em> of model. Whitepaper available. Patent pending.
          </p>

          {/* Creator bio */}
          <div className="card" style={{ background: 'rgba(251,191,36,0.03)', borderColor: 'rgba(251,191,36,0.12)', marginBottom: 20, padding: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-500), var(--gold-600))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 16px rgba(251,191,36,0.2)' }}>
                <span style={{ fontFamily: 'var(--font-h)', fontWeight: 800, fontSize: '1rem', color: '#000' }}>PR</span>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--text-h)' }}>Paul Russell</strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)', fontFamily: 'var(--font-m)' }}>chartShooter</span>
                  <span className="badge badge-gold" style={{ fontSize: '0.55rem', padding: '2px 6px' }}>Creator</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-m)', lineHeight: 1.65, marginBottom: 8 }}>
                  Data/AI engineer turned funded futures trader. Built NeuroSpect because I kept losing the same trades and got annoyed enough to build something about it. Every feature exists because I needed it first.
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                  <a href="#story" className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem', padding: '4px 12px' }}>Read My Story</a>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['Data/AI Engineering', 'Funded Trader', 'SIHRE Creator'].map(function(tag) {
                    return <span key={tag} style={{ fontSize: '0.62rem', padding: '2px 8px', borderRadius: 100, background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.12)', color: 'var(--gold-400)', fontFamily: 'var(--font-m)', letterSpacing: '0.02em' }}>{tag}</span>;
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Soccer analogy */}
          <div className="card" style={{ background: 'rgba(251,191,36,0.03)', borderColor: 'rgba(251,191,36,0.12)', marginBottom: 20, padding: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: '1rem' }}>&#9917;</span>
              <span className="label" style={{ color: 'var(--gold-400)' }}>How SIHRE works — a soccer analogy</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 12 }}>
              Most AI systems are like a soccer team where <strong style={{ color: 'var(--text-h)' }}>every player is a striker</strong>. You've got eleven athletes who all think the same way, all trained on the same drills, all attacking the same space. When conditions suit them, they dominate. When conditions shift — a red card, a change in formation, a wet pitch — they all fail the same way at once.
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 12 }}>
              SIHRE fields a <strong style={{ color: 'var(--gold-300)' }}>complete squad</strong>. A goalkeeper who reads angles. A center-back who anticipates danger. A midfielder who controls tempo. A winger who exploits space. A striker who finishes. An analyst in the booth studying the opponent in real time. A physio monitoring fatigue. A set-piece specialist. Each thinks <em>differently</em>, sees the game from a different position, and fails in different ways.
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 12 }}>
              And above them all sits a <strong style={{ color: 'var(--gold-300)' }}>manager</strong> who doesn't just pick the starting eleven — they learn match by match: <em>"Against a low block, trust the creative midfielder. In a counter-attack, trust the winger's pace. In injury time with a lead, trust the defensive structure."</em>
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7 }}>
              The whole club <strong style={{ color: 'var(--gold-300)' }}>compounds across seasons</strong>. Every match is filmed, analyzed, learned from. Players improve individually. The manager's tactical knowledge deepens. New specialists are scouted and integrated. Bad fits are moved on. After a hundred matches, the intelligence gap between this club and a team of eleven strikers is <em>insurmountable</em>.
            </p>
          </div>

          {/* Use-case scenarios dropdown */}
          <SihreScenarios />

          {/* How it's different */}
          <h3 style={{ fontSize: '0.95rem', marginBottom: 12, color: 'var(--gold-300)' }}>Why This Changes Everything</h3>
          <div className="bento bento-2" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { t: 'Heterogeneous reasoning', d: 'Multiple fundamentally different types of intelligence — each sees the market from a unique vantage point, trained differently, failing differently. Not a bigger model. A new kind of model.' },
                { t: 'Self-improving under governance', d: 'The system compounds intelligence over time through continuous feedback loops — but within strict safety boundaries. Every improvement is auditable and reversible.' },
                { t: 'Intelligent orchestration', d: 'A meta-reasoning layer learns which specialists to trust under which market conditions — and when to sit out entirely. This routing intelligence is the core innovation.' },
              ].map(function(item) {
                return (
                  <div key={item.t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: 'var(--gold-400)', fontSize: '0.85rem', marginTop: 2, flexShrink: 0 }}>&#9670;</span>
                    <div>
                      <strong style={{ fontSize: '0.82rem', color: 'var(--text-h)', display: 'block', marginBottom: 2 }}>{item.t}</strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-m)', lineHeight: 1.55 }}>{item.d}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { t: 'Knows when to abstain', d: 'Unlike black-box models that always produce a score, SIHRE has built-in governors that prevent execution when edge is fragile, uncertain, or outside the system\'s competence.' },
                { t: 'Compounding memory', d: 'Every outcome, every discovery, every failure is stored with full provenance. Future decisions draw on the entire history. The system becomes exponentially harder to replicate over time.' },
                { t: 'Domain-native architecture', d: 'Purpose-built for financial markets — not a general-purpose LLM fine-tuned on trading data. Every layer is designed for the latency, regime shifts, and adversarial dynamics of live markets.' },
              ].map(function(item) {
                return (
                  <div key={item.t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: 'var(--gold-400)', fontSize: '0.85rem', marginTop: 2, flexShrink: 0 }}>&#9670;</span>
                    <div>
                      <strong style={{ fontSize: '0.82rem', color: 'var(--text-h)', display: 'block', marginBottom: 2 }}>{item.t}</strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-m)', lineHeight: 1.55 }}>{item.d}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <a href="#neurofusion" className="btn btn-gold btn-sm">Learn More &amp; Try the Simulator</a>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-d)', fontFamily: 'var(--font-m)' }}>
              A proprietary multi-signal reasoning architecture. No existing system has assembled this.
            </span>
          </div>
        </div>
      </Rv>

      {/* Tier comparison */}
      <Rv delay={200}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 14 }}>Trader Workflows</h2>
          <div className="bento bento-4">
            {TIER_ORDER.map(function(id) {
              var t = TIER_META[id], k = TIER_KPIS[id];
              return (
                <div key={id} className="card" style={{ borderLeftWidth: 3, borderLeftColor: t.color }}>
                  <h3 style={{ fontSize: '0.88rem', marginBottom: 4 }}>{t.name}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
                    <div><span className="label">Win Rate</span><div className="mono" style={{ fontSize: '1rem', color: t.color }}>{(k.winRate * 100).toFixed(0)}%</div></div>
                    <div><span className="label">Net P&L</span><div className="mono" style={{ fontSize: '1rem', color: k.netPnl >= 0 ? '#10b981' : '#ef4444' }}>{k.netPnl >= 0 ? '+' : ''}${k.netPnl.toLocaleString()}</div></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Rv>

      {/* CTA */}
      <Rv delay={200}>
        <div className="card card-gold" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: 8 }}>Ready to build your edge?</h2>
          <p style={{ color: 'var(--text-m)', marginBottom: 16, fontSize: '0.88rem' }}>Early access. Limited spots. No credit card required.</p>
          <a href="#pricing" className="btn btn-gold">Join Waitlist</a>
        </div>
      </Rv>
    </div>
  );
}

/* ═══ COURSE ═══ */
function CoursePage() {
  var expState = React.useState(null);
  var expanded = expState[0], setExpanded = expState[1];
  var lessonState = React.useState(null);
  var openLesson = lessonState[0], setOpenLesson = lessonState[1];

  var totalLessons = COURSE_MODULES.reduce(function(s, m) { return s + m.lessons.length; }, 0);

  return (
    <div className="page">
      {/* Hero */}
      <Rv>
        <div className="hero-grad" style={{ padding: 'clamp(2rem,4vw,3rem)', marginBottom: '1.5rem' }}>
          <span className="badge badge-blue" style={{ marginBottom: 14 }}><span className="badge-dot"></span>Free Interactive Course</span>
          <h1 style={{ marginBottom: 10 }}>Master ICT. <span className="grad-text">Prove It on the Chart.</span></h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-m)', maxWidth: 500, lineHeight: 1.65, marginBottom: 20 }}>
            {COURSE_MODULES.length} modules, {totalLessons} lessons, chart-based assessments, and a personalized learning path — built from real ICT mentorship content.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-blue btn-sm" onClick={function() { setExpanded(1); }}>Start Learning</button>
            <span className="badge badge-gold">Educational only — not trading advice</span>
          </div>
        </div>
      </Rv>

      {/* Minimum Confluence */}
      <Rv delay={60}>
        <div className="card card-gold" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', marginBottom: 10 }}>Universal Minimum Confluence</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-m)', marginBottom: 10 }}>Every strategy requires all five. If any are missing, do not take the trade.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {UNIVERSAL_CONFLUENCE.map(function(c, i) {
              return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--gold-400)' }}>✓</span>
                <span style={{ color: 'var(--text-b)' }}>{c}</span>
              </div>;
            })}
          </div>
        </div>
      </Rv>

      {/* Curriculum */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: 14 }}>Curriculum</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {COURSE_MODULES.map(function(m, idx) {
            var isOpen = expanded === m.num;
            return (
              <Rv key={m.num} delay={idx * 40}>
                <div className={'card ' + (isOpen ? 'card-active' : '')} style={{ cursor: 'pointer', borderLeftWidth: 3, borderLeftColor: m.color }}
                  onClick={function() { setExpanded(isOpen ? null : m.num); setOpenLesson(null); }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span className="label" style={{ color: m.color }}>{'Module ' + m.num}</span>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-d)', fontFamily: 'var(--font-m)' }}>{m.source}</span>
                      </div>
                      <h3 style={{ fontSize: '1rem', marginBottom: 4 }}>{m.title}</h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-m)', lineHeight: 1.5 }}>{m.desc}</p>
                    </div>
                    <div style={{ background: m.color + '15', border: '1px solid ' + m.color + '33', borderRadius: 8, padding: '5px 10px', flexShrink: 0 }}>
                      <span className="mono" style={{ fontSize: '0.9rem', color: m.color }}>{m.lessons.length}</span>
                      <span style={{ fontSize: '0.6rem', color: 'var(--text-d)', marginLeft: 3 }}>lessons</span>
                    </div>
                  </div>

                  {/* Expanded lessons */}
                  <div style={{ maxHeight: isOpen ? 3000 : 0, overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
                    <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, ' + m.color + '33, transparent)', margin: '12px 0' }}></div>
                    {m.lessons.map(function(l, j) {
                      var lKey = m.num + '-' + l.num;
                      var lOpen = openLesson === lKey;
                      return (
                        <div key={j}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', cursor: 'pointer' }}
                            onClick={function(e) { e.stopPropagation(); setOpenLesson(lOpen ? null : lKey); }}>
                            <span style={{ width: 24, height: 24, borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              background: lOpen ? m.color + '20' : 'rgba(59,130,246,0.04)', border: '1px solid ' + (lOpen ? m.color + '44' : 'rgba(59,130,246,0.08)'),
                              fontFamily: 'var(--font-m)', fontSize: '0.6rem', color: lOpen ? m.color : 'var(--text-d)' }}>{l.num}</span>
                            <div style={{ flex: 1 }}>
                              <span style={{ fontSize: '0.85rem', color: 'var(--text-h)', fontWeight: 500 }}>{l.title}</span>
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-d)', marginLeft: 8 }}>{l.subtitle}</span>
                            </div>
                          </div>
                          <div style={{ maxHeight: lOpen ? 600 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
                            <div style={{ padding: '6px 0 12px 34px' }}>
                              <span className="label" style={{ color: m.color, marginBottom: 6, display: 'block' }}>Key Concepts</span>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 10 }}>
                                {l.concepts.map(function(c, ci) {
                                  return <div key={ci} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: '0.78rem', color: 'var(--text-b)' }}>
                                    <span style={{ color: m.color, fontSize: '0.5rem', marginTop: 4, flexShrink: 0 }}>●</span>{c}
                                  </div>;
                                })}
                              </div>
                              {l.rules && l.rules.length > 0 && (
                                <div>
                                  <span className="label" style={{ color: 'var(--gold-400)', marginBottom: 5, display: 'block' }}>Rules</span>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 8 }}>
                                    {l.rules.map(function(r, ri) {
                                      return <div key={ri} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: '0.75rem', color: 'var(--text-m)' }}>
                                        <span style={{ color: 'var(--gold-400)', fontSize: '0.6rem', marginTop: 3 }}>{ri + 1}.</span>{r}
                                      </div>;
                                    })}
                                  </div>
                                </div>
                              )}
                              {l.keyQuote && (
                                <div style={{ padding: '8px 12px', borderRadius: 6, background: 'rgba(59,130,246,0.04)', borderLeft: '2px solid ' + m.color + '55', fontSize: '0.75rem', color: 'var(--text-m)', fontStyle: 'italic' }}>
                                  {l.keyQuote}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Rv>
            );
          })}

          {/* Entry Models Capstone */}
          <Rv delay={300}>
            <div className="card card-gold" style={{ borderLeftWidth: 3, borderLeftColor: 'var(--gold-500)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span className="label" style={{ color: 'var(--gold-400)' }}>Capstone — Unlocks after all 5 modules</span>
              </div>
              <h3 style={{ fontSize: '1rem', marginBottom: 6 }}>Entry Models Library</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-m)', marginBottom: 12 }}>{ENTRY_MODELS.length} strategies with machine-readable checklists and YAML blocks for AI validation.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {ENTRY_MODELS.map(function(em) {
                  return <div key={em.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 10px', borderRadius: 6, background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: em.color }}></span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-b)' }}>{em.name}</span>
                    </div>
                    <span className="mono" style={{ fontSize: '0.62rem', color: 'var(--text-d)' }}>{em.trigger}</span>
                  </div>;
                })}
              </div>
            </div>
          </Rv>
        </div>
      </div>
    </div>
  );
}

window.HomePage = HomePage;
window.CoursePage = CoursePage;
