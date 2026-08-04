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
  text: "체험학습 갈 준비가 끝난 야쿤이에요. 아빠 이름이 적힌 목걸이를 하고싶다고 난리쳐서 급하게 만들어줬어요.",
  caption: "친구들중에서 가장 빨리 준비했어요. 빨리 나가자고 보채네요. 오늘은 양몰이 체험을 하러 다녀올게요",
  fallback: "꽃밭 사이로 커다란 꼬리가 스치듯 지나가요.",
  candidates: mediaCandidates("flower"),
};

/** 알림장 둘째 페이지 — 오후 */
export const afternoonMoments: Moment[] = [
  {
    id: "comfort",
    text: "오늘은 야쿤이한테서 도착한 편지가 있어요.",
    caption: "친구들이랑 놀다가도, 아빠에게 하고 싶은 말이 남아 있었나 봐요.",
    fallback: "야쿤이가 보낸 편지가 도착했어요.",
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
