import { Button, Card, Divider, Stack, Typography } from '@mui/material'
import React from 'react'

const LoginSecurity = () => {
  return (
    <div className='mx-[30%] mt-2 '>
        <Typography variant='h4' className='py-5'>Login and Security</Typography>
        <div className='my-4 rounded-full'>

        <Card variant='outlined' className=''>
            <Stack direction={'row'} p={2} alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction={'column'} >
                    <Typography variant='subtitle1' fontWeight={600}>Name</Typography>
                    <Typography variant='subtitle1'>Srivallabh</Typography>
                </Stack>
                <Button variant='contained' className='w-fit h-fit'>Edit</Button>
            </Stack>
            <Divider></Divider>
            <Stack direction={'row'} p={2} alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction={'column'} >
                    <Typography variant='subtitle1' fontWeight={600}>Password</Typography>
                    <Typography variant='subtitle1'>*****</Typography>
                </Stack>
                <Button variant='contained' className='w-fit h-fit'>Edit</Button>
            </Stack>
            <Divider></Divider>
            <Stack direction={'row'} p={2} alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction={'column'} >
                    <Typography variant='subtitle1' fontWeight={600}>Username</Typography>
                    <Typography variant='subtitle1'>Sriva</Typography>
                </Stack>
                <Button variant='contained' className='w-fit h-fit'>Edit</Button>
            </Stack>
            <Divider></Divider>
            <Stack direction={'row'} p={2} alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction={'column'} >
                    <Typography variant='subtitle1' fontWeight={600}>Email</Typography>
                    <Typography variant='subtitle1'>Srivallabhjoshi710@gmail.com</Typography>
                </Stack>
                <Button variant='contained' className='w-fit h-fit'>Edit</Button>
            </Stack>
            <Divider></Divider>
        </Card>
        </div>
    </div>
  )
}

export default LoginSecurity