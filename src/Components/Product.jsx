import React from 'react'
import { Stack, Typography } from '@mui/material'
const Product = ({product}) => {
  return (
    <Stack spacing={1} className='p-5 w-64 sm:w-72 h-[100%] rounded-xl bg-gray-200'>

        <img src={product?.imageUrl} className='bg-white w-64 h-64 rounded-lg object-contain' alt="product image" />
        <p className="text-lg truncate">{product.productName}</p>
        <Typography variant='caption' className="line-clamp-2">{product.description}</Typography>
        <p className="text-lg font-semibold">₹{product.price}</p>
    </Stack>
  )
}

export default Product