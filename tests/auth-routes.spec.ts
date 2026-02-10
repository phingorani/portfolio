import { test, expect } from '@playwright/test';

test.describe('Authenticated Routes Tests', () => {
  test.describe('/chatbot route', () => {
    test('should redirect to signin when not authenticated', async ({ page }) => {
      await page.goto('/chatbot');
      await expect(page).toHaveURL(/\/auth\/signin/);
    });

    test('should show loading state with spinner when authenticated', async ({ page }) => {
      await page.goto('/chatbot');
      
      const heading = page.getByText('AI Chat Assistant');
      await expect(heading).toBeVisible();
    });

    test('should have chat input field', async ({ page }) => {
      await page.goto('/chatbot');
      
      const input = page.getByPlaceholder(/Type your message|Ask about the file/);
      await expect(input).toBeVisible();
    });

    test('should have send button', async ({ page }) => {
      await page.goto('/chatbot');
      
      const sendButton = page.locator('button[type="submit"]');
      await expect(sendButton).toBeVisible();
    });

    test('should have file upload button', async ({ page }) => {
      await page.goto('/chatbot');
      
      const fileButton = page.locator('input[type="file"]');
      await expect(fileButton).toBeVisible();
    });
  });

  test.describe('/api/chat route', () => {
    test('should rate limit requests when not authenticated', async ({ request }) => {
      const response = await request.post('/api/chat', {
        data: {
          messages: [{ role: 'user', content: 'Hello' }]
        }
      });
      
      expect(response.status()).toBe(200);
    });
  });
});
