/* NeuroSpect v2 — NeuroFusion (SIHRE) Deep Dive Page */

/* ═══ NON-TRADING REASONING SCENARIOS ═══ */
var REASONING_SCENARIOS = [
  { id: 'soccer', title: 'Half-Time Substitution', icon: '⚽',
    desc: 'Your team is drawing 1-1 at half-time. Your star striker has scored in 3 of the last 4 second halves but has been quiet today. Your backup striker scored twice in warm-up and is begging to come on. The opponent just switched to a low block.',
    question: 'Do you substitute the striker?',
    options: ['Keep starter — his track record speaks for itself', 'Sub in backup — he\'s hot right now', 'Wait until the 60th minute to assess the second half', 'Change formation instead — add a midfielder to break the block'],
    sihre_answer: 2,
    bridge: 'In trading, this is the equivalent of switching strategies mid-session because your "backup" setup looks good in a screener — while ignoring that the market regime just changed.',
    reasoning: [
      { type: 'Statistical', color: '#3b82f6', says: 'Starter\'s second-half scoring rate (3 of 4) is strong historical data. Warm-up performance has near-zero correlation with match performance across 200+ games studied.' },
      { type: 'Structural', color: '#8b5cf6', says: 'The opponent switched to a low block — this is a regime change. The game is now fundamentally different from the first half. A target striker may need different skills vs a low block than vs open play.' },
      { type: 'Behavioral', color: '#10b981', says: '"He\'s hot in warm-up" is recency bias applied to the wrong context. The pressure to act comes from the frustration of drawing, not from evidence that a change would help.' },
      { type: 'Risk-Adjusted', color: '#f59e0b', says: 'A substitution is irreversible. If the backup doesn\'t perform, you\'ve burned a sub and lost your best second-half scorer. The cost of waiting 15 minutes is low; the cost of a wrong sub is high.' },
      { type: 'Orchestrator', color: '#fbbf24', says: 'Wait. Multiple signals conflict and the regime just changed. Assess how the low block affects play for 15 minutes. If the starter can\'t create chances against the new setup, THEN sub — for tactical reasons, not emotional ones.' },
    ]},
  { id: 'restaurant', title: 'Friday Rush Menu', icon: '\u{1F468}‍\u{1F373}',
    desc: 'It\'s Thursday evening. Your new seafood risotto has been a hit — sold out 3 nights in a row. But your fish supplier warned that Friday\'s delivery might be 2 hours late, and your sous chef who perfected the dish called in sick for tomorrow.',
    question: 'Do you put the risotto on Friday\'s specials?',
    options: ['Yes — it\'s been selling out, ride the momentum', 'No — too many risk factors, play it safe', 'Plan it but prep a backup dish ready to swap in', 'Modify it — simpler version the other chef can handle'],
    sihre_answer: 2,
    bridge: 'In trading, this is like sizing up on a setup that\'s been winning — while ignoring that your data feed might lag and your usual execution conditions have changed.',
    reasoning: [
      { type: 'Statistical', color: '#3b82f6', says: '3 consecutive sellouts is compelling. But sample size is tiny, and conditions were different each night (your best chef, reliable supply, no time pressure). Past performance under different conditions isn\'t a reliable predictor.' },
      { type: 'Contextual', color: '#8b5cf6', says: 'Two independent risk factors (late delivery + different chef) compound. The probability of BOTH going smoothly is much lower than either individually. Friday is also your highest-volume night.' },
      { type: 'Adversarial', color: '#ef4444', says: 'What\'s the worst case? Late fish + unfamiliar chef = bad risotto served to Friday\'s biggest crowd. A sellout dish done badly is worse than no dish at all — it damages your reputation permanently.' },
      { type: 'Risk-Adjusted', color: '#f59e0b', says: 'The asymmetry is key. Upside: one more night of sales. Downside: angry customers, wasted ingredients, stressed kitchen during peak rush. The risk far outweighs the reward.' },
      { type: 'Orchestrator', color: '#fbbf24', says: 'Prep the risotto IF supplies arrive on time AND the replacement chef tests a practice batch beforehand. Have the backup ready. Conditional execution with a defined abort criteria — don\'t commit until the risk factors are actually resolved.' },
    ]},
  { id: 'medical', title: 'The Ambiguous Diagnosis', icon: '\u{1FA7A}',
    desc: 'A patient has fatigue, mild fever, and joint pain. Blood work shows slightly elevated inflammation markers. They just returned from a tropical vacation. Your quick-reference suggests either a common viral infection (self-limiting) or an early autoimmune flare (needs immediate treatment).',
    question: 'What\'s your next step?',
    options: ['Diagnose viral — it\'s 20x more common, prescribe rest', 'Order the autoimmune panel immediately', 'Treat for both simultaneously to cover all bases', 'Get detailed travel history and run a targeted tropical disease panel'],
    sihre_answer: 3,
    bridge: 'In trading, this is like entering a trade based on the most common pattern — while ignoring a contextual detail (like a news event or session timing) that completely changes the probability distribution.',
    reasoning: [
      { type: 'Statistical', color: '#3b82f6', says: 'Base rates favor viral (95% of presentations with these symptoms). But base rates shift dramatically when you add context — the tropical vacation opens an entirely different diagnostic category.' },
      { type: 'Contextual', color: '#8b5cf6', says: '"Recently returned from tropical vacation" is a regime-changing detail. It introduces a third hypothesis (tropical disease) that the quick-reference didn\'t consider. Without knowing which countries and exposures, the differential is incomplete.' },
      { type: 'Adversarial', color: '#ef4444', says: 'Challenge: treating for viral when it\'s actually tropical could be dangerous. Treating for autoimmune (immunosuppressants) when it\'s actually an infection could be catastrophic. The cost of wrong treatment is asymmetric.' },
      { type: 'Uncertainty', color: '#f59e0b', says: 'With three possible categories, confidence in any single diagnosis is too low to act on. The cost of asking one more question (travel details) is near zero; the cost of wrong treatment is enormous.' },
      { type: 'Orchestrator', color: '#fbbf24', says: 'The travel history is the highest-information question available — it collapses multiple hypotheses at zero cost and zero risk. Get more data before committing. The best move right now is to gather information, not to act.' },
    ]},
  { id: 'hiring', title: 'The Star Candidate', icon: '\u{1F4BC}',
    desc: 'You\'re hiring a senior engineer. Candidate A crushed the technical interview (top 5%), has 8 years of experience, and comes from a top company. But two team members who had coffee chats reported "something felt off" — they can\'t pinpoint what. Candidate B scored well (top 20%) and everyone loved working with them during the trial task.',
    question: 'Who do you hire?',
    options: ['Candidate A — technical skill is what matters', 'Candidate B — team fit wins in the long run', 'Bring A back for another round to investigate', 'Keep searching for someone who has both'],
    sihre_answer: 2,
    bridge: 'In trading, this is like taking a setup with a perfect technical score but ignoring the "gut feeling" that something about the context is wrong — a weak signal that experienced traders learn to respect.',
    reasoning: [
      { type: 'Statistical', color: '#3b82f6', says: 'Technical score is measurable and A is clearly stronger. But research shows team cohesion explains 3x more variance in project outcomes than individual technical ability. The data doesn\'t support "best coder = best hire."' },
      { type: 'Behavioral', color: '#8b5cf6', says: '"Something felt off" is a pattern-match signal from experienced people who have seen enough colleagues to develop intuition. Dismissing it because it\'s not quantified is itself a bias — the bias toward what\'s measurable.' },
      { type: 'Adversarial', color: '#ef4444', says: 'Challenge the A case: prestige company + high score could mean excellent at interviewing but difficult to work with. Challenge the B case: "everyone loved them" could mean agreeable but won\'t push back when needed. Both deserve scrutiny.' },
      { type: 'Uncertainty', color: '#f59e0b', says: 'The "something off" signal is low-resolution but potentially high-information. One more data point could confirm or dismiss it. Cost of another interview: a few hours. Cost of a bad hire: months of damage.' },
      { type: 'Orchestrator', color: '#fbbf24', says: 'Investigate before committing. When you have a weak but potentially critical signal, the rational move is to increase resolution — not to ignore it or over-weight it. One more structured conversation with A, specifically probing collaboration style, costs almost nothing compared to the cost of getting this wrong.' },
    ]},
  { id: 'weather', title: 'The Outdoor Wedding', icon: '\u{26C5}',
    desc: 'You\'re planning a friend\'s outdoor wedding for Saturday. Three weather models disagree: Model A says sunny (65% confidence), Model B says afternoon thunderstorms (70% confidence), Model C says overcast but dry (55% confidence). The indoor backup costs $3,000 extra and must be decided by Thursday.',
    question: 'What do you recommend?',
    options: ['Go outdoor — Model A is the most optimistic', 'Book the indoor backup — can\'t risk a wedding', 'Check which model has been most accurate for this region recently', 'Go outdoor but arrange a 30-minute emergency tent plan'],
    sihre_answer: 2,
    bridge: 'In trading, this is like averaging conflicting indicators instead of asking which one has the best track record for THIS specific market condition — and whether the cost of being wrong is symmetric.',
    reasoning: [
      { type: 'Statistical', color: '#3b82f6', says: 'Averaging the three models gives roughly 60% chance of usable weather. But model averaging only works if the models are independent — if they share the same satellite data, their errors are correlated and averaging gives false confidence.' },
      { type: 'Contextual', color: '#8b5cf6', says: 'Which model has the best track record for THIS region, THIS season, THIS type of weather pattern? A model that\'s 70% confident but historically poor at predicting afternoon convective storms in your area should be weighted very differently.' },
      { type: 'Risk-Adjusted', color: '#f59e0b', says: 'The asymmetry matters enormously. Upside of outdoor: save $3K. Downside of outdoor gone wrong: ruined wedding, permanent memory, damaged friendship. This is not a symmetric bet — not even close.' },
      { type: 'Meta-Reasoning', color: '#10b981', says: 'The question isn\'t "what will the weather be?" It\'s "which forecaster do I trust MOST given these specific conditions?" This is the orchestration problem — choosing which expert to listen to, not averaging all of them.' },
      { type: 'Orchestrator', color: '#fbbf24', says: 'Check regional model accuracy first. If Model B (thunderstorms) has been the most accurate for afternoon convective activity in this area, its 70% confidence should dominate despite A\'s optimism. And given the cost asymmetry, you need HIGH confidence to go outdoor — not just marginal probability.' },
    ]},
  { id: 'cooking', title: 'The Unfamiliar Ingredient', icon: '\u{1F372}',
    desc: 'You\'re making your signature chili for a dinner party. Your usual dried chilies are out of stock. The store has three alternatives you\'ve never cooked with: Ancho (mild, sweet, smoky), Guajillo (medium, fruity, tangy), Habanero (extremely hot, fruity). Guests have varying spice tolerances.',
    question: 'Which chili do you choose?',
    options: ['Habanero — go bold, it\'s your signature dish', 'Ancho — play it safe with the mildest option', 'Guajillo — it\'s the middle ground', 'Buy all three and test small batches first'],
    sihre_answer: 3,
    bridge: 'In trading, this is the "paper trade before going live" principle. When you\'ve never tested a strategy in these conditions and the stakes are high, the rational move is to test small before committing.',
    reasoning: [
      { type: 'Statistical', color: '#3b82f6', says: 'Without personal experience cooking with ANY of these, your confidence in any choice should be low. Reading a label is not the same as tasting the result. You have zero data points.' },
      { type: 'Contextual', color: '#8b5cf6', says: '"Guests with varying spice tolerances" is a hard constraint that Habanero violates outright. "Signature dish" means quality expectations are high — a mediocre adaptation is worse than openly changing the recipe.' },
      { type: 'Adversarial', color: '#ef4444', says: '"Play it safe" (Ancho) might make it bland. "Middle ground" (Guajillo) is guessing based on a description, not experience. Going bold with an unknown ingredient at a dinner party is gambling with your reputation.' },
      { type: 'Uncertainty', color: '#f59e0b', says: 'When uncertainty is high and the cost of testing is low relative to the cost of failure, always test first. 30 minutes and a few dollars for test batches vs. a ruined dinner party. The math is obvious.' },
      { type: 'Orchestrator', color: '#fbbf24', says: 'Buy all three, make small test batches, taste, then decide. Reduce uncertainty before committing. This principle — test small, then scale — applies whether you\'re cooking, hiring, investing, or making any irreversible high-stakes decision.' },
    ]},
];

