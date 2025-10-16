'use client';

export default function Home() {
  const imageUrl = "https://storage.googleapis.com/fsm-build-artefacts/PhishingSampleAnalysis10June-1.jpg";
  return (
    <img src={imageUrl} alt="Blurred screenshot" />
  );
}
