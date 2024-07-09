import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material'
import logo from '../assets/iphone12.jpg'

import React from 'react'

const CartProductCard = ({name, price,desc}) => {
  return (
    <>
    <Box className="w-full p-2" >
        <Stack direction={'row'} gap={2} >

            <img src={logo} alt="ProductImage" width={100} className='p-2' height={100} />
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} className='w-full'>
                <Stack direction={'column'} >
                    <Typography fontWeight={600} variant='h6'>{name}</Typography>
                    <Typography variant='caption'>{desc}</Typography>
                    <a className='text-blue '>Remove</a>
                </Stack>
                <Typography>₹{price}</Typography>
            </Stack>
        </Stack>
    </Box>
        <Divider variant='middle'></Divider>
    </>
  )
}

export default CartProductCard