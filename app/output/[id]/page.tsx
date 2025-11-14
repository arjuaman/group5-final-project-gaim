"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { BrandKitFull } from "@/lib/types";

export default function OutputPage() {
  // ✅ Get the dynamic route segment from Next (client-side)
  const params = useParams<{ id?: string | string[] }>();

  // Normalise id to a simple string
  const idRaw = params?.id;
  const id =
    typeof idRaw === "string"
      ? idRaw
      : Array.isArray(idRaw)
      ? idRaw[0]
      : undefined;

  const [kit, setKit] = useState<BrandKitFull | null>(null);
  const [loading, setLoading] = useState(true);

  // Load the generated kit from sessionStorage
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      const key = `brandkit-${id}`;
      const stored = window.sessionStorage.getItem(key);

      console.log("[Output] reading brand kit with key:", key, "=>", !!stored);

      if (stored) {
        setKit(JSON.parse(stored) as BrandKitFull);
      } else {
        setKit(null);
      }
    } catch (err) {
      console.error("Failed to read brand kit from sessionStorage:", err);
      setKit(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 text-center">
        <h1 className="text-2xl font-heading mb-2 text-cyan-300">
          Preparing Your Brand Kit…
        </h1>
        <p className="text-sm text-slate-400">
          Please wait while we load your generated brand identity.
        </p>
      </div>
    );
  }

  if (!id || !kit) {
    return (
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 text-center">
        <h1 className="text-2xl font-heading mb-2 text-cyan-300">
          Brand Kit Not Found
        </h1>
        <p className="text-sm text-slate-400 mb-4">
          We couldn&apos;t find a brand kit for this session. This can happen
          if the browser was refreshed or opened in a new tab, or if session
          data was cleared.
        </p>
        <a href="/generate" className="btn">
          Generate a New Brand Kit
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14 space-y-8">
      {/* Top header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl mb-1 text-cyan-300">
            Your Complete Brand Kit for{" "}
            {kit.logoPlaceholder?.title || kit.id}
          </h1>
          <p className="text-xs text-slate-400">
            Generated on {new Date(kit.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="btn">Download Full Kit (mock)</button>
          <a
            href="/generate"
            className="btn !bg-white !text-orange-500 !border-orange-500 hover:!bg-orange-500 hover:!text-white"
          >
            Start a New Project
          </a>
        </div>
      </div>

      {/* Section 1: Core Visual Identity */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6">
        <h2 className="font-heading text-xl mb-2">Core Visual Identity</h2>

        {/* Colors */}
        <div>
          <h3 className="font-heading text-sm mb-2">Color Palette</h3>
          <div className="flex flex-wrap gap-4">
            {kit.colors?.map((c) => (
              <div
                key={c.hex + c.name}
                className="w-32 rounded-2xl border border-slate-200 overflow-hidden text-xs"
              >
                <div className="h-14" style={{ backgroundColor: c.hex }} />
                <div className="px-2 py-1">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-[10px] text-slate-600">{c.hex}</div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    {c.usage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fonts */}
        <div>
          <h3 className="font-heading text-sm mb-2">Typography</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {kit.fonts?.map((f) => (
              <div
                key={`${f.role}-${f.name}`}
                className="border border-slate-200 rounded-2xl p-3 text-xs"
              >
                <div className="font-heading text-slate-800 mb-1 capitalize">
                  {f.role} font
                </div>
                <div className="font-medium">{f.name}</div>
                <div className="text-[10px] text-slate-500 mb-1">
                  Fallback: {f.fallback}
                </div>
                <p className="mt-1 text-slate-700">{f.sample}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Verbal Identity */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-4">
        <h2 className="font-heading text-xl mb-2">Verbal Identity</h2>

        <div>
          <h3 className="font-heading text-sm mb-2">Tagline Options</h3>
          <ul className="list-disc list-inside text-sm text-slate-700">
            {kit.taglineSuggestions?.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm mb-2">Brand Voice</h3>
          <p className="text-sm text-slate-700">
            {kit.brandVoiceDescription}
          </p>
        </div>
      </section>

      {/* Section 3: Application & Guidance */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6">
        <h2 className="font-heading text-xl mb-2">
          Application & Implementation
        </h2>

        <div>
          <h3 className="font-heading text-sm mb-2">
            Social Media Mockup Ideas
          </h3>
          <ul className="list-disc list-inside text-sm text-slate-700">
            {kit.socialMockups?.map((m, i) => (
              <li key={i}>
                <span className="font-medium">{m.type}:</span>{" "}
                {m.description}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm mb-2">
            Marketing Collateral Suggestions
          </h3>
          <ul className="list-disc list-inside text-sm text-slate-700">
            {kit.collateralMockups?.map((m, i) => (
              <li key={i}>
                <span className="font-medium">{m.type}:</span>{" "}
                {m.description}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm mb-2">
            Recommended Channels
          </h3>
          <ul className="list-disc list-inside text-sm text-slate-700">
            {kit.recommendedChannels?.map((ch, i) => (
              <li key={i}>
                <span className="font-medium">{ch.channel}:</span>{" "}
                {ch.reason}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm mb-2">
            Potential Campaign Directions
          </h3>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {kit.campaignDirections?.map((c, i) => (
              <li key={i}>
                <div className="font-medium">{c.title}</div>
                <div className="text-xs">{c.concept}</div>
                <div className="text-xs text-slate-600">
                  Visuals: {c.suggestedVisuals}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm mb-2">Next Steps</h3>
          <ul className="list-disc list-inside text-sm text-slate-700">
            {kit.nextSteps?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
