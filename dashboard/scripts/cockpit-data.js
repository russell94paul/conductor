/* ============================================================
   Conductor Cortex — Data Adapter
   scripts/cockpit-data.js
   ============================================================ */
(function() {
'use strict';

var CortexData = window.CortexData = {};

// --- Raw data cache ---
var _raw = { sessions: [], pipelines: [], projects: [] };

// --- Load & normalize ---
CortexData.load = function() {
    return Promise.all([
        tryFetch('data/sessions.json'),
        tryFetch('data/pipelines.json'),
        tryFetch('data/projects.json')
    ]).then(function(res) {
        var sessData = res[0];
        _raw.sessions = (sessData && sessData.sessions) ? sessData.sessions
            : Array.isArray(sessData) ? sessData : [];
        _raw.pipelines = Array.isArray(res[1]) ? res[1] : [];
        _raw.projects = Array.isArray(res[2]) ? res[2] : [];

        // Derive projects if not available
        if (!_raw.projects.length) {
            _raw.projects = deriveProjects();
        }

        window.ConductorData = {
            sessions: _raw.sessions,
            pipelines: _raw.pipelines,
            projects: _raw.projects
        };
        window.dispatchEvent(new CustomEvent('conductor-data-ready'));
        return _raw;
    });
};

function tryFetch(url) {
    return fetch(url).then(function(r) { return r.ok ? r.json() : null; }).catch(function() { return null; });
}

function deriveProjects() {
    var slugs = {};
    _raw.sessions.forEach(function(s) {
        if (s.project_slug) slugs[s.project_slug] = true;
    });
    _raw.pipelines.forEach(function(p) {
        if (p.project_slug) slugs[p.project_slug] = true;
    });
    return Object.keys(slugs).map(function(slug) {
        return { slug: slug, name: slug.replace(/-/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); }) };
    });
}

// --- Filtering ---
CortexData.getProjectList = function() {
    return _raw.projects.map(function(p) {
        return { slug: p.slug || p.id || p.name, name: p.name || p.slug || p.id };
    });
};

CortexData.filterSessions = function(project) {
    if (!project || project === 'all') return _raw.sessions;
    return _raw.sessions.filter(function(s) { return s.project_slug === project; });
};

CortexData.filterPipelines = function(project) {
    if (!project || project === 'all') return _raw.pipelines;
    return _raw.pipelines.filter(function(p) { return p.project_slug === project; });
};

