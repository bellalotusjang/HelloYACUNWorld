"use client";

import { useEffect, useState } from "react";
import type { YakunLetter } from "@/lib/letter";

type LetterViewProps = {
  letter: YakunLetter;
  onBack: () => void;
};

export default function LetterView({ letter, onBack }: LetterViewProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [unfolded, setUnfolded] = useState(false);
  const done = visibleCount >= letter.lines.length;

  useEffect(() => {
    setVisibleCount(0);
    setUnfolded(false);
    const open = window.setTimeout(() => setUnfolded(true), 80);
    return () => window.clearTimeout(open);
  }, [letter.id]);

  useEffect(() => {
    if (!unfolded) return;
    if (visibleCount >= letter.lines.length) return;
    const line = letter.lines[visibleCount];
    const delay = line === "" ? 220 : 580;
    const timer = window.setTimeout(() => {
      setVisibleCount((n) => n + 1);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [letter.lines, unfolded, visibleCount]);

  return (
    <section className="view letter-view" aria-label={letter.headerTitle}>
      <button type="button" className="back-btn" onClick={onBack}>
        ← 뒤로가기
      </button>

      <article
        className={`letter-sheet letter-paper ${unfolded ? "is-open" : ""}`}
      >
        <header className="letter-header">
          <p className="brand-mark soft">야쿤이별</p>
          <h2>{letter.headerTitle}</h2>
        </header>

        <div className="letter-body" aria-live="polite">
          {letter.lines.slice(0, visibleCount).map((line, index) =>
            line === "" ? (
              <div key={`gap-${index}`} className="letter-gap" />
            ) : (
              <p key={`${index}-${line}`} className="letter-line kid-hand">
                {line}
              </p>
            ),
          )}
        </div>

        {done && (
          <footer className="letter-footer fade-in-slow">
            <p className="letter-closing kid-hand">{letter.closing}</p>
          </footer>
        )}
      </article>
    </section>
  );
}
