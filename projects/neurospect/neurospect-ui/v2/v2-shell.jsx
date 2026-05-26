/* NeuroSpect v2 — Shell: Sidebar, Router, Shared Components */
const { useState, useEffect, useRef, useCallback } = React;

/* ── Reveal hook ── */
function useRv() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const timer = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100 && rect.height > 0) { el.classList.add('vis'); return; }
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('vis'); obs.disconnect(); } }, { threshold: 0.08 });
      obs.observe(el);
    }, 50);
    return () => clearTimeout(timer);
  });
  return ref;
}
function Rv({ children, className, delay, style }) {
  const ref = useRv();
  const s = Object.assign({}, style || {}, delay ? { transitionDelay: delay + 'ms' } : {});
  return React.createElement('div', { ref: ref, className: 'rv ' + (className || ''), style: s }, children);
}
window.useRv = useRv;
window.Rv = Rv;

/* ── Router ── */
function useRoute() {
  const st = useState(window.location.hash.slice(1) || 'home');
  const route = st[0], setRoute = st[1];
  useEffect(() => {
    var handler = function() {
      var r = window.location.hash.slice(1) || 'home';
      setRoute(r);
      window.scrollTo(0, 0);
      setTimeout(function() {
        document.querySelectorAll('.rv:not(.vis)').forEach(function(el) {
          var rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight + 200 && rect.height > 0) el.classList.add('vis');
        });
      }, 120);
    };
    window.addEventListener('hashchange', handler);
    return function() { window.removeEventListener('hashchange', handler); };
  }, []);
  return route;
}
window.useRoute = useRoute;

/* ── SVG Icons (inline paths) ── */
function SvgIcon({ name, size }) {
  var s = size || 18;
  var paths = {
    home: React.createElement('path', { d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    book: React.createElement('path', { d: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    chart: React.createElement('path', { d: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    beaker: React.createElement('path', { d: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M5 14.5l-.94.94a1.5 1.5 0 000 2.12l.88.88a1.5 1.5 0 002.12 0L8 17.5m11-3l.94.94a1.5 1.5 0 010 2.12l-.88.88a1.5 1.5 0 01-2.12 0L16 17.5', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    rocket: React.createElement('path', { d: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7a18.158 18.158 0 01-2.7-2.7', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    cube: React.createElement('path', { d: 'M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    bolt: React.createElement('path', { d: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    users: React.createElement('path', { d: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    tag: React.createElement('path', { d: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z M6 6h.008v.008H6V6z', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    cog: React.createElement('path', { d: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z M15 12a3 3 0 11-6 0 3 3 0 016 0z', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
  };
  return React.createElement('svg', { width: s, height: s, viewBox: '0 0 24 24', style: { display: 'block' } }, paths[name] || paths.home);
}
window.SvgIcon = SvgIcon;

/* ── Sidebar ── */
function Sidebar({ route }) {
  var nav = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'story', label: 'My Story', icon: 'users' },
    { id: 'course', label: 'Course', icon: 'book' },
    { id: 'backtesting', label: 'Backtesting', icon: 'beaker' },
    { id: 'performance', label: 'Performance', icon: 'chart' },
    { section: 'Platform' },
    { id: 'walkthrough', label: 'Walkthrough', icon: 'rocket' },
    { id: 'neurofusion', label: 'NeuroFusion', icon: 'bolt', gold: true },
    { id: 'architecture', label: 'Architecture', icon: 'cube' },
    { section: 'Business' },
    { id: 'compare', label: 'Compare', icon: 'users' },
    { id: 'pricing', label: 'Pricing', icon: 'tag' },
  ];

  return (
    <aside className="side">
      <a href="#home" className="side-logo">
        <div className="side-logo-mark">N</div>
        <span className="side-logo-text">NeuroSpect</span>
      </a>
      <nav className="side-nav">
        {nav.map(function(item, i) {
          if (item.section) return <div key={i} className="side-section">{item.section}</div>;
          var goldStyle = item.gold ? { color: route === item.id ? 'var(--gold-300)' : 'var(--gold-400)', textShadow: route === item.id ? '0 0 8px rgba(251,191,36,0.3)' : 'none' } : {};
          return (
            <a key={item.id} href={'#' + item.id} className={'side-link ' + (route === item.id ? 'active' : '')} style={goldStyle}>
              <SvgIcon name={item.icon} />
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="side-bottom">
        <a href="#pricing" className="side-cta">Join Waitlist</a>
        <a href="http://localhost:5173" target="_blank" rel="noopener" className="side-cta" style={{ marginTop: 8, background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text-s)' }}>Launch App</a>
      </div>
    </aside>
  );
}
window.Sidebar = Sidebar;

/* ── Stat Card ── */
function StatCard({ label, value, sub, color }) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div className="label" style={{ marginBottom: 6 }}>{label}</div>
      <div className="mono" style={{ fontSize: '1.6rem', fontWeight: 700, color: color || 'var(--blue-400)' }}>{value}</div>
      {sub && <div style={{ fontSize: '0.72rem', color: 'var(--text-d)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
window.StatCard = StatCard;

/* ── MiniChart ── */
function MChart({ candles, w, h, showFvg }) {
  var width = w || 300, height = h || 100;
  var pad = 6;
  var cw = (width - pad * 2) / candles.length;
  var allP = []; candles.forEach(function(c) { allP.push(c.h, c.l); });
  var mn = Math.min.apply(null, allP), mx = Math.max.apply(null, allP), rng = mx - mn || 1;
  var y = function(v) { return pad + ((mx - v) / rng) * (height - pad * 2); };
  return (
    <svg viewBox={'0 0 ' + width + ' ' + height} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {showFvg && <rect x={pad + cw * 3} y={y(candles[2] ? candles[2].h : mx)} width={cw * 2} height={Math.abs(y(candles[4] ? candles[4].l : mn) - y(candles[2] ? candles[2].h : mx))} className="fvg-zone" rx="2" />}
      {candles.map(function(c, i) {
        var cx = pad + i * cw + cw / 2;
        var bull = c.c >= c.o;
        var bt = y(Math.max(c.o, c.c)), bb = y(Math.min(c.o, c.c)), bh = Math.max(bb - bt, 1);
        return React.createElement('g', { key: i },
          React.createElement('line', { x1: cx, y1: y(c.h), x2: cx, y2: y(c.l), stroke: bull ? '#10b981' : '#ef4444', strokeWidth: 0.8, opacity: 0.5 }),
          React.createElement('rect', { x: cx - cw * 0.3, y: bt, width: cw * 0.6, height: bh, rx: 0.5, fill: bull ? '#10b981' : '#ef4444', opacity: 0.8 })
        );
      })}
    </svg>
  );
}
window.MChart = MChart;

/* ── Progress Bar ── */
function PBar({ value, color, h }) {
  return (
    <div style={{ width: '100%', height: h || 4, borderRadius: 2, background: 'rgba(59,130,246,0.08)' }}>
      <div style={{ width: value + '%', height: '100%', borderRadius: 2, background: color || 'linear-gradient(90deg,var(--blue-600),var(--blue-400))', transition: 'width 1s cubic-bezier(0.16,1,0.3,1)' }}></div>
    </div>
  );
}
window.PBar = PBar;
