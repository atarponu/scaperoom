export type AmbienceType =
  | 'room'
  | 'street'
  | 'checkpoint'
  | 'night'
  | 'tension'
  | 'silence'
  | 'museum'

let audioCtx: AudioContext | null = null
let masterGain: GainNode | null = null
let activeNodes: AudioNode[] = []
let currentType: AmbienceType | null = null
let fadeTimer: ReturnType<typeof setTimeout> | null = null

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)()
    masterGain = audioCtx.createGain()
    masterGain.gain.value = 0
    masterGain.connect(audioCtx.destination)
  }
  return audioCtx
}

function noiseBuffer(ctx: AudioContext): AudioBuffer {
  const len = ctx.sampleRate * 3
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
  return buf
}

function noiseSource(ctx: AudioContext): AudioBufferSourceNode {
  const s = ctx.createBufferSource()
  s.buffer = noiseBuffer(ctx)
  s.loop = true
  return s
}

function connect(node: AudioNode, dest: AudioNode) {
  node.connect(dest)
}

// Indoor room tone: high-pass noise + 50hz electrical hum
function buildRoom(ctx: AudioContext, out: GainNode): void {
  const ns = noiseSource(ctx)
  const hp = ctx.createBiquadFilter()
  hp.type = 'highpass'
  hp.frequency.value = 800
  const g = ctx.createGain()
  g.gain.value = 0.006
  ns.connect(hp); connect(hp, g); connect(g, out)
  ns.start()
  activeNodes.push(ns, hp, g)

  const hum = ctx.createOscillator()
  hum.type = 'sine'
  hum.frequency.value = 50
  const hg = ctx.createGain()
  hg.gain.value = 0.003
  connect(hum, hg); connect(hg, out)
  hum.start()
  activeNodes.push(hum, hg)
}

// Street: bandpass wind rumble
function buildStreet(ctx: AudioContext, out: GainNode): void {
  const ns = noiseSource(ctx)
  const bp = ctx.createBiquadFilter()
  bp.type = 'bandpass'
  bp.frequency.value = 250
  bp.Q.value = 0.4
  const g = ctx.createGain()
  g.gain.value = 0.018
  ns.connect(bp); connect(bp, g); connect(g, out)
  ns.start()
  activeNodes.push(ns, bp, g)

  // Wind oscillation via LFO on filter freq
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.08
  const lfoG = ctx.createGain()
  lfoG.gain.value = 120
  lfo.connect(lfoG)
  lfoG.connect(bp.frequency)
  lfo.start()
  activeNodes.push(lfo, lfoG)
}

// Checkpoint: cold wind + sub drone
function buildCheckpoint(ctx: AudioContext, out: GainNode): void {
  const ns = noiseSource(ctx)
  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 500
  const g = ctx.createGain()
  g.gain.value = 0.012
  ns.connect(lp); connect(lp, g); connect(g, out)
  ns.start()
  activeNodes.push(ns, lp, g)

  // Sub drone — A1 detuned pair
  for (const freq of [55, 55.5]) {
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.value = freq
    const og = ctx.createGain()
    og.gain.value = 0.006
    connect(osc, og); connect(og, out)
    osc.start()
    activeNodes.push(osc, og)
  }
}

// Night: near-silence, barely-there noise + distant bell decay
function buildNight(ctx: AudioContext, out: GainNode): void {
  const ns = noiseSource(ctx)
  const hp = ctx.createBiquadFilter()
  hp.type = 'highpass'
  hp.frequency.value = 3000
  const g = ctx.createGain()
  g.gain.value = 0.004
  ns.connect(hp); connect(hp, g); connect(g, out)
  ns.start()
  activeNodes.push(ns, hp, g)
}

// Tension: cluster of detuned oscillators with tremolo
function buildTension(ctx: AudioContext, out: GainNode): void {
  const freqs = [40, 40.3, 54.8, 55, 73, 73.4]
  for (const freq of freqs) {
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.value = freq
    const og = ctx.createGain()
    og.gain.value = 0.004
    connect(osc, og); connect(og, out)
    osc.start()
    activeNodes.push(osc, og)
  }
  // Slow tremolo LFO
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.12
  const lfoG = ctx.createGain()
  lfoG.gain.value = 0.002
  connect(lfo, lfoG); connect(lfoG, out.gain as unknown as AudioNode)
  lfo.start()
  activeNodes.push(lfo, lfoG)
}

function stopAll(fadeMs: number): Promise<void> {
  return new Promise((resolve) => {
    if (!masterGain || !audioCtx) { resolve(); return }
    const now = audioCtx.currentTime
    masterGain.gain.setValueAtTime(masterGain.gain.value, now)
    masterGain.gain.linearRampToValueAtTime(0, now + fadeMs / 1000)
    if (fadeTimer) clearTimeout(fadeTimer)
    fadeTimer = setTimeout(() => {
      for (const n of activeNodes) {
        try {
          if (n instanceof AudioScheduledSourceNode) n.stop()
          n.disconnect()
        } catch { /* already stopped */ }
      }
      activeNodes = []
      resolve()
    }, fadeMs + 60)
  })
}

export async function unlockAudio(): Promise<void> {
  try {
    const ctx = getCtx()
    if (ctx.state === 'suspended') await ctx.resume()
  } catch { /* no-op */ }
}

export async function playAmbience(type: AmbienceType): Promise<void> {
  if (type === currentType) return
  try {
    const ctx = getCtx()
    if (ctx.state === 'suspended') await ctx.resume()

    await stopAll(900)
    currentType = type
    if (type === 'silence') return

    const gm = masterGain!
    gm.gain.cancelScheduledValues(ctx.currentTime)
    gm.gain.setValueAtTime(0, ctx.currentTime)

    switch (type) {
      case 'room':
      case 'museum':
        buildRoom(ctx, gm)
        break
      case 'street':
        buildStreet(ctx, gm)
        break
      case 'checkpoint':
        buildCheckpoint(ctx, gm)
        break
      case 'night':
        buildNight(ctx, gm)
        break
      case 'tension':
        buildTension(ctx, gm)
        break
    }

    gm.gain.linearRampToValueAtTime(1, ctx.currentTime + 1.2)
  } catch {
    // AudioContext unavailable — silent fallback
  }
}

export function ambienceForScene(sceneId: string): AmbienceType {
  if (sceneId === 'act4-street' || sceneId === 'act4-final-checkpoint') return 'night'
  if (sceneId.includes('checkpoint') || sceneId.includes('papers')) return 'checkpoint'
  if (sceneId.startsWith('act2') || sceneId.startsWith('act3')) return 'street'
  if (sceneId.startsWith('outcome') || sceneId === 'epilogue') return 'tension'
  if (sceneId === 'credits') return 'silence'
  return 'room'
}
