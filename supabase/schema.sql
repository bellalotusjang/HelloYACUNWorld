-- Supabase SQL Editor에서 이 내용을 실행하세요.
-- 이미 feedback 테이블을 만든 경우, 아래 visits 부분만 추가로 실행해도 됩니다.

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  message text not null,
  name text not null default '익명',
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

-- 익명 사용자는 문의만 등록 가능
drop policy if exists "Anyone can insert feedback" on public.feedback;
create policy "Anyone can insert feedback"
  on public.feedback
  for insert
  to anon, authenticated
  with check (true);

-- 조회는 서버(service role)만 사용하므로 별도 select 정책 없음

-- 방문 기록 (관리자만 조회)
create table if not exists public.visits (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  path text not null default '/',
  created_at timestamptz not null default now()
);

create index if not exists visits_created_at_idx on public.visits (created_at desc);
create index if not exists visits_visitor_id_idx on public.visits (visitor_id);

alter table public.visits enable row level security;

drop policy if exists "Anyone can insert visits" on public.visits;
create policy "Anyone can insert visits"
  on public.visits
  for insert
  to anon, authenticated
  with check (true);

-- 방문 조회도 서버(service role)만 사용
