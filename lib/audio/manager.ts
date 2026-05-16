type AudioTrackKey =
  | 'ambient-room'
  | 'ambient-street'
  | 'ambient-checkpoint'
  | 'tension-drone'
  | 'ambient-night'
  | 'silence'

let Howl: typeof import('howler').Howl | null = null
let currentHowl: import('howler').Howl | null = null
let currentTrack: AudioTrackKey | null = null

const TRACK_URLS: Record<AudioTrackKey, string | null> = {
  'ambient-room': null,
  'ambient-street': null,
  'ambient-checkpoint': null,
  'tension-drone': null,
  'ambient-night': null,
  'silence': null,
}

async function loadHowler() {
  if (Howl) return
  try {
    const mod = await import('howler')
    Howl = mod.Howl
  } catch {
    // Howler unavailable — graceful no-op
  }
}

export async function playTrack(
  track: AudioTrackKey,
  fadeDuration = 1500
): Promise<void> {
  await loadHowler()
  if (!Howl || track === currentTrack) return

  const url = TRACK_URLS[track]
  if (!url) return

  if (currentHowl) {
    const prev = currentHowl
    prev.fade(prev.volume(), 0, fadeDuration)
    setTimeout(() => prev.stop(), fadeDuration + 50)
  }

  const howl = new Howl({
    src: [url],
    loop: true,
    volume: 0,
    html5: true,
  })

  howl.play()
  howl.fade(0, 0.4, fadeDuration)
  currentHowl = howl
  currentTrack = track
}

export async function stopAudio(fadeDuration = 1000): Promise<void> {
  if (!currentHowl) return
  const prev = currentHowl
  prev.fade(prev.volume(), 0, fadeDuration)
  setTimeout(() => prev.stop(), fadeDuration + 50)
  currentHowl = null
  currentTrack = null
}

export function trackForScene(sceneId: string): AudioTrackKey {
  if (sceneId.startsWith('act4-street') || sceneId === 'act4-final-checkpoint') {
    return 'ambient-night'
  }
  if (sceneId.includes('checkpoint') || sceneId.includes('papers')) {
    return 'ambient-checkpoint'
  }
  if (sceneId.startsWith('act2') || sceneId.startsWith('act3')) {
    return 'ambient-street'
  }
  if (sceneId.startsWith('outcome') || sceneId === 'epilogue') {
    return 'tension-drone'
  }
  if (sceneId === 'credits') return 'silence'
  return 'ambient-room'
}
