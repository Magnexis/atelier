import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "apps", "studio");
const types = { ".css": "text/css", ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml" };
const server = createServer(async (request, response) => {
  const requestPath = request.url === "/" ? "/index.html" : request.url.split("?")[0];
  const path = normalize(join(root, requestPath));
  if (!path.startsWith(root)) { response.writeHead(403); response.end("Forbidden"); return; }
  try {
    const file = await stat(path);
    if (!file.isFile()) throw new Error("Not a file");
    response.writeHead(200, { "content-type": `${types[extname(path)] ?? "application/octet-stream"}; charset=utf-8"` });
    response.end(await readFile(path));
  } catch {
    response.writeHead(404); response.end("Not found");
  }
});

const preferredPort = Number(process.env.PORT ?? 4173);
const start = (port) => {
  server.once("error", (error) => {
    if (error.code === "EADDRINUSE" && port === preferredPort) {
      start(port + 1);
      return;
    }
    throw error;
  });
  server.listen(port, "127.0.0.1", () => console.log(`Atelier Studio available at http://127.0.0.1:${port}`));
};

start(preferredPort);
