import { BrandKitFull } from "@/lib/types";

async function fetchKit(id: string): Promise<BrandKitFull | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/brandkits/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function OutputPage({
  params,
}: {
  params: { id: string };
}) {
  const kit = await fetchKit(params.id);

  if (!kit) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="font-heading text-2xl mb-4">Brand Kit Not Found</h1>
        <p className="text-sm text-gray-600">
          The requested brand kit could not be found. Try generating a new one.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10 space-y-8">
      {/* Top header */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl mb-1">
            Your Complete Brand Kit for {kit.logoPlaceholder?.title || ""}
            {kit.logoPlaceholder?.title ? "" : kit.id.substring(0, 5)}
          </h1>
          <p className="text-sm text-gray-600">
            Generated on {new Date(kit.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-full bg-brand.primary text-white text-sm">
            Download Full Kit (PDF/ZIP)
          </button>
          <button className="px-4 py-2 rounded-full border border-brand.primary text-brand.primary text-sm">
            Share Link
          </button>
        </div>
      </section>

      {/* Section 1: Core visual identity */}
      <section className="bg-white rounded-3xl border border-brand.bgAlt shadow-soft p-6 space-y-6">
        <h2 className="font-heading text-xl">Core Visual Identity</h2>

        {/* Colors */}
        <div>
          <h3 className="font-heading text-sm mb-2">Color Palette</h3>
          <div className="grid sm:grid-cols-4 gap-3 text-xs">
            {kit.colors.map((c) => (
              <button
                key={c.name + c.hex}
                className="rounded-2xl overflow-hidden border border-brand.bgAlt text-left group"
                onClick={async () => {
                  await navigator.clipboard.writeText(c.hex);
                  alert(`Copied ${c.hex} to clipboard`);
                }}
              >
                <div
                  className="h-16"
                  style={{ backgroundColor: c.hex }}
                ></div>
                <div className="p-2 space-y-1">
                  <div className="font-semibold text-[11px]">{c.name}</div>
                  <div className="text-[11px] text-gray-600">{c.hex}</div>
                  <div className="text-[10px] text-gray-500">
                    {c.usage}
                  </div>
                  <div className="text-[10px] text-brand.primary opacity-0 group-hover:opacity-100 transition">
                    Click to copy HEX
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div>
          <h3 className="font-heading text-sm mb-2">Typography</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs">
            {kit.fonts.map((f) => (
              <div
                key={f.role + f.name}
                className="border border-brand.bgAlt rounded-2xl p-3 bg-brand.bgAlt/40"
              >
                <div className="text-[11px] uppercase text-gray-500 mb-1">
                  {f.role.toUpperCase()}
                </div>
                <div className="font-heading text-sm mb-1">{f.name}</div>
                <div className="text-[11px] text-gray-600 mb-2">
                  Fallback: {f.fallback}
                </div>
                <p className="text-[11px] text-gray-800">{f.sample}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Logos */}
        <div>
          <h3 className="font-heading text-sm mb-2">Logo Concepts</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs">
            {/* In a full build, you’d attach actual generated SVG/PNGs here. */}
            {[kit.logoPlaceholder].map((logo) => (
              <div
                key={logo.id}
                className="border border-brand.bgAlt rounded-2xl p-3 flex flex-col gap-2 bg-gradient-to-br from-brand.bgAlt to-white"
              >
                <div className="h-16 rounded-2xl border border-dashed border-brand.bgAlt flex items-center justify-center text-[11px] text-gray-500">
                  Logo preview placeholder
                </div>
                <div className="font-heading text-sm">{logo.title}</div>
                <p className="text-[11px] text-gray-700">
                  {logo.rationale}
                </p>
                <div className="flex gap-2 mt-auto">
                  <button className="px-3 py-1 rounded-full bg-brand.primary text-white text-[11px]">
                    Select as Primary
                  </button>
                  <button className="px-3 py-1 rounded-full border border-brand.primary text-brand.primary text-[11px]">
                    Request Variation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Verbal identity */}
      <section className="bg-white rounded-3xl border border-brand.bgAlt shadow-soft p-6 space-y-4">
        <h2 className="font-heading text-xl">Verbal Identity</h2>

        <div>
          <h3 className="font-heading text-sm mb-2">Tagline / Slogan Options</h3>
          <ul className="space-y-2 text-sm">
            {kit.taglineSuggestions.map((t) => (
              <li key={t} className="flex items-center justify-between gap-2">
                <span className="italic text-gray-800">“{t}”</span>
                <button
                  onClick={() => navigator.clipboard.writeText(t)}
                  className="text-[11px] text-brand.primary"
                >
                  Copy
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm mb-2">Brand Voice Description</h3>
          <p className="text-sm text-gray-700">{kit.brandVoiceDescription}</p>
        </div>
      </section>

      {/* Section 3: Applications & guidance */}
      <section className="bg-white rounded-3xl border border-brand.bgAlt shadow-soft p-6 space-y-6">
        <h2 className="font-heading text-xl">Application & Guidance</h2>

        {/* Social Mockups */}
        <div>
          <h3 className="font-heading text-sm mb-2">Social Media Mock-ups</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs">
            {kit.socialMockups.map((m, idx) => (
              <div
                key={idx}
                className="border border-brand.bgAlt rounded-2xl p-3 space-y-2"
              >
                <div className="h-24 rounded-xl bg-brand.bgAlt/70 flex items-center justify-center text-[11px] text-gray-500">
                  {m.type} visual placeholder
                </div>
                <p className="text-gray-700">{m.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Collateral */}
        <div>
          <h3 className="font-heading text-sm mb-2">Marketing Collateral</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs">
            {kit.collateralMockups.map((c, idx) => (
              <div
                key={idx}
                className="border border-brand.bgAlt rounded-2xl p-3 space-y-2"
              >
                <div className="h-20 rounded-xl bg-brand.bgAlt/70 flex items-center justify-center text-[11px] text-gray-500">
                  {c.type} mock-up
                </div>
                <p className="text-gray-700">{c.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Website header */}
        <div>
          <h3 className="font-heading text-sm mb-2">
            Website Header Mock-up (Description)
          </h3>
          <p className="text-sm text-gray-700">{kit.websiteHeaderDescription}</p>
        </div>

        {/* Channels */}
        <div>
          <h3 className="font-heading text-sm mb-2">
            Preferred Social Media Channels
          </h3>
          <ul className="space-y-2 text-sm">
            {kit.recommendedChannels.map((ch) => (
              <li key={ch.channel}>
                <span className="font-semibold">{ch.channel}: </span>
                <span className="text-gray-700">{ch.reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Campaigns */}
        <div>
          <h3 className="font-heading text-sm mb-2">
            Potential Campaign Directions
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs">
            {kit.campaignDirections.map((c) => (
              <div
                key={c.title}
                className="border border-brand.bgAlt rounded-2xl p-3 space-y-2"
              >
                <div className="font-heading text-sm">{c.title}</div>
                <p className="text-gray-700">{c.concept}</p>
                <p className="text-[11px] text-gray-500">
                  Visual cues: {c.suggestedVisuals}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Next steps */}
        <div>
          <h3 className="font-heading text-sm mb-2">Next Steps</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {kit.nextSteps.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3 pt-2 border-t border-brand.bgAlt mt-2">
          <button className="px-4 py-2 rounded-full bg-brand.primary text-white text-sm">
            Refine My Kit
          </button>
          <button className="px-4 py-2 rounded-full border border-brand.primary text-brand.primary text-sm">
            Start a New Project
          </button>
        </div>
      </section>
    </div>
  );
}
