import { useState, useEffect, useRef } from 'react'

const FRUITS = [
  { emoji: '🍎', color: '#ef4444', name: 'apple' },
  { emoji: '🍊', color: '#f97316', name: 'orange' },
  { emoji: '🍉', color: '#22c55e', name: 'watermelon' },
  { emoji: '🍇', color: '#a855f7', name: 'grape' },
  { emoji: '🍌', color: '#eab308', name: 'banana' },
  { emoji: '🍑', color: '#fb923c', name: 'peach' },
  { emoji: '🍓', color: '#ec4899', name: 'strawberry' },
  { emoji: '🍍', color: '#facc15', name: 'pineapple' },
]

function FloatingFruit({ fruit, index }) {
  const orbitR = 140 + (index % 3) * 60
  const rotSpeed = 3 + (index % 4) * 1.5
  const floatSpeed = 2.5 + (index % 3) * 1.2
  const delay = index * 0.4
  const scale = 0.7 + (index % 3) * 0.15
  const angle = (index / FRUITS.length) * 360

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: 0,
        height: 0,
        transformStyle: 'preserve-3d',
        animation: `orbit-spin ${rotSpeed}s linear infinite`,
      }}
    >
      <div
        className="absolute"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${angle}deg) translateX(${orbitR}px)`,
          animation: `float-3d ${floatSpeed}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      >
        <div
          className="flex items-center justify-center rounded-full text-[36px] border-[3px] border-[#1a1a2e] relative cursor-default"
          style={{
            width: 64,
            height: 64,
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
            stroke={`rgba(255,255,255,${t.life * 0.6})`}
            strokeWidth={t.life * 4 + 1}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 4px rgba(255,255,255,${t.life * 0.5}))` }}
          />
        )
      })}
    </svg>
  )
}

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [swordAngle, setSwordAngle] = useState(0)

  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMouse({ x, y })
      setSwordAngle(prev => prev + (x * 10 - prev) * 0.08)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [swordAngle])

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#0a0a1a] flex items-center justify-center select-none">
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
          animation: 'bg-drift 20s ease-in-out infinite',
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

      {/* 3D Scene */}
      <div
        className="relative w-full h-screen flex items-center justify-center"
        style={{
          perspective: '800px',
          perspectiveOrigin: `${50 + mouse.x * 15}% ${50 + mouse.y * 10}%`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Floating fruit galaxy */}
        <div
          className="absolute w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${mouse.y * 8}deg) rotateY(${mouse.x * 12}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          {FRUITS.map((fruit, i) => (
            <FloatingFruit key={fruit.name} fruit={fruit} index={i} />
          ))}
        </div>

        {/* Center content */}
        <div
          className="relative flex flex-col items-center gap-6"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(60px)',
            animation: 'title-float 4s ease-in-out infinite',
          }}
        >
          {/* Title */}
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            <h1
              className="flex flex-col items-center relative z-10"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(40px) rotateX(5deg)',
              }}
            >
              <span
                className="leading-none font-black tracking-[0.15em] uppercase"
                style={{
                  fontSize: 'clamp(3rem, 12vw, 7rem)',
                  color: '#fff',
                  WebkitTextStroke: '3px #1a1a2e',
                  textStroke: '3px #1a1a2e',
                  background: 'linear-gradient(135deg, #ff6b35, #ffd700)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 4px 8px rgba(255,100,0,0.4))',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                FRUIT
              </span>
              <span
                className="leading-none font-black tracking-[0.15em] uppercase"
                style={{
                  fontSize: 'clamp(3.5rem, 14vw, 8rem)',
                  color: '#fff',
                  WebkitTextStroke: '3px #1a1a2e',
                  textStroke: '3px #1a1a2e',
                  background: 'linear-gradient(135deg, #ff3333, #ff6b6b)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 4px 8px rgba(255,0,0,0.4))',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                NINJA
              </span>
            </h1>
            {/* Title shadow */}
            <div
              className="absolute top-[8px] left-[8px] z-[1] opacity-30 blur-[4px] flex flex-col items-center pointer-events-none"
              aria-hidden="true"
            >
              <span
                className="leading-none font-black tracking-[0.15em] uppercase text-[#0a0a1a]"
                style={{
                  fontSize: 'clamp(3rem, 12vw, 7rem)',
                  WebkitTextStroke: '3px #1a1a2e',
                  textStroke: '3px #1a1a2e',
                }}
              >
                FRUIT
              </span>
              <span
                className="leading-none font-black tracking-[0.15em] uppercase text-[#0a0a1a]"
                style={{
                  fontSize: 'clamp(3.5rem, 14vw, 8rem)',
                  WebkitTextStroke: '3px #1a1a2e',
                  textStroke: '3px #1a1a2e',
                }}
              >
                NINJA
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <p
            className="text-white/70 tracking-[0.3em] uppercase font-light mt-2"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              transform: 'translateZ(30px)',
            }}
          >
            Slice. Dice.{' '}
            <span className="text-[#ffd700] font-bold" style={{ textShadow: '0 0 20px rgba(255,215,0,0.4)' }}>
              Dominate.
            </span>
          </p>

          {/* Sword */}
          <div
            className="relative my-2"
            style={{
              width: 120,
              height: 12,
              transformStyle: 'preserve-3d',
              transformOrigin: 'right center',
              transform: `rotate(${swordAngle}deg) translateZ(20px)`,
            }}
          >
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2"
              style={{
                width: 80,
                height: 6,
                background: 'linear-gradient(90deg, transparent, rgba(200,200,255,0.6), #aaccff, #fff)',
                borderRadius: '0 3px 3px 0',
                boxShadow: '0 0 12px rgba(150,150,255,0.3)',
                animation: 'blade-glow 2s ease-in-out infinite',
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 rounded-sm"
              style={{
                right: 76,
                width: 8,
                height: 20,
                background: 'linear-gradient(180deg, #ffd700, #b8860b, #ffd700)',
                border: '2px solid #8b6914',
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 rounded-sm"
              style={{
                right: 84,
                width: 30,
                height: 8,
                background: 'linear-gradient(90deg, #4a3728, #8b4513, #4a3728)',
                border: '2px solid #2a1a0a',
              }}
            />
          </div>

          {/* Play button */}
          <button
            onClick={() => window.location.href = '/play'}
            className="relative px-12 py-4 font-extrabold tracking-[0.25em] text-white uppercase cursor-pointer overflow-hidden rounded-xl border-[3px] border-[#1a1a2e]"
            style={{
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #ff4444, #cc0000)',
              transform: 'translateZ(50px)',
              boxShadow: '0 8px 0 #1a1a2e, 0 10px 30px rgba(255,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3)',
              transition: 'all 0.1s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateZ(50px) translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 0 #1a1a2e, 0 15px 40px rgba(255,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateZ(50px)'
              e.currentTarget.style.boxShadow = '0 8px 0 #1a1a2e, 0 10px 30px rgba(255,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3)'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateZ(50px) translateY(6px)'
              e.currentTarget.style.boxShadow = '0 2px 0 #1a1a2e, 0 5px 20px rgba(255,0,0,0.3)'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateZ(50px) translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 0 #1a1a2e, 0 15px 40px rgba(255,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.3)'
            }}
          >
            <span className="relative z-10">SLICE TO PLAY</span>
            <div
              className="absolute top-0 left-[-100%] w-3/5 h-full skew-x-[-20deg]"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                animation: 'shine-sweep 3s ease-in-out infinite',
              }}
            />
          </button>

          {/* Stats */}
          <div
            className="flex items-center gap-6 px-8 py-4 rounded-2xl backdrop-blur-xl mt-2"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '2px solid rgba(255,255,255,0.1)',
              transform: 'translateZ(20px)',
            }}
          >
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-xl">🏆</span>
              <span className="text-[0.65rem] text-white/40 uppercase tracking-[0.1em]">High Score</span>
              <span className="text-lg font-bold text-white">12,450</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-xl">⚔️</span>
              <span className="text-[0.65rem] text-white/40 uppercase tracking-[0.1em]">Games Played</span>
              <span className="text-lg font-bold text-white">342</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-xl">🥷</span>
              <span className="text-[0.65rem] text-white/40 uppercase tracking-[0.1em]">Rank</span>
              <span className="text-lg font-bold text-white">#127</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff4444] border-2 border-[#ff4444] shadow-[0_0_12px_rgba(255,68,68,0.5)] scale-110" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20 border-2 border-white/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20 border-2 border-white/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20 border-2 border-white/10" />
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes orbit-spin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @keyframes float-3d {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-${15 + 2 * 8}px); }
        }
        @keyframes title-float {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-6px) rotateX(2deg); }
        }
        @keyframes blade-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes shine-sweep {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes bg-drift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (max-width: 640px) {
          .stats-3d { flex-direction: column; }
        }
      `}</style>
    </div>
  )
}
