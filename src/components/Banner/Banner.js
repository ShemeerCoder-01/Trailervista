import React, { useEffect, useState } from 'react'
import './Banner.css';
import Axios from '../Axios/Axios';
import { baseimageUrl } from '../constants/constants';



function Banner() {
    let [movieUrl, setMovieUrl] = useState();
    let [movie, setMovie] = useState();

    console.log("movie details",process.env.REACT_APP_API_KEY);

    useEffect(() => {
        Axios.get(`discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_networks=213`).then((response) => {
            let idx = Math.floor(Math.random() * response.data.results.length)
            setMovieUrl(response.data.results[idx].backdrop_path);
            setMovie(response.data.results[idx]);
            console.log(response.data.results);
        }).catch(err=> console.log(err));

    }, [])

    let obj = { backgroundImage: (`url(${baseimageUrl + movieUrl})`),backgroundSize:"100% 100%" }

    return (
        <div style={obj} className='banner'>
            <div className='content' >
                <div className='subContent'>
                    {movie && <h1 className='title'>{movie.name}</h1>}
                    <div className='banner_buttons' >
                        <button className='button' >Play</button>
                        <button className='button' >My list</button>
                    </div>
                </div>
            
                {movie && <h1 className='description'>{movie.overview}</h1>}
            </div>
        </div>
    )
}

export default Banner