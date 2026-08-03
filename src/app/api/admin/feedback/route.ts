import { NextResponse } from "next/server";
import { getServiceSupabase, isSupabaseConfigured } from "@/lib/supabase";

function unauthorized() {
  return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
}

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "문의함 저장소가 아직 연결되지 않았습니다." },
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
    .from("feedback")
    .select("id, topic, message, name, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "목록을 불러오지 못했습니다." }, { status: 500 });
  }

  return NextResponse.json({ items: data ?? [] });
}
