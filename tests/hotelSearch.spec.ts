import { test, expect } from "@playwright/test";

test("Search hotels in Dubai", async ({ page }) => {
  await page.goto("https://phptravels.net/");

  await page.click('a[data-bs-target="#hotels"]');
  await page.fill('input[placeholder="Search by City"]', "Dubai");
  await page.click('.autocomplete-result');

  await page.click('input[name="checkin"]');
  await page.click('td.day:not(.old):not(.new)');

  await page.click('input[name="checkout"]');
  await page.click('td.day:not(.old):not(.new):nth-child(3)');

  await page.click('button[type="submit"]');

  await expect(page.locator("h2")).toContainText("Hotels in Dubai");
});
