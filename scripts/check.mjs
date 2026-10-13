import { readFile, readdir } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

let failures=0, checked=0;
async function walk(dir){for(const file of await readdir(dir,{withFileTypes:true})){if(file.name.startsWith('.')||file.name==='node_modules')continue;const path=join(dir,file.name);if(file.isDirectory())await walk(path);else if(path.endsWith('.md')){const source=await readFile(path,'utf8');for(const match of source.matchAll(/\]\(([^)]+)\)/g)){const href=match[1];if(/^[a-z]+:|^#/.test(href))continue;checked++;if(!existsSync(resolve(dirname(path),href.split('#')[0]))){console.error('Broken local link:',path,href);failures++;}}}}}
await walk('.');
for(const file of ['scripts/preview.mjs','prototypes/app.js'])execFileSync(process.execPath,['--check',file],{stdio:'inherit'});
for(const file of ['prototypes/index.html','prototypes/styles.css','prototypes/app.js'])if(!existsSync(file))failures++;
console.log(`Checked ${checked} local documentation links and prototype script syntax. ${failures} errors.`);
process.exitCode=failures?1:0;
