import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Email", email);
    formData.append("Password", password);

    const {data} = await axios.post('/account/login', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(data);
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
        </form>
    </div>
  )
}

export default Login