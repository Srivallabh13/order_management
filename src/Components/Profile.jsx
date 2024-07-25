// import React, { useEffect, useState } from 'react'
// import { Avatar, Box, Typography, Button, Stack, TextField, Divider, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserById, UpdateUser } from '../Actions/UserActions';
// import { useAlert } from 'react-alert';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [pincode, setPincode] = useState();
//   const [load, setLoad] = useState(false);

//   const alert = useAlert();
//   const {id} = useSelector((state)=>state.currentUser.user)
//     const {user, loading} = useSelector((state)=>state.userById)
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleSubmit = (e) => {
//     setLoad(true);
//     e.preventDefault();
//     const formData = new FormData();
//     if(phone&&phone.length>0) {
//       formData.append("phoneNumber", phone);
//     }
//     if(address && address.length>0) {
//       formData.append("address", address);
//     }
//     if(city && city.length>0) {
//       formData.append("city", city);
//     }
//     if(pincode && pincode.length>0) {
//       formData.append("pinCode", pincode);
//     }
//     dispatch(UpdateUser(id, formData))
//       .then(() => {
//           dispatch(getUserById(id));
//           handleClose();
//           alert.success("Profile updated successfully");
//           setLoad(false)
//         })
//         .catch(error => {
//           alert.error("Failed to update profile: " + error.message);
//           setLoad(false)
//       });
//   }
//   useEffect(()=> {
//     dispatch(getUserById(id));
//   },[dispatch, id])
//   if(loading){
//     return <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
//     <LinearProgress color='secondary' />
//   </Box>
//   }
//   return (
//     <Stack direction={'row'} justifyContent={'space-around'} className='h-fit p-10 md: mx-40' gap={3}>
//       {load && (
//         <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
//           <LinearProgress color='secondary' />
//         </Box>
//       )}
//       <Stack className=' w-[50%] p-5 ' justifyContent={'center'} gap={2}>
//           <Box className='flex justify-center'>
//             <Avatar src={user?.imageUrl} sx={{ width: 250, height: 250}} />
//           </Box>
//           <Typography variant='h5' textAlign={'center'}>{user?.userName}</Typography>
//           <Box className='flex justify-center'>
//             <Button  variant="contained" color="primary" size='small' onClick={handleClickOpen}>Edit Profile</Button>
//           </Box>
//       </Stack>
//       <Divider orientation="vertical" flexItem className='bg-slate-100'></Divider>
//       {/* right section */}
//       <Stack className=' w-[50%] p-5 md:mx-36 my-8' gap={1}>
//         <Typography variant='body1'><strong>Full Name: </strong></Typography>
//         <TextField value={user?.fullName} id="outlined-basic"  variant="outlined" />

//         <Typography variant='body1'><strong>Phone No: </strong></Typography>
//         <TextField value={user?.phoneNumber} id="outlined-basic"  variant="outlined" />

//         <Typography variant='body1'><strong>Address: </strong></Typography>
//         <TextField value={user?.address} id="outlined-basic"  variant="outlined" />

//         <Typography variant='body1'><strong>City: </strong></Typography>
//         <TextField value={user?.city} id="outlined-basic"  variant="outlined" />

//         <Typography variant='body1'><strong>PinCode: </strong></Typography>
//         <TextField value={user?.pinCode} id="outlined-basic"  variant="outlined" />
//       </Stack>

//     <Dialog
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           component: 'form'
//         }}
//       >
//     <DialogTitle>Edit Profile</DialogTitle>
//     <DialogContent>
//         <TextField value={phone} onChange={(e)=>setPhone(e.target.value)} autoFocus margin="dense" id="phoneNo" name='phoneNo' label="Phone Number" type="number" fullWidth variant="outlined"/>
//         <TextField value={address} onChange={(e)=>setAddress(e.target.value)} autoFocus margin="dense" id="address" name='address' label="Address" type="text" fullWidth variant="outlined"/>
//         <TextField value={city} onChange={(e)=>setCity(e.target.value)} autoFocus margin="dense" id="city" name='city' label="City" type="text" fullWidth variant="outlined"/>
//         <TextField value={pincode} onChange={(e)=>setPincode(e.target.value)} autoFocus margin="dense" id="pincode" name='pincode' label="Pincode" type="number" fullWidth variant="outlined"/>
//     </DialogContent>
//     <DialogActions className='mx-4'>
//         <Button disabled={load} onClick={handleClose} >Cancel</Button>
//         <Button disabled={load} onClick={(e)=>handleSubmit(e)} type="submit" variant='contained'>Edit</Button>
//     </DialogActions>
//     </Dialog>
//     </Stack>
//   )
// }

// export default Profile

import React, { useEffect, useState } from 'react';
import {
  Avatar, Box, Typography, Button, Stack, TextField, Divider, Dialog,
  DialogTitle, DialogContent, DialogActions, LinearProgress, Menu, MenuItem,
  Backdrop, IconButton
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUserById, UpdateUser } from '../Actions/UserActions';
import { useAlert } from 'react-alert';
import { AddPhoto } from '../Actions/PhotoActions';

const Profile = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [imageMenuAnchor, setImageMenuAnchor] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [load, setLoad] = useState(false);
  
  const alert = useAlert();
  const { id } = useSelector((state) => state.currentUser.user);
  const { user:CurrentUser } = useSelector((state) => state.currentUser);
  const { user, loading } = useSelector((state) => state.userById);
  
  const [profile, setProfile] = useState(user?.imageUrl)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setProfile(Reader.result);
      }
    };
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageClick = (event) => {
    setImageMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setImageMenuAnchor(null);
  };

  const handleBackdropOpen = () => {
    setImageMenuAnchor(null);
    setOpenBackdrop(true);
  };

  const handleBackdropClose = () => {
    setOpenBackdrop(false);
  };

  const handleImageEditOpen = () => {
    setImageMenuAnchor(null);
    setOpenImageDialog(true);
  };

  const handleImageEditClose = () => {
    setOpenImageDialog(false);
    setProfile(user?.imageUrl);
  };

  const handleImageEditSubmit = async () => {
    setLoad(true);
    console.log("Hello", selectedImage);
    let photo = await dispatch(AddPhoto(selectedImage, CurrentUser));
    if(photo) {
      await dispatch(getUser());
      await dispatch(getUserById(id));
      setProfile(null);
      setSelectedImage(null);
    }
    handleImageEditClose();
    setLoad(false);
  }

  const handleSubmit = (e) => {
    setLoad(true);
    e.preventDefault();
    const formData = new FormData();
    if (phone && phone.length > 0) {
      formData.append("phoneNumber", phone);
    }
    if (address && address.length > 0) {
      formData.append("address", address);
    }
    if (city && city.length > 0) {
      formData.append("city", city);
    }
    if (pincode && pincode.length > 0) {
      formData.append("pinCode", pincode);
    }
    dispatch(UpdateUser(id, formData))
      .then(() => {
        dispatch(getUserById(id));
        handleClose();
        alert.success("Profile updated successfully");
        setLoad(false);
      })
      .catch(error => {
        alert.error("Failed to update profile: " + error.message);
        setLoad(false);
      });
  }

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  if (loading) {
    return <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
      <LinearProgress color='secondary' />
    </Box>
  }

  return (
    <Stack direction={'row'} justifyContent={'space-around'} className='h-fit p-10 md:mx-40' gap={3}>
      {load && (
        <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
          <LinearProgress color='secondary' />
        </Box>
      )}
      <Stack className='w-[50%] p-5' justifyContent={'center'} gap={2}>
        <Box className='flex justify-center' position='relative'>
          <Avatar src={user?.imageUrl} sx={{ width: 250, height: 250, cursor: 'pointer' }} onClick={handleImageClick} />
          
          <Box
            className='hover-overlay'
            sx={{
              position: 'absolute', top: 0, left: 0, width: "100%", height: 250, display: 'flex', borderRadius:'50px',
              justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',
              opacity: 0, transition: 'opacity 0.3s', '&:hover': { opacity: 1 }
            }}
            onClick={handleImageClick}
          >
            <PhotoCamera sx={{ color: 'white', fontSize: 50 }} />
          </Box>
        </Box>
        <Typography variant='h5' textAlign={'center'}>{user?.userName}</Typography>
        <Box className='flex justify-center'>
          <Button variant="contained" color="primary" size='small' onClick={handleClickOpen}>Edit Profile</Button>
        </Box>
      </Stack>
      <Divider orientation="vertical" flexItem className='bg-slate-100'></Divider>
      {/* right section */}
      <Stack className='w-[50%] p-5 md:mx-36 my-8' gap={1}>
        <Typography variant='body1'><strong>Full Name: </strong></Typography>
        <TextField value={user?.fullName} id="outlined-basic" variant="outlined" />

        <Typography variant='body1'><strong>Phone No: </strong></Typography>
        <TextField value={user?.phoneNumber} id="outlined-basic" variant="outlined" />

        <Typography variant='body1'><strong>Address: </strong></Typography>
        <TextField value={user?.address} id="outlined-basic" variant="outlined" />

        <Typography variant='body1'><strong>City: </strong></Typography>
        <TextField value={user?.city} id="outlined-basic" variant="outlined" />

        <Typography variant='body1'><strong>PinCode: </strong></Typography>
        <TextField value={user?.pinCode} id="outlined-basic" variant="outlined" />
      </Stack>

      {/* Edit Profile Dialog */}
      <Dialog open={open} onClose={handleClose} PaperProps={{ component: 'form' }}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField value={phone} onChange={(e) => setPhone(e.target.value)} autoFocus margin="dense" id="phoneNo" name='phoneNo' label="Phone Number" type="number" fullWidth variant="outlined" />
          <TextField value={address} onChange={(e) => setAddress(e.target.value)} autoFocus margin="dense" id="address" name='address' label="Address" type="text" fullWidth variant="outlined" />
          <TextField value={city} onChange={(e) => setCity(e.target.value)} autoFocus margin="dense" id="city" name='city' label="City" type="text" fullWidth variant="outlined" />
          <TextField value={pincode} onChange={(e) => setPincode(e.target.value)} autoFocus margin="dense" id="pincode" name='pincode' label="Pincode" type="number" fullWidth variant="outlined" />
        </DialogContent>
        <DialogActions className='mx-4'>
          <Button disabled={load} onClick={handleClose} >Cancel</Button>
          <Button disabled={load} onClick={(e) => handleSubmit(e)} type="submit" variant='contained'>Edit</Button>
        </DialogActions>
      </Dialog>

      {/* Image Menu */}
      <Menu
        anchorEl={imageMenuAnchor}
        open={Boolean(imageMenuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleBackdropOpen}>View Image</MenuItem>
        <MenuItem onClick={handleImageEditOpen}>Edit Image</MenuItem>
      </Menu>

      {/* Image Backdrop */}
      <Backdrop
        open={openBackdrop}
        onClick={handleBackdropClose}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <img src={user?.imageUrl} alt="User" style={{ maxWidth: '90%', maxHeight: '90%' }} />
      </Backdrop>

      {/* Image Edit Dialog */}
      <Dialog open={openImageDialog} onClose={handleImageEditClose}>
        <DialogTitle>Edit Image</DialogTitle>
        <DialogContent>
          <Box className='flex justify-center'>
            <Avatar src={profile ? profile : user?.imageUrl} sx={{ width: 250, height: 250 }} />
          </Box>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Choose File
            <input
              type="file"
              hidden

              onChange={handleImageChange}
            />
          </Button>
        </DialogContent>
        <DialogActions className='mx-4'>
          <Button onClick={handleImageEditClose}>Cancel</Button>
          <Button onClick={handleImageEditSubmit} variant='contained'>Save</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

export default Profile;
