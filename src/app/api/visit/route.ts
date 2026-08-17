import { NextResponse } from "next/server";
import { getAnonSupabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, skipped: true });
  }

  try {
    const body = (await request.json()) as {
      visitorId?: string;
      path?: string;
    };

    const visitorId = body.visitorId?.trim() ?? "";
    const path = body.path?.trim() || "/";

    if (!visitorId || visitorId.length > 80) {
      return NextResponse.json({ error: "invalid visitor" }, { status: 400 });
    }

    if (path.length > 120) {
      return NextResponse.json({ error: "invalid path" }, { status: 400 });
    }

    const supabase = getAnonSupabase();
    const { error } = await supabase.from("visits").insert({
      visitor_id: visitorId,
      path,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "저장 실패" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "요청을 처리할 수 없습니다." }, { status: 400 });
  }
}
