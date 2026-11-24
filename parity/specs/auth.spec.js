const { test, expect } = require('@playwright/test');
const { creds, route, login, shot } = require('../helpers');

test.describe('Sign in / sign out', () => {
  test('protected route redirects to the login form', async ({ page }, testInfo) => {
    await page.goto(route(testInfo.project.name, '/operator'));
    await expect(page).toHaveURL(/\/login\?returnUrl=%2Foperator/);
    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeEnabled();
    await expect(page.getByText('Logout')).toHaveCount(0);
    await shot(page, testInfo, '01-login');
  });

  test('wrong password is rejected and the user stays signed out', async ({ page }, testInfo) => {
    const { username } = creds();
    await page.goto(route(testInfo.project.name, '/login'));
    await page.getByLabel('Username').fill(username);
    await page.getByLabel('Password').fill(`wrong-${Date.now()}`);
    const resp = page.waitForResponse((r) => r.url().includes('/api/token/auth/'));
    await page.getByRole('button', { name: 'login' }).click();
    expect((await resp).status()).toBe(401);
    await page.waitForLoadState('load');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByText('Logout')).toHaveCount(0);
  });

  test('empty form does not sign in', async ({ page }, testInfo) => {
    await page.goto(route(testInfo.project.name, '/login'));
    await page.getByRole('button', { name: 'login' }).click();
    await page.waitForTimeout(1500);
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByText('Logout')).toHaveCount(0);
  });

  test('valid credentials sign in, logout signs out', async ({ page }, testInfo) => {
    const username = await login(page, testInfo);
    await expect(page.getByText('Mole - Operator')).toBeVisible();
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByText(username)).toHaveCount(0);
    await expect(page.getByLabel('Username')).toBeVisible();
    await page.goto(route(testInfo.project.name, '/operator'));
    await expect(page).toHaveURL(/\/login/);
  });
});
