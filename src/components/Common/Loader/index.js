import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import './style.css'

function LoaderComponent() {
  return (
    <div className='loader'>
        <CircularProgress className='loader-icon' />
    </div>
  )
}

export default LoaderComponent