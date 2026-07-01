export default function ScoreMenu({ score, highScore, onRestart, onHome }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-[300]">
      <div className="bg-[#141428] rounded-3xl p-8 w-[350px] border border-white/10">
        <h2 className="text-white text-3xl font-black text-center">Score</h2>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-white/60">Score</span>

            <span className="text-white font-bold">{score}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/60">High Score</span>

            <span className="text-yellow-400 font-bold">{highScore}</span>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onRestart}
            className="flex-1 bg-red-500 rounded-xl py-3 text-white font-bold"
          >
            Restart
          </button>

          <button
            onClick={onHome}
            className="flex-1 bg-slate-700 rounded-xl py-3 text-white font-bold"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
