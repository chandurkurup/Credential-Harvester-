'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [radius, setRadius] = useState(6);
  const [scale, setScale] = useState(1);
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

  const handleToggleBlur = () => {
    setIsBlurred(!isBlurred);
  };

  const handleDownload = async () => {
    const img = imgRef.current;
    if (!img) return;

    try {
      if (!img.complete || img.naturalWidth === 0) {
        // A simple way to wait for image to load if it hasn't already.
        await new Promise((resolve, reject) => {
          if (img.complete) {
            resolve(true);
            return;
          }
          img.onload = resolve;
          img.onerror = () => reject(new Error('Image failed to load'));
        });
      }

      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.filter = `blur(${radius * scale}px)`;
      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob(blob => {
        if (!blob) {
          alert(
            'Unable to export image (browser restriction). Try a different browser or host the page on a server.'
          );
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `blurred-image-r${radius}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      alert('Error exporting image: ' + message);
    }
  };

  return (
    <>
      <div className="badge">Training — blurred image</div>
      <div className="wrap">
        <div style={{ marginBottom: '12px', color: '#ddd' }}>
          <strong>Instructions:</strong> Use the controls to adjust the blur and
          zoom. You can toggle the blur effect or export the result as a PNG file.
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

          <div className="controls" aria-hidden="false">
            <h2>Blur Controls</h2>

            <label htmlFor="radius">
              Blur radius (px): <span id="radiusValue">{radius}</span>
            </label>
            <input
              id="radius"
              type="range"
              min="0"
              max="40"
              step="1"
              value={radius}
              onChange={e => setRadius(Number(e.target.value))}
            />

            <label htmlFor="scale">Zoom (for export preview)</label>
            <input
              id="scale"
              type="range"
              min="0.5"
              max="2"
              step="0.05"
              value={scale}
              onChange={e => setScale(Number(e.target.value))}
            />

            <div className="row" style={{ marginTop: '14px' }}>
              <button onClick={handleToggleBlur} className="btn secondary">
                Toggle Blur ({isBlurred ? 'on' : 'off'})
              </button>
              <button onClick={handleDownload} className="btn">
                Download Blurred PNG
              </button>
            </div>

            <div className="small">
              Note: downloading uses an internal canvas. If you open this file via{' '}
              <code>file://</code> some browsers may restrict canvas download on
              local files — if that happens, host the page on an internal
              webserver.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
