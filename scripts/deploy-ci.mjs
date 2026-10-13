import {spawnSync} from 'node:child_process';import {readFileSync} from 'node:fs';
const target=process.argv[2];if(!['production','dev'].includes(target))throw new Error('Explicit production or dev target required');
const branch=process.env.WORKERS_CI_BRANCH??process.env.GITHUB_REF_NAME;
if(!branch)throw new Error('CI branch is required. For manual deploy, use Wrangler explicitly after building.');
if(target==='production'&&branch!=='main')throw new Error('Only main may deploy production.');
if(target==='dev'&&branch==='main'){console.log('main is excluded from dev deployments.');process.exit(0);}
const info=JSON.parse(readFileSync('.build-info.json','utf8'));if(info.environment!==target)throw new Error('Build environment does not match deploy target');
const args=['wrangler','deploy','--env',target==='dev'?'dev':''];const result=spawnSync('npx',args,{stdio:'inherit'});process.exit(result.status??1);
