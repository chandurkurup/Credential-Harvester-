import { PhishingPage } from "@/components/pages/phishing-page";

export default function Home() {
  return (
    <main
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1552899423-74b8543a6502?q=80&w=1920&h=1080&fit=crop&auto=format')",
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-4">
        <PhishingPage />
      </div>
    </main>
  );
}
