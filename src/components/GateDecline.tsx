"use client";

type GateDeclineProps = {
  onRetry: () => void;
};

export default function GateDecline({ onRetry }: GateDeclineProps) {
  return (
    <section className="gate-view" aria-label="안내">
      <div className="gate-card fade-in-slow">
        <p className="gate-brand">야쿤이별</p>
        <p className="gate-question">괜찮아요. 천천히 준비되면 다시 와 주세요.</p>
        <div className="gate-actions">
          <button type="button" className="gate-yes" onClick={onRetry}>
            다시 확인하기
          </button>
        </div>
      </div>
    </section>
  );
}
