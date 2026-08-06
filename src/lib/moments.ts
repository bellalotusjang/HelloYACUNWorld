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
  text: "오늘은 구름 목욕하는 날이었어요☁️.",
  caption: "오늘은 모두 함께 구름 목욕탕에 다녀왔습니다. 야쿤이는 처음부터 끝까지 얌전히 목욕도 잘했고, 특히 따뜻한 거품을 무척 좋아했어요.",
  fallback: "오늘은 뽀득뽀득 씻는날",
  candidates: mediaCandidates("comfort"),
};

/** 알림장 둘째 페이지 — 오후 */
export const afternoonMoments: Moment[] = [
  {
    id: "rest",
    text: "저녁에는 친구들과 함께 언덕에 앉아 밤하늘의 별을 바라보는 시간을 가졌습니다.",
    caption: "다른 친구들이 별자리를 찾으며 즐겁게 이야기하는 동안, 야쿤이는 가장 밝게 빛나는 별을 한참 동안 바라보고 있었어요. 하늘을 향해 꼬리를 살랑살랑 흔드는 모습을 보니, 오늘은 아빠가 많이 보고 싶은가 봐요. 그래도 친구들과 함께 따뜻한 시간을 보내며 편안하게 하루를 마무리했습니다. 내일도 야쿤이가 행복한 하루를 보낼 수 있도록 저희가 곁에서 잘 돌보겠습니다. 🌙🤍",
    fallback: "아빠가 보고싶은 야쿤이",
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
