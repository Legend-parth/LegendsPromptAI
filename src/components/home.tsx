import LandingPage from "./landing/LandingPage";

export default function Home() {
  return (
    <div
      className="w-screen min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #000000, #1e0b30, #0f0b36, #0a0d2a, #000000), radial-gradient(circle at top right, rgba(255, 215, 0, 0.15), transparent 50%), radial-gradient(circle at bottom left, rgba(138, 43, 226, 0.2), transparent 50%)",
      }}
    >
      <LandingPage />
    </div>
  );
}
