import { getDocs,collection } from 'firebase/firestore';
import { db } from '../firebase';

export const getFavoriteMovies = async(setMovies)=>{
    const currentUser = localStorage.getItem('user');
    // const currentUser = auth.currentUser;
    console.log(currentUser);
    const movies = JSON.parse(localStorage.getItem('movies'));
    let arr = [];
    let favoriteList;
    try{
        const favorites =  collection(db,'favorites');
        const data = await getDocs(favorites);
        if(!data.empty){
            const latest = data.docs[data.docs.length-1];
            const favorites = latest.data();
            favoriteList = favorites['Favoritelist'];
            favoriteList = favoriteList.filter(movie=> movie.userEmail === currentUser).map(movie=> movie.id);
            console.log("Favorites are", favoriteList);
            for(let i = 0; i < movies?.length; i++){
                let favorites = movies[i].filter(movie=> favoriteList.includes(movie.id));
                if(favorites){
                    for(let j = 0; j < favorites.length; j++){
                        if(arr.length !== 0){
                            let items = arr.filter(item=> item.id === favorites[j].id);
                            if(items.length === 0){
                             arr.push(favorites[j]);
                            }
                        }
                        else{
                            arr.push(favorites[j]);
                        }
                    }
        
                }
            }
            arr = arr.filter(item=>item !== undefined);
            console.log("arr after filtering",arr);
            setMovies(arr);
        }

    }
    catch(e){
        console.log("error is",e);
    }

    

    // for(let i = 0; i < movies?.length; i++){
    //     let favorites = movies[i].filter(movie=> favoriteList?.includes(movie.id));
    //     if(favorites){
    //         for(let j = 0; j < favorites.length; j++){
    //             if(arr.length !== 0){
    //                 let items = arr.filter(item=> item.id === favorites[j].id);
    //                 if(items.length === 0){
    //                  arr.push(favorites[j]);
    //                 }
    //             }
    //             else{
    //                 arr.push(favorites[j]);
    //             }
    //         }

    //     }
    // }
    // arr = arr.filter(item=>item !== undefined);
    // setMovies(arr);
}