import React, { useEffect, useState } from 'react';
import logo from "../assets/Images/iphone12.jpg";
import { Box, Divider, Fab, LinearProgress, Stack, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PaymentIcon from '@mui/icons-material/Payment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from '../Actions/ProductActions';
import { getUserById } from '../Actions/UserActions';
import { Loader } from '../Utils/Loader';
import { useAlert } from 'react-alert';

const SingleProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state)=>state.currentUser);
  const userDetails = useSelector((state)=>state.userById.user);
  const { id } = useParams();
  const alert = useAlert();
  useEffect(()=>{
    dispatch(getUserById(user?.id));
  }, [dispatch, user?.id])

    const handleAddToCart = (product, quantity) => {
      dispatch(AddToCart({ ...product, quantity }));
      alert.info("Successfully added to cart");
  };
  

  const handleBuyNow = async (product, quantity) => {
    try {
      setLoading(true);
      const orderData = {
        products: [{ id: product.productID, quantity }],
        custId: user.id, // Replace with actual customer ID
        price: product.price * quantity,
      };
      const response = await axios.post('Order/create', orderData);
      setLoading(false);
      navigate('/orderSuccess');
      alert.success("Order created successfully!");
    } catch (error) {
      setLoading(false);
      console.error('Error creating order:', error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7076/api/Products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false); // Handle error state as needed
      }
    };

    fetchData();
  }, [id]);

  return (
    <Stack direction={'row'} className='h-[87%] p-10' gap={3}>
      {loading && (
        <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
          <LinearProgress color='secondary' />
        </Box>
      )}
      <Box className='flex w-[40%]'>
        <Box className='w-full h-[90%] my-auto' style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px' }}>
        </Box>
      </Box>

      {product && (
        <Stack className='w-[30%] p-5' gap={1}>
          <Stack direction={'column'} gap={1}>
            <Typography variant='h6' fontWeight={600}>
              {product.productName}
            </Typography>
            <Typography variant='caption' fontWeight={100}>
              {product.description}
            </Typography>
            <Typography variant='body' fontWeight={600} className='text-2xl'>
              ₹ {product.price * quantity}
            </Typography>
            <Typography variant='caption' fontWeight={300} fontSize={15} className='text-1xl'>
              Inclusive of all taxes
            </Typography>
            <Box className='flex gap-1 flex-row items-center mb-3'>
              <Fab  size='small' disabled={quantity <= 1 || loading} onClick={() => setQuantity(quantity - 1)} className='bg-gray-200 py-1 px-1 rounded-lg'>-</Fab>
              <Typography className='py-2 px-3 rounded-lg'>{quantity}</Typography>
              <Fab size='small' disabled={quantity >= 5 || loading} onClick={() => setQuantity(quantity + 1)} className='bg-gray-200 py-1 px-1 rounded-lg'>+</Fab>
            </Box>

            <Divider className='bg-slate-400' />

            <Stack direction={'row'} justifyContent="space-between" gap={1} mt={2}>
              <Stack direction={'column'} gap={1} alignItems='center'>
                <SwapHorizIcon />
                <Typography variant='caption' className='flex-wrap' fontWeight={400} textAlign={'center'}>
                  10 days return
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
      )}

      <Stack className='w-[30%] p-5'>
        <Box mb={2}>
          <Typography variant='body2' fontWeight={350}>
            FREE delivery <span style={{ fontWeight: 'bold' }}>Friday, 12 July.</span>
          </Typography>
        </Box>
        <Box mb={3}>
          <Typography variant='body2' fontWeight={350}>
            Or fastest delivery <span style={{ fontWeight: 'bold' }}>Tomorrow, 11 July</span>. Order within <span style={{ color: 'green', fontWeight: 'bold' }}>13 hrs</span>.
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={3}>
          <LocationOnIcon />
          <Typography variant='caption' ml={1} color={'brown'}>
            Delivering to {userDetails?.address} {userDetails?.pinCode}
          </Typography>
        </Box>

        <Box>
          <Typography variant='body2' fontSize={20} mb={4} color={'green'}>
            In Stock
          </Typography>
        </Box>
          <button disabled={loading} onClick={()=> handleBuyNow(product, quantity)} className='w-full py-1 bg-blue-900 text-white rounded-lg hover:bg-blue-800 p-2 mb-3'>Buy Now</button>
          <button disabled={loading} onClick={() => handleAddToCart(product, quantity)} className='w-full py-1 bg-sky-700 text-white rounded-lg hover:bg-sky-600 p-2'>Add To Cart</button>
      </Stack>
    </Stack>
  );
};

export default SingleProductPage;
