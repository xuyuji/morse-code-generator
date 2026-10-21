import {test} from 'node:test';import assert from 'node:assert/strict';
import {convertNumbers} from '../src/core/numbers';import {convert,MORSE} from '../src/core/morse';
test('numeric strings preserve zeros, dates, signs and punctuation without interpreting them',()=>{
 for(const input of ['007','0000','03/04','2026-02-31','3.14','-0.05','+12:30','1,000','0 01\n002']){
  const result=convertNumbers(input);assert.deepEqual(result.diagnostics,[]);assert.equal(convert(result.morse,'decode').output,input.replace(/\s+/g,' ').trim());
 }
 assert.equal(convertNumbers('007').output,'----- ----- --...');
 assert.equal(convertNumbers('03/04').output,`----- ...-- ${MORSE['/']} ----- ....-`);
 assert.equal(convertNumbers('03 04').output,'----- ...-- / ----- ....-');
});
test('unsupported numeric-looking inputs are explicit and never playable',()=>{
 for(const input of ['１２','١٢','12A','1e3','2026年','3💚4']){const r=convertNumbers(input);assert.ok(r.diagnostics.length);assert.equal(r.morse,'');}
 assert.equal(convertNumbers('1💚2').diagnostics[0].position,2);
 assert.equal(convertNumbers('0'.repeat(2001)).diagnostics[0].kind,'limit');
 assert.equal(convertNumbers(' \n ').output,'');
});
