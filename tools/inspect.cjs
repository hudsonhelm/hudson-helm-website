// Read-only source inventory; regex checks are triage, not an HTML validator.
const fs = require('node:fs'), path = require('node:path');
const root = path.resolve(__dirname,'..');
const files = fs.readdirSync(root).filter(f=>f.endsWith('.html'));
function attrs(tag) { return Object.fromEntries([...tag.matchAll(/([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(m=>[m[1],m[2] ?? m[3]])); }
for (const file of files) {
 const html=fs.readFileSync(path.join(root,file),'utf8');
 const ids=[...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]);
 const tags=[...html.matchAll(/<(?:a|img|script|link|form)\b[^>]*>/g)].map(m=>attrs(m[0]));
 const refs=tags.flatMap(t=>[t.href,t.src,t.action].filter(Boolean));
 const local=refs.filter(r=>!/^([a-z]+:|\/\/|#)/i.test(r)).map(r=>r.split(/[?#]/)[0]);
 const headings=[...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)].map(m=>m[1]+': '+m[2].replace(/<[^>]*>/g,'').trim());
 console.log(JSON.stringify({file,title:html.match(/<title>(.*?)<\/title>/)?.[1],headings,inlineStyleBytes:[...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].reduce((n,m)=>n+m[1].length,0),missing:[...new Set(local.filter(r=>!fs.existsSync(path.join(root,r))))],duplicateIds:[...new Set(ids.filter((id,i)=>ids.indexOf(id)!==i))],scripts:tags.filter(t=>t.src?.endsWith('.js')).map(t=>t.src),external:refs.filter(r=>/^https?:/.test(r)),meta:[...html.matchAll(/<meta\b[^>]*>/g)].map(m=>attrs(m[0])),header:html.match(/<header\b[\s\S]*?<\/header>/)?.[0].replace(/\s+/g,' '),footer:html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0].replace(/\s+/g,' ')},null,2));
}
const all=[];
function walk(dir) { for(const entry of fs.readdirSync(dir,{withFileTypes:true})) { if(entry.name.startsWith('.')) continue; const full=path.join(dir,entry.name); if(entry.isDirectory()) walk(full); else all.push(full); } }
walk(root);
const cssMissing=[];
for(const full of all.filter(f=>f.endsWith('.css'))) {
 for(const match of fs.readFileSync(full,'utf8').matchAll(/url\(\s*["']?([^\s)"']+)["']?\s*\)/g)) {
  const ref=match[1]; if(/^(?:https?:|data:|\/\/|#)/.test(ref))continue;
  if(!fs.existsSync(path.resolve(path.dirname(full),ref.split(/[?#]/)[0]))) cssMissing.push({file:path.relative(root,full),ref});
 }
}
console.log(JSON.stringify({inventory:all.reduce((out,f)=>{const ext=path.extname(f);out[ext]=(out[ext]||0)+1;return out;},{}),cssMissing},null,2));
