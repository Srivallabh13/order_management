import React, { useEffect, useState } from 'react';
import logo from "../assets/Images/iphone12.jpg";
import { Box, Button, Divider, Fab, LinearProgress, Stack, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PaymentIcon from '@mui/icons-material/Payment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart, CheckInventory, IsAvailable } from '../Actions/ProductActions';
import { getUserById } from '../Actions/UserActions';
import { useAlert } from 'react-alert';
import { CreateOrder } from '../Actions/OrderAction';
 
const SingleProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const { user } = useSelector((state) => state.currentUser);
  const { loading: loadingStatus } = useSelector((state) => state.outOfStock);
  const { isAvailable, loading: loadingAvailability } = useSelector((state) => state.IsAvailable);
  const { user: userDetails, loading: loadingUser } = useSelector((state) => state.userById);
  const { id } = useParams();
  const alert = useAlert();
 
  useEffect(() => {
    dispatch(getUserById(user?.id));
  }, [dispatch, user?.id]);
 
  const handleAddToCart = (product, quantity) => {
    dispatch(AddToCart({ ...product, quantity }));
    alert.info("Successfully added to cart");
  };
 
  useEffect(() => {
    dispatch(IsAvailable({ prodId: parseInt(id), quantity }));
  }, [dispatch, id, quantity]);
 
  const handleBuyNow = async (product, quantity) => {
    if (!userDetails?.address || !userDetails?.pinCode) {
      alert.error("Please update your profile with an address.");
      navigate('/profile'); // Redirect to profile page if address is null
      return;
    }
 
    try {
      setLoading(true);
 
      const orderData = {
        products: [{ id: product.productID, quantity }],
        custId: user.id,
        price: product.price * quantity,
      };
      const products = [{ prodId: product.productID, quantity }];
      await dispatch(CheckInventory(products));
      await dispatch(CreateOrder(orderData)).then(() => {
        navigate('/orderSuccess');
        alert.success("Order created successfully!");
      })
        .catch(error => {
          alert.error("Failed to create order: " + error.message);
        });
      setLoading(false);
    }
    catch (error) {
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
        setLoading(false);
      }
    };
 
    fetchData();
  }, [id]);
 
  if (loadingUser || loadingStatus || loadingAvailability) {
    return <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
      <LinearProgress color='secondary' />
    </Box>
  }
 
  return (
    <Stack direction={'row'} className='h-[87%] p-10' gap={3}>
      {loading &&
        <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
          <LinearProgress color='secondary' />
        </Box>
      }
 
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
              <Fab size='small' disabled={quantity <= 1 || loading} onClick={() => setQuantity(quantity - 1)} className='bg-gray-200 py-1 px-1 rounded-lg'>-</Fab>
              <Typography className='py-2 px-3 rounded-lg'>{quantity}</Typography>
              <Fab size='small' disabled={quantity >= 5 || loading || !isAvailable} onClick={() => setQuantity(quantity + 1)} className='bg-gray-200 py-1 px-1 rounded-lg'>+</Fab>
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
            FREE delivery <span style={{ fontWeight: 'bold' }}>Sunday, 21 July.</span>
          </Typography>
        </Box>
        <Box mb={3}>
          <Typography variant='body2' fontWeight={350}>
            Or fastest delivery <span style={{ fontWeight: 'bold' }}>Sunday, 21 July</span>. Order within <span style={{ color: 'green', fontWeight: 'bold' }}>13 hrs</span>.
          </Typography>
        </Box>
 
        <Box display="flex" alignItems="center" mb={3}>
          <LocationOnIcon />
          {userDetails?.address && userDetails?.pinCode ? (
            <Typography variant='caption' ml={1} color={'brown'}>
              Delivering to {userDetails.address} {userDetails.pinCode}
            </Typography>
          ) : (
            <Typography variant='caption' ml={1} color={'brown'}>
              Address information not available
            </Typography>
          )}
        </Box>
 
        <Box>
          {isAvailable ?
            <Typography variant='body2' fontSize={20} mb={4} color={'green'}>
              In Stock
            </Typography>
            :
            <Typography variant='body2' fontSize={20} mb={4} color={'red'}>
              Out of Stock
            </Typography>
          }
        </Box >
        <Stack direction={'column'} gap={2}>
          <Button variant='contained' disabled={loading || !isAvailable} onClick={() => handleBuyNow(product, quantity)} className='w-full  '>Buy Now</Button>
          <Button variant='contained' disabled={loading || !isAvailable} onClick={() => handleAddToCart(product, quantity)} className='w-full '>Add To Cart</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
 
export default SingleProductPage;