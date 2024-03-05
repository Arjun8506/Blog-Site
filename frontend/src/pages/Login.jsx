import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
      <div className='w-full  '>
      <div className="w-[50%] py-12 mx-auto">
        <h1
          className="uppercase font-extrabold text-2xl text-center mb-4"
        >login yourself to create your own blogs</h1>
      <form 
        className="w-[100%] flex flex-col mx-auto gap-5 items-center"

      >
          
        <input 
        className="w-[80%] rounded-lg border-2 border-purple-600 "
        type="text" name="username" id="username" placeholder='UserName'/>
        
        <input 
        className="w-[80%] rounded-lg border-2 border-purple-600 "
        type="password" name="password" id="password" placeholder='Password'/>

        <input
        className="bg-purple-200 font-semibold py-2 px-4 border-2 border-purple-600 rounded-lg hover:text-purple-950 hover:font-bold hover:bg-purple-100 cursor-pointer"
        
        type="submit" value="Login" />

        <p>
        Already Have an account  
        <Link to={'/register'} className="capitalize ml-2 text-blue-400 underline hover:text-yellow-300">
         Go to register
        </Link>
          </p>
        
      </form>

      </div>
    </div>

    )
  
}

export default Login