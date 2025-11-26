import React from "react";
import "./AnimatedTitle.css";

export default function AnimatedTitle({ text }) {
  const words = text.split(" ");

  return (
    <>
      <h1 className="dash-title animated-center">
        {words.map((word, i) => (
          <span
            key={i}
            style={{ animationDelay: `${0.3 * i}s` }} 
          >
            {word}
          </span>
        ))}
      </h1>
      <p className="dash-sub1">
        Discover events that match your vibe — anytime, anywhere.
      </p>
    </>
  );
}