/* ═══ NON-TRADING SIMULATOR (Soccer Match Management) ═══ */
var SIM_STEPS = [
  { title: 'Pre-Match Lineup',
    situation: 'Cup semi-final. Your fastest winger has been in incredible form (4 goals in 3 games) but picked up a minor knock in training yesterday — he says he\'s "90% fit." Your backup is solid but slower. The opponent plays with aggressive full-backs who leave space in behind.',
    question: 'Do you start the injured winger?',
    options: [
      { label: 'Start him — form is temporary, ride it', score: 2 },
      { label: 'Start the backup, save the winger for second half', score: 4 },
      { label: 'Start him but plan to sub at 60 minutes', score: 3 },
      { label: 'Leave him out entirely — don\'t risk aggravating the injury', score: 1 },
    ],
    sihre_choice: 1,
    sihre_reasoning: 'A "90% fit" player in a high-intensity cup match is a compounding risk. If his knock worsens at minute 20, you\'ve lost a substitution AND your best player for the final. Starting the backup preserves the winger as a second-half weapon when opponents tire — and their aggressive full-backs will leave even more space in the second half.',
  },
  { title: 'First-Half Tactical Adjustment',
    situation: 'It\'s the 25th minute, you\'re 0-0. Your midfield is being overrun — the opponent has 62% possession and has had 3 shots on target. Your centre-back is winning every aerial duel but your full-backs are being beaten one-on-one repeatedly.',
    question: 'How do you adjust?',
    options: [
      { label: 'Switch to 3 centre-backs to shore up defence', score: 3 },
      { label: 'Push higher — attack is the best defence', score: 1 },
      { label: 'Tell full-backs to sit deeper and concede width', score: 4 },
      { label: 'No change — it\'s still 0-0, don\'t overreact', score: 2 },
    ],
    sihre_choice: 2,
    sihre_reasoning: 'The data is clear: full-backs are the weak point, not the centre. A formation change at 25 minutes is a high-disruption move for a problem that has a simpler solution — instruct full-backs to hold position and let the midfield cover the width. This is a minimal intervention that addresses the specific failure without destabilizing the whole system.',
  },
  { title: 'Half-Time Strategy',
    situation: 'Half-time: still 0-0, but the opponent\'s key playmaker picked up a yellow card and is playing cautiously. Your team created 2 good chances in the last 10 minutes as the opponent tired. Your winger (on the bench) is now fully warmed up.',
    question: 'What\'s your half-time message?',
    options: [
      { label: 'Bring on the winger now — momentum is shifting', score: 2 },
      { label: 'Keep the same team — they\'re growing into the game', score: 4 },
      { label: 'Bring on the winger AND make a formation change', score: 1 },
      { label: 'Wait until 60 minutes, then bring the winger on fresh', score: 3 },
    ],
    sihre_choice: 1,
    sihre_reasoning: 'The team is improving with the current setup — momentum is building, the opponent\'s playmaker is constrained by his yellow card. Changing what\'s working introduces unnecessary risk. The winger\'s impact will be maximized at 60-65 minutes when opponents are fatigued and the space behind their full-backs opens up further.',
  },
  { title: 'Critical Moment',
    situation: 'Minute 55: you score! 1-0. The opponent immediately pushes numbers forward. Your backup winger (who\'s been solid) looks tired. The fresh winger is ready. But you also notice the opponent\'s centre-backs are now pushing high, leaving massive space on the counter.',
    question: 'What do you do?',
    options: [
      { label: 'Sub in the winger now — exploit the space', score: 4 },
      { label: 'Wait 5 more minutes to see if the pressure fades', score: 2 },
      { label: 'Sub in a defensive midfielder instead — protect the lead', score: 1 },
      { label: 'Sub in the winger for a midfielder — go for the kill', score: 3 },
    ],
    sihre_choice: 0,
    sihre_reasoning: 'Three signals converge: (1) your backup is tiring, (2) the winger is fresh and fast, (3) the opponent\'s high line creates exactly the space your winger exploits best. This is the moment you saved him for. A like-for-like substitution that addresses fatigue while exploiting a tactical opportunity — maximum impact, minimum disruption.',
  },
  { title: 'Post-Match Analysis',
    situation: 'Final score: 2-0. Your substitute winger scored the second goal on the counter in the 78th minute, exactly as planned. The team held firm defensively throughout.',
    question: 'What\'s the main takeaway?',
    options: [
      { label: 'I should always save my best players for the second half', score: 1 },
      { label: 'The process worked — decisions were based on context, not emotion', score: 4 },
      { label: 'We got lucky — the opponent should have scored in the first half', score: 2 },
      { label: 'The tactical adjustment at 25 minutes was the key moment', score: 3 },
    ],
    sihre_choice: 1,
    sihre_reasoning: 'The outcome validated the process, but the process is what matters — not this specific outcome. Each decision was made by weighing multiple factors (fitness data, tactical context, opponent behaviour, timing, risk asymmetry) rather than following a single rule. Next match, the right answer might be completely different — but the reasoning framework stays the same.',
  },
];

