'use client'

import type { BackgroundType } from '@/types/narrative'

/* ─── Shared animations injected once ──────────────────────────── */
const SHARED_STYLES = `
  @keyframes ah-flicker { 0%,100%{opacity:.18} 23%{opacity:.15} 45%{opacity:.2} 67%{opacity:.16} 89%{opacity:.19} }
  @keyframes candle-flicker { 0%,100%{opacity:.22;transform:scaleX(1)} 20%{opacity:.19;transform:scaleX(0.92)} 40%{opacity:.25;transform:scaleX(1.05)} 60%{opacity:.2;transform:scaleX(0.95)} 80%{opacity:.23;transform:scaleX(1.02)} }
  @keyframes flame-dance { 0%,100%{d:path("M0,-12 C3,-9 5,-4 0,0 C-5,-4 -3,-9 0,-12")} 25%{d:path("M0,-12 C5,-8 4,-3 0,0 C-4,-3 -3,-8 0,-12")} 50%{d:path("M0,-12 C2,-10 6,-5 0,0 C-6,-5 -2,-10 0,-12")} 75%{d:path("M0,-12 C4,-7 3,-4 0,0 C-3,-4 -5,-7 0,-12")} }
  @keyframes fog-drift { 0%{transform:translateX(0)} 100%{transform:translateX(-200px)} }
  @keyframes fog-drift-r { 0%{transform:translateX(0)} 100%{transform:translateX(150px)} }
  @keyframes searchlight { 0%{transform:rotate(-10deg)} 50%{transform:rotate(10deg)} 100%{transform:rotate(-10deg)} }
  @keyframes water-ripple { 0%,100%{transform:translateX(0) scaleY(1)} 50%{transform:translateX(10px) scaleY(0.94)} }
  @keyframes lamp-pulse { 0%,100%{opacity:.18} 50%{opacity:.13} }
  @keyframes dust-float { 0%{transform:translateY(0) translateX(0) rotate(0deg)} 100%{transform:translateY(-90px) translateX(18px) rotate(30deg)} }
  @keyframes breath-scale { 0%,100%{transform:scale(1)} 50%{transform:scale(1.008)} }
  @keyframes curtain-wave { 0%,100%{transform:skewX(0deg)} 40%{transform:skewX(2deg)} 70%{transform:skewX(-1.5deg)} }
  @keyframes rain-fall { 0%{transform:translateY(-120px)} 100%{transform:translateY(110vh)} }
  @keyframes moon-pulse { 0%,100%{opacity:.38} 50%{opacity:.28} }
  @keyframes ember-rise { 0%{transform:translateY(0);opacity:.7} 100%{transform:translateY(-180px) translateX(30px);opacity:0} }
  .ah-light { animation: ah-flicker 5.5s ease-in-out infinite; }
  .candle-glow { animation: candle-flicker 2.2s ease-in-out infinite; }
  .fog-l { animation: fog-drift linear infinite; }
  .fog-r { animation: fog-drift-r linear infinite; }
  .searchlight { transform-origin: 300px 0; animation: searchlight 9s ease-in-out infinite; }
  .water-r { animation: water-ripple ease-in-out infinite; }
  .lamp-p { animation: lamp-pulse 6s ease-in-out infinite; }
  .dust { animation: dust-float linear infinite; }
  .moon-p { animation: moon-pulse 8s ease-in-out infinite; }
  .ember { animation: ember-rise ease-out infinite; }
`

