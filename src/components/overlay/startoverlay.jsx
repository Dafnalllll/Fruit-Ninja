export default function StartOverlay({ onStart }) {
  return (
    <div className="fixed inset-0 z-[199] flex items-center justify-center select-none pointer-events-none">
      <div
        className="flex flex-col items-center gap-6"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(60px)",
          animation: "title-float 4s ease-in-out infinite",
        }}
      >
        <span
          className="font-black tracking-[0.1em] uppercase text-white text-center"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            textShadow: "0 4px 0 #1a1a2e, 0 0 40px rgba(255,100,0,0.3)",
            filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.5))",
          }}
        >
          🥷 READY?
        </span>
        <button
          onClick={onStart}
          className="relative px-12 py-4 font-extrabold tracking-[0.25em] text-white uppercase cursor-pointer overflow-hidden rounded-xl border-[3px] border-[#1a1a2e] pointer-events-auto"
          style={{
            fontSize: "1.1rem",
            background: "linear-gradient(135deg, #ff4444, #cc0000)",
            transform: "translateZ(50px)",
            boxShadow: "0 8px 0 #1a1a2e, 0 10px 30px rgba(255,0,0,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateZ(50px) translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 10px 0 #1a1a2e, 0 15px 40px rgba(255,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateZ(50px)";
            e.currentTarget.style.boxShadow =
              "0 8px 0 #1a1a2e, 0 10px 30px rgba(255,0,0,0.3)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform =
              "translateZ(50px) translateY(6px)";
            e.currentTarget.style.boxShadow = "0 2px 0 #1a1a2e";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform =
              "translateZ(50px) translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 10px 0 #1a1a2e, 0 15px 40px rgba(255,0,0,0.4)";
          }}
        >
          <span className="relative z-10">⚔️ SLICE TO START</span>
          <div
            className="absolute top-0 left-[-100%] w-3/5 h-full skew-x-[-20deg]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              animation: "shine-sweep 3s ease-in-out infinite",
            }}
          />
        </button>
      </div>
    </div>
  );
}
