"use client";

import { useEffect, useRef, useState } from "react";

const AUDIO_CANDIDATES = [
  "/audio/bgm.mp3",
  "/audio/bgm.ogg",
  "/audio/bgm.wav",
  "/audio/bgm.m4a",
];

async function probeAudio(src: string): Promise<boolean> {
  try {
    const res = await fetch(src, { method: "HEAD" });
    if (res.ok) return true;
  } catch {
    // fall through to GET probe
  }

  try {
    const res = await fetch(src, { method: "GET", headers: { Range: "bytes=0-0" } });
    return res.ok;
  } catch {
    return false;
  }
}

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function findAudio() {
      for (const candidate of AUDIO_CANDIDATES) {
        const ok = await probeAudio(candidate);
        if (cancelled) return;
        if (ok) {
          setSrc(candidate);
          setAvailable(true);
          return;
        }
      }
      if (!cancelled) setAvailable(false);
    }

    findAudio();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!src) return;
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  if (!available) {
    return (
      <button
        type="button"
        className="music-toggle is-muted"
        title="배경음악 파일을 /public/audio/bgm.mp3 에 넣어주세요"
        aria-label="배경음악 없음"
        disabled
      >
        <MusicIcon muted />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`music-toggle ${playing ? "is-on" : ""}`}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "배경음악 끄기" : "배경음악 켜기"}
      title={playing ? "음악 끄기" : "음악 켜기"}
    >
      <MusicIcon muted={!playing} />
      <span className="music-label">{playing ? "음악 켜짐" : "음악"}</span>
    </button>
  );
}

function MusicIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3v10.55A3.5 3.5 0 1 0 13.5 17V7.5l5-1.2V4.2L12 3z"
        opacity={muted ? 0.55 : 1}
      />
      {muted && (
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          d="M4 4l16 16"
          opacity="0.7"
        />
      )}
    </svg>
  );
}
