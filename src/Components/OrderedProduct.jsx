import { Card, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import OrderProductCard from '../Utils/OrderProductCard'

const OrderedProduct = ({order, user}) => {
    const firstProduct = order?.products?.$values?.[0];
    console.log(order);
  return (
    <Card variant='outlined' className='rounded-md my-5 w-full'>
        <Stack direction={'row'} gap={3} p={1} className='bg-slate-200' justifyContent={'space-between'}>
            <Stack direction={'row'} flex={2} justifyContent={'space-between'}>
                <Stack direction={'column'}>
                    <Typography variant='overline'>Order Placed</Typography>
                    <Typography fontWeight={600} variant='subtitle2'>
                            {order?.date ? order.date.substring(0, 10) : 'N/A'}
                        </Typography>
                </Stack>
                <Stack direction={'column'}>
                    <Typography variant='overline'>Total</Typography>
                    <Typography fontWeight={600} variant='subtitle2'>{order.price}</Typography>
                </Stack>
                <Stack direction={'column'}>
                    <Typography variant='overline'>shipped to</Typography>
                    <Typography fontWeight={600} variant='subtitle2'>{user.username}</Typography>
                </Stack>
            </Stack>
            <Stack flex={3} direction={'column'} alignItems={'flex-end'}>
                <Typography variant='overline'>Order # {order.id}</Typography>
                <Link to={`/orderdetails/${order.id}`}>
                  <Typography variant='inherit' className='text-blue-800'>
                    View order details
                  </Typography>
                </Link>
            </Stack>
        </Stack>
        <Divider></Divider>
        
        <Card variant="outlined" className="p-4">
        <Typography variant="h6">{order?.status}</Typography>
        {order?.status === "Confirmed" ? (
          <Typography variant="subtitle2">
            Package is getting ready to dispatch
          </Typography>
        ) : order?.status === "Dispatched" ? (
          <Typography variant="subtitle2">
            Package has been dispatched
          </Typography>
        ) : order?.status === "Shipped" ? (
          <Typography variant="subtitle2">Package has been shipped</Typography>
        ) : (
          <Typography variant="subtitle2">
            Package was handed to resident
          </Typography>
        )}
         {firstProduct && (
          <OrderProductCard
            id={firstProduct?.productId}
            quantity={firstProduct?.quantity}
          />
      )}
      </Card>
      {order?.products?.$values?.length>1?
        <Typography variant='inherit' p={2} className='bg-slate-200'>+{order?.products?.$values?.length-1} more product</Typography>: null
      }
    </Card>
  )
}

export default OrderedProduct