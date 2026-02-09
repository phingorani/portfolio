import { describe, it, expect } from 'vitest';
import { experiences } from './experience';

describe('experience', () => {
  it('should contain expected companies', () => {
    const companyNames = experiences.map(e => e.company);

    expect(companyNames).toContain('Hyatt Corporation');
    expect(companyNames).toContain('J.P Morgan Chase');
  });

  it('should have exactly 3 experiences', () => {
    expect(experiences.length).toBe(3);
  });

  it('should have experiences with required fields', () => {
    experiences.forEach(exp => {
      expect(exp).toHaveProperty('slug');
      expect(exp).toHaveProperty('company');
      expect(exp).toHaveProperty('location');
      expect(exp).toHaveProperty('title');
      expect(exp).toHaveProperty('date');
      expect(exp).toHaveProperty('description');
    });
  });

  it('should have descriptions with text content', () => {
    experiences.forEach(exp => {
      exp.description.forEach(item => {
        expect(item.text).toBeTypeOf('string');
        expect(item.text.length).toBeGreaterThan(0);
      });
    });
  });
});
