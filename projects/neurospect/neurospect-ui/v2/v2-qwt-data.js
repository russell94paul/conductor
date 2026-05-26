/* NeuroSpect v2 — Quant Walkthrough Data (Dr. Maya Chen's Journey) */

var QWT_PHASES=[
  {id:'pipeline',num:'01',title:'Data Pipeline Architecture',color:'#06b6d4'},
  {id:'features',num:'02',title:'Feature Engineering',color:'#10b981'},
  {id:'signals',num:'03',title:'Signal Construction',color:'#8b5cf6'},
  {id:'training',num:'04',title:'Model Training',color:'#3b82f6'},
  {id:'validation',num:'05',title:'Rigorous Validation',color:'#f59e0b'},
  {id:'risk',num:'06',title:'Risk Architecture',color:'#ef4444'},
  {id:'safety',num:'07',title:'Agent Safety Layers',color:'#ec4899'},
  {id:'deploy',num:'08',title:'Shadow → Paper → Live',color:'#14b8a6'},
  {id:'multi',num:'09',title:'Multi-Account Deployment',color:'#3b82f6'},
  {id:'bayesian',num:'10',title:'Bayesian Optimization',color:'#a855f7'},
  {id:'monitor',num:'11',title:'Model Monitoring & Drift',color:'#f59e0b'},
  {id:'research',num:'12',title:'Continuous Research Loop',color:'#10b981'},
];

/* ── Python Code Strings ── */
var QWT_CODE={};

QWT_CODE.pipeline=[
'pipeline = DataPipeline(',
'    source=TradovateWebSocket(',
'        instruments=["ES", "NQ"],',
'        account_id="APEX_LIVE_001"',
'    ),',
'    timeframes=["1s", "5s", "1m", "5m", "15m", "1H", "4H", "D"],',
'    ',
'    processors=[',
'        VolumeProfileProcessor(resolution=0.25, lookback="5D"),',
'        SessionSegmenter(',
'            sessions={',
'                "asia":   ("18:00", "02:00", "America/New_York"),',
'                "london": ("02:00", "05:00", "America/New_York"),',
'                "ny_am":  ("09:30", "12:00", "America/New_York"),',
'                "ny_pm":  ("13:00", "16:00", "America/New_York"),',
'            }',
'        ),',
'        MicrostructureEngine(',
'            features=["bid_ask_imbalance", "trade_flow_toxicity",',
'                      "volume_clock_acceleration", "kyle_lambda_estimate"]',
'        ),',
'    ],',
'    ',
'    ict_detectors=[',
'        LiquiditySweepDetector(min_depth_ticks=4, confirmation_bars=2),',
'        FVGScanner(min_gap_ticks=3, timeframes=["5m", "15m", "1H"]),',
'        OrderBlockDetector(lookback=20, min_volume_ratio=1.5),',
'        MarketStructureDetector(swing_lookback=10),',
'        SessionTracker(),',
'    ],',
'    ',
'    feature_store=FeatureStore(backend="timescaledb", retention="2Y")',
')',
].join('\n');

QWT_CODE.features=[
'features = FeatureSet([',
'    # Sweep quality',
'    SweepDepth("sweep_depth_ticks"),',
'    SweepVelocity("sweep_velocity"),',
'    SweepVolumeRatio("sweep_vol_ratio"),',
'    LevelsSwept("levels_swept_count"),',
'    SweepToDisplacementTime("sweep_disp_dt"),',
'    ',
'    # FVG quality',
'    FVGWidth("fvg_width_ticks"),',
'    FVGTimeframe("fvg_tf_rank"),',
'    FVGConsequent("fvg_ce_distance"),',
'    ',
'    # Displacement quality',
'    DisplacementSize("disp_body_ticks"),',
'    DisplacementVolume("disp_volume_ratio"),',
'    DisplacementFollowThrough("disp_ft"),',
'    ',
'    # Market structure',
'    TrendAlignment("trend_alignment_score"),',
'    SwingDistance("swing_distance_atr"),',
'    ',
'    # Session + Microstructure',
'    SessionProgress("session_pct"),',
'    SessionRange("session_range_atr"),',
'    OrderFlowImbalance("ofi_5m"),',
'    VolumeClockSpeed("vol_clock_accel"),',
'    SpreadWidthRatio("spread_ratio"),',
'])',
].join('\n');

