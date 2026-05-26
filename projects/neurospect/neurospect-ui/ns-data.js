/* NeuroSpect — Consolidated Data */

const TRADING_DAYS = ["2026-05-01","2026-05-04","2026-05-05","2026-05-06","2026-05-07","2026-05-08","2026-05-11","2026-05-12","2026-05-13","2026-05-14","2026-05-15","2026-05-18","2026-05-19","2026-05-20","2026-05-21","2026-05-22","2026-05-26","2026-05-27","2026-05-28","2026-05-29"];

const TIER_META = {
  tier1: { name:"Discretionary ICT Trader", short:"Discretionary", color:"#64748b", rgb:"100,116,139" },
  tier2: { name:"Quant Trader", short:"Quant", color:"#8b5cf6", rgb:"139,92,246" },
  tier3: { name:"Hybrid Trader", short:"Hybrid", color:"#06b6d4", rgb:"6,182,212" },
  tier4: { name:"S-Tier Trader", short:"S-Tier", color:"#10b981", rgb:"16,185,129" },
};
const TIER_ORDER = ["tier1","tier2","tier3","tier4"];

const EQUITY_RAW = {
  tier1:[25000,25380,25120,24640,25340,24780,24340,24020,24680,24260,25060,24520,23840,24620,24180,22140,22820,23540,24960,26850],
  tier2:[25000,25320,25540,25260,25640,25380,25620,25340,25700,25420,25880,25560,25100,25520,25320,24080,24640,25280,26340,29900],
  tier3:[25000,25480,25480,25780,26200,25960,26340,26140,26620,26620,27100,26780,26380,26860,26580,25900,26480,27060,28240,32450],
  tier4:[25000,25560,25560,25560,26080,26080,26560,26560,27100,26780,27380,27380,26840,27400,27400,26580,27180,27880,29380,35900],
};

const EQUITY_CURVES = {};
TIER_ORDER.forEach(id => { EQUITY_CURVES[id] = TRADING_DAYS.map((d,i) => ({date:d, equity:EQUITY_RAW[id][i]})); });

const TIER_KPIS = {
  tier1:{label:"Tier 1",netPnl:1850,winRate:0.42,totalTrades:38,profitFactor:1.18,sharpeRatio:0.42,maxDrawdown:3200,executionGrade:"D+",ruleAdherence:0.38,mistakesCount:24,avoidedBadTrades:2},
  tier2:{label:"Tier 2",netPnl:4900,winRate:0.55,totalTrades:24,profitFactor:1.72,sharpeRatio:0.91,maxDrawdown:1800,executionGrade:"B-",ruleAdherence:0.78,mistakesCount:8,avoidedBadTrades:9},
  tier3:{label:"Tier 3",netPnl:7450,winRate:0.62,totalTrades:20,profitFactor:2.41,sharpeRatio:1.38,maxDrawdown:1200,executionGrade:"A-",ruleAdherence:0.88,mistakesCount:4,avoidedBadTrades:14},
  tier4:{label:"Tier 4",netPnl:10900,winRate:0.71,totalTrades:16,profitFactor:4.28,sharpeRatio:2.14,maxDrawdown:820,executionGrade:"A+",ruleAdherence:0.96,mistakesCount:2,avoidedBadTrades:22},
};

const TRADE_MARKERS = [
  {id:"tm-001",date:"2026-05-04",title:"NQ Asia Liquidity Sweep into London Open",session:"London",setupType:"Liquidity Sweep + Displacement + FVG",
   outcomes:{tier1:{pnl:380,result:"win"},tier2:{pnl:320,result:"win"},tier3:{pnl:480,result:"win"},tier4:{pnl:560,result:"win"}}},
  {id:"tm-002",date:"2026-05-06",title:"False MSS on Low Volume — Bull Trap",session:"New York AM",setupType:"Market Structure Shift",
   outcomes:{tier1:{pnl:-280,result:"loss"},tier2:{pnl:0,result:"no_trade"},tier3:{pnl:0,result:"no_trade"},tier4:{pnl:0,result:"no_trade"}}},
  {id:"tm-003",date:"2026-05-08",title:"Order Block Continuation in Trending Session",session:"New York AM",setupType:"Order Block Continuation",
   outcomes:{tier1:{pnl:-310,result:"loss"},tier2:{pnl:-260,result:"loss"},tier3:{pnl:420,result:"win"},tier4:{pnl:520,result:"win"}}},
  {id:"tm-005",date:"2026-05-13",title:"HTF Bias Long with LTF Bullish Entry",session:"New York AM",setupType:"HTF Bias + LTF Entry",
   outcomes:{tier1:{pnl:360,result:"win"},tier2:{pnl:360,result:"win"},tier3:{pnl:480,result:"win"},tier4:{pnl:540,result:"win"}}},
  {id:"tm-006",date:"2026-05-15",title:"Breaker Retest After Trend Reversal",session:"New York PM",setupType:"Breaker Retest",
   outcomes:{tier1:{pnl:800,result:"win"},tier2:{pnl:460,result:"win"},tier3:{pnl:480,result:"win"},tier4:{pnl:600,result:"win"}}},
  {id:"tm-008",date:"2026-05-22",title:"Cascade Selloff — Multiple Bad Entries",session:"New York AM",setupType:"Market Structure Shift",
   outcomes:{tier1:{pnl:-2040,result:"loss"},tier2:{pnl:-1240,result:"loss"},tier3:{pnl:-680,result:"loss"},tier4:{pnl:-820,result:"loss"}}},
  {id:"tm-010",date:"2026-05-29",title:"End-of-Month Session — Multiple A+ Setups",session:"New York AM",setupType:"HTF Bias + LTF Entry",
   outcomes:{tier1:{pnl:1890,result:"win"},tier2:{pnl:3560,result:"win"},tier3:{pnl:4210,result:"win"},tier4:{pnl:6520,result:"win"}}},
];

