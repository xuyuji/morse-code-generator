export type Signal = { tone: boolean; start: number; duration: number; token: number };
export type Timeline = { events: Signal[]; duration: number };
export const MAX_AUDIO_SECONDS = 180;
/** PARIS standard: dot=1, dash=3, element gap=1, letter gap=3, word gap=7. */
export function timeline(morse:string, wpm=20, effectiveWpm=wpm):Timeline {
  if(!Number.isFinite(wpm)||wpm<5||wpm>40||!Number.isFinite(effectiveWpm)||effectiveWpm<5||effectiveWpm>wpm)throw new RangeError('Invalid speed');
  const unit=1.2/wpm;
  const gapUnit=(60/effectiveWpm-31*unit)/19;
  const events:Signal[]=[]; let time=0;
  const tokens=morse.trim().split(/\s+/).filter(Boolean);
  const add=(tone:boolean,duration:number,token:number)=>{events.push({tone,start:time,duration,token});time+=duration;};
  tokens.forEach((token,i)=>{
    if(token==='/')return;
    if(!/^[.-]+$/.test(token))throw new Error('Invalid Morse');
    if(i>0)add(false,(tokens[i-1]==='/'?7:3)*gapUnit,i);
    [...token].forEach((part,j)=>{if(j>0)add(false,unit,i);add(true,(part==='.'?1:3)*unit,i);});
  });
  return {events,duration:time};
}
export function envelope(time:number,duration:number):number {
  return Math.min(1,time/0.004,Math.max(0,(duration-time)/0.004));
}
export function wav(signal:Timeline,frequency=600):Uint8Array {
  if(signal.duration>MAX_AUDIO_SECONDS)throw new RangeError('Audio too long');
  if(!Number.isFinite(frequency)||frequency<300||frequency>1000)throw new RangeError('Invalid frequency');
  const rate=22050, samples=Math.ceil(signal.duration*rate), data=new Uint8Array(44+samples*2), view=new DataView(data.buffer);
  const ascii=(offset:number,text:string)=>[...text].forEach((c,i)=>view.setUint8(offset+i,c.charCodeAt(0)));
  ascii(0,'RIFF');view.setUint32(4,36+samples*2,true);ascii(8,'WAVE');ascii(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,rate,true);view.setUint32(28,rate*2,true);view.setUint16(32,2,true);view.setUint16(34,16,true);ascii(36,'data');view.setUint32(40,samples*2,true);
  for(const event of signal.events){if(!event.tone)continue;const begin=Math.round(event.start*rate),end=Math.min(samples,Math.round((event.start+event.duration)*rate));for(let i=begin;i<end;i++){const t=i/rate-event.start;view.setInt16(44+i*2,Math.round(Math.sin(2*Math.PI*frequency*t)*0.22*envelope(t,event.duration)*32767),true);}}
  return data;
}
