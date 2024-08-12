import { Box, Divider, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { RemoveFromCart } from '../Actions/ProductActions';

const CartProductCard = ({ id, name, price, desc, quantity, onQuantityChange, imageUrl }) => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const newQuantity = event.target.value;
    onQuantityChange(id, newQuantity);
  };

  const handleClick = () => {
    dispatch(RemoveFromCart(id));
  };

  return (
    <>
      <Box className="w-full p-4">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <img src={imageUrl} alt="ProductImage" width={150} className='object-contain' height={150} />
          <Stack direction='row' justifyContent='space-between' alignItems='center' className='w-full'>
            <Stack direction='column'>
              <Typography fontWeight={600} className="line-clamp-2" variant='h6'>{name}</Typography>
              <Typography variant='caption' className="line-clamp-3">{desc}</Typography>
              <button onClick={handleClick} className='text-blue-600 w-fit mt-2'>Remove</button>
            </Stack>
            <Stack direction='row' alignItems='center' gap={2} mx={2}>
              <Typography>₹{price * quantity}</Typography>
              <FormControl sx={{ minWidth: 70 }} size="small">
                <InputLabel id="quantity-select-label">Quantity</InputLabel>
                <Select
                  labelId="quantity-select-label"
                  id="quantity-select"
                  value={quantity}
                  label="Quantity"
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5].map(value => (
                    <MenuItem key={value} value={value}>{value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Divider variant='middle' />
    </>
  );
};

export default CartProductCard;
