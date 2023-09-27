import React, {useState} from 'react'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { baseimageUrl } from '../constants/constants';
import './style.css';


function Movie({movie,title,setClicked,SetVideoKey,videoType,setVideoType,isSmall,handleClick}) {
    let [iconClicked,setIconClicked] = useState(false);

   
  return (
    <div className='movie'>
        <img onClick={()=>{
        handleClick(movie.id,isSmall)}} className={isSmall?'smallposter':'poster'} src={baseimageUrl + movie.backdrop_path} alt={movie.name} />
        {iconClicked?
        <FavoriteIcon style={{fontSize:"2rem",color:"red"}} className='favIcon' onClick={()=> setIconClicked(false)}/>:
        <FavoriteBorderRoundedIcon style={{fontSize:"2rem"}} className='favIcon' onClick={()=> setIconClicked(true)}/>
        }
   </div>
   
  )
}

export default Movie;