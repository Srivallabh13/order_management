// import { Avatar, Box, Button, LinearProgress, Stack, TextField, Typography } from '@mui/material'
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { RegisterUser } from '../Actions/UserActions'
// import { useAlert } from 'react-alert'
// import '../assets/External CSS/Register.css'
// import { AddPhoto } from '../Actions/PhotoActions'

// const Register = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [fullName, setFullName] = useState("")
//   const [username, setUsername] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("");
//   const [image, setImage] = useState("")
//   const [profile, setProfile] = useState("")

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const alert = useAlert();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);

//     const Reader = new FileReader();
//     Reader.readAsDataURL(file);

//     Reader.onload = () => {
//       if (Reader.readyState === 2) {
//         setProfile(Reader.result);
//       }
//     };
//   }

//   const handleSubmit = async(e)=> {
//     e.preventDefault()
//     try {
//       if(password !== confirmPassword) {
//         alert.error("The Password and confirm password doesn't match");
//         setError("Password and confirm password doesn't match!");
//         return;
//       }
//       setLoading(true);
//       const formData = new FormData();
//       formData.append('FullName', fullName);
//       formData.append('Email', email);
//       formData.append('Password', password); 
//       formData.append("Username", username);
//       let data = await dispatch(RegisterUser(formData));
//       if(data) {
//         let photo = await dispatch(AddPhoto(image, data));
//         if(photo){
//           alert.success("Registration Successfull");
//           setLoading(false);
//           navigate('/');
//         }
//         else {
//           alert.success("Registration Successfull, but couldn't add the profile photo.");
//           setLoading(false);
//           navigate('/');
//         }
//       }
//     } catch (error) {
//       setLoading(false);
//       if (error.response && error.response.status === 400) {
//         const errorMessage = error.response.data.errors.Password;
//         setError(errorMessage);
//       } else {
//         setError( `An error occurred. Please try again. ${error}`);
//       }
//     }
//   }

//   if(loading) {
//     <Box sx={{ width: '100%' }}>
//       <LinearProgress color='secondary' />
//     </Box>
//   }

//   return (
//     <Box className='w-full h-fit'>
//         <form action="" onSubmit={handleSubmit}>
//               <Typography variant='h4' fontWeight={600} className='text-center p-5'>Register</Typography>
//             <Box className=' w-[30%] gap-2 justify-center mx-auto'>
//               <Avatar src={profile} className='mx-auto' alt="User" sx={{ height: "10vmax", width: "10vmax" }}/>
//               <Box className="upload flex mb-4">
//                 <input type="file" required accept="image/*" className='mx-auto' onChange={handleImageChange} />
//               </Box>
//               <Stack direction={'column'} spacing={2}>                
//                 <TextField required label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='johndoe@gmail.com' type="email" name="email" id="" />
//                 <Stack direction={'row'} spacing={2}>
//                   <TextField required label="Full Name" fullWidth variant="outlined" value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder='John Doe'  type="text" name="fullName" id="" />
//                   <TextField required label="Username" fullWidth variant="outlined" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='john13' type="text" name="Username" id="" />
//                 </Stack>
//                 <Stack direction={'row'} spacing={2}>
//                   <TextField required label="Password" fullWidth variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='******' type="password" name="password" id="" />
//                   <TextField required className='rounded-3xl' fullWidth label="Confirm Password" variant="outlined" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='******' type="password" name="Confirm_password" id="" />
//                 </Stack>
//               </Stack>
//               {error &&
//                 <Box className ="w-full h-fit mt-2 p-3 border-2 border-red-600 align-middle text-center bg-red-50"> 
//                   <Typography variant='subtitle1'>{error}</Typography>
//                 </Box>
//               }
//               <Box className='w-full flex'>
//                 <Button disabled={loading} variant='contained' sx={{my:2, mx:'auto', width:'80%', borderRadius:'100px', p:2}}  color='secondary' type='submit'>Register</Button>
//               </Box>
//             <Link to={'/'}>
//               <Typography pb={2} textAlign={'center'} variant='subtitle1'> Already have an account? <span className='text-blue-700 '>Sign In</span></Typography>
//             </Link>
//             </Box>
//         </form>
//     </Box>
//   )
// }

// export default Register

import { Avatar, Box, Button, Grid, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { RegisterUser } from '../Actions/UserActions'
import { useAlert } from 'react-alert'
import '../assets/External CSS/Register.css'
import { AddPhoto } from '../Actions/PhotoActions'

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");
  const [image, setImage] = useState("")
  const [profile, setProfile] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setProfile(Reader.result);
      }
    };
  }

  const handleSubmit = async(e)=> {
    e.preventDefault()
    try {
      if(password !== confirmPassword) {
        alert.error("The Password and confirm password doesn't match");
        setError("Password and confirm password doesn't match!");
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append('FullName', fullName);
      formData.append('Email', email);
      formData.append('Password', password); 
      formData.append("Username", username);
      let data = await dispatch(RegisterUser(formData));
      if(data) {
        let photo = await dispatch(AddPhoto(image, data));
        if(photo){
          alert.success("Registration Successfull");
          setLoading(false);
          navigate('/');
        }
        else {
          alert.success("Registration Successfull, but couldn't add the profile photo.");
          setLoading(false);
          navigate('/');
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.errors.Password;
        setError(errorMessage);
      } else {
        setError( `An error occurred. Please try again. ${error}`);
      }
    }
  }

  if(loading) {
    <Box sx={{ width: '100%' }}>
      <LinearProgress color='secondary' />
    </Box>
  }

  return (
    <Box className='w-full px-10 h-fit'>
      <form action="" onSubmit={handleSubmit}>
        <Typography variant='h4' fontWeight={600} className='text-center p-5'>Register</Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Avatar src={profile} className='mx-auto' alt="User" sx={{ height: "10vmax", width: "10vmax" }} />
            <Box className="upload flex mb-4">
              <input type="file" required accept="image/*" className='mx-auto' onChange={handleImageChange} />
            </Box>
            <Stack direction={'column'} spacing={2}>                
              <TextField required label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='johndoe@gmail.com' type="email" name="email" id="" />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField required label="Full Name" fullWidth variant="outlined" value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder='John Doe' type="text" name="fullName" id="" />
                <TextField required label="Username" fullWidth variant="outlined" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='john13' type="text" name="Username" id="" />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField required label="Password" fullWidth variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='******' type="password" name="password" id="" />
                <TextField required className='rounded-3xl' fullWidth label="Confirm Password" variant="outlined" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='******' type="password" name="Confirm_password" id="" />
              </Stack>
            </Stack>
            {error &&
              <Box className ="w-full h-fit mt-2 p-3 border-2 border-red-600 align-middle text-center bg-red-50"> 
                <Typography variant='subtitle1'>{error}</Typography>
              </Box>
            }
            <Box className='w-full flex'>
              <Button disabled={loading} variant='contained' sx={{my:2, mx:'auto', width:'80%', borderRadius:'100px', p:2}}  color='secondary' type='submit'>Register</Button>
            </Box>
            <Link to={'/'}>
              <Typography pb={2} textAlign={'center'} variant='subtitle1'> Already have an account? <span className='text-blue-700 '>Sign In</span></Typography>
            </Link>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default Register