QWT_CODE.signals=[
'signals = SignalPipeline([',
'    CompositeSignal(',
'        name="ict_setup_quality",',
'        inputs=["sweep_depth_ticks", "disp_body_ticks",',
'                "fvg_width_ticks", "trend_alignment_score"],',
'        method="weighted_rank",',
'        weights=[0.30, 0.25, 0.15, 0.20],',
'        normalize="percentile_90d",',
'        output_range=(0, 100)',
'    ),',
'    ',
'    CompositeSignal(',
'        name="micro_conviction",',
'        inputs=["ofi_5m", "vol_clock_accel", "spread_ratio"],',
'        method="z_score_fusion",',
'        decay="exponential_halflife_5d",',
'        output_range=(-100, 100)',
'    ),',
'    ',
'    RegimeSignal(',
'        name="market_regime",',
'        method="hidden_markov",',
'        states=["trending_bull", "trending_bear",',
'                "ranging", "volatile"],',
'        transition_smoothing="bayesian",',
'        min_state_duration="4H"',
'    ),',
'    ',
'    NeuroFusionSignal(',
'        name="confluence_score",',
'        inputs=["ict_setup_quality", "micro_conviction",',
'                "entry_timing", "market_regime"],',
'        fusion_method="attention_weighted",',
'        min_confluence=65,',
'        output_range=(0, 100)',
'    ),',
'])',
].join('\n');

QWT_CODE.training=[
'experiment = Experiment(',
'    name="ES_london_sweep_ensemble_v3",',
'    models=[',
'        XGBoostClassifier(',
'            features=FEATURE_SET_A,  # 18 features',
'            target="trade_outcome_2R",',
'            params={"max_depth": 4, "eta": 0.05,',
'                    "subsample": 0.8, "colsample_bytree": 0.7},',
'            cv="purged_kfold_5",',
'        ),',
'        LSTMModel(',
'            sequence_features=["ict_setup_quality",',
'                "micro_conviction", "entry_timing"],',
'            sequence_length=20,',
'            hidden_units=64, dropout=0.3,',
'            target="optimal_R_multiple",',
'        ),',
'        LogisticModel(',
'            features=["confluence_score", "market_regime"],',
'            target="trade_outcome_2R",',
'            regularization="elastic_net", alpha=0.5',
'        ),',
'    ],',
'    meta_learner=StackingMetaLearner(',
'        method="regime_conditioned_blend",',
'        blend_weights_per_regime={',
'            "trending": [0.45, 0.35, 0.20],',
'            "ranging":  [0.25, 0.25, 0.50],',
'            "volatile": [0.30, 0.50, 0.20],',
'        }',
'    ),',
'    validation=WalkForwardValidation(',
'        train_window="8M", test_window="2M",',
'        purge_gap="5D", embargo="2D"',
'    )',
')',
].join('\n');

QWT_CODE.risk=[
'risk_engine = RiskEngine(',
'    sizing=FractionalKelly(',
'        fraction=0.25,  # Quarter Kelly',
'        max_position=4,',
'        kelly_inputs={',
'            "win_rate": "rolling_60d",',
'            "avg_win_r": "rolling_60d",',
'            "avg_loss_r": "rolling_60d",',
'        }',
'    ),',
'    regime_scaling={',
'        "trending_bull": 1.0,',
'        "trending_bear": 1.0,',
'        "ranging":       0.6,',
'        "volatile":      0.4,',
'    },',
'    circuit_breakers=[',
'        DailyLossLimit(max_loss_pct=0.03),',
'        ConsecutiveLossLimit(max_consecutive=4),',
'        DrawdownScaling(',
'            thresholds=[(0.05, 0.75), (0.10, 0.50)],',
'        ),',
'        VolatilityShutdown(vix_above=35),',
'    ],',
'    prop_shield=PropShieldIntegration(',
'        per_account=True,',
'        daily_loss_buffer_pct=0.15',
'    )',
')',
].join('\n');

