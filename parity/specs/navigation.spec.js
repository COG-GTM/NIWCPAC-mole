const { test, expect } = require('@playwright/test');
const { route, login, shot } = require('../helpers');

test.describe('Shell navigation and theme', () => {
  test('side nav lists pages and navigates to Clock', async ({ page }, testInfo) => {
    await login(page, testInfo);
    await page.locator('mat-toolbar button').filter({ hasText: 'menu' }).click();
    const nav = page.locator('mat-sidenav');
    await expect(nav.getByText('Operator')).toBeVisible();
    await expect(nav.getByText('Clock')).toBeVisible();
    await shot(page, testInfo, '05-sidenav');
    await nav.getByText('Clock').click();
    await expect(page).toHaveURL(/\/clock/);
    await expect(page.getByText('Mole - Clock')).toBeVisible();
  });

  test('theme toggle switches dark/light and back', async ({ page }, testInfo) => {
    await page.goto(route(testInfo.project.name, '/login'));
    const toggle = page.locator('mat-toolbar mat-slide-toggle');
    await expect(page.getByText('nights_stay')).toBeVisible();
    await toggle.click();
    await expect(page.getByText('wb_sunny')).toBeVisible();
    await shot(page, testInfo, '06-login-light-theme');
    await toggle.click();
    await expect(page.getByText('nights_stay')).toBeVisible();
  });
});
