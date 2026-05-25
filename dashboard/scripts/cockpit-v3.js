/* ============================================================
   Conductor Cortex — V3 Advanced Features
   scripts/cockpit-v3.js
   ============================================================ */
(function() {
'use strict';

var _reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var _isTouch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

// ============================================================
// 1. Command Palette (Cmd+K)
// ============================================================
(function initCommandPalette() {
    var overlay = document.createElement('div');
    overlay.className = 'cmd-palette-overlay';
    overlay.innerHTML =
        '<div class="cmd-palette">' +
        '<input class="cmd-palette__input" placeholder="Search pages, projects, sessions, pipelines..." autocomplete="off">' +
        '<div class="cmd-palette__results" id="cmd-results"></div>' +
        '</div>';
    document.body.appendChild(overlay);

    var input = overlay.querySelector('.cmd-palette__input');
    var results = document.getElementById('cmd-results');
    var activeIdx = -1;
    var currentItems = [];

    overlay.addEventListener('click', function(e) { if (e.target === overlay) closePalette(); });
    input.addEventListener('input', function() { search(input.value); });
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') { closePalette(); e.preventDefault(); }
        else if (e.key === 'ArrowDown') { activeIdx = Math.min(activeIdx + 1, currentItems.length - 1); highlightActive(); e.preventDefault(); }
        else if (e.key === 'ArrowUp') { activeIdx = Math.max(activeIdx - 1, 0); highlightActive(); e.preventDefault(); }
        else if (e.key === 'Enter' && currentItems[activeIdx]) { selectItem(currentItems[activeIdx]); e.preventDefault(); }
    });

    document.addEventListener('keydown', function(e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); togglePalette(); }
    });

    function togglePalette() { overlay.classList.contains('open') ? closePalette() : openPalette(); }
    function openPalette() { overlay.classList.add('open'); input.value = ''; input.focus(); search(''); activeIdx = -1; }
    function closePalette() { overlay.classList.remove('open'); }

    function search(q) {
        var items = getAllItems();
        q = q.toLowerCase().trim();
        if (q) {
            items = items.filter(function(it) {
                return it.title.toLowerCase().indexOf(q) >= 0 || (it.sub || '').toLowerCase().indexOf(q) >= 0;
            });
        }
        currentItems = items.slice(0, 20);
        activeIdx = currentItems.length > 0 ? 0 : -1;
        renderResults();
    }

    function getAllItems() {
        var items = [];
        // Pages
        var routes = ['overview','conductor','sessions','pipelines','phases','projects','design-system','labs','groovenet','build-studio','bootstrap'];
        routes.forEach(function(r) {
            items.push({ title: r.replace(/-/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); }), category: 'Page', action: function() { window.navigateTo && window.navigateTo(r); } });
        });
        // Projects
        if (typeof CortexData !== 'undefined') {
            CortexData.getProjectList().forEach(function(p) {
                items.push({ title: p.name, sub: p.slug, category: 'Project', action: function() {
                    window.navigateTo && window.navigateTo('overview');
                    setTimeout(function() { var s = document.getElementById('ov-project-select'); if (s) { s.value = p.slug; window.ovRefresh && window.ovRefresh(); } }, 200);
                }});
            });
        }
        // Sessions
        if (window.ConductorData && window.ConductorData.sessions) {
            var sessions = Array.isArray(window.ConductorData.sessions) ? window.ConductorData.sessions : [];
            sessions.slice(0, 50).forEach(function(s) {
                items.push({ title: s.id || 'Session', sub: (s.project_slug || '') + ' · ' + (s.status || ''), category: 'Session', action: function() {
                    window.navigateTo && window.navigateTo('sessions');
                }});
            });
        }
        // Pipelines
        if (window.ConductorData && window.ConductorData.pipelines) {
            window.ConductorData.pipelines.slice(0, 30).forEach(function(p) {
                items.push({ title: p.name || p.id || 'Pipeline', sub: (p.project_slug || '') + ' · ' + (p.status || ''), category: 'Pipeline', action: function() {
                    window.navigateTo && window.navigateTo('pipelines');
                }});
            });
        }
        // Recent
        var recent = getRecent();
        recent.forEach(function(r) { r.category = 'Recent'; });
        return recent.concat(items);
    }

    function renderResults() {
        if (!currentItems.length) { results.innerHTML = '<div class="cmd-palette__empty">No results found. Try a different search.</div>'; return; }
        var lastCat = '', html = '';
        currentItems.forEach(function(it, i) {
            if (it.category !== lastCat) { html += '<div class="cmd-palette__group">' + it.category + '</div>'; lastCat = it.category; }
            html += '<div class="cmd-palette__result' + (i === activeIdx ? ' is-active' : '') + '" data-idx="' + i + '">';
            html += '<span style="font-size:0.72rem;">' + it.title + '</span>';
            if (it.sub) html += '<span style="font-size:0.58rem;color:var(--text-dim);margin-left:4px;">' + it.sub + '</span>';
            html += '<span class="cmd-palette__result-badge">' + it.category + '</span></div>';
        });
        results.innerHTML = html;
        results.querySelectorAll('.cmd-palette__result').forEach(function(el) {
            el.addEventListener('click', function() { selectItem(currentItems[parseInt(el.dataset.idx)]); });
        });
    }

    function highlightActive() {
        results.querySelectorAll('.cmd-palette__result').forEach(function(el, i) {
            el.classList.toggle('is-active', i === activeIdx);
        });
        var active = results.querySelector('.is-active');
        if (active) active.scrollIntoView({ block: 'nearest' });
    }

    function selectItem(item) {
        if (!item) return;
        saveRecent(item.title);
        closePalette();
        if (item.action) item.action();
    }

    function getRecent() {
        try { return JSON.parse(localStorage.getItem('cmd-recent') || '[]'); } catch(e) { return []; }
    }
    function saveRecent(title) {
        var recent = getRecent().filter(function(r) { return r.title !== title; });
        recent.unshift({ title: title });
        recent = recent.slice(0, 5);
        localStorage.setItem('cmd-recent', JSON.stringify(recent));
    }
})();


