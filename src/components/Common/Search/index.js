import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './style.css';

function SearchBar({handleChange,handleClick}) {
  return (
    <div className='searchBar'>
        <input type='text' className='inputArea' placeholder='Search Movies' onChange={handleChange}/>
        <SearchIcon onClick={handleClick}/>
    </div>
  )
}

export default SearchBar