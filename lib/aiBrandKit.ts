// lib/aiBrandKit.ts
// Gemini (via @google/genai) powered brand kit generation

import { randomUUID } from "crypto";
import { GoogleGenAI } from "@google/genai";
import {
  BrandInputs,
  BrandKitPreview,
  BrandKitFull,
} from "./types";

// Log once if the key is missing (helps during dev)
if (!process.env.GEMINI_API_KEY) {
  console.error(
    "❌ GEMINI_API_KEY is not set. Add it to .env.local and restart the dev server."
  );
}

// New Google Gen AI SDK client (Gemini Developer API)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  // NOTE: no apiVersion override → uses the recommended beta/stable for this SDK
});

// Helper: call Gemini and force JSON-only output
async function callGeminiAsJson(systemInstruction: string, payload: unknown) {
  const prompt = `
You are a senior brand strategist and visual designer.

Return ONLY a single valid JSON object.
Do NOT include markdown, code fences, comments, or any text before or after the JSON.

${systemInstruction}

BUSINESS INPUT:
${JSON.stringify(payload, null, 2)}
`;

  const response = await ai.models.generateContent({
    // ✅ Current, supported text model
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("❌ Gemini returned non-JSON. Raw response:", text);
    throw new Error("Gemini did not return valid JSON. See server logs.");
  }
}

/**
 * Generate a lightweight preview (colors, fonts, logo placeholder, taglines)
 */
export async function generatePreview(
  input: BrandInputs
): Promise<BrandKitPreview> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error(
        "GEMINI_API_KEY is missing. Add it to .env.local and restart the dev server."
      );
    }

    const json = await callGeminiAsJson(
      `
EXPECTED JSON SHAPE:

{
  "colors": [
    { "name": string, "hex": string, "usage": string }
  ],
  "fonts": [
    {
      "role": "heading" | "body" | "accent",
      "name": string,
      "fallback": string,
      "sample": string
    }
  ],
  "logoPlaceholder": {
    "id": string,
    "title": string,
    "description": string,
    "rationale": string
  },
  "taglineSuggestions": string[]
}

Keep it concise and suitable as an initial brand preview.
`,
      { task: "preview", input }
    );

    return json as BrandKitPreview;
  } catch (err: any) {
    console.error("❌ generatePreview (Gemini) error:", err);
    throw new Error(
      err?.message ||
        "Failed to generate preview using Gemini (via @google/genai)."
    );
  }
}

/**
 * Generate the full brand kit (visual + verbal + applications)
 */
export async function generateFullKit(
  input: BrandInputs
): Promise<BrandKitFull> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error(
        "GEMINI_API_KEY is missing. Add it to .env.local and restart the dev server."
      );
    }

    const json = await callGeminiAsJson(
      `
EXPECTED JSON SHAPE:

{
  "colors": [
    { "name": string, "hex": string, "usage": string }
  ],
  "fonts": [
    {
      "role": "heading" | "body" | "accent",
      "name": string,
      "fallback": string,
      "sample": string
    }
  ],
  "logoPlaceholder": {
    "id": string,
    "title": string,
    "description": string,
    "rationale": string
  },
  "taglineSuggestions": string[],
  "brandVoiceDescription": string,
  "socialMockups": [
    { "type": string, "description": string }
  ],
  "collateralMockups": [
    { "type": string, "description": string }
  ],
  "websiteHeaderDescription": string,
  "recommendedChannels": [
    { "channel": string, "reason": string }
  ],
  "campaignDirections": [
    { "title": string, "concept": string, "suggestedVisuals": string }
  ],
  "nextSteps": string[]
}

All content must be tailored to the given business.
Use clear, professional wording.
Do NOT add extra top-level fields.
`,
      { task: "full_brand_kit", input }
    );

    const kit: BrandKitFull = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...json,
    };

    return kit;
  } catch (err: any) {
    console.error("❌ generateFullKit (Gemini) error:", err);
    throw new Error(
      err?.message ||
        "Failed to generate full brand kit using Gemini (via @google/genai)."
    );
  }
}
