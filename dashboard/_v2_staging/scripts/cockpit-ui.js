/* ============================================================
   Conductor Cortex — UI Utilities
   scripts/cockpit-ui.js
   ============================================================ */
(function() {
'use strict';

var CortexUI = window.CortexUI = {};

// --- Animate number count-up ---
CortexUI.animateNumber = function(el, to, opts) {
    opts = opts || {};
    var from = opts.from != null ? opts.from : parseFloat(el.textContent.replace(/[^0-9.\-]/g, '')) || 0;
    var duration = opts.duration || 600;
    var formatter = opts.formatter || function(v) { return Math.round(v).toLocaleString(); };
    var start = performance.now();

    function tick(now) {
        var t = Math.min(1, (now - start) / duration);
        // ease-out-quart
        t = 1 - Math.pow(1 - t, 4);
        var val = from + (to - from) * t;
        el.textContent = formatter(val);
        if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
};

// --- Apply update pulse to element ---
CortexUI.pulse = function(el) {
    el.classList.add('is-updated');
    setTimeout(function() { el.classList.remove('is-updated'); }, 800);
};

// --- Render SVG sparkline ---
CortexUI.renderSparkline = function(container, points, opts) {
    opts = opts || {};
    var w = opts.width || 120;
    var h = opts.height || 32;
    var color = opts.color || 'var(--accent-cyan)';
    var animate = opts.animate !== false;

    if (!points || !points.length) {
        container.innerHTML = '';
        return;
    }

    var max = Math.max.apply(null, points) || 1;
    var min = Math.min.apply(null, points);
    var range = max - min || 1;
    var step = w / (points.length - 1 || 1);

    var pathParts = [];
    var areaParts = [];
    points.forEach(function(v, i) {
        var x = Math.round(i * step * 10) / 10;
        var y = Math.round((1 - (v - min) / range) * (h - 4) + 2);
        pathParts.push((i === 0 ? 'M' : 'L') + x + ',' + y);
        areaParts.push((i === 0 ? 'M' : 'L') + x + ',' + y);
    });
    areaParts.push('L' + w + ',' + h + ' L0,' + h + ' Z');

    var pathD = pathParts.join(' ');
    var areaD = areaParts.join(' ');
    var pathLen = estimatePathLength(points, step, h, range, min);

    var svg = '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" style="display:block;overflow:visible;">';
    svg += '<defs><linearGradient id="spk-' + genId() + '" x1="0" y1="0" x2="0" y2="1">';
    svg += '<stop offset="0%" stop-color="' + color + '" stop-opacity="0.2"/>';
    svg += '<stop offset="100%" stop-color="' + color + '" stop-opacity="0"/>';
    svg += '</linearGradient></defs>';
    svg += '<path d="' + areaD + '" fill="url(#spk-' + (genId.last) + ')" opacity="0.5"/>';
    svg += '<path d="' + pathD + '" fill="none" stroke="' + color + '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
    if (animate) {
        svg += ' stroke-dasharray="' + pathLen + '" stroke-dashoffset="' + pathLen + '"';
        svg += ' style="animation: sparkDraw 1s var(--ease-out-expo) forwards;"';
    }
    svg += '/>';
    // End dot
    var lastX = (points.length - 1) * step;
    var lastY = (1 - (points[points.length - 1] - min) / range) * (h - 4) + 2;
    svg += '<circle cx="' + lastX + '" cy="' + lastY + '" r="2.5" fill="' + color + '"';
    if (animate) svg += ' opacity="0" style="animation: fadeIn 0.3s 0.8s forwards;"';
    svg += '/>';
    svg += '</svg>';
    container.innerHTML = svg;
};

var _idCounter = 0;
function genId() { _idCounter++; genId.last = 'g' + _idCounter; return genId.last; }

function estimatePathLength(pts, step, h, range, min) {
    var len = 0;
    for (var i = 1; i < pts.length; i++) {
        var dx = step;
        var dy = ((pts[i] - min) / range - (pts[i - 1] - min) / range) * (h - 4);
        len += Math.sqrt(dx * dx + dy * dy);
    }
    return Math.ceil(len);
}

// --- Render segmented progress bar ---
CortexUI.renderSegmentedProgress = function(container, segments, opts) {
    opts = opts || {};
    var animate = opts.animate !== false;
    var height = opts.height || 8;
    var total = 0;
    segments.forEach(function(s) { total += s.count; });
    if (total === 0) { container.innerHTML = '<div style="height:' + height + 'px;background:rgba(255,255,255,0.03);border-radius:' + (height / 2) + 'px;"></div>'; return; }

    var html = '<div style="display:flex;height:' + height + 'px;border-radius:' + (height / 2) + 'px;overflow:hidden;background:rgba(255,255,255,0.03);gap:1px;" class="seg-progress">';
    segments.forEach(function(s) {
        if (s.count === 0) return;
        var pct = (s.count / total) * 100;
        var isRunning = s.status === 'running';
        html += '<div title="' + s.status + ': ' + s.count + ' (' + Math.round(pct) + '%)"';
        html += ' style="width:' + pct + '%;background:' + s.color + ';';
        if (animate) html += 'animation: segGrow 0.6s var(--ease-out-expo) backwards;';
        if (isRunning) html += 'background:linear-gradient(90deg,' + s.color + ',' + s.color + 'aa);animation: segPulse 2s ease-in-out infinite;';
        html += '">';
        html += '</div>';
    });
    html += '</div>';
    container.innerHTML = html;
};

// --- Render SVG gauge ---
CortexUI.renderGauge = function(container, value, opts) {
    opts = opts || {};
    var size = opts.size || 100;
    var stroke = opts.stroke || 6;
    var label = opts.label || '';
    var status = opts.status || 'default';
    var animate = opts.animate !== false;

    var r = (size - stroke) / 2;
    var circumference = 2 * Math.PI * r;
    var pct = Math.max(0, Math.min(100, value));
    var offset = circumference - (pct / 100) * circumference;

    var color = status === 'critical' ? 'var(--accent-red)'
        : status === 'warning' ? 'var(--accent-amber)'
        : status === 'success' ? 'var(--accent-green)'
        : pct >= 80 ? 'var(--accent-green)'
        : pct >= 50 ? 'var(--accent-cyan)'
        : pct >= 30 ? 'var(--accent-amber)'
        : 'var(--accent-red)';

    var glowColor = color.replace('var(--accent-', '').replace(')', '');
    var glowMap = { green: 'rgba(82,255,184,0.3)', cyan: 'rgba(94,231,255,0.3)', amber: 'rgba(255,209,102,0.3)', red: 'rgba(255,92,138,0.3)' };
    var glow = glowMap[glowColor] || 'rgba(94,231,255,0.2)';

    var cx = size / 2;
    var svg = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">';
    svg += '<circle cx="' + cx + '" cy="' + cx + '" r="' + r + '" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="' + stroke + '"/>';
    // Tick marks
    for (var i = 0; i < 12; i++) {
        var angle = (i / 12) * 360 - 90;
        var rad = angle * Math.PI / 180;
        var x1 = cx + (r + 2) * Math.cos(rad);
        var y1 = cx + (r + 2) * Math.sin(rad);
        var x2 = cx + (r + 5) * Math.cos(rad);
        var y2 = cx + (r + 5) * Math.sin(rad);
        svg += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>';
    }
    svg += '<circle cx="' + cx + '" cy="' + cx + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="' + stroke + '"';
    svg += ' stroke-linecap="round" stroke-dasharray="' + circumference + '"';
    if (animate) {
        svg += ' stroke-dashoffset="' + circumference + '"';
        svg += ' style="animation: gaugeFill 1.2s var(--ease-out-expo) forwards; filter: drop-shadow(0 0 6px ' + glow + ');"';
    } else {
        svg += ' stroke-dashoffset="' + offset + '"';
        svg += ' style="filter: drop-shadow(0 0 6px ' + glow + ');"';
    }
    svg += ' transform="rotate(-90 ' + cx + ' ' + cx + ')"/>';
    // Center text
    svg += '<text x="' + cx + '" y="' + (cx - 4) + '" text-anchor="middle" dominant-baseline="middle"';
    svg += ' font-size="' + (size * 0.24) + '" font-weight="800" fill="#fff" font-family="var(--font-mono)">' + Math.round(pct) + '</text>';
    svg += '<text x="' + cx + '" y="' + (cx + size * 0.14) + '" text-anchor="middle" dominant-baseline="middle"';
    svg += ' font-size="' + Math.max(8, size * 0.09) + '" fill="var(--text-dim)" font-family="var(--font-family)" text-transform="uppercase" letter-spacing="0.08em">' + label + '</text>';
    svg += '</svg>';

    // Inject target offset as CSS variable for animation
    var wrapper = '<div class="gauge-wrap" style="--gauge-offset:' + offset + ';">' + svg + '</div>';
    container.innerHTML = wrapper;
};

// --- Render ring chart ---
CortexUI.renderRingChart = function(container, segments, opts) {
    opts = opts || {};
    var size = opts.size || 140;
    var stroke = opts.stroke || 12;
    var animate = opts.animate !== false;

    var total = 0;
    segments.forEach(function(s) { total += s.count; });
    if (total === 0) { container.innerHTML = ''; return; }

    var r = (size - stroke) / 2;
    var circumference = 2 * Math.PI * r;
    var cx = size / 2;

    var svg = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">';
    svg += '<circle cx="' + cx + '" cy="' + cx + '" r="' + r + '" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="' + stroke + '"/>';

    var offset = 0;
    segments.forEach(function(s, i) {
        if (s.count === 0) return;
        var pct = s.count / total;
        var dashLen = pct * circumference;
        var gap = circumference - dashLen;
        var rotation = (offset / total) * 360 - 90;

        svg += '<circle cx="' + cx + '" cy="' + cx + '" r="' + r + '" fill="none"';
        svg += ' stroke="' + s.color + '" stroke-width="' + stroke + '"';
        svg += ' stroke-dasharray="' + dashLen + ' ' + gap + '"';
        svg += ' stroke-linecap="round"';
        svg += ' transform="rotate(' + rotation + ' ' + cx + ' ' + cx + ')"';
        svg += ' style="opacity:0.85;';
        if (animate) svg += 'animation: ringReveal 0.8s ' + (i * 0.1) + 's var(--ease-out-expo) both;';
        svg += '"/>';
        offset += s.count;
    });

    // Center total
    svg += '<text x="' + cx + '" y="' + (cx - 2) + '" text-anchor="middle" dominant-baseline="middle"';
    svg += ' font-size="' + (size * 0.18) + '" font-weight="800" fill="#fff" font-family="var(--font-mono)">' + total + '</text>';
    svg += '<text x="' + cx + '" y="' + (cx + size * 0.12) + '" text-anchor="middle" dominant-baseline="middle"';
    svg += ' font-size="' + Math.max(7, size * 0.07) + '" fill="var(--text-dim)" font-family="var(--font-family)">total</text>';
    svg += '</svg>';

    // Legend
    var legend = '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;">';
    segments.forEach(function(s) {
        if (s.count === 0) return;
        var pct = Math.round((s.count / total) * 100);
        legend += '<div style="display:flex;align-items:center;gap:4px;font-size:0.62rem;color:var(--text-muted);">';
        legend += '<span style="width:8px;height:8px;border-radius:50%;background:' + s.color + ';flex-shrink:0;"></span>';
        legend += s.status + ' <span style="font-weight:700;color:var(--text-secondary);">' + s.count + '</span> (' + pct + '%)';
        legend += '</div>';
    });
    legend += '</div>';

    container.innerHTML = svg + legend;
};

// --- Render activity heatmap ---
CortexUI.renderHeatmap = function(container, data, opts) {
    opts = opts || {};
    var cellSize = opts.cellSize || 16;
    var gap = opts.gap || 3;
    var animate = opts.animate !== false;

    if (!data.length) {
        container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-faint);font-size:0.72rem;">No activity data</div>';
        return;
    }

    var maxVal = 0;
    data.forEach(function(d) { if (d.value > maxVal) maxVal = d.value; });
    if (maxVal === 0) maxVal = 1;

    var html = '<div style="display:flex;flex-wrap:wrap;gap:' + gap + 'px;">';
    data.forEach(function(d, i) {
        var level = Math.ceil((d.value / maxVal) * 5);
        if (d.value === 0) level = 0;
        var opacity = level === 0 ? 0.04 : 0.15 + (level / 5) * 0.8;
        var color = level === 0 ? 'rgba(255,255,255,' + opacity + ')'
            : 'rgba(94, 231, 255, ' + opacity + ')';
        var style = 'width:' + cellSize + 'px;height:' + cellSize + 'px;border-radius:3px;background:' + color + ';';
        if (animate) style += 'animation: fadeInStagger 0.3s ' + (i * 20) + 'ms var(--ease-out-expo) both;';
        html += '<div class="heatmap-cell" data-level="' + level + '" title="' + d.date + ': ' + d.value + '"';
        html += ' style="' + style + '"></div>';
    });
    html += '</div>';
    container.innerHTML = html;
};

// --- Inject animation styles (once) ---
(function injectStyles() {
    if (document.getElementById('cortex-ui-styles')) return;
    var style = document.createElement('style');
    style.id = 'cortex-ui-styles';
    style.textContent = [
        '@keyframes sparkDraw { to { stroke-dashoffset: 0; } }',
        '@keyframes gaugeFill { to { stroke-dashoffset: var(--gauge-offset); } }',
        '@keyframes ringReveal { from { opacity: 0; stroke-dashoffset: 200; } to { opacity: 0.85; stroke-dashoffset: 0; } }',
        '@keyframes segGrow { from { width: 0; } }',
        '@keyframes segPulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }',
        '.is-updated { animation: updatePulse 0.6s ease; }',
        '@keyframes updatePulse { 0% { box-shadow: 0 0 0 0 rgba(94,231,255,0.4); } 100% { box-shadow: 0 0 0 8px rgba(94,231,255,0); } }'
    ].join('\n');
    document.head.appendChild(style);
})();

// ============================================================
// Alternative Viz Renderers
// ============================================================

// --- Horizontal bar chart from segments ---
CortexUI.renderBarChart = function(container, segments, opts) {
    opts = opts || {};
    var barH = opts.barHeight || 22;
    var animate = opts.animate !== false;
    var total = 0;
    segments.forEach(function(s) { total += s.count; });
    if (total === 0) { container.innerHTML = '<div style="color:var(--text-faint);font-size:0.68rem;">No data</div>'; return; }

    var html = '<div style="display:flex;flex-direction:column;gap:6px;">';
    segments.forEach(function(s, i) {
        if (s.count === 0) return;
        var pct = (s.count / total) * 100;
        html += '<div style="display:flex;align-items:center;gap:8px;' + (animate ? 'animation:fadeInStagger 0.3s ' + (i * 60) + 'ms var(--ease-out-expo) both;' : '') + '">';
        html += '<span style="font-size:0.6rem;font-weight:600;color:var(--text-dim);min-width:65px;text-transform:capitalize;">' + s.status + '</span>';
        html += '<div style="flex:1;height:' + barH + 'px;background:rgba(255,255,255,0.03);border-radius:' + (barH / 2) + 'px;overflow:hidden;position:relative;">';
        html += '<div style="height:100%;width:' + pct + '%;background:' + s.color + ';border-radius:' + (barH / 2) + 'px;transition:width 0.8s var(--ease-out-expo);display:flex;align-items:center;justify-content:flex-end;padding-right:8px;">';
        if (pct > 12) html += '<span style="font-size:0.55rem;font-weight:700;color:rgba(0,0,0,0.7);">' + s.count + '</span>';
        html += '</div></div>';
        if (pct <= 12) html += '<span style="font-size:0.58rem;font-family:var(--font-mono);color:var(--text-dim);">' + s.count + '</span>';
        html += '</div>';
    });
    html += '</div>';
    container.innerHTML = html;
};

// --- Table view from segments ---
CortexUI.renderTable = function(container, segments, opts) {
    opts = opts || {};
    var total = 0;
    segments.forEach(function(s) { total += s.count; });

    var html = '<table style="width:100%;border-collapse:collapse;font-size:0.72rem;">';
    html += '<thead><tr>';
    html += '<th style="text-align:left;padding:6px 10px;font-size:0.58rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid var(--border-medium);font-weight:700;">Status</th>';
    html += '<th style="text-align:right;padding:6px 10px;font-size:0.58rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid var(--border-medium);font-weight:700;">Count</th>';
    html += '<th style="text-align:right;padding:6px 10px;font-size:0.58rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid var(--border-medium);font-weight:700;">%</th>';
    html += '</tr></thead><tbody>';
    segments.forEach(function(s) {
        var pct = total > 0 ? Math.round((s.count / total) * 100) : 0;
        html += '<tr style="border-bottom:1px solid var(--border-subtle);">';
        html += '<td style="padding:6px 10px;color:var(--text-secondary);"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + s.color + ';margin-right:6px;vertical-align:middle;"></span>' + s.status + '</td>';
        html += '<td style="padding:6px 10px;text-align:right;font-family:var(--font-mono);font-weight:700;color:#fff;">' + s.count + '</td>';
        html += '<td style="padding:6px 10px;text-align:right;font-family:var(--font-mono);color:var(--text-muted);">' + pct + '%</td>';
        html += '</tr>';
    });
    html += '</tbody>';
    if (total > 0) {
        html += '<tfoot><tr><td style="padding:6px 10px;font-weight:700;color:var(--text-secondary);border-top:1px solid var(--border-medium);">Total</td>';
        html += '<td style="padding:6px 10px;text-align:right;font-family:var(--font-mono);font-weight:700;color:#fff;border-top:1px solid var(--border-medium);">' + total + '</td>';
        html += '<td style="padding:6px 10px;text-align:right;border-top:1px solid var(--border-medium);"></td></tr></tfoot>';
    }
    html += '</table>';
    container.innerHTML = html;
};

// --- Compact number display (alternative to gauge) ---
CortexUI.renderNumber = function(container, value, opts) {
    opts = opts || {};
    var label = opts.label || '';
    var color = value >= 80 ? 'var(--accent-green)' : value >= 50 ? 'var(--accent-cyan)' : value >= 30 ? 'var(--accent-amber)' : 'var(--accent-red)';
    if (opts.color) color = opts.color;
    var fmt = opts.fmt === 'usd' ? '$' + value.toFixed(2) : opts.fmt === 'pct' ? value.toFixed(1) + '%' : Math.round(value).toLocaleString();

    var html = '<div style="text-align:center;padding:12px;">';
    html += '<div style="font-size:2rem;font-weight:800;font-family:var(--font-mono);color:' + color + ';line-height:1;">' + fmt + '</div>';
    if (label) html += '<div style="font-size:0.58rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.08em;margin-top:6px;">' + label + '</div>';
    html += '</div>';
    container.innerHTML = html;
};

// --- KPI compact row (alternative to cards grid) ---
CortexUI.renderCompactKPIs = function(container, kpis) {
    var html = '<div style="display:flex;flex-wrap:wrap;gap:6px;">';
    kpis.forEach(function(k) {
        var fmtVal = k.fmt === 'usd' ? '$' + k.val.toFixed(2) : k.fmt === 'pct' ? k.val.toFixed(1) + '%' : k.fmt === 'ratio' ? k.val.toFixed(2) : k.val.toLocaleString();
        html += '<div style="display:flex;align-items:center;gap:6px;padding:5px 12px;background:rgba(255,255,255,0.02);border:1px solid var(--border-subtle);border-radius:8px;font-size:0.65rem;">';
        html += '<span style="color:var(--text-dim);">' + k.label + '</span>';
        html += '<span style="font-family:var(--font-mono);font-weight:700;color:' + (k.color || 'var(--text-secondary)') + ';">' + fmtVal + '</span>';
        html += '</div>';
    });
    html += '</div>';
    container.innerHTML = html;
};

// --- KPI table ---
CortexUI.renderKPITable = function(container, kpis) {
    var html = '<table style="width:100%;border-collapse:collapse;font-size:0.72rem;">';
    html += '<thead><tr><th style="text-align:left;padding:5px 10px;font-size:0.58rem;color:var(--text-dim);text-transform:uppercase;border-bottom:1px solid var(--border-medium);font-weight:700;">Metric</th>';
    html += '<th style="text-align:right;padding:5px 10px;font-size:0.58rem;color:var(--text-dim);text-transform:uppercase;border-bottom:1px solid var(--border-medium);font-weight:700;">Value</th></tr></thead><tbody>';
    kpis.forEach(function(k) {
        var fmtVal = k.fmt === 'usd' ? '$' + k.val.toFixed(2) : k.fmt === 'pct' ? k.val.toFixed(1) + '%' : k.fmt === 'ratio' ? k.val.toFixed(2) : k.val.toLocaleString();
        html += '<tr style="border-bottom:1px solid var(--border-subtle);">';
        html += '<td style="padding:5px 10px;color:var(--text-secondary);">' + k.label + '</td>';
        html += '<td style="padding:5px 10px;text-align:right;font-family:var(--font-mono);font-weight:700;color:' + (k.color || '#fff') + ';">' + fmtVal + '</td>';
        html += '</tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
};

// --- Sparkline bar chart (vertical bars alternative to line sparkline) ---
CortexUI.renderSparkBars = function(container, points, opts) {
    opts = opts || {};
    var w = opts.width || 120;
    var h = opts.height || 32;
    var color = opts.color || 'var(--accent-cyan)';
    if (!points || !points.length) { container.innerHTML = ''; return; }

    var max = Math.max.apply(null, points) || 1;
    var barW = Math.max(2, Math.floor((w - points.length) / points.length));
    var gap = 1;

    var svg = '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" style="display:block;">';
    points.forEach(function(v, i) {
        var barH = Math.max(1, (v / max) * (h - 2));
        var x = i * (barW + gap);
        var y = h - barH;
        svg += '<rect x="' + x + '" y="' + y + '" width="' + barW + '" height="' + barH + '" rx="1" fill="' + color + '" opacity="0.7"/>';
    });
    svg += '</svg>';
    container.innerHTML = svg;
};

// --- Timeline feed (alternative to simple feed) ---
CortexUI.renderTimeline = function(container, items, opts) {
    opts = opts || {};
    if (!items || !items.length) { container.innerHTML = '<div style="color:var(--text-faint);font-size:0.68rem;text-align:center;padding:20px;">No items</div>'; return; }

    var html = '<div style="position:relative;padding-left:20px;border-left:2px solid var(--border-medium);margin-left:8px;">';
    items.forEach(function(item, i) {
        html += '<div style="position:relative;margin-bottom:12px;animation:fadeInStagger 0.25s ' + (i * 40) + 'ms var(--ease-out-expo) both;">';
        html += '<div style="position:absolute;left:-25px;top:4px;width:10px;height:10px;border-radius:50%;background:' + (item.color || 'var(--accent-cyan)') + ';border:2px solid var(--bg-primary);"></div>';
        html += '<div style="font-size:0.68rem;color:var(--text-secondary);">' + (item.text || '') + '</div>';
        html += '<div style="font-size:0.55rem;color:var(--text-faint);font-family:var(--font-mono);margin-top:2px;">' + (item.time || '') + '</div>';
        html += '</div>';
    });
    html += '</div>';
    container.innerHTML = html;
};

// --- Dispatch renderer by viz type ---
CortexUI.renderByType = function(container, vizType, segments, opts) {
    switch (vizType) {
        case 'bar':    CortexUI.renderBarChart(container, segments, opts); break;
        case 'table':  CortexUI.renderTable(container, segments, opts); break;
        case 'ring':   CortexUI.renderRingChart(container, segments, opts); break;
        case 'gauge':  if (opts && opts.value != null) CortexUI.renderGauge(container, opts.value, opts); else CortexUI.renderRingChart(container, segments, opts); break;
        case 'number': if (opts && opts.value != null) CortexUI.renderNumber(container, opts.value, opts); break;
        case 'segmented': CortexUI.renderSegmentedProgress(container, segments, opts); break;
        default:       CortexUI.renderRingChart(container, segments, opts); break;
    }
};

})();
