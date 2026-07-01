export default function Particle({ particle }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: particle.x,
        top: particle.y,
        width: particle.size,
        height: particle.size,
        background: particle.color,
        opacity: Math.max(0, particle.life),
        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}88`,
        transform: "translate(-50%, -50%)",
        willChange: "transform, opacity",
      }}
    />
  );
}
