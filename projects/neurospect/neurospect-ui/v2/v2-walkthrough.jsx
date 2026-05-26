/* NeuroSpect v2 — Quant Trader Walkthrough: Build → Test → Deploy → Optimize → Live */

function WalkthroughPage() {
  var stepState = React.useState(0);
  var activeStep = stepState[0], setActiveStep = stepState[1];

  var paramState = React.useState(null);
  var activeParam = paramState[0], setActiveParam = paramState[1];

  var PHASES = [
    {
      id: 'discover', num: '01', title: 'Discover & Hypothesize',
      color: '#8b5cf6', icon: 'search',
      summary: 'Turn trading observations into testable hypotheses using AI-assisted pattern detection.',
      detail: 'You notice a pattern: liquidity sweeps followed by FVGs in the London session seem to produce high-probability entries. Instead of trusting your gut, you formalize it.',
      steps: [
        { tool: 'Trader Workspace', action: 'Journal your trades with full ICT markup — FVGs, order blocks, sweeps, session times' },
        { tool: 'NeuroSpect Mentor', action: 'Ask: "What patterns appear in my winning London session trades?" — AI analyzes your journal with RAG-grounded citations' },
        { tool: 'Edge Forensics', action: 'Automatically mines your losing trades for recurring mistake patterns and generates hypotheses' },
        { tool: 'EdgeLab', action: 'Register the hypothesis: "Liquidity sweep + displacement + FVG in London session on ES produces >2R trades at >55% win rate"' },
      ]
    },
    {
      id: 'build', num: '02', title: 'Build & Backtest',
      color: '#10b981', icon: 'code',
      summary: 'Compile your hypothesis into a testable strategy and run it against historical data.',
      detail: 'EdgeLab compiles your strategy from structured YAML — no code required. Define entry conditions, exit rules, risk parameters, and session filters.',
      steps: [
        { tool: 'EdgeLab Strategy Compiler', action: 'Define the strategy in YAML: entry signals (sweep + displacement + FVG), session filter (London), instrument (ES), risk (1% per trade, 2R target)' },
        { tool: 'ICT Event Engine', action: 'Detects all historical FVGs, sweeps, order blocks, and market structure shifts across 2+ years of data' },
        { tool: 'EdgeLab Backtest', action: 'Run the strategy against historical data. Get full metrics: win rate, profit factor, max drawdown, Sharpe, expectancy per trade' },
        { tool: 'EdgeLab Null Test', action: 'Compare against randomized entries to confirm the edge is real, not curve-fitted. If it fails the null test, go back to step 1' },
      ]
    },
    {
      id: 'optimize', num: '03', title: 'Optimize & Stress Test',
      color: '#f59e0b', icon: 'beaker',
      summary: 'Monte Carlo simulation, walk-forward optimization, and regime analysis to validate robustness.',
      detail: 'A backtest that passes once isn\'t enough. You need to know it survives different market conditions, parameter variations, and worst-case scenarios.',
      steps: [
        { tool: 'EdgeLab Monte Carlo', action: 'Run 10,000 simulations with randomized trade ordering. Check: does the strategy survive the worst 5% of outcomes without blowing a prop firm account?' },
        { tool: 'EdgeLab Walk-Forward', action: 'Train on 6 months, test on 2 months, roll forward. Confirm the edge persists out-of-sample across multiple windows' },
        { tool: 'NeuroFusion-13', action: 'Regime analysis: how does the strategy perform in trending vs ranging vs volatile markets? Tag each backtest period with regime labels' },
        { tool: 'EdgeLab Parameter Sweep', action: 'Test stop loss (1R–3R), target (1.5R–4R), session windows, and minimum displacement size. Identify the robust parameter ranges — not single optimal values' },
      ]
    },
    {
      id: 'deploy', num: '04', title: 'Deploy to Paper Trading',
      color: '#3b82f6', icon: 'rocket',
      summary: 'Deploy the validated strategy to paper accounts before risking real capital.',
      detail: 'NeuroTrader runs your strategy in shadow mode first (observe only), then paper mode (simulated orders), before any live execution.',
      steps: [
        { tool: 'NeuroTrader (Shadow)', action: 'Run alongside your manual trading for 2 weeks. NeuroTrader marks where it would have entered/exited. Compare its signals to your discretionary decisions' },
        { tool: 'NeuroTrader (Paper)', action: 'Switch to paper mode: real-time simulated orders on live market data. Full P&L tracking, drawdown monitoring, and Prop Shield rule compliance' },
        { tool: 'Live Trading Terminal', action: 'Watch the strategy execute on your charting terminal with ICT event overlay. Every entry, exit, and skip is annotated with reasoning' },
        { tool: 'EdgeLab Live Validation', action: 'Compare paper trading results against backtest expectations. If win rate or drawdown deviates >2σ, automatically flag for review' },
      ]
    },
    {
      id: 'live', num: '05', title: 'Go Live on Funded Accounts',
      color: '#ef4444', icon: 'bolt',
      summary: 'Execute on real funded prop firm accounts with full risk protection.',
      detail: 'You\'ve validated the strategy through backtest, Monte Carlo, walk-forward, shadow, and paper. Now you deploy to your funded accounts with NeuroSync managing the execution.',
      steps: [
        { tool: 'NeuroSync', action: 'Connect your funded accounts (Apex, Tradeify, MyFundedFutures, etc.). NeuroSync links them as one execution group with per-account risk awareness' },
        { tool: 'Prop Shield', action: 'Per-account enforcement: daily loss limits, trailing drawdown, consistency rules. NeuroSync won\'t execute a trade that would breach any account\'s rules' },
        { tool: 'Live Trading Terminal', action: 'Professional charting with real-time ICT event overlay, one-click manual override, DOM depth, and position tracking across all accounts' },
        { tool: 'NeuroSync Audit Trail', action: 'Every trade logged with: latency, fill quality, slippage, rule check results, parameter set used. Exportable for prop firm disputes' },
      ]
    },
    {
      id: 'diversify', num: '06', title: 'Parameter-Diversified Execution',
      color: '#14b8a6', icon: 'chart',
      summary: 'Run different parameter variants across accounts for live A/B optimization.',
      detail: 'This is where NeuroSync becomes unprecedented. Instead of copying identical trades to all accounts, you distribute parameter variants — turning your prop firm portfolio into a live optimization engine.',
      steps: [
        { tool: 'NeuroSync Parameter Groups', action: 'Assign parameter profiles to account groups: Group A (aggressive: 3R target, wider stop), Group B (conservative: 1.5R target, tight stop), Group C (regime-adaptive: NeuroFusion picks per condition)' },
        { tool: 'EdgeLab Live Feedback', action: 'Real-time comparison dashboard: which parameter group is outperforming? Track win rate, drawdown, profit factor, and Sharpe per group' },
        { tool: 'NeuroFusion Regime Router', action: 'In trending markets, automatically weight toward Group A parameters. In choppy markets, weight toward Group B. NeuroFusion-13 detects the regime and routes accordingly' },
        { tool: 'Auto-Convergence', action: 'Over time, NeuroSync narrows toward the best-performing parameter set per regime. Walk-forward optimization happening in production — using funded capital, not your own' },
      ]
    },
    {
      id: 'compound', num: '07', title: 'Compound & Scale',
      color: '#a855f7', icon: 'cube',
      summary: 'Feed live results back into EdgeLab. Every trade makes the system smarter.',
      detail: 'The final loop: live trading data flows back into NeuroCore and EdgeLab. Your next backtest includes real-world fill data, slippage, and regime labels. The system self-improves.',
      steps: [
        { tool: 'NeuroGraph', action: 'Every trade, signal, regime, and outcome becomes a node in your persistent trading intelligence graph. Patterns compound over time' },
        { tool: 'EdgeLab Re-validation', action: 'Monthly re-run: does the strategy still pass the null test with the latest data? Has the edge decayed? Should parameters shift?' },
        { tool: 'NeuroScore', action: 'Your verified track record across all accounts. Risk-adjusted ranking factoring performance, drawdown discipline, and consistency' },
        { tool: 'Scale', action: 'Add more funded accounts. NeuroSync scales horizontally — same strategy, same risk controls, more capital allocation. Each account independently risk-managed' },
      ]
    },
  ];

  var PARAM_PROFILES = [
    {
      name: 'Group A — Aggressive',
      color: '#ef4444',
      accounts: ['Apex #1', 'Apex #2', 'Tradeify #1'],
      params: { stopLoss: '2.5R', target: '3.5R', session: 'London + NY AM', minDisplacement: '8 ticks', maxDailyTrades: 4, regime: 'All' },
      metrics: { winRate: '48%', profitFactor: '2.1', avgR: '1.8R', maxDD: '-$1,840', sharpe: '1.6' }
    },
    {
      name: 'Group B — Conservative',
      color: '#3b82f6',
      accounts: ['MFF #1', 'MFF #2', 'Apex #3'],
      params: { stopLoss: '1.0R', target: '1.5R', session: 'NY AM only', minDisplacement: '12 ticks', maxDailyTrades: 2, regime: 'Trending only' },
      metrics: { winRate: '64%', profitFactor: '1.7', avgR: '0.9R', maxDD: '-$620', sharpe: '2.1' }
    },
    {
      name: 'Group C — Regime-Adaptive',
      color: '#a855f7',
      accounts: ['Tradeify #2', 'Apex #4'],
      params: { stopLoss: 'Dynamic', target: 'Dynamic', session: 'NeuroFusion-selected', minDisplacement: 'Regime-scaled', maxDailyTrades: 3, regime: 'Auto-detected' },
      metrics: { winRate: '56%', profitFactor: '2.4', avgR: '1.5R', maxDD: '-$980', sharpe: '2.8' }
    },
  ];

  return (
    <div className="page">
      {/* Hero */}
      <Rv>
        <div className="hero-grad" style={{ padding: 'clamp(2rem,4vw,3rem)', marginBottom: '1.5rem' }}>
          <span className="badge badge-blue" style={{ marginBottom: 14 }}><span className="badge-dot" style={{ background: '#14b8a6' }}></span>Complete Guide</span>
          <h1 style={{ marginBottom: 10 }}>From Hypothesis to <span className="grad-text">Live Execution</span></h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-m)', maxWidth: 580, lineHeight: 1.65 }}>
            The complete quant trader workflow through NeuroSpect: discover patterns, backtest rigorously, optimize across regimes, deploy to paper, go live on funded accounts, and run parameter-diversified execution across your prop firm portfolio.
          </p>
        </div>
      </Rv>

      {/* Phase Navigator */}
      <Rv delay={60}>
        <div style={{ display: 'flex', gap: 4, marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: 4 }}>
          {PHASES.map(function(phase, i) {
            var isActive = activeStep === i;
            return (
              <button key={phase.id} onClick={function() { setActiveStep(i); }}
                className={'btn btn-sm ' + (isActive ? '' : 'btn-ghost')}
                style={{
                  borderColor: isActive ? phase.color : undefined,
                  background: isActive ? phase.color + '15' : undefined,
                  color: isActive ? phase.color : 'var(--text-m)',
                  whiteSpace: 'nowrap', fontSize: '0.68rem', fontWeight: 700,
                  boxShadow: isActive ? '0 0 12px ' + phase.color + '20' : 'none',
                  transition: 'all 0.2s'
                }}>
                <span className="mono" style={{ marginRight: 4 }}>{phase.num}</span> {phase.title}
              </button>
            );
          })}
        </div>
      </Rv>

      {/* Active Phase Detail */}
      {PHASES.map(function(phase, i) {
        if (i !== activeStep) return null;
        return (
          <Rv key={phase.id} delay={80}>
            <div className="card card-active" style={{ borderLeftWidth: 4, borderLeftColor: phase.color, marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span className="mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: phase.color + '30' }}>{phase.num}</span>
                <div>
                  <h2 style={{ fontSize: '1.1rem', marginBottom: 2 }}>{phase.title}</h2>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-m)' }}>{phase.summary}</p>
                </div>
              </div>

              <div style={{ background: phase.color + '08', border: '1px solid ' + phase.color + '15', borderRadius: 8, padding: '12px 14px', marginBottom: 16 }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-b)', lineHeight: 1.6, fontStyle: 'italic' }}>{phase.detail}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {phase.steps.map(function(step, si) {
                  return (
                    <div key={si} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', position: 'relative' }}>
                      {si < phase.steps.length - 1 && <div style={{ position: 'absolute', left: 15, top: 32, width: 2, height: 'calc(100% - 8px)', background: phase.color + '20' }}></div>}
                      <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, border: '1.5px solid ' + phase.color + '40', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-m)', fontSize: '0.6rem', color: phase.color, zIndex: 2, background: 'var(--bg-card, #0a0f1a)' }}>{si + 1}</div>
                      <div style={{ flex: 1, paddingBottom: 14 }}>
                        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: phase.color, marginBottom: 2, fontFamily: 'var(--font-m, monospace)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{step.tool}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-b)', lineHeight: 1.5 }}>{step.action}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Rv>
        );
      })}

      {/* Parameter-Diversified Execution Deep Dive */}
      <Rv delay={120}>
        <div className="hero-grad" style={{ padding: 'clamp(1.5rem,3vw,2rem)', marginBottom: '1.5rem' }}>
          <span className="badge badge-blue" style={{ marginBottom: 14 }}><span className="badge-dot" style={{ background: '#14b8a6' }}></span>Unprecedented</span>
          <h2 style={{ marginBottom: 10 }}>Parameter-Diversified Execution with <span className="grad-text">NeuroSync</span></h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-m)', maxWidth: 560, lineHeight: 1.65 }}>
            Every other copier mirrors identical trades. NeuroSync distributes parameter variants across your prop firm accounts — turning your portfolio into a live walk-forward optimization engine using funded capital.
          </p>
        </div>
      </Rv>

      {/* Parameter Group Cards */}
      <Rv delay={160}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: 14 }}>Live Parameter Groups</h2>
        <div className="bento bento-3" style={{ marginBottom: '1.5rem' }}>
          {PARAM_PROFILES.map(function(profile, pi) {
            var isOpen = activeParam === pi;
            return (
              <Rv key={pi} delay={pi * 50}>
                <div className={'card ' + (isOpen ? 'card-active' : '')}
                  style={{ cursor: 'pointer', borderLeftWidth: 3, borderLeftColor: profile.color, height: '100%', display: 'flex', flexDirection: 'column' }}
                  onClick={function() { setActiveParam(isOpen ? null : pi); }}>
                  <h3 style={{ fontSize: '0.9rem', color: profile.color, marginBottom: 6 }}>{profile.name}</h3>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-d)', marginBottom: 10 }}>
                    Accounts: {profile.accounts.join(' · ')}
                  </div>

                  {/* Key Metrics */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                    {Object.keys(profile.metrics).map(function(key) {
                      var labels = { winRate: 'Win', profitFactor: 'PF', avgR: 'Avg R', maxDD: 'Max DD', sharpe: 'Sharpe' };
                      var colors = { winRate: '#10b981', profitFactor: '#3b82f6', avgR: '#f59e0b', maxDD: '#ef4444', sharpe: '#a855f7' };
                      return (
                        <div key={key} style={{ fontSize: '0.65rem', padding: '3px 8px', borderRadius: 5, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <span style={{ color: 'var(--text-d)' }}>{labels[key] || key}: </span>
                          <span style={{ fontWeight: 700, color: colors[key] || 'var(--text-b)', fontFamily: 'var(--font-m, monospace)' }}>{profile.metrics[key]}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Expandable Parameters */}
                  <div style={{ maxHeight: isOpen ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)', flex: 1 }}>
                    <div style={{ height: 1, background: profile.color + '33', marginBottom: 10 }}></div>
                    {Object.keys(profile.params).map(function(key) {
                      var labels = { stopLoss: 'Stop Loss', target: 'Profit Target', session: 'Session Filter', minDisplacement: 'Min Displacement', maxDailyTrades: 'Max Daily Trades', regime: 'Regime Filter' };
                      return (
                        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: '0.72rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <span style={{ color: 'var(--text-d)' }}>{labels[key] || key}</span>
                          <span style={{ color: 'var(--text-b)', fontFamily: 'var(--font-m, monospace)', fontWeight: 600 }}>{profile.params[key]}</span>
                        </div>
                      );
                    })}
                  </div>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-d)', textAlign: 'center', marginTop: 6 }}>{isOpen ? '▲ Collapse' : '▼ View parameters'}</span>
                </div>
              </Rv>
            );
          })}
        </div>
      </Rv>

      {/* How It Works */}
      <Rv delay={200}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: 14 }}>How Auto-Convergence Works</h2>
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="bento bento-2">
            {[
              { n: '01', t: 'Distribute', d: 'NeuroSync assigns parameter profiles to account groups. Same strategy logic, different risk/reward tuning per group.' },
              { n: '02', t: 'Execute', d: 'Each group trades live with its assigned parameters. Prop Shield enforces per-account rules independently.' },
              { n: '03', t: 'Measure', d: 'EdgeLab compares real-time performance across groups: win rate, drawdown, profit factor, Sharpe — segmented by regime.' },
              { n: '04', t: 'Adapt', d: 'NeuroFusion-13 detects the current market regime. NeuroSync shifts execution weight toward the parameter group outperforming in that regime.' },
              { n: '05', t: 'Converge', d: 'Over weeks, the system narrows toward optimal parameters per regime. Your worst-performing group\'s parameters get refined or retired.' },
              { n: '06', t: 'Compound', d: 'Results feed back to EdgeLab. Your next backtest includes live fill data, slippage, and regime-tagged performance. The loop accelerates.' },
            ].map(function(s) {
              return (
                <div key={s.n}>
                  <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'rgba(20,184,166,0.15)', fontFamily: 'var(--font-h, sans-serif)' }}>{s.n}</span>
                  <h3 style={{ fontSize: '0.85rem', marginBottom: 3 }}>{s.t}</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-m)', lineHeight: 1.5 }}>{s.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Rv>

      {/* Why This Is Unprecedented */}
      <Rv delay={240}>
        <div className="card card-active" style={{ borderLeftWidth: 4, borderLeftColor: '#14b8a6' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: 12 }}>Why No One Else Does This</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Tradecopia, TradeSyncer, Replikanto', desc: 'Copy identical trades to all accounts. No parameter variation. No regime awareness. No feedback loop.' },
              { label: 'Manual parameter testing', desc: 'Traders manually change settings on one account at a time. Slow, no statistical rigor, no systematic comparison.' },
              { label: 'Backtest-only optimization', desc: 'Walk-forward tests on historical data. Can\'t capture live execution factors: slippage, latency, market impact, prop firm rule interactions.' },
              { label: 'NeuroSync', desc: 'Walk-forward optimization in production. Funded capital, per-account risk management, regime-adaptive routing, automatic convergence, full audit trail. The strategy gets smarter every day it runs.' },
            ].map(function(item, i) {
              var isNS = i === 3;
              return (
                <div key={i} style={{ padding: '10px 14px', borderRadius: 8, background: isNS ? 'rgba(20,184,166,0.06)' : 'rgba(255,255,255,0.02)', border: '1px solid ' + (isNS ? 'rgba(20,184,166,0.2)' : 'rgba(255,255,255,0.04)') }}>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: isNS ? '#14b8a6' : 'var(--text-b)', marginBottom: 2 }}>{item.label}</p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-m)', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Rv>
    </div>
  );
}
