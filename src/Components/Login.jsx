import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../Actions/UserActions';
import { Box, LinearProgress, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("Email", email);
    formData.append("Password", password);

    try {
      await dispatch(LoginUser(formData));
      setLoading(false);
      navigate('/'); 
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message || "Incorrect Email or password.";
        console.log(errorMessage)
        alert.error("Incorrect Email or password");
        setError("Incorrect Email or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className='flex w-full h-full justify-center items-center'>
      {loading && (
        <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
          <LinearProgress color='secondary' />
        </Box>
      )}

      <form action="" onSubmit={handleSubmit}>
      {error && <p className='text-red-500'>{error}</p>}
        <div className='flex-col w-64 h-full space-y-3'>
          <p className='text-3xl '>Login</p>
          <label className='block' htmlFor='email'>Email*</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='border w-full p border-black rounded-lg p-3' required type="email" placeholder='john@gmail.com' />
          <label htmlFor='password'>Password*</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='border w-full border-black rounded-lg p-3' required type="password" placeholder='******' />
          <button disabled={loading} className='p-3 rounded-md w-full bg-purple-400'>Submit</button>
        </div>
        <Typography p={1} variant='subtitle1'> Don't have an account?
          <Link to={'/register'}>
            <span aria-disabled={loading} className='text-blue-700'>
              Sign Up
            </span>
          </Link>
        </Typography>
      </form>
    </div>
  );
}

export default Login;
