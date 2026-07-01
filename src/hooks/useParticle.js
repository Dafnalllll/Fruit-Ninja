import { useState, useEffect, useCallback } from "react";
export default function useParticles() {
  const [particles, setParticles] = useState([]);

  const spawn = useCallback((x, y, color, count = 12) => {
    const newP = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 80 + Math.random() * 180;
      newP.push({
        id: Math.random().toString(36).slice(2, 8),
        x,
        y,
        vx: Math.cos(angle) * speed * (0.5 + Math.random()),
        vy: Math.sin(angle) * speed * (0.5 + Math.random()) - 120,
        color,
        life: 1,
        size: 4 + Math.random() * 8,
        gravity: 350,
      });
    }
    setParticles((prev) => [...prev, ...newP]);
  }, []);

  useEffect(() => {
    let last = performance.now();
    let frame;
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx * dt,
            y: p.y + p.vy * dt,
            vy: p.vy + p.gravity * dt,
            life: p.life - dt * 1.8,
          }))
          .filter((p) => p.life > 0),
      );
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return { particles, spawn };
}
