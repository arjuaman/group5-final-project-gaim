"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { BrandKitFull } from "@/lib/types";

export default function OutputPage() {
  const params = useParams<{ id?: string | string[] }>();

  const idRaw = params?.id;
  const id =
    typeof idRaw === "string"
      ? idRaw
      : Array.isArray(idRaw)
      ? idRaw[0]
      : undefined;

  const [kit, setKit] = useState<BrandKitFull | null>(null);
  const [loading, setLoading] = useState(true);

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

        {/* Base logo concept */}
        <div className="border border-dashed border-slate-300 rounded-2xl p-4 text-xs text-slate-700">
          <p className="font-heading text-sm mb-1">
            Logo Concept Overview: {kit.logoPlaceholder?.title}
          </p>
          <p className="mb-1">{kit.logoPlaceholder?.description}</p>
          <p className="text-[11px] text-slate-500">
            Rationale: {kit.logoPlaceholder?.rationale}
          </p>
        </div>

        {/* Sample logos (two cards) */}
        {kit.sampleLogos?.length > 0 && (
          <div>
            <h3 className="font-heading text-sm mb-2">
              Sample Logo Directions
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {kit.sampleLogos.map((logo) => (
                <div
                  key={logo.id}
                  className="border border-slate-200 rounded-2xl p-4 text-xs"
                >
                  <div className="font-heading text-sm mb-1">
                    {logo.name}
                  </div>
                  <p className="mb-1">{logo.description}</p>
                  <p className="text-[11px] text-slate-500">
                    Rationale: {logo.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fonts */}
        <div>
          <h3 className="font-heading text-sm mb-2">Typography Tokens</h3>
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

        {/* Sample typography systems */}
        {kit.sampleTypographies?.length > 0 && (
          <div>
            <h3 className="font-heading text-sm mb-2">
              Sample Typography Systems
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {kit.sampleTypographies.map((t) => (
                <div
                  key={t.name}
                  className="border border-slate-200 rounded-2xl p-4 text-xs"
                >
                  <div className="font-heading text-sm mb-2">{t.name}</div>
                  <div className="mb-1">
                    <span className="font-semibold">Heading:</span>{" "}
                    {t.headingFont}
                  </div>
                  <div className="mb-1">
                    <span className="font-semibold">Body:</span>{" "}
                    {t.bodyFont}
                  </div>
                  {t.accentFont && (
                    <div className="mb-1">
                      <span className="font-semibold">Accent:</span>{" "}
                      {t.accentFont}
                    </div>
                  )}
                  <p className="text-[11px] text-slate-500 mb-1">
                    Usage: {t.usage}
                  </p>
                  <p className="mt-1 text-sm font-heading">
                    {t.sampleHeading}
                  </p>
                  <p className="mt-1 text-xs text-slate-700">
                    {t.sampleBody}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Section 2: Verbal Identity */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-4">
        <h2 className="font-heading text-xl mb-2">Verbal Identity</h2>

        {/* Taglines */}
        <div>
          <h3 className="font-heading text-sm mb-2">Tagline Options</h3>
          <ul className="list-disc list-inside text-sm text-slate-700">
            {kit.taglineSuggestions?.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        {/* Brand voice */}
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

        {/* Social mockups */}
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

        {/* Collateral */}
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

        {/* Recommended channels */}
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

        {/* Campaign directions */}
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

        {/* Sample posters */}
        {kit.samplePosters?.length > 0 && (
          <div>
            <h3 className="font-heading text-sm mb-2">
              Sample Poster / Flyer Concepts
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {kit.samplePosters.map((p) => (
                <div
                  key={p.title}
                  className="border border-slate-200 rounded-2xl p-4 text-xs"
                >
                  <div className="font-heading text-sm mb-1">
                    {p.title}
                  </div>
                  <p className="font-semibold text-sm mb-1">
                    {p.headline}
                  </p>
                  <p className="mb-1">{p.subheadline}</p>
                  <p className="text-[11px] text-slate-700 mb-1">
                    {p.description}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    CTA: {p.callToAction} • Placement: {p.placement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social post ideas: Twitter + Instagram */}
        {kit.socialPostIdeas?.length > 0 && (
          <div>
            <h3 className="font-heading text-sm mb-2">
              Sample Social Posts (Instagram & Twitter/X)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {kit.socialPostIdeas.map((sp, i) => (
                <div
                  key={i}
                  className="border border-slate-200 rounded-2xl p-4 text-xs"
                >
                  <div className="font-heading text-sm mb-1">
                    {sp.platform} – {sp.format}
                  </div>
                  <p className="italic mb-1">&quot;{sp.caption}&quot;</p>
                  <p className="text-[11px] text-slate-700 mb-1">
                    Visual idea: {sp.visualIdea}
                  </p>
                  <p className="text-[11px] text-slate-500 mb-1">
                    Hook: {sp.hook}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Call to action: {sp.callToAction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next steps */}
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
