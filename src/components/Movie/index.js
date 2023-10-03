import React, {useEffect, useState} from 'react'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { baseimageUrl } from '../constants/constants';
import './style.css';
import { db } from '../../firebase';
import { addDoc,collection } from 'firebase/firestore';

function Movie({movie,isSmall,handleClick,favorite}) {
    let [iconClicked,setIconClicked] = useState(false);
    const favoritesCollection = collection(db, 'favorites');

    useEffect(()=>{
      let favoritesData = JSON.parse(localStorage.getItem('favorites'));
      if(favoritesData?.includes(movie.id)){
        setIconClicked(true);
      }
    },[movie.id]);

    if(movie.backdrop_path === null){
      return;
    }

    const handleIconClick = async(id)=>{
      let arr = [];
      let userEmail = localStorage.getItem('user');
      if(iconClicked){
        let userFavorites = JSON.parse(localStorage.getItem('favorites'));
        let idx = userFavorites.find(movie=> movie.id === id);
        userFavorites.splice(idx,1);
        localStorage.setItem('favorites',JSON.stringify(userFavorites));
      }
      else{
        let userFavorites = JSON.parse(localStorage.getItem('favorites'));
        if(!userFavorites?.length > 0){
          let obj = {
            id,
            userEmail
          }
          arr.push(obj);
          localStorage.setItem('favorites',JSON.stringify(arr));
        }
        else{
          let obj = {
            id,
            userEmail
          }
          userFavorites.push(obj);
          arr = userFavorites;
          localStorage.setItem('favorites',JSON.stringify(userFavorites));
        }
      }

      setIconClicked(prevState=> !prevState);

      try{
        const response = await addDoc(favoritesCollection,{Favoritelist:arr});
        console.log("response is :",response);
      }catch(e){
        console.log("error is : ",e);
      }
    }

   
  return (
    <div className='movie'>
        <img onClick={favorite===undefined?()=>{
        handleClick(movie.id,isSmall)}:null} className={isSmall?'smallposter':'poster'} src={baseimageUrl + movie.backdrop_path} alt={movie.name} />
        {favorite===undefined? iconClicked?
        <FavoriteIcon style={{fontSize:isSmall?"1.5rem":"2rem",color:"red"}} className='favIcon' onClick={()=>handleIconClick(movie.id)}/>:
        <FavoriteBorderRoundedIcon style={{fontSize:isSmall?"1.5rem":"2rem"}} className='favIcon' onClick={()=>handleIconClick(movie.id)}/>
        :''}
   </div>
   
  )
}

export default Movie;