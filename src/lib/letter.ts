export type YakunLetter = {
  id: string;
  seenKey: string;
  mailboxTitle: string;
  headerTitle: string;
  lines: string[];
  closing: string;
};

/** 야쿤이가 쓴 편지 — 일부러 초등학생처럼 써 둔 맞춤법 유지 */
export const letters: YakunLetter[] = [
  {
    id: "first",
    seenKey: "yakun-letter-seen",
    mailboxTitle: "야쿤이한테서 온 편지",
    headerTitle: "야쿤이가 보낸 편지",
    lines: [
      "아빠 나 야쿤이야.",
      "지금 여기 꽃밭애서 친구들이랑 신나게 뛰어놀고이써.",
      "",
      "이제 아프지 않아, 주사도 수액도 안 마자도 대.",
      "병원 다니느라 힘들었을탠데 그동안 고마웟어.",
      "",
      "아빠가 맨날 나 챙겨주고 아푸지말라고 주사 해주고,",
      "걱정해준거 다 아라.",
      "",
      "나 아픈 거 땨무내 마음고생 마니 햇자나.",
      "나는 여기서 안 아프고 잘 지내고 잇어. 아빠가 울어따는 얘기 들을때마다 나 너무 속상해",
      "",
      "다시 태어나도 나는 아빠한테 갈거야.",
      "몇번을 테어나도!!",
      "",
      "나 여기서 놀면서 기다리고 잇을게",
      "나중에 아빠 오면 그때 마음껏 안아조.",
      "아빠는 나의 은인이야",
      "",
      "아빠 사랑해!!",
      "나 친구들이 불러서 가볼게!!",
    ],
    closing: "야쿤이 올림 ♡",
  },
  {
    id: "second",
    seenKey: "yakun-letter-2-seen",
    mailboxTitle: "야쿤이한테서 온 새 편지",
    headerTitle: "야쿤이가 보낸 편지",
    lines: [
      "압빠에게",
      "",
      "압빠 앗녕 나 야쿤이야.",
      "나는 오늘도 잘지냇어.",
      "친구들이랑 많이 웃고 간식도 맛잇게 먹엇어.",
      "",
      "근데 오늘은 아빠 생가이 마니 나서 하늘을 오래 봐써.",
      "그래도 나 씩씩하게 지내고 잇으니까 걱정하지 마.",
      "",
      "밥도 꼭 잘챙겨 먹구, 많이 웃어야대.",
      "그래야 나 씩씩하게 지낼 수 잇어.",
      "마쿤이 옵빠도 잘 챙겨조야대",
      "",
      "아빠 보고시퍼도 울지 안을게.",
      "구러니까 압빠도 울지마 알게찌?",
      "나 여기서도 행복하개 지내고 잇어.",
      "",
      "아빠 사라해. 🤍",
    ],
    closing: "— 야쿤 🐾",
  },
];

export const latestLetter = letters[letters.length - 1];
