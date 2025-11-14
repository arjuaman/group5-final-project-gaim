// lib/store.ts
// File-based store for brand kits (dev-friendly, no DB required)

import path from "path";
import { promises as fs } from "fs";
import { BrandKitFull } from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "brandkits");

async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {
    // ignore if exists / race
  }
}

export async function saveBrandKit(kit: BrandKitFull): Promise<void> {
  if (!kit.id) {
    throw new Error("BrandKit must have an id before saving.");
  }
  await ensureDir();
  const filePath = path.join(DATA_DIR, `${kit.id}.json`);
  await fs.writeFile(filePath, JSON.stringify(kit, null, 2), "utf8");
}

export async function getBrandKitById(id: string): Promise<BrandKitFull | null> {
  try {
    const filePath = path.join(DATA_DIR, `${id}.json`);
    const json = await fs.readFile(filePath, "utf8");
    return JSON.parse(json) as BrandKitFull;
  } catch {
    return null;
  }
}
