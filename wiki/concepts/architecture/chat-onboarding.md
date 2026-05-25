---
tags: [conductor, architecture, onboarding, claude-api]
created: 2026-05-25
updated: 2026-05-25
---

# Chat Onboarding

AI-powered conversational project onboarding. Alternative to the guided form — users describe their project naturally and Claude acts as a technical architect to produce a phased project blueprint.

## Architecture

- **Backend**: `engine/onboarding.py` — session management, Claude integration, blueprint extraction
- **Frontend**: Chat tab in `dashboard/pages/onboarding-studio.html` — message bubbles, structured card rendering, blueprint side panel
- **Routes**: `POST /api/onboarding/chat`, `GET /api/onboarding/{id}`, `POST /api/onboarding/{id}/create`

## Claude Integration (dual-mode)

1. **Anthropic API** — if `ANTHROPIC_API_KEY` is set in `.env`, calls Claude directly (faster)
2. **Claude CLI fallback** — spawns `claude -p` subprocess (uses existing Claude Code auth, no API key needed)

CLI mode uses `--max-turns 10` and 300s timeout. System prompt + full conversation history passed as a single prompt.

## System Prompt

Instructs Claude to:
- Act as a senior technical architect
- Ask focused questions (1-2 at a time)
- Output structured JSON blocks (`phase_proposal`, `architecture`, `blueprint`) that the UI renders as interactive cards
- Track decisions and iterate on the phase plan

## Structured Output Protocol

Claude includes JSON blocks in responses (```json fences with a `type` field):
- `phase_proposal` — rendered as phase cards with complexity/risk badges
- `architecture` — rendered as stack chips + component table
- `blueprint` — final project definition with "Create Project" button

## Project Creation Flow

`POST /api/onboarding/{session_id}/create` → same artifacts as form flow:
- `projects/{slug}/project.json`
- Phase entries in `config/phase-status.json` (with auto-computed `canRunInParallel`)
- Memory seed with onboarding decisions
- Wiki template

## Parallelism Detection

`_compute_parallel_flags()` analyzes the dependency graph: phases that share identical dependencies and have no ancestor/descendant relationship are marked `canRunInParallel: true`.

## State

- Server-side: `dashboard/data/onboarding-sessions.json`
- Client-side: `localStorage` key `conductor_chat_onboarding` (conversation HTML for restore on refresh)
