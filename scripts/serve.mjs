import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../out");
const port = Number(process.env.PORT || 3000);
if (!fs.existsSync(path.join(root, "index.html"))) {
  console.error("Falta out/index.html. Ejecuta npm ci y npm run build.");
  process.exit(1);
}
const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css", ".js":"text/javascript", ".json":"application/json", ".txt":"text/plain; charset=utf-8", ".svg":"image/svg+xml", ".webp":"image/webp", ".png":"image/png", ".ico":"image/x-icon", ".woff2":"font/woff2" };
http.createServer((req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let file = path.resolve(root, "." + pathname);
    if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403); res.end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    let status = 200;
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { file = path.join(root, "404.html"); status = 404; }
    if (!fs.existsSync(file)) { res.writeHead(404); res.end("No encontrado"); return; }
    res.writeHead(status, { "Content-Type":mime[path.extname(file)] || "application/octet-stream", "X-Content-Type-Options":"nosniff", "Cache-Control":"no-cache" });
    if (req.method === "HEAD") { res.end(); return; }
    fs.createReadStream(file).pipe(res);
  } catch { res.writeHead(400); res.end("Solicitud inválida"); }
}).listen(port, "0.0.0.0", () => console.log("SK Lashes Studio: http://localhost:" + port));
