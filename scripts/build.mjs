import {spawnSync} from 'node:child_process';import {appendFileSync,writeFileSync} from 'node:fs';
const target=process.argv[2]??'production';if(!['production','dev'].includes(target))throw new Error('Unknown build target');
const result=spawnSync('npm',['run','build'],{stdio:'inherit',env:{...process.env,PUBLIC_SITE_ENV:target}});if(result.status!==0)process.exit(result.status??1);
if(target==='dev'){appendFileSync('dist/_headers','\n/*\n  X-Robots-Tag: noindex, nofollow, noarchive\n');writeFileSync('dist/robots.txt','User-agent: *\nDisallow: /\n');}
writeFileSync('.build-info.json',JSON.stringify({environment:target,commit:process.env.WORKERS_CI_COMMIT_SHA??process.env.GITHUB_SHA??'local'}));
