import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import Product from '../assets/iphone12.jpg'

const OrderProductCard = () => {
  return (
    <div className='p-2'>
        <Typography variant='h6'>Delivered</Typography>
        <Typography variant='subtitle2'>Package was handed to resident</Typography>
        <Stack direction={'row'} gap={2} p={4}>
            <img src={Product} alt="" width={100} height={100} />
            <Stack direction={'column'} className='w-full'  gap={1}>
                <Typography className='overflow-hidden' noWrap >Iphone</Typography>
                <Button variant='contained' className='w-fit' >Buy Again</Button>
            </Stack>
        </Stack>
    </div>
  )
}

export default OrderProductCard