const { test, expect } = require('@playwright/test');
const { login, shot } = require('../helpers');

const EVENT_TYPES = ['Unassigned', 'Detection', 'Interaction', 'Trial Init', 'Trial Start', 'Trial End',
  'Node Online', 'Other', 'Maintenance Stop', 'Safety Stop', 'Node Warning', 'Cancel Scheduled'];

const timeline = (page) => page.locator('mole-timeline mole-timeline-card');
const volatile = (page) => [page.locator('mole-timeline'), page.locator('#span-badgecount')];

async function openTools(page) {
  await page.getByText('Create / Filter Events').click();
  await expect(page.getByRole('tab', { name: /Create/ })).toBeVisible();
}

test.describe('Operator page', () => {
  test('shows the selected trial and its status chips', async ({ page }, testInfo) => {
    await login(page, testInfo);
    await expect(page.getByText('0.1.1 (Test Baseline: Test Scenario)')).toBeVisible();
    await expect(page.getByText('Current', { exact: true })).toBeVisible();
    await expect(page.getByText('Reported', { exact: true })).toBeVisible();
    await expect(page.getByText('Create / Filter Events')).toBeVisible();
    await shot(page, testInfo, '02-operator', volatile(page));
  });

  test('map switcher toggles between the 2D map and the 3D Cesium globe', async ({ page }, testInfo) => {
    await login(page, testInfo);
    await expect(page.locator('mole-map-instance')).toBeVisible();
    await expect(page.locator('mole-cesium-instance')).toHaveCount(0);
    await page.locator('mat-slide-toggle.toggle-cesium').click();
    await expect(page.locator('mole-cesium-instance .cesium-viewer')).toBeVisible();
    await expect(page.locator('mole-map-instance')).toHaveCount(0);
    await shot(page, testInfo, '02b-operator-3d', [page.locator('.cesium-viewer-bottom'), ...volatile(page)]);
    await page.locator('mat-slide-toggle.toggle-cesium').click();
    await expect(page.locator('mole-map-instance')).toBeVisible();
    await expect(page.locator('mole-cesium-instance')).toHaveCount(0);
  });

  test('tools panel lists every event type under Create, Filter and View tabs', async ({ page }, testInfo) => {
    await login(page, testInfo);
    await openTools(page);
    for (const tab of ['Create', 'Filter', 'View']) {
      await expect(page.getByRole('tab', { name: new RegExp(tab) })).toBeVisible();
    }
    const creator = page.locator('mole-event-creator');
    for (const t of EVENT_TYPES) await expect(creator.getByText(t, { exact: true })).toBeVisible();
    await shot(page, testInfo, '03-operator-tools', volatile(page));

    await page.getByRole('tab', { name: /Filter/ }).click();
    const filter = page.locator('mole-event-filter');
    await expect(filter.getByLabel('Metadata')).toBeVisible();
    await expect(filter.getByRole('button').filter({ hasText: 'add_circle_outline' })).toBeDisabled();
    await filter.getByLabel('Metadata').fill('parity');
    await expect(filter.getByRole('button').filter({ hasText: 'add_circle_outline' })).toBeEnabled();
    await expect(filter.getByLabel('Event Level')).toBeVisible();
    const hasPose = filter.getByRole('checkbox', { name: 'Has Coordinates' });
    await expect(hasPose).not.toBeChecked();
    await filter.getByText('Has Coordinates').click();
    await expect(hasPose).toBeChecked();
    await shot(page, testInfo, '03b-operator-filter', volatile(page));
    await filter.getByText('Has Coordinates').click();
    await expect(hasPose).not.toBeChecked();

    await page.getByRole('tab', { name: /View/ }).click();
    await expect(page.getByText('No Event Selected')).toBeVisible();
  });

  test('create an event, add, edit and delete a note on it', async ({ page }, testInfo) => {
    await login(page, testInfo);
    await openTools(page);
    const before = await timeline(page).count();

    await page.locator('mole-event-creator').getByText('Detection', { exact: true }).click();
    const dialog = page.locator('mat-dialog-container');
    await expect(dialog.getByText('Select the elements in the event you would like to edit:')).toBeVisible();
    await expect(dialog.getByText('Detection')).toBeVisible();
    for (const tab of ['Dropdown', 'Metadata', 'Notes', 'Photos']) {
      await expect(dialog.getByRole('tab', { name: tab })).toBeVisible();
    }
    await shot(page, testInfo, '04-event-dialog', volatile(page));

    const created = page.waitForResponse((r) => r.url().includes('/api/events/') && r.request().method() === 'POST');
    await dialog.getByRole('button', { name: 'Ok' }).click();
    expect((await created).status()).toBe(201);
    await expect(dialog).toHaveCount(0);
    await expect(timeline(page)).toHaveCount(before + 1);
    const card = timeline(page).first();
    await expect(card.getByText('Detection')).toBeVisible();

    const note = `parity note ${Date.now()}`;
    await card.locator('button').filter({ hasText: 'speaker_notes' }).click();
    const notes = page.locator('mat-dialog-container');
    await notes.getByLabel('Note').fill(note);
    const posted = page.waitForResponse((r) => r.url().includes('/api/notes/') && r.request().method() === 'POST');
    await notes.getByRole('button', { name: 'Ok' }).click();
    expect((await posted).ok()).toBeTruthy();
    await expect(notes).toHaveCount(0);

    await card.locator('button').filter({ hasText: 'speaker_notes' }).click();
    await expect(notes.getByText(note)).toBeVisible();
    await notes.locator('mat-card button').filter({ hasText: 'edit' }).first().click();
    const edited = `${note} edited`;
    await notes.locator('mat-card textarea').fill(edited);
    await notes.getByRole('button', { name: 'Update Note' }).click();
    await expect(notes.getByText(edited)).toBeVisible();
    await notes.locator('mat-card button').filter({ hasText: 'delete' }).first().click();
    await expect(notes.getByText(edited)).toHaveCount(0);
  });
});
