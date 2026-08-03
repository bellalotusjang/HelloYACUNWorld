"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { FeedbackRow } from "@/lib/supabase";

const STORAGE_KEY = "yakun-admin-password";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<FeedbackRow[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPassword(saved);
      void loadItems(saved);
    }
  }, []);

  async function loadItems(pwd: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/feedback", {
        headers: { "x-admin-password": pwd },
      });
      const data = (await res.json()) as { items?: FeedbackRow[]; error?: string };
      if (!res.ok) {
        setAuthed(false);
        sessionStorage.removeItem(STORAGE_KEY);
        setError(data.error ?? "로그인에 실패했습니다.");
        return;
      }
      setItems(data.items ?? []);
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
    await loadItems(password.trim());
  }

  function handleLogout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setPassword("");
    setItems([]);
  }

  return (
    <main className="admin-page">
      <div className="admin-wrap">
        <header className="admin-header">
          <p className="admin-brand">야쿤이별</p>
          <h1>관리자 · 의견함</h1>
          <p className="admin-sub">남겨진 문의를 확인할 수 있어요.</p>
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
              <p>{items.length}건</p>
              <div className="admin-toolbar-actions">
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => loadItems(password)}
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

            {!loading && items.length === 0 && (
              <p className="admin-empty">아직 도착한 문의가 없어요.</p>
            )}

            <ul className="admin-cards">
              {items.map((item) => (
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
          </section>
        )}
      </div>
    </main>
  );
}
