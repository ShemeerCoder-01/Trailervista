import React, { useEffect, useState } from 'react'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { baseimageUrl } from '../constants/constants';
import './style.css';
import { db } from '../../firebase';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';

function Movie({ movie, isSmall, handleClick, favorite }) {
  let [iconClicked, setIconClicked] = useState(false);


  useEffect(() => {
    let favoritesData = JSON.parse(localStorage.getItem('favorites'));
    if (favoritesData?.includes(movie.id)) {
      setIconClicked(true);
    }
  }, [movie.id]);

  if (movie.backdrop_path === null) {
    return;
  }

  const handleIconClick = async (id) => {
    let userEmail = localStorage.getItem('user');
    let docId = localStorage.getItem('docId');
    let favoriteIds = JSON.parse(localStorage.getItem("favorites"));
    try {
      const favoritesCollection = collection(db, 'favorites');
      if (docId) {
        const docRef = doc(favoritesCollection, docId);
        const favorites = await getDoc(docRef);
        if (favorites.exists()) {
          const favoritesObj = favorites.data();
          let favoriteList = favoritesObj['Favoritelist'];
          if (iconClicked) {
            let idx = favoriteList.findIndex(movie => movie.userEmail === userEmail && movie.id === id);
            favoriteList.splice(idx, 1);
            favoriteIds = favoriteList.filter(movie => movie.userEmail === userEmail).map(movie => movie.id);
            localStorage.setItem('favorites', JSON.stringify(favoriteIds));
            const response = await addDoc(favoritesCollection, { Favoritelist: favoriteList });
            localStorage.setItem('docId', response.id);
          } else {
            let obj = {
              id,
              userEmail
            }
            favoriteList.push(obj);
            favoriteIds = favoriteList.filter(movie => movie.userEmail === userEmail).map(movie => movie.id);
            localStorage.setItem('favorites', JSON.stringify(favoriteIds));
            const response = await addDoc(favoritesCollection, { Favoritelist: favoriteList });
            localStorage.setItem('docId', response.id);

          }
        }
        // else {
        //   const obj = {
        //     Favoritelist: [
        //       { id, userEmail }
        //     ]
        //   };
        //   const response = await addDoc(favoritesCollection, obj);
        //   localStorage.setItem('docId',response.id);
        //   localStorage.setItem('favorites', JSON.stringify([id]));
        // }
      }
      else {
        const obj = {
          Favoritelist: [
            { id, userEmail }
          ]
        };
        const response = await addDoc(favoritesCollection, obj);
        localStorage.setItem('favorites', JSON.stringify([id]));
        localStorage.setItem('docId', response.id);
      }

    } catch (e) {
      console.log("error is : ", e);
    }
    setIconClicked(prevState => !prevState);
  }




  return (
    <div className='movie'>
      <img loading='lazy' onClick={favorite === undefined ? () => {
        handleClick(movie.id, isSmall)
      } : null} className={isSmall ? 'smallposter' : 'poster'} src={baseimageUrl + movie.backdrop_path} alt={movie.name} />
      {favorite === undefined ? iconClicked ?
        <FavoriteIcon style={{ fontSize: isSmall ? "1.5rem" : "2rem", color: "red" }} className='favIcon' onClick={() => handleIconClick(movie.id)} /> :
        <FavoriteBorderRoundedIcon style={{ fontSize: isSmall ? "1.5rem" : "2rem" }} className='favIcon' onClick={() => handleIconClick(movie.id)} />
        : ''}
    </div>

  )
}

export default Movie;