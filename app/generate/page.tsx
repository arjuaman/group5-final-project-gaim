"use client";

import { useState } from "react";
import { BrandInputs, BrandKitPreview } from "@/lib/types";
import { useRouter } from "next/navigation";

type Step = 1 | 2 | 3 | 4;

const initialInputs: BrandInputs = {
  businessName: "",
  offering: "",
  industry: "",
  scope: "Local",
  audienceDemographics: "",
  audiencePsychographics: "",
  audienceNeeds: "",
  brandValues: "",
  brandTones: "",
  differentiation: "",
};

export default function GeneratePage() {
  const [step, setStep] = useState<Step>(1);
  const [inputs, setInputs] = useState<BrandInputs>(initialInputs);
  const [preview, setPreview] = useState<BrandKitPreview | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [loadingFull, setLoadingFull] = useState(false);
  const router = useRouter();

  const progress = (step / 4) * 100;

  const handleChange = (
    field: keyof BrandInputs,
    value: string | "Local" | "National" | "Global"
  ) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleGeneratePreview = async () => {
    setLoadingPreview(true);
    try {
      const res = await fetch("/api/brandkits/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: inputs }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = (await res.json()) as BrandKitPreview;
      setPreview(data);
    } catch (err) {
      console.error(err);
      alert("Error generating preview. Please try again.");
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleGenerateFull = async () => {
  setLoadingFull(true);
  try {
    const res = await fetch("/api/brandkits/full", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: inputs }),
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      // ignore JSON parse error
    }

    if (!res.ok) {
      console.error("Full kit API error:", res.status, data);
      throw new Error(data?.error || `Request failed: ${res.status}`);
    }

    router.push(`/output/${data.id}`);
  } catch (err: any) {
    console.error("handleGenerateFull error:", err);
    alert(err.message || "Error generating full kit. Please try again.");
  } finally {
    setLoadingFull(false);
  }
};


  const canGoNext =
    (step === 1 &&
      inputs.businessName.trim() &&
      inputs.offering.trim() &&
      inputs.industry.trim()) ||
    (step === 2 &&
      inputs.audienceDemographics.trim() &&
      inputs.audiencePsychographics.trim() &&
      inputs.audienceNeeds.trim()) ||
    (step === 3 &&
      inputs.brandValues.trim() &&
      inputs.brandTones.trim() &&
      inputs.differentiation.trim()) ||
    step === 4;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10">
    <h1 className="font-heading text-xl md:text-2xl mb-2">
      Brand Kit Generator
    </h1>
    <p className="text-xs md:text-sm text-gray-500 mb-5">
      Answer a few questions and let GenAI build your brand identity kit.
    </p>

    <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] gap-6">
        {/* Left: Form */}
        <div className="bg-white rounded-2xl border border-brand-bgAlt shadow-sm p-4 md:p-6 space-y-6">
          {/* Progress */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
              <span>Step {step} of 4</span>
              <span>
                {step === 1 && "Basics"}
                {step === 2 && "Audience"}
                {step === 3 && "Values & Tone"}
                {step === 4 && "Review & Generate"}
              </span>
            </div>
            <div className="w-full bg-brand.bgAlt h-2 rounded-full overflow-hidden">
              <div
                className="h-2 bg-brand.primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Steps */}
          {step === 1 && (
            <Step1Basics inputs={inputs} onChange={handleChange} />
          )}
          {step === 2 && (
            <Step2Audience inputs={inputs} onChange={handleChange} />
          )}
          {step === 3 && (
            <Step3Values inputs={inputs} onChange={handleChange} />
          )}
          {step === 4 && (
            <Step4Review
              inputs={inputs}
              setInputs={setInputs}
              canGeneratePreview={!preview}
              onGeneratePreview={handleGeneratePreview}
              loadingPreview={loadingPreview}
              onGenerateFull={handleGenerateFull}
              loadingFull={loadingFull}
            />
          )}

          {/* Navigation */}
          <div className="flex justify-between border-t border-brand.bgAlt pt-4 mt-2">
            <button
              disabled={step === 1}
              onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
              className="text-sm text-gray-600 disabled:text-gray-300"
            >
              ← Back
            </button>
            {step < 4 && (
              <button
                disabled={!canGoNext}
                onClick={() => setStep((s) => (s < 4 ? ((s + 1) as Step) : s))}
                className="px-4 py-2 rounded-full bg-brand.primary text-white text-sm font-medium disabled:bg-gray-300"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Right: Live Preview */}
        <LivePreview inputs={inputs} preview={preview} />
      </div>
    </div>
  );
}

interface StepProps {
  inputs: BrandInputs;
  onChange: (field: keyof BrandInputs, value: any) => void;
}

function Label({
  children,
  tooltip,
}: {
  children: React.ReactNode;
  tooltip?: string;
}) {
  return (
    <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
      {children}
      {tooltip && (
        <span className="relative group cursor-help text-gray-400">
          ?
          <span className="absolute z-10 hidden group-hover:block text-[11px] w-52 bg-black text-white rounded-lg px-2 py-1 -left-2 top-5">
            {tooltip}
          </span>
        </span>
      )}
    </label>
  );
}

function Step1Basics({ inputs, onChange }: StepProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg mb-2">Step 1: Basics</h2>
      <div className="space-y-1">
        <Label tooltip='E.g., "Campus Kitchen", "Nimbus Analytics"'>
          Business Name *
        </Label>
        <input
          value={inputs.businessName}
          onChange={(e) => onChange("businessName", e.target.value)}
          className="w-full border border-brand.bgAlt rounded-xl px-3 py-2 text-sm"
          placeholder='E.g., "Canteen on Campus"'
        />
      </div>

      <div className="space-y-1">
        <Label tooltip='E.g., "Home-style lunch subscription for college students"'>
          Core Offering / Product / Service *
        </Label>
        <textarea
          value={inputs.offering}
          onChange={(e) => onChange("offering", e.target.value)}
          className="w-full border border-brand.bgAlt rounded-xl px-3 py-2 text-sm min-h-[70px]"
        />
      </div>

      <div className="space-y-1">
        <Label tooltip="Pick the closest fit.">
          Industry / Sector *
        </Label>
        <select
          value={inputs.industry}
          onChange={(e) => onChange("industry", e.target.value)}
          className="w-full border border-brand.bgAlt rounded-xl px-3 py-2 text-sm bg-white"
        >
          <option value="">Select industry...</option>
          <option>Food & Beverage</option>
          <option>Technology / SaaS</option>
          <option>Retail / E-commerce</option>
          <option>Services</option>
          <option>Education</option>
          <option>Health & Wellness</option>
          <option>Other</option>
        </select>
      </div>

      <div className="space-y-1">
        <Label>Geographic Scope</Label>
        <div className="flex gap-3 text-xs">
          {(["Local", "National", "Global"] as const).map((scope) => (
            <button
              key={scope}
              type="button"
              onClick={() => onChange("scope", scope)}
              className={`px-3 py-1 rounded-full border ${
                inputs.scope === scope
                  ? "border-brand.primary bg-brand.primary/10 text-brand.primary"
                  : "border-brand.bgAlt text-gray-600"
              }`}
            >
              {scope}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step2Audience({ inputs, onChange }: StepProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg mb-2">Step 2: Audience</h2>

      <div className="space-y-1">
        <Label tooltip='E.g., "College students, age 18–24, urban campuses"'>
          Target Audience Demographics *
        </Label>
        <textarea
          value={inputs.audienceDemographics}
          onChange={(e) =>
            onChange("audienceDemographics", e.target.value)
          }
          className="w-full border border-brand.bgAlt rounded-xl px-3 py-2 text-sm min-h-[70px]"
        />
      </div>

      <div className="space-y-1">
        <Label tooltip='E.g., "Health-conscious, budget-aware, seeking comfort food"'>
          Target Audience Psychographics *
        </Label>
        <textarea
          value={inputs.audiencePsychographics}
          onChange={(e) =>
            onChange("audiencePsychographics", e.target.value)
          }
          className="w-full border border-brand.bgAlt rounded-xl px-3 py-2 text-sm min-h-[70px]"
        />
      </div>

      <div className="space-y-1">
        <Label tooltip='E.g., "Need for hygienic, affordable, homely meals on campus"'>
          Needs / Pain Points Addressed *
        </Label>
        <textarea
          value={inputs.audienceNeeds}
          onChange={(e) => onChange("audienceNeeds", e.target.value)}
          className="w-full border border-brand.bgAlt rounded-xl px-3 py-2 text-sm min-h-[70px]"
        />
      </div>
    </div>
  );
}

function Step3Values({ inputs, onChange }: StepProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg mb-2">Step 3: Brand Values & Tones</h2>

      <div className="space-y-1">
        <Label tooltip='E.g., "Simplicity, homely, hygiene, community, empowerment"'>
          Brand Values *
        </Label>
        <textarea
          value={inputs.brandValues}
          onChange={(e) => onChange("brandValues", e.target.value)}
          className="w-full border border-brand.bgAlt rounded-xl px-3 py-2 text-sm min-h-[70px]"
        />
      </div>

      <div className="space-y-1">
        <Label tooltip='E.g., "Warm, simple, friendly, reliable"'>
          Brand Tones / Personality *
        </Label>
        <textarea
          value={inputs.brandTones}
          onChange={(e) => onChange("brandTones", e.target.value)}
          className="w-full border border-brand.bgAlt rounded-xl px-3 py-2 text-sm min-h-[70px]"
        />
      </div>

      <div className="space-y-1">
        <Label tooltip='E.g., "Authentic homemade taste with a community focus"'>
          Desired Differentiation *
        </Label>
        <textarea
          value={inputs.differentiation}
          onChange={(e) => onChange("differentiation", e.target.value)}
          className="w-full border border-brand.bgAlt rounded-xl px-3 py-2 text-sm min-h-[70px]"
        />
      </div>
    </div>
  );
}

interface Step4Props {
  inputs: BrandInputs;
  setInputs: (fn: (prev: BrandInputs) => BrandInputs) => void;
  canGeneratePreview: boolean;
  onGeneratePreview: () => void;
  loadingPreview: boolean;
  onGenerateFull: () => void;
  loadingFull: boolean;
}

function Step4Review({
  inputs,
  setInputs,
  canGeneratePreview,
  onGeneratePreview,
  loadingPreview,
  onGenerateFull,
  loadingFull,
}: Step4Props) {
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg mb-2">
        Step 4: Review & Generate Comprehensive Kit
      </h2>

      {/* Summary */}
      <div className="max-h-52 overflow-y-auto border border-brand.bgAlt rounded-2xl p-3 text-xs space-y-2 bg-brand.bgAlt/40">
        {Object.entries(inputs).map(([key, value]) => (
          <div key={key}>
            <span className="font-semibold capitalize">
              {key.replace(/([A-Z])/g, " $1")}:
            </span>{" "}
            <span className="text-gray-700">{String(value) || "-"}</span>
          </div>
        ))}
      </div>

      {/* Refinements */}
      <div className="grid md:grid-cols-2 gap-3 text-xs">
        <div className="space-y-1">
          <Label>Visual Style Preference</Label>
          <select
            value={inputs.visualStyle ?? ""}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                visualStyle: e.target.value
                  ? (e.target.value as any)
                  : undefined,
              }))
            }
            className="w-full border border-brand.bgAlt rounded-xl px-3 py-2 bg-white"
          >
            <option value="">Let AI decide</option>
            <option>Minimalist</option>
            <option>Bold</option>
            <option>Playful</option>
            <option>Classic</option>
          </select>
        </div>

        <div className="space-y-1">
          <Label>Color Intensity</Label>
          <select
            value={inputs.colorIntensity ?? ""}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                colorIntensity: e.target.value
                  ? (e.target.value as any)
                  : undefined,
              }))
            }
            className="w-full border border-brand.bgAlt rounded-xl px-3 py-2 bg-white"
          >
            <option value="">Balanced</option>
            <option>Soft</option>
            <option>Vibrant</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-4">
        <button
          type="button"
          onClick={onGeneratePreview}
          disabled={loadingPreview}
          className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-brand.primary text-brand.primary text-sm bg-white hover:bg-brand.primary/5 disabled:opacity-70"
        >
          {loadingPreview ? "Generating Initial Concepts..." : "Generate Initial Concepts"}
        </button>

        <button
          type="button"
          onClick={onGenerateFull}
          disabled={loadingFull}
          className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-brand.accent text-white text-sm font-medium shadow-soft hover:translate-y-0.5 transition disabled:opacity-70"
        >
          {loadingFull ? "Generating Full Brand Kit..." : "Generate Full Brand Kit"}
        </button>
      </div>

      {loadingFull && (
        <p className="text-[11px] text-gray-500">
          Crafting your color palette, typography, logos, voice, and campaigns
          with AI…
        </p>
      )}
    </div>
  );
}

