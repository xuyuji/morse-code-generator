// No queued history: actions before consent are discarded by the consent module.
export function trackAction(tool:'translator'|'generator'|'alphabet'|'numbers',action:'copy_success'|'copy_fallback'|'audio_start'|'audio_stop'|'audio_error'|'wav_created'|'wav_error'|'reference_play',language:'en'|'zh') {
 window.dispatchEvent(new CustomEvent('dotsdashes:action',{detail:{tool,action,language}}));
}
