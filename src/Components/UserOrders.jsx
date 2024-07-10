import { Typography } from '@mui/material'
import React from 'react'
import OrderedProduct from './OrderedProduct'

const UserOrders = () => {
    const products = {
        0: {
            Name: "Iphone",
            Price: 100000,
            Desc:"Lorem Ipsum",
            Quantity:2
          },
          1: {
            Name: "Tablet",
            Price: 25000,
            Desc:"Lorem Ipsum",
            Quantity:2
          },
          2:{
            Name: "TV",
            Price: 750000,
            Desc:"Lorem Ipsum",
            Quantity:2
          },
          3:{
            Name:"PS5",
            Price: 50000,
            Desc:"Lorem Ipsum",
            Quantity:2
          },
    }
  return (
    <div className='mx-72 mt-2 h-full'>
        <Typography variant='h4' py={3} fontWeight={600}>Your Orders</Typography>
        {Object.keys(products).map(key => (
          <OrderedProduct
              key={key} 
              name={products[key].Name}
              price={products[key].Price}
              desc={products[key].Desc}
              quantity ={products[key].Quantity}
          />
        ))}
    </div>
  )
}

export default UserOrders