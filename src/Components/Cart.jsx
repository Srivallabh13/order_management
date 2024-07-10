import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import CartProductCard from './CartProductCard'

const Cart = () => {
  const ProductsInCart = {
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
    4:{
      Name:"PS5",
      Price: 50000,
      Desc:"Lorem Ipsum",
      Quantity:2
    },
    5:{
      Name:"PS5",
      Price: 50000,
      Desc:"Lorem Ipsum",
      Quantity:2
    },
    6:{
      Name:"PS5",
      Price: 50000,
      Desc:"Lorem Ipsum",
      Quantity:2
    },
    7:{
      Name:"PS5",
      Price: 50000,
      Desc:"Lorem Ipsum",
      Quantity:2
   },
  }
  return (
    <Box className='w-full flex py-10 px-24 gap-6'>
      <div className='w-[70%]'>
        <p className='text-4xl pb-10 font-bold'>Shopping Cart</p>
        <p className='font-bold'> Products in Cart</p>
        <Divider color='black' variant='fullWidth' />
          <div className="h-[450px] overflow-y-scroll">

          {Object.keys(ProductsInCart).map(key => (
            <CartProductCard 
            key={key} 
            name={ProductsInCart[key].Name}
            price={ProductsInCart[key].Price}
            desc={ProductsInCart[key].Desc}
            quantity={ProductsInCart[key].Quantity}
            />
          ))}
          </div>
      
      </div>
      <Card className='p-4 w-[30%] h-fit' >
        <Stack direction={'column'} gap={2} className=' p-3'>
          <Typography variant='h6' fontWeight={600}>Subtotal (1 item):</Typography>
          <Typography variant='h5' fontWeight={600}>₹59999</Typography>
          <Button variant='contained' fullWidth>Checkout</Button>
        </Stack>
      </Card>


    </Box>
  )
}

export default Cart