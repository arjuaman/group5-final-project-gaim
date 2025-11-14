// lib/aiBrandKit.ts
// Gemini-powered brand kit generation

import { randomUUID } from "crypto";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  BrandInputs,
  BrandKitPreview,
  BrandKitFull,
} from "./types";

if (!process.env.GEMINI_API_KEY) {
  console.error(
    "❌ GEMINI_API_KEY is not set. Add it to .env.local and restart the dev server."
  );
}

// This client will talk to https://generativelanguage.googleapis.com/v1beta
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Helper: call Gemini (gemini-pro) and force JSON-only output.
 */
async function callGeminiAsJson(systemInstruction: string, payload: unknown) {
  const model = genAI.getGenerativeModel({
    // ✅ This model is available on v1beta in all accounts
    model: "gemini-pro",
  });

  const prompt = `
You are a senior brand strategist and visual designer.

Return ONLY a single valid JSON object.
Do NOT include markdown, backticks, or any text before or after the JSON.

${systemInstruction}

BUSINESS INPUT:
${JSON.stringify(payload, null, 2)}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("❌ Failed to parse JSON from Gemini. Raw response:", text);
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
    { "role": "heading" | "body" | "accent", "name": string, "fallback": string, "sample": string }
  ],
  "logoPlaceholder": {
    "id": string,
    "title": string,
    "description": string,
    "rationale": string
  },
  "taglineSuggestions": string[]
}

Keep it concise and suitable as an initial preview of the brand direction.
`,
      { task: "preview", input }
    );

    return json as BrandKitPreview;
  } catch (err: any) {
    console.error("❌ generatePreview (Gemini) error:", err);
    throw new Error(
      err?.message || "Failed to generate preview using Gemini (gemini-pro)."
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
    { "role": "heading" | "body" | "accent", "name": string, "fallback": string, "sample": string }
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
Do NOT add any extra top-level fields.
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
        "Failed to generate full brand kit using Gemini (gemini-pro)."
    );
  }
}