/* ─── Apartment Hallway ─────────────────────────────────────────── */
function BgApartmentHallway() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="ah-light" cx="50%" cy="16%" r="38%">
          <stop offset="0%" stopColor="#c4a060" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#0a0805" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="ah-floor-light" cx="50%" cy="0%" r="70%">
          <stop offset="0%" stopColor="#c4a060" stopOpacity="0.08"/>
          <stop offset="100%" stopColor="#0a0805" stopOpacity="0"/>
        </radialGradient>
        <pattern id="ah-wallpaper" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#1a1208"/>
          <line x1="0" y1="0" x2="40" y2="0" stroke="#221808" strokeWidth="0.5"/>
          <line x1="0" y1="20" x2="40" y2="20" stroke="#221808" strokeWidth="0.5"/>
          <circle cx="20" cy="10" r="1.5" fill="#1d1508" opacity="0.6"/>
          <circle cx="0" cy="30" r="1.5" fill="#1d1508" opacity="0.6"/>
        </pattern>
        <pattern id="ah-floor" x="0" y="0" width="80" height="20" patternUnits="userSpaceOnUse">
          <rect width="80" height="20" fill="#130e07"/>
          <rect x="0" y="0" width="78" height="18" fill="#0f0b06" stroke="#1a1208" strokeWidth="0.8"/>
          <rect x="40" y="10" width="38" height="8" fill="#110d06"/>
        </pattern>
        <linearGradient id="ah-shadow" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#0a0805" stopOpacity="0"/>
          <stop offset="100%" stopColor="#0a0805" stopOpacity="0.55"/>
        </linearGradient>
        <filter id="blur2"><feGaussianBlur stdDeviation="2"/></filter>
        <filter id="blur6"><feGaussianBlur stdDeviation="6"/></filter>
        <style>{SHARED_STYLES}</style>
      </defs>

      <rect width="1200" height="750" fill="#0d0b07"/>
      {/* Left wall */}
      <polygon points="0,0 430,115 430,750 0,750" fill="url(#ah-wallpaper)"/>
      {/* Right wall */}
      <polygon points="1200,0 770,115 770,750 1200,750" fill="url(#ah-wallpaper)"/>
      {/* Ceiling */}
      <polygon points="0,0 1200,0 770,115 430,115" fill="#110e08"/>
      {/* Floor — planks */}
      <polygon points="0,750 430,750 770,750 1200,750 1200,580 0,580" fill="url(#ah-floor)"/>
      {/* Floor gradient shadow */}
      <rect x="0" y="580" width="1200" height="170" fill="url(#ah-floor-light)"/>

      {/* Door at end */}
      <rect x="525" y="195" width="150" height="300" rx="2" fill="#080706"/>
      <rect x="525" y="195" width="150" height="300" rx="2" fill="none" stroke="#1e1508" strokeWidth="2.5"/>
      <rect x="540" y="210" width="52" height="128" rx="1" fill="#0b0907" stroke="#1a1208" strokeWidth="1"/>
      <rect x="608" y="210" width="52" height="128" rx="1" fill="#0b0907" stroke="#1a1208" strokeWidth="1"/>
      <rect x="540" y="352" width="52" height="128" rx="1" fill="#0b0907" stroke="#1a1208" strokeWidth="1"/>
      <rect x="608" y="352" width="52" height="128" rx="1" fill="#0b0907" stroke="#1a1208" strokeWidth="1"/>
      <circle cx="668" cy="348" r="4.5" fill="#2a1e0e" stroke="#3a2a12" strokeWidth="1"/>
      {/* Door frame */}
      <rect x="522" y="192" width="156" height="306" rx="3" fill="none" stroke="#231a0d" strokeWidth="5"/>

      {/* Wall trim */}
      <line x1="0" y1="0" x2="430" y2="115" stroke="#201508" strokeWidth="2" opacity="0.5"/>
      <line x1="1200" y1="0" x2="770" y2="115" stroke="#201508" strokeWidth="2" opacity="0.5"/>
      <line x1="430" y1="115" x2="430" y2="750" stroke="#1a1208" strokeWidth="2" opacity="0.4"/>
      <line x1="770" y1="115" x2="770" y2="750" stroke="#1a1208" strokeWidth="2" opacity="0.4"/>

      {/* Skirting */}
      <polygon points="0,730 430,730 430,750 0,750" fill="#100d07" opacity="0.8"/>
      <polygon points="770,730 1200,730 1200,750 770,750" fill="#100d07" opacity="0.8"/>

      {/* Ceiling light bulb */}
      <circle cx="600" cy="112" r="6" fill="#c4a060" opacity="0.5" filter="url(#blur2)"/>
      <line x1="600" y1="85" x2="600" y2="106" stroke="#1a1408" strokeWidth="1.5"/>
      {/* Light cone */}
      <polygon points="600,118 450,700 750,700" fill="url(#ah-light)" className="ah-light"/>
      {/* Ambient floor glow */}
      <ellipse cx="600" cy="680" rx="220" ry="60" fill="#c4a060" opacity="0.04" filter="url(#blur6)"/>

      {/* Hallway shadow depth */}
      <rect x="0" y="0" width="1200" height="750" fill="url(#ah-shadow)"/>
    </svg>
  )
}

/* ─── Apartment Attic ───────────────────────────────────────────── */
function BgApartmentAttic() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="attic-win" cx="76%" cy="14%" r="14%">
          <stop offset="0%" stopColor="#8090a8" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#0a0805" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="attic-floor-glow" cx="76%" cy="90%" r="30%">
          <stop offset="0%" stopColor="#8090a8" stopOpacity="0.06"/>
          <stop offset="100%" stopColor="#0a0805" stopOpacity="0"/>
        </radialGradient>
        <pattern id="attic-floor" x="0" y="0" width="100" height="16" patternUnits="userSpaceOnUse">
          <rect width="100" height="16" fill="#0d0b07"/>
          <rect x="1" y="1" width="97" height="13" fill="#0b0908" stroke="#150e06" strokeWidth="0.6"/>
        </pattern>
        <filter id="blur4"><feGaussianBlur stdDeviation="4"/></filter>
        <style>{SHARED_STYLES}</style>
      </defs>

      <rect width="1200" height="750" fill="#070604"/>

      {/* Roof slopes */}
      <polygon points="0,0 600,310 0,750" fill="#0d0a07"/>
      <polygon points="1200,0 600,310 1200,750" fill="#0f0c08"/>

      {/* Rafters — prominent */}
      {[120,240,360,480,600,720,840,960,1080].map((x,i) => (
        <line key={i} x1={x} y1={0} x2={600} y2={310}
          stroke="#120e08" strokeWidth={x === 600 ? 24 : 18} opacity="0.95"/>
      ))}
      {/* Crossbeam */}
      <rect x="80" y="298" width="1040" height="22" fill="#0f0d07" rx="3"/>
      <line x1="80" y1="298" x2="1120" y2="298" stroke="#1a1408" strokeWidth="1.5" opacity="0.5"/>
      <line x1="80" y1="320" x2="1120" y2="320" stroke="#0c0a06" strokeWidth="1" opacity="0.4"/>

      {/* Floor */}
      <rect x="0" y="680" width="1200" height="70" fill="url(#attic-floor)"/>

      {/* Window top-right */}
      <rect x="820" y="48" width="190" height="140" rx="3" fill="#161e28" opacity="0.75"/>
      <line x1="820" y1="118" x2="1010" y2="118" stroke="#0d1018" strokeWidth="3.5"/>
      <line x1="915" y1="48" x2="915" y2="188" stroke="#0d1018" strokeWidth="3.5"/>
      {/* Window light shaft */}
      <polygon points="820,188 1010,188 1100,680 720,680" fill="url(#attic-win)"/>
      <polygon points="820,188 1010,188 1100,680 720,680" fill="url(#attic-floor-glow)"/>

      {/* Dust motes in shaft */}
      {[845,870,895,925,950,980,1005].map((x,i) => (
        <circle key={i} cx={x} cy={220+i*18} r={1.5-i*0.1} fill="#c4a882" opacity={0.18+i*0.025}
          className="dust" style={{animationDuration:`${6+i*1.2}s`, animationDelay:`${i*0.8}s`}}/>
      ))}
      {[860,885,912,942,965].map((x,i) => (
        <circle key={i+10} cx={x} cy={290+i*22} r="1.2" fill="#c4a882" opacity="0.1"
          className="dust" style={{animationDuration:`${8+i*1.4}s`, animationDelay:`${i*1.1+0.5}s`}}/>
      ))}

      {/* Old suitcase */}
      <rect x="180" y="670" width="130" height="60" rx="5" fill="#0e0b07" stroke="#1c1508" strokeWidth="1.5"/>
      <rect x="180" y="699" width="130" height="3" fill="#1a1408"/>
      <rect x="230" y="655" width="30" height="20" rx="3" fill="#0d0a06" stroke="#181208" strokeWidth="1.5"/>
      {/* Blanket */}
      <ellipse cx="480" cy="716" rx="90" ry="24" fill="#110e09"/>
      <line x1="395" y1="715" x2="568" y2="717" stroke="#0e0c07" strokeWidth="2" opacity="0.4"/>
      {/* Old box */}
      <rect x="700" y="678" width="80" height="50" fill="#0c0a06" stroke="#181208" strokeWidth="1"/>
      <line x1="700" y1="703" x2="780" y2="703" stroke="#181208" strokeWidth="1"/>
    </svg>
  )
}

