import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

const mode = process.argv[2] ?? 'light';
const port = mode === 'dark' ? 9224 : 9223;
const profile = `/tmp/seg-ui-patch1-${mode}`;
const base = 'http://127.0.0.1:4317';
const outputDir = `/home/ubuntu/seg-manus-status/SEG_UI_PATCH1_EVIDENCE/${mode}`;
mkdirSync(outputDir, { recursive: true });

const chromeArgs = [
  '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  ...(mode === 'dark' ? ['--force-dark-mode'] : []),
  `${base}/`,
];
const chrome = spawn('/usr/bin/chromium', chromeArgs, { stdio: 'ignore' });

async function getJson(url) {
  const response = await fetch(url);
  return response.json();
}

let version;
for (let i = 0; i < 60; i += 1) {
  try { version = await getJson(`http://127.0.0.1:${port}/json/version`); break; } catch { await sleep(100); }
}
if (!version?.webSocketDebuggerUrl) throw new Error(`CDP did not start on ${port}`);

function connect(url) {
  const ws = new WebSocket(url);
  const pending = new Map();
  let nextId = 0;
  ws.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result);
    }
  });
  const ready = new Promise((resolve, reject) => {
    ws.addEventListener('open', () => resolve(), { once: true });
    ws.addEventListener('error', reject, { once: true });
  });
  const command = async (method, params = {}) => {
    await ready;
    const id = ++nextId;
    const result = new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
    ws.send(JSON.stringify({ id, method, params }));
    return result;
  };
  return { ws, command, ready };
}

const browser = connect(version.webSocketDebuggerUrl);
await browser.ready;
let pageInfo;
for (let i = 0; i < 60; i += 1) {
  const pages = await getJson(`http://127.0.0.1:${port}/json/list`);
  pageInfo = pages.find(item => item.type === 'page' && item.webSocketDebuggerUrl);
  if (pageInfo) break;
  await sleep(100);
}
if (!pageInfo?.webSocketDebuggerUrl) throw new Error(`No page target available on ${port}`);
const page = connect(pageInfo.webSocketDebuggerUrl);
await page.ready;
await page.command('Page.enable');
await page.command('Runtime.enable');

const routes = [
  ['landing', '/'],
  ['login', '/login'],
  ['register', '/register'],
];
const widths = [320, 360, 390, 430];
const results = [];

const metricScript = (route) => `(() => {
  const rect = (selector) => {
    const node = document.querySelector(selector);
    if (!node) return null;
    const r = node.getBoundingClientRect();
    return { left: Math.round(r.left * 100) / 100, top: Math.round(r.top * 100) / 100, right: Math.round(r.right * 100) / 100, bottom: Math.round(r.bottom * 100) / 100, width: Math.round(r.width * 100) / 100, height: Math.round(r.height * 100) / 100 };
  };
  const targets = [...document.querySelectorAll('a[href], button, input, select, [role="button"], [role="radio"]')]
    .map((node) => { const r = node.getBoundingClientRect(); return { tag: node.tagName, label: (node.getAttribute('aria-label') || node.textContent || node.getAttribute('placeholder') || '').trim().replace(/\\s+/g, ' ').slice(0, 70), width: Math.round(r.width * 10) / 10, height: Math.round(r.height * 10) / 10 }; })
    .filter((item) => item.width > 0 && item.height > 0);
  const smallTargets = targets.filter((item) => item.width < 44 || item.height < 44).slice(0, 20);
  const focusSelector = ${JSON.stringify(route === 'landing' ? '.seg-landing-v4-action' : route === 'login' ? 'input[name="email"]' : 'input[name="fullName"]')};
  const focusNode = document.querySelector(focusSelector);
  focusNode?.focus();
  const focusStyle = focusNode ? getComputedStyle(focusNode) : null;
  return {
    theme: document.documentElement.dataset.segTheme || document.documentElement.className,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    document: { clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 },
    route: ${JSON.stringify(route)},
    keyRects: ${JSON.stringify(route === 'landing' ? { title: '.seg-landing-v4-copy h1', intro: '.seg-landing-v4-copy > p:not(.seg-landing-v4-kicker)', cta: '.seg-landing-v4-action', benefits: '.seg-landing-v4-benefits' } : route === 'login' ? { card: '.seg-login-v2-card', heading: '.seg-login-v2-heading', field: '.seg-login-v2-field', submit: '.seg-login-v2-submit', socials: '.seg-login-v2-socials', register: '.seg-login-v2-register-prompt' } : { form: '.seg-register-v2-form-shell', heading: '#register-title', field: '.seg-register-v2-field', roleGrid: '.seg-register-v2-role-grid', submit: '.seg-register-v2-submit' })}.replace(/\"/g, '\\"')},
    rects: {},
    firstViewport: {},
    focus: focusNode ? { selector: focusSelector, outlineStyle: focusStyle.outlineStyle, outlineWidth: focusStyle.outlineWidth, outlineColor: focusStyle.outlineColor, outlineOffset: focusStyle.outlineOffset } : null,
    interactive: { count: targets.length, under44px: smallTargets.length, examples: smallTargets },
  };
})()`;

