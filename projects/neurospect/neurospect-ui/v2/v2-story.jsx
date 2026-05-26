/* NeuroSpect v2 — My Story Page */

/* ═══ SVG DIAGRAMS ═══ */

function JourneyTimeline() {
  var steps = [
    { label: 'Bars & Construction', sub: 'COVID era', color: '#64748b', emoji: '\u{1F3D7}' },
    { label: 'Data Engineering', sub: 'Lululemon', color: '#3b82f6', emoji: '\u{1F4CA}' },
    { label: 'AI Platforms', sub: 'Analytic Labs', color: '#8b5cf6', emoji: '\u{1F916}' },
    { label: 'Funded Trader', sub: 'Futures markets', color: '#10b981', emoji: '\u{1F4B9}' },
    { label: 'NeuroSpect', sub: 'Building the platform', color: '#fbbf24', emoji: '\u{1F680}' },
  ];
  return (
    <div style={{ overflowX: 'auto', padding: '10px 0' }}>
      <svg viewBox="0 0 700 90" style={{ width: '100%', minWidth: 500, height: 'auto', display: 'block' }}>
        <line x1="70" y1="30" x2="630" y2="30" stroke="rgba(59,130,246,0.15)" strokeWidth="2" />
        {steps.map(function(s, i) {
          var x = 70 + i * 140;
          return React.createElement('g', { key: i },
            React.createElement('line', { x1: x, y1: 30, x2: i < steps.length - 1 ? x + 140 : x, y2: 30, stroke: s.color, strokeWidth: 2, opacity: 0.6 }),
            React.createElement('circle', { cx: x, cy: 30, r: 10, fill: s.color, opacity: 0.9 }),
            React.createElement('circle', { cx: x, cy: 30, r: 5, fill: '#050810' }),
            React.createElement('text', { x: x, y: 55, textAnchor: 'middle', fill: '#e0ecff', fontSize: 10, fontFamily: "'Inter',sans-serif", fontWeight: 600 }, s.label),
            React.createElement('text', { x: x, y: 70, textAnchor: 'middle', fill: '#4a5f7a', fontSize: 8, fontFamily: "'JetBrains Mono',monospace" }, s.sub),
            React.createElement('text', { x: x, y: 16, textAnchor: 'middle', fontSize: 14 }, s.emoji)
          );
        })}
      </svg>
    </div>
  );
}

