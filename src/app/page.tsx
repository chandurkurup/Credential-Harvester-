'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [radius, setRadius] = useState(6);
  const [isBlurred, setIsBlurred] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const imageSrc =
    'https://storage.googleapis.com/fsm-build-artefacts/PhishingSampleAnalysis10June-1.jpg';

  const applyCssBlur = () => {
    if (imgRef.current) {
      imgRef.current.style.filter = isBlurred ? `blur(${radius}px)` : 'none';
    }
  };

  useEffect(() => {
    applyCssBlur();
  }, [radius, isBlurred]);

  return (
    <>
      <div className="badge">Training — blurred image</div>
      <div className="wrap">
        <div style={{ marginBottom: '12px', color: '#ddd' }}>
          <strong>Instructions:</strong> This is a simulated phishing example for training purposes.
        </div>

        <div className="viewer" role="region" aria-label="Image blur viewer">
          <div className="imgpane">
            <img
              ref={imgRef}
              id="mainImage"
              alt="Phishing screenshot"
              src={imageSrc}
              crossOrigin="anonymous" // Required for canvas operations on remote images
            />
          </div>
        </div>
      </div>
    </>
  );
}
