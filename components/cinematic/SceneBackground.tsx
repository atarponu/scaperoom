'use client'

import type { BackgroundType } from '@/types/narrative'

/* ─── Apartment Hallway ─────────────────────────────────────────── */
function BgApartmentHallway() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="ah-light" cx="50%" cy="18%" r="35%">
          <stop offset="0%" stopColor="#c4a060" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#0a0805" stopOpacity="0"/>
        </radialGradient>
        <pattern id="ah-wallpaper" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#1a1208"/>
          <line x1="0" y1="0" x2="40" y2="0" stroke="#221808" strokeWidth="0.5"/>
          <line x1="0" y1="20" x2="40" y2="20" stroke="#221808" strokeWidth="0.5"/>
          <circle cx="20" cy="10" r="1.5" fill="#1d1508" opacity="0.6"/>
          <circle cx="0" cy="30" r="1.5" fill="#1d1508" opacity="0.6"/>
        </pattern>
        <linearGradient id="ah-floor-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e0a06"/>
          <stop offset="100%" stopColor="#150e08"/>
        </linearGradient>
        <filter id="blur-soft">
          <feGaussianBlur stdDeviation="2"/>
        </filter>
        <style>{`
          @keyframes ah-flicker {
            0%,100%{opacity:.18} 45%{opacity:.16} 50%{opacity:.19} 75%{opacity:.17} 80%{opacity:.18}
          }
          .ah-light { animation: ah-flicker 5s ease-in-out infinite; }
        `}</style>
      </defs>
      {/* Base dark bg */}
      <rect width="1200" height="750" fill="#0d0b07"/>
      {/* Left wall */}
      <polygon points="0,0 420,120 420,750 0,750" fill="url(#ah-wallpaper)"/>
      {/* Right wall */}
      <polygon points="1200,0 780,120 780,750 1200,750" fill="url(#ah-wallpaper)"/>
      {/* Ceiling */}
      <polygon points="0,0 1200,0 780,120 420,120" fill="#120f09"/>
      {/* Floor */}
      <polygon points="420,750 780,750 1200,750 0,750" fill="url(#ah-floor-grad)"/>
      {/* Floor planks */}
      {[0,0.14,0.28,0.42,0.56,0.7,0.84,0.98].map((t,i)=>(
        <line key={i} x1={420+t*(780-420)} y1={120+t*(750-120)} x2={420+(t+0.14)*(780-420)} y2={120+(t+0.14)*(750-120)}
          stroke="#180e06" strokeWidth="1.5" opacity="0.7"/>
      ))}
      {/* Wall trim lines */}
      <line x1="0" y1="0" x2="420" y2="120" stroke="#221508" strokeWidth="2" opacity="0.5"/>
      <line x1="1200" y1="0" x2="780" y2="120" stroke="#221508" strokeWidth="2" opacity="0.5"/>
      {/* Door at end of corridor */}
      <rect x="530" y="200" width="140" height="290" rx="2" fill="#0a0805"/>
      <rect x="530" y="200" width="140" height="290" rx="2" fill="none" stroke="#1e1508" strokeWidth="2"/>
      <rect x="545" y="215" width="110" height="120" rx="1" fill="#0c0907" stroke="#1a1208" strokeWidth="1"/>
      <rect x="545" y="355" width="110" height="120" rx="1" fill="#0c0907" stroke="#1a1208" strokeWidth="1"/>
      <circle cx="664" cy="350" r="4" fill="#2a1e0e" stroke="#3a2a12" strokeWidth="1"/>
      {/* Ceiling light bulb */}
      <circle cx="600" cy="115" r="5" fill="#c4a060" opacity="0.4" filter="url(#blur-soft)"/>
      <line x1="600" y1="90" x2="600" y2="110" stroke="#1a1408" strokeWidth="1"/>
      {/* Light cone */}
      <polygon points="600,120 460,700 740,700" fill="url(#ah-light)" className="ah-light"/>
      {/* Skirting board */}
      <line x1="0" y1="745" x2="1200" y2="745" stroke="#180e06" strokeWidth="3" opacity="0.6"/>
    </svg>
  )
}