/* ─── Street Occupied ───────────────────────────────────────────── */
function BgStreetOccupied() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="st-lamp1" cx="74%" cy="37%" r="22%">
          <stop offset="0%" stopColor="#c4a060" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#0a0805" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="st-lamp2" cx="18%" cy="42%" r="16%">
          <stop offset="0%" stopColor="#c4a060" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#0a0805" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="st-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10141c"/>
          <stop offset="100%" stopColor="#0d111a"/>
        </linearGradient>
        <pattern id="st-cobble" x="0" y="0" width="64" height="42" patternUnits="userSpaceOnUse">
          <rect width="64" height="42" fill="#131210"/>
          <ellipse cx="16" cy="21" rx="13" ry="9" fill="#100f0e" stroke="#191714" strokeWidth="0.8"/>
          <ellipse cx="48" cy="10" rx="13" ry="8" fill="#0f0e0d" stroke="#181613" strokeWidth="0.8"/>
          <ellipse cx="48" cy="32" rx="13" ry="8" fill="#111010" stroke="#1a1815" strokeWidth="0.8"/>
        </pattern>
        <filter id="blur8"><feGaussianBlur stdDeviation="8"/></filter>
        <style>{SHARED_STYLES}</style>
      </defs>

      <rect width="1200" height="750" fill="url(#st-sky)"/>

      {/* Far background haze */}
      <rect x="200" y="180" width="800" height="300" fill="#0d111a" opacity="0.4" filter="url(#blur8)"/>

      {/* Buildings left */}
      <rect x="0" y="70" width="290" height="560" fill="#0d0f16"/>
      <rect x="0" y="70" width="290" height="560" fill="#0a0c14" opacity="0.5"/>
      {/* Windows left — some lit, most dark */}
      {[[25,100],[80,90],[140,115],[25,165],[80,155],[140,180],[25,230],[80,220]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width={32} height={44} rx="1"
          fill={i===1||i===5 ? '#1a2030' : '#0c0e18'}
          opacity={i===1||i===5 ? 0.7 : 0.4}/>
      ))}
      {/* Lit window glow */}
      <rect x="78" y="88" width="32" height="44" fill="#c4a060" opacity="0.04" filter="url(#blur8)"/>

      {/* Buildings right */}
      <rect x="910" y="50" width="290" height="580" fill="#0c0e14"/>
      {[[920,80],[975,70],[1040,90],[920,150],[975,140],[1040,160]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width={32} height={44} rx="1"
          fill={i===2 ? '#181e2c' : '#0b0d14'}
          opacity={i===2 ? 0.6 : 0.4}/>
      ))}

      {/* Middle-distance buildings */}
      <rect x="270" y="130" width="220" height="500" fill="#0e1018"/>
      <rect x="720" y="150" width="200" height="480" fill="#0c0e14"/>
      <rect x="460" y="200" width="280" height="430" fill="#0f1118" opacity="0.7"/>

      {/* Cobblestone street */}
      <polygon points="0,545 1200,545 1200,750 0,750" fill="url(#st-cobble)"/>
      <line x1="0" y1="545" x2="1200" y2="545" stroke="#1a1814" strokeWidth="2.5"/>

      {/* Pavement */}
      <rect x="0" y="520" width="1200" height="28" fill="#131210"/>

      {/* Lamppost right */}
      <line x1="895" y1="185" x2="895" y2="545" stroke="#1c1a12" strokeWidth="9"/>
      <path d="M895,185 Q872,162 848,167" stroke="#1c1a12" strokeWidth="7" fill="none"/>
      <circle cx="846" cy="167" r="9" fill="#c4a060" opacity="0.55" className="lamp-p"/>
      <ellipse cx="846" cy="167" rx="70" ry="60" fill="url(#st-lamp1)" className="lamp-p"/>
      {/* Lamp glow on ground */}
      <ellipse cx="870" cy="545" rx="80" ry="20" fill="#c4a060" opacity="0.05" filter="url(#blur8)"/>

      {/* Lamppost left */}
      <line x1="215" y1="220" x2="215" y2="545" stroke="#191810" strokeWidth="7"/>
      <path d="M215,220 Q240,198 260,203" stroke="#191810" strokeWidth="5" fill="none"/>
      <circle cx="261" cy="203" r="7" fill="#c4a060" opacity="0.4" className="lamp-p"/>
      <ellipse cx="261" cy="203" rx="50" ry="45" fill="url(#st-lamp2)" className="lamp-p"/>

      {/* Fog layers */}
      <rect x="-200" y="480" width="1700" height="130" fill="#14181e" opacity="0.28"
        className="fog-l" style={{animationDuration:'26s'}}/>
      <rect x="-200" y="510" width="1700" height="90" fill="#161920" opacity="0.18"
        className="fog-r" style={{animationDuration:'38s'}}/>
      <rect x="-200" y="535" width="1700" height="50" fill="#12161c" opacity="0.12"
        className="fog-l" style={{animationDuration:'18s'}}/>

      {/* Distant figures */}
      <rect x="455" y="496" width="13" height="48" rx="3" fill="#090b10"/>
      <ellipse cx="461" cy="491" rx="8" ry="8" fill="#090b10"/>
      <rect x="500" y="505" width="11" height="38" rx="2" fill="#08090e"/>
      <ellipse cx="505" cy="500" rx="6" ry="7" fill="#08090e"/>
      <rect x="530" y="510" width="9" height="32" rx="2" fill="#07080d" opacity="0.7"/>

      {/* Distant Nazi banner/flag — barely visible silhouette */}
      <rect x="350" y="130" width="4" height="80" fill="#0e1018"/>
      <rect x="354" y="130" width="28" height="18" fill="#1a0808" opacity="0.5"/>
    </svg>
  )
}

