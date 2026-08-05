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
  id: "comfort",
  text: "오늘은 새로운 친구들 환영식이 있었어요.",
  caption: "야외에서 다 같이 파티하며 재밌게 놀았어요. 야쿤이 많이 신났죠?",
  fallback: "새로운 친구들과 함께 파티하며 재밌게 놀았어요.",
  candidates: mediaCandidates("flower"),
};

/** 알림장 둘째 페이지 — 오후 */
export const afternoonMoments: Moment[] = [
  {
    id: "nap",
    text: "저녁되니 강아지별 날씨가 안 좋아졌어요.",
    caption: "야외일정을 취소하고 다 같이 라이언킹을 봤답니다. 야쿤이가 피곤했나봐요. 가운데에서 잠들었어요",
    fallback: "잠든 야쿤이 모습 귀엽지 않나요?ㅎㅎ",
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
