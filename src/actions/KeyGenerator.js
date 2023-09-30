export const keyGenerator = ()=>{
    let res = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i = 0; i < 16; i++){
      res += str.charAt(Math.floor(Math.random()* str.length));
    }
    return res;
  }