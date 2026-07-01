import { useState, useEffect, useRef } from 'react'

const FRUITS = [
  { emoji: '🍎', color: '#ef4444', name: 'apple' },
  { emoji: '🍊', color: '#f97316', name: 'orange' },
  { emoji: '🍇', color: '#a855f7', name: 'grape' },
  { emoji: '🍌', color: '#eab308', name: 'banana' },
  { emoji: '🍑', color: '#fb923c', name: 'peach' },
  { emoji: '🍉', color: '#22c55e', name: 'watermelon' },
  { emoji: '🍓', color: '#ec4899', name: 'strawberry' },
  { emoji: '🍍', color: '#facc15', name: 'pineapple' },
]

const MEDALS = ['🥇', '🥈', '🥉']
const MEDAL_COLORS = ['#ffd700', '#c0c0c0', '#cd7f32']

// Sample leaderboard data
const SAMPLE_PLAYERS = [
  { rank: 1, name: 'ShadowSlicer', score: 28450, fruits: 847, combo: 32 },
  { rank: 2, name: 'FruitPunisher', score: 22130, fruits: 691, combo: 28 },
  { rank: 3, name: 'BladeMaster', score: 19580, fruits: 603, combo: 25 },
  { rank: 4, name: 'NinjaSlice', score: 16720, fruits: 512, combo: 22 },
  { rank: 5, name: 'MangoHunter', score: 14200, fruits: 435, combo: 19 },
  { rank: 6, name: 'CherryPop', score: 11850, fruits: 378, combo: 17 },
  { rank: 7, name: 'WatermelonWreck', score: 9620, fruits: 301, combo: 15 },
  { rank: 8, name: 'BananaBomber', score: 7450, fruits: 228, combo: 13 },
  { rank: 9, name: 'PeachPunisher', score: 5210, fruits: 167, combo: 10 },
  { rank: 10, name: 'GrapeSlayer', score: 3180, fruits: 98, combo: 8 },
]

function FloatingFruit({ fruit, index }) {
  const orbitR = 180 + (index % 3) * 50
  const rotSpeed = 4 + (index % 4) * 1.2
  const floatSpeed = 3 + (index % 3) * 1
  const delay = index * 0.35
  const scale = 0.6 + (index % 3) * 0.12
  const angle = (index / FRUITS.length) * 360

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: 0,
        height: 0,
        transformStyle: 'preserve-3d',
        animation: `lb-orbit-spin ${rotSpeed}s linear infinite`,
      }}
    >
      <div
        className="absolute"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${angle}deg) translateX(${orbitR}px)`,
          animation: `lb-float-3d ${floatSpeed}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      >
        <div
          className="flex items-center justify-center rounded-full text-[28px] border-[3px] border-[#1a1a2e] relative cursor-default"
          style={{
            width: 52,
            height: 52,
            transform: `scale(${scale})`,
            transformStyle: 'preserve-3d',
            background: `radial-gradient(circle at 35% 35%, ${fruit.color}88, ${fruit.color}44)`,
            boxShadow: `0 0 20px ${fruit.color}66, 4px 4px 0 #1a1a2e, inset 0 -4px 0 ${fruit.color}88`,
            backdropFilter: 'blur(2px)',
          }}
        >
          <span className="drop-shadow-lg" style={{ transform: 'translateZ(10px)' }}>
            {fruit.emoji}
          </span>
        </div>
      </div>
    </div>
  )
}

