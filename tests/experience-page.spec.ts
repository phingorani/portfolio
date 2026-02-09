import { test, expect } from '@playwright/test';

test.describe('Experience Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/experience');
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Experience/);
  });

  test('should display experience section', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Experience');
    await expect(page.locator('[data-testid="experience-item"]')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    // Test navigating to first experience detail
    const firstItem = page.locator('[data-testid="experience-item"]').first();
    await firstItem.click();
    await expect(page).toHaveURL(/\/experience\//);
  });
});