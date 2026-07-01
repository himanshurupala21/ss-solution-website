import { chromium } from "playwright";
import { PNG } from "pngjs";

const url = "http://127.0.0.1:5173/";
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForSelector("canvas", { timeout: 15000 });
  await page.waitForTimeout(1200);
  const titleVisible = await page.getByText("WE BUILD DIGITAL BRANDS").isVisible();
  const canvasStats = await page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return { found: false, width: 0, height: 0, litPixels: 0 };
    const rect = canvas.getBoundingClientRect();
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return { found: true, width: rect.width, height: rect.height, litPixels: 0 };
    const width = Math.max(1, gl.drawingBufferWidth);
    const height = Math.max(1, gl.drawingBufferHeight);
    return { found: true, width: rect.width || width, height: rect.height || height, litPixels: 0 };
  });

  const screenshot = await page.screenshot({ path: `artifacts/ss-solution-${viewport.name}.png`, fullPage: false });
  const png = PNG.sync.read(screenshot);
  let visibleScenePixels = 0;
  const xStart = Math.floor(png.width * 0.28);
  const xEnd = Math.floor(png.width * 0.72);
  const yStart = Math.floor(png.height * 0.1);
  const yEnd = Math.floor(png.height * 0.26);
  for (let y = yStart; y < yEnd; y += 2) {
    for (let x = xStart; x < xEnd; x += 2) {
      const offset = (png.width * y + x) * 4;
      const r = png.data[offset];
      const g = png.data[offset + 1];
      const b = png.data[offset + 2];
      const brightness = r + g + b;
      const colorRange = Math.max(r, g, b) - Math.min(r, g, b);
      if (brightness > 38 && colorRange > 24) visibleScenePixels += 1;
    }
  }
  await page.close();

  if (!titleVisible) throw new Error(`${viewport.name}: hero title is not visible`);
  console.log(`${viewport.name}: canvas`, canvasStats);
  if (!canvasStats.found || canvasStats.width < 100 || canvasStats.height < 100) {
    throw new Error(`${viewport.name}: canvas is missing or too small`);
  }
  if (visibleScenePixels < 20) throw new Error(`${viewport.name}: rendered scene appears blank`);
  console.log(`${viewport.name}: ok`, { visibleScenePixels });
}

await browser.close();
