import { test, expect } from '@playwright/test';

test.describe('Contact Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact/);
  });

  test('should display contact section', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Contact');
    await expect(page.locator('form')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    // Test navigating to home page
    await page.locator('nav a:text("Home")').click();
    await expect(page).toHaveURL('/');
  });
});