/* ─── Apartment Attic ───────────────────────────────────────────── */
function BgApartmentAttic() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="attic-win" cx="70%" cy="20%" r="12%">
          <stop offset="0%" stopColor="#8090a0" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#0a0805" stopOpacity="0"/>
        </radialGradient>
        <style>{`
          @keyframes dust-float {
            0%{transform:translateY(0) translateX(0)} 100%{transform:translateY(-80px) translateX(20px)}
          }
          .dust { animation: dust-float linear infinite; }
        `}</style>
      </defs>
      <rect width="1200" height="750" fill="#080705"/>
      {/* Sloped ceiling beams — left side */}
      <polygon points="0,0 600,300 0,750" fill="#0c0a07"/>
      {/* Sloped ceiling — right */}
      <polygon points="1200,0 600,300 1200,750" fill="#0e0c08"/>
      {/* Rafters */}
      {[150,300,450,600,750,900,1050].map((x,i)=>(
        <line key={i} x1={x} y1={0} x2={600} y2={300} stroke="#141008" strokeWidth="18" opacity="0.9"/>
      ))}
      {/* Horizontal crossbeam */}
      <rect x="100" y="290" width="1000" height="20" fill="#0f0d08" rx="2"/>
      {/* Floor planks */}
      {[0,40,80,120,160,200].map((y,i)=>(
        <rect key={i} x="0" y={700+y*0.4} width="1200" height="8" fill="#0d0b07" stroke="#100d07" strokeWidth="1"/>
      ))}
      {/* Small attic window top-right */}
      <rect x="820" y="60" width="180" height="130" rx="3" fill="#1a2030" opacity="0.7"/>
      <line x1="820" y1="125" x2="1000" y2="125" stroke="#0d1018" strokeWidth="3"/>
      <line x1="910" y1="60" x2="910" y2="190" stroke="#0d1018" strokeWidth="3"/>
      {/* Window light spill */}
      <polygon points="820,190 1000,190 1000,600 700,750" fill="url(#attic-win)"/>
      {/* Dust motes */}
      {[840,870,900,940,960,990,1010].map((x,i)=>(
        <circle key={i} cx={x} cy={220+i*15} r="1.5" fill="#c4a882" opacity={0.15+i*0.03}
          className="dust" style={{animationDuration:`${6+i*1.3}s`, animationDelay:`${i*0.7}s`}}/>
      ))}
      {/* Old suitcase silhouette */}
      <rect x="200" y="680" width="120" height="55" rx="4" fill="#0e0b07" stroke="#1a1408" strokeWidth="1.5"/>
      <line x1="200" y1="707" x2="320" y2="707" stroke="#1a1408" strokeWidth="1.5"/>
      {/* Blanket roll */}
      <ellipse cx="500" cy="718" rx="80" ry="22" fill="#120e09"/>
    </svg>
  )
}

