import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:2221/');
  await page.locator('div').filter({ hasText: /^599\$Add to Basket$/ }).getByRole('button').click();
  await page.locator('div').filter({ hasText: /^320\$Add to Basket$/ }).getByRole('button').click();
  await page.getByRole('link', { name: 'Checkout' }).click();
  await expect(page.getByRole('button', { name: 'Continue to Checkout' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue to Checkout' }).click();
});

