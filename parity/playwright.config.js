// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './specs',
  globalSetup: require.resolve('./global-setup'),
  fullyParallel: false,
  workers: 1,
  retries: 1,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: [['list'], ['json', { outputFile: 'report/results.json' }]],
  use: {
    ...devices['Desktop Chrome'],
    viewport: { width: 1440, height: 900 },
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'baseline', use: { baseURL: process.env.BASELINE_URL || 'http://localhost:4000' } },
    { name: 'upgraded', use: { baseURL: process.env.UPGRADED_URL || 'http://localhost:4200' } },
  ],
});
