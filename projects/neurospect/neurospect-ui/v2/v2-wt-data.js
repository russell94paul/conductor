/* NeuroSpect v2 — Walkthrough Data (Alex's Journey) */

function wtSeed(s){var x=s;return function(){x=(x*16807)%2147483647;return x/2147483647;};}

var WT_PHASES=[
  {id:'observe',num:'01',title:'The Observation',color:'#8b5cf6'},
  {id:'hypothesis',num:'02',title:'AI-Assisted Hypothesis',color:'#06b6d4'},
  {id:'strategy',num:'03',title:'Strategy Definition',color:'#10b981'},
  {id:'backtest',num:'04',title:'Backtest Execution',color:'#3b82f6'},
  {id:'nulltest',num:'05',title:'Null Hypothesis Test',color:'#f59e0b'},
  {id:'monte',num:'06',title:'Monte Carlo Simulation',color:'#ec4899'},
  {id:'walkfwd',num:'07',title:'Walk-Forward Optimization',color:'#14b8a6'},
  {id:'params',num:'08',title:'Parameter Sensitivity',color:'#a855f7'},
  {id:'shadow',num:'09',title:'Shadow & Paper Trading',color:'#3b82f6'},
  {id:'live',num:'10',title:'Live Deployment',color:'#ef4444'},
  {id:'sync',num:'11',title:'Multi-Account Execution',color:'#14b8a6'},
  {id:'diversify',num:'12',title:'Parameter-Diversified',color:'#f59e0b'},
  {id:'loop',num:'13',title:'Continuous Improvement',color:'#10b981'},
];

/* ── Equity Curve: $50K → ~$78.4K over 187 trades ── */
(function(){
  var rng=wtSeed(42),trades=[];
  for(var i=0;i<187;i++) trades.push(rng()<0.626?(250+rng()*400):-(120+rng()*200));
  var eq=[50000];
  for(var j=0;j<trades.length;j++) eq.push(eq[eq.length-1]+trades[j]);
  var s=28420/(eq[eq.length-1]-50000);
  window.WT_EQUITY=eq.map(function(v){return 50000+(v-50000)*s;});
  window.WT_TRADES=trades.map(function(t){return t*s;});
})();

/* ── Monte Carlo: 40 bootstrap paths ── */
(function(){
  var paths=[];
  for(var p=0;p<40;p++){
    var rng=wtSeed(100+p*7),eq=[50000];
    for(var j=0;j<187;j++) eq.push(eq[eq.length-1]+WT_TRADES[Math.floor(rng()*WT_TRADES.length)]);
    paths.push(eq);
  }
  var med=[];
  for(var i=0;i<paths[0].length;i++){
    var vs=paths.map(function(p){return p[i];}).sort(function(a,b){return a-b;});
    med.push(vs[Math.floor(vs.length/2)]);
  }
  window.WT_MC_PATHS=paths; window.WT_MC_MEDIAN=med;
})();

/* ── Multi-group equity ── */
(function(){
  var ra=wtSeed(200),rb=wtSeed(300),rc=wtSeed(400);
  var a=[50000],b=[50000],c=[50000];
  for(var i=0;i<28;i++){a.push(a[a.length-1]+(ra()<0.52?200+ra()*500:-(150+ra()*350)));}
  for(var i=0;i<28;i++){b.push(b[b.length-1]+(rb()<0.68?80+rb()*180:-(60+rb()*120)));}
  for(var i=0;i<28;i++){c.push(c[c.length-1]+(rc()<0.61?150+rc()*350:-(100+rc()*250)));}
  var sA=4200/(a[a.length-1]-50000)||1,sB=1890/(b[b.length-1]-50000)||1,sC=3640/(c[c.length-1]-50000)||1;
  window.WT_GRP_EQ={
    a:a.map(function(v){return 50000+(v-50000)*sA;}),
    b:b.map(function(v){return 50000+(v-50000)*sB;}),
    c:c.map(function(v){return 50000+(v-50000)*sC;}),
  };
})();

var WT_WF=[
  {win:1,train:'Jan–Jun 24',test:'Jul–Aug 24',trainPF:2.31,testPF:1.89,testWR:'61%'},
  {win:2,train:'Mar–Aug 24',test:'Sep–Oct 24',trainPF:2.18,testPF:2.04,testWR:'64%'},
  {win:3,train:'May–Oct 24',test:'Nov–Dec 24',trainPF:2.42,testPF:1.72,testWR:'58%'},
  {win:4,train:'Jul–Dec 24',test:'Jan–Feb 25',trainPF:2.05,testPF:1.44,testWR:'55%'},
  {win:5,train:'Sep 24–Feb 25',test:'Mar–Apr 25',trainPF:2.28,testPF:2.16,testWR:'66%'},
  {win:6,train:'Nov 24–Apr 25',test:'May–Jun 25',trainPF:1.98,testPF:1.68,testWR:'59%'},
  {win:7,train:'Jan–Jun 25',test:'Jul–Aug 25',trainPF:2.15,testPF:1.91,testWR:'63%'},
];

