# 야쿤이별

반려견 야쿤이(래브라도 리트리버)를 기억하는 추모·위로 웹사이트입니다.

한 링크만으로 접속할 수 있고, 로그인 없이 누구나 볼 수 있습니다.

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어주세요.

## 정적 배포 (Vercel)

```bash
npm run build
```

빌드 결과물은 `out/` 폴더에 생성됩니다. Vercel에 이 저장소를 연결하면 자동으로 정적 사이트로 배포됩니다.

- Framework Preset: Next.js
- `next.config.ts`에 `output: "export"`가 설정되어 있습니다.

## 미디어 교체 방법

이미지·영상은 `/public/media/` 아래 폴더에 `media`라는 이름으로 넣으면 자동으로 불러옵니다.

| 상태 | 폴더 | 넣을 파일 예 |
|------|------|--------------|
| 꽃밭에서 뛰어놀기 | `public/media/flower/` | `media.jpg` 또는 `media.mp4` |
| 낮잠 | `public/media/nap/` | `media.jpg` |
| 산책 | `public/media/walk/` | `media.mp4` |
| 편하게 쉬기 | `public/media/rest/` | `media.webp` |
| 별빛 아래에서 | `public/media/comfort/` | `media.jpg` |

지원 확장자: `mp4`, `webm`, `mov`, `jpg`, `jpeg`, `png`, `webp`, `gif`

파일이 없거나 로딩에 실패하면 감성적인 대체 문구가 자연스럽게 표시됩니다.

### 배경음악 (선택)

```
public/audio/bgm.mp3
```

자동재생은 하지 않습니다. 우측 상단 버튼으로만 켤 수 있습니다.

### 알림장 문구

메인 화면은 「야쿤이의 하루 알림장」입니다.
오전/지금 문구와 영상 매핑은 `src/lib/moments.ts`에서 수정합니다.

## 편지 문구 수정

`src/lib/letter.ts` 파일에서 편지 내용을 수정할 수 있습니다.

## 페이지 구성

1. **인트로** — 환영 인사
2. **메인** — 야쿤이의 하루 알림장 (오전 / 지금 + 미디어)
3. **편지** — 야쿤이가 보낸 편지 (한 줄씩 나타남)
4. **의견함** — 야쿤이에 대해 궁금한 점을 남겨 관리자에게 전달

## 의견함 설정

1. `src/lib/site.ts` 의 `adminEmail` 을 본인 이메일로 변경하세요.
2. (권장) [Formspree](https://formspree.io)에서 폼을 만들고 `.env.local`에 추가하세요:

```bash
NEXT_PUBLIC_FORMSPREE_ID=your_form_id
```

Formspree ID가 없으면 사용자 메일 앱이 열려 관리자 메일로 내용이 전달됩니다.
