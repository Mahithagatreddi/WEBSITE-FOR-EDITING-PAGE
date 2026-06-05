import { chromium, devices } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ ...devices["iPhone 13"] });
const page = await context.newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.screenshot({ path: "mobile-preview.png", fullPage: true });
await browser.close();
console.log("Saved mobile-preview.png");
