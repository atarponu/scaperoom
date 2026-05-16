# Scaperoom: Interactive Historical Escape Room — Design Specification

> **Project:** `~/Desktop/scaperoom`  
> **Date:** 2026-05-16  
> **Stack:** Next.js 14 (App Router), TypeScript, Tailwind, Framer Motion, Zustand, Supabase, OpenAI

---

## Core Vision

A museum-grade interactive historical installation simulating civilian survival under Nazi occupation (Amsterdam, 1942). NOT a game. No scores, no win states. Narrative survival simulation with emotional weight, moral consequence, and historical grounding.

Duration: 15–30 minutes. Fully self-contained. Desktop + iPad Safari optimized.

---

## Architectural Decisions

### Single-Page Scene Architecture
The entire experience lives at `/experience`. Scene navigation is state-driven (Zustand), not URL-driven. `AnimatePresence` handles transitions. No URL-per-scene to prevent accidental back-navigation destroying immersion.

Landing page at `/` (cinematic enter portal). Experience at `/experience`.

### State Layer
- **Zustand** in-memory store — primary runtime state
- **localStorage** — instant local persistence, session resume
- **Supabase** — server-side session persistence, optional auth

### AI Dialogue
- OpenAI GPT-4o streaming via `/api/dialogue`
- Each NPC has a hardcoded system prompt encoding: character, 1942 dialect, memory of player decisions, emotional constraints
- Sessions send: NPC id + last 6 exchanges + relevant flags from store
- Responses are streamed char-by-char for typewriter effect

### Visual Design Language
- Color palette: near-black `#0a0805`, warm cream `#e8d5b7`, muted gold `#c4a882`, deep red `#8b2c2c`, olive `#4a6741`
- NO external image assets — all backgrounds are CSS (gradients, layered divs, pseudo-elements)
- Film grain: CSS `@keyframes` + SVG noise filter
- Vignette: CSS `radial-gradient`
- Letterbox bars: Framer Motion animated top/bottom black bars
- Typography: Playfair Display (narrative), Special Elite (titles/dates), Inter (UI)

### Audio
- Howler.js for audio management
- Graceful degradation: if no audio files present, AudioManager silently no-ops
- Audio tracks: `ambient-room`, `ambient-street`, `ambient-checkpoint`, `tension-drone`, `silence`
- Howler fades between tracks on scene change

### No Gamification
- Risk level: stored as 0–100 integer, **never displayed to player**
- NPC trust: stored as -1.0 to 1.0 float, **never displayed to player**
- No progress bars, health meters, score indicators
- No "correct answer" highlighting

---

## Scene Map

```
intro → identity-setup
       ↓
act1-building ─→ act1-attic ─→ act2-checkpoint
       ↓                              ↓
(skip attic)─────────────────→ act2-checkpoint
                                      ↓
                               act3-bookshop
                                      ↓
                              act3-resistance (if contact made)
                              act3-no-contact (if not)
                                      ↓
                               act4-preparation
                                      ↓
                                act4-street
                                      ↓
                            act4-final-checkpoint
                                      ↓
              ┌───────────────────────┤
              ↓           ↓           ↓
         outcome-a    outcome-b    outcome-c
              └───────────┬───────────┘
                          ↓
                       epilogue
                          ↓
                        credits
```

---

## NPCs

| ID | Name | Role | Trust Range |
|---|---|---|---|
| `elsa` | Elsa Weiss | Jewish woman in hiding, attic | 0 → 1 |
| `werner` | Werner Brandt | German checkpoint soldier | -1 (enemy, no trust) |
| `marta` | Marta Jansen | Resistance bookshop owner | 0 → 0.8 |
| `jan` | Jan Koopman | Underground network leader | 0 → 0.9 |
| `mrs_devries` | Mrs. de Vries | Elderly neighbor (neutral/gossip) | N/A |

---

## Outcome Decision Matrix

| Scenario | Elsa known? | Resistance contacted? | Risk at checkpoint | Outcome |
|---|---|---|---|---|
| Best case | ✓ | ✓ | < 40 | outcome-a: Both safe |
| Partial | ✓ | ✗ | < 60 | outcome-b: Elsa safe, player watched |
| Loss | ✓ | ✗ | ≥ 60 | outcome-c: Elsa captured |
| Pyrrhic | ✓ | ✓ | 40–60 | outcome-d: Safe but Jan arrested |
| Unknown | ✗ | any | any | outcome-e: Stranger's fate unknown |

---

## API Surface

```
POST /api/session          Create/load session
GET  /api/session          Get current session
POST /api/memory           Sync game state to Supabase  
POST /api/dialogue         Stream NPC AI response
```

---

## Credits (Final Screen)

Developed by:
- Mario Araitoarro
- Xabier Saez  
- Aitor García