QWT_CODE.bayesian=[
'optimizer = BayesianParameterOptimizer(',
'    parameter_space={',
'        "min_confluence": ContinuousParam(50, 90),',
'        "kelly_fraction": ContinuousParam(0.10, 0.40),',
'        "regime_scaling_ranging": ContinuousParam(0.2, 1.0),',
'        "take_profit_r": ContinuousParam(1.5, 4.0),',
'    },',
'    objective="sharpe_ratio",',
'    constraints=[',
'        MaxDrawdown(0.12), MinWinRate(0.52),',
'        MinTrades(15, per="month"),',
'    ],',
'    n_initial=5,  # 5 prop firm accounts',
'    n_iterations=20,  # Optimize over 20 weeks',
')',
].join('\n');

/* ── Feature Importance Data ── */
var QWT_FEAT_IMP=[
  {name:'sweep_depth_ticks',val:0.142,stab:0.91},
  {name:'disp_body_ticks',val:0.128,stab:0.88},
  {name:'trend_alignment_score',val:0.115,stab:0.93},
  {name:'ofi_5m',val:0.098,stab:0.82},
  {name:'fvg_width_ticks',val:0.087,stab:0.85},
  {name:'session_range_atr',val:0.076,stab:0.90},
  {name:'sweep_vol_ratio',val:0.071,stab:0.79},
  {name:'vol_clock_accel',val:0.062,stab:0.77},
  {name:'sweep_disp_dt',val:0.054,stab:0.84},
  {name:'disp_volume_ratio',val:0.048,stab:0.81},
  {name:'session_pct',val:0.041,stab:0.88},
  {name:'spread_ratio',val:0.035,stab:0.72},
  {name:'fvg_ce_distance',val:0.024,stab:0.76},
  {name:'swing_distance_atr',val:0.019,stab:0.74},
];

/* ── Model Comparison ── */
var QWT_MODELS=[
  {name:'XGBoost',auc:0.714,prec:0.68,rec:0.61,sharpe:1.64,pf:1.92},
  {name:'LSTM',auc:0.698,prec:0.65,rec:0.64,sharpe:1.48,pf:1.78},
  {name:'Logistic',auc:0.681,prec:0.63,rec:0.59,sharpe:1.52,pf:1.71},
  {name:'Ensemble',auc:0.742,prec:0.71,rec:0.63,sharpe:1.94,pf:2.28,best:true},
  {name:'Ensemble+Regime',auc:0.761,prec:0.73,rec:0.65,sharpe:2.12,pf:2.41,best:true},
];

/* ── ROC curve data ── */
(function(){
  var curves=[];
  var aucs=[0.714,0.698,0.681,0.742,0.761];
  var names=['XGBoost','LSTM','Logistic','Ensemble','Ens+Regime'];
  var colors=['#ef4444','#8b5cf6','var(--text-m)','#3b82f6','#10b981'];
  aucs.forEach(function(auc,idx){
    var pts=[];
    for(var i=0;i<=20;i++){
      var fpr=i/20;
      var tpr=Math.pow(fpr,1/(auc*2.5));
      pts.push({fpr:fpr,tpr:Math.min(tpr,1)});
    }
    curves.push({name:names[idx],color:colors[idx],pts:pts});
  });
  window.QWT_ROC=curves;
})();

/* ── Correlation matrix (18x18 seeded) ── */
(function(){
  var rng=wtSeed(777),n=14,mat=[];
  for(var i=0;i<n;i++){mat[i]=[];for(var j=0;j<n;j++){
    if(i===j){mat[i][j]=1;}
    else if(j<i){mat[i][j]=mat[j][i];}
    else{
      var base=(Math.abs(i-j)<3)?0.3+rng()*0.5:rng()*0.4-0.1;
      mat[i][j]=Math.round(base*100)/100;
    }
  }}
  window.QWT_CORR=mat;
})();

/* ── Equity + MC for Maya's strategy ── */
(function(){
  var rng=wtSeed(99),trades=[];
  for(var i=0;i<210;i++) trades.push(rng()<0.65?(220+rng()*450):-(100+rng()*220));
  var eq=[50000];
  for(var j=0;j<trades.length;j++) eq.push(eq[eq.length-1]+trades[j]);
  var s=34200/(eq[eq.length-1]-50000);
  window.QWT_EQUITY=eq.map(function(v){return 50000+(v-50000)*s;});
  var scaled=trades.map(function(t){return t*s;});
  var paths=[];
  for(var p=0;p<40;p++){
    var r2=wtSeed(500+p*7),e2=[50000];
    for(var j=0;j<210;j++) e2.push(e2[e2.length-1]+scaled[Math.floor(r2()*scaled.length)]);
    paths.push(e2);
  }
  var med=[];
  for(var i=0;i<paths[0].length;i++){
    var vs=paths.map(function(p){return p[i];}).sort(function(a,b){return a-b;});
    med.push(vs[Math.floor(vs.length/2)]);
  }
  window.QWT_MC_PATHS=paths;window.QWT_MC_MEDIAN=med;
})();

