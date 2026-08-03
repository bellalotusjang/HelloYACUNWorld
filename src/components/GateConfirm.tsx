"use client";

type GateConfirmProps = {
  onConfirm: () => void;
  onDecline: () => void;
};

export default function GateConfirm({ onConfirm, onDecline }: GateConfirmProps) {
  return (
    <section className="gate-view" aria-label="보호자 확인" role="dialog" aria-modal="true">
      <div className="gate-card fade-in-slow">
        <p className="gate-brand">야쿤이별</p>
        <p className="gate-question">야쿤이 보호자 홍석준님 맞으신가요?</p>
        <div className="gate-actions">
          <button type="button" className="gate-yes" onClick={onConfirm}>
            예
          </button>
          <button type="button" className="gate-no" onClick={onDecline}>
            아니요
          </button>
        </div>
      </div>
    </section>
  );
}
