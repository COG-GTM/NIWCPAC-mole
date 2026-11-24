const { test, expect } = require('@playwright/test');
const { login, shot } = require('../helpers');

test.describe('Trial header', () => {
  test('edit-trial form shows the selected trial and cancels without saving', async ({ page }, testInfo) => {
    await login(page, testInfo);
    await page.locator('#mat-chip-edit').click();
    const dialog = page.locator('mat-dialog-container');
    await expect(dialog.getByText('Edit Trial')).toBeVisible();
    for (const label of ['Start Datetime', 'End Datetime', 'System Configuration', 'Scenario', 'Testers',
      'Clock Configuration', 'Reported', 'Current', 'Entities', 'Note']) {
      await expect(dialog.getByText(label, { exact: true }).first()).toBeVisible();
    }
    await expect(dialog.getByText('Test Baseline')).toBeVisible();
    await expect(dialog.getByText('Test Scenario')).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Submit' })).toBeEnabled();
    await shot(page, testInfo, '08-trial-edit', [page.locator('mole-timeline')]);
    await dialog.getByRole('button', { name: 'Cancel' }).click();
    await expect(dialog).toHaveCount(0);
    await expect(page.getByText('0.1.1 (Test Baseline: Test Scenario)')).toBeVisible();
  });

  test('add menu offers new Day / Shift / Attempt and trial list is selectable', async ({ page }, testInfo) => {
    await login(page, testInfo);
    await page.locator('#mat-chip-add').click();
    for (const item of ['Day', 'Shift', 'Attempt']) {
      await expect(page.getByRole('menuitem', { name: item })).toBeVisible();
    }
    await page.keyboard.press('Escape');
    await page.locator('#mat-select-trials').click();
    await expect(page.getByRole('option').first()).toBeVisible();
    expect(await page.getByRole('option').count()).toBeGreaterThan(0);
    await shot(page, testInfo, '09-trial-list', [page.locator('mole-timeline')]);
    await page.keyboard.press('Escape');
  });
});
