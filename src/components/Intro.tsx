"use client";

type IntroProps = {
  onEnter: () => void;
};

export default function Intro({ onEnter }: IntroProps) {
  return (
    <section className="intro-poster" aria-label="인트로" onClick={onEnter}>
      <div className="intro-poster-bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/intro-paw-hero.jpg"
          alt=""
          className="intro-poster-image"
        />
        <div className="intro-poster-veil" />
      </div>

      <div className="intro-poster-content">
        <p
          className="poster-guardian fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          야쿤이 보호자 · 홍석준
        </p>

        <h1 className="poster-title fade-up" style={{ animationDelay: "0.4s" }}>
          <span className="poster-line cream">야쿤이</span>
          <span className="poster-line brown">별✨</span>
        </h1>

        <p
          className="poster-welcome fade-up"
          style={{ animationDelay: "0.9s" }}
        >
          야쿤이 별에 오신 걸 환영해요. 강아지별에 있는 야쿤이의 하루가
          궁금하다면 아래 버튼을 클릭하세요
        </p>

        <button
          type="button"
          className="poster-enter fade-up"
          style={{ animationDelay: "1.2s" }}
          onClick={(e) => {
            e.stopPropagation();
            onEnter();
          }}
        >
          천천히 들어가기
        </button>
      </div>
    </section>
  );
}
