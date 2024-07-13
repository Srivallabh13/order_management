import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,Stack,Box,Typography,Button } from '@mui/material'
import React, { useState } from 'react'

const EditProfileDialog = () => {

    const [open,setOpen] = useState(false);
    const sampleProfile = {
        imageUrl: "https://st5.depositphotos.com/64247946/67989/v/450/depositphotos_679891244-stock-illustration-male-female-face-silhouette-icon.jpg",
        username: "Renuka",
        Email: "renukauyyuru@gmail.com",
        PhoneNo: 1234567890,
        Address: "xyznssj,medchal",
        city: "Hyderabad",
        pincode: 500043
      }
  return (
    <div>
        <Dialog open={open} onClose={() => setOpen(true)} fullWidth maxWidth="sm">
            <DialogTitle>Edit Your Details</DialogTitle>
            <DialogContent>
                <DialogContentText>
                        <Stack spacing={2} alignItems="center">
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
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button>Discard</Button>
                <Button>Save</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default EditProfileDialog