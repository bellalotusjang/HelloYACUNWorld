export type MomentId = "flower" | "nap" | "walk" | "rest" | "comfort";

export type Moment = {
  id: MomentId;
  text: string;
  caption: string;
  fallback: string;
  /** Tried in order until one loads. Place files as media.* in each folder. */
  candidates: string[];
};

const EXTENSIONS = ["mp4", "webm", "mov", "jpg", "jpeg", "png", "webp", "gif"] as const;

function mediaCandidates(id: MomentId): string[] {
  return EXTENSIONS.map((ext) => `/media/${id}/media.${ext}`);
}

/** 알림장 첫 페이지 — 오전 */
export const morningMoment: Moment = {
  id: "flower",
  text: "꽃밭에서 친구들이랑 신나게 뛰어놀았어요.",
  caption: "바람 냄새가 좋은가 봐요. 꼬리가 가만히 흔들려요.",
  fallback: "꽃밭 사이로 커다란 꼬리가 스치듯 지나가요.",
  candidates: mediaCandidates("flower"),
};

/** 알림장 둘째 페이지 — 오후 */
export const afternoonMoments: Moment[] = [
  {
    id: "comfort",
    text: "친구들이랑 함께 놀다가도 아빠를 생각하고 있어요.",
    caption: "멀리서도, 아빠가 밥도 안 먹고 슬퍼하는지 걱정하고 있어요. 아빠가 너무 슬퍼하지 않았으면 좋겠다고 하네요.",
    fallback: "아빠가 너무 슬퍼하지 않았으면 좋겠다고 하네요.",
    candidates: mediaCandidates("comfort"),
  },
];

export function pickAfternoonMoment(excludeId?: MomentId): Moment {
  const pool =
    excludeId && afternoonMoments.length > 1
      ? afternoonMoments.filter((m) => m.id !== excludeId)
      : afternoonMoments;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

export function isVideoPath(src: string): boolean {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(src);
}

export function todayLabel(date = new Date()): string {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${week[date.getDay()]})`;
}
