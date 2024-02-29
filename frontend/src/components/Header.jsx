import React from 'react'
import '../styles/header.css'

const Header = () => {

  return (
    <div className='header '>
        {/* <BackImages images={images} interval={2000} /> */}
        <div className="nav">
            <div className="logo">
                <video id='videologo' src="../../Tech blogs by arjun.mp4" autoPlay loop></video>
                <h1>Tech blogs</h1>
            </div>
            <div className="menu">
                
            </div>
        </div>
    </div>
  )
}

export default Header