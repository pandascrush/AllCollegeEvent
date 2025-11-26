import React, { useEffect, useState, useRef } from "react";

export default function CardCarousel({ images = [], interval = 4500 }) {
  const n = images.length;
  const [centerIdx, setCenterIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCenterIdx((s) => (s + 1) % n);
    }, interval);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [n, interval]);

  const handleClick = (idx) => {
    setCenterIdx(idx);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCenterIdx((s) => (s + 1) % n);
    }, interval);
  };

  const getPosClass = (imgIdx) => {
    if (n === 1) return "pos-center";
    const diff = (imgIdx - centerIdx + n) % n;

    if (diff === 0) return "pos-center";
    if (diff === 1) return "pos-right";
    if (diff === 2) return "pos-right-far";
    if (diff === 3) return "pos-right-xfar";

    if (diff === n - 1) return "pos-left";
    if (diff === n - 2) return "pos-left-far";
    if (diff === n - 3) return "pos-left-xfar";

    return "pos-hidden";
  };

  return (
    <div className="card-carousel">
      <div className="cards-stage">
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`card-item ${getPosClass(idx)}`}
            onClick={() => handleClick(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleClick(idx);
            }}
          >
            <img src={src} alt={`poster-${idx}`} draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
