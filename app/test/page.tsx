// app/test/page.tsx
"use client";

import { useEffect } from "react";

export default function TestPage() {
  useEffect(() => {
    async function runTest() {
      console.log("🔍 Starting Brand Kit Gemini test...");

      const testInput = {
        businessName: "TestCo Labs",
        offering: "AI-driven analytics dashboard",
        industry: "Technology / SaaS",
        scope: "Global",
        audienceDemographics: "Mid-sized tech companies, age 25-45, global",
        audiencePsychographics:
          "Tech-forward, efficiency-focused, automation-friendly",
        audienceNeeds: "Automated insights, fast reporting, lower workload",
        brandValues: "Innovation, transparency, intelligence, simplicity",
        brandTones: "Energetic, smart, confident, helpful",
        differentiation:
          "Combining deep AI insights with real-time dashboards",
        visualStyle: "Bold",
        colorIntensity: "Vibrant",
      };

      // --- PREVIEW TEST ---
      console.log("▶️ Testing preview endpoint (Gemini)...");
      try {
        const res = await fetch("/api/brandkits/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: testInput }),
        });

        let data: any = null;
        try {
          data = await res.json();
        } catch {
          console.warn("Preview: response was not valid JSON.");
        }

        console.log("📡 Preview status:", res.status);
        console.log("📦 Preview body:", data);

        if (!res.ok) {
          console.error("❌ Preview API error:", data);
        } else {
          console.log("✅ Preview API (Gemini) succeeded.");
        }
      } catch (err) {
        console.error("❌ Preview fetch error:", err);
      }

      // --- FULL KIT TEST ---
      console.log("▶️ Testing full brand kit endpoint (Gemini)...");
      try {
        const res = await fetch("/api/brandkits/full", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: testInput }),
        });

        let data: any = null;
        try {
          data = await res.json();
        } catch {
          console.warn("Full kit: response was not valid JSON.");
        }

        console.log("📡 Full kit status:", res.status);
        console.log("📦 Full kit body:", data);

        if (!res.ok) {
          console.error("❌ Full API error:", data);
        } else {
          console.log("🎉 Successfully generated full kit (Gemini). ID:", data.id);
        }
      } catch (err) {
        console.error("❌ Full fetch error:", err);
      }

      console.log("🧪 Gemini test complete.");
    }

    runTest();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow-soft rounded-funky border border-brand-bgAlt">
      <h1 className="text-2xl font-heading font-semibold mb-2">
        Brand Kit Gemini Test
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        This page automatically calls the preview and full brand kit API
        endpoints with sample data and logs the results to the browser console.
      </p>

      <ol className="text-sm list-decimal ml-5 space-y-1">
        <li>Open DevTools → Console.</li>
        <li>Look for the lines starting with 📡 / 📦 / ❌ / 🎉.</li>
        <li>
          If you see an error mentioning <code>GEMINI_API_KEY</code> or
          authentication, fix your key in <code>.env.local</code>.
        </li>
      </ol>
    </div>
  );
}
