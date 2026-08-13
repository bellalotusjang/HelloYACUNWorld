"use client";

import { useEffect, useState } from "react";
import LetterView from "@/components/LetterView";
import MediaSlot from "@/components/MediaSlot";
import {
  captionParagraphs,
  morningMoment,
  pickAfternoonMoment,
  todayLabel,
  type Moment,
} from "@/lib/moments";

type Period = "morning" | "afternoon";

type MainViewProps = {
  onOpenFeedback: () => void;
  onBack: () => void;
};

const LETTER_SEEN_KEY = "yakun-letter-seen";

export default function MainView({
  onOpenFeedback,
  onBack,
}: MainViewProps) {
  const [period, setPeriod] = useState<Period>("morning");
  const [afternoon, setAfternoon] = useState<Moment>(() => pickAfternoonMoment());
  const [showLetterPopup, setShowLetterPopup] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [letterSeen, setLetterSeen] = useState(false);

  useEffect(() => {
    setLetterSeen(window.localStorage.getItem(LETTER_SEEN_KEY) === "1");
  }, []);

  const moment = period === "morning" ? morningMoment : afternoon;
  const label = period === "morning" ? "오전" : "오후";

  function goAfternoon() {
    setAfternoon((current) => pickAfternoonMoment(current.id));
    setPeriod("afternoon");
    if (!letterSeen) {
      setShowLetterPopup(true);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goMorning() {
    setPeriod("morning");
    setShowLetterPopup(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openLetter() {
    setShowLetterPopup(false);
    setShowLetter(true);
  }

  function closeLetter() {
    if (!letterSeen) {
      setLetterSeen(true);
      window.localStorage.setItem(LETTER_SEEN_KEY, "1");
    }
    setShowLetter(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (showLetter) {
    return <LetterView onBack={closeLetter} />;
  }

  return (
    <section className="main-view" aria-label="야쿤이의 하루 알림장">
      {showLetterPopup && period === "afternoon" && !letterSeen && (
        <div className="letter-popup-layer" role="dialog" aria-modal="true" aria-labelledby="letter-popup-title">
          <button
            type="button"
            className="letter-popup-card"
            onClick={openLetter}
          >
            <span className="letter-popup-badge" aria-hidden="true">
              이벤트
            </span>
            <p id="letter-popup-title" className="letter-popup-title">
              야쿤이한테서 도착한 편지가 있어요
            </p>
            <p className="letter-popup-hint">눌러서 편지를 열어보세요</p>
          </button>
          <button
            type="button"
            className="letter-popup-dismiss"
            onClick={() => setShowLetterPopup(false)}
          >
            나중에 볼게요
          </button>
        </div>
      )}

      <div className="diary-wrap">
        <button type="button" className="diary-back" onClick={onBack}>
          ← 뒤로가기
        </button>

        <article className="diary-sheet fade-in-slow" key={period}>
          <header className="diary-header">
            <p className="diary-brand">야쿤이별</p>
            <h2 className="diary-title">야쿤이의 하루 알림장</h2>
            <p className="diary-date">{todayLabel()}</p>
            <p className="diary-upload-note">알림장은 오후 9시에 업로드됩니다</p>
          </header>

          <section className="diary-section">
            <div className="diary-label">
              <span
                className={`diary-dot ${period === "afternoon" ? "is-now" : ""}`}
                aria-hidden="true"
              />
              {label}
            </div>
            <p className="diary-text">{moment.text}</p>

            <MediaSlot
              candidates={moment.candidates}
              fallback={moment.fallback}
              alt={`야쿤이 — ${moment.text}`}
            />

            <div className="diary-caption">
              {captionParagraphs(moment.caption).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <footer className="diary-footer">
            {period === "morning" ? (
              <>
                <p className="hint">오후의 야쿤이도 보고 싶다면</p>
                <button
                  type="button"
                  className="paw-btn"
                  onClick={goAfternoon}
                  aria-label="오후 활동 보기"
                >
                  <PawIcon />
                  <span>다른 활동 보기</span>
                </button>
              </>
            ) : (
              <>
                {!letterSeen && (
                  <>
                    <p className="hint">오늘은 야쿤이한테서 도착한 편지가 있어요</p>
                    <button
                      type="button"
                      className="paw-btn"
                      onClick={openLetter}
                      aria-label="야쿤이 편지 열어보기"
                    >
                      <PawIcon />
                      <span>편지 열어보기</span>
                    </button>
                  </>
                )}
                <button type="button" className="ghost-btn" onClick={goMorning}>
                  오전 알림장으로
                </button>
              </>
            )}

            <div className="action-links">
              <button
                type="button"
                className="ghost-btn"
                onClick={onOpenFeedback}
              >
                궁금한 점 남기기
              </button>
            </div>
          </footer>
        </article>

        {letterSeen && (
          <section className="mailbox fade-in-slow" aria-label="편지함">
            <p className="mailbox-label">편지함</p>
            <button
              type="button"
              className="mailbox-item"
              onClick={openLetter}
            >
              <span className="mailbox-item-title">야쿤이한테서 온 편지</span>
              <span className="mailbox-item-meta">다시 읽기</span>
            </button>
          </section>
        )}
      </div>
    </section>
  );
}

function PawIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <ellipse cx="7" cy="7.5" rx="2.2" ry="2.8" fill="currentColor" opacity="0.85" />
      <ellipse cx="12" cy="5.2" rx="2.2" ry="2.8" fill="currentColor" opacity="0.85" />
      <ellipse cx="17" cy="7.5" rx="2.2" ry="2.8" fill="currentColor" opacity="0.85" />
      <ellipse cx="9.2" cy="11.2" rx="1.6" ry="2" fill="currentColor" opacity="0.75" />
      <path
        fill="currentColor"
        d="M12 22c-3.4 0-5.8-2.2-5.8-4.8 0-2.2 1.7-3.7 3.4-4.4.5 1.2 1.4 2 2.4 2s1.9-.8 2.4-2c1.7.7 3.4 2.2 3.4 4.4C17.8 19.8 15.4 22 12 22z"
      />
    </svg>
  );
}
