import { PhishingPage } from "@/components/pages/phishing-page";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const backgroundImage = PlaceHolderImages.find(p => p.id === 'login-background');

  const backgroundStyle = backgroundImage ? {
    backgroundImage: `url('${backgroundImage.imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <main className="relative min-h-screen w-full" style={backgroundStyle}>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-4">
        <PhishingPage />
      </div>
    </main>
  );
}
