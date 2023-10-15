import { collection,doc, getDoc,getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export const dbFetching = async()=>{
    try{
        const docId = localStorage.getItem('docId');
        const currentUser = localStorage.getItem('user');
        
        if(docId){
            const favoritesCollection = collection(db,'favorites');
            const docRef = doc(favoritesCollection, docId);
            const favorites = await getDoc(docRef);
            if(favorites.exists()){
                const favoritesObj = favorites.data();
                let favoriteList = favoritesObj['Favoritelist'];
                favoriteList = favoriteList.filter(movie=> movie.userEmail === currentUser).map(movie=> movie.id);
                localStorage.setItem('favorites',JSON.stringify(favoriteList));
            }
        }
        else{
            const dbRef = collection(db,'favorites');
            const queryRef = query(dbRef, orderBy('Favoritelist','desc'));
            const response = await getDocs(queryRef);
            const document = response.docs.filter((doc,index) => index === 0);
            localStorage.setItem('docId',document[0].id);
            let favArrObj = document[0].data();
            let favArr = favArrObj.Favoritelist;
            let favoriteList = favArr.filter(obj=>obj.userEmail === currentUser).map(item=>item.id);
            console.log(favoriteList);
            localStorage.setItem('favorites',JSON.stringify(favoriteList));
        

        }
    }
    catch(e){
        console.log("err is :",e);
    }
}