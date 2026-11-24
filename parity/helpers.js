const fs = require('fs');
const path = require('path');
const { expect } = require('@playwright/test');

const creds = () => JSON.parse(fs.readFileSync(path.join(__dirname, '.auth', 'user.json'), 'utf8'));

// Logical route -> app URL. Both apps use path routing, so this is the identity today.
const route = (_project, logical) => logical;

async function login(page, testInfo) {
  const { username, password } = creds();
  await page.goto(route(testInfo.project.name, '/login'));
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
  await expect(page).toHaveURL(/\/operator/);
  await expect(page.getByText(username)).toBeVisible();
  return username;
}

// Full-page screenshot per page per app; volatile regions (clock time, map canvas) are masked.
async function shot(page, testInfo, name, mask = []) {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(800);
  const dir = path.join(__dirname, 'report', 'screens', testInfo.project.name);
  fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({
    path: path.join(dir, `${name}.png`),
    fullPage: true,
    animations: 'disabled',
    caret: 'hide',
    mask: [page.locator('canvas'), ...mask],
  });
}

module.exports = { creds, route, login, shot };
