export default function Button({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      className="relative px-12 py-4 font-extrabold tracking-[0.25em] text-white uppercase cursor-pointer overflow-hidden rounded-xl border-[3px] border-[#1a1a2e]"
      style={{
        fontSize: "1.1rem",
        background: "linear-gradient(135deg, #ff4444, #cc0000)",
        transform: "translateZ(50px)",
        boxShadow:
          "0 8px 0 #1a1a2e, 0 10px 30px rgba(255,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3)",
        transition: "all 0.1s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateZ(50px) translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 10px 0 #1a1a2e, 0 15px 40px rgba(255,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateZ(50px)";
        e.currentTarget.style.boxShadow =
          "0 8px 0 #1a1a2e, 0 10px 30px rgba(255,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3)";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "translateZ(50px) translateY(6px)";
        e.currentTarget.style.boxShadow =
          "0 2px 0 #1a1a2e, 0 5px 20px rgba(255,0,0,0.3)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "translateZ(50px) translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 10px 0 #1a1a2e, 0 15px 40px rgba(255,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.3)";
      }}
    >
      <span className="relative z-10">{children}</span>
      <div
        className="absolute top-0 left-[-100%] w-3/5 h-full skew-x-[-20deg]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          animation: "shine-sweep 3s ease-in-out infinite",
        }}
      />
    </button>
  );
}
