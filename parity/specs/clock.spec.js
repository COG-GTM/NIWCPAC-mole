const { test, expect } = require('@playwright/test');
const { route, shot } = require('../helpers');

test('clock page shows the live clock and four timers', async ({ page }, testInfo) => {
  await page.goto(route(testInfo.project.name, '/clock'));
  await expect(page).toHaveURL(/\/clock/);
  await expect(page.getByText('Clock state not configured')).toHaveCount(4);
  await expect(page.getByText('00:00:00')).toHaveCount(4);
  await expect(page.getByText(/\d{2}:\d{2}:\d{2} (AM|PM)/)).toBeVisible();
  await shot(page, testInfo, '07-clock', [page.getByText(/\d{2}:\d{2}:\d{2} (AM|PM)/)]);
});
