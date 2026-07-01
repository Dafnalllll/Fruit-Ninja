export default function HUD({ score, comboText, lives }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] flex flex-wrap items-center justify-between gap-2 px-3 sm:px-6 py-3 sm:py-4 pointer-events-auto"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)",
      }}
    >
      {/* Score */}
      <div className="flex flex-col min-w-0">
        <span className="text-[0.5rem] sm:text-[0.6rem] text-white/40 uppercase tracking-[0.3em]">
          Score
        </span>

        <span
          className="text-2xl sm:text-3xl font-black text-white"
          style={{
            textShadow: "0 2px 0 #1a1a2e",
            filter: "drop-shadow(0 2px 8px rgba(255,0,0,0.2))",
            lineHeight: "1",
          }}
        >
          {score}
        </span>
      </div>

      {/* Combo */}
      {comboText && (
        <div
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full border-2 border-[#ffd700] text-center flex-grow-0"
          style={{
            background: "rgba(255,215,0,0.1)",
            animation: "combo-pulse 0.4s ease-out",
          }}
        >
          <span className="text-xs sm:text-sm">🔥</span>

          <span className="font-extrabold text-[#ffd700] text-xs sm:text-sm uppercase tracking-[0.05em] sm:tracking-[0.1em]">
            {comboText}
          </span>
        </div>
      )}

      {/* Lives */}
      <div className="flex items-center gap-1 ml-auto">
        <span className="text-[0.5rem] sm:text-[0.6rem] text-white/40 uppercase tracking-[0.2em] sm:tracking-[0.3em] mr-0.5 sm:mr-1">
          Lives
        </span>

        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            className="text-lg sm:text-xl transition-all duration-300"
            style={{
              opacity: i < lives ? 1 : 0.15,
              filter:
                i < lives ? "drop-shadow(0 0 6px rgba(255,68,68,0.5))" : "none",
              transform: i < lives ? "scale(1)" : "scale(0.8)",
            }}
          >
            ❤️
          </span>
        ))}
      </div>
    </div>
  );
}
