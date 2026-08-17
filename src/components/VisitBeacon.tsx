"use client";

import { useEffect } from "react";

const VISITOR_KEY = "yakun-visitor-id";
const SESSION_KEY = "yakun-visit-logged";

function getOrCreateVisitorId(): string {
  const existing = window.localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `v-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.localStorage.setItem(VISITOR_KEY, id);
  return id;
}

/** 사이트 진입 시 방문 1회 기록 (세션당 1번, 관리자만 조회 가능) */
export default function VisitBeacon() {
  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_KEY) === "1") return;

    const visitorId = getOrCreateVisitorId();
    window.sessionStorage.setItem(SESSION_KEY, "1");

    void fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId,
        path: window.location.pathname || "/",
      }),
      keepalive: true,
    }).catch(() => {
      // 기록 실패해도 사이트 이용에는 영향 없음
      window.sessionStorage.removeItem(SESSION_KEY);
    });
  }, []);

  return null;
}
