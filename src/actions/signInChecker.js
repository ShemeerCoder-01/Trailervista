
export const isSignedIn = ()=>{
    const uid = localStorage.getItem('user');
    if(uid){
        return true;
    }
    else{
        return false;
    }
}