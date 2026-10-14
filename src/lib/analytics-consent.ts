export type Choice = 'granted' | 'denied' | null;
export const CONSENT_KEY = 'dotsdashes.analytics.v1';
export interface ConsentStore {getItem(key:string):string|null;setItem(key:string,value:string):void}
export function readConsent(store:ConsentStore):Choice {
  try {const value=store.getItem(CONSENT_KEY);return value==='granted'||value==='denied'?value:null;} catch{return null;}
}
export function saveConsent(store:ConsentStore,choice:Exclude<Choice,null>):boolean {
  try {store.setItem(CONSENT_KEY,choice);return readConsent(store)===choice;} catch{return false;}
}
export function safeReferrer(value:string):string {
  try {const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.origin+'/':'';} catch{return '';}
}
export function analyticsAllowed(env:string,host:string,path:string,noindex:boolean):boolean {
  return env==='production'&&host==='dotsdashes.com'&&!noindex&&/^\/(?:zh\/)?(?:(?:morse-code-alphabet|morse-code-generator|about|privacy)\/)?$/.test(path);
}
