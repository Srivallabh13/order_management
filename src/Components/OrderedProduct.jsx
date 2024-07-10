import { Card, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import OrderProductCard from '../Utils/OrderProductCard'

const OrderedProduct = ({name, price, desc, quantity}) => {
  return (
    <Card variant='outlined' className='rounded-md my-5 w-full'>
        <Stack direction={'row'} gap={3} p={1} className='bg-slate-200' justifyContent={'space-between'}>
            <Stack direction={'row'} flex={2} justifyContent={'space-between'}>
                <Stack direction={'column'}>
                    <Typography variant='overline'>Order Placed</Typography>
                    <Typography variant='subtitle2'>23 july 2023</Typography>
                </Stack>
                <Stack direction={'column'}>
                    <Typography variant='overline'>Total</Typography>
                    <Typography variant='subtitle2'>₹1700</Typography>
                </Stack>
                <Stack direction={'column'}>
                    <Typography variant='overline'>shiped to</Typography>
                    <Typography variant='subtitle2'>sriva</Typography>
                </Stack>
            </Stack>
            <Stack flex={3} direction={'column'} alignItems={'flex-end'}>
                <Typography variant='overline'>Order #  402-4940259-1802722</Typography>
                <Link to={'/orderdetails'}>View order details</Link>
            </Stack>
        </Stack>
        <Divider></Divider>
        
        <OrderProductCard />
    </Card>
  )
}

export default OrderedProduct