import { MAX_AUDIO_SECONDS, type Timeline } from '../core/timing';
export class Player {
  private context:AudioContext|undefined;
  private nodes:OscillatorNode[]=[];
  private frame=0;
  private generation=0;
  private finish:(()=>void)|undefined;
  stop(){this.generation++;cancelAnimationFrame(this.frame);for(const node of this.nodes){try{node.stop();}catch{}node.disconnect();}this.nodes=[];const done=this.finish;this.finish=undefined;done?.();}
  async play(signal:Timeline,frequency:number,onProgress:(index:number)=>void,onDone:()=>void){
    this.stop();
    if(signal.duration>MAX_AUDIO_SECONDS)throw new Error('Audio too long');
    const generation=this.generation;
    this.context??=new AudioContext();
    await this.context.resume();
    if(generation!==this.generation)return;
    if(this.context.state!=='running')throw new Error('Audio unavailable');
    this.finish=onDone;
    const start=this.context.currentTime+0.05;
    for(const event of signal.events){if(!event.tone)continue;const oscillator=this.context.createOscillator(),gain=this.context.createGain(),at=start+event.start,end=at+event.duration;oscillator.frequency.value=frequency;gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(0.22,at+0.004);gain.gain.setValueAtTime(0.22,end-0.004);gain.gain.linearRampToValueAtTime(0,end);oscillator.connect(gain);gain.connect(this.context.destination);oscillator.start(at);oscillator.stop(end);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};this.nodes.push(oscillator);}
    const tick=()=>{if(generation!==this.generation)return;if(this.context!.state!=='running'){this.stop();return;}const time=this.context!.currentTime-start;if(time>=signal.duration){this.stop();return;}const event=signal.events.find(e=>time>=e.start&&time<e.start+e.duration);onProgress(event?.tone?event.token:-1);this.frame=requestAnimationFrame(tick);};tick();
  }
}
