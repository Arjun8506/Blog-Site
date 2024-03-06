import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister.js";

const RegisterPage = () => {
  const [profileImage, setprofileImage] = useState("../../defaultImage.jpg")

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setprofileImage(reader.result);

        // console.log(profileImage);

      };
      reader.readAsDataURL(file);
    }
  };
  const {loading, register } = useRegister()

  const [inputs, setinputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: profileImage
  })


  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(inputs)
  }

  return (
    <div className='w-full min-h-screen '>
      <div className="w-[50%] py-12 mx-auto">
        <h1
          className="uppercase font-extrabold text-2xl text-center mb-4"
        >Register yourself to create your own blogs</h1>
      <form 
        className="w-[100%] flex flex-col mx-auto gap-5 items-center"
        onSubmit={handleSubmit}
      >
        <img
          className="w-24 h-24 border-4 border-purple-900 rounded-full object-cover"
          src={profileImage} alt="" />
        <input
        type="file" accept="image/*" onChange={handleImageChange} />
          
        <input 
        className="w-[80%] rounded-lg border-2 border-purple-600 "
        type="text" name="fullname" id="fullname" placeholder='FullName'
        value={inputs.fullname}
        onChange={(e)=> setinputs({...inputs, fullname: e.target.value})}
        />
        
        <input 
        className="w-[80%] rounded-lg border-2 border-purple-600 "
        type="text" name="username" id="username" placeholder='UserName'
        value={inputs.username}
        onChange={(e)=> setinputs({...inputs, username: e.target.value})}
        />
        
        <input 
        className="w-[80%] rounded-lg border-2 border-purple-600 "
        type="email" name="email" id="email" placeholder='User Email'
        value={inputs.email}
        onChange={(e)=> setinputs({...inputs, email: e.target.value})}
        />
        
        <input 
        className="w-[80%] rounded-lg border-2 border-purple-600 "
        type="password" name="password" id="password" placeholder='Password'
        value={inputs.password}
        onChange={(e)=> setinputs({...inputs, password: e.target.value})}
        />
        
        <input 
        className="w-[80%] rounded-lg border-2 border-purple-600 "
        type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password'
        value={inputs.confirmPassword}
        onChange={(e)=> setinputs({...inputs, confirmPassword: e.target.value})}
        />

        <button
        className="bg-purple-200 font-semibold py-2 px-4 border-2 border-purple-600 rounded-lg hover:text-purple-950 hover:font-bold hover:bg-purple-100 cursor-pointer"
        disabled = {loading}
        >
          {loading ? "loading" : "Register"}
        </button>

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
