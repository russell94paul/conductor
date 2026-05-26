/* NeuroSpect v2 — NeuroFusion-13 Walkthrough Data */

var NF_LAYERS=[
  {n:1,label:'DATA FOUNDATION',color:'#3b82f6',signals:[1,2,3]},
  {n:2,label:'ANALYSIS',color:'#8b5cf6',signals:[4,5,6,7,8,9]},
  {n:3,label:'SYNTHESIS',color:'#f59e0b',signals:[10,11,12]},
  {n:4,label:'META-ORCHESTRATION',color:'#fbbf24',signals:[13]},
];

var NF_SIGNALS=[
  {num:1,name:'Statistical Engine',short:'Statistical',type:'Frequentist inference',layer:1,color:'#3b82f6',
   desc:'Win rate estimation, expected value, base rate priors from historical trade data.',
   verdict:'positive',vLabel:'✅ POSITIVE',rawScore:0.626,baseW:0.82,regW:0.88,t:0,
   details:[['P(win | setup)','0.626'],['P(reach_2R | win)','0.718'],['Expected value','+0.94R'],['95% CI','[0.56, 0.69]']],
   summary:'EV > 0.5R threshold · Large sample (n=187)'},

  {num:2,name:'Structural Analyzer',short:'Structural',type:'Pattern recognition',layer:1,color:'#06b6d4',
   desc:'Multi-timeframe price structure analysis — market structure shifts, swing points, regime classification.',
   verdict:'positive',vLabel:'✅ ALIGNED',rawScore:0.78,baseW:0.75,regW:0.81,t:12,
   details:[['Daily trend','Bullish (HH, HL)'],['4H structure','Bullish (BOS up)'],['1H structure','Bearish→Bullish'],['Alignment','3/4 TFs agree → 0.78']],
   summary:'Multi-TF confirmation · Sweep = potential reversal point'},

  {num:3,name:'Knowledge Graph',short:'Knowledge',type:'Entity-relationship reasoning',layer:1,color:'#10b981',
   desc:'Graph-based reasoning over ICT concepts, price levels, and their relationships.',
   verdict:'positive',vLabel:'✅ HIGH CONFLUENCE',rawScore:0.84,baseW:0.71,regW:0.71,t:28,
   details:[['5838.25 connects to','London low (0.9), Prev NY PM low (0.7)'],['Also connected','4H OB boundary (0.8), Weekly FVG CE (0.6)'],['Confluence depth','4 levels (top 8%)'],['Path score','0.84']],
   summary:'4-level confluence — multi-entity support at this price'},

  {num:4,name:'Semantic Reasoner',short:'Semantic',type:'Natural language understanding',layer:2,color:'#a855f7',
   desc:'Matches current setup against ICT playbook library (36K+ lines) using semantic similarity.',
   verdict:'positive',vLabel:'✅ MATCHES PLAYBOOK',rawScore:0.89,baseW:0.64,regW:0.64,t:45,
   details:[['Best match','ICT 2022 Month 6, Lecture 3'],['Similarity','0.89'],['Alignment','Sweep ✓ Displacement ✓ FVG ✓ Time ✓'],['Deviation','Target: 3R playbook vs 2.5R strategy']],
   summary:'89% match to known London Sweep Model'},

  {num:5,name:'Adversarial Challenger',short:'Adversarial',type:'Contrarian analysis',layer:2,color:'#ef4444',
   desc:'Actively looks for reasons the trade could fail. Checks for trap patterns and false signals.',
   verdict:'caution',vLabel:'⚠ CAUTION',rawScore:0.78,baseW:0.58,regW:0.45,t:62,
   details:[['⚠ Volume concern','Disp volume 1.2× avg (threshold 1.5×)'],['⚠ Overhead FVG','Unfilled at 5855 — potential reversal'],['✓ Sweep depth','3.25 pts sufficient (min 2.0)'],['✓ News clear','No events in next 2 hours']],
   summary:'Volume is below ideal — proceed with reduced size'},

  {num:6,name:'Generative Simulator',short:'Generative',type:'Scenario generation',layer:2,color:'#ec4899',
   desc:'Generates plausible future scenarios from current state + 500 historical analogs.',
   verdict:'positive',vLabel:'✅ POSITIVE EV',rawScore:0.69,baseW:0.69,regW:0.69,t:95,
   details:[['Scenario A (42%)','Price continues to 5852+ (target)'],['Scenario B (24%)','Reaches 5847 then reverses'],['Scenario C (18%)','Chops in FVG range 30+ min'],['Scenario D (11%)','Sharp reversal — new low'],['E[R]','+1.24R (probability-weighted)']],
   summary:'Positive expected value across all scenario weightings'},

  {num:7,name:'Temporal Analyzer',short:'Temporal',type:'Time-series intelligence',layer:2,color:'#14b8a6',
   desc:'Session timing, day-of-week effects, calendar events, cycle positioning.',
   verdict:'positive',vLabel:'✅ OPTIMAL TIMING',rawScore:0.73,baseW:0.73,regW:0.78,t:108,
   details:[['Session progress','38% (optimal: 20–60%)'],['Day of week','Wednesday (2nd best)'],['Calendar','No FOMC/NFP within 48h'],['Time-of-day WR','67% (vs 62.6% all-hours)']],
   summary:'Peak of optimal timing window for London sweeps'},

  {num:8,name:'Uncertainty Quantifier',short:'Uncertainty',type:'Epistemic + aleatoric',layer:2,color:'#f59e0b',
   desc:'Measures what the system knows vs doesn\'t know. Calibrated confidence estimation.',
   verdict:'positive',vLabel:'✅ ACCEPTABLE',rawScore:0.72,baseW:0.81,regW:0.81,t:120,
   details:[['Epistemic (model)','0.18 (LOW)'],['Aleatoric (market)','0.34 (MODERATE)'],['Combined','0.28'],['⚠ Gap','DOM data delayed 2s'],['Calibration','Pred 62% → Actual 61.3%']],
   summary:'Well-calibrated model with minor data gap'},

  {num:9,name:'Meta-Learned Optimizer',short:'Meta-Learn',type:'Learning-to-learn',layer:2,color:'#8b5cf6',
   desc:'Dynamically adjusts signal weights based on recent performance and current regime.',
   verdict:'positive',vLabel:'✅ REGIME FAVORS',rawScore:0.77,baseW:0.77,regW:0.77,t:135,
   details:[['Current regime','TRENDING BULL (3d, conf 0.82)'],['Sig 1 weight','0.82 → 0.88 ↑'],['Sig 2 weight','0.75 → 0.81 ↑'],['Sig 5 weight','0.58 → 0.45 ↓'],['Rationale','Statistical + structural more predictive in trends']],
   summary:'Trending regime boosts this setup\'s historical edge'},

  {num:10,name:'Causal Inference',short:'Causal',type:'Counterfactual reasoning',layer:3,color:'#f97316',
   desc:'Analyzes whether the events leading to this setup are causally linked or coincidental.',
   verdict:'positive',vLabel:'✅ CAUSAL CHAIN',rawScore:0.79,baseW:0.68,regW:0.68,t:155,
   details:[['Chain','Asia low → London liquidity → Sweep → Displacement → FVG'],['Confounders','✓ No news, ✓ No correlated asset moves'],['Volume','Supports intentional activity'],['Causal conf.','0.79']],
   summary:'Sweep→displacement chain is causal, not coincidental'},

  {num:11,name:'Self-Supervised Learner',short:'Self-Supervised',type:'Representation learning',layer:3,color:'#06b6d4',
   desc:'Learns patterns from unlabeled data. Detects anomalies and novel market regimes.',
   verdict:'positive',vLabel:'✅ FAMILIAR',rawScore:0.642,baseW:0.55,regW:0.55,t:170,
   details:[['Novelty score','0.12 (LOW — known pattern)'],['Anomaly','None detected'],['Cluster','#7 of 24 ("Clean ICT London sweep")'],['Cluster WR','64.2%'],['Distance to failure','2.4σ from nearest failure mode']],
   summary:'Well-known pattern type, no anomalies — background validation'},

  {num:12,name:'Evolutionary Optimizer',short:'Evolutionary',type:'Population-based search',layer:3,color:'#84cc16',
   desc:'Checks whether current parameters sit on a fitness plateau (robust) or spike (fragile).',
   verdict:'positive',vLabel:'✅ ROBUST',rawScore:0.75,baseW:0.62,regW:0.62,t:185,
   details:[['Parameters','stop=-2, target=2.5R, min_disp=8'],['Landscape','FITNESS PLATEAU (not spike)'],['Neighbors (±20%)','Produce similar results'],['Parameter drift','< 5% since last check'],['Staleness','LOW']],
   summary:'Parameters are on a robust plateau — not curve-fitted'},
];

