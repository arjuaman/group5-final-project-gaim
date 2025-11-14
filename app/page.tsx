// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-16 space-y-16">
      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
            Instantly Craft Your
            <span className="block">Unique Brand Identity</span>
            with GenAI.
          </h1>

          <p className="text-sm md:text-base text-slate-800 max-w-xl">
            From logos to campaigns, generate a complete brand kit in minutes –
            no design background required.
          </p>

          {/* PRIMARY CTA – now clearly a button */}
          <div className="flex flex-wrap gap-3 items-center">
            <Link href="/generate" className="btn">
              Start Building Your Brand Kit
            </Link>
            <span className="text-xs text-slate-700">
              Designed for busy founders, marketers, and solopreneurs.
            </span>
          </div>
        </div>

        {/* Right side: simple preview card */}
        <div className="flex justify-center md:justify-end">
          <div className="rounded-3xl bg-white border border-brand-bgAlt shadow-sm p-5 w-full max-w-md">
            <div className="flex justify-between text-[11px] text-slate-500 mb-3">
              <span>Live AI Preview</span>
              <span>Brand Kit</span>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="h-10 rounded-xl bg-slate-900" />
              <div className="h-10 rounded-xl bg-slate-500" />
              <div className="h-10 rounded-xl bg-slate-300" />
              <div className="h-10 rounded-xl bg-slate-100" />
            </div>

            <p className="font-heading text-sm mb-1">Your Business Name</p>
            <p className="text-xs text-slate-700">
              A consistent palette, font system, and logo concept tailored to
              your brand.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="space-y-6">
        <h2 className="font-heading text-2xl md:text-3xl">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Input Your Vision",
              desc: "Answer a few guided questions about your business, audience, and values.",
            },
            {
              title: "GenAI Crafts Your Kit",
              desc: "Our AI blends strategy and design principles to craft a tailored brand system.",
            },
            {
              title: "Download & Deploy",
              desc: "Get logos, colors, typography, voice, and campaigns ready to go.",
            },
          ].map((item, idx) => (
            <div
              key={item.title}
              className="bg-white rounded-3xl border border-slate-300 p-5 flex flex-col gap-3"
            >
              <div className="text-xs text-slate-500">{idx + 1}</div>
              <h3 className="font-heading text-base">{item.title}</h3>
              <p className="text-xs text-slate-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="space-y-6">
        <h2 className="font-heading text-2xl md:text-3xl">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Dynamic Color Palettes",
            "Curated Typography",
            "Multiple Logo Concepts",
            "AI-Driven Campaign Ideas",
            "Comprehensive Style Guides",
            "Social & Web Mockups",
          ].map((feature) => (
            <div
              key={feature}
              className="bg-white rounded-3xl border border-slate-200 p-4"
            >
              <h3 className="font-heading text-sm mb-1">{feature}</h3>
              <p className="text-[11px] text-slate-700">
                Generated to match your industry, audience, and personality.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
