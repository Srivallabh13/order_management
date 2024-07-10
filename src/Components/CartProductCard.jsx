import { Box, Divider, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import logo from '../assets/Images/iphone12.jpg'

import React from 'react'

const CartProductCard = ({name, price,desc,quantity}) => {
    const [quant, setQuantity] = React.useState(quantity);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };
  return (
    <>
    <Box className="w-full p-2 " >
        <Stack direction={'row'} gap={2} >

            <img src={logo} alt="ProductImage" width={100} className='p-2' height={100} />
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} className='w-full'>
                <Stack direction={'column'} >
                    <Typography fontWeight={600} variant='h6'>{name}</Typography>
                    <Typography variant='caption'>{desc}</Typography>
                    <a className='text-blue '>Remove</a>
                </Stack>
                <Stack direction={'row'} alignItems={'center'}  gap={3} mx={2}>
                    <Typography>₹{price}</Typography>
                    <FormControl sx={{ m: 1, minWidth:70 }} size="small">
                        <InputLabel id="demo-select-small-label">Quantity</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={quant}
                            label="Quantity"
                            onChange={handleChange}
                            >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={3}>4</MenuItem>
                            <MenuItem value={3}>5</MenuItem>
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