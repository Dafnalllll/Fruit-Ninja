export default function Stats({ highScore = 0, gamesPlayed = 0, rank = "-" }) {
  return (
    <div
      className="flex items-center gap-6 px-8 py-4 rounded-2xl backdrop-blur-xl mt-2"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "2px solid rgba(255,255,255,0.1)",
        transform: "translateZ(20px)",
      }}
    >
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xl">🏆</span>
        <span className="text-[0.65rem] text-white/40 uppercase tracking-[0.1em]">
          High Score
        </span>
        <span className="text-lg font-bold text-white">
          {highScore.toLocaleString()}
        </span>
      </div>
      <div className="w-px h-10 bg-white/10" />
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xl">⚔️</span>
        <span className="text-[0.65rem] text-white/40 uppercase tracking-[0.1em]">
          Games Played
        </span>
        <span className="text-lg font-bold text-white">{gamesPlayed}</span>
      </div>
      <div className="w-px h-10 bg-white/10" />
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xl">🥷</span>
        <span className="text-[0.65rem] text-white/40 uppercase tracking-[0.1em]">
          Rank
        </span>
        <span className="text-lg font-bold text-white">#{rank}</span>
      </div>
    </div>
  );
}
