import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {

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
          className="uppercase font-extrabold text-3xl text-center mb-4"
        >profile</h1>
      <form 
        className="w-[100%] flex flex-col mx-auto gap-5 items-center"

      >
        <img
          className="w-24 h-24 border-4 border-purple-900 rounded-full object-cover"
          src={profileImage} alt="" />
        <input
        type="file" accept="image/*" onChange={handleImageChange} />
          
        <input 
        className="w-[100%] rounded-lg border-2 border-purple-600 "
        type="text" name="fullname" id="fullname" placeholder='FullName'/>
        
        <input 
        className="w-[100%] rounded-lg border-2 border-purple-600 "
        type="text" name="username" id="username" placeholder='UserName'/>
        
        <input 
        className="w-[100%] rounded-lg border-2 border-purple-600 "
        type="email" name="email" id="email" placeholder='User Email'/>
        
        <input 
        className="w-[100%] rounded-lg border-2 border-purple-600 "
        type="password" name="password" id="password" placeholder='Password'/>

        <div className='w-full flex justify-between '>
          <input
          className="capitalize bg-purple-200 font-semibold py-2 px-4 border-2 border-purple-600 rounded-lg hover:text-purple-950 hover:font-bold hover:bg-purple-100 cursor-pointer"
          type="submit" value="update data" />
        <input
        className="capitalize bg-red-200 font-semibold py-2 px-4 border-2 border-red-600 rounded-lg hover:text-red-950 hover:font-bold hover:bg-red-300 cursor-pointer"
        type="submit" value="delete account" />


        </div>
        
      </form>

      </div>
    </div>
  )
}

export default Profile