import { NextRequest, NextResponse } from "next/server";
import { getBrandKit } from "@/lib/store";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const kit = getBrandKit(params.id);
  if (!kit) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(kit);
}
