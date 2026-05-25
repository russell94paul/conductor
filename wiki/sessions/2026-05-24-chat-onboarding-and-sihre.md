---
tags: [session, feature, onboarding, sihre]
created: 2026-05-25
updated: 2026-05-25
---

# Session: Chat Onboarding + SIHRE Project Bootstrap

## What was built

1. **AI Chat Onboarding** — new tab in Product Onboarding Studio. Conversational project scoping powered by Claude (API or CLI fallback). Produces phase proposals, architecture cards, and final blueprint with Create Project button.

2. **SIHRE project onboarded** — first real project created via chat onboarding. 9 phases (P0-P8), 6 architecture decisions, full blueprint from conversational analysis of the SIHRE-Framework wiki/research docs.

3. **Dynamic project dropdown** — phases page now populates project list from API instead of hardcoded options. New projects appear automatically.

4. **Parallelism auto-detection** — `_compute_parallel_flags()` analyzes phase dependency graphs and sets `canRunInParallel` automatically for future projects.

5. **GitHub repo fix** — conductor remote was pointed at `labs-institute-prototype`. Created `russell94paul/conductor` repo, repointed remote, pushed full history.

## Key decisions

- **Claude CLI as default** — API key was invalid; CLI fallback via `claude -p` subprocess works with existing Claude Code auth. Both paths supported.
- **10 max turns, 300s timeout** — large prompts (SIHRE boot prompt was ~5000 words) need room for Claude to read files and respond.
- **Redirect to Projects page** — after project creation, navigates to Projects (not Phases) since the phases dropdown needs the project slug passed via URL hash.

## SIHRE phases created

P0 Bootstrap, P1 Artifact Manager, P2 Roadmap & Action Items, P3 Content & GTM, P4 Public Website, P5 Portal & Auth, P6 Monetization, P7 Knowledge Base, P8 Control Plane MVP.

Parallel pairs: P2+P3 (both depend on P1), P5+P7 (both depend on P4).
