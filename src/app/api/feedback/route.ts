import { NextResponse } from "next/server";
import { getAnonSupabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "문의함 저장소가 아직 연결되지 않았습니다." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as {
      topic?: string;
      message?: string;
      name?: string;
    };

    const topic = body.topic?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const name = body.name?.trim() || "익명";

    if (!topic || !message) {
      return NextResponse.json(
        { error: "주제와 내용을 입력해 주세요." },
        { status: 400 },
      );
    }

    if (topic.length > 120 || message.length > 800 || name.length > 40) {
      return NextResponse.json({ error: "내용이 너무 깁니다." }, { status: 400 });
    }

    const supabase = getAnonSupabase();
    const { error } = await supabase.from("feedback").insert({
      topic,
      message,
      name,
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "저장에 실패했습니다." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "요청을 처리할 수 없습니다." }, { status: 400 });
  }
}