function PodiumCard({ player, index }) {
  const heights = [200, 160, 130]
  const zShifts = [40, 20, 0]

  return (
    <div
      className="flex flex-col items-center"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Medal */}
      <div
        className="flex items-center justify-center rounded-full border-[3px] border-[#1a1a2e] mb-2"
        style={{
          width: 48,
          height: 48,
          fontSize: 26,
          background: `radial-gradient(circle at 35% 35%, ${MEDAL_COLORS[index]}88, ${MEDAL_COLORS[index]}44)`,
          boxShadow: `0 0 16px ${MEDAL_COLORS[index]}66, 3px 3px 0 #1a1a2e`,
          transform: `translateZ(${zShifts[index] + 15}px)`,
        }}
      >
        {MEDALS[index]}
      </div>

      {/* Avatar */}
      <div
        className="flex items-center justify-center rounded-full border-[3px] border-[#1a1a2e] mb-2 overflow-hidden"
        style={{
          width: 56,
          height: 56,
          background: `radial-gradient(circle at 35% 35%, ${FRUITS[index].color}88, ${FRUITS[index].color}44)`,
          boxShadow: `3px 3px 0 #1a1a2e`,
          transform: `translateZ(${zShifts[index] + 10}px)`,
          fontSize: 28,
        }}
      >
        {FRUITS[index].emoji}
      </div>

      {/* Name */}
      <p
        className="font-extrabold text-white text-center mb-1 px-2"
        style={{
          fontSize: index === 0 ? '0.85rem' : '0.75rem',
          textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          transform: `translateZ(${zShifts[index] + 5}px)`,
        }}
      >
        {player.name}
      </p>

      {/* Score card */}
      <div
        className="rounded-xl border-[3px] border-[#1a1a2e] flex flex-col items-center justify-center"
        style={{
          width: index === 0 ? 140 : 120,
          height: heights[index],
          background: index === 0
            ? 'linear-gradient(135deg, rgba(255,215,0,0.25), rgba(255,200,0,0.10))'
            : 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
          boxShadow: index === 0
            ? '6px 6px 0 #1a1a2e, 0 0 30px rgba(255,215,0,0.15)'
            : '4px 4px 0 #1a1a2e',
          transform: `translateZ(${zShifts[index]}px)`,
          backdropFilter: 'blur(8px)',
        }}
      >
        <span
          className="font-black leading-none"
          style={{
            fontSize: index === 0 ? '1.6rem' : '1.2rem',
            background: index === 0
              ? 'linear-gradient(135deg, #ffd700, #ffaa00)'
              : 'linear-gradient(135deg, #ffffff, #aaaaaa)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: index === 0 ? 'drop-shadow(0 0 8px rgba(255,215,0,0.4))' : 'none',
          }}
        >
          {player.score.toLocaleString()}
        </span>
        <span className="text-[0.55rem] text-white/40 uppercase tracking-[0.15em] mt-0.5">
          pts
        </span>
      </div>
    </div>
  )
}

function LeaderboardRow({ player, index, isCurrentUser }) {
  const rankColors = ['#ffd700', '#c0c0c0', '#cd7f32']

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl border-[2px] transition-all duration-200"
      style={{
        background: isCurrentUser
          ? 'linear-gradient(135deg, rgba(255,68,68,0.15), rgba(255,100,0,0.08))'
          : 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        borderColor: isCurrentUser ? 'rgba(255,68,68,0.3)' : 'rgba(255,255,255,0.08)',
        boxShadow: isCurrentUser ? '0 0 20px rgba(255,68,68,0.1)' : 'none',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Rank */}
      <div
        className="flex items-center justify-center rounded-full border-[2px] font-black text-white shrink-0"
        style={{
          width: 36,
          height: 36,
          fontSize: index < 3 ? 16 : 14,
          borderColor: index < 3 ? rankColors[index] : 'rgba(255,255,255,0.15)',
          background: index < 3
            ? `radial-gradient(circle at 35% 35%, ${rankColors[index]}44, ${rankColors[index]}22)`
            : 'rgba(255,255,255,0.05)',
          boxShadow: index < 3 ? `0 0 12px ${rankColors[index]}33` : 'none',
        }}
      >
        {index < 3 ? MEDALS[index] : player.rank}
      </div>

      {/* Avatar */}
      <div
        className="flex items-center justify-center rounded-full border-[2px] border-[#1a1a2e] shrink-0"
        style={{
          width: 32,
          height: 32,
          fontSize: 16,
          background: `radial-gradient(circle at 35% 35%, ${FRUITS[index % FRUITS.length].color}66, ${FRUITS[index % FRUITS.length].color}33)`,
          boxShadow: '2px 2px 0 #1a1a2e',
        }}
      >
        {FRUITS[index % FRUITS.length].emoji}
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-white truncate" style={{ fontSize: '0.85rem' }}>
          {player.name}
          {isCurrentUser && (
            <span className="ml-2 text-[0.6rem] text-[#ff4444] uppercase tracking-[0.1em]">
              (You)
            </span>
          )}
        </p>
        <div className="flex gap-3 mt-0.5">
          <span className="text-[0.6rem] text-white/30">
            🍉 {player.fruits}
          </span>
          <span className="text-[0.6rem] text-white/30">
            🔥 {player.combo}x
          </span>
        </div>
      </div>

      {/* Score */}
      <div className="text-right">
        <p
          className="font-black"
          style={{
            fontSize: '1rem',
            color: index < 3 ? rankColors[index] : '#ffffff',
            textShadow: index < 3 ? `0 0 10px ${rankColors[index]}44` : 'none',
          }}
        >
          {player.score.toLocaleString()}
        </p>
      </div>
    </div>
  )
}

