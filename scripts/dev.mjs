import { spawn } from "node:child_process";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const value = (name) => { const index = args.indexOf(name); return index >= 0 ? args[index + 1] : undefined; };
const port = value("--port") || process.env.PORT || "3000";
const host = value("--hostname") || value("--host") || "0.0.0.0";
// Accept common dev-runner host/port options; Next uses --hostname and is strict about ports.
const child = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "dev", "--hostname", host, "--port", port], { stdio: "inherit" });
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
child.on("exit", code => process.exit(code ?? 0));
