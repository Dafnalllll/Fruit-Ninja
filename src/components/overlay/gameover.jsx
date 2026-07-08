import { useNavigate } from "react-router-dom";

export default function GameOver({ score, highScore, onRestart }) {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        animation: "fade-in 0.3s ease-out",
      }}
    >
      <div
        className="relative flex flex-col items-center gap-4 px-10 py-10 rounded-3xl border-[3px] border-[#1a1a2e] text-center"
        style={{
          background: "linear-gradient(135deg, #1a0a2e, #0a0a1a)",
          boxShadow: "0 10px 0 #1a1a2e, 0 0 60px rgba(255,0,0,0.15)",
          transform: "rotateX(4deg)",
          perspective: "900px",
        }}
      >
        <span className="text-6xl mb-2">💥</span>

        <h2
          className="font-black tracking-[0.1em] uppercase text-white"
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            WebkitTextStroke: "2px #1a1a2e",
            textShadow: "0 4px 0 #1a1a2e",
          }}
        >
          Game Over
        </h2>

        <div
          className="flex flex-col items-center gap-1 mt-2 px-8 py-4 rounded-xl border-2 border-white/10"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <span className="text-white/50 text-xs uppercase tracking-[0.2em]">
            Score
          </span>
          <span
            className="font-black text-white"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              background: "linear-gradient(135deg, #ffd700, #ff6b35)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 2px 8px rgba(255,215,0,0.3))",
            }}
          >
            {score.toLocaleString()}
          </span>
        </div>

        {score >= highScore && score > 0 && (
          <div
            className="flex items-center gap-2 px-4 py-1 rounded-full"
            style={{
              background: "linear-gradient(135deg, #ffd700, #ff6b35)",
              border: "2px solid #1a1a2e",
              boxShadow: "0 0 20px rgba(255,215,0,0.3)",
            }}
          >
            <span className="text-sm">🏆</span>
            <span className="text-sm font-bold text-[#1a1a2e] uppercase tracking-[0.1em]">
              New High Score!
            </span>
            <span className="text-sm">🏆</span>
          </div>
        )}

        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={onRestart}
            className="relative px-8 py-3 font-extrabold tracking-[0.15em] text-white uppercase cursor-pointer rounded-xl border-[3px] border-[#1a1a2e] transition-all duration-100"
            style={{
              background: "linear-gradient(135deg, #ff4444, #cc0000)",
              boxShadow: "0 6px 0 #1a1a2e, 0 6px 20px rgba(255,0,0,0.3)",
              fontSize: "0.9rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 0 #1a1a2e, 0 10px 30px rgba(255,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow =
                "0 6px 0 #1a1a2e, 0 6px 20px rgba(255,0,0,0.3)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateY(4px)";
              e.currentTarget.style.boxShadow = "0 2px 0 #1a1a2e";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 0 #1a1a2e, 0 10px 30px rgba(255,0,0,0.4)";
            }}
          >
            🔄 Play Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="relative px-6 py-3 font-bold tracking-[0.15em] text-white uppercase cursor-pointer rounded-xl border-[3px] border-[#1a1a2e]"
            style={{
              background: "rgba(255,255,255,0.1)",
              boxShadow: "0 6px 0 #1a1a2e",
              fontSize: "0.85rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 0 #1a1a2e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "0 6px 0 #1a1a2e";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateY(4px)";
              e.currentTarget.style.boxShadow = "0 2px 0 #1a1a2e";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 0 #1a1a2e";
            }}
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}
