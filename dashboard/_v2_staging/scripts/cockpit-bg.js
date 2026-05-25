/* ============================================================
   Conductor Cortex — Background System
   scripts/cockpit-bg.js
   ============================================================ */
(function() {
'use strict';

var CortexBG = window.CortexBG = {};
var _canvas = null, _ctx = null, _particles = [], _raf = null;
var _hidden = false;
var _reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

CortexBG.init = function() {
    if (_reducedMotion) return;
    initParticles();
    document.addEventListener('visibilitychange', function() {
        _hidden = document.hidden;
        if (!_hidden && !_raf) animateParticles();
    });
};

CortexBG.destroy = function() {
    if (_raf) { cancelAnimationFrame(_raf); _raf = null; }
};

// --- Particle canvas ---
function initParticles() {
    _canvas = document.querySelector('.cortex-bg__particles');
    if (!_canvas) return;
    _ctx = _canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', debounce(resizeCanvas, 300));
    spawnParticles();
    animateParticles();
}

function resizeCanvas() {
    if (!_canvas) return;
    _canvas.width = window.innerWidth;
    _canvas.height = window.innerHeight;
}

function spawnParticles() {
    _particles = [];
    var count = Math.min(60, Math.floor(window.innerWidth * window.innerHeight / 25000));
    for (var i = 0; i < count; i++) {
        _particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.12,
            r: Math.random() * 1.2 + 0.4,
            a: Math.random() * 0.3 + 0.08
        });
    }
}

function animateParticles() {
    if (_hidden || !_ctx) { _raf = null; return; }
    var w = _canvas.width, h = _canvas.height;
    _ctx.clearRect(0, 0, w, h);

    // Draw particles
    for (var i = 0; i < _particles.length; i++) {
        var p = _particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        _ctx.beginPath();
        _ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        _ctx.fillStyle = 'rgba(94, 231, 255, ' + p.a + ')';
        _ctx.fill();
    }

    // Draw connections (only nearby)
    _ctx.strokeStyle = 'rgba(94, 231, 255, 0.04)';
    _ctx.lineWidth = 0.5;
    for (var i = 0; i < _particles.length; i++) {
        for (var j = i + 1; j < _particles.length; j++) {
            var dx = _particles[i].x - _particles[j].x;
            var dy = _particles[i].y - _particles[j].y;
            var dist = dx * dx + dy * dy;
            if (dist < 18000) {
                _ctx.beginPath();
                _ctx.moveTo(_particles[i].x, _particles[i].y);
                _ctx.lineTo(_particles[j].x, _particles[j].y);
                _ctx.stroke();
            }
        }
    }

    _raf = requestAnimationFrame(animateParticles);
}

function debounce(fn, ms) {
    var t;
    return function() { clearTimeout(t); t = setTimeout(fn, ms); };
}

// --- Background HTML injection ---
CortexBG.injectLayers = function(parent) {
    if (document.querySelector('.cortex-bg')) return;
    var bg = document.createElement('div');
    bg.className = 'cortex-bg';
    bg.setAttribute('aria-hidden', 'true');
    bg.innerHTML =
        '<div class="cortex-bg__aurora"></div>' +
        '<div class="cortex-bg__grid"></div>' +
        '<canvas class="cortex-bg__particles"></canvas>' +
        '<div class="cortex-bg__noise"></div>';
    (parent || document.body).insertBefore(bg, (parent || document.body).firstChild);

    // Inject CSS
    if (!document.getElementById('cortex-bg-styles')) {
        var s = document.createElement('style');
        s.id = 'cortex-bg-styles';
        s.textContent = bgCSS();
        document.head.appendChild(s);
    }
};

function bgCSS() {
    return [
'.cortex-bg {',
'  position: fixed; inset: 0; z-index: -1; pointer-events: none;',
'  overflow: hidden;',
'}',
'.cortex-bg__aurora {',
'  position: absolute; inset: -30%; width: 160%; height: 160%;',
'  background:',
'    radial-gradient(ellipse at 20% 30%, rgba(94,231,255,0.08) 0%, transparent 50%),',
'    radial-gradient(ellipse at 80% 20%, rgba(155,92,255,0.06) 0%, transparent 45%),',
'    radial-gradient(ellipse at 50% 80%, rgba(82,255,184,0.05) 0%, transparent 50%),',
'    radial-gradient(ellipse at 70% 60%, rgba(79,140,255,0.04) 0%, transparent 40%);',
'  animation: auroraShift 30s ease-in-out infinite alternate;',
'}',
'@keyframes auroraShift {',
'  0%   { transform: translate(0, 0) rotate(0deg); }',
'  25%  { transform: translate(-3%, 2%) rotate(1deg); }',
'  50%  { transform: translate(2%, -2%) rotate(-0.5deg); }',
'  75%  { transform: translate(-1%, 3%) rotate(0.8deg); }',
'  100% { transform: translate(3%, -1%) rotate(-1deg); }',
'}',
'.cortex-bg__grid {',
'  position: absolute; inset: 0;',
'  background-image:',
'    linear-gradient(rgba(94,231,255,0.015) 1px, transparent 1px),',
'    linear-gradient(90deg, rgba(94,231,255,0.015) 1px, transparent 1px);',
'  background-size: 60px 60px;',
'  animation: gridDrift 60s linear infinite;',
'  opacity: 0.6;',
'}',
'@keyframes gridDrift {',
'  0%   { transform: translate(0, 0); }',
'  100% { transform: translate(60px, 60px); }',
'}',
'.cortex-bg__particles {',
'  position: absolute; inset: 0; width: 100%; height: 100%;',
'}',
'.cortex-bg__noise {',
'  position: absolute; inset: 0;',
'  background: url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E");',
'  background-size: 256px 256px;',
'  opacity: 0.02;',
'  mix-blend-mode: overlay;',
'}',
'@media (prefers-reduced-motion: reduce) {',
'  .cortex-bg__aurora, .cortex-bg__grid, .cortex-bg__particles { animation: none !important; }',
'}'
    ].join('\n');
}

})();