/* ═══ BONUS: PASSWORD-LOCKED NQ TRADING SCENARIO ═══ */
var NQ_SCENARIO = {
  id: 'nq_live', title: 'NQ Live Session — NY AM Open', icon: '\u{1F4C8}',
  desc: 'It\'s 9:32 AM ET. NQ swept the overnight low at 19,240 during the first 2 minutes of the NY session. A 3-candle displacement just printed on the 5-minute chart, leaving a fair value gap between 19,260 and 19,275. Price is retracing toward the gap. The daily bias is bullish (higher timeframe order block respected). Volume is 40% above average for this time.',
  question: 'What\'s your play?',
  options: [
    'Enter long at FVG fill (19,265) — sweep + displacement + HTF alignment',
    'Wait for a 1-minute bullish reaction inside the FVG before entering',
    'Skip — it\'s the first 5 minutes, too much noise',
    'Enter long but at half size — the setup is valid but timing is aggressive',
  ],
  sihre_answer: 1,
  reasoning: [
    { type: 'Statistical', color: '#3b82f6', says: 'Overnight low sweeps followed by displacement within the first 5 minutes have a 61% continuation rate in NQ when daily bias is aligned. However, entries in the first 3 minutes have 22% more adverse excursion than entries after a 1-minute confirmation.' },
    { type: 'Structural', color: '#8b5cf6', says: 'The setup is textbook: liquidity sweep → displacement → FVG → retrace. All boxes checked. But the FVG formed during the most volatile period of the session — its reliability as a support zone is lower than an FVG formed during established price delivery.' },
    { type: 'Regime-Aware', color: '#10b981', says: 'Current regime: expansion out of overnight consolidation. This is a high-conviction regime for continuation trades. However, the first 5 minutes often produce false signals that reverse by 9:45 AM.' },
    { type: 'Risk-Adjusted', color: '#f59e0b', says: 'Conviction score is 0.58 — above the minimum threshold but below the "full size" threshold of 0.70. A 1-minute bullish reaction inside the FVG would raise conviction to ~0.72 by confirming buy-side interest at this level.' },
    { type: 'Orchestrator', color: '#fbbf24', says: 'Wait for the 1-minute confirmation. The setup is structurally valid and the daily bias supports it, but the timing (first 5 minutes) adds noise. A brief patience window (watching for a bullish reaction candle inside the FVG) costs almost nothing in terms of missed entry but significantly increases the probability of the trade working. The difference between a good trade and a great trade is often 60 seconds of patience.' },
  ],
};