function FeatureEvolutionDiagram() {
  var stages = [
    { label: 'Trading Journal', problem: 'No record of what I was doing wrong', color: '#64748b' },
    { label: 'AI Coach Agent', problem: 'Needed honest feedback on my trades', color: '#3b82f6' },
    { label: 'Mistake Detection', problem: 'Same errors, over and over', color: '#8b5cf6' },
    { label: 'Rule Enforcement', problem: 'Emotions made me break my own rules', color: '#06b6d4' },
    { label: 'Backtesting Engine', problem: 'Gut feeling isn\'t a strategy', color: '#10b981' },
    { label: 'Risk Protection', problem: 'One bad day could wipe a good week', color: '#f59e0b' },
    { label: 'Full Platform', problem: 'All of the above, for every trader', color: '#fbbf24' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative', padding: '0 0 0 24px' }}>
      <div style={{ position: 'absolute', left: 11, top: 12, bottom: 12, width: 2, background: 'linear-gradient(180deg, #64748b, #fbbf24)', borderRadius: 1 }}></div>
      {stages.map(function(s, i) {
        var isLast = i === stages.length - 1;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '8px 0', position: 'relative' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: s.color, boxShadow: isLast ? '0 0 12px ' + s.color + '60' : 'none', flexShrink: 0, position: 'absolute', left: -18 }}></div>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '0.82rem', color: isLast ? 'var(--gold-300)' : 'var(--text-h)', display: 'block' }}>{s.label}</strong>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-m)', fontStyle: 'italic' }}>{s.problem}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SihreOriginDiagram() {
  var center = { x: 200, y: 140, label: '"How would a VectorDB\nwork with an LLM-Wiki?"' };
  var spokes = [
    { label: 'Semantic Search', angle: 0, color: '#3b82f6' },
    { label: 'Statistical Models', angle: 45, color: '#8b5cf6' },
    { label: 'Orderflow', angle: 90, color: '#10b981' },
    { label: 'Market Regime', angle: 135, color: '#06b6d4' },
    { label: 'Economic Data', angle: 180, color: '#f59e0b' },
    { label: 'Causal Reasoning', angle: 225, color: '#ec4899' },
    { label: 'Level 2 Data', angle: 270, color: '#ef4444' },
    { label: 'Multi-Agent Debate', angle: 315, color: '#a78bfa' },
  ];
  var r = 100;
  return (
    <div style={{ overflowX: 'auto', padding: '10px 0' }}>
      <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: 440, height: 'auto', display: 'block', margin: '0 auto' }}>
        {spokes.map(function(s, i) {
          var rad = s.angle * Math.PI / 180;
          var ex = center.x + r * Math.cos(rad);
          var ey = center.y + r * Math.sin(rad);
          return React.createElement('g', { key: i },
            React.createElement('line', { x1: center.x, y1: center.y, x2: ex, y2: ey, stroke: s.color, strokeWidth: 1.5, opacity: 0.4 }),
            React.createElement('circle', { cx: ex, cy: ey, r: 6, fill: s.color, opacity: 0.8 }),
            React.createElement('text', { x: ex + (Math.cos(rad) > 0 ? 10 : -10), y: ey + 4, textAnchor: Math.cos(rad) > 0 ? 'start' : 'end', fill: s.color, fontSize: 9, fontFamily: "'Inter',sans-serif", fontWeight: 500 }, s.label)
          );
        })}
        <circle cx={center.x} cy={center.y} r="32" fill="rgba(251,191,36,0.1)" stroke="rgba(251,191,36,0.3)" strokeWidth="1.5" />
        <text x={center.x} y={center.y - 4} textAnchor="middle" fill="#fbbf24" fontSize="7" fontFamily="'JetBrains Mono',monospace" fontWeight="600">One question</text>
        <text x={center.x} y={center.y + 7} textAnchor="middle" fill="#fbbf24" fontSize="7" fontFamily="'JetBrains Mono',monospace" fontWeight="600">started it all</text>
      </svg>
    </div>
  );
}

function LearningPathDiagram() {
  var goodPath = [
    { label: 'Learn ICT / SMC Concepts', x: 50 },
    { label: 'Find a Mentor', x: 190 },
    { label: 'Practice & Live Trade', x: 330 },
    { label: 'Build Custom Models', x: 470 },
  ];
  return (
    <div style={{ overflowX: 'auto', padding: '10px 0' }}>
      <svg viewBox="0 0 580 130" style={{ width: '100%', minWidth: 500, height: 'auto', display: 'block' }}>
        {/* Good path */}
        <line x1="90" y1="35" x2="510" y2="35" stroke="rgba(16,185,129,0.3)" strokeWidth="2" />
        {goodPath.map(function(s, i) {
          return React.createElement('g', { key: i },
            React.createElement('rect', { x: s.x, y: 18, width: 120, height: 34, rx: 8, fill: 'rgba(16,185,129,0.08)', stroke: 'rgba(16,185,129,0.25)', strokeWidth: 1 }),
            React.createElement('text', { x: s.x + 60, y: 39, textAnchor: 'middle', fill: '#10b981', fontSize: 8.5, fontFamily: "'Inter',sans-serif", fontWeight: 600 }, s.label),
            i < goodPath.length - 1 ? React.createElement('text', { x: s.x + 140, y: 39, textAnchor: 'middle', fill: '#10b981', fontSize: 12 }, '→') : null
          );
        })}
        <text x="10" y="39" fill="#10b981" fontSize="8" fontFamily="'JetBrains Mono',monospace" fontWeight="600">RIGHT</text>

        {/* Wrong path */}
        <rect x="50" y="80" width="160" height="34" rx="8" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.2)" strokeWidth="1" />
        <text x="130" y="101" textAnchor="middle" fill="#ef4444" fontSize="8.5" fontFamily="'Inter',sans-serif" fontWeight="600">Skip to Indicators / Quant</text>
        <text x="230" y="101" fill="#ef4444" fontSize="12">{'→'}</text>
        <rect x="250" y="80" width="160" height="34" rx="8" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.2)" strokeWidth="1" strokeDasharray="4 2" />
        <text x="330" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="'Inter',sans-serif" fontWeight="500">Inconsistent Results</text>
        <text x="330" y="108" textAnchor="middle" fill="rgba(239,68,68,0.5)" fontSize="7" fontFamily="'Inter',sans-serif">Wasted time & money</text>
        <text x="10" y="101" fill="#ef4444" fontSize="8" fontFamily="'JetBrains Mono',monospace" fontWeight="600">WRONG</text>
      </svg>
    </div>
  );
}

