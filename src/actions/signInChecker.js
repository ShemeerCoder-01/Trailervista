
export const isSignedIn = ()=>{
    const uid = sessionStorage.getItem('user');
    if(uid){
        return true;
    }
    else{
        return false;
    }
}