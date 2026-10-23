import { spawn } from "node:child_process";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const server = spawn(process.execPath, ["scripts/start-ui-test.mjs"], {
  cwd: projectRoot,
  env: process.env,
  stdio: ["ignore", "pipe", "pipe"],
});

let serverOutput = "";
const retainServerOutput = chunk => {
  serverOutput = `${serverOutput}${chunk}`.slice(-20_000);
};
server.stdout.on("data", retainServerOutput);
server.stderr.on("data", retainServerOutput);

const waitForServer = async () => {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`UI test server exited early.\n${serverOutput}`);
    }
    try {
      const response = await fetch("http://127.0.0.1:3000/healthz");
      if (response.ok) return;
    } catch {
      // The production server is still starting.
    }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for the UI test server.\n${serverOutput}`);
};

const waitForExit = (child, timeoutMs) =>
  Promise.race([
    new Promise(resolve => child.once("close", () => resolve(true))),
    new Promise(resolve => setTimeout(() => resolve(false), timeoutMs)),
  ]);

const stopServer = async () => {
  if (server.exitCode !== null) return;
  server.kill();
  if (!(await waitForExit(server, 5_000))) {
    server.kill("SIGKILL");
    await waitForExit(server, 2_000);
  }
};

let exitCode = 1;
try {
  await waitForServer();
  const playwright = spawn(
    process.execPath,
    ["node_modules/@playwright/test/cli.js", "test", ...process.argv.slice(2)],
    {
      cwd: projectRoot,
      env: { ...process.env, SEG_UI_EXTERNAL_SERVER: "true" },
      stdio: "inherit",
    }
  );
  exitCode = await new Promise(resolve =>
    playwright.once("close", code => resolve(code ?? 1))
  );
} catch (error) {
  console.error(error);
} finally {
  await stopServer();
}

process.exitCode = exitCode;
