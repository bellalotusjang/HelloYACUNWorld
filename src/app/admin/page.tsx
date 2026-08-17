"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { FeedbackRow, VisitRow, VisitStats } from "@/lib/supabase";

const STORAGE_KEY = "yakun-admin-password";

type AdminTab = "visits" | "feedback";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<AdminTab>("visits");
  const [feedback, setFeedback] = useState<FeedbackRow[]>([]);
  const [visits, setVisits] = useState<VisitRow[]>([]);
  const [visitStats, setVisitStats] = useState<VisitStats>({
    total: 0,
    uniqueVisitors: 0,
    today: 0,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPassword(saved);
      void loadAll(saved);
    }
  }, []);

  async function loadAll(pwd: string) {
    setLoading(true);
    setError("");
    try {
      const headers = { "x-admin-password": pwd };
      const [feedbackRes, visitsRes] = await Promise.all([
        fetch("/api/admin/feedback", { headers }),
        fetch("/api/admin/visits", { headers }),
      ]);

      const feedbackData = (await feedbackRes.json()) as {
        items?: FeedbackRow[];
        error?: string;
      };
      const visitsData = (await visitsRes.json()) as {
        items?: VisitRow[];
        stats?: VisitStats;
        error?: string;
      };

      if (!feedbackRes.ok || !visitsRes.ok) {
        setAuthed(false);
        sessionStorage.removeItem(STORAGE_KEY);
        setError(
          feedbackData.error ??
            visitsData.error ??
            "로그인에 실패했습니다.",
        );
        return;
      }

      setFeedback(feedbackData.items ?? []);
      setVisits(visitsData.items ?? []);
      setVisitStats(
        visitsData.stats ?? { total: 0, uniqueVisitors: 0, today: 0 },
      );
      setAuthed(true);
      sessionStorage.setItem(STORAGE_KEY, pwd);
    } catch {
      setError("목록을 불러오지 못했습니다.");
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    await loadAll(password.trim());
  }

  function handleLogout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setPassword("");
    setFeedback([]);
    setVisits([]);
    setVisitStats({ total: 0, uniqueVisitors: 0, today: 0 });
  }

  return (
    <main className="admin-page">
      <div className="admin-wrap">
        <header className="admin-header">
          <p className="admin-brand">야쿤이별</p>
          <h1>관리자</h1>
          <p className="admin-sub">방문 기록과 의견함은 비밀번호 친 뒤에만 보여요.</p>
        </header>

        {!authed ? (
          <form className="admin-login" onSubmit={handleLogin}>
            <label className="field">
              <span>관리자 비밀번호</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                required
              />
            </label>
            {error && <p className="feedback-error">{error}</p>}
            <button type="submit" className="letter-btn" disabled={loading}>
              {loading ? "확인 중…" : "들어가기"}
            </button>
          </form>
        ) : (
          <section className="admin-list">
            <div className="admin-toolbar">
              <div className="admin-tabs">
                <button
                  type="button"
                  className={`admin-tab ${tab === "visits" ? "is-active" : ""}`}
                  onClick={() => setTab("visits")}
                >
                  방문
                </button>
                <button
                  type="button"
                  className={`admin-tab ${tab === "feedback" ? "is-active" : ""}`}
                  onClick={() => setTab("feedback")}
                >
                  의견함
                </button>
              </div>
              <div className="admin-toolbar-actions">
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => loadAll(password)}
                  disabled={loading}
                >
                  새로고침
                </button>
                <button type="button" className="ghost-btn" onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            </div>

            {loading && <p className="admin-empty">불러오는 중…</p>}

            {!loading && tab === "visits" && (
              <>
                <div className="admin-stats">
                  <div className="admin-stat">
                    <strong>{visitStats.today}</strong>
                    <span>오늘</span>
                  </div>
                  <div className="admin-stat">
                    <strong>{visitStats.uniqueVisitors}</strong>
                    <span>방문자(최근)</span>
                  </div>
                  <div className="admin-stat">
                    <strong>{visitStats.total}</strong>
                    <span>기록 수</span>
                  </div>
                </div>

                {visits.length === 0 ? (
                  <p className="admin-empty">아직 방문 기록이 없어요.</p>
                ) : (
                  <ul className="admin-cards">
                    {visits.map((item) => (
                      <li key={item.id} className="admin-card">
                        <div className="admin-card-meta">
                          <span>방문</span>
                          <time dateTime={item.created_at}>
                            {new Date(item.created_at).toLocaleString("ko-KR")}
                          </time>
                        </div>
                        <p className="admin-card-topic">
                          방문자 {item.visitor_id.slice(0, 8)}…
                        </p>
                        <p className="admin-card-message">{item.path}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {!loading && tab === "feedback" && (
              <>
                <p className="admin-section-count">{feedback.length}건</p>
                {feedback.length === 0 ? (
                  <p className="admin-empty">아직 도착한 문의가 없어요.</p>
                ) : (
                  <ul className="admin-cards">
                    {feedback.map((item) => (
                      <li key={item.id} className="admin-card">
                        <div className="admin-card-meta">
                          <span>{item.name}</span>
                          <time dateTime={item.created_at}>
                            {new Date(item.created_at).toLocaleString("ko-KR")}
                          </time>
                        </div>
                        <p className="admin-card-topic">{item.topic}</p>
                        <p className="admin-card-message">{item.message}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
