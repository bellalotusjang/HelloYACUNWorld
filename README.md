# 야쿤이별

반려견 야쿤이(래브라도 리트리버)를 기억하는 추모·위로 웹사이트입니다.

## 시작하기

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Vercel 배포

1. GitHub에 push
2. Vercel에서 프로젝트 Import
3. Environment Variables에 `.env.example` 값들을 등록
4. Deploy

> 예전처럼 `output: "export"` 정적만 쓰던 구조에서, 의견함 저장을 위해 Next.js API Route를 사용합니다.

## 의견함 + 관리자 페이지 (Supabase)

### 1) Supabase 프로젝트 만들기
1. [https://supabase.com](https://supabase.com) 가입/로그인
2. New Project 생성 (무료)
3. **SQL Editor**에서 `supabase/schema.sql` 내용 실행

### 2) API 키 복사
Project Settings → API 에서:
- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (비밀, 노출 금지)

### 3) 환경변수

로컬 `.env.local` / Vercel Environment Variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_PASSWORD=원하는비밀번호
```

### 4) 사용
- 사용자: 사이트 의견함에서 문의 작성
- 관리자: `https://내주소/admin` 접속 → 비밀번호 입력 → 목록 확인

## 미디어 교체

| 용도 | 경로 |
|------|------|
| 오전 | `public/media/flower/media.mp4` |
| 오후 | `public/media/comfort/media.mp4` |

문구는 `src/lib/moments.ts`에서 수정합니다.

## 페이지

1. 인트로
2. 알림장 (오전 → 다른 활동 보기 → 오후)
3. 의견함
4. 관리자 (`/admin`)
