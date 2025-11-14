// app/api/brandkits/full/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateFullKit } from "@/lib/aiBrandKit";
import { BrandInputs } from "@/lib/types";
import { saveBrandKit } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { input: BrandInputs };

    if (!body?.input?.businessName || !body?.input?.offering) {
      return NextResponse.json(
        { error: "Missing required fields: businessName, offering" },
        { status: 400 }
      );
    }

    const kit = await generateFullKit(body.input);

    // ✅ persist to disk so /output/[id] can load it
    await saveBrandKit(kit);

    return NextResponse.json(kit, { status: 200 });
  } catch (err: any) {
    console.error("❌ Full brand kit route (Groq) error:", err);
    return NextResponse.json(
      {
        error:
          err?.message ||
          "Failed to generate full brand kit (Groq). Check server logs for details.",
      },
      { status: 500 }
    );
  }
}
