import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            Instantly Craft Your Unique Brand Identity with{" "}
            <span className="text-brand.primary">GenAI</span>.
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            From logos to campaigns, generate a complete brand kit in minutes –
            no design background required.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand.accent text-white font-medium shadow-soft hover:translate-y-0.5 transition"
          >
            Start Building Your Brand Kit
          </Link>
          <p className="mt-3 text-xs text-gray-500">
            Designed for busy founders, marketers, and solopreneurs.
          </p>
        </div>
        <div className="relative">
    <div className="relative rounded-3xl bg-white shadow-soft p-5 space-y-4 border border-brand-bgAlt">
      <div className="flex justify-between text-xs text-gray-500">
        <span>Live AI Preview</span>
        <span>Brand Kit</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <div className="h-10 rounded-lg bg-brand.primary" />
        <div className="h-10 rounded-lg bg-brand.accent" />
        <div className="h-10 rounded-lg bg-gray-800" />
        <div className="h-10 rounded-lg bg-gray-300" />
      </div>

      <div className="space-y-1 text-xs">
        <p className="font-heading text-sm text-gray-900">Your Business Name</p>
        <p className="text-gray-600">
          A consistent palette, font system, and logo concept tailored to your brand.
        </p>
      </div>
    </div>
  </div>
      </section>

      {/* How it works */}
      <section>
        <h2 className="font-heading text-2xl mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Input Your Vision",
              desc: "Answer a few guided questions about your business, audience, and values.",
            },
            {
              title: "GenAI Crafts Your Kit",
              desc: "Our AI blends strategy + design principles to craft a tailored brand system.",
            },
            {
              title: "Download & Deploy",
              desc: "Get logos, colors, typography, voice, and campaigns ready to go.",
            },
          ].map((s, idx) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl border border-brand.bgAlt p-5 shadow-sm"
            >
              <div className="w-9 h-9 rounded-full bg-brand.primary/10 flex items-center justify-center text-xs font-semibold text-brand.primary mb-3">
                {idx + 1}
              </div>
              <h3 className="font-heading text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="font-heading text-2xl mb-6">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Dynamic Color Palettes",
            "Curated Typography",
            "Multiple Logo Concepts",
            "AI-Driven Campaign Ideas",
            "Comprehensive Style Guides",
            "Ready-to-Use Mock-ups",
          ].map((feature) => (
            <div
              key={feature}
              className="bg-white rounded-2xl border border-brand.bgAlt p-5 flex flex-col gap-2"
            >
              <span className="text-brand.primary text-xs font-semibold uppercase tracking-wide">
                Feature
              </span>
              <h3 className="font-heading text-base">{feature}</h3>
              <p className="text-xs text-gray-600">
                Automatically generated to suit your industry, audience, and
                tone.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-white rounded-3xl border border-brand.bgAlt shadow-soft p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-heading text-2xl mb-4">Why Choose Us</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>• Save Time & Cost vs. agencies.</li>
              <li>• Professional Quality grounded in brand strategy.</li>
              <li>• Consistency Across Channels baked into your kit.</li>
              <li>• Empower Your Brand Story with clear voice + visuals.</li>
            </ul>
          </div>
          <div>
            <Link
              href="/generate"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand.accent text-white font-medium shadow-soft hover:translate-y-0.5 transition"
            >
              Start Building Your Brand Kit
            </Link>
            <p className="mt-3 text-xs text-gray-500">
              No credit card required to explore your first kit preview.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