/* ── Stage comparison data ── */
var QWT_STAGES=[
  {stage:'Backtest',trades:210,wr:'65.2%',pf:'2.41',avgW:'$398',avgL:'$188',dd:'7.8%',sharpe:'2.12',slip:'0 (sim)'},
  {stage:'Shadow',trades:21,wr:'66.7%',pf:'2.54',avgW:'$385',avgL:'$172',dd:'3.4%',sharpe:'2.34',slip:'—'},
  {stage:'Paper',trades:24,wr:'62.5%',pf:'2.18',avgW:'$392',avgL:'$198',dd:'4.1%',sharpe:'1.98',slip:'0.8 tick'},
  {stage:'Live-Min',trades:16,wr:'68.8%',pf:'2.31',avgW:'$376',avgL:'$205',dd:'2.6%',sharpe:'2.06',slip:'1.1 tick'},
];

/* ── PSI drift data ── */
var QWT_PSI=[
  {feat:'ofi_5m',psi:0.18,status:'warn'},{feat:'sweep_depth',psi:0.04,status:'ok'},
  {feat:'disp_body',psi:0.06,status:'ok'},{feat:'trend_align',psi:0.03,status:'ok'},
  {feat:'fvg_width',psi:0.09,status:'ok'},{feat:'session_range',psi:0.07,status:'ok'},
  {feat:'vol_clock',psi:0.12,status:'warn'},{feat:'spread_ratio',psi:0.05,status:'ok'},
];

/* ── Portfolio strategies ── */
var QWT_PORTFOLIO=[
  {name:'London Sweep FVG',inst:'ES',sharpe:2.08,alloc:35,corr:'—',status:'active'},
  {name:'NY AM Reversal',inst:'NQ',sharpe:1.74,alloc:25,corr:'0.32',status:'active'},
  {name:'Session Gap Fill',inst:'ES',sharpe:1.61,alloc:20,corr:'0.18',status:'deploying'},
  {name:'Volume POC Fade',inst:'ES',sharpe:null,alloc:0,corr:'—',status:'testing'},
  {name:'Reserved',inst:'—',sharpe:null,alloc:20,corr:'—',status:'cash'},
];

/* ── Pre-flight check lines ── */
var QWT_PREFLIGHT=[
  'Layer 1 — Signal Validation',
  '  ✅ Confluence: 82 (min: 65)',
  '  ✅ Data freshness: 0.3s (max: 5s)',
  '  ✅ Model confidence: 0.73 (min: 0.55)',
  'Layer 2 — Strategy Risk',
  '  ✅ Position size: 2 cts (Kelly optimal: 2.1)',
  '  ✅ Daily trades: 1 of 3 max',
  '  ✅ Regime: trending_bull → scaling 1.0x',
  'Layer 3 — Portfolio Risk',
  '  ✅ No existing ES position',
  '  ✅ Portfolio heat: 1.2% (max: 6%)',
  'Layer 4 — Prop Shield',
  '  ✅ Apex #1: daily $1,875 remaining, DD ok',
  '  ✅ Apex #2: daily $2,100 remaining, DD ok',
  '  ✅ Apex #3: $980 remaining — SIZE REDUCED 1ct',
  '  ⏸ Tradeify #1: LOCKED (daily target)',
  'Layer 5 — Human Oversight',
  '  ✅ Agent mode: LIVE (auth 2025-11-01)',
  '  ✅ Kill switch: OFF',
  'VERDICT: ✅ EXECUTE — 4 accounts, skip Tradeify',
];

Object.assign(window,{
  QWT_PHASES:QWT_PHASES,QWT_CODE:QWT_CODE,QWT_FEAT_IMP:QWT_FEAT_IMP,
  QWT_MODELS:QWT_MODELS,QWT_STAGES:QWT_STAGES,QWT_PSI:QWT_PSI,
  QWT_PORTFOLIO:QWT_PORTFOLIO,QWT_PREFLIGHT:QWT_PREFLIGHT,
});
