export default function Loading({ progress = null, text = "Loading..." }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-[999]">
      <div className="animate-spin rounded-full border-4 border-white/20 border-t-white h-12 w-12 mb-5" />

      <p className="text-white font-bold tracking-wider">{text}</p>

      {progress !== null && <p className="text-white/60 mt-2">{progress}%</p>}
    </div>
  );
}
