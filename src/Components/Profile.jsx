// import React, { useEffect, useState } from 'react';
// import { Avatar, Box, Button, Typography, Stack, TextField, Divider, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress, Menu, MenuItem, Backdrop } from '@mui/material';
// import { Email, Phone, Home, LocationCity, PushPin, PhotoCamera } from '@mui/icons-material';
// import { useDispatch, useSelector } from 'react-redux';
// import { DeleteUser, getUser, getUserById, UpdateUser } from '../Actions/UserActions';
// import { useAlert } from 'react-alert';
// import { AddPhoto } from '../Actions/PhotoActions';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [openImageDialog, setOpenImageDialog] = useState(false);
//   const [imageMenuAnchor, setImageMenuAnchor] = useState(null);
//   const [openBackdrop, setOpenBackdrop] = useState(false);
//   const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [load, setLoad] = useState(false);

//   const alert = useAlert();
//   const {id} = useSelector((state) => state.currentUser.user);
//   const { user: CurrentUser } = useSelector((state) => state.currentUser);
//   const { user, loading } = useSelector((state) => state.userById);

//   const [profile, setProfile] = useState(user?.imageUrl);

//   useEffect(() => {
//     if (user) {
//       setAddress(user.address || "");
//       setCity(user.city || "");
//       setPhone(user.phoneNumber || "");
//       setPincode(user.pinCode || 0);
//     }
//   }, [user]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleDeleteAccountOpen = () => {
//     setOpenDeleteAccount(true);
//   };

//   const handleDeleteAccountClose = () => {
//     setOpenDeleteAccount(false);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);

//     const Reader = new FileReader();
//     Reader.readAsDataURL(file);

