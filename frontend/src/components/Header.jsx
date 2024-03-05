import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header  px-[4vw] py-5 bg-purple-200 rounded-b-2xl border-b-2 border-purple-700" >
      <div className="nav flex justify-between">
        <div className="logo  flex gap-4 items-center">
          <img
          className="w-16 rounded-full "
          src="../../logo.png" alt="Logo" />
          <Link to={'/'}
          className="font-extrabold uppercase text-4xl leading-tight hover:underline hover:text-purple-500" 
          >Tech blogs</Link>
        </div>
        <div className="menu flex">
          <ul className="flex gap-5 text-xl items-center cursor-pointer">
            <Link to={'/'}>
            <li className="hover:text-purple-500 hover:underline">Home</li>
            </Link>
            <Link to={'/about'}>
            <li className="hover:text-purple-500 hover:underline">About</li>
            </Link>
            <Link to={'/create'}>
            <li className="hover:text-purple-500 hover:underline">CreateBlog</li>
            </Link>
            <Link to={'login'}>
            <li className="ml-14 hover:text-purple-500 hover:underline">Login</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
