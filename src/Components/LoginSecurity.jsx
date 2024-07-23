import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, LinearProgress, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, UpdateUser, updatePassword } from '../Actions/UserActions'; // Assuming updatePassword is a defined action
import { useAlert } from 'react-alert';

const LoginSecurity = () => {
  const [open, setOpen] = useState(false);
  const [editField, setEditField] = useState('');
  const [load, setLoad] = useState(false);
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const { id } = useSelector((state) => state.currentUser.user);
  const { user, loading } = useSelector((state) => state.userById);
  const alert = useAlert();
  const dispatch = useDispatch();
  const handleClickOpen = (field) => {
    setEditField(field);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    setLoad(true)
    event.preventDefault();
    if (editField === 'Password') {
      if (passwords.newPassword !== passwords.confirmPassword) {
        alert.error('New passwords do not match');
        return;
      }
      if(passwords.newPassword === passwords.currentPassword) {
              alert.error("New password and current cannot be same.");
              return;
            }
       
      const formData = new FormData();
      formData.append("currentPassword", passwords.currentPassword);
      formData.append("newPassword", passwords.newPassword);

      dispatch(updatePassword(id, formData))
        .then(() => {
          handleClose();
          alert.success('Password updated successfully');
          setLoad(false);
        })
        .catch((error) => {
          alert.error('Failed to update password: ' + error.message);
          setLoad(false);
        });
    } else {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      dispatch(UpdateUser(id, formJson))
        .then(() => {
          dispatch(getUserById(id));
          handleClose();
          alert.success(`${editField} updated successfully`);
          setLoad(false);
        })
        .catch((error) => {
          alert.error(`Failed to update ${editField}: ${error.message}`);
          setLoad(false);
        });
    }
  };

  const renderDialogContent = () => {
    switch (editField) {
      case 'Full Name':
        return (
          <TextField
            autoFocus
            required
            margin="dense"
            id="fullName"
            name="fullName"
            label="Full Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={user?.fullName}
          />
        );
      case 'Password':
        return (
          <>
            <TextField
              autoFocus
              required
              margin="dense"
              id="currentPassword"
              name="currentPassword"
              label="Current Password"
              type="password"
              fullWidth
              variant="standard"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
            />
            <TextField
              required
              margin="dense"
              id="newPassword"
              name="newPassword"
              label="New Password"
              type="password"
              fullWidth
              variant="standard"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
            />
            <TextField
              required
              margin="dense"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              fullWidth
              variant="standard"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
            />
          </>
        );
      case 'Username':
        return (
          <TextField
            autoFocus
            required
            margin="dense"
            id="userName"
            name="userName"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={user?.userName}
          />
        );
      case 'Email':
        return (
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={user?.email}
          />
        );
      default:
        return null;
    }
  };
  if(loading) {
    return <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
    <LinearProgress color='secondary' />
  </Box>
  }

  return (
    <div className='mx-[30%] mt-2 '>
      {load && 
         <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
         <LinearProgress color='secondary' />
       </Box>
      }
      <Typography variant='h4' className='py-5'>Login and Security</Typography>
      <div className='my-4 rounded-full'>
        <Card variant='outlined' className=''>
          <Stack direction={'row'} p={2} alignItems={'center'} justifyContent={'space-between'}>
            <Stack direction={'column'}>
              <Typography variant='subtitle1' fontWeight={600}>Full Name</Typography>
              <Typography variant='subtitle1'>{user?.fullName}</Typography>
            </Stack>
            <Button variant='contained' className='w-fit h-fit' onClick={() => handleClickOpen('Full Name')}>Edit</Button>
          </Stack>
          <Divider />
          <Stack direction={'row'} p={2} alignItems={'center'} justifyContent={'space-between'}>
            <Stack direction={'column'}>
              <Typography variant='subtitle1' fontWeight={600}>Password</Typography>
              <Typography variant='subtitle1'>*****</Typography>
            </Stack>
            <Button variant='contained' className='w-fit h-fit' onClick={() => handleClickOpen('Password')}>Edit</Button>
          </Stack>
          <Divider />
          <Stack direction={'row'} p={2} alignItems={'center'} justifyContent={'space-between'}>
            <Stack direction={'column'}>
              <Typography variant='subtitle1' fontWeight={600}>Username</Typography>
              <Typography variant='subtitle1'>{user?.userName}</Typography>
            </Stack>
            <Button variant='contained' className='w-fit h-fit' onClick={() => handleClickOpen('Username')}>Edit</Button>
          </Stack>
          <Divider />
          <Stack direction={'row'} p={2} alignItems={'center'} justifyContent={'space-between'}>
            <Stack direction={'column'}>
              <Typography variant='subtitle1' fontWeight={600}>Email</Typography>
              <Typography variant='subtitle1'>{user?.email}</Typography>
            </Stack>
            <Button variant='contained' className='w-fit h-fit' onClick={() => handleClickOpen('Email')}>Edit</Button>
          </Stack>
          <Divider />
        </Card>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Edit {editField}</DialogTitle>
        <DialogContent>
          {renderDialogContent()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Change</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginSecurity;