/* ─── Checkpoint ────────────────────────────────────────────────── */
function BgCheckpoint() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="cp-search" cx="25%" cy="2%" r="50%">
          <stop offset="0%" stopColor="#d8e8f8" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="#0a0c10" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="cp-search2" cx="78%" cy="0%" r="40%">
          <stop offset="0%" stopColor="#d0e0f0" stopOpacity="0.14"/>
          <stop offset="100%" stopColor="#0a0c10" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="cp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080a10"/>
          <stop offset="100%" stopColor="#0c0e16"/>
        </linearGradient>
        <pattern id="cp-cobble" x="0" y="0" width="55" height="38" patternUnits="userSpaceOnUse">
          <rect width="55" height="38" fill="#100f0d"/>
          <ellipse cx="13" cy="19" rx="11" ry="7" fill="#0e0d0c" stroke="#151311" strokeWidth="0.8"/>
          <ellipse cx="41" cy="9" rx="11" ry="7" fill="#0f0e0d" stroke="#141210" strokeWidth="0.8"/>
          <ellipse cx="41" cy="29" rx="11" ry="7" fill="#0f0f0e" stroke="#161412" strokeWidth="0.8"/>
        </pattern>
        <filter id="blur5"><feGaussianBlur stdDeviation="5"/></filter>
        <style>{SHARED_STYLES}</style>
      </defs>

      <rect width="1200" height="750" fill="url(#cp-sky)"/>

      {/* Background buildings dark silhouettes */}
      <rect x="0" y="110" width="230" height="520" fill="#0b0d14"/>
      <rect x="970" y="90" width="230" height="540" fill="#0a0c12"/>
      <rect x="210" y="170" width="180" height="460" fill="#0c0e16"/>
      <rect x="820" y="150" width="165" height="480" fill="#0b0d14"/>
      {/* Far buildings */}
      <rect x="370" y="220" width="120" height="400" fill="#0d0f18" opacity="0.7"/>
      <rect x="710" y="200" width="130" height="430" fill="#0b0d16" opacity="0.7"/>

      {/* Guardhouse right */}
      <rect x="845" y="330" width="145" height="290" fill="#0d0e16" stroke="#15182a" strokeWidth="2"/>
      <rect x="856" y="350" width="45" height="55" fill="#090c12" stroke="#12151e" strokeWidth="1.5"/>
      <rect x="918" y="344" width="58" height="70" fill="#12161f" opacity="0.5"/>
      {/* Guardhouse roof */}
      <polygon points="845,330 990,330 990,310 845,310" fill="#0c0e18"/>
      <rect x="960" y="340" width="12" height="50" fill="#1a1a28" opacity="0.5"/>

      {/* Checkpoint barrier — red/white */}
      <line x1="0" y1="415" x2="760" y2="415" stroke="#161616" strokeWidth="14" strokeLinecap="round"/>
      {Array.from({length:14}, (_,i) => (
        <rect key={i} x={i*55} y={408} width={27} height={14}
          fill={i%2===0 ? '#7a1818' : '#d8c8b0'} opacity="0.82"/>
      ))}
      {/* Barrier post */}
      <rect x="750" y="352" width="20" height="230" fill="#181818" rx="3"/>
      <rect x="748" y="350" width="24" height="10" fill="#222" rx="1"/>

      {/* Searchlight sweep — main */}
      <g className="searchlight" style={{transformOrigin:'300px 0px'}}>
        <polygon points="288,0 312,0 380,560 220,560" fill="url(#cp-search)" opacity="0.92"/>
      </g>
      {/* Searchlight 2 — from right, slower */}
      <g style={{transformOrigin:'940px 0px', animation:'searchlight 14s ease-in-out infinite reverse'}}>
        <polygon points="930,0 950,0 1010,480 870,480" fill="url(#cp-search2)" opacity="0.7"/>
      </g>

      {/* Ground */}
      <polygon points="0,575 1200,575 1200,750 0,750" fill="url(#cp-cobble)"/>
      <line x1="0" y1="575" x2="1200" y2="575" stroke="#1a1814" strokeWidth="2.5"/>
      {/* Ground wet puddle reflections */}
      <ellipse cx="400" cy="610" rx="80" ry="12" fill="#0d1020" opacity="0.5"/>
      <ellipse cx="700" cy="630" rx="60" ry="10" fill="#0c0f1e" opacity="0.4"/>

      {/* Soldier silhouette — left of barrier */}
      <rect x="780" y="422" width="24" height="115" rx="3" fill="#090a10"/>
      <ellipse cx="792" cy="416" rx="13" ry="14" fill="#090a10"/>
      {/* Helmet */}
      <ellipse cx="792" cy="406" rx="15" ry="9" fill="#0b0c14"/>
      {/* Rifle */}
      <line x1="778" y1="480" x2="840" y2="455" stroke="#09090f" strokeWidth="5" strokeLinecap="round"/>
      {/* Breath in cold air */}
      <ellipse cx="792" cy="430" rx="8" ry="4" fill="#c0d0e0" opacity="0.04" filter="url(#blur5)"/>
    </svg>
  )
}

