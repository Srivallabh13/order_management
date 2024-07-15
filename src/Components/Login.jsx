import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getUser, LoginUser } from '../Actions/UserActions';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Email", email);
    formData.append("Password", password);

    dispatch(LoginUser(formData));
    navigate('/');
    // window.location.href = ('/');
    // navigate('/',rep);
  }

  return (
    <div className='flex w-full h-full justify-center items-center'>
        <form action="" onSubmit={handleSubmit}>
            <div className='flex-col w-64 h-full space-y-3'>
                <p className='text-3xl '>Login</p>
                <label className='block' htmlFor='email'>Email*</label>
                <input value={email} onChange={(e) => setEmail(e.target.value) } className='border w-full p border-black rounded-lg p-3' type="email" placeholder='john@gmail.com' />
                <label htmlFor='password'>Password*</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} className='border w-full border-black rounded-lg p-3' type="password" placeholder='******' />
                <button className='p-3 rounded-md w-full bg-purple-400'>Submit</button>
            </div>
        <Link to={'/register'}>
          <Typography p={1} variant='subtitle1'> Don't have an account? <span className='text-blue-700 '>Sign Up</span></Typography>
        </Link>
        </form>
    </div>
  )
}

export default Login