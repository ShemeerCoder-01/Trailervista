import React, {  useEffect, useState } from 'react';
import Axios from '../../Axios/Axios';
import './RawList.css';
import YouTube from 'react-youtube';
import Movie from '../Movie';
import { keyGenerator } from '../../actions/KeyGenerator';
import SkeletonScreen from '../SkeletonView';



function RawList(props) {
  let [movies, setMovies] = useState();
  let [videoKey,SetVideoKey] = useState();
  let [clicked,setClicked] = useState(false);
  let [currMovieId,setCurrentMovieId] = useState();
  let arr = new Array(20).fill(0);



  
  useEffect(() => {
    setMovies(props.movie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.movie]);

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



  return (
    <div className='posters-container'>
      <h1>{props.title}</h1>
      <div key={keyGenerator()}  className='row'>
        <div className='posters'>
        {movies?
          movies.map((movie, index) => (
            <Movie
              key={keyGenerator()}
              movie={movie}
              isSmall={props.isSmall}
              handleClick={handleClick}
            />
          )):
          arr.map(()=>(<SkeletonScreen/>))
        }
       
        </div>
        { videoKey?clicked? <YouTube videoId={videoKey} opts={opts} />:'':''}


      </div>
  </div>
  )
}

export default RawList