/* ─── Street Occupied ───────────────────────────────────────────── */
function BgStreetOccupied() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="st-lamp" cx="75%" cy="38%" r="18%">
          <stop offset="0%" stopColor="#c4a060" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#0a0805" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="st-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1e24"/>
          <stop offset="100%" stopColor="#10141a"/>
        </linearGradient>
        <pattern id="st-cobble" x="0" y="0" width="60" height="40" patternUnits="userSpaceOnUse">
          <rect width="60" height="40" fill="#141210"/>
          <ellipse cx="15" cy="20" rx="12" ry="8" fill="#111010" stroke="#1a1814" strokeWidth="0.8"/>
          <ellipse cx="45" cy="10" rx="12" ry="8" fill="#100f0e" stroke="#191714" strokeWidth="0.8"/>
          <ellipse cx="45" cy="30" rx="12" ry="8" fill="#121110" stroke="#1b1916" strokeWidth="0.8"/>
        </pattern>
        <style>{`
          @keyframes fog-drift { 0%{transform:translateX(0)} 100%{transform:translateX(-200px)} }
          .fog-layer { animation: fog-drift linear infinite; }
        `}</style>
      </defs>
      {/* Sky */}
      <rect width="1200" height="750" fill="url(#st-sky)"/>
      {/* Buildings left */}
      <rect x="0" y="80" width="280" height="550" fill="#0e1018" rx="0"/>
      <rect x="30" y="120" width="30" height="40" fill="#141a22" opacity="0.6"/>
      <rect x="80" y="100" width="30" height="40" fill="#161c24" opacity="0.4"/>
      <rect x="130" y="140" width="30" height="40" fill="#0f1520" opacity="0.5"/>
      <rect x="0" y="580" width="280" height="20" fill="#0c0e12"/>
      {/* Buildings right */}
      <rect x="900" y="60" width="300" height="570" fill="#0d0f14" rx="0"/>
      <rect x="930" y="90" width="30" height="40" fill="#141a22" opacity="0.5"/>
      <rect x="990" y="110" width="30" height="40" fill="#0f1520" opacity="0.3"/>
      <rect x="1050" y="80" width="30" height="40" fill="#131820" opacity="0.4"/>
      {/* Middle buildings */}
      <rect x="260" y="140" width="200" height="490" fill="#0f1116" rx="0"/>
      <rect x="740" y="160" width="180" height="470" fill="#0c0e12" rx="0"/>
      {/* Cobblestone road */}
      <polygon points="0,550 1200,550 1200,750 0,750" fill="url(#st-cobble)"/>
      {/* Pavement edge */}
      <line x1="0" y1="550" x2="1200" y2="550" stroke="#1a1814" strokeWidth="3"/>
      {/* Lamppost */}
      <line x1="900" y1="200" x2="900" y2="580" stroke="#1a1810" strokeWidth="8"/>
      <path d="M900,200 Q880,180 860,185" stroke="#1a1810" strokeWidth="6" fill="none"/>
      <circle cx="858" cy="185" r="8" fill="#c4a060" opacity="0.5"/>
      {/* Lamp glow */}
      <ellipse cx="858" cy="185" rx="60" ry="50" fill="url(#st-lamp)"/>
      {/* Fog layers */}
      <rect x="-200" y="490" width="1600" height="120" fill="#141820" opacity="0.25"
        className="fog-layer" style={{animationDuration:'22s'}}/>
      <rect x="-200" y="520" width="1600" height="80" fill="#161922" opacity="0.15"
        className="fog-layer" style={{animationDuration:'35s', animationDirection:'reverse'}}/>
      {/* Distant figures — silhouettes */}
      <rect x="450" y="500" width="12" height="50" rx="3" fill="#0a0c10"/>
      <ellipse cx="456" cy="495" rx="7" ry="7" fill="#0a0c10"/>
      <rect x="490" y="510" width="10" height="40" rx="2" fill="#090b0f"/>
      <ellipse cx="495" cy="506" rx="5" ry="6" fill="#090b0f"/>
    </svg>
  )
}

