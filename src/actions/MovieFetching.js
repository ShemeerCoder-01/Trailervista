import Axios from "../Axios/Axios";
import { collection,doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const MovieFetching = async(genre,states)=>{
    let arr = [];
    for(let i = 0; i < genre.length; i++){
        try{
            const response = await Axios.get(genre[i]);
            states[i](response.data.results);
            if(arr.length < 8){
                arr.push(response.data.results);
            }
        }catch(err){
            console.log(err)
        }
    }
    localStorage.setItem('movies',JSON.stringify(arr));

    try{
        const docId = localStorage.getItem('docId');
        const currentUser = localStorage.getItem('user');
        const favoritesCollection = collection(db,'favorites');
        if(docId){
            const docRef = doc(favoritesCollection, docId);
            const favorites = await getDoc(docRef);
            if(favorites.exists()){
                const favoritesObj = favorites.data();
                let favoriteList = favoritesObj['Favoritelist'];
                favoriteList = favoriteList.filter(movie=> movie.userEmail === currentUser).map(movie=> movie.id);
                localStorage.setItem('favorites',JSON.stringify(favoriteList));
            }
        }
    }
    catch(e){
        console.log("err is :",e);
    }
    
}

