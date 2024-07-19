import React, { useEffect, useState } from 'react'
import { Avatar, Box, Typography, Button, Stack, TextField, Divider, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, UpdateUser } from '../Actions/UserActions';
import { useAlert } from 'react-alert';

const Profile = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState();
  const [load, setLoad] = useState(false);

  const alert = useAlert();
  const {id} = useSelector((state)=>state.currentUser.user)
    const {user, loading} = useSelector((state)=>state.userById)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    setLoad(true);
    e.preventDefault();
    const formData = new FormData();
    if(phone&&phone.length>0) {
      formData.append("phoneNumber", phone);
    }
    if(address && address.length>0) {
      formData.append("address", address);
    }
    if(city && city.length>0) {
      formData.append("city", city);
    }
    if(pincode && pincode.length>0) {
      formData.append("pinCode", pincode);
    }
    dispatch(UpdateUser(id, formData))
      .then(() => {
          dispatch(getUserById(id));
          handleClose();
          alert.success("Profile updated successfully");
          setLoad(false)
        })
        .catch(error => {
          alert.error("Failed to update profile: " + error.message);
          setLoad(false)
      });
  }
  useEffect(()=> {
    dispatch(getUserById(id));
  },[dispatch])
  if(loading){
    return <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
    <LinearProgress color='secondary' />
  </Box>
  }
  return (
    <Stack direction={'row'} justifyContent={'space-around'} className='h-fit p-10 md: mx-40' gap={3}>
      {load && (
        <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
          <LinearProgress color='secondary' />
        </Box>
      )}
      <Stack className=' w-[50%] p-5 ' justifyContent={'center'} gap={2}>
          <Box className='flex justify-center'>
            <Avatar sx={{ width: 250, height: 250 }} />
          </Box>
          <Typography variant='h5' textAlign={'center'}>{user?.userName}</Typography>
          <Box className='flex justify-center'>
            <Button  variant="contained" color="primary" size='small' onClick={handleClickOpen}>Edit Profile</Button>
          </Box>
      </Stack>
      <Divider orientation="vertical" flexItem className='bg-slate-100'></Divider>
      {/* right section */}
      <Stack className=' w-[50%] p-5 md:mx-36 my-8' gap={1}>
        <Typography variant='body1'><strong>Full Name: </strong></Typography>
        <TextField value={user?.fullName} id="outlined-basic"  variant="outlined" />

        <Typography variant='body1'><strong>Phone No: </strong></Typography>
        <TextField value={user?.phoneNumber} id="outlined-basic"  variant="outlined" />

        <Typography variant='body1'><strong>Address: </strong></Typography>
        <TextField value={user?.address} id="outlined-basic"  variant="outlined" />

        <Typography variant='body1'><strong>City: </strong></Typography>
        <TextField value={user?.city} id="outlined-basic"  variant="outlined" />

        <Typography variant='body1'><strong>PinCode: </strong></Typography>
        <TextField value={user?.pinCode} id="outlined-basic"  variant="outlined" />
      </Stack>

    <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form'
        }}
      >
    <DialogTitle>Edit Profile</DialogTitle>
    <DialogContent>
        <TextField value={phone} onChange={(e)=>setPhone(e.target.value)} autoFocus margin="dense" id="phoneNo" name='phoneNo' label="Phone Number" type="number" fullWidth variant="outlined"/>
        <TextField value={address} onChange={(e)=>setAddress(e.target.value)} autoFocus margin="dense" id="address" name='address' label="Address" type="text" fullWidth variant="outlined"/>
        <TextField value={city} onChange={(e)=>setCity(e.target.value)} autoFocus margin="dense" id="city" name='city' label="City" type="text" fullWidth variant="outlined"/>
        <TextField value={pincode} onChange={(e)=>setPincode(e.target.value)} autoFocus margin="dense" id="pincode" name='pincode' label="Pincode" type="number" fullWidth variant="outlined"/>
    </DialogContent>
    <DialogActions className='mx-4'>
        <Button disabled={load} onClick={handleClose} >Cancel</Button>
        <Button disabled={load} onClick={(e)=>handleSubmit(e)} type="submit" variant='contained'>Edit</Button>
    </DialogActions>
    </Dialog>
    </Stack>
  )
}

export default Profile