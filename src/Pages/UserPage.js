import React, { useEffect, useState } from 'react'
import NavBar from '../components/Common/NavBar/Navbar'
import { useNavigate } from 'react-router-dom';

function UserPage() {
    const [user,setUser] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const userEmail = sessionStorage.getItem('user');
        if(userEmail){
            setUser(userEmail);
            let [name] = userEmail.split('@');
            setUser(name);
           
        }
        else{
            navigate('/');
        }
    },[user,navigate]);


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