// lib/aiBrandKit.ts
// Brand kit generation using Groq (Llama 3.1 – 8B Instant)

import { randomUUID } from "crypto";
import Groq from "groq-sdk";
import {
  BrandInputs,
  BrandKitPreview,
  BrandKitFull,
} from "./types";

if (!process.env.GROQ_API_KEY) {
  console.error(
    "❌ GROQ_API_KEY is not set. Add it to .env.local and restart the dev server."
  );
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Helper: call Groq and force JSON-only output with prompt discipline
async function callGroqAsJson(systemInstruction: string, payload: unknown) {
  const completion = await groq.chat.completions.create({
    // ✅ Updated to a supported production model
    model: "llama-3.1-8b-instant",
    temperature: 0.8,
    max_tokens: 2048,
    messages: [
      {
        role: "system",
        content: `
You are a senior brand strategist and visual designer.

You MUST return ONLY a single valid JSON object.
NO markdown, NO backticks, NO explanations, NO comments.

${systemInstruction}
        `.trim(),
      },
      {
        role: "user",
        content: JSON.stringify(payload, null, 2),
      },
    ],
  });

  const text = completion.choices[0]?.message?.content?.trim() || "";

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("❌ Groq returned non-JSON. Raw response:", text);
    throw new Error(
      "Groq did not return valid JSON. Check the server logs for the raw response."
    );
  }
}

/**
 * Generate a lightweight preview: colors, fonts, logo placeholder, taglines.
 */
export async function generatePreview(
  input: BrandInputs
): Promise<BrandKitPreview> {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error(
        "GROQ_API_KEY is missing. Add it to .env.local and restart the dev server."
      );
    }

    const json = await callGroqAsJson(
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

Keep it concise and suitable as an initial brand direction preview.
      `,
      { task: "preview", input }
    );

    return json as BrandKitPreview;
  } catch (err: any) {
    console.error("❌ generatePreview (Groq) error:", err);
    throw new Error(
      err?.message ||
        "Failed to generate preview using Groq (llama-3.1-8b-instant)."
    );
  }
}

/**
 * Generate the full brand kit: visual + verbal + applications.
 */
export async function generateFullKit(
  input: BrandInputs
): Promise<BrandKitFull> {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error(
        "GROQ_API_KEY is missing. Add it to .env.local and restart the dev server."
      );
    }

    const json = await callGroqAsJson(
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
    console.error("❌ generateFullKit (Groq) error:", err);
    throw new Error(
      err?.message ||
        "Failed to generate full brand kit using Groq (llama-3.1-8b-instant)."
    );
  }
}
