import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../Actions/UserActions';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, LinearProgress, OutlinedInput, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Image from '../assets/Images/login.jpg'
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
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
        alert.error("Incorrect Email or password");
        setError("Incorrect Email or password.");
      } else {
        console.log(error)
        setError(`An error occurred. Please try again. ${error}`);
      }
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Stack direction={isMobile? 'column':'row'} sx={{justifyContent:isMobile? 'center' : 'space-around'}} spacing={2} className=' w-full h-[89vh] items-center'>
      {loading && (
        <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
          <LinearProgress color='secondary' />
        </Box>
      )}
      <style jsx>{`
        .slow-bounce {
          animation-duration: 3s; /* Adjust the duration as needed */
        }
      `}</style>
          <img src={Image} height={500} style={{display:isMobile?'none':'block'}} className='w-[40%] -z-50 object-cover animate-bounce slow-bounce' alt="" />

        <form action="" onSubmit={handleSubmit}>
          <div className='flex-col w-64 h-full space-y-5'>
            <p className='text-3xl '>Login</p>
            {/* <label className='block' htmlFor='email'>Email*</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='border w-full p border-black rounded-lg p-3' required type="email" placeholder='john@gmail.com' /> */}
            <TextField required label="Email" fullWidth variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='john@gmail.com'  type="email" name="email" />
            {/* <label htmlFor='password'>Password*</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className='border w-full border-black rounded-lg p-3' required type="password" placeholder='******' /> */}
            {/* <TextField value={password} onChange={(e) => setPassword(e.target.value)} required label="Password" fullWidth variant="outlined" placeholder='*****'  type="password" name="password" /> */}
            <FormControl sx={{width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                <OutlinedInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='*******'
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
            </FormControl>
            {error &&
            <Box className ="w-full h-fit p-3 border-2 border-red-600 align-middle text-center bg-red-50"> 
              <Typography variant='subtitle1'>{error}</Typography>
            </Box>
            }
            <Button variant='contained' type='submit' color='secondary' disabled={loading} fullWidth sx={{p:1.2, fontSize:"1rem"}}>Submit</Button>
            <Typography p={1} variant='subtitle1'> Don't have an account? 
              <Link to={'/register'}>
                <span aria-disabled={loading} className='text-blue-700'>
                  {`${" "} Sign Up`}
                </span>
              </Link>
            </Typography>
          </div>
        </form>
    </Stack>
  );
}

export default Login;
