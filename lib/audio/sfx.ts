export type SfxId =
  | 'choice-hover'
  | 'choice-select'
  | 'footstep-wood'
  | 'door-creak'
  | 'paper-rustle'
  | 'heartbeat'
  | 'distant-siren'
  | 'clock-tick'
  | 'phase-change'
  | 'scene-attic'
  | 'scene-checkpoint'
  | 'scene-bookshop'

let _ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  try {
    if (!_ctx) {
      _ctx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }
    return _ctx
  } catch {
    return null
  }
}

function noise(ctx: AudioContext, seconds: number): AudioBuffer {
  const n = Math.floor(ctx.sampleRate * seconds)
  const buf = ctx.createBuffer(1, n, ctx.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1
  return buf
}

export async function playSfx(id: SfxId): Promise<void> {
  const ctx = getCtx()
  if (!ctx) return
  if (ctx.state === 'suspended') {
    try { await ctx.resume() } catch { return }
  }

  const t = ctx.currentTime

  switch (id) {
    // ── Choice hover: barely-there high tick
    case 'choice-hover': {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.value = 900
      g.gain.setValueAtTime(0.025, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05)
      o.connect(g); g.connect(ctx.destination)
      o.start(t); o.stop(t + 0.06)
      break
    }

    // ── Choice select: weighted thunk + paper
    case 'choice-select': {
      // Low thunk
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.setValueAtTime(130, t)
      o.frequency.exponentialRampToValueAtTime(55, t + 0.14)
      g.gain.setValueAtTime(0.18, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
      o.connect(g); g.connect(ctx.destination)
      o.start(t); o.stop(t + 0.2)
      // Paper rustle
      const src = ctx.createBufferSource()
      src.buffer = noise(ctx, 0.28)
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'; bp.frequency.value = 3500; bp.Q.value = 1.5
      const pg = ctx.createGain()
      pg.gain.setValueAtTime(0.07, t + 0.05)
      pg.gain.exponentialRampToValueAtTime(0.0001, t + 0.3)
      src.connect(bp); bp.connect(pg); pg.connect(ctx.destination)
      src.start(t + 0.04)
      break
    }

    // ── Footstep on wooden floor
    case 'footstep-wood': {
      const src = ctx.createBufferSource()
      src.buffer = noise(ctx, 0.12)
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'; bp.frequency.value = 220; bp.Q.value = 0.6
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.22, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14)
      src.connect(bp); bp.connect(g); g.connect(ctx.destination)
      src.start(t)
      break
    }

    // ── Old wooden door creak
    case 'door-creak': {
      const o = ctx.createOscillator()
      const lfo = ctx.createOscillator()
      const lfoG = ctx.createGain()
      const lp = ctx.createBiquadFilter()
      const g = ctx.createGain()
      o.type = 'sawtooth'
      o.frequency.setValueAtTime(320, t)
      o.frequency.exponentialRampToValueAtTime(55, t + 1.5)
      lfo.frequency.value = 22
      lfoG.gain.value = 35
      lfo.connect(lfoG); lfoG.connect(o.frequency)
      lp.type = 'lowpass'; lp.frequency.value = 900
      g.gain.setValueAtTime(0.0, t)
      g.gain.linearRampToValueAtTime(0.14, t + 0.08)
      g.gain.setValueAtTime(0.14, t + 0.9)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6)
      o.connect(lp); lp.connect(g); g.connect(ctx.destination)
      lfo.start(t); lfo.stop(t + 1.7)
      o.start(t); o.stop(t + 1.7)
      break
    }

    // ── Paper rustle
    case 'paper-rustle': {
      const src = ctx.createBufferSource()
      src.buffer = noise(ctx, 0.5)
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.setValueAtTime(5000, t)
      bp.frequency.exponentialRampToValueAtTime(1200, t + 0.5)
      bp.Q.value = 2
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.09, t)
      g.gain.setValueAtTime(0.13, t + 0.12)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5)
      src.connect(bp); bp.connect(g); g.connect(ctx.destination)
      src.start(t)
      break
    }

    // ── Heartbeat (two-thump)
    case 'heartbeat': {
      for (const offset of [0, 0.2]) {
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.type = 'sine'
        o.frequency.setValueAtTime(65, t + offset)
        o.frequency.exponentialRampToValueAtTime(28, t + offset + 0.18)
        g.gain.setValueAtTime(0.38, t + offset)
        g.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.22)
        o.connect(g); g.connect(ctx.destination)
        o.start(t + offset); o.stop(t + offset + 0.28)
      }
      break
    }

    // ── Distant siren wail (4s, very quiet)
    case 'distant-siren': {
      const o = ctx.createOscillator()
      const lfo = ctx.createOscillator()
      const lfoG = ctx.createGain()
      const g = ctx.createGain()
      o.type = 'triangle'
      o.frequency.value = 520
      lfo.frequency.value = 0.35
      lfoG.gain.value = 90
      lfo.connect(lfoG); lfoG.connect(o.frequency)
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.05, t + 1.2)
      g.gain.setValueAtTime(0.05, t + 3.2)
      g.gain.linearRampToValueAtTime(0, t + 4.2)
      o.connect(g); g.connect(ctx.destination)
      lfo.start(t); lfo.stop(t + 4.5)
      o.start(t); o.stop(t + 4.5)
      break
    }

    // ── Clock tick
    case 'clock-tick': {
      const src = ctx.createBufferSource()
      src.buffer = noise(ctx, 0.03)
      const hp = ctx.createBiquadFilter()
      hp.type = 'highpass'; hp.frequency.value = 4000
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.28, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03)
      src.connect(hp); hp.connect(g); g.connect(ctx.destination)
      src.start(t)
      break
    }

    // ── Phase change: soft breath
    case 'phase-change': {
      const src = ctx.createBufferSource()
      src.buffer = noise(ctx, 0.6)
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'; bp.frequency.value = 800; bp.Q.value = 0.3
      const g = ctx.createGain()
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.04, t + 0.2)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.65)
      src.connect(bp); bp.connect(g); g.connect(ctx.destination)
      src.start(t)
      break
    }

    // ── Scene-specific entry sounds
    case 'scene-attic': {
      // Soft creak then silence
      await playSfx('door-creak')
      break
    }
    case 'scene-checkpoint': {
      // Boot step on cobblestone
      const src = ctx.createBufferSource()
      src.buffer = noise(ctx, 0.18)
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'; bp.frequency.value = 160; bp.Q.value = 0.4
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.28, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2)
      src.connect(bp); bp.connect(g); g.connect(ctx.destination)
      src.start(t)
      break
    }
    case 'scene-bookshop': {
      // Small bell tinkle (door bell)
      const freqs = [1400, 1800, 2100]
      for (const f of freqs) {
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.type = 'triangle'
        o.frequency.value = f
        g.gain.setValueAtTime(0.06, t + 0.02)
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9)
        o.connect(g); g.connect(ctx.destination)
        o.start(t); o.stop(t + 1)
      }
      break
    }
  }
}

export function sfxForScene(sceneId: string): SfxId | null {
  if (sceneId === 'act1-attic') return 'scene-attic'
  if (sceneId.includes('checkpoint')) return 'scene-checkpoint'
  if (sceneId === 'act3-bookshop' || sceneId === 'act3-resistance') return 'scene-bookshop'
  if (sceneId.startsWith('act2')) return 'footstep-wood'
  if (sceneId.startsWith('act4')) return 'footstep-wood'
  if (sceneId.startsWith('outcome')) return 'heartbeat'
  return null
}