// --- Derived Metrics ---
CortexData.computeMetrics = function(project) {
    var sessions = CortexData.filterSessions(project);
    var pipelines = CortexData.filterPipelines(project);

    var total = sessions.length;
    var running = 0, succeeded = 0, failed = 0;
    var totalCost = 0, totalIn = 0, totalOut = 0;

    sessions.forEach(function(s) {
        if (s.status === 'running') running++;
        else if (s.status === 'succeeded') succeeded++;
        else if (s.status === 'failed') failed++;
        totalCost += (s.cost_usd || 0);
        totalIn += (s.tokens_in || 0);
        totalOut += (s.tokens_out || 0);
    });

    var successRate = total > 0 ? (succeeded / total) * 100 : 0;
    var failureRate = total > 0 ? (failed / total) * 100 : 0;
    var avgCost = total > 0 ? totalCost / total : 0;
    var costPerSuccess = succeeded > 0 ? totalCost / succeeded : 0;
    var tokenRatio = totalIn > 0 ? totalOut / totalIn : 0;

    // Pipeline metrics
    var totalPipelines = pipelines.length;
    var completedPipelines = 0, runningPipelines = 0, failedPipelines = 0, pendingPipelines = 0;
    var totalStages = 0, completedStages = 0, runningStages = 0, failedStages = 0, pendingStages = 0;

    pipelines.forEach(function(p) {
        if (p.status === 'completed') completedPipelines++;
        else if (p.status === 'running') runningPipelines++;
        else if (p.status === 'failed') failedPipelines++;
        else if (p.status === 'pending') pendingPipelines++;
        (p.stages || []).forEach(function(s) {
            totalStages++;
            if (s.status === 'completed') completedStages++;
            else if (s.status === 'running') runningStages++;
            else if (s.status === 'failed') failedStages++;
            else pendingStages++;
        });
    });

    var pipelineCompletion = totalPipelines > 0 ? (completedPipelines / totalPipelines) * 100 : 0;
    var stageCompletion = totalStages > 0 ? (completedStages / totalStages) * 100 : 0;

    // Health score
    var activeStability = running > 0 ? Math.max(0, 100 - (failed / Math.max(1, running)) * 50) : 100;
    var costEfficiency = totalCost > 0 ? Math.min(100, (succeeded * 2 / totalCost) * 100) : 80;
    var freshness = computeFreshness(sessions);

    var health = Math.round(
        successRate * 0.40 +
        pipelineCompletion * 0.25 +
        stageCompletion * 0.15 +
        activeStability * 0.10 +
        costEfficiency * 0.07 +
        freshness * 0.03
    );
    health = Math.max(0, Math.min(100, health));

    return {
        // Sessions
        totalSessions: total,
        runningSessions: running,
        succeededSessions: succeeded,
        failedSessions: failed,
        successRate: Math.round(successRate * 10) / 10,
        failureRate: Math.round(failureRate * 10) / 10,
        // Cost
        totalCost: totalCost,
        avgCost: avgCost,
        costPerSuccess: costPerSuccess,
        // Tokens
        totalTokensIn: totalIn,
        totalTokensOut: totalOut,
        tokenRatio: Math.round(tokenRatio * 100) / 100,
        // Pipelines
        totalPipelines: totalPipelines,
        completedPipelines: completedPipelines,
        runningPipelines: runningPipelines,
        failedPipelines: failedPipelines,
        pendingPipelines: pendingPipelines,
        pipelineCompletion: Math.round(pipelineCompletion * 10) / 10,
        // Stages
        totalStages: totalStages,
        completedStages: completedStages,
        runningStages: runningStages,
        failedStages: failedStages,
        pendingStages: pendingStages,
        stageCompletion: Math.round(stageCompletion * 10) / 10,
        // Health
        healthScore: health,
        // Status breakdown
        sessionsByStatus: { running: running, succeeded: succeeded, failed: failed, queued: total - running - succeeded - failed },
        pipelinesByStatus: { completed: completedPipelines, running: runningPipelines, failed: failedPipelines, pending: pendingPipelines, cancelled: totalPipelines - completedPipelines - runningPipelines - failedPipelines - pendingPipelines }
    };
};

function computeFreshness(sessions) {
    if (!sessions.length) return 0;
    var now = Date.now();
    var latestTs = 0;
    sessions.forEach(function(s) {
        var t = new Date(s.ended_at || s.started_at || s.created_at || 0).getTime();
        if (t > latestTs) latestTs = t;
    });
    var hoursSince = (now - latestTs) / 3600000;
    if (hoursSince < 1) return 100;
    if (hoursSince < 6) return 85;
    if (hoursSince < 24) return 60;
    if (hoursSince < 72) return 30;
    return 10;
}

// --- Per-project metrics ---
CortexData.computeProjectCards = function() {
    var projects = CortexData.getProjectList();
    return projects.map(function(p) {
        var m = CortexData.computeMetrics(p.slug);
        var sessions = CortexData.filterSessions(p.slug);
        var latest = '';
        sessions.forEach(function(s) {
            var t = s.ended_at || s.started_at || s.created_at || '';
            if (t > latest) latest = t;
        });
        return {
            slug: p.slug,
            name: p.name,
            metrics: m,
            latestActivity: latest
        };
    });
};