// ============================================================
// 2. Live Event Pulse + Toast System
// ============================================================
(function initToasts() {
    var stack = document.createElement('div');
    stack.className = 'toast-stack';
    document.body.appendChild(stack);
    var toasts = [];

    window.CortexToast = {
        show: function(opts) {
            var el = document.createElement('div');
            el.className = 'event-toast' + (opts.type ? ' is-' + opts.type : '');
            el.innerHTML =
                '<div class="event-toast-body">' +
                '<div class="event-toast-title">' + (opts.title || 'Event') + '</div>' +
                '<div class="event-toast-desc">' + (opts.desc || '') + '</div>' +
                '<div class="event-toast-time">' + new Date().toLocaleTimeString() + '</div>' +
                '</div>' +
                '<button class="event-toast-close" onclick="this.parentElement.remove()">✕</button>';
            if (opts.onClick) el.addEventListener('click', function(e) { if (e.target.tagName !== 'BUTTON') opts.onClick(); });
            stack.appendChild(el);
            setTimeout(function() { el.classList.add('is-visible'); }, 20);
            // Auto dismiss
            setTimeout(function() { el.classList.remove('is-visible'); setTimeout(function() { el.remove(); }, 500); }, opts.duration || 5000);
            // Max 3
            while (stack.children.length > 3) stack.removeChild(stack.firstChild);
        }
    };

    // Try SSE connection (graceful fail)
    function connectSSE() {
        try {
            var es = new EventSource('/api/events/stream');
            es.onmessage = function(e) {
                try {
                    var data = JSON.parse(e.data);
                    var type = data.status === 'failed' ? 'failure' : data.status === 'succeeded' ? 'success' : 'info';
                    CortexToast.show({ title: data.type || 'Event', desc: data.message || data.id || '', type: type });
                    // Pulse heartbeat
                    pulseHeartbeat();
                } catch(ex) {}
            };
            es.onerror = function() { es.close(); };
        } catch(e) { /* SSE not available */ }
    }
    setTimeout(connectSSE, 2000);

    // Simulate periodic events from data for demo
    function simulateEvents() {
        if (!window.ConductorData || !window.ConductorData.sessions) return;
        var sessions = window.ConductorData.sessions;
        if (!sessions.length) return;
        setInterval(function() {
            var s = sessions[Math.floor(Math.random() * sessions.length)];
            CortexToast.show({
                title: s.status === 'succeeded' ? 'Session Completed' : s.status === 'failed' ? 'Session Failed' : 'Session Update',
                desc: (s.id || '').substring(0, 12) + ' · ' + (s.project_slug || '') + (s.cost_usd ? ' · $' + s.cost_usd.toFixed(2) : ''),
                type: s.status === 'failed' ? 'failure' : s.status === 'succeeded' ? 'success' : '',
                duration: 4000
            });
            pulseHeartbeat();
        }, 15000 + Math.random() * 10000);
    }
    window.addEventListener('conductor-data-ready', function() { setTimeout(simulateEvents, 5000); });
})();


