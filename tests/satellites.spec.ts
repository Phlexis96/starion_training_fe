import { test, expect } from '@playwright/test';

test.describe('Satellite Tracker App', () => {

    test('should display the correct page title', async ({ page }) => {
        // 1. Navigate to your locally running Angular app
        await page.goto('http://localhost:4200');

        // 2. Check if the main heading exists and has the correct text
        const heading = page.locator('h2');
        await expect(heading).toHaveText('Earth Observation Satellites');
    });

    test('should display a table with satellite data', async ({ page }) => {
        await page.goto('http://localhost:4200');

        // 3. Wait for the table to appear (this implicitly waits for your API call to finish)
        const table = page.locator('table');
        await expect(table).toBeVisible();

        // 4. Verify that table headers exist
        await expect(page.locator('th').filter({ hasText: 'Name' })).toBeVisible();
        await expect(page.locator('th').filter({ hasText: 'Type' })).toBeVisible();
    });
});