// Replace the placeholder rect map in a second small evaluation to keep the selector map explicit.
const selectorMaps = {
  landing: { title: '.seg-landing-v4-copy h1', intro: '.seg-landing-v4-copy > p:not(.seg-landing-v4-kicker)', cta: '.seg-landing-v4-action', benefits: '.seg-landing-v4-benefits' },
  login: { card: '.seg-login-v2-card', heading: '.seg-login-v2-heading', field: '.seg-login-v2-field', submit: '.seg-login-v2-submit', socials: '.seg-login-v2-socials', register: '.seg-login-v2-register-prompt' },
  register: { form: '.seg-register-v2-form-shell', heading: '#register-title', field: '.seg-register-v2-field', roleGrid: '.seg-register-v2-role-grid', submit: '.seg-register-v2-submit' },
};

for (const [route, path] of routes) {
  for (const width of widths) {
    await page.command('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 1, mobile: true, screenWidth: width, screenHeight: 844 });
    await page.command('Page.navigate', { url: `${base}${path}` });
    await sleep(1200);
    const selectors = selectorMaps[route];
    const expression = `(() => {
      const rect = (selector) => { const node = document.querySelector(selector); if (!node) return null; const r = node.getBoundingClientRect(); return { left: Math.round(r.left*100)/100, top: Math.round(r.top*100)/100, right: Math.round(r.right*100)/100, bottom: Math.round(r.bottom*100)/100, width: Math.round(r.width*100)/100, height: Math.round(r.height*100)/100 }; };
      const nodes = [...document.querySelectorAll('a[href], button, input, select, [role="button"], [role="radio"]')];
      const targetData = nodes.map(node => { const r=node.getBoundingClientRect(); return { tag: node.tagName, label: (node.getAttribute('aria-label') || node.textContent || node.getAttribute('placeholder') || '').trim().replace(/\\s+/g,' ').slice(0,70), width: Math.round(r.width*10)/10, height: Math.round(r.height*10)/10 }; }).filter(item => item.width > 0 && item.height > 0);
      const focusSelector = ${JSON.stringify(route === 'landing' ? '.seg-landing-v4-action' : route === 'login' ? 'input[name="email"]' : 'input[name="fullName"]')};
      const focusNode = document.querySelector(focusSelector); focusNode?.focus(); const focusStyle = focusNode ? getComputedStyle(focusNode) : null; const focusParent = focusNode?.closest('.seg-login-v2-field, .seg-register-v2-field'); const focusParentStyle = focusParent ? getComputedStyle(focusParent) : null;
      return { theme: document.documentElement.dataset.segTheme || document.documentElement.className, viewport: { width: innerWidth, height: innerHeight }, document: { clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 }, route: ${JSON.stringify(route)}, rects: ${JSON.stringify(selectors)} && Object.fromEntries(Object.entries(${JSON.stringify(selectors)}).map(([key, selector]) => [key, rect(selector)])), focus: focusNode ? { selector: focusSelector, outlineStyle: focusStyle.outlineStyle, outlineWidth: focusStyle.outlineWidth, outlineColor: focusStyle.outlineColor, outlineOffset: focusStyle.outlineOffset, parent: focusParentStyle ? { borderColor: focusParentStyle.borderColor, boxShadow: focusParentStyle.boxShadow } : null } : null, interactive: { count: targetData.length, under44px: targetData.filter(item => item.width < 44 || item.height < 44).length, examples: targetData.filter(item => item.width < 44 || item.height < 44).slice(0, 12) } };
    })()`;
    const evalResult = await page.command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    const metrics = evalResult.result.value;
    const screenshot = await page.command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    const file = `${outputDir}/${route}-${width}x844.png`;
    writeFileSync(file, Buffer.from(screenshot.data, 'base64'));
    results.push({ ...metrics, file });
  }
}

writeFileSync(`${outputDir}/metrics.json`, JSON.stringify({ mode, results }, null, 2));
await page.command('Emulation.clearDeviceMetricsOverride');
page.ws.close(); browser.ws.close(); chrome.kill('SIGTERM');
console.log(JSON.stringify({ mode, count: results.length, metricsFile: `${outputDir}/metrics.json` }, null, 2));