// ============================================================
// 3. Cost/Token Ticker Bar
// ============================================================
(function initTicker() {
    function buildTicker() {
        if (!window.ConductorData) return;
        var sessions = window.ConductorData.sessions || [];
        if (!sessions.length) return;

        var existing = document.querySelector('.ticker-bar');
        if (existing) return;

        var bar = document.createElement('div');
        bar.className = 'ticker-bar';

        var items = [];
        // Recent sessions
        var sorted = sessions.slice().sort(function(a, b) { return (b.ended_at || b.created_at || '').localeCompare(a.ended_at || a.created_at || ''); });
        sorted.slice(0, 8).forEach(function(s) {
            var statusColor = s.status === 'succeeded' ? 'var(--accent-green)' : s.status === 'failed' ? 'var(--accent-red)' : s.status === 'running' ? 'var(--accent-cyan)' : 'var(--accent-slate)';
            items.push('<span class="ticker-item"><span class="ticker-dot" style="background:' + statusColor + '"></span>' +
                (s.id || '').substring(0, 12) + ' ' + s.status + (s.cost_usd ? ' — $' + s.cost_usd.toFixed(2) : '') +
                (s.tokens_in ? ' — ' + ((s.tokens_in + (s.tokens_out || 0)) / 1000).toFixed(1) + 'k tokens' : '') + '</span>');
        });

        // Totals
        var totalCost = sessions.reduce(function(s, x) { return s + (x.cost_usd || 0); }, 0);
        var totalIn = sessions.reduce(function(s, x) { return s + (x.tokens_in || 0); }, 0);
        var totalOut = sessions.reduce(function(s, x) { return s + (x.tokens_out || 0); }, 0);
        items.push('<span class="ticker-item"><span class="ticker-dot" style="background:var(--accent-gold)"></span>Total spend: $' + totalCost.toFixed(2) + '</span>');
        items.push('<span class="ticker-item"><span class="ticker-dot" style="background:var(--accent-blue)"></span>Tokens: ' + (totalIn / 1000).toFixed(0) + 'k in / ' + (totalOut / 1000).toFixed(0) + 'k out</span>');

        // Pipelines
        var pipelines = window.ConductorData.pipelines || [];
        pipelines.slice(0, 4).forEach(function(p) {
            var stageCount = (p.stages || []).length;
            var completed = (p.stages || []).filter(function(s) { return s.status === 'completed'; }).length;
            items.push('<span class="ticker-item"><span class="ticker-dot" style="background:var(--accent-violet)"></span>' +
                (p.name || p.id || '').substring(0, 20) + ' — stage ' + completed + '/' + stageCount + '</span>');
        });

        // Duplicate for seamless scroll
        var track = items.join('') + items.join('');
        bar.innerHTML = '<div class="ticker-track">' + track + '</div>';

        // Insert after topbar
        var topbar = document.querySelector('.topbar');
        if (topbar) topbar.parentNode.insertBefore(bar, topbar.nextSibling);
    }
    window.addEventListener('conductor-data-ready', buildTicker);
})();