/* ═══ PASSWORD GATE ═══ */
var GATE_PASSWORD = 'neurospect2026';

function PasswordGate({ children }) {
  var stored = React.useState(function() {
    try { return sessionStorage.getItem('nf_auth') === 'true'; } catch(e) { return false; }
  });
  var authed = stored[0], setAuthed = stored[1];
  var inputState = React.useState('');
  var pw = inputState[0], setPw = inputState[1];
  var errorState = React.useState(false);
  var error = errorState[0], setError = errorState[1];

  function handleSubmit(e) {
    e.preventDefault();
    if (pw.toLowerCase().trim() === GATE_PASSWORD) {
      setAuthed(true);
      try { sessionStorage.setItem('nf_auth', 'true'); } catch(e) {}
    } else {
      setError(true);
      setTimeout(function() { setError(false); }, 2000);
    }
  }

  if (authed) return children;

  return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <div className="card card-sihre sihre-glow" style={{ maxWidth: 420, width: '100%', padding: '2rem', textAlign: 'center' }}>
        <div className="sihre-ring" style={{ margin: '0 auto 16px' }}>
          <span style={{ fontFamily: 'var(--font-h)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--gold-400)' }}>N</span>
        </div>
        <h2 style={{ fontSize: '1.1rem', marginBottom: 6 }}><span className="grad-text-gold">NeuroFusion</span></h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-m)', marginBottom: 20, lineHeight: 1.6 }}>
          This section contains proprietary research.<br />Enter the access code to continue.
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
          <input
            type="password"
            value={pw}
            onChange={function(e) { setPw(e.target.value); }}
            placeholder="Access code"
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 10,
              border: '1px solid ' + (error ? 'rgba(239,68,68,0.5)' : 'var(--border)'),
              background: 'var(--surface)', color: 'var(--text-h)',
              fontFamily: 'var(--font-m)', fontSize: '0.85rem',
              outline: 'none', transition: 'border-color 0.2s',
            }}
          />
          <button type="submit" className="btn btn-gold btn-sm">Enter</button>
        </form>
        {error && <p style={{ fontSize: '0.72rem', color: '#ef4444', marginTop: 8 }}>Incorrect code. Try again.</p>}
        <p style={{ fontSize: '0.65rem', color: 'var(--text-d)', marginTop: 16 }}>
          Request access at <a href="#pricing" style={{ color: 'var(--gold-400)' }}>the waitlist</a> or visit <a href="https://sihre.ai" target="_blank" rel="noopener" style={{ color: 'var(--gold-400)' }}>sihre.ai</a>
        </p>
      </div>
    </div>
  );
}

