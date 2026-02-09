import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Pratik Hingorani/);
  });

  test('should display hero section with expected content', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Pratik Hingorani');
    await expect(page.locator('h2')).toContainText('Software Engineer & Full Stack Developer');
  });

  test('should have navigation links', async ({ page }) => {
    const navLinks = page.locator('nav a');
    await expect(navLinks).toHaveCount(6); // About, Projects, Blog, Experience, Education, Contact
  });

  test('should have working navigation', async ({ page }) => {
    // Test navigating to About page
    await page.locator('nav a:text("About")').click();
    await expect(page).toHaveURL(/\/about/);
    
    // Go back to home
    await page.goBack();
    await expect(page).toHaveURL('/');
  });
});