import {convert,MAX_INPUT,type Conversion} from './morse';
/** Numbers are character strings, never numeric values or parsed dates. */
export function convertNumbers(input:string):Conversion {
 if(input.length>MAX_INPUT)return convert(input,'encode');
 const result=convert(input,'encode');
 const diagnostics=Array.from(input).flatMap((value,index)=>/^[0-9\s./,:+\-]$/u.test(value)?[]:[{position:index+1,value,kind:'unsupported' as const}]);
 return {...result,diagnostics,morse:diagnostics.length?'':result.morse};
}
