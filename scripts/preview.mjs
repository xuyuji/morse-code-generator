import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';

const root = resolve('prototypes');
const files = new Set(['/index.html', '/compare.html', '/styles.css', '/app.js']);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  const file = path === '/' ? '/index.html' : path;
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Cache-Control', 'no-store');
  if (!files.has(file)) { res.writeHead(404); res.end('Not found'); return; }
  try { res.setHeader('Content-Type', types[extname(file)]); res.end(await readFile(root + file)); }
  catch { res.writeHead(500); res.end('Preview unavailable'); }
}).listen(4173, '127.0.0.1', () => console.log('Design preview: http://127.0.0.1:4173/?variant=A'));
