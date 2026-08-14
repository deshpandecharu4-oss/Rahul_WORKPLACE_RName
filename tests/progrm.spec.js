const { test } = require('@playwright/test');

test('Open Google', async ({ page }) => {
  await page.goto('https://www.google.com/');
});