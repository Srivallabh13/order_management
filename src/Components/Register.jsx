import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { RegisterUser } from '../Actions/UserActions'

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const dispatch = useDispatch();

  const handleSubmit = async(e)=> {
    e.preventDefault()
    
    const formData = new FormData();
    formData.append('FullName', fullName);
    formData.append('Email', email);
    formData.append('Password', password); 
    formData.append("Username", username);
    dispatch(RegisterUser(formData));
    window.location.href = '/';
  }

  return (
    <div className='w-full h-full'>
        <form action="" onSubmit={handleSubmit}>
            <div className='flex flex-col w-80 h-screen gap-2 justify-center mx-auto'>
              <p className='text-3xl py-2 font-semibold'>Register</p>
              <label htmlFor="fullName">Full Name</label>
              <input className='p-3 border border-black rounded-md' value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder='John Doe'  type="text" name="fullName" id="" />
              <label htmlFor="Username">Username</label>
              <input className='p-3 border border-black rounded-md' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='john13' type="text" name="Username" id="" />
              <label htmlFor="email">Email</label>
              <input className='p-3 border border-black rounded-md' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='johndoe@gmail.com' type="email" name="email" id="" />
              <label htmlFor="password">Password</label>
              <input className='p-3 border border-black rounded-md' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='******' type="password" name="password" id="" />
              <button className='p-2 my-3 bg-purple-400' type='submit'>Register</button>
            <Link to={'/'}>
              <Typography p={1} variant='subtitle1'> Already have an account? <span className='text-blue-700 '>Sign In</span></Typography>
            </Link>
            </div>
        </form>
    </div>
  )
}

export default Register