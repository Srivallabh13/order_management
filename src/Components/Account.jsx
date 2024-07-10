import { Card, Stack, Typography } from '@mui/material'
import React from 'react'
import Package from '../assets/Images/package.png'
import Profile from '../assets/Images/profile.jpg'
import ContactUs from '../assets/Images/contactImage.png'
import Security from '../assets/Images/login_Security.png'
import Terms from '../assets/Images/terms.jpg'
import { Link } from 'react-router-dom'

const Account = () => {
  return (
    <div className='mx-72 mt-2 h-full'>
        <Stack gap={5} py={3} className=''>
            <Typography variant='h4' fontWeight={600}>
                Your Account
            </Typography>
            <Stack direction={'row'} gap={3} className='h-full flex-wrap'>
                <Card variant='outlined' className='w-[30%] p-4 hover:bg-slate-100'>
                <Link to={'/orders'}>
                    <Stack direction={'row'} gap={2}>
                        <img src={Package} width={80} height={80} alt="package_image" />
                        <Stack direction={'column'} justifyItems={'center'}>
                            <Typography variant='h6' fontWeight={500}>Your Orders</Typography>
                            <Typography variant='subtitle2' className='flex-wrap'>Track or view the orders history</Typography>
                        </Stack>
                    </Stack>
                </Link>
                </Card>
                <Card variant='outlined' className='w-[30%] p-4 hover:bg-slate-100'>
                <Link to={'/'}>
                    <Stack direction={'row'}>
                        <img src={Profile} width={80} height={80} alt="package_image" />
                        <Stack direction={'column'} justifyItems={'center'}>
                            <Typography variant='h6' fontWeight={500}>Your Profile</Typography>
                            <Typography variant='subtitle2' className='flex-wrap'>View and edit your profile</Typography>
                        </Stack>
                    </Stack>
                </Link>
                </Card>
                <Card variant='outlined' className='w-[30%] p-4 hover:bg-slate-100'>
                <Link to={'/security'}>
                    <Stack direction={'row'}>
                        <img src={Security} width={80} height={80} alt="package_image" />
                        <Stack direction={'column'} justifyItems={'center'}>
                            <Typography variant='h6' fontWeight={500}>Login & security</Typography>
                            <Typography variant='subtitle2' className='flex-wrap'>Edit login, name and password</Typography>
                        </Stack>
                    </Stack>
                </Link>
                </Card>
                <Card variant='outlined' className='w-[30%] p-4 hover:bg-slate-100'>
                    <Stack direction={'row'}>
                        <img src={Terms} width={80} height={80} alt="package_image" />
                        <Stack direction={'column'} justifyItems={'center'}>
                            <Typography fontWeight={500}>Terms and Conditions</Typography>
                            <Typography variant='subtitle2' className='flex-wrap'>View our policies</Typography>
                        </Stack>
                    </Stack>
                </Card>
                    <Card variant='outlined' className='w-[30%] p-4 hover:bg-slate-50'>
                        <Link to={'/contact'}>
                        <Stack direction={'row'}>
                            <img src={ContactUs} width={80} height={80} alt="package_image" />
                            <Stack direction={'column'} justifyItems={'center'}>
                                <Typography variant='h6' fontWeight={500}>Contact Us</Typography>
                            </Stack>
                        </Stack>
                        </Link>
                    </Card>
            </Stack>
        </Stack>
    </div>
  )
}

export default Account