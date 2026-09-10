// Inspection-only static preview. Never serves PHP, configuration or Git files.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.woff':'font/woff', '.woff2':'font/woff2', '.ttf':'font/ttf', '.eot':'application/vnd.ms-fontobject'};
http.createServer((req,res) => {
  res.setHeader('Cache-Control','no-store');
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405); return res.end('Preview blocks submissions.'); }
  let name;
  try { name = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400); return res.end(); }
  if (name === '/') name = '/index.html';
  const file = path.resolve(root, '.' + name);
  const relative = path.relative(root,file);
  const ext = path.extname(file).toLowerCase();
  if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(/[\\/]/).some(p=>p.startsWith('.')) || !types[ext]) { res.writeHead(403); return res.end('Not available in static preview.'); }
  fs.readFile(file,(error,bytes)=>{
    if (error) {res.writeHead(404); return res.end('Not found');}
    res.writeHead(200,{'Content-Type':types[ext]}); res.end(req.method==='HEAD' ? undefined : bytes);
  });
}).listen(8087,'127.0.0.1',()=>console.log('Static preview: http://127.0.0.1:8087 (PHP and submissions blocked)'));
