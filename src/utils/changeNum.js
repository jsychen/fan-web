/**
 * 
 * @param {*} type 0: +1   1: -1
 * @param {*} num 
 */
const changeNum = function (num, type = 0) {
   if(type && num === 1){
      return num;
   }
   return type === 0 ? num+1 : type === 1 ? num-1 : num;
}
export default changeNum; 