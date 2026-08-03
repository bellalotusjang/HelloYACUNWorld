-- Supabase SQL Editor에서 이 내용을 실행하세요.

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  message text not null,
  name text not null default '익명',
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

-- 익명 사용자는 문의만 등록 가능
create policy "Anyone can insert feedback"
  on public.feedback
  for insert
  to anon, authenticated
  with check (true);

-- 조회는 서버(service role)만 사용하므로 별도 select 정책 없음
