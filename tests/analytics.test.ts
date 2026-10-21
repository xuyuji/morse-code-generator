import test from 'node:test';
import assert from 'node:assert/strict';
import {analyticsAllowed,readConsent,saveConsent,safeReferrer} from '../src/lib/analytics-consent';
test('analytics excludes preview, unknown routes, noindex and lookalike hosts',()=>{
 assert.equal(analyticsAllowed('production','dotsdashes.com','/zh/morse-code-generator/',false),true);
 for(const args of [['dev','dotsdashes.com','/',false],['production','dev.dotsdashes.com','/',false],['production','dotsdashes.com.evil.test','/',false],['production','dotsdashes.com','/private-message/',false],['production','dotsdashes.com','/',true]] as const)assert.equal(analyticsAllowed(args[0],args[1],args[2],args[3]),false);
});
test('consent fails closed on missing, corrupt or inaccessible storage',()=>{
 for(const value of [null,'yes','true',''])assert.equal(readConsent({getItem:()=>value,setItem:()=>{}}),null);
 const blocked={getItem:()=>{throw Error('blocked')},setItem:()=>{throw Error('blocked')}};
 assert.equal(readConsent(blocked),null);assert.equal(saveConsent(blocked,'granted'),false);
 let saved:string|null=null;const store={getItem:()=>saved,setItem:(_:string,v:string)=>{saved=v}};
 assert.equal(saveConsent(store,'granted'),true);assert.equal(readConsent(store),'granted');assert.equal(saveConsent(store,'denied'),true);assert.equal(readConsent(store),'denied');
});
test('referrers never retain paths, credentials, queries or fragments',()=>{
 assert.equal(safeReferrer('https://name:secret@example.com/private?q=message#secret'),'https://example.com/');
 assert.equal(safeReferrer('javascript:alert(1)'),'');assert.equal(safeReferrer(''),'');
});

import {safeToolEvent} from '../src/lib/analytics-events';
test('action schema drops arbitrary content and rejects unknown actions',()=>{
 assert.deepEqual(safeToolEvent({tool:'numbers',action:'copy_success',language:'zh',input:'PRIVATE_DATE',output:'PRIVATE_RESULT',url:'secret',error:'secret'}),{tool:'numbers',action:'copy_success',language:'zh'});
 for(const value of [null,'secret',{tool:'numbers',action:'PRIVATE_INPUT',language:'en'},{tool:'secret',action:'copy_success',language:'en'}])assert.equal(safeToolEvent(value),null);
 assert.equal(analyticsAllowed('production','dotsdashes.com','/zh/morse-code-numbers/',false),true);
});
