import React, {useEffect, useState} from 'react'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { baseimageUrl } from '../constants/constants';
import './style.css';


function Movie({movie,isSmall,handleClick}) {
    let [iconClicked,setIconClicked] = useState(false);


    useEffect(()=>{
      let favoritesData = JSON.parse(localStorage.getItem('favorites'));
      if(favoritesData?.includes(movie.id)){
        setIconClicked(true);
      }
    },[movie.id]);

    if(movie.backdrop_path === null){
      return;
    }

    const handleIconClick = (id)=>{
      if(iconClicked){
        let userFavorites = JSON.parse(localStorage.getItem('favorites'));
        let idx = userFavorites.find(movie=> movie.id === id);
        userFavorites.splice(idx,1);
        localStorage.setItem('favorites',JSON.stringify(userFavorites));
      }
      else{
        let userFavorites = JSON.parse(localStorage.getItem('favorites'));
        if(!userFavorites?.length > 0){
          let arr = [];
          arr.push(id);
          localStorage.setItem('favorites',JSON.stringify(arr));
        }
        else{
          userFavorites.push(id);
          localStorage.setItem('favorites',JSON.stringify(userFavorites));
        }
      }
      setIconClicked(prevState=> !prevState);
    }

   
  return (
    <div className='movie'>
        <img onClick={()=>{
        handleClick(movie.id,isSmall)}} className={isSmall?'smallposter':'poster'} src={baseimageUrl + movie.backdrop_path} alt={movie.name} />
        {iconClicked?
        <FavoriteIcon style={{fontSize:isSmall?"1.5rem":"2rem",color:"red"}} className='favIcon' onClick={()=>handleIconClick(movie.id)}/>:
        <FavoriteBorderRoundedIcon style={{fontSize:isSmall?"1.5rem":"2rem"}} className='favIcon' onClick={()=>handleIconClick(movie.id)}/>
        }
   </div>
   
  )
}

export default Movie;