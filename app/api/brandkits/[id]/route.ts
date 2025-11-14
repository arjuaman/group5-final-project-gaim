import { NextRequest, NextResponse } from "next/server";
import { getBrandKitById } from "@/lib/store";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const kit = getBrandKitById(params.id);
  if (!kit) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(kit);
}
