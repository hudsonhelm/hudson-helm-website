const { chromium, firefox } = require('playwright');

const baseUrl = process.env.HH_PREVIEW_URL || 'http://127.0.0.1:8087';
const browserName = process.env.HH_BROWSER || 'chromium';
const browserType = browserName === 'firefox' ? firefox : chromium;
const executablePath = process.env.HH_BROWSER_PATH || (browserName === 'firefox'
  ? 'C:\\Program Files\\Mozilla Firefox\\firefox.exe'
  : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe');
const pages = [
  'index.html',
  'whatwedo.html',
  'whyhudsonhelm.html',
  'whoweare.html',
  'areweagoodfit.html',
  'starthere.html',
  'support.html',
  'privacy.html',
  '404.html',
];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'phone', width: 390, height: 844 },
];
const failures = [];

function fail(label, message) {
  failures.push(`${label}: ${message}`);
}

(async () => {
  const browser = await browserType.launch({ executablePath, headless: true });
  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({ viewport });
      for (const file of pages) {
        const label = `${file} at ${viewport.width}px`;
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', (error) => errors.push(`page error: ${error.message}`));
        page.on('console', (message) => {
          if (message.type() === 'error' && !/challenges\.cloudflare\.com|Turnstile|ERR_NETWORK_ACCESS_DENIED|status of 403 \(Forbidden\)/i.test(message.text())) {
            errors.push(`console error: ${message.text()}`);
          }
        });
        await page.goto(`${baseUrl}/${file}`, { waitUntil: 'load' });
        const result = await page.evaluate(() => {
          const toggler = document.querySelector('.navbar-toggler');
          const visible = (element) => Boolean(element && element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden');
          return {
            innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            h1Count: document.querySelectorAll('h1').length,
            brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.getAttribute('src')),
            togglerVisible: visible(toggler),
            mainVisible: visible(document.querySelector('main')),
            footerVisible: visible(document.querySelector('footer')),
            serviceContainerPadding: getComputedStyle(document.querySelector('.hh-service-section .container') || document.body).paddingLeft,
            overflowers: [...document.querySelectorAll('body *')]
              .map((element) => ({
                selector: `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ''}${element.classList.length ? `.${[...element.classList].join('.')}` : ''}`,
                left: Math.round(element.getBoundingClientRect().left),
                right: Math.round(element.getBoundingClientRect().right),
              }))
              .filter(({ left, right }) => left < -1 || right > innerWidth + 1)
              .slice(0, 8),
          };
        });
        if (result.scrollWidth > result.innerWidth + 1) fail(label, `horizontal overflow ${result.scrollWidth}px > ${result.innerWidth}px; service padding ${result.serviceContainerPadding}; ${JSON.stringify(result.overflowers)}`);
        if (result.h1Count !== 1) fail(label, `expected one H1, found ${result.h1Count}`);
        if (result.brokenImages.length) fail(label, `broken images: ${result.brokenImages.join(', ')}`);
        if (!result.mainVisible || !result.footerVisible) fail(label, 'main content or footer is not visible');
        if (viewport.width >= 1366 && result.togglerVisible) fail(label, 'mobile navigation toggle is visible at desktop width');
        if (viewport.width <= 1024 && !result.togglerVisible) fail(label, 'mobile navigation toggle is hidden at tablet/phone width');

        if (viewport.width <= 1024) {
          await page.locator('.navbar-toggler').click();
          const mobileStartHereVisible = await page.locator('.hh-mobile-only a[href="starthere.html"]').isVisible();
          if (!mobileStartHereVisible) fail(label, 'expanded mobile navigation does not expose Start Here');
        }

        await page.keyboard.press('Tab');
        const focus = await page.evaluate(() => {
          const element = document.activeElement;
          const style = element ? getComputedStyle(element) : null;
          return {
            tag: element?.tagName || '',
            outline: style?.outlineStyle || 'none',
            outlineWidth: style?.outlineWidth || '0px',
            boxShadow: style?.boxShadow || 'none',
          };
        });
        if (focus.tag === 'BODY' || ((focus.outline === 'none' || focus.outlineWidth === '0px') && focus.boxShadow === 'none')) {
          fail(label, 'first keyboard focus target has no visible outline or shadow');
        }
        errors.forEach((error) => fail(label, error));
        await page.close();
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }

  if (failures.length) {
    console.error('Phase 10 browser QA failed:');
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }
  console.log(`Phase 10 ${browserName} QA passed: ${pages.length} pages across ${viewports.length} viewport classes.`);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
