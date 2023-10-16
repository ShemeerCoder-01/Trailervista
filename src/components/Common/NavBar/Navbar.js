import React, { useEffect, useState } from 'react';
import './Navbar.css'
import UserDropDown from '../UserDropDown';
import { useNavigate } from 'react-router-dom';
import logoImage  from '../../../assets/logo-no-background.png';
import logoImagesmall from '../../../assets/logo-image-small.png';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from '../Search';

function Navbar() {
  const navigate = useNavigate();
  const [width,setWidth] = useState(window.innerWidth);
  const [isSearch,setIsSearch] = useState(false);
  const [searchVal,setSearchVal] = useState('');

  useEffect(() => {
   
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (e)=>{
    setSearchVal(e.target.value);
  }
  console.log(searchVal);
  const handleClick = ()=>{
    setIsSearch(false);
  }

  return (
    <div className='navBar'>
      {width < 760?
      <>
       <img className="logo" onClick={()=>navigate('/Home')} src={logoImagesmall} alt="trailervista-Logo"/>
       <div className='nav-icons'>
        {isSearch && <SearchBar handleChange={handleChange} handleClick={handleClick}/>}
        <SearchIcon className='search' style={{display:isSearch===true?"none":''}}  onClick={()=> setIsSearch(true)}/>
        <UserDropDown/>
       </div>
      </>
      :<>
        <img className="logo" onClick={()=>navigate('/Home')} src={logoImage} alt="trailervista-Logo"/>
        <div className='nav-icons'>
        {isSearch && <SearchBar handleChange={handleChange} handleClick={handleClick}/>}
        <SearchIcon className='search' style={{display:isSearch===true?"none":''}} onClick={()=> setIsSearch(true)}/>
        <UserDropDown/>
       </div>
      </>
      }
    </div>
  )
}

export default Navbar;