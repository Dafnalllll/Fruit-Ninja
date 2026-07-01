import Fruit from "./fruit";

export default function GameScene({ fruits, mouse }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${mouse.y * 3}deg) rotateY(${mouse.x * 5}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {fruits.map((fruit) => (
        <Fruit key={fruit.id} fruit={fruit} />
      ))}
    </div>
  );
}
