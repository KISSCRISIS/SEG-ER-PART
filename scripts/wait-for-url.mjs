const url = process.argv[2];
if (!url) throw new Error("Usage: node scripts/wait-for-url.mjs <url>");

const deadline = Date.now() + 60_000;
while (Date.now() < deadline) {
  try {
    const response = await fetch(url);
    if (response.ok) process.exit(0);
  } catch {
    // Service is still starting.
  }
  await new Promise(resolve => setTimeout(resolve, 1_000));
}
throw new Error(`Timed out waiting for ${url}`);
