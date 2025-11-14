"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type GeographicScope = "Local" | "National" | "Global";

interface BrandInputs {
  businessName: string;
  offering: string;
  industry: string;
  scope: GeographicScope;
  audienceDemographics: string;
  audiencePsychographics: string;
  audienceNeeds: string;
  brandValues: string;
  brandTones: string;
  differentiation: string;
}

export default function GeneratePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loadingFull, setLoadingFull] = useState(false);
  const [inputs, setInputs] = useState<BrandInputs>({
    businessName: "",
    offering: "",
    industry: "",
    scope: "National",
    audienceDemographics: "",
    audiencePsychographics: "",
    audienceNeeds: "",
    brandValues: "",
    brandTones: "",
    differentiation: "",
  });

  const totalSteps = 4;

  const handleChange =
    (field: keyof BrandInputs) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setInputs((prev) => ({ ...prev, [field]: value }));
    };

  const handleScopeClick = (scope: GeographicScope) => {
    setInputs((prev) => ({ ...prev, scope }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      // On first step, go back to previous page (usually home)
      router.back();
    } else {
      setStep((s) => s - 1);
    }
  };

  const handleGenerateFull = async () => {
    if (step < totalSteps) return;
    setLoadingFull(true);
    try {
      const res = await fetch("/api/brandkits/full", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: inputs }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Full API error:", data);
        alert(data?.error || "Failed to generate full brand kit.");
        return;
      }

      router.push(`/output/${data.id}`);
    } catch (err) {
      console.error("Full fetch error:", err);
      alert("Error generating full brand kit. Please try again.");
    } finally {
      setLoadingFull(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14 space-y-6">
      <h1 className="font-heading text-2xl md:text-3xl mb-1 text-cyan-300">
        Brand Kit Generator
      </h1>
      <p className="text-sm text-slate-400 mb-6">
        Answer a few questions and let GenAI build your brand identity kit.
      </p>

      <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1.7fr)] gap-6">
        {/* LEFT: FORM CARD */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-5">
          {/* Progress header */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>
              {step === 1 && "Basics"}
              {step === 2 && "Audience"}
              {step === 3 && "Values & Tone"}
              {step === 4 && "Review"}
            </span>
          </div>

          {/* Steps content */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-heading text-lg text-sky-500">Step 1: Basics</h2>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">
                  Business Name * ?
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  placeholder='E.g., "Canteen on Campus"'
                  value={inputs.businessName}
                  onChange={handleChange("businessName")}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">
                  Core Offering / Product / Service * ?
                </label>
                <textarea
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm min-h-[70px]"
                  value={inputs.offering}
                  onChange={handleChange("offering")}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">
                  Industry / Sector * ?
                </label>
                <select
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={inputs.industry}
                  onChange={handleChange("industry")}
                >
                  <option value="">Select industry...</option>
                  <option>Food & Beverage</option>
                  <option>Technology / SaaS</option>
                  <option>Retail & E-commerce</option>
                  <option>Services</option>
                  <option>Education</option>
                  <option>Health & Wellness</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-700">
                  Geographic Scope
                </label>
                <div className="flex flex-wrap gap-3">
                  {(["Local", "National", "Global"] as GeographicScope[]).map((scope) => (
                    <button
                      key={scope}
                      type="button"
                      onClick={() => handleScopeClick(scope)}
                      className={
                        "btn !px-5 !py-2 !rounded-full shadow-md " +
                        (inputs.scope === scope
                          ? ""
                          : "!bg-white !text-orange-500 !shadow-none")
                      }
                    >
                      {scope}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-heading text-lg text-sky-500">
                Step 2: Audience
              </h2>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">
                  Target Audience Demographics
                </label>
                <textarea
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm min-h-[70px]"
                  placeholder='E.g., "College students, age 18–24"'
                  value={inputs.audienceDemographics}
                  onChange={handleChange("audienceDemographics")}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">
                  Target Audience Psychographics
                </label>
                <textarea
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm min-h-[70px]"
                  placeholder='E.g., "Health-conscious, budget-aware, seeking comfort food"'
                  value={inputs.audiencePsychographics}
                  onChange={handleChange("audiencePsychographics")}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">
                  Needs / Pain Points Addressed
                </label>
                <textarea
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm min-h-[70px]"
                  value={inputs.audienceNeeds}
                  onChange={handleChange("audienceNeeds")}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-heading text-lg text-sky-500">
                Step 3: Values & Tone
              </h2>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">
                  Brand Values
                </label>
                <textarea
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm min-h-[70px]"
                  placeholder='E.g., "Simplicity, homely, hygiene, community, empowerment"'
                  value={inputs.brandValues}
                  onChange={handleChange("brandValues")}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">
                  Brand Tones / Personality
                </label>
                <textarea
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm min-h-[70px]"
                  placeholder='E.g., "Warm, simple, friendly, reliable"'
                  value={inputs.brandTones}
                  onChange={handleChange("brandTones")}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">
                  Desired Differentiation
                </label>
                <textarea
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm min-h-[70px]"
                  placeholder='E.g., "Stand out by offering authentic homemade taste with a community focus"'
                  value={inputs.differentiation}
                  onChange={handleChange("differentiation")}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="font-heading text-lg text-sky-500">
                Step 4: Review & Generate
              </h2>
              <p className="text-xs text-slate-700">
                Quickly review your answers and generate your full brand kit.
              </p>
              <div className="border rounded-xl border-slate-200 p-3 text-xs space-y-2 max-h-64 overflow-auto">
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(inputs, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Footer buttons */}
          <div className="pt-4 mt-2 border-t border-slate-200 flex justify-between">
            <button type="button" className="btn !bg-orange-500" onClick={handleBack}>
              ← Back
            </button>

            {step < totalSteps && (
              <button type="button" className="btn" onClick={handleNext}>
                Next →
              </button>
            )}

            {step === totalSteps && (
              <button
                type="button"
                className="btn"
                onClick={handleGenerateFull}
                disabled={loadingFull}
              >
                {loadingFull ? "Generating..." : "Generate Full Brand Kit"}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: simple live preview card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-4">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Live Preview</span>
            <span>{inputs.businessName || "Your Business Name"}</span>
          </div>

          <div>
            <h3 className="font-heading text-xs text-slate-700 mb-2">
              Typography Preview
            </h3>
            <p className="font-heading text-base mb-1">
              {inputs.businessName || "Your Business Name"}
            </p>
            <p className="text-xs text-slate-700">
              {inputs.offering ||
                "Your core offering and key message will appear here in body text."}
            </p>
          </div>

          <div className="border border-dashed border-slate-300 rounded-xl p-3 text-xs text-slate-700">
            <p className="font-heading text-xs mb-1">Logo Concept</p>
            <p>
              A simple monogram or abstract mark based on your name and industry
              will be generated.
            </p>
          </div>

          <div className="text-xs">
            <p className="font-heading text-xs mb-1">Potential Tagline</p>
            <p className="italic text-slate-700">
              "Where homely taste meets everyday hustle."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
