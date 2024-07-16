import React from 'react'
import logo from '../assets/Images/iphone12.jpg'
import { Stack, Typography } from '@mui/material'
const Product = ({product}) => {
  return (
    <Stack spacing={1} className='p-5 w-72 h-[100%] rounded-xl bg-white'>

        <img src={logo} className='bg-cyan-900 w-64 h-64 rounded-lg object-cover' alt="product image" />
        <p className="text-lg truncate">{product.productName}</p>
        <Typography variant='caption' className="line-clamp-2">{product.description}</Typography>
        <p className="text-lg font-semibold">₹{product.price}</p>
    </Stack>
  )
}

export default Product
{/* <button className='w-full py-1 bg-blue-900 text-white rounded-lg hover:bg-blue-800 p-2 mb-3'>Buy Now</button> */}