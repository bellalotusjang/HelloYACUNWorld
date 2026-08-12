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
  text: "인형극과 야쿤🎭",
  caption: "오늘 오전에는 친구들과 함께 재미있는 인형극을 감상했어요. 야쿤이는 친구들과 나란히 앉아 선생님이 준비해 주신 인형극을 감상했어요. 재미있는 장면이 나올 때마다 귀를 쫑긋 세우고 무대를 바라보기도 하고, 친구들이 웃으면 함께 꼬리를 살랑살랑 흔들며 즐거워했답니다. 인형극이 끝난 뒤에는 친구들과 방금 본 이야기에 대해 도란도란 이야기를 나누며 즐거운 오전 시간을 보냈어요. 🎭🐾",
  fallback: "인형극과 야쿤",
  candidates: mediaCandidates("comfort"),
};

/** 알림장 둘째 페이지 — 오후 */
export const afternoonMoments: Moment[] = [
  {
    id: "rest",
    text: "무비나잇 야쿤🎥",
    caption: "오후에는 폭신한 쿠션에 편하게 앉아 맛있는 간식과 함께 친구들과 무비나잇 시간을 가졌어요. 야쿤이는 영화가 시작되자 친구들과 나란히 앉아 화면을 바라보며 집중해서 감상했답니다. 재미있는 장면이 나오면 친구들과 함께 즐겁게 웃기도 하고, 편안한 분위기 속에서 간식도 맛있게 먹으며 영화에 푹 빠져 있었어요. 🍿🐶",
    fallback: "무비나잇 야쿤",
    candidates: mediaCandidates("rest"),
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
