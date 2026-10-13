export function settings(onChange:()=>void){
 const speed=document.querySelector<HTMLInputElement>('#speed-number')!,pitch=document.querySelector<HTMLInputElement>('#pitch-number')!,effective=document.querySelector<HTMLInputElement>('#effective-number');
 for(const key of ['speed','effective','pitch']){
  const range=document.querySelector<HTMLInputElement>(`#${key}`),number=document.querySelector<HTMLInputElement>(`#${key}-number`);if(!range||!number)continue;
  for(const [source,target] of [[range,number],[number,range]])source!.addEventListener('input',()=>{if(source!.validity.valid&&source!.value!=='')target!.value=source!.value;if(key==='speed'&&effective&&speed.validity.valid&&speed.value!==''){const limit=Number(speed.value);effective.max=String(limit);const er=document.querySelector<HTMLInputElement>('#effective')!;er.max=String(limit);if(Number(effective.value)>limit){effective.value=String(limit);er.value=String(limit);}}
   document.querySelector('#settings-summary')!.textContent=`${speed.value||'—'} WPM · ${pitch.value||'—'} Hz`;onChange();});
 }
 return ()=>({speed:Number(speed.value),effective:Number(effective?.value??speed.value),pitch:Number(pitch.value),valid:[speed,pitch,...effective?[effective]:[]].every(x=>x.value!==''&&x.validity.valid)});
}
