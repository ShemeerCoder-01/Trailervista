export const getFavoriteMovies = (setMovies,moviesData)=>{
    const favoriteList = JSON.parse(localStorage.getItem('favorites'));
    let arr = [];
    

    for(let i = 0; i < moviesData.length; i++){
        let favorites = moviesData[i].filter(movie=> favoriteList?.includes(movie.id));
        console.log("favorites ",favorites);
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
    setMovies(arr);
}