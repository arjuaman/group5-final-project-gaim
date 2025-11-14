// app/api/brandkits/preview/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generatePreview } from "@/lib/aiBrandKit";
import { BrandInputs } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { input } = (await req.json()) as { input: BrandInputs };

    if (!input?.businessName || !input.offering) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const preview = await generatePreview(input);
    return NextResponse.json(preview);
  } catch (err: any) {
    console.error("Preview route error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
