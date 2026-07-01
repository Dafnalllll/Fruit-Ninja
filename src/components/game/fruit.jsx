export default function Fruit({ fruit }) {
  if (fruit.sliced) return null;

  return (
    <div
      className="absolute"
      style={{
        left: fruit.x,
        top: fruit.y,
        transformStyle: "preserve-3d",
        transform: `translate(-50%, -50%) rotate(${fruit.rotation}deg)
          translateZ(${fruit.zOffset + fruit.zSin}px)
          scale(${fruit.scale})`,
        transition: "none",
        willChange: "transform",
      }}
    >
      <div
        className="flex items-center justify-center rounded-full border-[3px] border-[#1a1a2e]"
        style={{
          width: fruit.radius * 2,
          height: fruit.radius * 2,
          background:
            fruit.name === "bomb"
              ? "radial-gradient(circle at 35% 35%, #555, #222)"
              : `radial-gradient(circle at 35% 35%, ${fruit.color}aa, ${fruit.color}66)`,

          boxShadow:
            fruit.name === "bomb"
              ? "0 0 15px rgba(255,50,0,0.3), 3px 3px 0 #1a1a2e"
              : `0 0 15px ${fruit.color}55, 4px 4px 0 #1a1a2e`,

          transformStyle: "preserve-3d",
        }}
      >
        <span
          className="drop-shadow-lg"
          style={{
            fontSize: fruit.radius * 1.1,
            transform: "translateZ(6px)",
          }}
        >
          {fruit.emoji}
        </span>
      </div>
    </div>
  );
}
