import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaInstagramSquare, FaCopyright  } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="header  px-[4vw] py-5 bg-purple-200 rounded-t-2xl border-t-2 border-purple-700" >
      <div className="nav flex gap-20 justify-start">
        <div className="logo">
          <Link to={'/'}
          className="font-extrabold uppercase text-4xl leading-tight hover:underline hover:text-purple-500 underline" 
          >Tech blogs</Link>
        </div>
        <div className="menu flex-col">
            <h1 className='capitalize font-bold text-2xl mb-4'>navigation links</h1>
          <ul className="flex gap-2 text-xl items-center cursor-pointer flex-col">
            <Link to={'/'}>
            <li className="hover:text-purple-500 hover:underline">Home</li>
            </Link>
            <Link to={'/about'}>
            <li className="hover:text-purple-500 hover:underline">About</li>
            </Link>
            <Link to={'/create'}>
            <li className="hover:text-purple-500 hover:underline">CreateBlog</li>
            </Link>
          </ul>
        </div>

        <div className="menu flex-col">
            <h1 className='capitalize font-bold text-2xl mb-4'>navigation links</h1>
          <ul className="flex gap-2 text-xl items-center cursor-pointer flex-col">
            <Link to={'https://www.linkedin.com/in/arjun-nagar-8b748b276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'}>
            <li className="hover:text-purple-500 hover:underline">
                <FaLinkedin className='text-blue-500 text-3xl hover:text-blue-800' />
            </li>
            </Link>
            <Link to={'/'}>
            <li className="hover:text-purple-500 hover:underline">
                <FaInstagramSquare className='text-red-500 text-3xl hover:text-red-800' />
            </li>
            </Link>
          </ul>
        </div>

      </div>

        <div className='text-sm font-semibold text-center mt-10'>
        Copyright <span className='font-extrabold'>©</span> 2024 TECH BLOGS. All Rights Reserved.
        </div>

    </div>
  )
}

export default Footer