import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import OrderedProduct from './OrderedProduct'
import { useDispatch, useSelector } from 'react-redux';
import { OrdersByUser } from '../Actions/UserActions';

const UserOrders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state)=>state.currentUser);

  useEffect(() => {
    dispatch(OrdersByUser(user.id));
  }, [dispatch,user.id])

  const { orders } = useSelector((state)=>state.userOrders);

  return (
    <div className='mx-72 mt-2 h-full'>
        <Typography variant='h4' py={3} fontWeight={600}>Your Orders</Typography>
          {orders && orders.map((order) => (
            <OrderedProduct 
              key={order.id} 
              order= {order} 
              user = {user} 
            />
          ))}
    </div>
  )
}

export default UserOrders