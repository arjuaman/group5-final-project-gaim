import { BrandKitFull } from "./types";

const store = new Map<string, BrandKitFull>();

export function saveBrandKit(kit: BrandKitFull) {
  store.set(kit.id, kit);
}

export function getBrandKit(id: string): BrandKitFull | undefined {
  return store.get(id);
}
