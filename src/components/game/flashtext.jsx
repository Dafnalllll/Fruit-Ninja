export default function FlashText({
  text,
  color = "#ffffff",
  visible = true,
  style = {},
}) {
  if (!visible || !text) return null;

  return (
    <div
      className="absolute left-1/2 top-1/2 pointer-events-none z-50"
      style={{
        transform: "translate(-50%, -50%)",
        animation: "flash-text 600ms ease-out forwards",
        ...style,
      }}
    >
      <span
        className="font-black uppercase tracking-widest"
        style={{
          color,
          fontSize: "2rem",
          textShadow: "0 2px 8px rgba(0,0,0,.6)",
        }}
      >
        {text}
      </span>
    </div>
  );
}
