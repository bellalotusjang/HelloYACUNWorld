"use client";

import { useEffect, useRef, useState } from "react";
import { isVideoPath } from "@/lib/moments";

type MediaSlotProps = {
  candidates: string[];
  fallback: string;
  alt: string;
};

type ProbeResult =
  | { status: "loading" }
  | { status: "ready"; src: string; portrait: boolean }
  | { status: "empty" };

function probeFile(
  src: string,
): Promise<{ ok: false } | { ok: true; portrait: boolean }> {
  if (isVideoPath(src)) {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      const finish = (ok: boolean) => {
        const portrait = ok && video.videoHeight > video.videoWidth;
        video.removeAttribute("src");
        video.load();
        resolve(ok ? { ok: true, portrait } : { ok: false });
      };
      video.preload = "metadata";
      video.onloadedmetadata = () => finish(true);
      video.onerror = () => finish(false);
      video.src = src;
    });
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () =>
      resolve({ ok: true, portrait: img.naturalHeight > img.naturalWidth });
    img.onerror = () => resolve({ ok: false });
    img.src = src;
  });
}

export default function MediaSlot({ candidates, fallback, alt }: MediaSlotProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [probe, setProbe] = useState<ProbeResult>({ status: "loading" });
  const [broken, setBroken] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setBroken(false);
    setSoundOn(false);
    setProbe({ status: "loading" });

    async function resolve() {
      for (const candidate of candidates) {
        const result = await probeFile(candidate);
        if (cancelled) return;
        if (result.ok) {
          setProbe({
            status: "ready",
            src: candidate,
            portrait: result.portrait,
          });
          return;
        }
      }
      if (!cancelled) setProbe({ status: "empty" });
    }

    resolve();
    return () => {
      cancelled = true;
    };
  }, [candidates]);

  async function toggleSound() {
    const video = videoRef.current;
    if (!video) return;

    if (soundOn) {
      video.muted = true;
      setSoundOn(false);
      return;
    }

    video.muted = false;
    try {
      await video.play();
      setSoundOn(true);
    } catch {
      video.muted = true;
      setSoundOn(false);
    }
  }

  if (probe.status === "loading") {
    return (
      <div className="media-slot is-loading" role="status">
        <p>야쿤이의 순간을 불러오는 중…</p>
      </div>
    );
  }

  if (probe.status === "empty" || broken) {
    return (
      <div className="media-slot is-fallback">
        <div className="media-fallback-orb" aria-hidden="true" />
        <p>{fallback}</p>
      </div>
    );
  }

  const slotClass = `media-slot ${probe.portrait ? "is-portrait" : "is-landscape"}`;

  if (isVideoPath(probe.src)) {
    return (
      <div className={`${slotClass} hide-watermark`}>
        <video
          key={probe.src}
          ref={videoRef}
          className="media-frame"
          src={probe.src}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setBroken(true)}
          aria-label={alt}
        />
        <button
          type="button"
          className={`sound-btn ${soundOn ? "is-on" : ""}`}
          onClick={toggleSound}
          aria-pressed={soundOn}
          aria-label={soundOn ? "영상 소리 끄기" : "영상 소리 켜기"}
          title={soundOn ? "소리 끄기" : "소리 켜기"}
        >
          {soundOn ? "소리 켜짐" : "소리 켜기"}
        </button>
      </div>
    );
  }

  return (
    <div className={slotClass}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={probe.src}
        className="media-frame"
        src={probe.src}
        alt={alt}
        onError={() => setBroken(true)}
      />
    </div>
  );
}
