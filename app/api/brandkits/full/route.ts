// app/api/brandkits/full/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateFullKit } from "@/lib/aiBrandKit";
import { BrandInputs } from "@/lib/types";
import { saveBrandKit } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const { input } = (await req.json()) as { input: BrandInputs };

    const kit = await generateFullKit(input);
    saveBrandKit(kit);

    return NextResponse.json(kit);
  } catch (err: any) {
    console.error("Full kit route error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