/* ═══ STORY PAGE ═══ */
function StoryPage() {
  return (
    <div className="page">
      {/* Hero */}
      <Rv>
        <div className="hero-grad" style={{ padding: 'clamp(2rem,4vw,3rem)', marginBottom: '1.5rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: 14 }}><span className="badge-dot"></span>The Real Story</span>
          <h1 style={{ marginBottom: 10 }}>Built by a Trader, <span className="grad-text">For Traders</span></h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-m)', maxWidth: 520, lineHeight: 1.7 }}>
            No VC funding. No marketing team. Just a guy who kept losing the same trades and got annoyed enough to build something about it.
          </p>
        </div>
      </Rv>

      {/* Section 1: Before NeuroSpect */}
      <Rv delay={60}>
        <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: 6 }}>Before NeuroSpect</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 6 }}>
            When COVID hit, I spent a year pulling pints in bars, bouncing at nightclubs, and lugging bricks on construction sites. Not exactly the dream — but it taught me more about reading people and staying calm under pressure than any textbook.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 6 }}>
            Before that (and after), my actual career was in <strong style={{ color: 'var(--text-h)' }}>data engineering and machine learning</strong> — building demand forecasting systems at Lululemon, then designing AI-native data platforms at Analytic Labs. Snowflake warehouses, ML pipelines, the works.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 16 }}>
            Somewhere along the way, I started trading futures. Got funded. Got humbled. Got funded again. You know how it goes.
          </p>
          <JourneyTimeline />
        </div>
      </Rv>

      {/* Section 2: How This Started */}
      <Rv delay={80}>
        <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: 6 }}>How This Started</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 6 }}>
            NeuroSpect didn't start as a "platform." It started as a <strong style={{ color: 'var(--text-h)' }}>messy journal</strong> with an AI coach agent duct-taped to it. I wanted something that would look at my trades and tell me — honestly — why I kept making the same mistakes.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 6 }}>
            Then I kept hitting new problems. Every time I struggled with something, I built a feature to fix it. Couldn't stop revenge trading? Built a rule enforcement layer. Couldn't tell if my setups actually had edge? Built a backtesting engine. Kept blowing through daily loss limits? Built a risk governor.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 6 }}>
            <strong style={{ color: 'var(--gold-300)' }}>I guarantee — whatever struggle you're dealing with right now, I've been there.</strong> Every feature in this platform exists because I needed it myself first.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 16 }}>
            Coming from a data/AI engineering background, I eventually thought: <em>"What if the quant side could help too?"</em> That opened a whole new direction — but more on that in a moment.
          </p>
          <FeatureEvolutionDiagram />
        </div>
      </Rv>

      {/* Section 3: Where SIHRE Came From */}
      <Rv delay={100}>
        <div className="card card-sihre" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: 6, color: 'var(--gold-300)' }}>Where NeuroFusion Came From</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 6 }}>
            It started with a single question: <strong style={{ color: 'var(--gold-300)' }}>"How would a VectorDB integrate with an LLM and a knowledge wiki?"</strong>
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 6 }}>
            That question cracked something open. If semantic search could work alongside language models, what about statistical models? What about orderflow data? Level 2 market depth? Regime detection? Economic event analysis? Causal reasoning?
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 6 }}>
            My brain took off. I dove into research on every alternative signal type I could find — traditional indicators, quant feature engineering, market microstructure, dynamic regime classification, multi-agent debate systems. Hundreds of hours of reading, prototyping, testing.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 16 }}>
            The result was <strong style={{ color: 'var(--gold-300)' }}>SIHRE</strong> — a Self-Improving Heterogeneous Reasoning Ensemble. Not one model. Not a bigger model. A fundamentally new kind of architecture that fuses different types of intelligence together, with a meta-reasoning layer that learns which signals to trust under which conditions. Patent pending. <a href="#neurofusion" style={{ color: 'var(--gold-400)' }}>Learn more &rarr;</a>
          </p>
          <SihreOriginDiagram />
        </div>
      </Rv>

      {/* Section 4: The Mentor Truth */}
      <Rv delay={120}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: 14 }}>The Mentor Truth</h2>

          {/* Disclaimer */}
          <div className="card" style={{ marginBottom: 12, borderColor: 'rgba(239,68,68,0.2)', padding: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontSize: '1rem', marginTop: 1 }}>&#9888;&#65039;</span>
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#ef4444', display: 'block', marginBottom: 4 }}>Honest Disclaimer</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-b)', lineHeight: 1.65 }}>
                  I started out trying to automate strategies I didn't understand. I had <em>zero</em> knowledge of markets, ICT, SMC — nothing. I was letting code trade patterns I couldn't even explain. That was a mistake.
                </p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-b)', lineHeight: 1.65, marginTop: 6 }}>
                  The best decision I made was to <strong style={{ color: 'var(--text-h)' }}>stop and find a mentor</strong>. I went to multiple. Each one applied ICT differently — and here's the thing: <em>none of them were wrong, and all of them were profitable</em>. The methodology works. You just need someone to show you how.
                </p>
              </div>
            </div>
          </div>

          {/* Bold statement */}
          <div className="card card-gold" style={{ marginBottom: 12, padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontFamily: "var(--font-h)", fontSize: 'clamp(0.85rem,2vw,1.1rem)', color: 'var(--gold-300)', letterSpacing: '0.03em', lineHeight: 1.4 }}>
              You will never become consistently profitable<br />without a mentor who has a proven track record.
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-m)', marginTop: 8 }}>
              I know that's a strong statement. I stand by it.
            </p>
          </div>

          {/* The YouTube trap */}
          <div className="card" style={{ marginBottom: 12, padding: '1.2rem' }}>
            <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>The YouTube Trap</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-b)', lineHeight: 1.65, marginBottom: 8 }}>
              You've seen the videos. <em>"Super simple 80% win rate strategy!"</em> with some magic indicator combo. Wonder why they're making YouTube videos instead of trading? <strong style={{ color: 'var(--text-h)' }}>Because they can't trade consistently, or at all.</strong> The video IS the product. You are the customer.
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-b)', lineHeight: 1.65, marginBottom: 8 }}>
              I wasted so much time going through video after video, trying indicator after indicator, before I finally just got a mentor. If you're starting from scratch — please don't rely on indicators for signals. There is a <em>lot</em> more to trading than a 200-day moving average crossing over a 50-day.
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-b)', lineHeight: 1.65 }}>
              It takes more work, but the sooner you study <strong style={{ color: 'var(--text-h)' }}>ICT/SMC, Orderflow, or Wyckoff Theory</strong> (which is baked into ICT/SMC content anyway), the better. You will save so much wasted time.
            </p>
          </div>

          {/* Indicator vs Concept comparison */}
          <div className="bento bento-2" style={{ marginBottom: 12 }}>
            <div className="card" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }}></span>
                <strong style={{ fontSize: '0.82rem', color: '#ef4444' }}>Indicator-Based Approach</strong>
              </div>
              {['Lagging signals — reacts after the move', 'No context — same signal in every condition', 'Can\'t explain WHY price moves', 'Optimized for backtest, fails live', 'Bull flags, head & shoulders, wedges...'].map(function(t) {
                return <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: '0.75rem', color: 'var(--text-m)', marginBottom: 4 }}>
                  <span style={{ color: '#ef4444', marginTop: 2 }}>&#10007;</span>{t}
                </div>;
              })}
            </div>
            <div className="card" style={{ borderColor: 'rgba(16,185,129,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></span>
                <strong style={{ fontSize: '0.82rem', color: '#10b981' }}>Concept-Based Approach</strong>
              </div>
              {['Understands WHY price moves', 'Adapts to market regime and session', 'Uses confluence of multiple factors', 'Applicable across any instrument', 'ICT, SMC, Orderflow, Wyckoff'].map(function(t) {
                return <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: '0.75rem', color: 'var(--text-b)', marginBottom: 4 }}>
                  <span style={{ color: '#10b981', marginTop: 2 }}>&#10003;</span>{t}
                </div>;
              })}
            </div>
          </div>

          {/* Learning path */}
          <div className="card" style={{ marginBottom: 12, padding: '1.2rem' }}>
            <h3 style={{ fontSize: '0.95rem', marginBottom: 8 }}>The Right Path</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-b)', lineHeight: 1.65, marginBottom: 12 }}>
              Once you understand how the market moves, you can actually come up with ideas that can be turned into features, combined with other features to create your own custom trading model. But that is <em>not possible</em> without a foundation in core market and price action concepts. And by price action, I don't mean bull flags and head & shoulders — the <a href="#course" style={{ color: 'var(--blue-400)' }}>free course</a> will make everything clear.
            </p>
            <LearningPathDiagram />
          </div>

          {/* Beginner advice */}
          <div className="card card-gold" style={{ padding: '1.2rem' }}>
            <h3 style={{ fontSize: '0.95rem', marginBottom: 8, color: 'var(--gold-300)' }}>If You're a Beginner</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-b)', lineHeight: 1.65, marginBottom: 8 }}>
              Don't try quant trading first. Don't start with indicators. Do some research on ICT/SMC, Orderflow, or Wyckoff Theory. There's a <a href="#course" style={{ color: 'var(--gold-400)' }}>free ICT/SMC concepts course</a> on this site right now for complete beginners — that's a solid foundation.
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-b)', lineHeight: 1.65 }}>
              Once you understand the concepts, find a mentor with a proven track record (I know quite a few) and live trade with them until you feel comfortable with their strategy. <em>Then</em> come back here and build something incredible with tools that actually understand what you're trying to do.
            </p>
          </div>
        </div>
      </Rv>

      {/* Section 5: What This Platform Is */}
      <Rv delay={140}>
        <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: 8 }}>What This Platform Is</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 8 }}>
            I'm not here to sell you a product. I built NeuroSpect because I needed it, and I'm sharing it because I know other traders need it too.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 8 }}>
            This is a <strong style={{ color: 'var(--gold-300)' }}>safe place for collaborative learning</strong> — a platform that gives you all the tools you need to succeed without dozens of subscriptions, without hours spent on poor-quality tutorials that don't have your best interests at heart, and without the constant pressure to buy the next indicator.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.7, marginBottom: 16 }}>
            Journal. Coach. Backtesting. Risk management. Knowledge base. AI reasoning. All in one place. Built by someone who trades every day and feels the same frustrations you do.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="#course" className="btn btn-blue btn-sm">Start the Free Course</a>
            <a href="#neurofusion" className="btn btn-gold btn-sm">Explore NeuroFusion</a>
            <a href="#pricing" className="btn btn-ghost btn-sm">See Pricing</a>
          </div>
        </div>
      </Rv>
    </div>
  );
}

window.StoryPage = StoryPage;
