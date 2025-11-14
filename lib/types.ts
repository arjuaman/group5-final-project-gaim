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
}

export interface ColorToken {
  name: string;
  hex: string;
  usage: string;
}

export type FontRole = "heading" | "body" | "accent";

export interface FontToken {
  role: FontRole;
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

export interface BrandKitPreview {
  colors: ColorToken[];
  fonts: FontToken[];
  logoPlaceholder: LogoConcept;
  taglineSuggestions: string[];
}

export interface Mockup {
  type: string;
  description: string;
}

export interface ChannelRecommendation {
  channel: string;
  reason: string;
}

export interface CampaignDirection {
  title: string;
  concept: string;
  suggestedVisuals: string;
}

/**
 * New types for “Zoviz-style” elements
 */

export interface SampleLogo {
  id: string;
  name: string;
  description: string;
  rationale: string;
}

export interface TypographySystem {
  name: string;
  headingFont: string;
  bodyFont: string;
  accentFont?: string;
  usage: string;
  sampleHeading: string;
  sampleBody: string;
}

export interface SamplePoster {
  title: string;
  headline: string;
  subheadline: string;
  description: string;
  callToAction: string;
  placement: string;
}

export interface SampleSocialPost {
  platform: string; // e.g. "Instagram", "Twitter/X"
  format: string; // e.g. "Feed post", "Story", "Reel"
  caption: string;
  visualIdea: string;
  hook: string;
  callToAction: string;
}

export interface BrandKitFull extends BrandKitPreview {
  id: string;
  createdAt: string;

  brandVoiceDescription: string;
  socialMockups: Mockup[];
  collateralMockups: Mockup[];
  websiteHeaderDescription: string;
  recommendedChannels: ChannelRecommendation[];
  campaignDirections: CampaignDirection[];
  nextSteps: string[];

  // New richer artifacts
  sampleLogos: SampleLogo[]; // 2 logo concepts
  sampleTypographies: TypographySystem[]; // 2 type systems
  samplePosters: SamplePoster[]; // 2 poster/flyer concepts
  socialPostIdeas: SampleSocialPost[]; // 2 social posts (Twitter+Instagram)
}
