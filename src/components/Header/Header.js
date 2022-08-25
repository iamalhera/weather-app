import React from 'react'
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
        <img src={`icons/03d.png`} alt="Logo" />
        <h1 className='heading'>Climate Labs</h1>
    </div>
  )
}

export default Header