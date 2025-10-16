import { PhishingPage } from "@/components/pages/phishing-page";

export default function Home() {
  return (
    <main
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1604935293679-a41705d23b7b?q=80&w=1920&h=1080&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-4">
        <PhishingPage />
      </div>
    </main>
  );
}
