const tools=['translator','generator','alphabet','numbers'];
const actions=['copy_success','copy_fallback','audio_start','audio_stop','audio_error','wav_created','wav_error','reference_play'];
/** Construct a fresh allowlisted payload. Never forward arbitrary event properties. */
export function safeToolEvent(value:unknown):{tool:string;action:string;language:string}|null {
 if(!value||typeof value!=='object')return null;
 const v=value as Record<string,unknown>;
 if(typeof v.tool!=='string'||!tools.includes(v.tool)||typeof v.action!=='string'||!actions.includes(v.action)||!['en','zh'].includes(String(v.language)))return null;
 return {tool:v.tool,action:v.action,language:String(v.language)};
}
