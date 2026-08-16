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
  text: "편지 야쿤💌",
  caption: "오늘 오전에는 친구들과 함께 소중한 사람에게 편지를 써 보는 시간을 가졌어요. 야쿤이는 하얀 편지지 앞에 한참 동안 앉아 곰곰이 생각하더니, 앞발로 조심조심 편지를 완성했답니다. 다 쓴 편지를 품에 꼭 안고 한참을 바라보는 모습이 참 사랑스러웠어요. 편지는 봉투에 곱게 담아 구름 우체통에 넣어두었어요. 선생님에게는 '이건 꼭 아빠한테 전해졌으면 좋겠어요.' 하고 환하게 웃으며 이야기해 주었답니다. 💌🐾",
  fallback: "편지 야쿤",
  candidates: mediaCandidates("comfort"),
};

/** 알림장 둘째 페이지 — 오후 */
export const afternoonMoments: Moment[] = [
  {
    id: "rest",
    text: "간식과 야쿤🍫",
    caption: "오후에는 선생님과 친구들 모두 함께 맛있는 간식을 만들어 보는 시간을 가졌어요. 오븐에서 달콤한 냄새가 퍼지자 귀를 쫑긋 세우고 기대하는 모습이 무척 귀여웠어요. 완성된 간식은 친구들과 함께 사이좋게 나누어 먹으며 즐거운 시간을 보냈어요. 야쿤이는 마지막 한 조각까지 야무지게 먹고는 뿌듯한 표정으로 꼬리를 살랑살랑 흔들어 주었답니다. 🍪🤍",
    fallback: "은하수와 야콩이",
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

/** 캡션을 문장 단위 단락으로 나눕니다. */
export function captionParagraphs(caption: string): string[] {
  return caption
    .trim()
    .split(/(?<=\.)\s+|(?<=ㅎㅎ)\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce<string[]>((paragraphs, part) => {
      const emojiOnly = /^[\p{Extended_Pictographic}\uFE0F\s]+$/u.test(part);
      if (emojiOnly && paragraphs.length > 0) {
        paragraphs[paragraphs.length - 1] += ` ${part}`;
        return paragraphs;
      }
      paragraphs.push(part);
      return paragraphs;
    }, []);
}

export function todayLabel(date = new Date()): string {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${week[date.getDay()]})`;
}
