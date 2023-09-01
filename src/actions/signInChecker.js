
export const isSignedIn = ()=>{
    const uid = localStorage.getItem('user');
    console.log(uid);
    if(uid){
        return true;
    }
    else{
        return false;
    }
}