/* ─── Bookshop ──────────────────────────────────────────────────── */
function BgBookshop() {
  const shelfBooks = [
    {x:62,h:82,w:18,c:'#2a1a08'},{x:81,h:97,w:14,c:'#1e2818'},{x:96,h:74,w:20,c:'#281808'},
    {x:117,h:90,w:16,c:'#1a1a28'},{x:134,h:80,w:22,c:'#2a2008'},{x:157,h:94,w:15,c:'#1e1818'},
    {x:173,h:70,w:18,c:'#281a10'},{x:192,h:87,w:20,c:'#201e10'},{x:213,h:79,w:14,c:'#2a1810'},
    {x:942,h:84,w:16,c:'#201808'},{x:959,h:72,w:22,c:'#1a2018'},{x:982,h:92,w:18,c:'#281810'},
    {x:1001,h:78,w:20,c:'#1e1828'},{x:1022,h:90,w:14,c:'#281a08'},{x:1037,h:74,w:18,c:'#201818'},
    {x:1056,h:86,w:16,c:'#1a1e20'},{x:1073,h:80,w:22,c:'#2a2010'},{x:1096,h:88,w:18,c:'#181a20'},
  ]
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="bs-lamp" cx="60%" cy="36%" r="32%">
          <stop offset="0%" stopColor="#c49040" stopOpacity="0.32"/>
          <stop offset="50%" stopColor="#c49040" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#0a0805" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="bs-candle" cx="55%" cy="53%" r="12%">
          <stop offset="0%" stopColor="#e8a020" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="#0a0805" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="bs-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#17110a"/>
          <stop offset="100%" stopColor="#0f0c08"/>
        </linearGradient>
        <filter id="blur3"><feGaussianBlur stdDeviation="3"/></filter>
        <filter id="blur10"><feGaussianBlur stdDeviation="10"/></filter>
        <style>{SHARED_STYLES}</style>
      </defs>

      <rect width="1200" height="750" fill="url(#bs-bg)"/>

      {/* Bookshelf walls */}
      <rect x="0" y="75" width="268" height="610" fill="#160f08"/>
      <rect x="932" y="75" width="268" height="610" fill="#160f08"/>

      {/* Shelf planks */}
      {[200,316,432,548,660].map((y,i) => (
        <g key={i}>
          <rect x="0" y={y} width="268" height="11" fill="#1e1408" rx="1"/>
          <rect x="0" y={y+11} width="268" height="3" fill="#120e06" opacity="0.5"/>
          <rect x="932" y={y} width="268" height="11" fill="#1e1408" rx="1"/>
          <rect x="932" y={y+11} width="268" height="3" fill="#120e06" opacity="0.5"/>
        </g>
      ))}

      {/* Books on lower shelf */}
      {shelfBooks.map((b,i) => (
        <g key={i}>
          <rect x={b.x} y={529-b.h} width={b.w} height={b.h} fill={b.c} stroke="#08060403" strokeWidth="0.5"/>
          {/* Book spine detail */}
          <line x1={b.x+b.w/2} y1={529-b.h+5} x2={b.x+b.w/2} y2={529-5}
            stroke="#ffffff" strokeWidth="0.4" opacity="0.06"/>
        </g>
      ))}

      {/* Shop counter */}
      <rect x="295" y="535" width="610" height="215" fill="#1a1208" rx="2"/>
      <rect x="295" y="535" width="610" height="18" fill="#221810" rx="2"/>
      <rect x="295" y="553" width="610" height="4" fill="#1a1408" opacity="0.5"/>

      {/* Counter items */}
      <rect x="345" y="504" width="65" height="32" fill="#1e1408" transform="rotate(-6 345 504)"/>
      <rect x="418" y="498" width="55" height="28" fill="#201810" transform="rotate(4 418 498)"/>
      <rect x="490" y="502" width="45" height="25" fill="#1a1206" transform="rotate(-2 490 502)"/>

      {/* Reading lamp */}
      <line x1="685" y1="390" x2="685" y2="535" stroke="#181408" strokeWidth="6"/>
      <path d="M685,390 Q645,368 622,384" stroke="#181408" strokeWidth="5" fill="none"/>
      <ellipse cx="620" cy="387" rx="24" ry="13" fill="#c49040" opacity="0.65" className="candle-glow"/>
      <polygon points="595,387 645,387 665,490 574,490" fill="url(#bs-lamp)" className="candle-glow"/>
      {/* Wide ambient glow */}
      <ellipse cx="620" cy="500" rx="240" ry="260" fill="url(#bs-lamp)" opacity="0.8"/>

      {/* Candle on counter */}
      <rect x="590" y="490" width="9" height="44" fill="#d0c090" opacity="0.55"/>
      <ellipse cx="594" cy="490" rx="4.5" ry="4.5" fill="#080604" opacity="0.8"/>
      {/* Candle flame — animated SVG path */}
      <g transform="translate(594,486)" className="candle-glow">
        <ellipse cx="0" cy="0" rx="3" ry="8" fill="#f0c030" opacity="0.9"/>
        <ellipse cx="0" cy="-3" rx="1.5" ry="3" fill="#fff8e0" opacity="0.8"/>
      </g>
      <ellipse cx="594" cy="510" rx="80" ry="60" fill="url(#bs-candle)" className="candle-glow"/>

      {/* Window — grey daylight outside */}
      <rect x="488" y="95" width="224" height="185" fill="#18222e" rx="2"/>
      <rect x="488" y="95" width="224" height="185" fill="#1e2a38" opacity="0.35"/>
      <line x1="488" y1="187" x2="712" y2="187" stroke="#121a22" strokeWidth="3.5"/>
      <line x1="600" y1="95" x2="600" y2="280" stroke="#121a22" strokeWidth="3.5"/>
      {/* Window frame */}
      <rect x="486" y="93" width="228" height="189" rx="2" fill="none" stroke="#1c1810" strokeWidth="4"/>
    </svg>
  )
}

