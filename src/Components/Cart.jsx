import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CartProductCard from './CartProductCard'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { clearErrors, clearState, UpdateCart } from '../Actions/ProductActions'

const Cart = () => {
  const [amount, setAmount] = useState(0);

  const {products} = useSelector((state)=>state.cart);
  const {user} = useSelector((state)=>state.currentUser)
  const dispatch = useDispatch();

  const handleCheckout = async (products) => {
    try {
      let cartProducts = [];
      let total = 0;
      products && products.forEach((product)=>{
        cartProducts = [...cartProducts, { id: product.productID, quantity: product.quantity }];
        total += product.quantity*product.price;
      })
      const orderData = {
        products: cartProducts,
        custId: user.id, // Replace with actual customer ID
        price: total
      };
      const response = await axios.post('Order/create', orderData);
      sessionStorage.removeItem('cart');
      dispatch(clearState());
      // Handle successful order creation (e.g., show a confirmation message, redirect to order summary page)
    } catch (error) {
      console.error('Error creating order:', error);
      // Handle error (e.g., show an error message)
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
    <Box className='w-full flex py-10 px-24 gap-6'>
      <div className='w-[70%]'>
        <p className='text-4xl pb-10 font-bold'>Shopping Cart</p>
        <p className='font-bold'> Products in Cart</p>
        <Divider color='black' variant='fullWidth' />
          <div className="h-[450px] overflow-y-scroll">

          {products && products.map(product => (
            <CartProductCard 
              id = {product.productID}
              name={product.productName}
              price={product.price}
              desc={product.description}
              quantity={product.quantity}
              onQuantityChange={handleQuantityChange}
            />
          ))}
          </div>
      
      </div>
      <Card className='p-4 w-[30%] h-fit' >
        <Stack direction={'column'} gap={2} className=' p-3'>
          <Typography variant='h6' fontWeight={600}>Subtotal ({products && products.length} item):</Typography>
          <Typography variant='h5' fontWeight={600}>₹ {amount}</Typography>
          <Button onClick={() => handleCheckout(products)} variant='contained' fullWidth>Checkout</Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default Cart