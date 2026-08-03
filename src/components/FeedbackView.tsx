"use client";

import { useState, type FormEvent } from "react";
import { curiosityTopics, type CuriosityTopicId } from "@/lib/site";

type FeedbackViewProps = {
  onBack: () => void;
};

type Status = "idle" | "sending" | "sent" | "error";

export default function FeedbackView({ onBack }: FeedbackViewProps) {
  const [topic, setTopic] = useState<CuriosityTopicId | "">("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!topic || !message.trim()) return;

    const topicLabel =
      curiosityTopics.find((item) => item.id === topic)?.label ?? topic;

    setStatus("sending");
    setErrorText("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topicLabel,
          message: message.trim(),
          name: name.trim() || "익명",
        }),
      });

      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? "전송 실패");
      }

      setStatus("sent");
      setMessage("");
      setName("");
      setTopic("");
    } catch (err) {
      setStatus("error");
      setErrorText(
        err instanceof Error
          ? err.message
          : "전달에 잠시 문제가 생겼어요. 조금 뒤 다시 시도해 주세요.",
      );
    }
  }

  return (
    <section className="view feedback-view" aria-label="야쿤이 의견함">
      <button type="button" className="back-btn" onClick={onBack}>
        ← 돌아가기
      </button>

      <article className="feedback-sheet">
        <header className="feedback-header">
          <p className="brand-mark soft">야쿤이별</p>
          <h2>의견함</h2>
          <p className="feedback-lead">
            야쿤이에 대해 더 궁금한 점이나, 전하고 싶은 마음이 있다면 남겨
            주세요. 관리자 페이지에서 확인할 수 있어요.
          </p>
        </header>

        {status === "sent" ? (
          <div className="feedback-done fade-in-slow">
            <p>마음을 남겨 주셔서 고마워요.</p>
            <p className="feedback-done-sub">
              소중히 읽고, 천천히 담아 둘게요.
            </p>
            <button type="button" className="letter-btn" onClick={onBack}>
              메인으로 돌아가기
            </button>
          </div>
        ) : (
          <form className="feedback-form" onSubmit={handleSubmit}>
            <fieldset className="topic-fieldset">
              <legend>어떤 게 더 궁금하신가요?</legend>
              <div className="topic-list">
                {curiosityTopics.map((item) => (
                  <label
                    key={item.id}
                    className={`topic-option ${topic === item.id ? "is-selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="topic"
                      value={item.id}
                      checked={topic === item.id}
                      onChange={() => setTopic(item.id)}
                      required
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="field">
              <span>남겨 주실 말씀</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                maxLength={800}
                placeholder="천천히, 편하게 적어 주셔도 괜찮아요."
                required
              />
            </label>

            <label className="field">
              <span>닉네임 (선택)</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                placeholder="익명으로 남겨도 돼요"
              />
            </label>

            {status === "error" && (
              <p className="feedback-error" role="alert">
                {errorText ||
                  "전달에 잠시 문제가 생겼어요. 조금 뒤 다시 시도해 주세요."}
              </p>
            )}

            <button
              type="submit"
              className="letter-btn feedback-submit"
              disabled={status === "sending" || !topic || !message.trim()}
            >
              {status === "sending" ? "전하는 중…" : "관리자에게 전하기"}
            </button>
          </form>
        )}
      </article>
    </section>
  );
}
