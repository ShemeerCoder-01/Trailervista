import React, { useEffect, useState } from 'react';
import Axios from '../../Axios/Axios';
// import { baseimageUrl } from '../constants/constants';
import './RawList.css';
import YouTube from 'react-youtube';
import LoaderComponent from '../Common/Loader';
// import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import Movie from '../Movie';

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
  // let [iconClicked,setIconClicked] = useState(false);
  let [currMovieId,setCurrentMovieId] = useState();

  
  useEffect(() => {
    Axios.get(props.type).then((response) => {
      setMovies(response.data.results);
      // console.log(response.data.results);
    }).catch(err=> console.log(err));
  },[props.type]);

  useEffect(() => {
    if(props.videoType === props.title){
      setClicked(true);
    }
    else{
      setClicked(false);
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.videoType])
  

  const handleClick = (id,isSmall)=>{
    props.setVideoType(props.title);
    if(id ===  currMovieId){
      setClicked(false);
    }
    else if(isSmall){
      Axios.get(`/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`).then((response)=>{
        SetVideoKey(response.data.results[0].key);        
      }).catch(err=> console.log(err));
    }else{
      Axios.get(`/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`).then((response)=>{
        SetVideoKey(response.data.results[0].key);
      }).catch(err=> console.log(err));
    }
    setCurrentMovieId(id);
    
  }

  

  const opts = {
    height: '340',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };


  if(!movies){
    return <LoaderComponent/>
  }

  return (
    <div key={keyGenerator()}  className='row'>
      <h1>{props.title}</h1>
      <div key={keyGenerator()} className='posters'>
        {movies && movies.map((movie, index) =>
          // <div className='movie' key={keyGenerator()}>
          //   <img onClick={()=>{
          //     handleClick(movie.id,props.isSmall)}} className={props.isSmall?'smallposter':'poster'} src={baseimageUrl + movie.backdrop_path} alt={movie.name} />
          //   {iconClicked?
          //   <FavoriteIcon style={{fontSize:"2rem",color:"red"}} className='favIcon' onClick={()=> setIconClicked(false)}/>:
          //   <FavoriteBorderRoundedIcon style={{fontSize:"2rem"}} className='favIcon' onClick={()=> setIconClicked(true)}/>
          //   }
          // </div>
          <Movie
           key={keyGenerator()}
           movie={movie} 
           title={props.title} 
           videoType={props.videoType} 
           setVideoType={props.setVideoType} 
           isSmall={props.isSmall}
           setClicked={setClicked}
           SetVideoKey={SetVideoKey}
           handleClick={handleClick}/>
        )}

      </div>
      { videoKey?clicked? <YouTube videoId={videoKey} opts={opts} />:'':''}


    </div>
  )
}

export default RawList