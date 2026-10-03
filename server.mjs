import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const projectDir = dirname(fileURLToPath(import.meta.url));
const webRoot = resolve(projectDir, 'dist');
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp3': 'audio/mpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

if (!existsSync(resolve(webRoot, 'index.html'))) {
  console.error('The built story is missing. Run npm install, then npm run build.');
  process.exit(1);
}

const server = createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end('Bad request');
    return;
  }

  const requested = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const file = resolve(webRoot, requested);
  if (file !== webRoot && !file.startsWith(webRoot + sep)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  let info;
  try {
    info = statSync(file);
  } catch {
    response.writeHead(404).end('Not found');
    return;
  }
  if (!info.isFile()) {
    response.writeHead(404).end('Not found');
    return;
  }

  response.writeHead(200, {
    'Content-Type': types[extname(file).toLowerCase()] ?? 'application/octet-stream',
    'Content-Length': info.size,
    'Cache-Control': 'no-cache',
    'X-Content-Type-Options': 'nosniff',
  });
  if (request.method === 'HEAD') response.end();
  else createReadStream(file).pipe(response);
});

server.on('error', error => {
  if (error.code === 'EADDRINUSE' && port < 4183) {
    port += 1;
    server.listen(port, '127.0.0.1');
    return;
  }
  console.error(`Could not start the story server: ${error.message}`);
  process.exit(1);
});

let port = 4173;
server.listen(port, '127.0.0.1', () => {
  const url = `http://127.0.0.1:${port}/`;
  console.log(`The story is open at ${url}`);
  console.log('Keep this window open while viewing the story. Close it to stop the server.');
  if (process.platform === 'win32') {
    spawn('cmd.exe', ['/c', 'start', '', url], { detached: true, stdio: 'ignore', windowsHide: true }).unref();
  }
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