const DAY_OF_WEEK = {
  tier1:[{day:"Mon",pnl:-120,wr:0.38,trades:8},{day:"Tue",pnl:680,wr:0.50,trades:8},{day:"Wed",pnl:-340,wr:0.33,trades:9},{day:"Thu",pnl:310,wr:0.43,trades:7},{day:"Fri",pnl:1320,wr:0.50,trades:6}],
  tier2:[{day:"Mon",pnl:420,wr:0.50,trades:4},{day:"Tue",pnl:540,wr:0.60,trades:5},{day:"Wed",pnl:1280,wr:0.67,trades:6},{day:"Thu",pnl:860,wr:0.50,trades:4},{day:"Fri",pnl:1800,wr:0.60,trades:5}],
  tier3:[{day:"Mon",pnl:640,wr:0.60,trades:5},{day:"Tue",pnl:1480,wr:0.75,trades:4},{day:"Wed",pnl:980,wr:0.67,trades:3},{day:"Thu",pnl:1240,wr:0.67,trades:3},{day:"Fri",pnl:3110,wr:0.60,trades:5}],
  tier4:[{day:"Mon",pnl:560,wr:0.67,trades:3},{day:"Tue",pnl:1080,wr:0.67,trades:3},{day:"Wed",pnl:980,wr:1.00,trades:2},{day:"Thu",pnl:1760,wr:0.75,trades:4},{day:"Fri",pnl:6520,wr:0.75,trades:4}],
};

const SESSION_DATA = {
  tier1:[{s:"Asia",pnl:-180,wr:0.25},{s:"London",pnl:460,wr:0.43},{s:"NY AM",pnl:1240,wr:0.47},{s:"NY Lunch",pnl:-420,wr:0.29},{s:"NY PM",pnl:750,wr:0.40}],
  tier2:[{s:"Asia",pnl:240,wr:0.50},{s:"London",pnl:680,wr:0.60},{s:"NY AM",pnl:2840,wr:0.58},{s:"NY Lunch",pnl:-160,wr:0.33},{s:"NY PM",pnl:1300,wr:0.50}],
  tier3:[{s:"Asia",pnl:380,wr:1.00},{s:"London",pnl:960,wr:0.67},{s:"NY AM",pnl:4480,wr:0.64},{s:"NY Lunch",pnl:150,wr:0.50},{s:"NY PM",pnl:1480,wr:0.67}],
  tier4:[{s:"Asia",pnl:480,wr:1.00},{s:"London",pnl:560,wr:1.00},{s:"NY AM",pnl:7680,wr:0.73},{s:"NY Lunch",pnl:0,wr:0},{s:"NY PM",pnl:2180,wr:0.67}],
};

const SETUP_PERF = {
  tier1:[{s:"Liq Sweep+Disp+FVG",t:8,wr:0.50,exp:95},{s:"MSS",t:7,wr:0.29,exp:-120},{s:"HTF+LTF",t:6,wr:0.50,exp:82},{s:"OB Continuation",t:6,wr:0.33,exp:-65},{s:"Breaker Retest",t:4,wr:0.50,exp:180}],
  tier4:[{s:"Liq Sweep+Disp+FVG",t:4,wr:1.00,exp:620},{s:"MSS",t:2,wr:0.50,exp:180},{s:"HTF+LTF",t:4,wr:0.75,exp:480},{s:"OB Continuation",t:2,wr:1.00,exp:540},{s:"Breaker Retest",t:2,wr:1.00,exp:600}],
};

