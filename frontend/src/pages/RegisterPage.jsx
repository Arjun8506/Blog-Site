import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [profileImage, setprofileImage] = useState("../../defaultImage.jpg")

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setprofileImage(reader.result);

        console.log(profileImage);

      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='w-full min-h-screen '>
      <div className="w-[50%] py-12 mx-auto">
        <h1
          className="uppercase font-extrabold text-2xl text-center mb-4"
        >Register yourself to create your own blogs</h1>
      <form 
        className="w-[100%] flex flex-col mx-auto gap-5 items-center"

      >
        <img
          className="w-24 h-24 border-4 border-purple-900 rounded-full object-cover"
          src={profileImage} alt="" />
        <input
        type="file" accept="image/*" onChange={handleImageChange} />
          
        <input 
        className="w-[80%] rounded-lg border-2 border-purple-600 "
        type="text" name="fullname" id="fullname" placeholder='FullName'/>
        
        <input 
        className="w-[80%] rounded-lg border-2 border-purple-600 "
        type="text" name="username" id="username" placeholder='UserName'/>
        
        <input 
        className="w-[80%] rounded-lg border-2 border-purple-600 "
        type="email" name="email" id="email" placeholder='User Email'/>
        
        <input 
        className="w-[80%] rounded-lg border-2 border-purple-600 "
        type="password" name="password" id="password" placeholder='Password'/>
        
        <input 
        className="w-[80%] rounded-lg border-2 border-purple-600 "
        type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password'/>

        <input
        className="bg-purple-200 font-semibold py-2 px-4 border-2 border-purple-600 rounded-lg hover:text-purple-950 hover:font-bold hover:bg-purple-100 cursor-pointer"
        type="submit" value="Register" />

        <p>
        Already Have an account  
        <Link to={'/login'} className="capitalize ml-2 text-blue-400 underline hover:text-yellow-300">
         Go to login
        </Link>
          </p>
        
      </form>

      </div>
    </div>
  )
  }

export default RegisterPage;
