import React, {useEffect, useState} from 'react'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { baseimageUrl } from '../constants/constants';
import './style.css';
import { db } from '../../firebase';
import { addDoc,collection,getDocs } from 'firebase/firestore';

function Movie({movie,isSmall,handleClick,favorite}) {
    let [iconClicked,setIconClicked] = useState(false);
    

    useEffect(()=>{
      let favoritesData = JSON.parse(localStorage.getItem('favorites'))?.map(movie=>movie.id);
      if(favoritesData?.includes(movie.id)){
        setIconClicked(true);
      }
    },[movie.id]);

    if(movie.backdrop_path === null){
      return;
    }

    const handleIconClick = async(id)=>{
      let userEmail = localStorage.getItem('user');
      try{
        const favoritesData =  collection(db,'favorites');
        const data = await getDocs(favoritesData);
        const latest = data.docs[data.docs.length-1];
        const favorites = latest.data();
        let userFavorites = favorites['Favoritelist'];
        if(iconClicked){
          if(!data.empty){
            let idx = userFavorites.find(movie=> movie.id === id);
            userFavorites.splice(idx,1);
            console.log("userobj removing : ",userFavorites);
            const response = await addDoc(favoritesData,{Favoritelist:userFavorites});
            console.log("response is :",response);
          }
        }
        else{
          let obj = {
            id,
            userEmail
          }
          userFavorites.push(obj);
          console.log("userobj adding : ",userFavorites);
          const response = await addDoc(favoritesData,{Favoritelist:userFavorites});
          console.log("response is :",response);
        }
       
      }catch(e){
        console.log("error is : ",e);
      }
      setIconClicked(prevState=> !prevState);
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