const COMPONENTS = [
  {id:"mentor",name:"NeuroSpect Mentor",sub:"AI Coaching",color:"#06b6d4",neon:"neon-card-cyan",
   desc:"Consumer-facing AI coaching with RAG, ICT knowledge, trade journal integration, and source-grounded citations.",
   features:["Pre-trade checklists","Post-session review","Mistake pattern detection","Entry model validation"]},
  {id:"neurocore",name:"NeuroCore",sub:"Knowledge Layer",color:"#8b5cf6",neon:"neon-card-purple",
   desc:"Hybrid 3-signal search: keyword + semantic + entity. Powers coaching RAG and cross-wiki intelligence.",
   features:["36K+ lines indexed","Semantic search","Entity resolution","Citation mapping"]},
  {id:"nslm",name:"NSLM",sub:"Language Model",color:"#f59e0b",neon:"neon-card-amber",
   desc:"ICT-aware LLM family trained on private mentorship content, structured playbooks, and evaluation feedback.",
   features:["Setup grading","Strategy reasoning","Prompt comparison","A/B evaluation"]},
  {id:"edgelab",name:"EdgeLab",sub:"Research Studio",color:"#10b981",neon:"neon-card-emerald",
   desc:"Full-spectrum research environment: event-driven backtesting, quant feature engineering, Monte Carlo simulation, walk-forward optimization, strategy compilation, and experiment registry.",
   features:["Monte Carlo simulation","Walk-forward validation","Feature engineering","Null hypothesis testing","Strategy compiler","Experiment registry"]},
  {id:"neuroquant",name:"NeuroQuant",sub:"Production Models",color:"#ec4899",neon:"neon-card-rose",
   desc:"Validated features and models from EdgeLab. Regime-aware scoring, model ensembles, confluence decisions.",
   features:["Regime detection","Model ensemble","Confluence scoring","Dynamic sizing"]},
  {id:"agent",name:"NeuroTrader",sub:"Trading Agent",color:"#ef4444",neon:"neon-card-red",
   desc:"Automated trading agent with Shadow → Paper → Live progression and 5-layer safety architecture.",
   features:["5-layer safety","Kill switch","Shadow mode","Post-trade analysis"]},
  {id:"livetrading",name:"Live Trading",sub:"Futures Execution",color:"#3b82f6",neon:"neon-card-blue",
   desc:"Professional-grade futures trading terminal. Real-time market data via WebSocket, advanced charting with ICT event overlay, order management, position tracking, and live P&L. Targets CME futures (ES, NQ, CL, GC) via Tradovate API.",
   features:["Real-time charting with ICT overlay","One-click order execution","DOM & depth of market","Position & P&L tracking","Multi-timeframe analysis","Prop Shield enforcement on live orders"]},
  {id:"neurosync",name:"NeuroSync",sub:"Multi-Account Sync",color:"#14b8a6",neon:"neon-card-teal",
   desc:"Intelligent multi-account trade synchronization for prop firm traders. Links multiple funded accounts and executes as one — with per-account risk awareness, proactive rule enforcement, and sub-5ms execution. Not a dumb copier — a compliance-aware execution engine.",
   features:["Prop Shield per-account enforcement","Intelligent position sizing by drawdown room","Pre-trade divergence prevention","ICT-aware execution timing","Per-account P&L + drawdown dashboard","Session lockouts at profit/loss limits","Full audit trail with slippage tracking"]},
  {id:"neurofusion",name:"NeuroFusion-13",sub:"Quant Architecture",color:"#a855f7",neon:"neon-card-violet",
   desc:"13-signal Self-Improving Heterogeneous Reasoning Ensemble (SIHRE). Fuses statistical, semantic, causal, adversarial, generative, and meta-learned reasoning modalities at the reasoning level — not just an ensemble of outputs.",
   features:["13 heterogeneous reasoning signals","Meta-orchestrator (Signal 13)","Reasoning-level fusion","Self-improving feedback loops","Regime-aware adaptation","Audit-ready decision trace"]},
];

