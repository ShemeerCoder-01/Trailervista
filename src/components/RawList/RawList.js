import React, { useEffect, useState } from 'react';
import Axios from '../Axios/Axios';
import { baseimageUrl } from '../constants/constants';
import './RawList.css';
import { api_key } from '../constants/constants';
import YouTube from 'react-youtube';

function keyGenerator(){
  let res = '';
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for(let i = 0; i < 16; i++){
    res += str.charAt(Math.floor(Math.random()* str.length));
  }
  return res;
}



function RawList(props) {
  let [movies, setMovies] = useState();
  let [videoKey,SetVideoKey] = useState();
  let [clicked,setClicked] = useState(false);
  console.log("videoKey ",videoKey);

  useEffect(() => {
    Axios.get(props.type).then((response) => {
      console.log("from raw list", response.data.results)
      setMovies(response.data.results);
    })
  },[props.type,clicked])

  const handleClick = (id,isSmall)=>{
    
    if(isSmall){
      Axios.get(`/movie/${id}/videos?api_key=${api_key}`).then((response)=>{
        SetVideoKey(response.data.results[0].key);        
      }).catch(err=> console.log(err));
    }else{
      Axios.get(`/tv/${id}/videos?api_key=${api_key}`).then((response)=>{
        SetVideoKey(response.data.results[0].key);
      }).catch(err=> console.log(err));
    }
  }

  

  const opts = {
    height: '340',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div key={keyGenerator()}  className='row'>
      <h1>{props.title}</h1>
      <div key={keyGenerator()} className='posters'>
        {movies && movies.map((movie, index) =>
          <img onClick={()=>{
            setClicked(!clicked);
            handleClick(movie.id,props.isSmall)}} key={keyGenerator()} className={props.isSmall?'smallposter':'poster'} src={baseimageUrl + movie.backdrop_path} alt={movie.name} />
        )}

      </div>
      { videoKey?clicked? <YouTube videoId={videoKey} opts={opts} />:'':''}


    </div>
  )
}

export default RawList