// ============================================================
// 4. Staggered Page Transitions
// ============================================================
(function initPageTransitions() {
    if (_reducedMotion) return;

    window.staggerEntrance = function(container, delayMs) {
        if (!container) return;
        delayMs = delayMs || 40;
        var selectors = '.ov-kpi, .ov-panel, .card, .cortex-panel, .metric-card, .pj-card, .session-card, .kanban-column, .db-module-card, .db-theme-card, .ds-gallery-item';
        var items = container.querySelectorAll(selectors);
        items.forEach(function(el, i) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(10px)';
            setTimeout(function() {
                el.style.transition = 'opacity 0.3s var(--ease-out-expo), transform 0.3s var(--ease-out-expo)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, i * delayMs);
        });
    };

    // Hook into router
    var origNav = window.navigateTo;
    if (origNav) {
        // Will be called after page content is loaded by the router
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(m) {
                if (m.type === 'childList' && m.addedNodes.length) {
                    var content = document.getElementById('page-content');
                    if (content) setTimeout(function() { staggerEntrance(content, 35); }, 50);
                }
            });
        });
        var pageContent = document.getElementById('page-content');
        if (pageContent) observer.observe(pageContent, { childList: true });
    }
})();


// ============================================================
// 5. Skeleton Loading States
// ============================================================
(function initSkeletons() {
    window.CortexSkeleton = {
        kpiGrid: function(count) {
            var html = '';
            count = count || 8;
            for (var i = 0; i < count; i++) {
                html += '<div class="ov-kpi" style="min-height:80px;">';
                html += '<div class="skeleton skeleton-text"></div>';
                html += '<div class="skeleton skeleton-value"></div>';
                html += '<div class="skeleton skeleton-sparkline"></div>';
                html += '</div>';
            }
            return html;
        },
        panel: function() {
            return '<div class="skeleton skeleton-chart" style="margin:10px 0;"></div>';
        },
        feed: function(count) {
            var html = '';
            count = count || 5;
            for (var i = 0; i < count; i++) {
                html += '<div style="display:flex;gap:8px;padding:8px 0;border-bottom:1px solid var(--border-subtle);">';
                html += '<div class="skeleton" style="width:6px;height:6px;border-radius:50%;margin-top:6px;flex-shrink:0;"></div>';
                html += '<div style="flex:1;"><div class="skeleton skeleton-text" style="width:' + (50 + Math.random() * 40) + '%;"></div>';
                html += '<div class="skeleton skeleton-text" style="width:30%;height:8px;"></div></div>';
                html += '</div>';
            }
            return html;
        }
    };

    // Show skeletons on overview before data loads
    window.addEventListener('DOMContentLoaded', function() {
        var kpiGrid = document.getElementById('ov-kpi-grid');
        if (kpiGrid && !kpiGrid.children.length) kpiGrid.innerHTML = CortexSkeleton.kpiGrid(8);
    });
})();


// ============================================================
// 6. Cursor Aura
// ============================================================
(function initCursorAura() {
    if (_reducedMotion || _isTouch) return;

    var aura = document.createElement('div');
    aura.className = 'cursor-aura';
    document.body.appendChild(aura);

    var ax = -300, ay = -300, tx = -300, ty = -300;
    var visible = false;

    document.addEventListener('mousemove', function(e) {
        tx = e.clientX; ty = e.clientY;
        if (!visible) { visible = true; aura.style.opacity = '1'; }
    });
    document.addEventListener('mouseleave', function() {
        visible = false; aura.style.opacity = '0';
    });

    function update() {
        ax += (tx - ax) * 0.10;
        ay += (ty - ay) * 0.10;
        aura.style.left = ax + 'px';
        aura.style.top = ay + 'px';
        requestAnimationFrame(update);
    }
    aura.style.opacity = '0';
    update();
})();


// ============================================================
// 7. Holographic Card Tilt
// ============================================================
(function initCardTilt() {
    if (_reducedMotion || _isTouch) return;

    function enableTilt(card) {
        card.addEventListener('mousemove', function(e) {
            var rect = card.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width - 0.5;
            var y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = 'perspective(800px) rotateY(' + (x * 4) + 'deg) rotateX(' + (-y * 4) + 'deg) translateY(-1px)';
            card.style.transition = 'transform 0.1s';
        });
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s var(--ease-out-expo)';
        });
    }

    // Apply to cards after page loads
    function applyTilt() {
        document.querySelectorAll('.ov-kpi, .ov-project-card, .pj-card, .metric-card').forEach(enableTilt);
    }

    window.addEventListener('conductor-data-ready', function() { setTimeout(applyTilt, 500); });
    // Re-apply on route change
    var observer = new MutationObserver(function() { setTimeout(applyTilt, 200); });
    var pc = document.getElementById('page-content');
    if (pc) observer.observe(pc, { childList: true });
})();


