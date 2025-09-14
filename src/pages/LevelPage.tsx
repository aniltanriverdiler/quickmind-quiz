import LevelSelection from "../components/LevelSelection";
import bgVideo from "../assets/color-smoke-14.mp4";

function LevelPage() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Background Video */}
      <video
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        src={bgVideo}
      />
      {/* Overlay for readability */}
      <div className="fixed inset-0 z-10 bg-gradient-to-b from-black/20 via-black/35 to-black/60" />
      {/* Content */}
      <div className="relative z-20 flex justify-center items-center min-h-screen">
        <LevelSelection />
      </div>
    </div>
  );
}

export default LevelPage;
