import { test, expect } from '@playwright/test';

test.describe('Education Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/education');
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Education/);
  });

  test('should display education section', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Education');
    await expect(page.locator('[data-testid="education-item"]')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    // Test navigating to first education detail
    const firstItem = page.locator('[data-testid="education-item"]').first();
    await firstItem.click();
    await expect(page).toHaveURL(/\/education\//);
  });
});