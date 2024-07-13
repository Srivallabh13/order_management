import React from 'react'
import logo from "../assets/Images/iphone12.jpg"
import { Box,Container, Divider, Fab, Stack, Typography } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PaymentIcon from '@mui/icons-material/Payment';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const sampleProduct ={
    name: "Apple iPhone 12 (128GB)",
    desc: "Lorem Ipsum",
    price: 45999,
    imgUrl:logo
}
const SingleProductPage = () => {
  return (
    <Stack direction={'row'} className='h-[87%] p-10' gap={3}>
        <Box className='flex w-[40%]'>
        <Box className='w-full h-[90%] my-auto' style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px' }}>
        </Box>
      </Box>
        <Stack className=' w-[30%] p-5 '  gap={1}>
            <Stack direction={'column'} gap={1}>
                <Typography variant='h6' fontWeight={500}>
                    {sampleProduct.name}
                </Typography>
                <Typography variant='caption 'fontWeight={100}>
                    {sampleProduct.desc}
                </Typography>
                <Typography variant='caption 'fontWeight={600}  className='text-2xl'>
                ₹ {sampleProduct.price}
                </Typography>

                <Typography variant='caption 'fontWeight={300} fontSize={15} className='text-1xl'>
                Inclusive of all taxes
                </Typography>
                <Box className='flex gap-1 flex-row items-center mb-3'>
                    <Fab size='small' className='bg-gray-200 py-1 px-1 rounded-lg'>-</Fab>
                    <Typography className='py-2 px-3 rounded-lg'>1</Typography>
                    <Fab size='small' className='bg-gray-200 py-1 px-1 rounded-lg'>+</Fab>
                </Box>

                <Divider className='bg-slate-400'></Divider>

                <Stack direction={'row'} justifyContent="space-around" gap={3} mt={2} >
                    <Stack direction={'column'} gap={1} alignItems='center'>
                      <SwapHorizIcon />
                      <Typography variant='caption' fontWeight={400} textAlign={'center'} >
                        10 days return & exchange
                      </Typography>
                    </Stack>
                    <Stack direction={'column'} gap={1} alignItems='center'>
                      <PaymentIcon />
                      <Typography variant='caption' fontWeight={400} textAlign={'center'}>
                        Pay on delivery
                      </Typography>
                    </Stack>
                    <Stack direction={'column'} gap={1} alignItems='center'>
                      <LocalShippingIcon />
                      <Typography variant='caption' fontWeight={400} textAlign={'center'}>
                        Free delivery
                      </Typography>
                    </Stack>
                </Stack> 
            </Stack>
        </Stack>
        <Stack className='w-[30%] p-5'>
        <Box mb={2}>
          <Typography variant='body2' fontWeight={350}>
            FREE delivery <span style={{ fontWeight: 'bold' }}>Friday, 12 July.</span>
          </Typography>
        </Box>
        <Box mb={3}>
          <Typography variant='body2' fontWeight={350}>
            Or fastest delivery <span style={{ fontWeight: 'bold' }}>Tomorrow, 11 July</span>. Order within <span style={{ color: 'green' ,fontWeight: 'bold' }}>13 hrs</span>.
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={3}>
          <LocationOnIcon />
          <Typography variant='caption' ml={1} color={'brown'}>
            Delivering to Mumbai 400001-
            {/* <Link href="/profile" underline="hover">update Location</Link> */}
          </Typography>
        </Box>
        <Box>
          <Typography variant='body2' fontSize={20}  mb={4} color={'green'}>
            In Stock
          </Typography>
        </Box>
        <button className='w-full py-1 bg-blue-900 text-white rounded-lg hover:bg-blue-800 p-2 mb-3'>Buy Now</button>
        <button className='w-full py-1 bg-sky-700 text-white rounded-lg hover:bg-sky-600 p-2'>Add To Cart</button>
      </Stack>
    </Stack>
  )
}

export default SingleProductPage