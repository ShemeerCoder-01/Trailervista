import { getDocs,collection } from "firebase/firestore";
import { db } from "../firebase";
export const isSignedIn = async()=>{
    
    try{
        const user = localStorage.getItem('user');
        if(user){
            const favorites = collection(db,'favorites');
            const data = await getDocs(favorites);
            if(!data.empty){
                const latest = data.docs[0];
                const favorites = latest.data();
                let favoriteList = favorites['Favoritelist'];
                favoriteList = favoriteList.filter(movie=> movie.userEmail === user).map(movie=> movie.id);
                localStorage.setItem('favorites',JSON.stringify(favoriteList));
            }
            return true;
        }
        else{
            return false;
        }
    }catch(e){

    }
}