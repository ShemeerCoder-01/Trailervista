import React, { useEffect, useState } from 'react'
import NavBar from '../components/Common/NavBar/Navbar'
import { useNavigate } from 'react-router-dom';
import { getFavoriteMovies } from '../actions/FavoriteList';
import { isSignedIn } from '../actions/signInChecker';
import { keyGenerator } from '../actions/KeyGenerator';
import Movie from '../components/Movie';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

function UserPage() {
    const [user,setUser] = useState('');
    const [movies,setMovies] = useState([]);
    const navigate = useNavigate();


    



    useEffect(()=>{
        const userStatus = isSignedIn();
        if(userStatus){
            const userEmail = localStorage.getItem('user');
            let [name] = userEmail.split('@');
            setUser(name);  
        }
        else{
            navigate('/');
        }
    },[user,navigate]);

    useEffect(()=>{
       getFavoriteMovies(setMovies);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    

  return (
    <div className='userPage'>
        <NavBar/>
        <h1 className='welcomeMsg'>Hi..{user}</h1>
        <h1 className='fav'>Favorites</h1>
        <div className='favoriteList'>
            {movies && movies.map((movie, index) =>
            <div className='favoriteMovie' key={keyGenerator()}>
                
                <Movie
                 movie={movie} 
                 isSmall={true}
                 favorite={true}/>
                <div className='movieDetails'>
                    <h2 className='original-name'>{movie.name || movie.original_title}</h2>
                    <p className='lang'>{movie.original_language ==="en"?"English":movie.original_language==="KR"?"Korean":movie.original_language==="es"?"Spanish":movie.original_language}</p>
                </div>
                
                <div className='movieDetails'>
                    <StarBorderRoundedIcon className='staricon'/>
                    <p className='rating'>{Math.round(movie.vote_average * 10 ** 2)/10 ** 2}</p>
                </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default UserPage