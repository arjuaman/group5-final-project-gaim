// app/test/page.tsx
"use client";

import { useEffect } from "react";

export default function TestPage() {
  useEffect(() => {
    async function runTest() {
      console.log("🔍 Starting Brand Kit test (Groq)…");

      const testInput = {
        businessName: "Starbucks Demo",
        offering: "Premium handcrafted coffee, beverages, and café experience.",
        industry: "Food & Beverage",
        scope: "Global",
        audienceDemographics:
          "Adults 18–45 in urban areas, students, professionals.",
        audiencePsychographics:
          "Brand-aware, socially conscious, seeking comfort and consistency.",
        audienceNeeds:
          "Third place between home and work, quality beverages, community.",
        brandValues:
          "Warmth, community, sustainability, craftsmanship, consistency.",
        brandTones:
          "Friendly, premium, welcoming, relaxed, uplifting.",
        differentiation:
          "Globally recognizable café experience with personalized drinks and ethical sourcing.",
      };

      // PREVIEW
      console.log("▶️ Testing /api/brandkits/preview (Groq)...");
      try {
        const res = await fetch("/api/brandkits/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: testInput }),
        });
        const data = await res.json();
        console.log("📡 Preview status:", res.status);
        console.log("📦 Preview body:", data);
      } catch (err) {
        console.error("❌ Preview fetch error:", err);
      }

      // FULL
      console.log("▶️ Testing /api/brandkits/full (Groq)...");
      try {
        const res = await fetch("/api/brandkits/full", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: testInput }),
        });
        const data = await res.json();
        console.log("📡 Full status:", res.status);
        console.log("📦 Full body:", data);
      } catch (err) {
        console.error("❌ Full fetch error:", err);
      }

      console.log("🧪 Groq test complete.");
    }

    runTest();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-3xl shadow-md border border-slate-200">
      <h1 className="text-xl font-semibold mb-2">Brand Kit API Test (Groq)</h1>
      <p className="text-sm text-slate-700 mb-3">
        This page automatically calls the preview and full brand kit endpoints
        using the Groq LLaMA 3.1 model. Open DevTools → Console to see results.
      </p>
    </div>
  );
}
