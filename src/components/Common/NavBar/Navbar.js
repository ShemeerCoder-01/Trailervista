import React from 'react';
import './Navbar.css'
import UserDropDown from '../UserDropDown';
import { useNavigate } from 'react-router-dom';
import logoImage  from '../../../assets/logo-no-background.png'

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className='navBar'>
        <img className="logo" onClick={()=>navigate('/Home')} src={logoImage} alt="Netflix Logo"/>
        <UserDropDown/>
    </div>
  )
}

export default Navbar;