function SlashTrail() {
  const [trails, setTrails] = useState([])
  const frameRef = useRef(0)

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX || (e.touches?.[0]?.clientX ?? 0)
      const y = e.clientY || (e.touches?.[0]?.clientY ?? 0)
      if (!x && !y) return

      setTrails(prev => {
        const next = [...prev, { x, y, id: frameRef.current++, life: 1 }]
        return next.length > 20 ? next.slice(-20) : next
      })
    }

    const interval = setInterval(() => {
      setTrails(prev => prev.filter(t => t.life > 0).map(t => ({ ...t, life: t.life - 0.05 })))
    }, 30)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('touchmove', handleMove)
    return () => {
      clearInterval(interval)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove)
    }
  }, [])

  return (
    <svg className="fixed inset-0 pointer-events-none z-[100]">
      {trails.map((t, i) => {
        if (i === 0) return null
        const prev = trails[i - 1]
        return (
          <line
            key={t.id}
            x1={prev.x}
            y1={prev.y}
            x2={t.x}
            y2={t.y}
            stroke={`rgba(255,200,100,${t.life * 0.5})`}
            strokeWidth={t.life * 3 + 1}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 4px rgba(255,200,100,${t.life * 0.4}))` }}
          />
        )
      })}
    </svg>
  )
}

export default function Leaderboard() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  // Compute initial players and current user via lazy initialization
  const [players] = useState(() => {
    const stored = localStorage.getItem('fn-highscore')
    const highScore = stored ? parseInt(stored) : 0
    const ranked = SAMPLE_PLAYERS.map((p, i) => ({ ...p, rank: i + 1 }))

    if (highScore > 0) {
      const userEntry = {
        name: 'You',
        score: highScore,
        fruits: Math.floor(highScore / 32),
        combo: Math.floor(highScore / 500) + 1,
      }
      const insertAt = ranked.findIndex(p => p.score < highScore)
      if (insertAt >= 0) {
        ranked.splice(insertAt, 0, { ...userEntry, rank: insertAt + 1 })
        ranked.forEach((p, i) => (p.rank = i + 1))
        if (ranked.length > 11) ranked.pop()
      }
    }
    return ranked
  })

  const [currentUser] = useState(() => {
    const stored = localStorage.getItem('fn-highscore')
    const highScore = stored ? parseInt(stored) : 0
    return highScore > 0 ? { name: 'You', score: highScore } : null
  })

  const [activeTab, setActiveTab] = useState('global')

  useEffect(() => {
    // Animate in rows after mount
    const timer = setTimeout(() => {
      document.querySelectorAll('.lb-row').forEach((el, i) => {
        setTimeout(() => el.classList.add('lb-row-visible'), i * 60)
      })
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden bg-[#0a0a1a] flex flex-col items-center select-none"
      style={{
        perspective: '800px',
        perspectiveOrigin: `${50 + mouse.x * 12}% ${50 + mouse.y * 8}%`,
      }}
    >
      <SlashTrail />

      {/* Background layers */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(255,50,50,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 50%, rgba(255,150,0,0.10) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(200,50,255,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 0%, rgba(50,200,255,0.06) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 30%, #0a1a2e 60%, #0a0a1a 100%)
          `,
          backgroundSize: '200% 200%',
          animation: 'lb-bg-drift 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* 3D Scene wrapper */}
      <div
        className="relative w-full min-h-screen flex flex-col items-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${mouse.y * 4}deg) rotateY(${mouse.x * 6}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Floating fruit galaxy */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {FRUITS.map((fruit, i) => (
            <FloatingFruit key={fruit.name} fruit={fruit} index={i} />
          ))}
        </div>

        {/* Back button */}
        <div
          className="absolute top-6 left-6 z-20"
          style={{ transform: 'translateZ(30px)' }}
        >
          <a
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-white text-sm uppercase tracking-[0.15em] border-[2px] border-[#1a1a2e] transition-all duration-150"
            style={{
              background: 'rgba(255,255,255,0.06)',
              boxShadow: '3px 3px 0 #1a1a2e',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '5px 5px 0 #1a1a2e'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)'
              e.currentTarget.style.boxShadow = '3px 3px 0 #1a1a2e'
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>←</span>
            Back
          </a>
        </div>

        {/* User quick stats badge */}
        {currentUser && (
          <div
            className="absolute top-6 right-6 z-20 flex items-center gap-3 px-4 py-2 rounded-xl border-[2px] border-[rgba(255,215,0,0.2)]"
            style={{
              background: 'rgba(255,215,0,0.06)',
              boxShadow: '3px 3px 0 #1a1a2e',
              transform: 'translateZ(30px)',
            }}
          >
            <span className="text-lg">🏆</span>
            <div className="flex flex-col">
              <span className="text-[0.5rem] text-white/40 uppercase tracking-[0.15em]">Your Best</span>
              <span className="font-black text-[#ffd700] text-sm">{currentUser.score.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Main content */}
        <div
          className="relative z-10 w-full max-w-2xl mx-auto px-4 pt-24 pb-16"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Header */}
          <div
            className="flex flex-col items-center mb-10"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(40px)',
            }}
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl" style={{ transform: 'translateZ(10px)' }}>
                🏆
              </span>
              <h1
                className="font-black tracking-[0.15em] uppercase leading-none"
                style={{
                  fontSize: 'clamp(2rem, 8vw, 4rem)',
                  color: '#fff',
                  WebkitTextStroke: '3px #1a1a2e',
                  textStroke: '3px #1a1a2e',
                  background: 'linear-gradient(135deg, #ffd700, #ffaa00)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 4px 8px rgba(255,200,0,0.3))',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                LEADERBOARD
              </h1>
            </div>
            <p
              className="text-white/50 uppercase tracking-[0.3em] text-xs font-light"
              style={{ transform: 'translateZ(15px)' }}
            >
              Top Fruit Ninjas
            </p>
          </div>

          {/* Tab selector */}
          <div
            className="flex justify-center mb-8"
            style={{ transform: 'translateZ(20px)' }}
          >
            <div
              className="flex rounded-xl border-[2px] border-[#1a1a2e] overflow-hidden"
              style={{ boxShadow: '3px 3px 0 #1a1a2e' }}
            >
              {['global', 'friends'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-2.5 font-bold uppercase tracking-[0.15em] text-xs transition-all duration-150 cursor-pointer"
                  style={{
                    background: activeTab === tab
                      ? 'linear-gradient(135deg, #ff4444, #cc0000)'
                      : 'rgba(255,255,255,0.04)',
                    color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.4)',
                    textShadow: activeTab === tab ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
                  }}
                >
                  {tab === 'global' ? '🌍 Global' : '👥 Friends'}
                </button>
              ))}
            </div>
          </div>

          {/* Podium */}
          <div
            className="flex items-end justify-center gap-4 mb-10"
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(15px)' }}
          >
            {/* Silver - 2nd */}
            {players.length > 1 && (
              <PodiumCard player={players[1]} index={1} />
            )}

            {/* Gold - 1st */}
            {players.length > 0 && (
              <div style={{ transform: 'translateY(-15px)' }}>
                <PodiumCard player={players[0]} index={0} />
              </div>
            )}

            {/* Bronze - 3rd */}
            {players.length > 2 && (
              <PodiumCard player={players[2]} index={2} />
            )}
          </div>

          {/* Stats bar */}
          <div
            className="flex items-center justify-center gap-6 mb-6 px-6 py-3 rounded-2xl border-[2px] border-[rgba(255,255,255,0.06)]"
            style={{
              background: 'rgba(255,255,255,0.03)',
              boxShadow: '3px 3px 0 #1a1a2e',
              transform: 'translateZ(10px)',
            }}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg">⚔️</span>
              <span className="text-[0.55rem] text-white/40 uppercase tracking-[0.1em]">Players</span>
              <span className="text-sm font-bold text-white">{players.length}</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-lg">🍉</span>
              <span className="text-[0.55rem] text-white/40 uppercase tracking-[0.1em]">Total Sliced</span>
              <span className="text-sm font-bold text-white">
                {players.reduce((sum, p) => sum + p.fruits, 0).toLocaleString()}
              </span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-lg">🔥</span>
              <span className="text-[0.55rem] text-white/40 uppercase tracking-[0.1em]">Best Combo</span>
              <span className="text-sm font-bold text-white">
                {Math.max(...players.map(p => p.combo))}x
              </span>
            </div>
          </div>

          {/* Leaderboard list */}
          <div
            className="rounded-2xl border-[2px] border-[rgba(255,255,255,0.06)] overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(12px)',
              boxShadow: '4px 4px 0 #1a1a2e',
              transform: 'translateZ(20px)',
            }}
          >
            {/* List header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b-[2px] border-[rgba(255,255,255,0.04)]"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <span className="text-[0.6rem] text-white/30 uppercase tracking-[0.15em] font-bold w-[36px] text-center shrink-0">
                #
              </span>
              <span className="text-[0.6rem] text-white/30 uppercase tracking-[0.15em] font-bold w-[32px] shrink-0">
                {/* Avatar column */}
              </span>
              <span className="text-[0.6rem] text-white/30 uppercase tracking-[0.15em] font-bold flex-1">
                Player
              </span>
              <span className="text-[0.6rem] text-white/30 uppercase tracking-[0.15em] font-bold text-right">
                Score
              </span>
            </div>

            {/* Rows */}
            <div className="divide-y-[1px] divide-[rgba(255,255,255,0.04)]">
              {players
                .filter(p => {
                  if (activeTab === 'friends') return p.name === 'You'
                  return true
                })
                .map((player, i) => (
                  <div
                    key={player.rank}
                    className="lb-row lb-row-hidden transition-all duration-300"
                  >
                    <LeaderboardRow
                      player={player}
                      index={i}
                      isCurrentUser={player.name === 'You'}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className="flex justify-center mt-8"
            style={{ transform: 'translateZ(15px)' }}
          >
            <p className="text-[0.6rem] text-white/20 uppercase tracking-[0.2em] font-light">
              Rankings update every slice 🥷
            </p>
          </div>
        </div>
      </div>

      {/* Nav dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        <span
          className="w-2.5 h-2.5 rounded-full bg-white/20 border-2 border-white/10 cursor-pointer transition-all duration-200"
          onClick={() => window.location.href = '/'}
        />
        <span
          className="w-2.5 h-2.5 rounded-full bg-[#ffd700] border-2 border-[#ffd700] scale-110 cursor-pointer transition-all duration-200"
          style={{ boxShadow: '0 0 12px rgba(255,215,0,0.5)' }}
        />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20 border-2 border-white/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20 border-2 border-white/10" />
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes lb-orbit-spin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @keyframes lb-float-3d {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-${15 + 2 * 8}px); }
        }
        @keyframes lb-bg-drift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes lb-pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        .lb-row-hidden {
          opacity: 0;
          transform: translateY(20px);
        }
        .lb-row-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 640px) {
          .lb-podium { flex-direction: column; }
        }
      `}</style>
    </div>
  )
}