/* ─── Night Street ──────────────────────────────────────────────── */
function BgNightStreet() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="ns-lamp" cx="30%" cy="46%" r="22%">
          <stop offset="0%" stopColor="#c4a060" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#040810" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="ns-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04080e"/>
          <stop offset="100%" stopColor="#03060c"/>
        </linearGradient>
        <linearGradient id="ns-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#030406"/>
          <stop offset="100%" stopColor="#06080e"/>
        </linearGradient>
        <filter id="blur3"><feGaussianBlur stdDeviation="3"/></filter>
        <style>{SHARED_STYLES}</style>
      </defs>

      <rect width="1200" height="750" fill="url(#ns-sky)"/>

      {/* Buildings */}
      <rect x="0" y="55" width="330" height="470" fill="#060810"/>
      {[75,130,175].map((y,i) => (
        <rect key={i} x={22+i*82} y={y} width={36} height={48} rx="1"
          fill={i===1?'#0c0e1a':'#08090e'} opacity={i===1?0.6:0.4}/>
      ))}

      <rect x="870" y="38" width="330" height="490" fill="#05070e"/>
      {[72,108,152].map((y,i) => (
        <rect key={i} x={888+i*72} y={y} width={36} height={48} rx="1"
          fill={i===0?'#0b0d18':'#070810'} opacity={i===0?0.5:0.35}/>
      ))}

      {/* Canal walls */}
      <rect x="0" y="510" width="355" height="22" fill="#08090e"/>
      <rect x="845" y="510" width="355" height="22" fill="#07080d"/>
      <rect x="340" y="510" width="520" height="22" fill="#06070c"/>

      {/* Bridge arch */}
      <path d="M355,510 Q600,435 845,510" stroke="#0d1018" strokeWidth="28" fill="none"/>
      <path d="M375,510 Q600,440 825,510" stroke="#13161e" strokeWidth="12" fill="none" strokeDasharray="16,9"/>

      {/* Canal water */}
      <rect x="0" y="532" width="1200" height="218" fill="url(#ns-water)"/>
      {/* Ripples */}
      {[548,564,582,600,620,642,666,690,714].map((y,i) => (
        <line key={i} x1={i*42} y1={y} x2={i*42+280+i*22} y2={y}
          stroke="#090d1c" strokeWidth="1.5" opacity="0.45" className="water-r"
          style={{animationDelay:`${i*0.28}s`, animationDuration:`${3.2+i*0.45}s`}}/>
      ))}

      {/* Lamppost */}
      <line x1="358" y1="190" x2="358" y2="520" stroke="#0d0d16" strokeWidth="9"/>
      <path d="M358,190 Q330,166 305,172" stroke="#0d0d16" strokeWidth="7" fill="none"/>
      <circle cx="303" cy="172" r="10" fill="#c4a060" opacity="0.6" className="lamp-p"/>
      <ellipse cx="303" cy="172" rx="90" ry="78" fill="url(#ns-lamp)" className="lamp-p"/>
      {/* Lamppost reflection in water */}
      <line x1="358" y1="532" x2="358" y2="680" stroke="#c4a060" strokeWidth="3" opacity="0.04"
        className="water-r" style={{animationDuration:'3s'}}/>
      {/* Lamp glow on bridge */}
      <ellipse cx="358" cy="520" rx="55" ry="14" fill="#c4a060" opacity="0.05" filter="url(#blur3)"/>

      {/* Moon — barely visible through cloud */}
      <circle cx="900" cy="70" r="32" fill="#14182a" opacity="0.35" className="moon-p"/>
      <circle cx="900" cy="70" r="26" fill="#1a2030" opacity="0.25" className="moon-p"/>
    </svg>
  )
}

/* ─── Safe House ────────────────────────────────────────────────── */
function BgSafeHouse() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="sh-candle" cx="50%" cy="50%" r="35%">
          <stop offset="0%" stopColor="#c48020" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="#070704" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="sh-candle2" cx="50%" cy="50%" r="20%">
          <stop offset="0%" stopColor="#e09830" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#070704" stopOpacity="0"/>
        </radialGradient>
        <filter id="blur6"><feGaussianBlur stdDeviation="6"/></filter>
        <style>{SHARED_STYLES}</style>
      </defs>

      <rect width="1200" height="750" fill="#070604"/>

      {/* Walls — slightly textured */}
      <rect x="0" y="0" width="1200" height="750" fill="#0b0906"/>
      {/* Wall texture lines */}
      {[100,200,300,400,500].map((y,i) => (
        <line key={i} x1="0" y1={y} x2="1200" y2={y+1} stroke="#0d0b08" strokeWidth="1" opacity="0.3"/>
      ))}

      {/* Blacked-out window */}
      <rect x="92" y="92" width="210" height="158" fill="#04060e" rx="3" stroke="#141008" strokeWidth="3"/>
      <line x1="92" y1="171" x2="302" y2="171" stroke="#0a0c10" strokeWidth="3"/>
      <line x1="197" y1="92" x2="197" y2="250" stroke="#0a0c10" strokeWidth="3"/>
      {/* Blackout paper */}
      <rect x="92" y="92" width="210" height="158" fill="#060504" opacity="0.97"/>
      {/* Tiny light leak at edges */}
      <line x1="92" y1="92" x2="92" y2="250" stroke="#1a1e28" strokeWidth="1" opacity="0.2"/>

      {/* Table */}
      <rect x="340" y="478" width="520" height="22" rx="2" fill="#131008"/>
      <rect x="340" y="500" width="520" height="4" fill="#0e0d07" opacity="0.5"/>
      <rect x="360" y="502" width="22" height="200" fill="#0f0e08"/>
      <rect x="820" y="502" width="22" height="200" fill="#0f0e08"/>

      {/* Main candle */}
      <rect x="596" y="435" width="10" height="44" fill="#d0c090" opacity="0.5"/>
      <ellipse cx="601" cy="435" rx="5.5" ry="5.5" fill="#070604" opacity="0.9"/>
      {/* Flame — animated */}
      <g transform="translate(601,432)" className="candle-glow">
        <ellipse cx="0" cy="-2" rx="4" ry="10" fill="#f0b830" opacity="0.88"/>
        <ellipse cx="0" cy="-6" rx="2" ry="5" fill="#ffe8a0" opacity="0.75"/>
        <ellipse cx="0" cy="-9" rx="1" ry="2.5" fill="#ffffff" opacity="0.5"/>
      </g>
      {/* Candle glow — wide */}
      <ellipse cx="601" cy="550" rx="360" ry="320" fill="url(#sh-candle)" className="candle-glow"/>
      <ellipse cx="601" cy="470" rx="180" ry="160" fill="url(#sh-candle2)" className="candle-glow"/>

      {/* Second candle — smaller, to the right */}
      <rect x="760" y="452" width="7" height="30" fill="#cac088" opacity="0.4"/>
      <g transform="translate(763,450)" className="candle-glow" style={{animationDelay:'0.7s'}}>
        <ellipse cx="0" cy="-2" rx="2.5" ry="7" fill="#f0b030" opacity="0.8"/>
        <ellipse cx="0" cy="-5" rx="1.2" ry="3" fill="#ffe090" opacity="0.65"/>
      </g>
      <ellipse cx="763" cy="490" rx="120" ry="110" fill="url(#sh-candle)" opacity="0.4" className="candle-glow"/>

      {/* Papers on table */}
      <rect x="415" y="452" width="95" height="26" fill="#e8d5b7" opacity="0.07" transform="rotate(-4 415 452)"/>
      <rect x="520" y="456" width="75" height="22" fill="#e8d5b7" opacity="0.055" transform="rotate(3 520 456)"/>
      <rect x="680" y="450" width="60" height="18" fill="#e8d5b7" opacity="0.05" transform="rotate(-2 680 450)"/>

      {/* Chair */}
      <rect x="756" y="420" width="85" height="65" rx="2" fill="#0c0b07"/>
      <rect x="765" y="485" width="16" height="85" fill="#0c0b07"/>
      <rect x="806" y="485" width="16" height="85" fill="#0c0b07"/>
      <rect x="756" y="420" width="85" height="12" rx="2" fill="#100e09"/>

      {/* Wall crack */}
      <path d="M920,185 Q930,220 924,260 Q933,295 927,330 Q936,365 928,400"
        stroke="#0d0b08" strokeWidth="1.5" fill="none" opacity="0.55"/>

      {/* Shadow in corners */}
      <rect x="0" y="0" width="200" height="750" fill="#060504" opacity="0.4"/>
      <rect x="1000" y="0" width="200" height="750" fill="#060504" opacity="0.35"/>
    </svg>
  )
}

