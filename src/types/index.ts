// Form Data Interface
export interface FormData {
  name: string;           // Required: User's full name
  email: string;          // Required: Email for lead capture
  skinType: string;       // Required: oily|dry|combo|sensitive
  concern: string;        // Required: acne|wrinkles|texture|hair
  outcome: string;        // Optional: User's desired results
  routine: string;        // Optional: Current skincare routine
  condition: string;      // Optional: Special conditions/pregnancy
}

// Recommendation Interface
export interface Recommendation {
  title: string;          // Treatment category name
  desc: string;           // Educational description of recommended treatments
}

// Recommendations Map Type
export interface RecommendationsMap {
  [key: string]: Recommendation;
}

// Skin Type Options
export type SkinType = 'oily' | 'dry' | 'combo' | 'sensitive';

// Primary Concern Options
export type PrimaryConcern = 'acne' | 'wrinkles' | 'texture' | 'hair';

// Form Field Names
export type FormFieldName = keyof FormData;