import { useState, useEffect, useRef, useCallback } from "react";
import GameOver from "../components/overlay/gameover";
import StartOverlay from "../components/overlay/startoverlay";
import HUD from "../components/game/HUD";
import Particle from "../components/game/particle";
import useParticles from "../hooks/useParticle";
import { createFruit } from "../utils/fruitgenerator";
import { easeOutQuad } from "../utils/math";
import FlashText from "../components/game/flashtext";
import GameScene from "../components/game/gamescene";

export default function Play() {
  // Game state
  const [fruit, setFruits] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [combo, setCombo] = useState(0);
  const [flashText, setFlashText] = useState(null);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem("fn-highscore") || "0");
    } catch {
      return 0; /* fail silent */
    }
  });

  const { particles, spawn } = useParticles();

  // Slash trail
  const [slashPoints, setSlashPoints] = useState([]);
  const lastSliceTime = useRef(0);
  const comboTimeout = useRef(null);
  const spawnIntervalRef = useRef(null);
  const fruitsRef = useRef([]);

  // Mouse tracking for 3D parallax
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // ---- Spawn fruits ----
  const spawnFruits = useCallback(() => {
    const difficulty = 1 + score * 0.0003;
    const count = Math.min(2 + Math.floor(difficulty), 6);

    const newFruits = [];

    for (let i = 0; i < count; i++) {
      const fruit = createFruit();

      fruit.elapsed = i * 0.08 * Math.random();

      newFruits.push(fruit);
    }

    setFruits((prev) => {
      const combined = [...prev, ...newFruits];
      return combined.slice(-30);
    });
  }, [score]);

  // Start / restart
  const startGame = useCallback(() => {
    setStarted(true);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setFruits([]);
    setCombo(0);
    setFlashText(null);
    lastSliceTime.current = 0;
  }, []);

  // Spawn timer
  useEffect(() => {
    if (!started || gameOver) return;
    const timeout = setTimeout(() => {
      spawnFruits();
      spawnIntervalRef.current = setInterval(spawnFruits, 1800);
    }, 100);
    return () => {
      clearTimeout(timeout);
      clearInterval(spawnIntervalRef.current);
    };
  }, [started, gameOver, spawnFruits]);

  // ---- Physics update ----
  useEffect(() => {
    if (!started || gameOver) return;
    let last = performance.now();
    let frame;
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.04);
      last = now;

      setFruits((prev) => {
        const updated = [];
        for (const f of prev) {
          if (f.sliced) continue;
          const e = f.elapsed + dt;
          if (e > f.duration) continue;
          const t = e / f.duration;
          const et = easeOutQuad(t);
          const x = f.startX + (f.targetX - f.startX) * et;
          const parabola = -4 * f.peakY * t * (t - 1);
          const y = f.startY - parabola;
          const rotation = f.rotation + f.spinSpeed * dt;
          const zSin = Math.sin(e * 3) * 60;
          updated.push({
            ...f,
            x,
            y,
            elapsed: e,
            rotation,
            zSin,
          });
        }
        return updated;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, gameOver]);

  // Life loss detection
  useEffect(() => {
    if (!started || gameOver) return;
    const check = setInterval(() => {
      setFruits((prev) => {
        const missed = prev.filter((f) => !f.sliced && f.elapsed >= f.duration);
        if (missed.length > 0) {
          setLives((l) => {
            const next = l - missed.length;
            if (next <= 0) {
              setGameOver(true);
              if (score > highScore) {
                setHighScore(score);
                try {
                  localStorage.setItem("fn-highscore", String(score));
                } catch {
                  /* silent */
                }
              }
              return 0;
            }
            return next;
          });
        }
        return prev;
      });
    }, 100);
    return () => clearInterval(check);
  }, [started, gameOver, score, highScore]);

  useEffect(() => {
    fruitsRef.current = fruit;
  }, [fruit]);

  // ---- Slice detection ----
  const handleSlice = useCallback(
    (clientX, clientY) => {
      if (!started || gameOver) return;
      const now = Date.now();
      if (now - lastSliceTime.current < 50) return;
      lastSliceTime.current = now;

      setSlashPoints((prev) => [
        ...prev.slice(-15),
        { x: clientX, y: clientY, life: 1, id: now },
      ]);

      // ✅ Baca state sinkron dari ref — tidak masuk updater
      const slicedIds = new Set();
      let hitCount = 0;
      let bombHit = null;
      const fruitHits = [];

      for (const f of fruitsRef.current) {
        if (f.sliced || f.elapsed >= f.duration) continue;
        const dx = f.x - clientX;
        const dy = f.y - clientY;
        if (Math.sqrt(dx * dx + dy * dy) < f.radius * f.scale + 20) {
          hitCount++;
          slicedIds.add(f.id);
          if (f.name === "bomb") {
            bombHit = { x: f.x, y: f.y };
          } else {
            fruitHits.push({ x: f.x, y: f.y, color: f.color });
          }
        }
      }

      if (slicedIds.size === 0) return;

      // ✅ setFruits updater sekarang MURNI — tidak ada side effect
      setFruits((prev) =>
        prev.map((f) => (slicedIds.has(f.id) ? { ...f, sliced: true } : f)),
      );

      // ✅ Semua state update di LUAR updater → StrictMode aman → 1 bom = 1 nyawa
      if (bombHit) {
        setLives((l) => {
          const nextL = l - 1;
          if (nextL <= 0) {
            setGameOver(true);
            if (score > highScore) {
              setHighScore(score);
              try {
                localStorage.setItem("fn-highscore", String(score));
              } catch {
                /* silent */
              }
            }
            return 0;
          }
          return nextL;
        });
        setFlashText({ text: "💥 BOOM!", color: "#ff4444", key: now });
        spawn(bombHit.x, bombHit.y, "#ff4444", 20);
        spawn(bombHit.x, bombHit.y, "#ff8800", 15);
        setCombo(0);
      } else {
        fruitHits.forEach((f) => {
          const pts = 1 + Math.floor(combo * 0.5);
          setScore((s) => s + pts);
          spawn(f.x, f.y, f.color, 10);
        });
        if (hitCount >= 2) {
          const bonus = hitCount * 5;
          setScore((s) => s + bonus);
          setFlashText({
            text: `🔥 ${hitCount}x COMBO! +${bonus}`,
            color: "#ffd700",
            key: now,
          });
        }
        setCombo((c) => c + hitCount);
        clearTimeout(comboTimeout.current);
        comboTimeout.current = setTimeout(() => setCombo(0), 1200);
      }
    },
    [started, gameOver, combo, score, highScore, spawn],
  );

  // ---- Events ----
  useEffect(() => {
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
      handleSlice(e.clientX, e.clientY); // ← tambah ini
    };
    const onMouseDown = (e) => handleSlice(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) handleSlice(touch.clientX, touch.clientY);
    };
    const onTouchStart = (e) => {
      const touch = e.touches[0];
      if (touch) handleSlice(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
    };
  }, [handleSlice]);

  // Slash trail fade
  useEffect(() => {
    const interval = setInterval(() => {
      setSlashPoints((prev) =>
        prev
          .filter((p) => p.life > 0)
          .map((p) => ({ ...p, life: p.life - 0.04 })),
      );
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Flash text timer
  useEffect(() => {
    if (!flashText) return;
    const t = setTimeout(() => setFlashText(null), 1000);
    return () => clearTimeout(t);
  }, [flashText]);

  // Combo indicator
  const comboText = combo > 1 ? `${combo}x Combo` : null;

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden bg-[#0a0a1a] select-none"
      style={{
        perspective: "900px",
        perspectiveOrigin: `${50 + mouse.x * 10}% ${50 + mouse.y * 8}%`,
        cursor: "crosshair",
      }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(255,50,50,0.10) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 30%, rgba(255,150,0,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(200,50,255,0.06) 0%, transparent 50%),
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
            "radial-gradient(ellipse at 50% 50%, black 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, black 40%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Game scene */}
      <GameScene fruits={fruit} mouse={mouse} />

      {/* Particles */}
      {particles.map((p) => (
        <Particle key={p.id} particle={p} />
      ))}
      {/* Slash trail SVG */}
      <svg
        className="fixed inset-0 pointer-events-none z-50"
        width="100%"
        height="100%"
      >
        {slashPoints.map((p, i) => {
          if (i === 0) return null;
          const prev = slashPoints[i - 1];
          return (
            <line
              key={p.id}
              x1={prev.x}
              y1={prev.y}
              x2={p.x}
              y2={p.y}
              stroke={`rgba(200,220,255,${p.life * 0.5})`}
              strokeWidth={p.life * 5 + 1}
              strokeLinecap="round"
              style={{
                filter: `drop-shadow(0 0 6px rgba(150,180,255,${p.life * 0.4}))`,
              }}
            />
          );
        })}
      </svg>

      {/* HUD */}
      {started && !gameOver && (
        <HUD score={score} comboText={comboText} lives={lives} />
      )}

      {/* Start overlay */}
      {!started && <StartOverlay onStart={startGame} />}

      {/* Flash text (combo, bomb) */}
      {flashText && (
        <FlashText
          text={flashText.text}
          color={flashText.color}
          visible={Boolean(flashText)}
        />
      )}

      {/* Game over overlay */}
      {gameOver && (
        <GameOver score={score} highScore={highScore} onRestart={startGame} />
      )}

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes title-float {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-6px) rotateX(2deg); }
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
        @keyframes combo-pulse {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes flash-pop {
          0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
          20% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
          40% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) translateY(-60px); opacity: 0; }
        }
        @media (max-width: 640px) {
          .fruit-game { font-size: 0.8rem; }
        }
      `}</style>
    </div>
  );
}
