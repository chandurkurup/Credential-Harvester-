export default function Home() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-black">
      <div className="fixed left-3 top-3 rounded-md bg-yellow-300 px-3 py-1.5 text-sm font-bold text-black shadow-lg">
        Simulated Phishing Example
      </div>
      <img
        src="https://storage.googleapis.com/fsm-build-artefacts/PhishingSampleAnalysis10June-1.jpg"
        alt="Phishing Screenshot Example"
        className="max-h-full max-w-full border-4 border-gray-700 shadow-2xl"
      />
    </div>
  );
}
