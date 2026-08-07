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
  text: "나비들과 낮잠자는 야쿤이🦋.",
  caption: "오늘은 친구들과 함께 큰 나무 아래에서 낮잠을 자는 시간을 가졌습니다. 점심을 맛있게 먹은 뒤 금세 잠든 야쿤이에요. 야쿤이는 잠을 자는 동안에도 편안한 표정을 지었고, 산들바람이 불 때마다 꼬리를 살짝살짝 흔드는 모습이 참 사랑스러웠어요. 푹 쉬고 일어난 뒤에는 기지개를 크게 켜고 친구들과 다시 즐겁게 뛰어놀며 오후 시간을 보냈습니다🤍",
  fallback: "나비들과 낮잠자는 야쿤이",
  candidates: mediaCandidates("comfort"),
};

/** 알림장 둘째 페이지 — 오후 */
export const afternoonMoments: Moment[] = [
  {
    id: "rest",
    text: "발도장 미술시간🎨🐾🤍",
    caption: "오늘은 친구들과 함께 발도장 미술활동을 했습니다. 알록달록한 별물감을 이용해 도화지 위에 예쁜 발자국을 하나씩 남겨 보았답니다. 야쿤이는 처음에는 앞발을 조심스럽게 내밀었지만, 금세 재미를 느끼며 여러 가지 색의 발도장을 꾹꾹 찍어 멋진 작품을 완성했습니다. 작품을 완성한 뒤에는 뿌듯한 표정으로 친구들의 그림도 구경하며 즐거운 시간을 보냈습니다. 오늘 야쿤이가 가장 마음에 들어 했던 발도장 그림은 소중히 보관해 두었습니다. 선생님에게 이 그림은 꼭 아빠에게 보여드리고 싶다고, 환하게 웃으며 이야기했답니다. 오늘도 야쿤이는 친구들과 함께 웃음 가득한 하루를 보냈습니다. 🤍🐾",
    fallback: "미술활동하는 야쿤이",
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
