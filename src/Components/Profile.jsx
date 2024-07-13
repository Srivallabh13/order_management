import React, { useState } from 'react'
import { Avatar, Box, Typography, Button, Stack,TextField } from '@mui/material';
import EditProfileDialog from './EditProfileDialog';


const sampleProfile = {
  imageUrl: "https://st5.depositphotos.com/64247946/67989/v/450/depositphotos_679891244-stock-illustration-male-female-face-silhouette-icon.jpg",
  username: "Renuka",
  Email: "renukauyyuru@gmail.com",
  PhoneNo: "1234567890",
  Address: "xyznssj,medchal",
  city: "Hyderabad",
  pincode: "500043"
}


const Profile = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [profile, setProfile] = useState(sampleProfile);

  const handleEditClick = () => {
    setOpenDialog(true); // Open the dialog when "Edit Profile" button is clicked
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    handleCloseDialog(); // Close the dialog after saving
  };

  return (
    <Stack direction={'row'} className='h-[100%] p-10' gap={3}>
      <Stack className=' w-[50%] p-5 ' gap={1}>
          <Typography variant='h6' textAlign={'center'}>Hello,{sampleProfile.username}</Typography>
          <Box className='flex justify-center'>
          <Avatar alt={sampleProfile.username} src={sampleProfile.imageUrl} sx={{ width: 250, height: 250 }} />
          </Box>
          <Box className='flex justify-center'>
          <Button variant="contained" color="primary" size='small' onClick={handleEditClick}>Edit Profile</Button>
        </Box>

      </Stack>
      {/* right section */}
      <Stack className=' w-[50%] p-5 ' gap={2} mt={'70px'}>
        <Box>
        <Typography variant='body1'><strong>Full Name: </strong>
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>{sampleProfile.username}</span>
          </Typography>
        </Box>
      
        <Box>
          <Typography variant='body1'><strong>Email: </strong>
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>{sampleProfile.Email}</span>
          </Typography>
        
        </Box>
        <Box>
            <Typography variant='body1'><strong>Phone No: </strong>
                <span style={{ color: 'rgba(0,0,0,0.6)' }}>{sampleProfile.PhoneNo}</span>
            </Typography>
        </Box>
        <Box>
            <Typography variant='body1'><strong>Address: </strong>
                <span style={{ color: 'rgba(0,0,0,0.6)' }}>{sampleProfile.Address}</span>
            </Typography>
        </Box>
        <Box>
            <Typography variant='body1'><strong>City: </strong>
                <span style={{ color: 'rgba(0,0,0,0.6)' }}>{sampleProfile.city}</span>
            </Typography>
        </Box>
        <Box>
            <Typography variant='body1'><strong>PinCode: </strong>
                <span style={{ color: 'rgba(0,0,0,0.6)' }}>{sampleProfile.pincode}</span>
            </Typography>
        </Box> 
      </Stack>
        {/* Edit Profile Dialog */}
      <EditProfileDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        profile={profile}
        handleSave={handleSaveProfile}
      />

    </Stack>
  )
}

export default Profile