/* ─── Museum / Epilogue ─────────────────────────────────────────── */
function BgMuseum() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="mu-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#141210"/>
          <stop offset="100%" stopColor="#0e0c0a"/>
        </linearGradient>
        <radialGradient id="mu-spot1" cx="20%" cy="0%" r="30%">
          <stop offset="0%" stopColor="#c4a882" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#c4a882" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="mu-spot2" cx="50%" cy="0%" r="25%">
          <stop offset="0%" stopColor="#c4a882" stopOpacity="0.09"/>
          <stop offset="100%" stopColor="#c4a882" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="mu-spot3" cx="80%" cy="0%" r="28%">
          <stop offset="0%" stopColor="#c4a882" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#c4a882" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <rect width="1200" height="750" fill="url(#mu-bg)"/>

      {/* Wainscoting */}
      <rect x="0" y="618" width="1200" height="132" fill="#11100e"/>
      <line x1="0" y1="618" x2="1200" y2="618" stroke="#1e1a14" strokeWidth="2.5"/>
      <rect x="0" y="626" width="1200" height="6" fill="#191610" opacity="0.5"/>

      {/* Wall panels */}
      {[55,255,455,655,855,1055].map((x,i) => (
        <rect key={i} x={x} y={95} width={145} height={210}
          fill="none" stroke="#1e1812" strokeWidth="1.5" opacity="0.38"/>
      ))}
      {/* Panel inner inset */}
      {[55,255,455,655,855,1055].map((x,i) => (
        <rect key={i} x={x+8} y={103} width={129} height={194}
          fill="none" stroke="#1a1610" strokeWidth="0.7" opacity="0.25"/>
      ))}

      {/* Ceiling spotlights */}
      <polygon points="192,0 208,0 260,320 140,320" fill="url(#mu-spot1)"/>
      <polygon points="492,0 508,0 550,290 450,290" fill="url(#mu-spot2)"/>
      <polygon points="692,0 708,0 760,310 640,310" fill="url(#mu-spot3)"/>
      <polygon points="992,0 1008,0 1060,300 940,300" fill="url(#mu-spot1)" opacity="0.8"/>

      {/* Floor line */}
      <line x1="0" y1="616" x2="1200" y2="616" stroke="#251f18" strokeWidth="1.5" opacity="0.5"/>

      {/* Decorative header band */}
      <line x1="0" y1="78" x2="1200" y2="78" stroke="#1e1812" strokeWidth="1.5" opacity="0.35"/>
      <line x1="0" y1="86" x2="1200" y2="86" stroke="#1e1812" strokeWidth="0.5" opacity="0.2"/>
    </svg>
  )
}