const ARCH_CONNECTIONS = [
  {from:"neurocore",to:"mentor",label:"retrieval",color:"#8b5cf6"},
  {from:"nslm",to:"mentor",label:"generation",color:"#f59e0b"},
  {from:"neurocore",to:"edgelab",label:"data",color:"#10b981"},
  {from:"edgelab",to:"nslm",label:"evaluation",color:"#10b981"},
  {from:"edgelab",to:"neuroquant",label:"promotion",color:"#ec4899"},
  {from:"neuroquant",to:"agent",label:"scoring",color:"#ef4444"},
  {from:"neuroquant",to:"livetrading",label:"signals",color:"#3b82f6"},
  {from:"livetrading",to:"neurosync",label:"execution",color:"#14b8a6"},
  {from:"neurosync",to:"livetrading",label:"account state",color:"#14b8a6"},
  {from:"neurofusion",to:"neuroquant",label:"13-signal fusion",color:"#a855f7"},
  {from:"edgelab",to:"neurofusion",label:"signal research",color:"#a855f7"},
];

const PRICING_TIERS = [
  {name:"Free",price:"0",period:"forever",target:"Curious learners",highlight:false,neon:"",
   features:["5 AI coaching questions/day","Read-only ICT glossary","Basic trade journal","Community access"]},
  {name:"Mentor",price:"29",period:"/mo",target:"Active ICT students",highlight:false,neon:"neon-card-cyan",
   features:["Unlimited AI coaching","Full trade journal","Basic analytics","Voice journaling","Psychology profiler","Entry model checklists"]},
  {name:"Trader",price:"99",period:"/mo",target:"Serious traders",highlight:true,neon:"neon-card-cyan",
   features:["Everything in Mentor","Backtesting (3 runs/mo)","Monte Carlo simulation","Broker auto-fill","Risk limit engine","Prop firm presets"]},
  {name:"Research",price:"199",period:"/mo",target:"Strategy researchers",highlight:false,neon:"neon-card-purple",
   features:["Everything in Trader","Unlimited backtesting","Walk-forward optimization","EdgeLab experiments","NSLM prompt comparison"]},
  {name:"Quant",price:"349",period:"/mo",target:"Quant-curious traders",highlight:false,neon:"neon-card-emerald",
   features:["Everything in Research","Hybrid model building","Feature engineering","Regime detection","NeuroTrader shadow mode"]},
  {name:"Team",price:"499",period:"/mo",target:"Educators & teams",highlight:false,neon:"neon-card-amber",
   features:["Everything in Quant","Private knowledge bases","Custom NSLM variants","API access","Multi-user management"]},
];

const BEFORE_TOOLS = [
  {name:"Notes app",cost:"$0"},
  {name:"TradingView",cost:"$15–60/mo"},
  {name:"Spreadsheet journal",cost:"$0–10/mo"},
  {name:"ChatGPT / Claude",cost:"$20–200/mo"},
  {name:"Backtesting platform",cost:"$30–80/mo"},
  {name:"Broker dashboard",cost:"$0–60/mo"},
  {name:"Prop firm tracker",cost:"$30–100/mo"},
  {name:"Psychology tracker",cost:"$0–50/mo"},
];

// Candlestick data for hero/simulator (NQ 5-min candles, synthetic but realistic)
const NQ_CANDLES = [
  {o:18320,h:18335,l:18310,c:18328},{o:18328,h:18345,l:18320,c:18340},{o:18340,h:18360,l:18335,c:18355},
  {o:18355,h:18370,l:18340,c:18345},{o:18345,h:18350,l:18310,c:18315},{o:18315,h:18325,l:18290,c:18295},
  {o:18295,h:18310,l:18280,c:18305},{o:18305,h:18330,l:18300,c:18325},{o:18325,h:18350,l:18320,c:18348},
  {o:18348,h:18380,l:18345,c:18375},{o:18375,h:18395,l:18370,c:18390},{o:18390,h:18410,l:18380,c:18405},
  {o:18405,h:18420,l:18395,c:18415},{o:18415,h:18425,l:18400,c:18408},{o:18408,h:18415,l:18385,c:18390},
  {o:18390,h:18400,l:18370,c:18378},{o:18378,h:18395,l:18375,c:18392},{o:18392,h:18420,l:18388,c:18418},
  {o:18418,h:18445,l:18415,c:18440},{o:18440,h:18460,l:18435,c:18455},{o:18455,h:18470,l:18440,c:18448},
  {o:18448,h:18455,l:18430,c:18435},{o:18435,h:18450,l:18432,c:18445},{o:18445,h:18465,l:18440,c:18460},
];

// Make all data globally accessible
Object.assign(window, {
  TRADING_DAYS, TIER_META, TIER_ORDER, EQUITY_RAW, EQUITY_CURVES, TIER_KPIS,
  TRADE_MARKERS, DAY_OF_WEEK, SESSION_DATA, SETUP_PERF, COMPONENTS, ARCH_CONNECTIONS,
  PRICING_TIERS, BEFORE_TOOLS, NQ_CANDLES
});