/* ═══ NQ SCENARIO CARD ═══ */
function NqScenarioCard() {
  var ansState = React.useState(null);
  var answer = ansState[0], setAnswer = ansState[1];
  var revState = React.useState(false);
  var isRevealed = revState[0], setRevealed = revState[1];
  var s = NQ_SCENARIO;
  var isCorrect = answer === s.sihre_answer;

  return (
    <div className="card card-sihre" style={{ borderLeftWidth: 3, borderLeftColor: 'var(--gold-400)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: '1rem' }}>{s.icon}</span>
        <strong style={{ fontSize: '0.9rem', color: 'var(--gold-300)' }}>{s.title}</strong>
        {isRevealed && (
          <span className={'badge ' + (isCorrect ? 'badge-green' : 'badge-blue')} style={{ fontSize: '0.5rem', padding: '1px 6px' }}>
            {isCorrect ? 'Aligned' : 'Diverged'}
          </span>
        )}
      </div>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-b)', lineHeight: 1.6, marginBottom: 14, padding: '10px 14px', borderRadius: 8, background: 'rgba(59,130,246,0.04)', borderLeft: '2px solid rgba(59,130,246,0.2)' }}>
        {s.desc}
      </p>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-h)', marginBottom: 10, fontWeight: 600 }}>{s.question}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
        {s.options.map(function(opt, oi) {
          var isSelected = answer === oi;
          var isSihre = isRevealed && oi === s.sihre_answer;
          var borderCol = isSihre ? 'rgba(251,191,36,0.5)' : isSelected ? 'var(--border-hover)' : 'var(--border)';
          var bgCol = isSihre ? 'rgba(251,191,36,0.06)' : isSelected ? 'rgba(59,130,246,0.08)' : 'transparent';
          return (
            <div key={oi}
              onClick={function() { if (!isRevealed) setAnswer(oi); }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, border: '1px solid ' + borderCol, background: bgCol, cursor: isRevealed ? 'default' : 'pointer', transition: 'all 0.2s' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid ' + (isSelected ? 'var(--blue-400)' : isSihre ? 'var(--gold-400)' : 'var(--border)'), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {isSelected && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--blue-400)' }}></div>}
                {isSihre && !isSelected && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--gold-400)' }}></div>}
              </div>
              <span style={{ fontSize: '0.82rem', color: isSihre ? 'var(--gold-300)' : isSelected ? 'var(--text-h)' : 'var(--text-b)' }}>{opt}</span>
              {isSihre && <span className="badge badge-gold" style={{ fontSize: '0.5rem', padding: '1px 5px', marginLeft: 'auto' }}>SIHRE</span>}
            </div>
          );
        })}
      </div>
      {answer != null && !isRevealed && (
        <button className="btn btn-gold btn-sm" onClick={function() { setRevealed(true); }}>Reveal Multi-Signal Reasoning</button>
      )}
      {isRevealed && (
        <div style={{ marginTop: 4 }}>
          <span className="label" style={{ color: 'var(--gold-400)', marginBottom: 10, display: 'block' }}>How SIHRE approaches this NQ setup</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {s.reasoning.map(function(r, ri) {
              var isOrch = r.type === 'Orchestrator';
              return (
                <div key={ri} style={{ padding: '10px 14px', borderRadius: 10, background: isOrch ? 'rgba(251,191,36,0.06)' : 'rgba(59,130,246,0.03)', borderLeft: '3px solid ' + r.color }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, boxShadow: '0 0 6px ' + r.color + '50' }}></span>
                    <strong style={{ fontSize: '0.72rem', color: r.color, fontFamily: 'var(--font-m)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{r.type}</strong>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: isOrch ? 'var(--gold-300)' : 'var(--text-b)', lineHeight: 1.55, fontWeight: isOrch ? 500 : 400 }}>{r.says}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══ NEUROFUSION PAGE ═══ */
function NeuroFusionPage() {
  var scenarioState = React.useState(null);
  var openScenario = scenarioState[0], setOpenScenario = scenarioState[1];
  var answersState = React.useState({});
  var answers = answersState[0], setAnswers = answersState[1];
  var revealedState = React.useState({});
  var revealed = revealedState[0], setRevealed = revealedState[1];

  var simState = React.useState(0);
  var simStep = simState[0], setSimStep = simState[1];
  var simAnswersState = React.useState([]);
  var simAnswers = simAnswersState[0], setSimAnswers = simAnswersState[1];
  var simDoneState = React.useState(false);
  var simDone = simDoneState[0], setSimDone = simDoneState[1];
  var simRevealState = React.useState(false);
  var simReveal = simRevealState[0], setSimReveal = simRevealState[1];

  function selectAnswer(scenarioId, optionIdx) {
    var next = Object.assign({}, answers);
    next[scenarioId] = optionIdx;
    setAnswers(next);
  }
  function revealReasoning(scenarioId) {
    var next = Object.assign({}, revealed);
    next[scenarioId] = true;
    setRevealed(next);
  }
  function selectSimAnswer(optionIdx) {
    var next = simAnswers.concat([optionIdx]);
    setSimAnswers(next);
    if (next.length >= SIM_STEPS.length) {
      setSimDone(true);
    } else {
      setSimStep(simStep + 1);
    }
  }
  function resetSim() {
    setSimStep(0);
    setSimAnswers([]);
    setSimDone(false);
    setSimReveal(false);
  }

  var simScore = 0;
  var simSihreScore = 0;
  simAnswers.forEach(function(a, i) {
    simScore += SIM_STEPS[i].options[a].score;
    simSihreScore += SIM_STEPS[i].options[SIM_STEPS[i].sihre_choice].score;
  });

  return (
    <PasswordGate>
    <div className="page">
      {/* Hero */}
      <Rv>
        <div className="hero-grad" style={{ padding: 'clamp(2rem,4vw,3rem)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span className="badge badge-gold"><span className="badge-dot"></span>Patent Pending</span>
            <span className="badge badge-gold" style={{ background: 'rgba(251,191,36,0.15)' }}>v0.1</span>
          </div>
          <h1 style={{ marginBottom: 12 }}>
            <span className="grad-text-gold">NeuroFusion</span>
          </h1>
          <p style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 500, fontSize: '0.85rem', color: 'var(--gold-400)', letterSpacing: '0.06em', marginBottom: 8 }}>
            SELF-IMPROVING HETEROGENEOUS REASONING ENSEMBLE (SIHRE)
          </p>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-b)', maxWidth: 560, lineHeight: 1.7, marginBottom: 24 }}>
            A proprietary AI architecture that fuses fundamentally different types of intelligence into a unified reasoning system. Not a bigger model — a new kind of model.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="https://sihre.ai" target="_blank" rel="noopener" className="btn btn-gold btn-sm">Learn more at sihre.ai</a>
            <button className="btn btn-ghost btn-sm" onClick={function() { document.getElementById('sihre-whitepaper').scrollIntoView({ behavior: 'smooth' }); }}>Download Whitepaper</button>
          </div>
        </div>
      </Rv>

      {/* Whitepaper download */}
      <Rv delay={60}>
        <div id="sihre-whitepaper" className="card card-sihre" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: '1.5rem' }}>&#128220;</span>
                <h3 style={{ fontSize: '1rem', color: 'var(--gold-300)' }}>SIHRE Whitepaper</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.6, marginBottom: 6 }}>
                <em>Meta-Orchestrated Heterogeneous Reasoning for Adaptive Intelligence Under Non-Stationarity</em>
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-m)', lineHeight: 1.5, marginBottom: 12 }}>
                By Paul Russell (chartShooter) &middot; v0.1 &middot; May 2026
              </p>
              <a href="#pricing" className="btn btn-gold btn-sm">
                &#128196; Request Whitepaper (PDF)
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['Architecture overview', 'Signal fusion design', 'Governance framework', 'Domain applications', 'Competitive analysis'].map(function(item) {
                return <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem' }}>
                  <span style={{ color: 'var(--gold-400)', fontSize: '0.5rem' }}>{'●'}</span>
                  <span style={{ color: 'var(--text-m)' }}>{item}</span>
                </div>;
              })}
            </div>
          </div>
        </div>
      </Rv>

      {/* Disclaimer */}
      <Rv delay={80}>
        <div className="card" style={{ marginBottom: '1.5rem', borderColor: 'rgba(251,191,36,0.15)', padding: '1rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ fontSize: '0.9rem', marginTop: 1 }}>&#9888;&#65039;</span>
            <div>
              <strong style={{ fontSize: '0.82rem', color: 'var(--text-h)', display: 'block', marginBottom: 4 }}>Proprietary Technology</strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-m)', lineHeight: 1.6 }}>
                NeuroFusion and the SIHRE architecture are proprietary technologies with a patent pending. The examples below use <em>everyday scenarios</em> to illustrate how multi-signal reasoning works at a conceptual level — they do not reveal the underlying architecture. For detailed technical information, visit <a href="https://sihre.ai" target="_blank" rel="noopener" style={{ color: 'var(--gold-400)' }}>sihre.ai</a> or request the whitepaper above.
              </p>
            </div>
          </div>
        </div>
      </Rv>

      {/* Interactive reasoning examples */}
      <Rv delay={100}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 6 }}>How Does Multi-Signal Reasoning Work?</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-m)', marginBottom: 16, maxWidth: 560, lineHeight: 1.6 }}>
            Start with decisions you already understand. These everyday scenarios use the exact same reasoning principles that SIHRE applies — pick your answer, then see how multiple types of intelligence approach the same problem.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {REASONING_SCENARIOS.map(function(s, idx) {
              var isOpen = openScenario === s.id;
              var userAnswer = answers[s.id];
              var isRevealed = revealed[s.id];
              var isCorrect = userAnswer === s.sihre_answer;

              return (
                <Rv key={s.id} delay={idx * 30}>
                  <div className={'card ' + (isOpen ? 'card-active' : '')}
                    style={{ cursor: 'pointer', borderLeftWidth: 3, borderLeftColor: isOpen ? 'var(--gold-400)' : 'rgba(251,191,36,0.1)' }}
                    onClick={function() { if (!isOpen) setOpenScenario(s.id); }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                      onClick={function(e) { if (isOpen) { e.stopPropagation(); setOpenScenario(null); } }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: '1rem' }}>{s.icon}</span>
                        <div>
                          <strong style={{ fontSize: '0.85rem', color: isOpen ? 'var(--gold-300)' : 'var(--text-h)' }}>{s.title}</strong>
                          {isRevealed != null && userAnswer != null && isRevealed && (
                            <span className={'badge ' + (isCorrect ? 'badge-green' : 'badge-blue')} style={{ marginLeft: 8, fontSize: '0.5rem', padding: '1px 6px' }}>
                              {isCorrect ? 'Aligned' : 'Diverged'}
                            </span>
                          )}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-d)', transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', fontFamily: 'var(--font-m)', cursor: 'pointer' }}>{'▼'}</span>
                    </div>

                    <div style={{ maxHeight: isOpen ? 3000 : 0, overflow: 'hidden', transition: 'max-height 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
                      <div style={{ paddingTop: 16 }} onClick={function(e) { e.stopPropagation(); }}>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-b)', lineHeight: 1.6, marginBottom: 14, padding: '10px 14px', borderRadius: 8, background: 'rgba(59,130,246,0.04)', borderLeft: '2px solid rgba(59,130,246,0.2)' }}>
                          {s.desc}
                        </p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-h)', marginBottom: 10, fontWeight: 600 }}>{s.question}</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                          {s.options.map(function(opt, oi) {
                            var isSelected = userAnswer === oi;
                            var isSihre = isRevealed && oi === s.sihre_answer;
                            var borderCol = isSihre ? 'rgba(251,191,36,0.5)' : isSelected ? 'var(--border-hover)' : 'var(--border)';
                            var bgCol = isSihre ? 'rgba(251,191,36,0.06)' : isSelected ? 'rgba(59,130,246,0.08)' : 'transparent';
                            return (
                              <div key={oi}
                                onClick={function() { if (!isRevealed) selectAnswer(s.id, oi); }}
                                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, border: '1px solid ' + borderCol, background: bgCol, cursor: isRevealed ? 'default' : 'pointer', transition: 'all 0.2s' }}>
                                <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid ' + (isSelected ? 'var(--blue-400)' : isSihre ? 'var(--gold-400)' : 'var(--border)'), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                                  {isSelected && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--blue-400)' }}></div>}
                                  {isSihre && !isSelected && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--gold-400)' }}></div>}
                                </div>
                                <span style={{ fontSize: '0.82rem', color: isSihre ? 'var(--gold-300)' : isSelected ? 'var(--text-h)' : 'var(--text-b)' }}>{opt}</span>
                                {isSihre && <span className="badge badge-gold" style={{ fontSize: '0.5rem', padding: '1px 5px', marginLeft: 'auto' }}>SIHRE</span>}
                              </div>
                            );
                          })}
                        </div>

                        {userAnswer != null && !isRevealed && (
                          <button className="btn btn-gold btn-sm" onClick={function() { revealReasoning(s.id); }}>
                            Reveal Multi-Signal Reasoning
                          </button>
                        )}

                        {isRevealed && (
                          <div style={{ marginTop: 4 }}>
                            <span className="label" style={{ color: 'var(--gold-400)', marginBottom: 10, display: 'block' }}>How multiple types of intelligence approach this</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                              {s.reasoning.map(function(r, ri) {
                                var isOrch = r.type === 'Orchestrator';
                                return (
                                  <div key={ri} style={{ padding: '10px 14px', borderRadius: 10, background: isOrch ? 'rgba(251,191,36,0.06)' : 'rgba(59,130,246,0.03)', borderLeft: '3px solid ' + r.color }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, boxShadow: '0 0 6px ' + r.color + '50' }}></span>
                                      <strong style={{ fontSize: '0.72rem', color: r.color, fontFamily: 'var(--font-m)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{r.type}</strong>
                                    </div>
                                    <p style={{ fontSize: '0.78rem', color: isOrch ? 'var(--gold-300)' : 'var(--text-b)', lineHeight: 1.55, fontWeight: isOrch ? 500 : 400 }}>{r.says}</p>
                                  </div>
                                );
                              })}
                            </div>
                            {/* Bridge callout */}
                            <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(251,191,36,0.04)', borderLeft: '3px solid rgba(251,191,36,0.25)' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                <span style={{ fontSize: '0.75rem' }}>&#128200;</span>
                                <span style={{ fontSize: '0.65rem', color: 'var(--gold-400)', fontFamily: 'var(--font-m)', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>Trading parallel</span>
                              </div>
                              <p style={{ fontSize: '0.75rem', color: 'var(--text-m)', lineHeight: 1.55, fontStyle: 'italic' }}>{s.bridge}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Rv>
              );
            })}
          </div>
        </div>
      </Rv>

      {/* NQ Trading Scenario — bonus */}
      <Rv delay={110}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 6 }}>Now Apply It to a Real Market</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-m)', marginBottom: 16, maxWidth: 560, lineHeight: 1.6 }}>
            Same reasoning framework, applied to a live NQ futures scenario. See how multi-signal intelligence handles a real trading decision.
          </p>
          <NqScenarioCard />
        </div>
      </Rv>

      {/* Simulator */}
      <Rv delay={120}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 6 }}>Multi-Signal Reasoning Simulator</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-m)', marginBottom: 16, maxWidth: 560, lineHeight: 1.6 }}>
            Manage a full soccer match from pre-game to post-match. Make decisions at each stage, then compare your reasoning against a multi-signal approach. Same principles, different domain.
          </p>

          {!simDone ? (
            <div className="card card-sihre" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                {SIM_STEPS.map(function(_, i) {
                  var done = i < simStep;
                  var active = i === simStep;
                  return (
                    <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: done ? 'var(--gold-400)' : active ? 'rgba(251,191,36,0.3)' : 'rgba(251,191,36,0.08)', transition: 'background 0.3s' }}></div>
                  );
                })}
                <span style={{ fontSize: '0.65rem', color: 'var(--text-d)', fontFamily: 'var(--font-m)', flexShrink: 0 }}>{simStep + 1}/{SIM_STEPS.length}</span>
              </div>

              <div style={{ marginBottom: 6 }}>
                <span className="label" style={{ color: 'var(--gold-400)' }}>{'Stage ' + (simStep + 1)}</span>
              </div>
              <h3 style={{ fontSize: '1rem', marginBottom: 10, color: 'var(--gold-300)' }}>{SIM_STEPS[simStep].title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-b)', lineHeight: 1.65, marginBottom: 16, padding: '10px 14px', borderRadius: 8, background: 'rgba(59,130,246,0.04)', borderLeft: '2px solid rgba(59,130,246,0.2)' }}>
                {SIM_STEPS[simStep].situation}
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-h)', marginBottom: 12, fontWeight: 600 }}>{SIM_STEPS[simStep].question}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {SIM_STEPS[simStep].options.map(function(opt, oi) {
                  return (
                    <button key={oi}
                      onClick={function() { selectSimAnswer(oi); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', color: 'var(--text-b)', fontSize: '0.85rem' }}
                      onMouseOver={function(e) { e.currentTarget.style.borderColor = 'rgba(251,191,36,0.3)'; e.currentTarget.style.background = 'rgba(251,191,36,0.04)'; }}
                      onMouseOut={function(e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; }}>
                      <span style={{ width: 24, height: 24, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.15)', fontFamily: 'var(--font-m)', fontSize: '0.65rem', color: 'var(--gold-400)', flexShrink: 0 }}>{String.fromCharCode(65 + oi)}</span>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="card card-sihre" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: 16, color: 'var(--gold-300)' }}>Match Complete</h3>

              <div className="bento bento-2" style={{ marginBottom: 20 }}>
                <div className="card" style={{ textAlign: 'center', borderColor: 'var(--border-hover)' }}>
                  <span className="label" style={{ marginBottom: 6, display: 'block' }}>Your Score</span>
                  <div className="mono" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--blue-400)' }}>{simScore}</div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-d)' }}>out of {SIM_STEPS.length * 4}</span>
                </div>
                <div className="card" style={{ textAlign: 'center', borderColor: 'var(--border-gold)' }}>
                  <span className="label" style={{ color: 'var(--gold-400)', marginBottom: 6, display: 'block' }}>Multi-Signal Score</span>
                  <div className="mono" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--gold-400)' }}>{simSihreScore}</div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-d)' }}>out of {SIM_STEPS.length * 4}</span>
                </div>
              </div>

              <div style={{ marginBottom: 16, padding: '12px 16px', borderRadius: 10, background: 'rgba(251,191,36,0.04)', borderLeft: '3px solid var(--gold-400)' }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-b)', lineHeight: 1.6, marginBottom: 8 }}>
                  {simScore >= simSihreScore
                    ? 'Impressive — your match management aligned with multi-signal reasoning. You naturally weigh context, timing, and risk asymmetry.'
                    : simScore >= simSihreScore - 3
                    ? 'Close match. Your instincts are strong. The gaps are in the places where context, timing, or risk asymmetry shift the optimal decision.'
                    : 'This is exactly why multi-signal reasoning exists — it catches the contextual nuances that single-mode thinking misses.'}
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-m)', lineHeight: 1.55, fontStyle: 'italic' }}>
                  Now imagine this same reasoning applied to every trading decision — entry, exit, sizing, risk management — with dozens of specialized signals instead of five.
                </p>
              </div>

              {!simReveal ? (
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn-gold btn-sm" onClick={function() { setSimReveal(true); }}>Show Stage-by-Stage Comparison</button>
                  <button className="btn btn-ghost btn-sm" onClick={resetSim}>Play Again</button>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                    {SIM_STEPS.map(function(step, i) {
                      var userOpt = step.options[simAnswers[i]];
                      var sihreOpt = step.options[step.sihre_choice];
                      var match = simAnswers[i] === step.sihre_choice;
                      return (
                        <div key={i} className="card" style={{ borderLeftWidth: 3, borderLeftColor: match ? '#10b981' : 'var(--gold-400)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <span className="label" style={{ color: match ? '#10b981' : 'var(--gold-400)' }}>{'Stage ' + (i + 1) + ': ' + step.title}</span>
                            <span className={'badge ' + (match ? 'badge-green' : 'badge-gold')} style={{ fontSize: '0.5rem', padding: '1px 5px' }}>{match ? 'Match' : 'Diverged'}</span>
                          </div>
                          <div className="bento bento-2" style={{ gap: 8, marginBottom: 8 }}>
                            <div style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.1)' }}>
                              <span style={{ fontSize: '0.62rem', color: 'var(--blue-400)', fontFamily: 'var(--font-m)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>You chose</span>
                              <p style={{ fontSize: '0.78rem', color: 'var(--text-b)', marginTop: 2 }}>{userOpt.label}</p>
                            </div>
                            <div style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.1)' }}>
                              <span style={{ fontSize: '0.62rem', color: 'var(--gold-400)', fontFamily: 'var(--font-m)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Multi-Signal</span>
                              <p style={{ fontSize: '0.78rem', color: 'var(--gold-300)', marginTop: 2 }}>{sihreOpt.label}</p>
                            </div>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-m)', lineHeight: 1.55, fontStyle: 'italic' }}>{step.sihre_reasoning}</p>
                        </div>
                      );
                    })}
                  </div>
                  <button className="btn btn-ghost btn-sm" onClick={resetSim}>Play Again</button>
                </div>
              )}
            </div>
          )}
        </div>
      </Rv>

      {/* CTA */}
      <Rv delay={140}>
        <div className="card card-gold" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: 8 }}>Experience NeuroFusion</h2>
          <p style={{ color: 'var(--text-m)', marginBottom: 16, fontSize: '0.88rem' }}>
            Join the waitlist for early access to heterogeneous reasoning — applied to markets.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#pricing" className="btn btn-gold">Join Waitlist</a>
            <a href="https://sihre.ai" target="_blank" rel="noopener" className="btn btn-ghost">Visit sihre.ai</a>
          </div>
        </div>
      </Rv>
    </div>
    </PasswordGate>
  );
}

window.NeuroFusionPage = NeuroFusionPage;
