import { execFileSync } from "node:child_process";

const tracked = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" }).split("\0").filter(Boolean);
const forbidden = tracked.filter(file => /(^|\/)(dist|node_modules|coverage|\.manus-logs)\//.test(file) || /\.(log|zip|env)$/i.test(file));

if (forbidden.length) {
  console.error("Generated, secret, or archive artifacts must not be tracked:\n" + forbidden.join("\n"));
  process.exit(1);
}
console.log("Repository hygiene check passed. Canonical source is defined in docs/architecture/SOURCE_OF_TRUTH.md.");
