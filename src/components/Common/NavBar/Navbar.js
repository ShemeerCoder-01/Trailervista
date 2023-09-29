import React from 'react';
import './Navbar.css'
import UserDropDown from '../UserDropDown';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className='navBar'>
        <img className="logo" onClick={()=>navigate('/Home')} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix Logo"/>
        <UserDropDown/>
    </div>
  )
}

export default Navbar;