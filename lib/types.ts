// lib/types.ts

export type GeographicScope = "Local" | "National" | "Global";

export interface BrandInputs {
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
  visualStyle?: "Minimalist" | "Bold" | "Playful" | "Classic";
  colorIntensity?: "Soft" | "Balanced" | "Vibrant";
}

export interface ColorSwatch {
  name: string;
  hex: string;
  usage: string;
}

export interface FontChoice {
  role: "heading" | "body" | "accent";
  name: string;
  fallback: string;
  sample: string;
}

export interface LogoConcept {
  id: string;
  title: string;
  description: string;
  rationale: string;
}

export interface SocialMockup {
  type: string;
  description: string;
}

export interface CollateralMockup {
  type: string;
  description: string;
}

export interface CampaignDirection {
  title: string;
  concept: string;
  suggestedVisuals: string;
}

export interface BrandKitPreview {
  colors: ColorSwatch[];
  fonts: FontChoice[];
  logoPlaceholder: LogoConcept;
  taglineSuggestions: string[];
}

export interface BrandKitFull extends BrandKitPreview {
  id: string;
  createdAt: string;
  brandVoiceDescription: string;
  socialMockups: SocialMockup[];
  collateralMockups: CollateralMockup[];
  websiteHeaderDescription: string;
  recommendedChannels: { channel: string; reason: string }[];
  campaignDirections: CampaignDirection[];
  nextSteps: string[];
}
