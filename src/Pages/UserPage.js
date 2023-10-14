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


    

    console.log(movies);

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
    <div>
        <NavBar/>
        <h1 className='welcomeMsg'>Hi..{user}</h1>
        <h1 style={{marginBottom:"2rem"}}>Favorites</h1>
        <div className='favoriteList'>
            {movies && movies.map((movie, index) =>
            <div className='favoriteMovie' key={keyGenerator()}>
                
                <Movie
                 movie={movie} 
                 isSmall={true}
                 favorite={true}/>
                <div style={{display:"flex",flexDirection:"column",gap:'0.25rem'}}>
                    <h2>{movie.name || movie.original_title}</h2>
                    <p style={{color:"rgba(255,255,255,0.38)"}}>{movie.original_language ==="en"?"English":movie.original_language==="KR"?"Korean":movie.original_language}</p>
                </div>
                
                <div style={{display:"flex",flexDirection:"column",gap:'0.25rem'}}>
                    <StarBorderRoundedIcon/>
                    <p>{Math.round(movie.vote_average * 10 ** 2)/10 ** 2}</p>
                </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default UserPage