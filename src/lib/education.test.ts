import { describe, it, expect } from 'vitest';
import { educations } from './education';

describe('education', () => {
  it('should contain expected universities', () => {
    const universityNames = educations.map(e => e.university);

    expect(universityNames).toContain('Depaul University');
    expect(universityNames).toContain('RD National');
  });

  it('should have exactly 2 education entries', () => {
    expect(educations.length).toBe(2);
  });

  it('should have education entries with required fields', () => {
    educations.forEach(edu => {
      expect(edu).toHaveProperty('slug');
      expect(edu).toHaveProperty('university');
      expect(edu).toHaveProperty('location');
      expect(edu).toHaveProperty('degree');
      expect(edu).toHaveProperty('date');
      expect(edu).toHaveProperty('url');
    });
  });

  it('should have course information for DePaul University', () => {
    const depaul = educations.find(e => e.university === 'Depaul University');

    expect(depaul).toBeDefined();
    expect(depaul?.coreCourses).toBeInstanceOf(Array);
    expect(depaul?.foundationCourses).toBeInstanceOf(Array);
  });

  it('should have semester information for RD National', () => {
    const rdNational = educations.find(e => e.university === 'RD National');

    expect(rdNational).toBeDefined();
    expect(rdNational?.semesters).toBeInstanceOf(Array);
    
    if (rdNational?.semesters) {
      expect(rdNational.semesters.length).toBeGreaterThan(0);
      rdNational.semesters.forEach(semester => {
        expect(semester).toHaveProperty('title');
        expect(semester.courses).toBeInstanceOf(Array);
      });
    }
  });
});
