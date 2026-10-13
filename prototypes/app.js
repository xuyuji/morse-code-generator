// Design-review prototype. Rewrite against production specs after a direction is chosen.
const codes = '.- -... -.-. -.. . ..-. --. .... .. .--- -.- .-.. -- -. --- .--. --.- .-. ... - ..- ...- .-- -..- -.-- --.. ----- .---- ..--- ...-- ....- ..... -.... --... ---.. ----.'.split(' ');
const map = Object.fromEntries([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'].map((c,i)=>[c,codes[i]]));
Object.assign(map,{'.':'.-.-.-',',':'--..--','?':'..--..','!':'-.-.--',"'":'.----.','/':'-..-.','(':'-.--.',')':'-.--.-',':':'---...','=':'-...-','+':'.-.-.','-':'-....-','"':'.-..-.','@':'.--.-.'});
const reverse = Object.fromEntries(Object.entries(map).map(([a,b])=>[b,a]));
const names = {A:'清晰工具台',B:'信号控制台',C:'纸上电报码'};
const descriptions = {
 A:['01 / CLEAR UTILITY','安静、顺手、通用。','输入与结果组成一个完整工具。底部两个常用动作；专业设置藏在一层之后。','适合主站长期扩展：Morse、Base64 和二进制都能沿用。','#f5f7f7','#176459','#e3f0e9'],
 B:['02 / SIGNAL CONSOLE','一台掌心里的信号仪。','纵向输入、信号显示与播放控制。深色层级强调结果，参数按需展开。','适合音频与练习；默认参数可直接使用，不需要先学会调参。','#111d26','#85e5cd','#334954'],
 C:['03 / FIELD NOTES','把编码变成一张小纸条。','连续的编号步骤，纸张、墨色和点划。输入和解读在一条自然的阅读路径上。','适合学习、课堂与手作；没有 Next 按钮，仍然输入即出结果。','#f7f2e7','#315344','#99552d']
};
const app = document.querySelector('#app');
if(new URLSearchParams(location.search).get('embed')==='1')document.body.classList.add('embedded');
let variant = new URLSearchParams(location.search).get('variant') || 'A';
if (!names[variant]) variant='A';
let input='HELLO WORLD', mode='encode', speed=20, pitch=600, result='', morse='', errors=[];
let context=null, playing=false, timer=null, playbackToken=0;
const iconPlay='▶', iconCopy='⧉';
function header(){return `<header class="topbar"><a class="brand" href="#translator"><span class="brand-mark">••−</span>${variant==='B'?'SIGNAL / DESK':variant==='C'?'Signal desk.':'signal desk'}</a><details class="menu"><summary aria-label="Open menu">≡</summary><div class="menu-links"><a href="#translator">Translator</a><a href="#reference">Alphabet reference</a><a href="#guide">How to use</a></div></details></header>`;}
function title(){return `<div class="heading"><div class="eyebrow">${variant==='B'?'TRANSMISSION TOOL / 001':variant==='C'?'A LITTLE LANGUAGE OF DOTS & DASHES':'SMALL SIGNALS. CLEAR MESSAGES.'}</div><h1>Morse Code<br class="mobile-break"> Translator</h1><p>Translate text, hear the signal.</p></div>`;}
function modes(){return `<div class="mode" role="group" aria-label="Translation direction"><button data-mode="encode" aria-pressed="${mode==='encode'}">Text → Morse</button><button data-mode="decode" aria-pressed="${mode==='decode'}">Morse → Text</button></div>`;}
function field(){return `<div class="field"><div class="field-top"><label for="message">${mode==='encode'?'YOUR MESSAGE':'MORSE INPUT'}</label><button class="quiet" data-clear>Clear ×</button></div><textarea id="message" maxlength="300" spellcheck="false" autocapitalize="off" autocomplete="off" aria-describedby="input-help status" placeholder="${mode==='encode'?'Type your message…':'... --- ... / .... ..'}"></textarea><div class="field-foot"><span id="input-help">${mode==='encode'?'A–Z, 0–9 & punctuation':'Space = letter · / = word'}</span><span id="count"></span></div></div>${mode==='decode'?'<div class="pad" aria-label="Morse input keys"><button data-key=".">• Dot</button><button data-key="-">− Dash</button><button data-key=" ">Space</button><button data-key=" / ">/ Word</button></div>':''}`;}
function output(){return `<section class="output-panel" aria-label="Translation result"><div class="output-heading"><span>${mode==='encode'?'MORSE CODE':'DECODED TEXT'}</span><span><i class="status-dot"></i><span id="output-state">READY</span></span></div><output id="result" for="message" class="code-output" aria-live="off"></output>${variant==='B'?'<div class="signal-meter" aria-hidden="true"></div><div class="signal-label"><span>PREVIEW / NOT A RECORDING</span><span id="duration"></span></div>':''}</section>`;}
function actions(){return `<div class="actions"><button class="primary" data-play>${iconPlay} Play signal</button><button class="secondary" data-copy>${iconCopy} Copy result</button></div><p id="status" class="status" role="status" aria-live="polite"></p>`;}
function settings(){return `<details class="settings"><summary><b>Audio settings</b><span><span data-settings-summary>${speed} WPM · ${pitch} Hz</span> ⌄</span></summary><div class="settings-body"><div class="setting"><label for="speed">Speed <output id="speed-value">${speed} WPM</output></label><input id="speed" type="range" min="5" max="40" value="${speed}"></div><div class="setting"><label for="pitch">Pitch <output id="pitch-value">${pitch} Hz</output></label><input id="pitch" type="range" min="300" max="1000" step="50" value="${pitch}"></div><button class="download" data-download>↓ Download WAV</button></div></details>`;}
function examples(){return `<div class="examples"><span>Try</span>${['HELLO','SOS','2026'].map(t=>`<button data-example="${t}">${t}</button>`).join('')}</div>`;}
function letters(chars){return `<div class="letters">${[...chars].map(c=>`<button class="letter" data-letter="${c}" aria-label="Hear ${c}">${c}<small>${map[c]}</small></button>`).join('')}</div>`;}
function reference(){return `<section id="reference" class="reference"><div class="section-label">A small alphabet, a big world.<span>Tap to hear</span></div>${letters('AEHLOS')}<details class="full-reference"><summary>View all letters & numbers ↗</summary>${letters('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')}</details></section><section class="guide" id="guide"><h2>${variant==='C'?'Leave a little room.':'The space matters.'}</h2><p>Use a space between letters and a slash between words. A dash lasts three times as long as a dot.</p><p>Example: <code>.... ..</code> means HI. Ordinary text “SOS” has letter gaps; the SOS distress signal is sent continuously.</p></section>`;}
function footer(){return `<footer class="app-footer"><a href="#translator">⇄ &nbsp; Translate</a><a href="#reference">Aa &nbsp; Reference</a><a href="#guide">? &nbsp; Guide</a></footer>`;}
function privacy(){return '<p class="privacy">◈ &nbsp; Converted on your device. No account needed.</p>';}
function VariantA(){return `${header()}<main id="translator">${title()}${modes()}<div class="editor">${field()}${output()}</div>${actions()}${examples()}${settings()}${privacy()}${reference()}</main>${footer()}`;}
function VariantB(){return `${header()}<main id="translator">${title()}${modes()}<div class="console-layout"><div><div class="editor">${field()}${output()}</div>${actions()}${examples()}</div><div>${settings()}${privacy()}</div></div>${reference()}</main>${footer()}`;}
function VariantC(){return `${header()}<main id="translator">${title()}${modes()}<div class="paper-layout"><div><div class="editor"><div class="step-title"><em>01</em> Write your message</div>${field()}<div class="step-title"><em>02</em> Read the signal</div>${output()}</div>${actions()}${examples()}${settings()}${privacy()}</div><div>${reference()}</div></div></main>${footer()}`;}
function translate(){
 errors=[];
 if(mode==='encode'){
   const text=input.toUpperCase().trim();
   morse=[...text].map((c,i)=>{if(/\s/.test(c))return '/';if(map[c])return map[c];errors.push(`“${c}” at ${i+1}`);return '�';}).join(' ').replace(/(?:\s*\/\s*)+/g,' / ');
   result=morse;
 }else{
   const text=input.trim().replace(/[·•]/g,'.').replace(/[–—_]/g,'-');
   morse=text;
   result=text?text.split(/\s*\/\s*/).map(word=>word.split(/\s+/).filter(Boolean).map((c)=>{if(reverse[c])return reverse[c];errors.push(`“${c}”`);return '�';}).join('')).join(' '):'';
 }
}
function notify(text,error=false){const s=document.querySelector('#status');if(s){s.textContent=text;s.classList.toggle('error',error);}}
function timeline(value){
 const unit=1.2/speed, seq=[];let cursor=0;
 const words=value.trim().split(/\s*\/\s*/).filter(Boolean);
 words.forEach((word,wi)=>{word.split(/\s+/).filter(Boolean).forEach((letter,li,arr)=>{[...letter].forEach((symbol,si)=>{const length=(symbol==='-'?3:1)*unit;seq.push({start:cursor,duration:length});cursor+=length;if(si<letter.length-1)cursor+=unit;});if(li<arr.length-1)cursor+=3*unit;});if(wi<words.length-1)cursor+=7*unit;});
 return {seq,duration:cursor};
}
function refresh(){
 translate();document.querySelector('#result').textContent=result||'Your translation appears here';
 document.querySelector('#count').textContent=`${input.length} / 300`;
 document.querySelector('#output-state').textContent=errors.length?'CHECK INPUT':result?'READY':'EMPTY';
 app.querySelectorAll('[data-copy],[data-play],[data-download]').forEach(b=>b.disabled=!result||errors.length>0);
 if(errors.length)notify(`Unsupported: ${errors.slice(0,3).join(', ')}${errors.length>3?'…':''}. Please edit before copying or playing.`,true);
 else notify(result?'Ready to copy or listen.':'Enter a message or try an example.');
 if(variant==='B'){
   const bar=document.querySelector('.signal-meter');bar.replaceChildren();
   for(const c of morse.replace(/[^.-]/g,'').slice(0,32)){const i=document.createElement('i');if(c==='-')i.className='long';bar.append(i);}
   document.querySelector('#duration').textContent=errors.length?'—':`${timeline(morse).duration.toFixed(1)} SEC`;
 }
}
function stop(){playbackToken++;if(context){context.close().catch(()=>{});context=null;}clearTimeout(timer);playing=false;const b=app.querySelector('[data-play]');if(b)b.textContent=`${iconPlay} Play signal`;}
async function play(value=morse,label='signal'){
 if(playing){stop();notify('Playback stopped.');return;}
 if(!value)return;
 const {seq,duration}=timeline(value);if(duration>120){notify('This preview plays up to 2 minutes. Shorten the message or increase the speed.',true);return;}
 try{
   const token=++playbackToken;
   const activeContext=new (window.AudioContext||window.webkitAudioContext)();context=activeContext;playing=true;
   await activeContext.resume();if(token!==playbackToken||context!==activeContext)return;
   const osc=activeContext.createOscillator(),gain=activeContext.createGain();osc.frequency.value=pitch;osc.connect(gain);gain.connect(activeContext.destination);
   const start=activeContext.currentTime+.04;gain.gain.setValueAtTime(0,activeContext.currentTime);
   for(const item of seq){const t=start+item.start;gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(.16,t+.003);gain.gain.setValueAtTime(.16,t+item.duration-.003);gain.gain.linearRampToValueAtTime(0,t+item.duration);}
   osc.start(start);osc.stop(start+duration+.01);app.querySelector('[data-play]').textContent='■ Stop playback';notify(`Playing ${label} · ${speed} WPM`);
   timer=setTimeout(()=>{stop();notify('Playback finished.');},(duration+.1)*1000);
 }catch{stop();notify('Audio is unavailable. Try another browser or copy the result.',true);}
}
function download(){
 const {seq,duration}=timeline(morse);if(duration>120){notify('WAV preview is limited to 2 minutes.',true);return;}
 const rate=22050,n=Math.ceil((duration+.12)*rate),buffer=new ArrayBuffer(44+n*2),view=new DataView(buffer);
 const text=(at,s)=>[...s].forEach((c,i)=>view.setUint8(at+i,c.charCodeAt(0)));
 text(0,'RIFF');view.setUint32(4,36+n*2,true);text(8,'WAVE');text(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,rate,true);view.setUint32(28,rate*2,true);view.setUint16(32,2,true);view.setUint16(34,16,true);text(36,'data');view.setUint32(40,n*2,true);
 for(const item of seq){const first=Math.floor(item.start*rate),last=Math.floor((item.start+item.duration)*rate);for(let i=first;i<last;i++){const fade=Math.min(1,(i-first)/(rate*.003),(last-i)/(rate*.003));view.setInt16(44+i*2,Math.round(Math.sin(2*Math.PI*pitch*i/rate)*.16*32767*fade),true);}}
 const url=URL.createObjectURL(new Blob([buffer],{type:'audio/wav'}));const a=document.createElement('a');a.href=url;a.download=`morse-${speed}wpm.wav`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('WAV file prepared. Check your downloads.');
}
function render(){
 stop();app.className=`app variant-${variant.toLowerCase()}`;app.innerHTML=({A:VariantA,B:VariantB,C:VariantC})[variant]();
 document.querySelector('#message').value=input;refresh();
 app.querySelector('#message').addEventListener('input',e=>{stop();input=e.target.value;refresh();});
 app.querySelector('[data-clear]').onclick=()=>{stop();input='';app.querySelector('#message').value='';refresh();app.querySelector('#message').focus();};
 app.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{if(b.dataset.mode===mode)return;if(errors.length){notify('Fix the unsupported input before switching direction.',true);return;}input=result;mode=b.dataset.mode;render();});
 app.querySelectorAll('[data-example]').forEach(b=>b.onclick=()=>{stop();input=mode==='encode'?b.dataset.example:[...b.dataset.example].map(c=>map[c]).join(' ');app.querySelector('#message').value=input;refresh();});
 app.querySelectorAll('[data-key]').forEach(b=>b.onclick=()=>{stop();const field=app.querySelector('#message');const at=field.selectionStart,end=field.selectionEnd;const next=input.slice(0,at)+b.dataset.key+input.slice(end);if(next.length>300)return;input=next;field.value=input;field.focus();field.setSelectionRange(at+b.dataset.key.length,at+b.dataset.key.length);refresh();});
 app.querySelector('[data-play]').onclick=()=>play();
 app.querySelector('[data-copy]').onclick=async()=>{notify('Copying…');try{await Promise.race([navigator.clipboard.writeText(result),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Clipboard timeout')),1500))]);notify('Copied to clipboard.');}catch{notify('Select the result to copy manually; browser clipboard access is unavailable.',true);}};
 app.querySelector('[data-download]').onclick=download;
 app.querySelectorAll('[data-letter]').forEach(b=>b.onclick=()=>{stop();play(map[b.dataset.letter],b.dataset.letter);});
 for(const key of ['speed','pitch'])app.querySelector(`#${key}`).oninput=e=>{stop();if(key==='speed')speed=+e.target.value;else pitch=+e.target.value;app.querySelector('#speed-value').value=`${speed} WPM`;app.querySelector('#pitch-value').value=`${pitch} Hz`;app.querySelector('[data-settings-summary]').textContent=`${speed} WPM · ${pitch} Hz`;refresh();};
 const d=descriptions[variant];document.querySelector('#design-notes').innerHTML=`<div class="review-kicker">${d[0]}</div><h2>${names[variant]}</h2><p>${d[1]}</p><div class="swatches">${d.slice(4).map(c=>`<i style="background:${c}"></i>`).join('')}</div><p>${d[2]}</p><p class="note-line">${d[3]}</p><p>参考来源与取舍记录在项目文档。<br>此处是同一功能的三种布局，不代表已上线。</p>`;
 document.querySelectorAll('[data-variant]').forEach(b=>b.setAttribute('aria-current',b.dataset.variant===variant));
 document.querySelector('.device-label').textContent=document.body.classList.contains('wide')?'DESKTOP · 桌面扩展布局':'390 PX · 手机布局预览';
}
function switchVariant(next){variant=next;const u=new URL(location.href);u.searchParams.set('variant',variant);history.replaceState(null,'',u);render();}
document.querySelectorAll('[data-variant]').forEach(b=>b.onclick=()=>switchVariant(b.dataset.variant));
function cycle(offset){switchVariant(['A','B','C'][(['A','B','C'].indexOf(variant)+offset+3)%3]);}
document.querySelector('#previous').onclick=()=>cycle(-1);document.querySelector('#next').onclick=()=>cycle(1);
document.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,[contenteditable],select'))return;if(e.key==='ArrowLeft'){e.preventDefault();cycle(-1);}if(e.key==='ArrowRight'){e.preventDefault();cycle(1);}});
document.querySelector('#viewport-toggle').onclick=()=>{document.body.classList.toggle('wide');render();};
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});window.addEventListener('pagehide',stop);
if(window.visualViewport)window.visualViewport.addEventListener('resize',()=>document.body.classList.toggle('keyboard-open',window.innerHeight-window.visualViewport.height>140));
render();
