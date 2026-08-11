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
  text: "새싹놀이 🌱",
  caption: "오늘은 친구들과 함께 마당에 심어진 새싹을 돌보아 주었어요. 야쿤이는 선생님과 함께 새싹에 물을 조심조심 주며 잘 자라고 있는지 살펴보았답니다. 오늘은 야쿤이가 머리에 리본을 달아달라고 선생님에게 부탁했어요. 아빠가 예전에 예쁘게 묶어주시던 리본이라며, 아빠한테 예쁘게 보이고 싶다고 하더라구요. 리본을 하고 나니 야쿤이 외모가 더 빛나는 거 있죠? 🤍",
  fallback: "새싹과 야쿤",
  candidates: mediaCandidates("comfort"),
};

/** 알림장 둘째 페이지 — 오후 */
export const afternoonMoments: Moment[] = [
  {
    id: "rest",
    text: "피크닉 야쿤 🍪",
    caption: "오후에는 친구들과 함께 들판으로 피크닉을 다녀왔어요. 돗자리를 펴고 친구들과 나란히 모여 맛있는 간식도 나누어 먹고, 따뜻한 햇살 아래에서 여유로운 시간을 보냈답니다. 야쿤이는 맛있는 간식을 먹은 뒤 친구들과 꽃밭을 구경하며 즐거운 시간을 보냈어요. 🍪🌼",
    fallback: "피크닉 야쿤",
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