/* ─── Checkpoint ────────────────────────────────────────────────── */
function BgCheckpoint() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="cp-light" cx="25%" cy="5%" r="45%">
          <stop offset="0%" stopColor="#dde8f0" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#0a0c10" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="cp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0c12"/>
          <stop offset="100%" stopColor="#0e1018"/>
        </linearGradient>
        <pattern id="cp-cobble" x="0" y="0" width="50" height="35" patternUnits="userSpaceOnUse">
          <rect width="50" height="35" fill="#111010"/>
          <ellipse cx="12" cy="17" rx="10" ry="7" fill="#100f0e" stroke="#161412" strokeWidth="0.8"/>
          <ellipse cx="38" cy="8" rx="10" ry="7" fill="#0f0e0d" stroke="#151311" strokeWidth="0.8"/>
          <ellipse cx="38" cy="27" rx="10" ry="7" fill="#111010" stroke="#171513" strokeWidth="0.8"/>
        </pattern>
        <style>{`
          @keyframes searchlight {
            0%{transform:rotate(-8deg)} 50%{transform:rotate(8deg)} 100%{transform:rotate(-8deg)}
          }
          .searchlight { transform-origin: 300px 0px; animation: searchlight 8s ease-in-out infinite; }
        `}</style>
      </defs>
      <rect width="1200" height="750" fill="url(#cp-sky)"/>
      {/* Background buildings */}
      <rect x="0" y="120" width="220" height="510" fill="#0c0e14"/>
      <rect x="980" y="100" width="220" height="530" fill="#0b0d12"/>
      <rect x="200" y="180" width="160" height="450" fill="#0e1016"/>
      <rect x="840" y="160" width="160" height="470" fill="#0d0f14"/>
      {/* Guardhouse */}
      <rect x="850" y="340" width="130" height="280" fill="#0e0f14" stroke="#161820" strokeWidth="2"/>
      <rect x="860" y="360" width="40" height="50" fill="#0a0c10" stroke="#14161c" strokeWidth="1"/>
      <rect x="920" y="355" width="50" height="60" fill="#14181f" opacity="0.4"/>
      {/* Barrier pole */}
      <line x1="0" y1="420" x2="750" y2="420" stroke="#1a1a1a" strokeWidth="12"/>
      {[0,60,120,180,240,300,360,420,480,540,600,660,720].map((x,i)=>(
        <rect key={i} x={x} y={414} width={30} height={12}
          fill={i%2===0?"#8b1c1c":"#e8d5b7"} opacity="0.85"/>
      ))}
      {/* Barrier post */}
      <rect x="740" y="360" width="18" height="220" fill="#1a1818" rx="2"/>
      {/* Searchlight */}
      <polygon points="280,0 240,500 340,500" fill="url(#cp-light)" className="searchlight" opacity="0.9"/>
      {/* Ground */}
      <polygon points="0,580 1200,580 1200,750 0,750" fill="url(#cp-cobble)"/>
      <line x1="0" y1="580" x2="1200" y2="580" stroke="#1a1814" strokeWidth="2"/>
      {/* Soldier silhouette */}
      <rect x="960" y="430" width="22" height="110" rx="3" fill="#0a0b10"/>
      <ellipse cx="971" cy="425" rx="12" ry="13" fill="#0a0b10"/>
      {/* Helmet */}
      <ellipse cx="971" cy="415" rx="13" ry="8" fill="#0c0d12"/>
      {/* Gun silhouette */}
      <line x1="960" y1="480" x2="1010" y2="460" stroke="#0a0b10" strokeWidth="5"/>
    </svg>
  )
}

