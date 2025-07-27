import { getRecommendation, isValidConcern, getAvailableConcerns } from '../recommendations';

describe('Recommendations', () => {
  describe('getRecommendation', () => {
    it('should return correct recommendation for acne concern', () => {
      const result = getRecommendation('acne');
      expect(result).toBeTruthy();
      expect(result?.title).toBe('Acne Healing Facials');
      expect(result?.desc).toContain('Deep Pore Cleanse');
    });

    it('should return correct recommendation for wrinkles concern', () => {
      const result = getRecommendation('wrinkles');
      expect(result).toBeTruthy();
      expect(result?.title).toBe('Anti-Aging Facial Treatments');
      expect(result?.desc).toContain('Glo Signature Rejuvenation Facial');
    });

    it('should return correct recommendation for texture concern', () => {
      const result = getRecommendation('texture');
      expect(result).toBeTruthy();
      expect(result?.title).toBe('Texture Refinement Services');
      expect(result?.desc).toContain('Microdermabrasion');
    });

    it('should return correct recommendation for hair concern', () => {
      const result = getRecommendation('hair');
      expect(result).toBeTruthy();
      expect(result?.title).toBe('Laser Hair Removal');
      expect(result?.desc).toContain('medical-grade laser');
    });

    it('should return null for invalid concern', () => {
      const result = getRecommendation('invalid');
      expect(result).toBeNull();
    });
  });

  describe('isValidConcern', () => {
    it('should return true for valid concerns', () => {
      expect(isValidConcern('acne')).toBe(true);
      expect(isValidConcern('wrinkles')).toBe(true);
      expect(isValidConcern('texture')).toBe(true);
      expect(isValidConcern('hair')).toBe(true);
    });

    it('should return false for invalid concerns', () => {
      expect(isValidConcern('invalid')).toBe(false);
      expect(isValidConcern('')).toBe(false);
    });
  });

  describe('getAvailableConcerns', () => {
    it('should return all available concerns', () => {
      const concerns = getAvailableConcerns();
      expect(concerns).toHaveLength(4);
      expect(concerns).toContain('acne');
      expect(concerns).toContain('wrinkles');
      expect(concerns).toContain('texture');
      expect(concerns).toContain('hair');
    });
  });
});