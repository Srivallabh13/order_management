import { Box, Button, Card, Divider, LinearProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CartProductCard from './CartProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { CheckInventory, clearCart, UpdateCart } from '../Actions/ProductActions';
import { useNavigate } from 'react-router-dom'; 
import { useAlert } from 'react-alert';
import axios from 'axios';
import { getUserById } from '../Actions/UserActions';

const Cart = () => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  const { products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const { user: userDetails, loading: loadingUser } = useSelector((state) => state.userById);

  useEffect(() => {
    dispatch(getUserById(user?.id));
  }, [dispatch, user?.id]);

  const handleCheckout = async (products) => {
    try {
      if (!userDetails?.phoneNumber || !userDetails?.pinCode || !userDetails?.city || !userDetails?.address || !userDetails?.fullName) {
        alert.error("Please update your profile.");
        navigate('/profile');
        return;
      }
      setLoading(true);
      let cartProducts = [];
      let productsInCart = [];
      let total = 0;
  
      for (const product of products) {
        cartProducts = [...cartProducts, { id: product.productID, quantity: product.quantity }];
        productsInCart = [...productsInCart, { prodId: product.productID, quantity: product.quantity }];
        total += product.quantity * product.price;
      }

      const orderData = {
        products: cartProducts,
        custId: user.id, 
        price: total
      };
  
      const result = await dispatch(CheckInventory(productsInCart));
      if (result?.length === 0) {
        await axios.post('Order/create', orderData);
        sessionStorage.removeItem('cart');
        dispatch(clearCart());
        navigate('/orderSuccess');  
      } else {
        alert.error(`Products with id: ${result.map((item) => item)} are currently unavailable`);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error creating order:', error);
      setLoading(false);
    }
  };
  
  const handleQuantityChange = (productID, quantity) => {
    dispatch(UpdateCart(productID, quantity));
  };

  useEffect(() => {
    let totalAmount = 0;
    products && products.forEach((product) => {
      totalAmount += product.quantity * product.price;
    });
    setAmount(totalAmount);
  }, [products]);

  return (
    <Box className='w-full flex flex-col md:flex-row py-10 px-5 md:px-24 gap-6'>
      {loading && loadingUser && (
        <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
          <LinearProgress color='secondary' />
        </Box>
      )}
      <div className='w-full md:w-2/3'>
        <Typography variant='h4' fontWeight={600} className='pb-10'>Shopping Cart</Typography>
        {products?.length <= 0 ? 
          <Typography variant='h6' className='text-slate-400'>Your cart is empty. Try adding some products to the cart!</Typography>
          : 
          <>
            <Typography className='font-bold'>Products in Cart</Typography>
            <Divider color='black' variant='fullWidth' />
            <div className="h-[480px] overflow-y-auto">
              {products && products.map(product => (
                <CartProductCard 
                  key={product.productID}
                  id={product.productID}
                  imageUrl={product?.imageUrl}
                  name={product.productName}
                  price={product.price}
                  desc={product.description}
                  quantity={product.quantity}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
          </>
        }
      </div>
      <Card className='p-4 w-full md:w-1/3'>
        <Stack direction='column' gap={2} className='p-3'>
          <Typography variant='h6' fontWeight={600}>Subtotal ({products && products.length} item):</Typography>
          <Typography variant='h5' fontWeight={600}>₹ {amount}</Typography>
          <Button disabled={loading || products?.length <= 0} onClick={() => handleCheckout(products)} variant='contained' fullWidth>
            Checkout
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

export default Cart;