// ============================================================
// 8. Predictive Ghost Metrics
// ============================================================
(function initGhostMetrics() {
    window.CortexGhost = {
        predict: function(points) {
            if (!points || points.length < 4) return null;
            // Simple linear regression on last 6 points
            var n = Math.min(6, points.length);
            var slice = points.slice(-n);
            var sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
            for (var i = 0; i < n; i++) {
                sumX += i; sumY += slice[i]; sumXY += i * slice[i]; sumX2 += i * i;
            }
            var slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
            var intercept = (sumY - slope * sumX) / n;
            var predicted = slope * n + intercept;
            var direction = slope > 0 ? '↗' : slope < 0 ? '↘' : '→';
            return { value: Math.max(0, predicted), direction: direction, slope: slope };
        },
        renderGhostValue: function(container, prediction, fmt) {
            if (!prediction || !container) return;
            var val = prediction.value;
            var fmtVal = fmt === 'usd' ? '$' + val.toFixed(2)
                : fmt === 'pct' ? val.toFixed(1) + '%'
                : fmt === 'ratio' ? val.toFixed(2)
                : Math.round(val).toLocaleString();
            var html = '<div class="metric-ghost">' + prediction.direction + ' ' + fmtVal + '</div>';
            html += '<div class="metric-ghost-label">predicted</div>';
            container.innerHTML = html;
        }
    };
})();


// ============================================================
// 9. Session Replay Timeline
// ============================================================
(function initSessionTimeline() {
    window.CortexTimeline = {
        render: function(container, sessionId) {
            if (!container || !sessionId) return;
            container.innerHTML = '<div style="padding:12px;color:var(--text-dim);font-size:0.68rem;">Loading timeline...</div>';

            fetch('data/sessions/' + sessionId + '.jsonl').then(function(r) {
                if (!r.ok) throw new Error('Not found');
                return r.text();
            }).then(function(text) {
                var lines = text.trim().split('\n');
                var events = [];
                lines.forEach(function(line) {
                    try { events.push(JSON.parse(line)); } catch(e) {}
                });
                if (!events.length) { container.innerHTML = '<div style="color:var(--text-faint);font-size:0.68rem;">No events in timeline</div>'; return; }

                var html = '<div class="session-timeline"><div class="session-timeline__track"></div>';
                var firstTs = new Date(events[0].timestamp || events[0].ts || 0).getTime();
                var lastTs = new Date(events[events.length - 1].timestamp || events[events.length - 1].ts || 0).getTime();
                var range = lastTs - firstTs || 1;

                events.forEach(function(ev, i) {
                    var ts = new Date(ev.timestamp || ev.ts || 0).getTime();
                    var pct = ((ts - firstTs) / range) * 100;
                    var left = 16 + (pct / 100) * (100 - 32 / container.offsetWidth * 100);
                    var type = ev.type || 'info';
                    var color = type === 'tool_call' ? 'var(--accent-cyan)'
                        : type === 'file_edit' ? 'var(--accent-green)'
                        : type === 'error' ? 'var(--accent-red)'
                        : type === 'cost' ? 'var(--accent-amber)' : 'var(--text-muted)';

                    html += '<div class="session-timeline__dot" style="left:' + pct + '%;background:' + color + ';';
                    if (!_reducedMotion) html += 'animation:fadeInStagger 0.2s ' + (i * 20) + 'ms var(--ease-out-expo) both;';
                    html += '" title="' + type + ' — ' + (ev.message || ev.tool || ev.file || '').substring(0, 60) + '"></div>';
                });

                html += '</div>';
                html += '<div style="display:flex;justify-content:space-between;font-size:0.55rem;color:var(--text-faint);margin-top:4px;font-family:var(--font-mono);">';
                html += '<span>' + events.length + ' events</span>';
                html += '<span>' + Math.round(range / 1000) + 's duration</span>';
                html += '</div>';
                container.innerHTML = html;
            }).catch(function() {
                container.innerHTML = '<div style="color:var(--text-faint);font-size:0.68rem;padding:8px;">Timeline not available</div>';
            });
        }
    };
})();