/* Signal 13 — computed from above */
var NF_SIG13={num:13,name:'Meta-Orchestrator',short:'Orchestrator',type:'Attention-weighted fusion',layer:4,color:'#fbbf24',
  desc:'Fuses all 12 signal outputs, resolves conflicts, and produces a single actionable recommendation with full audit trail.'};

/* ── Fusion computation ── */
var NF_FUSION_RESULT={
  weightedSum:6.276,weightSum:8.39,confluence:74.8,
  agreeing:11,conflicting:1,conflictSignal:5,
  conflictType:'SOFT DISAGREEMENT',
  resolution:'Reduce size 15%, tighten stop by 1 tick, log volume concern',
};

/* ── Final decision ── */
var NF_DECISION={
  action:'LONG ES',entry:'5842.25',stop:'5837.25',target:'5854.75',
  size:'2 contracts',confluence:74.8,confidence:'HIGH (11/12 agree)',
  uncertainty:'0.28',regime:'Trending Bull',session:'London (38%)',
  risk:'1.0% ($250/ct)',latency:'185ms',audit:'NF-2025-11-14-0314-ES-LONG-001',
};

/* ── Post-trade accuracy ── */
var NF_POST_TRADE=[
  {sig:1,prediction:'62.6% win',actual:'✅ Win',accurate:true,wBefore:0.88,wAfter:0.89},
  {sig:5,prediction:'Volume concern',actual:'Volume was fine',accurate:false,wBefore:0.45,wAfter:0.43},
  {sig:6,prediction:'Scenario A (42%)',actual:'Scenario A occurred',accurate:true,wBefore:0.69,wAfter:0.71},
  {sig:7,prediction:'Optimal timing',actual:'Target in 38 min',accurate:true,wBefore:0.78,wAfter:0.79},
];

/* ── NO TRADE example ── */
var NF_NO_TRADE={
  context:'ES 5856.50, sweep below NY AM low, FVG formed. Looks valid on surface.',
  confluence:41.2,
  conflicts:[
    {sig:5,reason:'Volume profile shows distribution — trap pattern 0.68'},
    {sig:7,reason:'Session 85% through — worst statistical timing window'},
    {sig:8,reason:'3 data feeds stale >10s — uncertainty 0.52 (HIGH)'},
    {sig:10,reason:'Sweep caused by news release, not organic liquidity grab'},
  ],
  agreeing:['Sig 1: 58% win rate','Sig 2: Structure aligned','Sig 4: Matches playbook'],
};

Object.assign(window,{
  NF_LAYERS:NF_LAYERS,NF_SIGNALS:NF_SIGNALS,NF_SIG13:NF_SIG13,
  NF_FUSION_RESULT:NF_FUSION_RESULT,NF_DECISION:NF_DECISION,
  NF_POST_TRADE:NF_POST_TRADE,NF_NO_TRADE:NF_NO_TRADE,
});