/* ─── Night Canal ───────────────────────────────────────────────── */
function BgNightCanal() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="nc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020305"/>
          <stop offset="100%" stopColor="#050810"/>
        </linearGradient>
        <linearGradient id="nc-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04060e"/>
          <stop offset="100%" stopColor="#02040a"/>
        </linearGradient>
        <filter id="blur4"><feGaussianBlur stdDeviation="4"/></filter>
        <style>{SHARED_STYLES}</style>
      </defs>

      <rect width="1200" height="750" fill="url(#nc-sky)"/>

      {/* Building silhouettes */}
      <rect x="0" y="95" width="310" height="440" fill="#04050a"/>
      <rect x="890" y="75" width="310" height="460" fill="#030408"/>
      <rect x="288" y="155" width="210" height="380" fill="#050609"/>
      <rect x="714" y="135" width="210" height="400" fill="#040508"/>

      {/* Chimney pots */}
      <rect x="50" y="85" width="12" height="30" fill="#030406"/>
      <rect x="130" y="75" width="10" height="28" fill="#030406"/>
      <rect x="920" y="62" width="12" height="32" fill="#030406"/>
      <rect x="990" y="72" width="10" height="28" fill="#030406"/>

      {/* Canal walls */}
      <rect x="0" y="535" width="1200" height="20" fill="#060810"/>

      {/* Canal water */}
      <rect x="0" y="555" width="1200" height="195" fill="url(#nc-water)"/>

      {/* Ripples */}
      {[572,590,610,632,654,678,704,730].map((y,i) => (
        <line key={i} x1={50+i*80} y1={y} x2={200+i*100} y2={y}
          stroke="#080c1a" strokeWidth="1.5" opacity="0.4" className="water-r"
          style={{animationDelay:`${i*0.3}s`, animationDuration:`${3+i*0.4}s`}}/>
      ))}

      {/* Moon */}
      <circle cx="610" cy="75" r="34" fill="#10182a" opacity="0.4" className="moon-p"/>
      <circle cx="610" cy="75" r="27" fill="#161e2e" opacity="0.28" className="moon-p"/>
      {/* Moon reflection in water */}
      <ellipse cx="610" cy="600" rx="28" ry="10" fill="#0e1428" opacity="0.5"
        className="water-r" style={{animationDuration:'4.5s'}}/>

      {/* Stars — faint */}
      {[[200,40],[450,25],[750,35],[1000,20],[100,60],[1100,45],[320,15],[880,30]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1" fill="#c4c8d8" opacity={0.12+i*0.02}/>
      ))}
    </svg>
  )
}

/* ─── Ruins ─────────────────────────────────────────────────────── */
function BgRuins() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="ru-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0e16"/>
          <stop offset="100%" stopColor="#0c1014"/>
        </linearGradient>
        <radialGradient id="ru-fire" cx="55%" cy="80%" r="30%">
          <stop offset="0%" stopColor="#d04010" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#0a0805" stopOpacity="0"/>
        </radialGradient>
        <filter id="blur5"><feGaussianBlur stdDeviation="5"/></filter>
        <style>{SHARED_STYLES}</style>
      </defs>

      <rect width="1200" height="750" fill="url(#ru-sky)"/>

      {/* Broken wall left */}
      <polygon points="0,0 210,0 228,75 185,145 248,228 205,348 185,510 0,510" fill="#0d0c0a"/>
      <polygon points="0,0 210,0 228,75" fill="#0f0e0b" opacity="0.5"/>

      {/* Broken wall right */}
      <polygon points="1200,0 985,0 975,118 1015,205 975,328 1005,458 1200,458" fill="#0c0b09"/>

      {/* Mid rubble mounds */}
      {[90,230,380,540,680,820,1000].map((x,i) => (
        <polygon key={i}
          points={`${x},590 ${x+45+i*5},555 ${x+90+i*2},590`}
          fill="#0a0908" opacity="0.9"/>
      ))}
      {[140,310,480,650,820].map((x,i) => (
        <polygon key={i+10}
          points={`${x},620 ${x+28},600 ${x+56},618`}
          fill="#090807" opacity="0.7"/>
      ))}

      {/* Ground */}
      <rect x="0" y="590" width="1200" height="160" fill="#0c0b09"/>
      {/* Ground texture */}
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={0} y1={610+i*18} x2={1200} y2={612+i*18}
          stroke="#0a0908" strokeWidth="1.5" opacity="0.3"/>
      ))}

      {/* Broken window frame */}
      <rect x="390" y="195" width="190" height="148" fill="none" stroke="#1c1814" strokeWidth="3.5"/>
      <line x1="390" y1="269" x2="580" y2="269" stroke="#1c1814" strokeWidth="3.5"/>
      <line x1="485" y1="195" x2="485" y2="343" stroke="#1c1814" strokeWidth="3.5"/>
      {/* Broken glass */}
      <line x1="420" y1="200" x2="445" y2="265" stroke="#1a1a20" strokeWidth="1" opacity="0.4"/>
      <line x1="510" y1="272" x2="570" y2="338" stroke="#1a1a20" strokeWidth="1" opacity="0.35"/>

      {/* Wall crack */}
      <path d="M355,0 Q365,80 360,148 Q370,208 362,280 Q372,360 364,428 Q374,500 365,580"
        stroke="#100e0c" strokeWidth="2.5" fill="none" opacity="0.65"/>

      {/* Distant fire glow */}
      <ellipse cx="650" cy="590" rx="300" ry="180" fill="url(#ru-fire)"/>
      <ellipse cx="650" cy="590" rx="150" ry="90" fill="#d04010" opacity="0.04" filter="url(#blur5)"/>

      {/* Embers rising */}
      {[580,610,640,665,700,725,760].map((x,i) => (
        <circle key={i} cx={x} cy={550+i*8} r={1.2+Math.random()*1.2} fill="#e05010"
          opacity={0.5+i*0.05} className="ember"
          style={{animationDuration:`${3+i*0.7}s`, animationDelay:`${i*0.5}s`}}/>
      ))}
    </svg>
  )
}

/* ─── Black (intro / credits) ───────────────────────────────────── */
function BgBlack() {
  return (
    <div className="absolute inset-0" style={{background:'#040302'}}/>
  )
}

/* ─── Registry ──────────────────────────────────────────────────── */
const BG_COMPONENTS: Record<BackgroundType, React.FC> = {
  black: BgBlack,
  'apartment-hallway': BgApartmentHallway,
  'apartment-attic': BgApartmentAttic,
  'street-occupied': BgStreetOccupied,
  checkpoint: BgCheckpoint,
  bookshop: BgBookshop,
  'night-street': BgNightStreet,
  'night-canal': BgNightCanal,
  'safe-house': BgSafeHouse,
  ruins: BgRuins,
  museum: BgMuseum,
}

interface Props {
  type: BackgroundType
}

export function SceneBackground({ type }: Props) {
  const Component = BG_COMPONENTS[type] ?? BgBlack
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Component />
    </div>
  )
}