// ============================================================
// 11. Ambient Status Halo
// ============================================================
(function initStatusHalo() {
    if (_reducedMotion) return;

    var halo = document.createElement('div');
    halo.className = 'status-halo';
    document.body.insertBefore(halo, document.body.firstChild);

    function updateHalo() {
        if (typeof CortexData === 'undefined') return;
        var m = CortexData.computeMetrics();
        halo.classList.remove('is-healthy', 'is-warning', 'is-critical');
        if (m.healthScore >= 70) halo.classList.add('is-healthy');
        else if (m.healthScore >= 40) halo.classList.add('is-warning');
        else halo.classList.add('is-critical');
    }

    window.addEventListener('conductor-data-ready', updateHalo);
    window.addEventListener('dashboard-config-changed', updateHalo);
})();


// ============================================================
// 12. Morphing Number Transitions
// ============================================================
(function initMorphNumbers() {
    window.morphNumber = function(element, newValue, options) {
        if (_reducedMotion) { element.textContent = options.formatter ? options.formatter(newValue) : String(newValue); return; }
        options = options || {};
        var formatted = options.formatter ? options.formatter(newValue) : String(Math.round(newValue));
        var chars = formatted.split('');
        element.innerHTML = '';
        chars.forEach(function(char, i) {
            var span = document.createElement('span');
            span.className = 'morph-digit';
            if (/\d/.test(char)) {
                span.style.animationDelay = (i * 60) + 'ms';
                span.classList.add('morph-digit--animate');
            }
            span.textContent = char;
            element.appendChild(span);
        });
    };
})();


// ============================================================
// 13. Network Heartbeat Ring
// ============================================================
(function initHeartbeat() {
    var connDot = document.getElementById('conn-dot');
    if (!connDot) return;

    // Replace conn-dot with heartbeat ring
    var ring = document.createElement('div');
    ring.className = 'heartbeat-ring';
    ring.id = 'heartbeat-ring';
    ring.title = 'Connected';
    connDot.parentNode.replaceChild(ring, connDot);

    window.pulseHeartbeat = function() {
        var r = document.getElementById('heartbeat-ring');
        if (!r) return;
        var ripple = document.createElement('div');
        ripple.className = 'heartbeat-ring__ripple';
        r.appendChild(ripple);
        setTimeout(function() { ripple.remove(); }, 900);
    };

    // Pulse periodically
    setInterval(function() {
        if (!document.hidden) pulseHeartbeat();
    }, 8000);
})();


// ============================================================
// 14. Context Zoom
// ============================================================
(function initContextZoom() {
    window.contextZoomKPI = function(el) {
        if (!el) return;
        var isZoomed = el.classList.contains('is-zoomed');

        // Unzoom all first
        document.querySelectorAll('.ov-kpi.is-zoomed').forEach(function(z) {
            z.classList.remove('is-zoomed');
            z.style.cssText = '';
        });
        document.querySelectorAll('.ov-kpi.is-peer-dimmed').forEach(function(d) {
            d.classList.remove('is-peer-dimmed');
        });

        if (isZoomed) return; // Was already zoomed, just unzoom

        // Zoom this card
        var grid = el.parentElement;
        if (!grid) return;
        var gridRect = grid.getBoundingClientRect();

        el.classList.add('is-zoomed');
        el.style.left = gridRect.left + 'px';
        el.style.top = gridRect.top + 'px';
        el.style.width = gridRect.width + 'px';
        el.style.height = Math.max(300, gridRect.height) + 'px';

        // Dim peers
        grid.querySelectorAll('.ov-kpi').forEach(function(sib) {
            if (sib !== el) sib.classList.add('is-peer-dimmed');
        });

        // ESC to close
        function onEsc(e) {
            if (e.key === 'Escape') {
                el.classList.remove('is-zoomed');
                el.style.cssText = '';
                grid.querySelectorAll('.ov-kpi.is-peer-dimmed').forEach(function(d) { d.classList.remove('is-peer-dimmed'); });
                document.removeEventListener('keydown', onEsc);
            }
        }
        document.addEventListener('keydown', onEsc);
    };
})();


})();
