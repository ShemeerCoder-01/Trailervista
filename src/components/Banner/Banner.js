import React, { useEffect, useState } from 'react'
import './Banner.css';
import Axios from '../../Axios/Axios';
import { baseimageUrl } from '../constants/constants';
import { useNavigate } from 'react-router-dom';




function Banner() {
    let [movieUrl, setMovieUrl] = useState();
    let [movie, setMovie] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_networks=213`).then((response) => {
            let idx = Math.floor(Math.random() * response.data.results.length)
            setMovieUrl(response.data.results[idx].backdrop_path);
            setMovie(response.data.results[idx]);
        }).catch(err => console.log(err));

    }, [])

    let obj = { backgroundImage: (`url(${baseimageUrl + movieUrl})`), backgroundSize: "100% 100%" }

    return (
        <div style={obj} className='banner'>
            {movie && <div className='content' >
                <h1 className='title'>{movie.name}</h1>
                <div className='banner_buttons' >
                    <button className='button' >Play</button>
                    <button className='button' onClick={() => navigate('/profile')} >My list</button>
                </div>
                <h1 className='description'>{movie.overview}</h1>
            </div>}
        </div>
    )
}

export default Banner