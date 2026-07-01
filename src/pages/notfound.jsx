import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FRUIT_TYPES } from "../constants/fruit";



function Shard({ index, total, seed }) {
  const angle = (index / total) * 360

  const params = useMemo(() => {
    // Seeded pseudo-random based on index + seed to avoid Math.random during render
    const s = (index * 137.508 + seed * 7919) % 1
    const s2 = (index * 271.828 + seed * 6271) % 1
    const s3 = (index * 314.159 + seed * 3557) % 1
    const s4 = (index * 161.803 + seed * 4817) % 1
    return {
      dist: 100 + s * 80,
      rot: s2 * 720 - 360,
      size: 6 + s3 * 8,
      twinkleDur: 2 + s4 * 2,
    }
  }, [index, seed])

  const delay = index * 0.12
  const { dist, rot, size, twinkleDur } = params

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: 0,
        height: 0,
        transformStyle: 'preserve-3d',
        animation: `shard-drift 3s ease-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div
        className="absolute"
        style={{
          width: size,
          height: size * 2.5,
          transform: `rotate(${angle}deg) translateX(${dist}px) rotateZ(${rot}deg)`,
          transformStyle: 'preserve-3d',
          background: `linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.05))`,
          borderRadius: '2px',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: `0 0 6px rgba(255,255,255,0.1)`,
          animation: `shard-twinkle ${twinkleDur}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  )
}

