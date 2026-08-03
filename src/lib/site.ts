export const curiosityTopics = [
  { id: "treats", label: "야쿤이가 좋아하던 간식·장난감" },
  { id: "memories", label: "야쿤이와의 특별한 추억" },
  { id: "personality", label: "야쿤이의 성격·습관" },
  { id: "rainbow", label: "지금 야쿤이가 어떻게 지내는지" },
  { id: "comfort", label: "이별 후 마음을 나누고 싶어요" },
  { id: "other", label: "그 외 (직접 적을게요)" },
] as const;

export type CuriosityTopicId = (typeof curiosityTopics)[number]["id"];