//     Reader.onload = () => {
//       if (Reader.readyState === 2) {
//         setProfile(Reader.result);
//       }
//     };
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleImageClick = (event) => {
//     setImageMenuAnchor(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setImageMenuAnchor(null);
//   };

//   const handleBackdropOpen = () => {
//     setImageMenuAnchor(null);
//     setOpenBackdrop(true);
//   };

//   const handleBackdropClose = () => {
//     setOpenBackdrop(false);
//   };

//   const handleImageEditOpen = () => {
//     setImageMenuAnchor(null);
//     setOpenImageDialog(true);
//   };

//   const handleImageEditClose = () => {
//     setOpenImageDialog(false);
//     setProfile(user?.imageUrl);
//   };

//   const handleImageEditSubmit = async () => {
//     setLoad(true);
//     let photo = await dispatch(AddPhoto(selectedImage, CurrentUser));
//     if (photo) {
//       await dispatch(getUser());
//       await dispatch(getUserById(id));
//       setProfile(null);
//       setSelectedImage(null);
//     }
//     handleImageEditClose();
//     setLoad(false);
//   };

//   const handleDeleteAccount = async () => {
//     setLoad(true);
//     let result = dispatch(DeleteUser(id));
//     if (result) {
//       alert.success("Successfully Deleted Your Account!");
//       navigate('/');
//       localStorage.removeItem('jwt');
//       sessionStorage.removeItem('cart');
//       dispatch(getUser());
//     } else {
//       alert.info("Cannot process your request.");
//     }
//     setLoad(false);
//   };

//   const handleSubmit = (e) => {
//     setLoad(true);
//     e.preventDefault();
//     const formData = new FormData();
//     if (phone && phone.length > 0) {
//       formData.append("phoneNumber", phone);
//     }
//     if (address && address.length > 0) {
//       formData.append("address", address);
//     }
//     if (city && city.length > 0) {
//       formData.append("city", city);
//     }
//     if (pincode && pincode.length > 0) {
//       formData.append("pinCode", pincode);
//     }
//     dispatch(UpdateUser(id, formData))
//       .then(() => {
//         dispatch(getUserById(id));
//         handleClose();
//         alert.success("Profile updated successfully");
//         setLoad(false);
//       })
//       .catch(error => {
//         alert.error("Failed to update profile: " + error.message);
//         setLoad(false);
//       });
//   };

//   useEffect(() => {
//     dispatch(getUserById(id));
//   }, [dispatch, id]);

//   if (loading) {
//     return <Box className="w-full absolute top-0 left-0">
//       <LinearProgress color="secondary" />
//     </Box>;
//   }

//   return (
//     <div className="bg-gradient-to-r from-blue-600 to-teal-200 min-h-[65vh] flex items-center justify-center">
//       {load && (
//         <Box className="w-full absolute top-0 left-0">
//           <LinearProgress color="secondary" />
//         </Box>
//       )}
//       <div className="bg-gray-100 w-1/2 h-3/5 p-10 rounded-lg shadow-md flex absolute top-1/4">
//         <div className="flex flex-col w-1/2 gap-5 items-center">
//         <Box className='flex justify-center ' position='relative'>
//           <Avatar src={user?.imageUrl} sx={{ width: 250, height: 250, cursor: 'pointer' }} onClick={handleImageClick} />
//           <Box
//             className='hover-overlay'
//             sx={{
//               position: 'absolute', top: 0, left: 0, width: "100%", height: 250, display: 'flex', borderRadius:'50px',
//               justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',
//               opacity: 0, transition: 'opacity 0.3s', '&:hover': { opacity: 1 }
//             }}
//             onClick={handleImageClick}
//           >
//             <PhotoCamera sx={{ color: 'white', fontSize: 50 }} />
//           </Box>
//         </Box>
//           <Button variant="contained" color="primary" sx={{width:"50%"}} className="mb-4" onClick={handleClickOpen}>
//             Edit Profile
//           </Button>
//           <Button variant="contained" color="error" sx={{width:"50%"}} onClick={handleDeleteAccountOpen}>
//             Delete Account
//           </Button>
//         </div>
//         {/* <Divider orientation="vertical" flexItem className='bg-slate-100'></Divider> */}

//         <Stack direction={'column'} alignItems={'center'} spacing={3} className=' w-1/2 align-middle mt-4 '>
//           <Typography variant='h4' fontWeight={600} >{user?.fullName}</Typography>
//           <ul className="text-gray-700 space-y-7">
//             <li className="flex items-center">
//               <Email className="mr-2" /> {user?.email}
//             </li>
//             <li className="flex items-center">
//               <Phone className="mr-2" /> {user?.phoneNumber}
//             </li>
//             <li className="flex items-center">
//               <Home className="mr-2" /> {user?.address}
//             </li>
//             <li className="flex items-center">
//               <LocationCity className="mr-2" /> {user?.city}
//             </li>
//             <li className="flex items-center">
//               <PushPin className="mr-2" /> {user?.pinCode}
//             </li>
//           </ul>
//         </Stack>
//       </div>

//       {/* Edit Profile Dialog */}
//       <Dialog open={open} onClose={handleClose} PaperProps={{ component: 'form' }}>
//         <DialogTitle>Edit Profile</DialogTitle>
//         <DialogContent>
//           <TextField value={phone} onChange={(e) => setPhone(e.target.value)} margin="dense" id="phoneNo" name="phoneNo" label="Phone Number" type="number" fullWidth variant="outlined" />
//           <TextField value={address} onChange={(e) => setAddress(e.target.value)} margin="dense" id="address" name="address" label="Address" type="text" fullWidth variant="outlined" />
//           <TextField value={city} onChange={(e) => setCity(e.target.value)} margin="dense" id="city" name="city" label="City" type="text" fullWidth variant="outlined" />
//           <TextField value={pincode} onChange={(e) => setPincode(e.target.value)} margin="dense" id="pincode" name="pincode" label="Pincode" type="number" fullWidth variant="outlined" />
//         </DialogContent>
//         <DialogActions className="mx-4">
//           <Button disabled={load} onClick={handleClose}>Cancel</Button>
//           <Button disabled={load} onClick={(e) => handleSubmit(e)} type="submit" variant="contained">Edit</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Image Menu */}
//       <Menu
//         anchorEl={imageMenuAnchor}
//         open={Boolean(imageMenuAnchor)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem onClick={handleBackdropOpen}>View Image</MenuItem>
//         <MenuItem onClick={handleImageEditOpen}>Edit Image</MenuItem>
//       </Menu>

//       {/* Image Backdrop */}
//       <Backdrop
//         open={openBackdrop}
//         onClick={handleBackdropClose}
//         className="text-white z-50"
//       >
//         <img src={user?.imageUrl} alt="User" className="max-w-90 max-h-90" />
//       </Backdrop>

//       {/* Image Edit Dialog */}
//       <Dialog open={openImageDialog} onClose={handleImageEditClose}>
//         <DialogTitle>Edit Image</DialogTitle>
//         <DialogContent>
//           <Box className='flex justify-center'>
//             <Avatar src={profile ? profile : user?.imageUrl} sx={{ width: 250, height: 250 }} />
//           </Box>
//           <Button
//             variant="contained"
//             component="label"
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             Choose File
//             <input
//               type="file"
//               hidden

//               onChange={handleImageChange}
//             />
//           </Button>
//         </DialogContent>
//         <DialogActions className='mx-4'>
//           <Button onClick={handleImageEditClose}>Cancel</Button>
//           <Button onClick={handleImageEditSubmit} variant='contained'>Save</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Account Dialog Box */}
//       <Dialog open={openDeleteAccount} onClose={handleDeleteAccountClose}>
//         <DialogTitle>Delete Account</DialogTitle>
//         <Divider />
//         <DialogContent>
//           <Typography variant="h6">Are you sure, you want to delete your account?</Typography>
//         </DialogContent>
//         <DialogActions className="m-4">
//           <Button onClick={handleDeleteAccountClose}>Cancel</Button>
//           <Button variant="contained" component="label" color="error" onClick={handleDeleteAccount}>Delete</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Typography, Stack, TextField, Dialog, useMediaQuery, useTheme, DialogTitle, DialogContent, DialogActions, LinearProgress, Menu, MenuItem, Backdrop } from '@mui/material';
import { Email, Phone, Home, LocationCity, PushPin, PhotoCamera } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUser, getUser, getUserById, UpdateUser } from '../Actions/UserActions';
import { useAlert } from 'react-alert';
import { AddPhoto } from '../Actions/PhotoActions';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [imageMenuAnchor, setImageMenuAnchor] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [load, setLoad] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isLaptop = useMediaQuery(theme.breakpoints.between(600, 1024));

  const alert = useAlert();
  const { id } = useSelector((state) => state.currentUser.user);
  const { user: CurrentUser } = useSelector((state) => state.currentUser);
  const { user, loading } = useSelector((state) => state.userById);

  const [profile, setProfile] = useState(user?.imageUrl);

  useEffect(() => {
    if (user) {
      setAddress(user.address || "");
      setCity(user.city || "");
      setPhone(user.phoneNumber || "");
      setPincode(user.pinCode || 0);
    }
  }, [user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDeleteAccountOpen = () => {
    setOpenDeleteAccount(true);
  };

  const handleDeleteAccountClose = () => {
    setOpenDeleteAccount(false);
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
  };

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
    let photo = await dispatch(AddPhoto(selectedImage, CurrentUser));
    if (photo) {
      await dispatch(getUser());
      await dispatch(getUserById(id));
      setProfile(null);
      setSelectedImage(null);
    }
    handleImageEditClose();
    setLoad(false);
  };

  const handleDeleteAccount = async () => {
    setLoad(true);
    let result = dispatch(DeleteUser(id));
    if (result) {
      alert.success("Successfully Deleted Your Account!");
      navigate('/');
      localStorage.removeItem('jwt');
      sessionStorage.removeItem('cart');
      dispatch(getUser());
    } else {
      alert.info("Cannot process your request.");
    }
    setLoad(false);
  };

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
  };

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  if (loading) {
    return <Box className="w-full absolute top-0 left-0">
      <LinearProgress color="secondary" />
    </Box>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-200 min-h-[65vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {load && (
        <Box className="w-full absolute top-0 left-0">
          <LinearProgress color="secondary" />
        </Box>
      )}
      <div style={{width: isMobile?'95%': isLaptop? '60%':'70%', top:isMobile?'11%': isLaptop? '14%' :'20%'}} className="bg-gray-100 absolute max-w-5xl p-3 rounded-lg shadow-md flex flex-col lg:flex-row lg:top-[30%] lg:p-20 items-center lg:items-start justify-between">
        <div className="flex flex-col items-center lg:w-1/2 gap-5">
          <Box className='relative'>
            <Avatar src={user?.imageUrl} sx={{ width: 150, height: 150, cursor: 'pointer' }} onClick={handleImageClick} />
            <Box
              className='hover-overlay'
              sx={{
                position: 'absolute', top: 0, left: 0, width: "100%", height: 150, display: 'flex', borderRadius:'50%',
                justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',
                opacity: 0, transition: 'opacity 0.3s', '&:hover': { opacity: 1 }
              }}
              onClick={handleImageClick}
            >
              <PhotoCamera sx={{ color: 'white', fontSize: 40 }} />
            </Box>
          </Box>
          <Button variant="contained" color="primary" className="w-full lg:w-1/2" onClick={handleClickOpen}>
            Edit Profile
          </Button>
          <Button variant="contained" color="error" className="w-full lg:w-1/2" onClick={handleDeleteAccountOpen}>
            Delete Account
          </Button>
        </div>
        <Stack direction={'column'} alignItems={'center'} spacing={3} className='w-full lg:w-1/2 mt-6 lg:mt-0 lg:ml-6'>
          <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight={600}>{user?.fullName}</Typography>
          <ul className="text-gray-700 space-y-5">
            <li className="flex items-center">
              <Email className="mr-2" /> {user?.email}
            </li>
            <li className="flex items-center">
              <Phone className="mr-2" /> {user?.phoneNumber}
            </li>
            <li className="flex items-center">
              <Home className="mr-2" /> {user?.address}
            </li>
            <li className="flex items-center">
              <LocationCity className="mr-2" /> {user?.city}
            </li>
            <li className="flex items-center">
              <PushPin className="mr-2" /> {user?.pinCode}
            </li>
          </ul>
        </Stack>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={open} onClose={handleClose} PaperProps={{ component: 'form' }}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField value={phone} onChange={(e) => setPhone(e.target.value)} margin="dense" id="phoneNo" name="phoneNo" label="Phone Number" type="number" fullWidth variant="outlined" />
          <TextField value={address} onChange={(e) => setAddress(e.target.value)} margin="dense" id="address" name="address" label="Address" type="text" fullWidth variant="outlined" />
          <TextField value={city} onChange={(e) => setCity(e.target.value)} margin="dense" id="city" name="city" label="City" type="text" fullWidth variant="outlined" />
          <TextField value={pincode} onChange={(e) => setPincode(e.target.value)} margin="dense" id="pincode" name="pincode" label="Pin Code" type="number" fullWidth variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Image Options Menu */}
      <Menu anchorEl={imageMenuAnchor} open={Boolean(imageMenuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={handleImageEditOpen}>Edit</MenuItem>
        <MenuItem onClick={handleBackdropOpen}>Remove</MenuItem>
      </Menu>

      {/* Edit Image Dialog */}
      <Dialog open={openImageDialog} onClose={handleImageEditClose}>
        <DialogTitle>Edit Profile Picture</DialogTitle>
        <DialogContent>
          {selectedImage ? (
            <img src={profile} alt="Profile" className="w-full h-48 object-cover" />
          ) : (
            <Typography>No Image Selected</Typography>
          )}
          <Button variant="contained" component="label" className="mt-4">
            Choose Image
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageEditClose} color="secondary">Cancel</Button>
          <Button onClick={handleImageEditSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Remove Image Backdrop */}
      <Backdrop open={openBackdrop} onClick={handleBackdropClose} className="z-50 flex flex-col items-center justify-center">
        <Typography variant="h6" className="text-white mb-4">Are you sure you want to remove your profile picture?</Typography>
        <div className="flex space-x-4">
          <Button variant="contained" color="primary" onClick={() => { setProfile(null); handleBackdropClose(); }}>Yes</Button>
          <Button variant="contained" color="secondary" onClick={handleBackdropClose}>No</Button>
        </div>
      </Backdrop>

      {/* Delete Account Dialog */}
      <Dialog open={openDeleteAccount} onClose={handleDeleteAccountClose}>
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete your account? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteAccountClose} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