/* ─── Bookshop ──────────────────────────────────────────────────── */
function BgBookshop() {
  const books = [
    {x:60,h:80,w:18,c:'#2a1a08'},{x:79,h:95,w:14,c:'#1e2818'},{x:94,h:72,w:20,c:'#281808'},
    {x:115,h:88,w:16,c:'#1a1a28'},{x:132,h:78,w:22,c:'#2a2008'},{x:155,h:92,w:15,c:'#1e1818'},
    {x:171,h:68,w:18,c:'#281a10'},{x:190,h:85,w:20,c:'#201e10'},{x:211,h:77,w:14,c:'#2a1810'},
    {x:940,h:82,w:16,c:'#201808'},{x:957,h:70,w:22,c:'#1a2018'},{x:980,h:90,w:18,c:'#281810'},
    {x:999,h:76,w:20,c:'#1e1828'},{x:1020,h:88,w:14,c:'#281a08'},{x:1035,h:72,w:18,c:'#201818'},
    {x:1054,h:84,w:16,c:'#1a1e20'},{x:1071,h:78,w:22,c:'#2a2010'},{x:1094,h:86,w:18,c:'#181a20'},
  ]
  const booksTop = [
    {x:20,h:70,w:16,c:'#241408'},{x:37,h:82,w:20,c:'#1c2410'},{x:58,h:65,w:18,c:'#281808'},
    {x:77,h:78,w:14,c:'#1a1c28'},{x:92,h:72,w:22,c:'#241a08'},{x:115,h:80,w:16,c:'#1c1a14'},
    {x:920,h:74,w:18,c:'#201408'},{x:939,h:68,w:22,c:'#1a1c18'},{x:962,h:80,w:16,c:'#241808'},
    {x:979,h:72,w:20,c:'#1c1828'},{x:1000,h:76,w:18,c:'#241a10'},{x:1019,h:68,w:14,c:'#1c1818'},
  ]
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="bs-lamp" cx="60%" cy="35%" r="30%">
          <stop offset="0%" stopColor="#c49040" stopOpacity="0.28"/>
          <stop offset="60%" stopColor="#c49040" stopOpacity="0.08"/>
          <stop offset="100%" stopColor="#0a0805" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="bs-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#18120a"/>
          <stop offset="100%" stopColor="#100d08"/>
        </linearGradient>
        <style>{`
          @keyframes lamp-flicker {
            0%,100%{opacity:1} 30%{opacity:.94} 35%{opacity:1} 70%{opacity:.96} 75%{opacity:1}
          }
          .bs-lamp { animation: lamp-flicker 7s ease-in-out infinite; }
        `}</style>
      </defs>
      <rect width="1200" height="750" fill="url(#bs-bg)"/>
      {/* Bookshelf back walls */}
      <rect x="0" y="80" width="260" height="600" fill="#160f08"/>
      <rect x="940" y="80" width="260" height="600" fill="#160f08"/>
      {/* Shelf planks — left */}
      {[200,310,420,530,640].map((y,i)=>(
        <rect key={i} x="0" y={y} width="260" height="10" fill="#1e1408" rx="1"/>
      ))}
      {/* Shelf planks — right */}
      {[200,310,420,530,640].map((y,i)=>(
        <rect key={i} x="940" y={y} width="260" height="10" fill="#1e1408" rx="1"/>
      ))}
      {/* Books on lower left shelf */}
      {books.map((b,i)=>(
        <rect key={i} x={b.x} y={530-b.h} width={b.w} height={b.h} fill={b.c} stroke="#0a0805" strokeWidth="0.5"/>
      ))}
      {/* Books on upper left shelf */}
      {booksTop.map((b,i)=>(
        <rect key={i} x={b.x} y={420-b.h} width={b.w} height={b.h} fill={b.c} stroke="#0a0805" strokeWidth="0.5"/>
      ))}
      {/* Shop counter */}
      <rect x="300" y="540" width="600" height="210" fill="#1a1208" rx="2"/>
      <rect x="300" y="540" width="600" height="20" fill="#201610" rx="2"/>
      {/* Counter top items — books */}
      <rect x="350" y="510" width="60" height="30" fill="#1e1408" transform="rotate(-5 350 510)"/>
      <rect x="420" y="505" width="50" height="25" fill="#201810" transform="rotate(3 420 505)"/>
      {/* Reading lamp */}
      <line x1="680" y1="400" x2="680" y2="540" stroke="#181408" strokeWidth="6"/>
      <path d="M680,400 Q640,380 620,395" stroke="#181408" strokeWidth="5" fill="none"/>
      <ellipse cx="618" cy="398" rx="22" ry="12" fill="#c49040" opacity="0.6" className="bs-lamp"/>
      <polygon points="595,398 641,398 660,480 576,480" fill="url(#bs-lamp)" className="bs-lamp"/>
      {/* Lamp glow */}
      <ellipse cx="618" cy="450" rx="200" ry="250" fill="url(#bs-lamp)"/>
      {/* Window with grey outside light */}
      <rect x="490" y="100" width="220" height="180" fill="#1a2028" rx="2"/>
      <line x1="490" y1="190" x2="710" y2="190" stroke="#14181e" strokeWidth="3"/>
      <line x1="600" y1="100" x2="600" y2="280" stroke="#14181e" strokeWidth="3"/>
      <rect x="490" y="100" width="220" height="180" fill="#1e2830" opacity="0.3"/>
      {/* Motes of dust in lamp light */}
      {[630,650,660,670,640,620,680].map((x,i)=>(
        <circle key={i} cx={x} cy={420+i*12} r="1" fill="#c4a882" opacity="0.12"/>
      ))}
    </svg>
  )
}

