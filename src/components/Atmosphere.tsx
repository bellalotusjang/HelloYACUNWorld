"use client";

import { useEffect, useState } from "react";

type AtmosphereProps = {
  variant?: "stars" | "petals" | "both";
};

type Particle = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
};

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 9 + Math.random() * 10,
    size: 10 + Math.random() * 14,
    drift: -50 + Math.random() * 100,
  }));
}

export default function Atmosphere({ variant = "both" }: AtmosphereProps) {
  const [stars, setStars] = useState<Particle[]>([]);
  const [petals, setPetals] = useState<Particle[]>([]);

  useEffect(() => {
    setStars(makeParticles(28));
    setPetals(makeParticles(24));
  }, []);

  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere-wash" />
      {(variant === "stars" || variant === "both") &&
        stars.map((s) => (
          <span
            key={`star-${s.id}`}
            className="star"
            style={{
              left: `${s.left}%`,
              top: `${(s.id * 37) % 100}%`,
              width: s.size * 0.35,
              height: s.size * 0.35,
              animationDelay: `${s.delay}s`,
              animationDuration: `${2.5 + (s.id % 5) * 0.6}s`,
            }}
          />
        ))}
      {(variant === "petals" || variant === "both") &&
        petals.map((p) => (
          <span
            key={`petal-${p.id}`}
            className={`petal petal-tone-${p.id % 3}`}
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.35,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ["--drift" as string]: `${p.drift}px`,
              ["--spin" as string]: `${p.id % 2 === 0 ? 1 : -1}`,
            }}
          />
        ))}
    </div>
  );
}
