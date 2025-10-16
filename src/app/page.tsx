import { PhishingPage } from "@/components/pages/phishing-page";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-spreadsheet bg-cover bg-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-4">
        <PhishingPage />
      </div>
    </main>
  );
}