/* ─── Night Street (canal) ──────────────────────────────────────── */
function BgNightStreet() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="ns-lamp" cx="30%" cy="45%" r="20%">
          <stop offset="0%" stopColor="#c4a060" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#050810" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="ns-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#060a14"/>
          <stop offset="100%" stopColor="#040810"/>
        </linearGradient>
        <linearGradient id="ns-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#040608"/>
          <stop offset="100%" stopColor="#07090e"/>
        </linearGradient>
        <style>{`
          @keyframes water-ripple {
            0%{transform:translateX(0) scaleY(1)} 50%{transform:translateX(8px) scaleY(0.96)} 100%{transform:translateX(0) scaleY(1)}
          }
          @keyframes lamp-glow-pulse {
            0%,100%{opacity:.18} 50%{opacity:.14}
          }
          .water-r { animation: water-ripple 4s ease-in-out infinite; }
          .lamp-pulse { animation: lamp-glow-pulse 5s ease-in-out infinite; }
        `}</style>
      </defs>
      {/* Sky */}
      <rect width="1200" height="750" fill="url(#ns-sky)"/>
      {/* Left canal bank buildings */}
      <rect x="0" y="60" width="320" height="450" fill="#07080e"/>
      {[80,130,170].map((y,i)=>(
        <rect key={i} x={20+i*80} y={y} width={35} height={45} fill="#0b0c14" rx="1" opacity={0.5+i*0.1}/>
      ))}
      <rect x="0" y="480" width="320" height="40" fill="#090a10"/>
      {/* Right buildings */}
      <rect x="880" y="40" width="320" height="470" fill="#06070c"/>
      {[80,110,150].map((y,i)=>(
        <rect key={i} x={900+i*70} y={y} width={35} height={45} fill="#0a0b12" rx="1" opacity={0.4+i*0.1}/>
      ))}
      {/* Canal water */}
      <rect x="0" y="520" width="1200" height="230" fill="url(#ns-water)"/>
      {/* Water ripple lines */}
      {[540,555,570,585,600,620,640,660,680,700].map((y,i)=>(
        <line key={i} x1={i*40} y1={y} x2={i*40+300+i*20} y2={y}
          stroke="#0a0e18" strokeWidth="1.5" opacity="0.4" className="water-r"
          style={{animationDelay:`${i*0.3}s`,animationDuration:`${3+i*0.4}s`}}/>
      ))}
      {/* Lamppost reflection in water */}
      <line x1="360" y1="520" x2="360" y2="680" stroke="#c4a060" strokeWidth="2" opacity="0.05"/>
      {/* Canal walls / pavement */}
      <rect x="0" y="510" width="350" height="20" fill="#0a0c10"/>
      <rect x="850" y="510" width="350" height="20" fill="#09090e"/>
      <rect x="340" y="510" width="520" height="20" fill="#080a0e"/>
      {/* Bridge arch */}
      <path d="M340,510 Q600,440 860,510" stroke="#0e1018" strokeWidth="25" fill="none"/>
      {/* Cobblestones on bridge */}
      <path d="M360,510 Q600,445 840,510" stroke="#141618" strokeWidth="10" fill="none" strokeDasharray="15,8"/>
      {/* Lamppost */}
      <line x1="355" y1="200" x2="355" y2="520" stroke="#0e0e14" strokeWidth="8"/>
      <path d="M355,200 Q330,178 308,182" stroke="#0e0e14" strokeWidth="6" fill="none"/>
      <circle cx="306" cy="182" r="9" fill="#c4a060" opacity="0.55"/>
      <ellipse cx="306" cy="182" rx="80" ry="70" fill="url(#ns-lamp)" className="lamp-pulse"/>
      {/* Lamp post reflection */}
      <line x1="355" y1="520" x2="355" y2="650" stroke="#0e0e14" strokeWidth="4" opacity="0.15" className="water-r"/>
    </svg>
  )
}

