import { test, expect } from '@playwright/test';

test.describe('Projects Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Projects/);
  });

  test('should display projects section', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Projects');
    await expect(page.locator('[data-testid="project-card"]')).toBeVisible();
  });

  test('should have filter functionality', async ({ page }) => {
    await expect(page.locator('[data-testid="project-filter"]')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    // Test navigating to project detail page
    const firstProject = page.locator('[data-testid="project-card"]').first();
    await firstProject.click();
    await expect(page).toHaveURL(/\/projects\//);
  });
});