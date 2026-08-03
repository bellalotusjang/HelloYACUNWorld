"use client";

import { useEffect, useState } from "react";
import { letterClosing, letterLines } from "@/lib/letter";

type LetterViewProps = {
  onBack: () => void;
};

export default function LetterView({ onBack }: LetterViewProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const done = visibleCount >= letterLines.length;

  useEffect(() => {
    if (visibleCount >= letterLines.length) return;
    const line = letterLines[visibleCount];
    const delay = line === "" ? 280 : 720;
    const timer = window.setTimeout(() => {
      setVisibleCount((n) => n + 1);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [visibleCount]);

  return (
    <section className="view letter-view" aria-label="야쿤이가 보낸 편지">
      <button type="button" className="back-btn" onClick={onBack}>
        ← 뒤로가기
      </button>

      <article className="letter-sheet">
        <header className="letter-header">
          <p className="brand-mark soft">야쿤이별</p>
          <h2>야쿤이가 보낸 편지</h2>
        </header>

        <div className="letter-body" aria-live="polite">
          {letterLines.slice(0, visibleCount).map((line, index) =>
            line === "" ? (
              <div key={`gap-${index}`} className="letter-gap" />
            ) : (
              <p
                key={`${index}-${line}`}
                className="letter-line"
                style={{ animationDelay: "0s" }}
              >
                {line}
              </p>
            ),
          )}
        </div>

        {done && (
          <footer className="letter-footer fade-in-slow">
            <p className="letter-closing">{letterClosing}</p>
            <p className="letter-warmth">
              당신의 하루가, 조금 더 따뜻해지기를.
            </p>
          </footer>
        )}
      </article>
    </section>
  );
}