/* ─── Safe House ────────────────────────────────────────────────── */
function BgSafeHouse() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="sh-candle" cx="52%" cy="52%" r="30%">
          <stop offset="0%" stopColor="#c48020" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#080806" stopOpacity="0"/>
        </radialGradient>
        <style>{`
          @keyframes candle-flicker {
            0%,100%{opacity:.22} 25%{opacity:.18} 40%{opacity:.24} 60%{opacity:.19} 80%{opacity:.22}
          }
          .candle-glow { animation: candle-flicker 2s ease-in-out infinite; }
        `}</style>
      </defs>
      <rect width="1200" height="750" fill="#070705"/>
      {/* Walls */}
      <rect x="0" y="0" width="1200" height="750" fill="#0a0906"/>
      {/* Window — blacked out */}
      <rect x="100" y="100" width="200" height="150" fill="#06080e" rx="2" stroke="#141008" strokeWidth="3"/>
      <rect x="100" y="100" width="200" height="150" fill="#020408" opacity="0.9"/>
      <line x1="100" y1="175" x2="300" y2="175" stroke="#0a0c10" strokeWidth="3"/>
      <line x1="200" y1="100" x2="200" y2="250" stroke="#0a0c10" strokeWidth="3"/>
      {/* Blackout paper over window */}
      <rect x="100" y="100" width="200" height="150" fill="#060503" opacity="0.95"/>
      {/* Table */}
      <rect x="350" y="480" width="500" height="20" rx="2" fill="#111008"/>
      <rect x="370" y="500" width="20" height="200" fill="#0e0d08"/>
      <rect x="820" y="500" width="20" height="200" fill="#0e0d08"/>
      {/* Candle on table */}
      <rect x="595" y="445" width="10" height="35" fill="#c8b880" opacity="0.6"/>
      <ellipse cx="600" cy="445" rx="5" ry="7" fill="#e8c840" opacity="0.7"/>
      {/* Candle glow */}
      <ellipse cx="600" cy="500" rx="300" ry="280" fill="url(#sh-candle)" className="candle-glow"/>
      {/* Papers on table */}
      <rect x="420" y="456" width="90" height="24" fill="#e8d5b7" opacity="0.08" transform="rotate(-3 420 456)"/>
      <rect x="520" y="460" width="70" height="20" fill="#e8d5b7" opacity="0.06" transform="rotate(4 520 460)"/>
      {/* Chair silhouette */}
      <rect x="750" y="430" width="80" height="60" rx="2" fill="#0c0b07"/>
      <rect x="760" y="490" width="15" height="80" fill="#0c0b07"/>
      <rect x="800" y="490" width="15" height="80" fill="#0c0b07"/>
      {/* Wall cracks */}
      <path d="M900,200 Q910,230 905,260 Q912,285 908,310" stroke="#0e0c08" strokeWidth="1.5" fill="none" opacity="0.6"/>
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
        <linearGradient id="mu-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4a882" stopOpacity="0.08"/>
          <stop offset="100%" stopColor="#c4a882" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="750" fill="url(#mu-bg)"/>
      {/* Wainscoting */}
      <rect x="0" y="620" width="1200" height="130" fill="#120e0c"/>
      <line x1="0" y1="620" x2="1200" y2="620" stroke="#1e1812" strokeWidth="2"/>
      {/* Panel frames */}
      {[60,260,460,660,860,1060].map((x,i)=>(
        <rect key={i} x={x} y={100} width={140} height={200} fill="none" stroke="#1e1812" strokeWidth="1.5" opacity="0.4"/>
      ))}
      {/* Spotlights from ceiling */}
      {[200,500,700,1000].map((x,i)=>(
        <polygon key={i} points={`${x-8},0 ${x+8},0 ${x+60},300 ${x-60},300`}
          fill="url(#mu-light)" opacity="0.6"/>
      ))}
      {/* Floor line */}
      <line x1="0" y1="618" x2="1200" y2="618" stroke="#241e18" strokeWidth="1.5" opacity="0.5"/>
      {/* Decorative horizontal lines */}
      <line x1="0" y1="80" x2="1200" y2="80" stroke="#1e1812" strokeWidth="1" opacity="0.3"/>
      <line x1="0" y1="88" x2="1200" y2="88" stroke="#1e1812" strokeWidth="0.5" opacity="0.2"/>
    </svg>
  )
}

