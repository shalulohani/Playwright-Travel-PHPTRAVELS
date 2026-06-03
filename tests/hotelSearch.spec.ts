import { test, expect } from "@playwright/test";

test("Search hotels in Dubai", async ({ page }) => {
  await page.goto("https://phptravels.net/", { waitUntil: "domcontentloaded" });

  // Wait for Hotels tab to appear and be stable
  const hotelsTab = page.locator('a[data-bs-target="#hotels"]');
  await page.waitForLoadState("networkidle");
  await hotelsTab.waitFor({ state: "visible", timeout: 90000 });
  await page.waitForTimeout(2000); // small CI delay
  await hotelsTab.click();

  // Search city
  await page.fill('input[placeholder="Search by City"]', "Dubai");

  // Wait for autocomplete and click first result
  await page.locator('.autocomplete-result').first().waitFor({ state: "visible", timeout: 30000 });
  await page.click('.autocomplete-result');

  // Select check‑in date
  await page.click('input[name="checkin"]');
  await page.locator('td.day:not(.old):not(.new)').first().click();

  // Select check‑out date
  await page.click('input[name="checkout"]');
  await page.locator('td.day:not(.old):not(.new)').nth(3).click();

  // Submit search
  await page.click('button[type="submit"]');

  // Validate results
  await expect(page.locator("h2")).toContainText("Hotels in Dubai");
});
