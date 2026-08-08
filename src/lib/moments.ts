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
  text: "동화책 낭독 시간📖",
  caption: "오늘 오전에는 선생님과 친구들 모두 함께 동화책 낭독 시간을 가졌어요.야쿤이는 친구들과 나란히 앉아 선생님이 들려주시는 동화 이야기를 아주 집중해서 들어주었답니다. 재미있는 장면이 나오자 귀를 쫑긋 세우고 책을 바라보기도 하고, 처음 듣는 동화책이 재밌었나봅니다 ㅎㅎ 오전부터 차분하고 즐거운 시간을 보내며 기분 좋게 하루를 시작했어요. 🐾🌼",
  fallback: "동화책 야쿤",
  candidates: mediaCandidates("comfort"),
};

/** 알림장 둘째 페이지 — 오후 */
export const afternoonMoments: Moment[] = [
  {
    id: "rest",
    text: "쿠키 만들기 시간🍪",
    caption: "오후에는 친구들과 함께 쿠키 만들기 시간을 가졌어요. 별 모양, 하트 모양 등 여러 가지 모양의 쿠키를 정성스럽게 만들고, 오븐에서 맛있는 냄새가 나기 시작하자 야쿤이도 꼬리를 살랑살랑 흔들며 무척 기대하는 모습을 보였어요. 완성된 쿠키를 친구들과 함께 나누어 먹으며 오후 시간도 즐겁게 보냈답니다. 오늘 만든 쿠키가 맛있었는지 야쿤이는 마지막 한 조각까지 야무지게 먹고는 무척 뿌듯한 표정으로 웃어주었답니다. 🤍🍪",
    fallback: "쿠키 야쿤",
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
