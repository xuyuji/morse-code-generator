// Exercise the shipped consent bundle against a minimal DOM adapter; no browser/network.
import {readFileSync,readdirSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const file=readdirSync('dist/_astro').find(name=>name.startsWith('Analytics.')&&name.endsWith('.js'));
const code=readFileSync('dist/_astro/'+file,'utf8');
function page({choice=null,blocked=false,host='dotsdashes.com',env='production',path='/zh/'}={}){
 const handlers={},nodes={},scripts=[],cookies=[];let stored=choice,reloads=0;
 const element=(key)=>nodes[key]??=( {dataset:{env,id:'G-CKK50DSR0C'},hidden:true,textContent:'',focus(){},addEventListener(event,fn){handlers[key+':'+event]=fn;}} );
 const document={documentElement:{lang:'zh-Hans'},title:'Safe page title',referrer:'https://example.com/private?secret=123',body:{classList:{toggle(){}}},querySelector:s=>s.startsWith('meta[')?null:element(s),createElement:()=>({}),head:{append:s=>scripts.push(s)}};
 Object.defineProperty(document,'cookie',{get:()=> '_ga=abc; _ga_CKK50DSR0C=def; unrelated=keep',set:value=>cookies.push(value)});
 const location={hostname:host,pathname:path,search:'?message=secret',hash:'#secret',reload:()=>reloads++};
 const window={addEventListener:(event,fn)=>handlers[event]=fn};
 const localStorage={getItem:()=>{if(blocked)throw Error('blocked');return stored;},setItem:(_key,value)=>{if(blocked)throw Error('blocked');stored=value;}};
 vm.runInNewContext(code,{document,window,location,localStorage,URL,Date,encodeURIComponent});
 return {scripts,cookies,nodes,window,action:detail=>handlers['dotsdashes:action']?.({detail}),click:id=>handlers[id+':click'](),storage:value=>{stored=value;handlers.storage({key:'dotsdashes.analytics.v1'});},get reloads(){return reloads;}};
}
let p=page();assert.equal(p.scripts.length,0);p.click('#analytics-reject');assert.equal(p.scripts.length,0);
p=page({choice:'denied'});assert.equal(p.scripts.length,0);p.click('#analytics-reject');p.click('#analytics-accept');assert.equal(p.window['ga-disable-G-CKK50DSR0C'],false);assert.equal(p.scripts.length,1);
p=page();p.click('#analytics-accept');p.click('#analytics-accept');assert.equal(p.scripts.length,1);
const commands=p.window.dataLayer.map(item=>Array.from(item));assert.equal(commands.filter(item=>item[0]==='event'&&item[1]==='page_view').length,1);
assert.ok(!JSON.stringify(commands).includes('secret'));assert.ok(commands.some(item=>item[0]==='config'&&item[2].send_page_view===false&&item[2].allow_google_signals===false));
p.click('#analytics-reject');assert.equal(p.window['ga-disable-G-CKK50DSR0C'],true);assert.equal(p.reloads,1);assert.ok(p.cookies.length>0);assert.ok(p.cookies.every(item=>!item.startsWith('unrelated=')));
p=page({choice:'granted'});p.storage('denied');assert.equal(p.reloads,1);
p=page({blocked:true});p.click('#analytics-accept');assert.equal(p.scripts.length,0);assert.match(p.nodes['#analytics-status'].textContent,/统计保持关闭/);
for(const options of [{host:'dev.dotsdashes.com',choice:'granted'},{env:'dev',choice:'granted'},{path:'/private/',choice:'granted'}])assert.equal(page(options).scripts.length,0);
console.log('Shipped analytics: consent, one page_view, URL sanitization, withdrawal, cross-tab rejection and environment gates passed.');

p=page();p.action({tool:'numbers',action:'copy_success',language:'en'});assert.equal(p.window.dataLayer,undefined);
p.click('#analytics-accept');p.action({tool:'numbers',action:'copy_success',language:'en',input:'PRIVATE_DATE',output:'PRIVATE_RESULT'});
let actions=p.window.dataLayer.map(item=>Array.from(item)).filter(item=>item[0]==='event'&&typeof item[1]==='string'&&item[1].startsWith('tool_'));assert.equal(actions.length,1);assert.equal(JSON.stringify(actions[0][2]),JSON.stringify({tool:'numbers',action:'copy_success',language:'en'}));
p.action({tool:'numbers',action:'PRIVATE_DATE',language:'en'});p.click('#analytics-reject');p.action({tool:'numbers',action:'copy_success',language:'en'});
assert.equal(p.window.dataLayer.map(item=>Array.from(item)).filter(item=>item[0]==='event'&&typeof item[1]==='string'&&item[1].startsWith('tool_')).length,1);
assert.ok(!JSON.stringify(p.window.dataLayer).includes('PRIVATE_'));
for(const options of [{env:'dev'},{host:'dev.dotsdashes.com'}]){const blockedPage=page({...options,choice:'granted'});blockedPage.action({tool:'numbers',action:'copy_success',language:'en'});assert.equal(blockedPage.window.dataLayer,undefined);}
console.log('Action events: allowlisted parameters, no pre-consent replay, withdrawn and dev events blocked.');
