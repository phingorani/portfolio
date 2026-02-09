import { test, expect } from '@playwright/test';

test.describe('Main Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have title', async ({ page }) => {
    await expect(page).toHaveTitle(/Pratik Hingorani/);
  });

  test('should display hero section', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Pratik Hingorani');
  });
});