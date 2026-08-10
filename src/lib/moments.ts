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
  text: "퍼즐놀이 🧩",
  caption: "오늘 야쿤이와 다른 친구들은 야외활동을 나가기 싫어해서 실내에서 퍼즐 놀이를 하며 놀았어요. 야쿤이는 퍼즐을 처음 해보는 건데도 너무나 능숙하게 잘 맞추었답니다. 야쿤이 얼굴의 별모양 퍼즐 너무 귀엽지 않나요?ㅎㅎ 오늘 오전도 행복하게 시작했습니다 :)",
  fallback: "피아노와 야쿤",
  candidates: mediaCandidates("comfort"),
};

/** 알림장 둘째 페이지 — 오후 */
export const afternoonMoments: Moment[] = [
  {
    id: "rest",
    text: "장난감 정리🧸",
    caption: "오후에는 친구들과 신나게 놀고 난 뒤, 함께 장난감을 정리해 보았어요. 야쿤이는 친구들과 가지고 놀았던 장난감들을 하나씩 바구니에 담으며 열심히 정리를 도왔답니다. 정리도 솔선수범으로 하는 우리 야쿤이 너무 기특하고 예쁘지 않나요? ㅎㅎ 이게 다 보호자님이 교육해주신 덕분이에요. 야쿤이는 다른 강아지들한테서도 타의 모범이 되고 있답니다",
    fallback: "정리정돈 야쿤",
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
