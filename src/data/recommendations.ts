import { RecommendationsMap, Recommendation } from '@/types';

// Static recommendations data with educational copy
export const recommendations: RecommendationsMap = {
  wrinkles: {
    title: 'Anti-Aging Facial Treatments',
    desc: 'Based on your concern with wrinkles, we recommend our anti-aging facial treatments such as the Glo Signature Rejuvenation Facial or our Laser Skin Tightening. These treatments help stimulate collagen production, reduce fine lines, and restore youthful skin texture through advanced skincare technology and proven anti-aging techniques.',
  },
  acne: {
    title: 'Acne Healing Facials',
    desc: 'To combat acne, we suggest our Deep Pore Cleanse or Acne-Focused Facials, tailored for breakout-prone skin. Our specialized treatments target clogged pores, reduce inflammation, and help prevent future breakouts while promoting healthy skin healing and balance.',
  },
  texture: {
    title: 'Texture Refinement Services',
    desc: 'For uneven skin texture and tone, try our Microdermabrasion or Chemical Peels combined with Hydration Therapy. These treatments gently exfoliate dead skin cells, promote cellular renewal, and reveal smoother, more radiant skin with improved texture and even tone.',
  },
  hair: {
    title: 'Laser Hair Removal',
    desc: 'For smooth, hair-free skin, our medical-grade laser hair removal sessions are ideal, safe, and effective. Using advanced laser technology, we target hair follicles to provide long-lasting hair reduction with minimal discomfort and maximum results.',
  },
};

// Recommendation lookup function with fallback handling
export const getRecommendation = (concern: string): Recommendation | null => {
  const recommendation = recommendations[concern];
  
  if (!recommendation) {
    console.warn(`No recommendation found for concern: ${concern}`);
    return null;
  }
  
  return recommendation;
};

// Validate if a concern is supported
export const isValidConcern = (concern: string): boolean => {
  return concern in recommendations;
};

// Get all available concerns
export const getAvailableConcerns = (): string[] => {
  return Object.keys(recommendations);
};