var WT_PARAM_HEAT=[
  [1.42,1.68,1.55,1.21],[1.78,2.14,1.98,1.52],[1.91,2.31,2.18,1.64],
  [1.65,1.94,1.82,1.38],[1.22,1.48,1.35,0.94],[0.88,1.12,0.98,0.72],
];

var WT_MONTHLY=[
  [1.8,2.4,-0.6,3.1,1.2,2.8,-1.1,1.9,3.4,0.8,2.1,1.6],
  [2.2,1.5,3.8,-0.4,2.6,1.1,2.9,1.8,3.2,2.4,0,0],
];

var WT_R_DIST=[
  {r:'-2.0',n:5},{r:'-1.5',n:8},{r:'-1.0',n:42},{r:'-0.5',n:15},{r:'0',n:4},
  {r:'+0.5',n:12},{r:'+1.0',n:18},{r:'+1.5',n:28},{r:'+2.0',n:32},{r:'+2.5',n:18},
  {r:'+3.0',n:12},{r:'+3.5',n:8},{r:'+4.0',n:5},
];

var WT_DAY_WR=[{d:'Mon',v:58},{d:'Tue',v:67},{d:'Wed',v:64},{d:'Thu',v:61},{d:'Fri',v:55}];
var WT_HOUR_WR=[{h:'02:00',v:55},{h:'02:30',v:60},{h:'03:00',v:68},{h:'03:30',v:71},{h:'04:00',v:64},{h:'04:30',v:58}];

var WT_YAML='strategy:\n  name: "London Sweep FVG"\n  version: 1.0\n  hypothesis: HYP-042\n\ninstrument:\n  symbol: ES\n  exchange: CME\n  tick_size: 0.25\n  tick_value: 12.50\n\nsession_filter:\n  name: London\n  start: "02:00"\n  end: "05:00"\n  timezone: America/New_York\n\nentry:\n  conditions:\n    - event: liquidity_sweep\n      direction: below\n      reference: session_low\n      lookback: current_session\n    - event: displacement\n      min_body_ticks: 8\n      direction: bullish\n      after: liquidity_sweep\n      max_delay_bars: 3\n    - event: fvg\n      direction: bullish\n      after: displacement\n      max_delay_bars: 2\n  trigger: fvg_retest\n  direction: long\n\nexit:\n  stop_loss:\n    reference: sweep_low\n    offset_ticks: -2\n  take_profit:\n    method: risk_multiple\n    value: 2.5\n  trailing_stop:\n    activate_at_r: 1.5\n    trail_distance_ticks: 8\n\nrisk:\n  max_risk_per_trade: 0.01  # 1% of account\n  max_daily_trades: 3\n  max_daily_loss: 0.03  # 3% daily loss limit';

var WT_EXEC_LOG=[
  '14:32:05.142  SIGNAL    London Sweep FVG — Long ES @ 5842.25',
  '14:32:05.143  VALIDATE  Apex #1: ✅ margin ok, rules clear, 2 cts',
  '14:32:05.143  VALIDATE  Apex #2: ✅ margin ok, rules clear, 2 cts',
  '14:32:05.144  VALIDATE  Apex #3: ✅ margin ok, rules clear, 1 ct',
  '14:32:05.144  VALIDATE  MFF #1: ✅ margin ok, rules clear, 1 ct',
  '14:32:05.144  VALIDATE  Tradeify #1: ⏸ SKIP — session locked',
  '14:32:05.148  FILL      Apex #1: 2x ES @ 5842.25 — 3.2ms',
  '14:32:05.149  FILL      Apex #2: 2x ES @ 5842.25 — 4.1ms',
  '14:32:05.150  FILL      Apex #3: 1x ES @ 5842.25 — 4.8ms',
  '14:32:05.151  FILL      MFF #1: 1x ES @ 5842.50 — 5.4ms slip',
  '14:32:05.152  AUDIT     All fills logged. Avg latency 4.4ms',
];

Object.assign(window,{
  wtSeed:wtSeed,WT_PHASES:WT_PHASES,WT_WF:WT_WF,WT_PARAM_HEAT:WT_PARAM_HEAT,
  WT_MONTHLY:WT_MONTHLY,WT_R_DIST:WT_R_DIST,WT_DAY_WR:WT_DAY_WR,WT_HOUR_WR:WT_HOUR_WR,
  WT_YAML:WT_YAML,WT_EXEC_LOG:WT_EXEC_LOG,
});
