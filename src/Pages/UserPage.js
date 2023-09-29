import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/Common/NavBar/Navbar'
import { useNavigate } from 'react-router-dom';
import { movieContext } from '../MovieContext';
import { getFavoriteMovies } from '../actions/FavoriteList';
import { isSignedIn } from '../actions/signInChecker';


function UserPage() {
    const [user,setUser] = useState('');
    const [movies,setMovies] = useState([]);
    const navigate = useNavigate();
    let {moviesData} = useContext(movieContext);
    
    console.log("useContext data",moviesData);

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
       getFavoriteMovies(setMovies,moviesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    console.log(movies);

  return (
    <div>
        <NavBar/>
        <h1 className='welcomeMsg'>Hi..{user}</h1>
        <h1>Favorites</h1>
        <div className='favoriteList'>
            
        </div>
    </div>
  )
}

export default UserPage