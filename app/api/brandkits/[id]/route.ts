// app/api/brandkits/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getBrandKitById } from "@/lib/store";

// GET /api/brandkits/:id
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 👇 In Next 16, params is a Promise in route handlers – we must await it
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing brand kit id" },
        { status: 400 }
      );
    }

    const kit = await getBrandKitById(id);

    if (!kit) {
      return NextResponse.json({ error: "Brand kit not found" }, { status: 404 });
    }

    return NextResponse.json(kit, { status: 200 });
  } catch (err: any) {
    console.error("GET /api/brandkits/[id] error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to load brand kit" },
      { status: 500 }
    );
  }
}
