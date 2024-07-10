import { Card, Stack, Typography } from '@mui/material'
import React from 'react'
import OrderProductCard from '../Utils/OrderProductCard'

const OrderDetails = () => {
  return (
    <div className='mx-72 mt-2 h-full'>
        <Typography variant='h4' pt={3} fontWeight={600}>Order Details</Typography>
        <Stack direction={'row'} gap={5} >
            <Typography variant='subtitle1' py={1} >Ordered on 23 may 2024</Typography>
            <Typography variant='subtitle1' py={1} >Order# 402-4940259-1802722</Typography>
        </Stack>
        <Card className='w-full my-5' variant='outlined' >
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack px={3} direction={'row'} className='w-[30%] py-2'>
                    <Stack direction={'column'} px={1}>
                        <Typography variant='subtitle1' fontWeight={600} py={1} >Shipping Address</Typography>
                        <Typography variant='subtitle1' className='flex-wrap h-full' py={1} >11-6-900, devi bagh nampally beside crimal court 500001</Typography>
                    </Stack>
                </Stack>
                <Stack direction={'row'} className='w-[30%]'>
                    <Stack direction={'column'} className='w-full px-5 py-2' >
                        <Typography variant='subtitle1' fontWeight={600} py={1} >Order Summary</Typography>
                        <Stack direction={'row'} justifyContent={'space-between'} >
                            <Typography variant='subtitle1' className='flex-wrap' >item(s) Subtotal:</Typography>
                            <Typography variant='subtitle1' className='flex-wrap'>₹1700</Typography>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography variant='subtitle1' className='flex-wrap'>Shipping: </Typography>
                            <Typography variant='subtitle1' className='flex-wrap'>₹0</Typography>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography variant='subtitle1' className='flex-wrap' >Total:</Typography>
                            <Typography variant='subtitle1' className='flex-wrap'>₹1700</Typography>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography variant='subtitle1' fontWeight={600} className='flex-wrap'>Grand total:</Typography>
                            <Typography variant='subtitle1' fontWeight={600} className='flex-wrap'>₹1700</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
        <Card variant='outlined'>
            <OrderProductCard />
        </Card>

    </div>
  )
}

export default OrderDetails