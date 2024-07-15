import { Box, Divider, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import logo from '../assets/Images/iphone12.jpg'

import React from 'react'
import { useDispatch } from 'react-redux';
import { RemoveFromCart } from '../Actions/ProductActions';

const CartProductCard = ({id,name, price,desc,quantity, onQuantityChange}) => {
    const dispatch = useDispatch();
    
    const handleChange = (event) => {
        const newQuantity = event.target.value;
        onQuantityChange(id, newQuantity);
      };
    
  const handleClick = () => {
    dispatch(RemoveFromCart(id));
  }
  return (
    <>
    <Box className="w-full p-2 " >
        <Stack direction={'row'} gap={2} >

            <img src={logo} alt="ProductImage" width={100} className='p-2' height={100} />
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} className='w-full'>
                <Stack direction={'column'} >
                    <Typography fontWeight={600} variant='h6'>{name}</Typography>
                    <Typography variant='caption'>{desc}</Typography>
                    <button onClick={handleClick} className='text-blue-600 w-fit'>Remove</button>
                </Stack>
                <Stack direction={'row'} alignItems={'center'}  gap={3} mx={2}>
                    <Typography>₹{price*quantity}</Typography>
                    <FormControl sx={{ m: 1, minWidth:70 }} size="small">
                        <InputLabel id="demo-select-small-label">Quantity</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={quantity}
                            label="Quantity"
                            onChange={handleChange}
                            >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>
        </Stack>
    </Box>
        <Divider variant='middle'></Divider>
    </>
  )
}

export default CartProductCard