/* ─── Night Canal ───────────────────────────────────────────────── */
function BgNightCanal() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="nc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#030406"/>
          <stop offset="100%" stopColor="#060810"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="750" fill="url(#nc-sky)"/>
      {/* Buildings dark silhouettes */}
      <rect x="0" y="100" width="300" height="430" fill="#050608"/>
      <rect x="900" y="80" width="300" height="450" fill="#040507"/>
      <rect x="280" y="160" width="200" height="370" fill="#060709"/>
      <rect x="720" y="140" width="200" height="390" fill="#05060a"/>
      {/* Canal */}
      <rect x="0" y="530" width="1200" height="220" fill="#040610"/>
      {/* Water shimmer */}
      {[550,570,595,615,635,660,685].map((y,i)=>(
        <line key={i} x1={50+i*80} y1={y} x2={200+i*100} y2={y} stroke="#0a0e1c" strokeWidth="1" opacity="0.5"/>
      ))}
      {/* Moon reflection */}
      <ellipse cx="600" cy="590" rx="30" ry="8" fill="#0e1428" opacity="0.6"/>
      {/* Dim moon */}
      <circle cx="600" cy="80" r="28" fill="#1a1e28" opacity="0.4"/>
    </svg>
  )
}

/* ─── Ruins ─────────────────────────────────────────────────────── */
function BgRuins() {
  return (
    <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="ru-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c1018"/>
          <stop offset="100%" stopColor="#0e1016"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="750" fill="url(#ru-sky)"/>
      {/* Broken wall left */}
      <polygon points="0,0 200,0 220,80 180,140 240,220 200,340 180,500 0,500" fill="#0e0c0a"/>
      {/* Broken wall right */}
      <polygon points="1200,0 980,0 970,120 1010,200 970,320 1000,450 1200,450" fill="#0c0b09"/>
      {/* Rubble on ground */}
      <polygon points="0,580 1200,580 1200,750 0,750" fill="#0d0b09"/>
      {[100,180,300,450,600,720,880,1020].map((x,i)=>(
        <polygon key={i} points={`${x},580 ${x+40+i*5},550 ${x+80},580`} fill="#0a0907" opacity="0.8"/>
      ))}
      {/* Broken window frame */}
      <rect x="400" y="200" width="180" height="140" fill="none" stroke="#1a1614" strokeWidth="3"/>
      <line x1="400" y1="270" x2="580" y2="270" stroke="#1a1614" strokeWidth="3"/>
      <line x1="490" y1="200" x2="490" y2="340" stroke="#1a1614" strokeWidth="3"/>
      {/* Crack in wall */}
      <path d="M350,0 Q360,80 355,140 Q365,200 358,280 Q368,360 360,420" stroke="#100e0c" strokeWidth="3" fill="none" opacity="0.7"/>
    </svg>
  )
}

/* ─── Black (intro / credits) ───────────────────────────────────── */
function BgBlack() {
  return <rect className="absolute inset-0 h-full w-full" style={{background:'#050402'}}/>
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
