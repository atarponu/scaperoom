# Scaperoom Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a production-ready Next.js interactive historical narrative experience set in Nazi-occupied Amsterdam, 1942.

**Architecture:** Single-page scene-state machine at `/experience`, Zustand store as runtime truth, Supabase for persistence, OpenAI for dynamic NPC dialogue, CSS-only atmospheric backgrounds, Framer Motion transitions.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Zustand, Supabase JS, OpenAI SDK, Howler.js

**Spec:** `docs/superpowers/specs/2026-05-16-scaperoom-design.md`

---

### Task 1: Project Configuration

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.js`
- Create: `.env.local.example`
- Create: `.gitignore`

- [ ] Write all config files (see full content in plan body)
- [ ] Run `npm install`
- [ ] Verify `npm run build` shows no config errors
- [ ] Commit: `chore: project configuration`

---

### Task 2: TypeScript Type Definitions

**Files:**
- Create: `types/narrative.ts`
- Create: `types/memory.ts`
- Create: `types/npc.ts`

---

### Task 3: Zustand Game Store

**Files:**
- Create: `stores/gameStore.ts`

---

### Task 4: Supabase Integration

**Files:**
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/queries.ts`
- Create: `supabase/schema.sql`
- Create: `app/api/session/route.ts`
- Create: `app/api/memory/route.ts`

---

### Task 5: OpenAI Dialogue System

**Files:**
- Create: `lib/ai/dialogue.ts`
- Create: `app/api/dialogue/route.ts`

---

### Task 6: Narrative Engine + Audio Manager

**Files:**
- Create: `lib/narrative/engine.ts`
- Create: `lib/audio/manager.ts`

---

### Task 7: NPC Definitions + Scene Data Foundation

**Files:**
- Create: `data/npcs/definitions.ts`
- Create: `data/scenes/index.ts`
- Create: `data/scenes/intro.ts`
- Create: `data/scenes/identity-setup.ts`

---

### Task 8: Scene Data — Acts 1–3

**Files:**
- Create: `data/scenes/act1.ts`
- Create: `data/scenes/act2.ts`
- Create: `data/scenes/act3.ts`

---

### Task 9: Scene Data — Acts 4–5 + Epilogue

**Files:**
- Create: `data/scenes/act4.ts`
- Create: `data/scenes/act5.ts`
- Create: `data/scenes/epilogue.ts`

---

### Task 10: Cinematic Visual Components

**Files:**
- Create: `components/cinematic/FilmGrain.tsx`
- Create: `components/cinematic/VignetteLayer.tsx`
- Create: `components/cinematic/LetterboxBars.tsx`
- Create: `components/cinematic/CinematicContainer.tsx`
- Create: `components/cinematic/SceneBackground.tsx`

---

### Task 11: Narrative UI Components

**Files:**
- Create: `components/ui/TypewriterText.tsx`
- Create: `components/ui/FadeContainer.tsx`
- Create: `components/ui/MuseumCard.tsx`
- Create: `components/narrative/DialogueBox.tsx`
- Create: `components/narrative/ChoicePanel.tsx`
- Create: `components/narrative/NPCPortrait.tsx`
- Create: `components/narrative/SceneTransition.tsx`
- Create: `components/audio/AudioManager.tsx`

---

### Task 12: Scene Components — Intro through Act 2

**Files:**
- Create: `components/scenes/SceneIntro.tsx`
- Create: `components/scenes/SceneIdentitySetup.tsx`
- Create: `components/scenes/SceneAct1Building.tsx`
- Create: `components/scenes/SceneAct1Attic.tsx`
- Create: `components/scenes/SceneAct2Checkpoint.tsx`

---

### Task 13: Scene Components — Acts 3–5 + Epilogue + Credits

**Files:**
- Create: `components/scenes/SceneAct3Bookshop.tsx`
- Create: `components/scenes/SceneAct4Night.tsx`
- Create: `components/scenes/SceneAct4Street.tsx`
- Create: `components/scenes/SceneAct5Outcomes.tsx`
- Create: `components/scenes/SceneEpilogue.tsx`
- Create: `components/scenes/SceneCredits.tsx`

---

### Task 14: App Shell + Experience Router + Landing Page

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/experience/page.tsx`

---
