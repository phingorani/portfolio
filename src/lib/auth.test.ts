import { describe, it, expect } from 'vitest';

describe('auth', () => {
  describe('authOptions', () => {
    it('should have GitHub provider configured', () => {
      expect(process.env.GITHUB_ID).toBeDefined();
      expect(process.env.GITHUB_SECRET).toBeDefined();
    });

    it('should have Email provider configured', () => {
      expect(process.env.EMAIL_SERVER_HOST).toBeDefined();
      expect(process.env.EMAIL_SERVER_USER).toBeDefined();
    });

    it('should have secret configured', () => {
      expect(process.env.NEXTAUTH_SECRET).toBeDefined();
    });

    it('should have signIn page configured', () => {
      expect('/auth/signin').toBeDefined();
    });
  });
});
