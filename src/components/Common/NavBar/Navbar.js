import React, { useEffect, useState } from 'react';
import './Navbar.css'
import UserDropDown from '../UserDropDown';
import { useNavigate } from 'react-router-dom';
import logoImage  from '../../../assets/logo-no-background.png';
import logoImagesmall from '../../../assets/logo-image-small.png';

function Navbar() {
  const navigate = useNavigate();
  const [width,setWidth] = useState(window.innerWidth);

  useEffect(() => {
   
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='navBar'>
      {width < 760?
      <>
       <img className="logo" onClick={()=>navigate('/Home')} src={logoImagesmall} alt="trailervista-Logo"/>
        <UserDropDown/>
      </>
      :<>
        <img className="logo" onClick={()=>navigate('/Home')} src={logoImage} alt="trailervista-Logo"/>
        <UserDropDown/>
      </>
      }
    </div>
  )
}

export default Navbar;