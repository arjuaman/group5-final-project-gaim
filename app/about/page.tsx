"use client";

export default function AboutPage() {
  const team = [
    {
      name: "Arju Aman",
      tag: "Chief Chaos Coordinator",
      blurb:
        "Keeps the squad moving, the builds compiling, and the caffeine levels dangerously high. If this project feels coherent, Arju probably bullied it into shape.",
    },
    {
      name: "Deepayan Das",
      tag: "Resident Gamer & Latency Hater",
      blurb:
        "Thinks in APM and ping. When he’s not grinding ranks, he’s obsessed with squeezing every millisecond out of our GenAI pipeline.",
    },
    {
      name: "Lucy JK",
      tag: "Strategic Resource Optimizer",
      blurb:
        "Shows up exactly when the demo works, the slides are pretty, and the snacks are out. Somehow always ‘on break’ but has the sharpest feedback in the room.",
    },
    {
      name: "Yash Kamath",
      tag: "The Doc",
      blurb:
        "Owner of The Spreadsheet, The Notion, and The Documentation. If it’s not written down, it doesn’t exist. Keeps the team honest and the scope realistic.",
    },
    {
      name: "Shivam Gorbade",
      tag: "Certified Simp for Clean UI",
      blurb:
        "Will refactor a button hover state for 40 minutes if it moves one pixel smoother. Unironically in love with good typography and micro-interactions.",
    },
    {
      name: "Kipras",
      tag: "Resident Crabby Critic",
      blurb:
        "Professional devil’s advocate. If an idea survives Kipras’ roast session, it’s probably production-ready. Crabby outside, golden insight inside.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-12 md:py-16 space-y-10">
      <header className="space-y-3">
        <p className="text-xs tracking-[0.25em] uppercase text-orange-400">
          About the Team
        </p>
        <h1 className="font-heading text-3xl md:text-4xl text-cyan-300">
          The crew behind the GenAI Brand Kit
        </h1>
        <p className="text-sm md:text-base text-slate-300 max-w-2xl">
          We&apos;re a small, slightly unhinged team of builders, designers, and
          marketers who wanted to see how far GenAI can push brand building for
          real businesses, not just toy prompts.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-6 md:gap-8">
        {team.map((member) => (
          <div
            key={member.name}
            className="bg-[#050816] border border-slate-800 rounded-3xl px-5 py-5 md:px-6 md:py-6 shadow-[0_18px_45px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading text-lg text-slate-50">
                {member.name}
              </h2>
              <span className="text-[10px] md:text-xs px-3 py-1 rounded-full border border-orange-500/70 bg-orange-500/10 text-orange-300">
                {member.tag}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {member.blurb}
            </p>
          </div>
        ))}
      </section>

      <section className="bg-[#050816] border border-slate-800 rounded-3xl px-5 py-6 md:px-7 md:py-7 space-y-3 shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
        <h2 className="font-heading text-lg md:text-xl text-cyan-300">
          Why we built this
        </h2>
        <p className="text-sm text-slate-300">
          This project started as a Generative AI + Marketing experiment and
          quickly turned into a full brand-stack lab. We wanted to see if a
          small team could ship an experience that feels like a mini agency in
          your browser: strategy, visuals, copy, and campaign ideas generated in
          minutes.
        </p>
        <p className="text-sm text-slate-300">
          Under the hood, we&apos;re blending fast LLMs with structured brand
          thinking so founders, SMEs, and solopreneurs can go from idea to
          identity without begging a designer friend or burning a month on
          Figma. If this helps even one real business look a little more put
          together online, that&apos;s a win for us.
        </p>
      </section>
    </div>
  );
}
