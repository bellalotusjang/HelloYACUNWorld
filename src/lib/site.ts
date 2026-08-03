export const siteConfig = {
  /** 의견함 메일 수신 주소 — 본인 이메일로 바꿔주세요 */
  adminEmail: "bellalotusjang@gmail.com",
  /**
   * Formspree 폼 ID가 있으면 메일이 자동 전송됩니다.
   * https://formspree.io 에서 폼 생성 후 ID를 넣고,
   * .env.local 에 NEXT_PUBLIC_FORMSPREE_ID=xxxx 로 설정하세요.
   */
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
};

export const curiosityTopics = [
  { id: "treats", label: "야쿤이가 좋아하던 간식·장난감" },
  { id: "memories", label: "야쿤이와의 특별한 추억" },
  { id: "personality", label: "야쿤이의 성격·습관" },
  { id: "rainbow", label: "지금 야쿤이가 어떻게 지내는지" },
  { id: "comfort", label: "이별 후 마음을 나누고 싶어요" },
  { id: "other", label: "그 외 (직접 적을게요)" },
] as const;

export type CuriosityTopicId = (typeof curiosityTopics)[number]["id"];
