import { describe, it, expect } from 'vitest';
import { holidays, Holiday } from './holidays';

describe('holidays', () => {
  describe('holidays array', () => {
    it('should contain all expected holidays', () => {
      const holidayNames = holidays.map(h => h.name);
      
      expect(holidayNames).toContain('New Year\'s Day');
      expect(holidayNames).toContain('Martin Luther King, Jr. Day');
      expect(holidayNames).toContain('Valentine\'s Day');
      expect(holidayNames).toContain('Presidents\' Day');
      expect(holidayNames).toContain('St. Patrick\'s Day');
      expect(holidayNames).toContain('April Fools\' Day');
      expect(holidayNames).toContain('Easter');
      expect(holidayNames).toContain('Mother\'s Day');
      expect(holidayNames).toContain('Memorial Day');
      expect(holidayNames).toContain('Father\'s Day');
      expect(holidayNames).toContain('Independence Day');
      expect(holidayNames).toContain('Labor Day');
      expect(holidayNames).toContain('Halloween');
      expect(holidayNames).toContain('Veterans Day');
      expect(holidayNames).toContain('Thanksgiving');
      expect(holidayNames).toContain('Christmas');
    });

    it('should have 16 holidays', () => {
      expect(holidays.length).toBe(16);
    });
  });

  describe('date logic', () => {
    it('should have correct month and day for New Year\'s Day (January 1)', () => {
      const newYear = holidays.find(h => h.name === 'New Year\'s Day');
      expect(newYear?.date.getMonth()).toBe(0);
      expect(newYear?.date.getDate()).toBe(1);
    });

    it('should have correct month and day for Independence Day (July 4)', () => {
      const independenceDay = holidays.find(h => h.name === 'Independence Day');
      expect(independenceDay?.date.getMonth()).toBe(6);
      expect(independenceDay?.date.getDate()).toBe(4);
    });

    it('should have correct month and day for Christmas (December 25)', () => {
      const christmas = holidays.find(h => h.name === 'Christmas');
      expect(christmas?.date.getMonth()).toBe(11);
      expect(christmas?.date.getDate()).toBe(25);
    });

    it('should have correct month and day for Halloween (October 31)', () => {
      const halloween = holidays.find(h => h.name === 'Halloween');
      expect(halloween?.date.getMonth()).toBe(9);
      expect(halloween?.date.getDate()).toBe(31);
    });

    it('should use current year for all holiday dates', () => {
      const currentYear = new Date().getFullYear();
      
      holidays.forEach(holiday => {
        expect(holiday.date.getFullYear()).toBe(currentYear);
      });
    });
  });
});
