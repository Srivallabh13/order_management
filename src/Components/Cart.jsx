import { Box, Button, Card, Divider, LinearProgress, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CartProductCard from './CartProductCard'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { CheckInventory, clearState, UpdateCart } from '../Actions/ProductActions'
import { useNavigate } from 'react-router-dom'; 
import { useAlert } from 'react-alert'

const Cart = () => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  const {products} = useSelector((state)=>state.cart);
  const {outOfStockProducts, loading:loadingStock} = useSelector((state)=>state.outOfStock);
  const {user} = useSelector((state)=>state.currentUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();  

  const handleCheckout = async (products) => {
    try {
      setLoading(true);
      let cartProducts = [];
      let productsInCart = [];
      let total = 0;
      products && products.forEach((product)=>{
        cartProducts = [...cartProducts, { id: product.productID, quantity: product.quantity }];
        productsInCart = [...productsInCart, { prodId: product.productID, quantity: product.quantity }];
        total += product.quantity*product.price;
      })
      console.log(user);
      const orderData = {
        products: cartProducts,
        custId: user.id, // Replace with actual customer ID
        price: total
      };
      await dispatch(CheckInventory(productsInCart)).then(()=> {
        if(outOfStockProducts?.length > 0) {
          alert.error("One of the products in cart is currently unavailable");
        }
        else {
          axios.post('Order/create', orderData);
          sessionStorage.removeItem('cart');
          dispatch(clearState());
          setLoading(false);
          navigate('/orderSuccess');  
          alert.success("Order is successfully created!");
        }
      })
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
    <Box className='w-full flex py-10 px-24 gap-6'>
      {loading && (
        <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
          <LinearProgress color='secondary' />
        </Box>
      )}
      <div className='w-[70%]'>
        <Typography variant='h4' fontWeight={600} className='pb-10'>Shopping Cart</Typography>
      {products?.length <=0 ? 
        <Typography variant='h6' className='text-slate-400'>Your cart is empty. Try adding some products to the cart!</Typography>
      : 
      <>
        <Typography className='font-bold'> Products in Cart</Typography>
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
          </>
      
    }
      </div>
      <Card className='p-4 w-[30%] h-fit' >
        <Stack direction={'column'} gap={2} className=' p-3'>
          <Typography variant='h6' fontWeight={600}>Subtotal ({products && products.length} item):</Typography>
          <Typography variant='h5' fontWeight={600}>₹ {amount}</Typography>
          <Button disabled={loading || products?.length<=0} onClick={() => handleCheckout(products)} variant='contained' fullWidth>Checkout</Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default Cart