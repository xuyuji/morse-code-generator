/** International Morse, ITU-R M.1677-1. Only declared characters are accepted. */
export const MORSE: Readonly<Record<string, string>> = Object.freeze({
  A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',
  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',
  '.':'.-.-.-',',':'--..--','?':'..--..',"'":'.----.','/':'-..-.','(':'-.--.',')':'-.--.-',':':'---...','=':'-...-','+':'.-.-.','-':'-....-','"':'.-..-.','@':'.--.-.'
});
const REVERSE = Object.fromEntries(Object.entries(MORSE).map(([a,b])=>[b,a]));
export const MAX_INPUT = 2000;
export type Mode = 'encode' | 'decode';
export type Diagnostic = { position: number; value: string; kind: 'unsupported' | 'unknown' | 'limit' };
export type Conversion = { output: string; morse: string; diagnostics: Diagnostic[]; letters: number };

export function convert(input: string, mode: Mode): Conversion {
  const diagnostics: Diagnostic[] = [];
  if (input.length > MAX_INPUT) return {output:'',morse:'',diagnostics:[{position:MAX_INPUT+1,value:'',kind:'limit'}],letters:0};
  if (mode === 'encode') {
    const words: string[][] = [[]]; let position=0, letters=0;
    for (const original of input) {
      position++;
      if (/\s/u.test(original)) { if (words.at(-1)!.length) words.push([]); continue; }
      // Restrict case folding to ASCII: ß must not silently become SS.
      const char = /^[a-z]$/.test(original) ? original.toUpperCase() : original;
      const code=MORSE[char];
      if (!code) diagnostics.push({position,value:original,kind:'unsupported'});
      words.at(-1)!.push(code ?? '�'); letters++;
    }
    const output=words.filter(w=>w.length).map(w=>w.join(' ')).join(' / ');
    return {output,morse:diagnostics.length?'':output,diagnostics,letters};
  }
  const normalized=input.replace(/[·•]/g,'.').replace(/[−–—]/g,'-');
  const output:string[]=[]; const canonical:string[]=[]; let pendingWord=false, letters=0;
  for (const match of normalized.matchAll(/\/|[^\s/]+/gu)) {
    const token=match[0];
    if(token==='/'){if(output.length)pendingWord=true;continue;}
    if(pendingWord){output.push(' ');canonical.push('/');pendingWord=false;}
    const letter=REVERSE[token];
    if(!letter)diagnostics.push({position:Array.from(normalized.slice(0,match.index)).length+1,value:token,kind:'unknown'});
    output.push(letter??'�');canonical.push(token);letters++;
  }
  return {output:output.join(''),morse:diagnostics.length?'':canonical.join(' '),diagnostics,letters};
}
