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
  text: "털실 야쿤🧶",
  caption: "오늘 오전에는 선생님과 함께 알록달록한 털실을 가지고 놀이했어요. 야쿤이는 여러 가지 색의 털실을 구경하다가 마음에 드는 색을 하나 골라 조심조심 만져보았답니다. 선생님과 함께 털실을 돌돌 말아 작은 공도 만들어 보고, 친구들과 서로의 털실 작품을 구경하며 즐거운 시간을 보냈어요. 🧶🐶",
  fallback: "털실 야쿤",
  candidates: mediaCandidates("comfort"),
};

/** 알림장 둘째 페이지 — 오후 */
export const afternoonMoments: Moment[] = [
  {
    id: "rest",
    text: "돌고래와 은하수 수영🐬",
    caption: "저녁에는 친구들과 함께 은하수 가득한 바다에서 수영을 즐겼어요. 바다 위로 작은 별빛들이 반짝이고, 물속에서는 귀여운 돌고래 친구들도 함께 헤엄치고 있었답니다. 야쿤이는 처음에는 신기한 듯 돌고래 친구들을 가만히 바라보다가, 돌고래가 가까이 다가오자 반갑게 인사를 나누며 함께 즐거운 시간을 보냈어요. 처음엔 수영을 무서워하다가 친구들이 재밌게 노는 거 보고 같이 풍덩 빠져들었답니다 ㅎㅎ 반짝이는 물결 사이로 돌고래와 함께 천천히 헤엄치기도 하고, 물 위에 비친 별빛을 바라보며 한참을 즐겼어요. 🌟🐬",
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
