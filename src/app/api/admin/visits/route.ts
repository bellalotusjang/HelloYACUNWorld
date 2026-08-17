import { NextResponse } from "next/server";
import {
  getServiceSupabase,
  isSupabaseConfigured,
  type VisitRow,
  type VisitStats,
} from "@/lib/supabase";

function unauthorized() {
  return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
}

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "방문 기록 저장소가 아직 연결되지 않았습니다." },
      { status: 503 },
    );
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD 환경변수가 없습니다." },
      { status: 503 },
    );
  }

  const password = request.headers.get("x-admin-password") ?? "";
  if (password !== adminPassword) {
    return unauthorized();
  }

  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("visits")
    .select("id, visitor_id, path, created_at")
    .order("created_at", { ascending: false })
    .limit(300);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "목록을 불러오지 못했습니다." }, { status: 500 });
  }

  const items = (data ?? []) as VisitRow[];
  const unique = new Set(items.map((item) => item.visitor_id));
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const stats: VisitStats = {
    total: items.length,
    uniqueVisitors: unique.size,
    today: items.filter((item) => new Date(item.created_at) >= startOfToday).length,
  };

  return NextResponse.json({ items, stats });
}
