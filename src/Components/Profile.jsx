import React, { useEffect, useState } from 'react'
import { Avatar, Box, Typography, Button, Stack, TextField, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, UpdateUser } from '../Actions/UserActions';
import { useAlert } from 'react-alert';

const Profile = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const alert = useAlert();
  const {id} = useSelector((state)=>state.currentUser.user)
    const {user} = useSelector((state)=>state.userById)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=> {
    dispatch(getUserById(id));
  },[dispatch])

  return (
    <Stack direction={'row'} justifyContent={'space-around'} className='h-fit p-10 md: mx-40' gap={3}>
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
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            dispatch(UpdateUser(id, formJson))
                .then(() => {
                    dispatch(getUserById(id));
                    handleClose();
                    alert.success("Profile updated successfully");
                })
                .catch(error => {
                    alert.error("Failed to update profile: " + error.message);
                });
          },
        }}
      >
    <DialogTitle>Edit Profile</DialogTitle>
    <DialogContent>
        <TextField autoFocus margin="dense" id="phoneNo" name='phoneNo' label="Phone Number" type="number" fullWidth variant="outlined"/>
        <TextField autoFocus margin="dense" id="address" name='address' label="Address" type="text" fullWidth variant="outlined"/>
        <TextField autoFocus margin="dense" id="city" name='city' label="City" type="text" fullWidth variant="outlined"/>
        <TextField autoFocus margin="dense" id="pincode" name='pincode' label="Pincode" type="number" fullWidth variant="outlined"/>
    </DialogContent>
    <DialogActions className='mx-4'>
        <Button onClick={handleClose} >Cancel</Button>
        <Button type="submit" variant='contained'>Edit</Button>
    </DialogActions>
    </Dialog>
    </Stack>
  )
}

export default Profile