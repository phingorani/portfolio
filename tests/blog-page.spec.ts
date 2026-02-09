import { test, expect } from '@playwright/test';

test.describe('Blog Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Blog/);
  });

  test('should display blog section', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Blog');
    await expect(page.locator('[data-testid="blog-post"]')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    // Test navigating to first blog post
    const firstPost = page.locator('[data-testid="blog-post"]').first();
    await firstPost.click();
    await expect(page).toHaveURL(/\/blog\//);
  });
});