// --- Activity heatmap data ---
CortexData.computeHeatmap = function(project, mode) {
    var sessions = CortexData.filterSessions(project);
    mode = mode || 'sessions';
    var buckets = {};

    sessions.forEach(function(s) {
        var d = (s.created_at || '').substring(0, 10);
        if (!d) return;
        if (!buckets[d]) buckets[d] = { sessions: 0, failures: 0, cost: 0, tokens: 0 };
        buckets[d].sessions++;
        if (s.status === 'failed') buckets[d].failures++;
        buckets[d].cost += (s.cost_usd || 0);
        buckets[d].tokens += (s.tokens_in || 0) + (s.tokens_out || 0);
    });

    // Convert to array sorted by date
    var dates = Object.keys(buckets).sort();
    return dates.map(function(d) {
        var b = buckets[d];
        var val = mode === 'failures' ? b.failures
            : mode === 'cost' ? b.cost
            : mode === 'tokens' ? b.tokens
            : b.sessions;
        return { date: d, value: val, raw: b };
    });
};

// --- Sparkline data ---
CortexData.computeSparkline = function(project, metric, points) {
    var sessions = CortexData.filterSessions(project);
    points = points || 12;
    if (!sessions.length) return [];

    // Sort by created_at
    var sorted = sessions.slice().sort(function(a, b) {
        return (a.created_at || '').localeCompare(b.created_at || '');
    });

    // Bucket into N equal time segments
    var result = [];
    var chunk = Math.max(1, Math.ceil(sorted.length / points));
    for (var i = 0; i < sorted.length; i += chunk) {
        var slice = sorted.slice(i, i + chunk);
        var val = 0;
        slice.forEach(function(s) {
            if (metric === 'cost') val += (s.cost_usd || 0);
            else if (metric === 'tokens') val += (s.tokens_in || 0) + (s.tokens_out || 0);
            else if (metric === 'success') val += (s.status === 'succeeded' ? 1 : 0);
            else val += 1; // sessions count
        });
        result.push(val);
    }
    return result;
};

// --- Progress segments ---
CortexData.computeProgressSegments = function(project, type) {
    var m = CortexData.computeMetrics(project);
    if (type === 'pipeline') {
        return [
            { status: 'completed', count: m.completedPipelines, color: 'var(--status-complete)' },
            { status: 'running', count: m.runningPipelines, color: 'var(--status-running)' },
            { status: 'failed', count: m.failedPipelines, color: 'var(--status-failed)' },
            { status: 'pending', count: m.pendingPipelines, color: 'var(--status-planned)' }
        ];
    }
    var sb = m.sessionsByStatus;
    return [
        { status: 'succeeded', count: sb.succeeded, color: 'var(--status-complete)' },
        { status: 'running', count: sb.running, color: 'var(--status-running)' },
        { status: 'failed', count: sb.failed, color: 'var(--status-failed)' },
        { status: 'queued', count: sb.queued, color: 'var(--status-planned)' }
    ];
};

// --- AI Summary (deterministic) ---
CortexData.generateSummary = function(project) {
    var m = CortexData.computeMetrics(project);
    var projLabel = (!project || project === 'all') ? 'All projects' : project.replace(/-/g, ' ');
    var parts = [];
    parts.push(projLabel + ' operating at ' + m.healthScore + '% health.');
    parts.push(m.totalPipelines + ' pipelines detected, ' + m.runningPipelines + ' running.');
    if (m.failedSessions > 0) {
        // Find project with most failures
        if (!project || project === 'all') {
            var projectFailures = {};
            _raw.sessions.forEach(function(s) {
                if (s.status === 'failed' && s.project_slug) {
                    projectFailures[s.project_slug] = (projectFailures[s.project_slug] || 0) + 1;
                }
            });
            var worst = Object.keys(projectFailures).sort(function(a, b) { return projectFailures[b] - projectFailures[a]; })[0];
            if (worst) parts.push('Most failures concentrated in ' + worst + '.');
        } else {
            parts.push(m.failedSessions + ' failed sessions detected.');
        }
    }
    parts.push('Total cost: $' + m.totalCost.toFixed(2) + '.');
    if (m.successRate >= 80) parts.push('Success rate is healthy at ' + m.successRate + '%.');
    else if (m.successRate >= 50) parts.push('Success rate at ' + m.successRate + '% — room for improvement.');
    else parts.push('Success rate critical at ' + m.successRate + '% — investigate failures.');
    return parts.join(' ');
};

})();