export default function NotFound() {
  const navigate = useNavigate()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hoverBtn, setHoverBtn] = useState(false)

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
    <div className="relative w-full min-h-screen overflow-hidden bg-[#0a0a1a] flex items-center justify-center select-none">
      {/* Background layers */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(255,50,50,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(100,50,255,0.10) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 20%, rgba(255,150,0,0.06) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 30%, #0a1a2e 60%, #0a0a1a 100%)
          `,
          backgroundSize: "200% 200%",
          animation: "bg-drift 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* 3D Scene container */}
      <div
        className="relative w-full h-screen flex items-center justify-center"
        style={{
          perspective: "1000px",
          perspectiveOrigin: `${50 + mouse.x * 12}% ${50 + mouse.y * 10}%`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Rotating shard debris */}
        <div
          className="absolute w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${mouse.y * 6}deg) rotateY(${mouse.x * 10}deg)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <Shard key={i} index={i} total={24} seed={Math.PI} />
          ))}
        </div>

        {/* Center content */}
        <div
          className="relative flex flex-col items-center gap-6 z-10"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(40px)",
          }}
        >
          {/* 404 Number - 3D layered */}
          <div className="relative" style={{ transformStyle: "preserve-3d" }}>
            {/* Bottom shadow layer */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
              style={{
                transform: "translateZ(-30px) translateX(8px) translateY(8px)",
                opacity: 0.3,
                filter: "blur(8px)",
              }}
              aria-hidden="true"
            >
              <span
                className="font-black leading-none text-[#0a0a1a]"
                style={{
                  fontSize: "clamp(6rem, 30vw, 16rem)",
                  WebkitTextStroke: "4px #1a1a2e",
                  textStroke: "4px #1a1a2e",
                }}
              >
                404
              </span>
            </div>

            {/* Middle parallax layer */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
              style={{
                transformStyle: "preserve-3d",
                transform: `translateZ(20px) translateX(${mouse.x * 8}px) translateY(${mouse.y * 5}px)`,
              }}
              aria-hidden="true"
            >
              <span
                className="font-black leading-none text-transparent"
                style={{
                  fontSize: "clamp(6rem, 30vw, 16rem)",
                  WebkitTextStroke: "4px rgba(255,68,68,0.3)",
                  textStroke: "4px rgba(255,68,68,0.3)",
                  background:
                    "linear-gradient(135deg, rgba(255,68,68,0.15), rgba(255,215,0,0.10))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                404
              </span>
            </div>

            {/* Front main layer */}
            <div
              className="relative z-10 flex items-center justify-center select-none"
              style={{
                transformStyle: "preserve-3d",
                animation: "number-float 4s ease-in-out infinite",
              }}
            >
              <span
                className="font-black leading-none uppercase tracking-[-0.03em]"
                style={{
                  fontSize: "clamp(6rem, 30vw, 16rem)",
                  color: "#fff",
                  WebkitTextStroke: "4px #1a1a2e",
                  textStroke: "4px #1a1a2e",
                  background:
                    "linear-gradient(135deg, #ff4444 30%, #ff6b35 60%, #ffd700 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter:
                    "drop-shadow(0 8px 20px rgba(255,50,50,0.4)) drop-shadow(0 0 60px rgba(255,50,50,0.15))",
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                }}
              >
                404
              </span>
            </div>
          </div>

          {/* Sliced fruit decoration */}
          <div
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(30px) translateY(${mouse.y * 3}px)`,
            }}
          >
            {/* Halved fruit */}
            <div className="flex items-center gap-4">
              <div
                className="relative"
                style={{
                  transformStyle: "preserve-3d",
                  animation: "fruit-sway 3s ease-in-out infinite",
                }}
              >
                {/* Top half */}
                <div
                  className="rounded-full flex items-center justify-center text-[2.5rem] border-[3px] border-[#1a1a2e]"
                  style={{
                    width: 64,
                    height: 64,
                    background:
                      "radial-gradient(circle at 40% 30%, #ff8888, #ef4444)",
                    boxShadow:
                      "0 6px 0 #1a1a2e, inset 0 -4px 0 rgba(0,0,0,0.2)",
                    transform: `rotate(${-15 + mouse.x * 3}deg) translateZ(15px)`,
                    transformStyle: "preserve-3d",
                    clipPath: "polygon(0 45%, 100% 45%, 100% 100%, 0 100%)",
                  }}
                >
                  <span className="mt-1">🍎</span>
                </div>
                {/* Bottom half */}
                <div
                  className="rounded-full flex items-center justify-center text-[2.5rem] border-[3px] border-[#1a1a2e] absolute top-0 left-0"
                  style={{
                    width: 64,
                    height: 64,
                    background:
                      "radial-gradient(circle at 40% 30%, #ffaaaa, #ef4444)",
                    boxShadow:
                      "0 6px 0 #1a1a2e, inset 0 -4px 0 rgba(0,0,0,0.2)",
                    transform: `rotate(${15 + mouse.x * 3}deg) translateZ(-5px)`,
                    transformStyle: "preserve-3d",
                    clipPath: "polygon(0 0%, 100% 0%, 100% 55%, 0 55%)",
                  }}
                >
                  <span className="-mt-1">🍎</span>
                </div>
                {/* Slice line glow */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[3px] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), rgba(255,215,0,0.8), transparent)",
                    boxShadow:
                      "0 0 12px rgba(255,255,255,0.5), 0 0 30px rgba(255,215,0,0.3)",
                    transform: "rotateZ(-5deg) translateZ(2px)",
                    animation: "slice-glow 1.5s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <div
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(25px)",
            }}
          >
            <p
              className="text-center"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.15em",
                fontWeight: 300,
              }}
            >
              <span className="text-[#ff6b35] font-bold">SLICED</span> right out
              of existence
            </p>
          </div>

          {/* Home button */}
          <button
            onClick={() => navigate("/")}
            onMouseEnter={() => setHoverBtn(true)}
            onMouseLeave={() => setHoverBtn(false)}
            className="relative px-12 py-4 font-extrabold tracking-[0.25em] text-white uppercase cursor-pointer overflow-hidden rounded-xl border-[3px] border-[#1a1a2e]"
            style={{
              fontSize: "1.1rem",
              background: hoverBtn
                ? "linear-gradient(135deg, #ff5555, #dd2222)"
                : "linear-gradient(135deg, #ff4444, #cc0000)",
              transform: hoverBtn
                ? "translateZ(50px) translateY(-2px) scale(1.03)"
                : "translateZ(50px)",
              boxShadow: hoverBtn
                ? "0 10px 0 #1a1a2e, 0 15px 40px rgba(255,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.3)"
                : "0 8px 0 #1a1a2e, 0 10px 30px rgba(255,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3)",
              transition: "all 0.15s ease",
              transformStyle: "preserve-3d",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform =
                "translateZ(50px) translateY(6px)";
              e.currentTarget.style.boxShadow =
                "0 2px 0 #1a1a2e, 0 5px 20px rgba(255,0,0,0.3)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform =
                "translateZ(50px) translateY(-2px) scale(1.03)";
              e.currentTarget.style.boxShadow =
                "0 10px 0 #1a1a2e, 0 15px 40px rgba(255,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.3)";
            }}
          >
            <span className="relative z-10">BACK TO SAFETY</span>
            <div
              className="absolute top-0 left-[-100%] w-3/5 h-full skew-x-[-20deg]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                animation: "shine-sweep 3s ease-in-out infinite",
              }}
            />
          </button>

          {/* Floating fruits */}
          <div
            className="flex items-center gap-3 mt-4"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(15px)",
              animation: "fruit-orbit 6s linear infinite",
              transformOrigin: "center center",
            }}
          >
            {FRUIT_TYPES.slice(0, 4).map((f, i) => (
              <span
                key={i}
                className="text-lg inline-block"
                style={{
                  animation: `small-float ${2 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                  filter: `drop-shadow(0 0 8px ${f.color}44)`,
                }}
              >
                {f.emoji}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes number-float {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-8px) rotateX(2deg); }
        }
        @keyframes fruit-sway {
          0%, 100% { transform: rotateY(-5deg) translateX(0px); }
          50% { transform: rotateY(5deg) translateX(5px); }
        }
        @keyframes slice-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes shard-drift {
          0% { transform: rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { transform: rotate(180deg); opacity: 0; }
        }
        @keyframes shard-twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes small-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(10deg); }
        }
        @keyframes fruit-orbit {
          0% { transform: rotateY(0deg) translateZ(15px); }
          100% { transform: rotateY(360deg) translateZ(15px); }
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
      `}</style>
    </div>
  );
}