function LivePreview({
  inputs,
  preview,
}: {
  inputs: BrandInputs;
  preview: BrandKitPreview | null;
}) {
  const colorArray = Array.isArray(preview?.colors) ? preview!.colors : [];
  const fontArray = Array.isArray(preview?.fonts) ? preview!.fonts : [];

  return (
    <div className="bg-white rounded-2xl border border-brand-bgAlt shadow-sm p-4 md:p-5 flex flex-col gap-4">
      <div className="flex justify-between text-xs text-gray-500">
        <span>Live Preview</span>
        <span className="truncate max-w-[50%] text-right">
          {inputs.businessName || "Your Business Name"}
        </span>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-heading text-xs font-semibold mb-2 text-gray-800">
          Conceptual Color Palette
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {colorArray.slice(0, 4).map((c) => (
            <div key={c.name} className="space-y-1">
              <div
                className="h-9 rounded-md border border-gray-200"
                style={{ backgroundColor: c.hex }}
              />
              <div className="text-[10px] text-gray-600">
                <div className="font-semibold truncate">{c.name}</div>
                <div>{c.hex}</div>
              </div>
            </div>
          ))}

          {!preview &&
            [0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-9 rounded-md bg-gray-200"
              />
            ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <h3 className="font-heading text-xs font-semibold mb-2 text-gray-800">
          Typography Preview
        </h3>
        <div className="space-y-1 text-xs">
          <p className="font-heading text-sm text-gray-900">
            {fontArray.find((f) => f.role === "heading")?.sample ||
              inputs.businessName ||
              "Your Business Name"}
          </p>
          <p className="text-gray-600">
            {fontArray.find((f) => f.role === "body")?.sample ||
              inputs.offering ||
              "Your core offering and key message will appear here in body text."}
          </p>
        </div>
      </div>

      {/* Logo placeholder */}
      <div className="border border-dashed border-brand-bgAlt rounded-xl p-3 text-[11px] text-gray-600">
        <p className="font-heading text-xs font-semibold mb-1 text-gray-800">
          Logo Concept
        </p>
        <p>
          {preview?.logoPlaceholder?.description ||
            "A simple monogram or abstract mark based on your name and industry will be generated."}
        </p>
      </div>

      {/* Tagline */}
      <div className="text-[11px]">
        <p className="font-heading text-xs font-semibold mb-1 text-gray-800">
          Potential Tagline
        </p>
        <p className="italic text-gray-700">
          {preview?.taglineSuggestions?.[0] ||
            "“Where homely taste meets everyday hustle.”"}
        </p>
      </div>
    </div>
  );
}


