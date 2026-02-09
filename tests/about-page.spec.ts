import { test, expect } from '@playwright/test';

test.describe('About Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/About Pratik Hingorani/);
  });

  test('should display about section content', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('About Me');
    await expect(page.locator('h2')).toContainText('Skills');
  });

  test('should have contact form', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible();
  });

  test('should have working navigation to other pages', async ({ page }) => {
    // Test navigating to Projects page
    await page.locator('nav a:text("Projects")').click();
    await expect(page).toHaveURL(/\/projects/);
    
    // Go back to about
    await page.goBack();
    await expect(page).toHaveURL('/about');
  });
});