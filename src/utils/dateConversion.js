function appendZero(a){
   return a < 10 ? '0' + a : a;
}
const newDate = date => {
   if(typeof date === 'string'){
      date = new Date(date);
   }
   let str = 'YYYY-MM-dd HH:mm:00';

   let year = date.getFullYear();
   let month = appendZero(date.getMonth() + 1);
   let day = appendZero(date.getDate());
   let hour = appendZero(date.getHours());
   let minutes = appendZero(date.getMinutes());

   str = str.replace('YYYY', year).replace('MM', month).replace('dd', day).replace('HH', hour).replace('mm', minutes);
   return str;
}
export default newDate;