import { NextRequest, NextResponse } from "next/server";
import { generatePreview } from "@/lib/aiBrandKit";
import { BrandInputs } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { input: BrandInputs };

    if (!body?.input?.businessName || !body?.input?.offering) {
      return NextResponse.json(
        { error: "Missing required fields: businessName, offering" },
        { status: 400 }
      );
    }

    const preview = await generatePreview(body.input);
    return NextResponse.json(preview, { status: 200 });
  } catch (err: any) {
    console.error("❌ Preview route (Groq) error:", err);
    return NextResponse.json(
      {
        error:
          err?.message ||
          "Failed to generate preview (Groq). Check server logs for details.",
      },
      { status: 500 }
    );
  }
}
