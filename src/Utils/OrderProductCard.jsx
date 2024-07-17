import { Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Product from '../assets/Images/iphone12.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom'

const OrderProductCard = ({id, quantity, flag = true}) => {
  // useEffect(()=> {
  //   dispatch(getProductDetails(id));
  // },[dispatch,id])
  const [product, setProduct] = useState(null);
  console.log(id)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7076/api/Products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <div className='p-2'>
        <Stack direction={'row'} gap={2} p={1}>
            <img src={Product} alt="" width={100} height={100} />
            <Link to={`/singleproduct/${id}`}>
              <Stack direction={'column'} className='w-full'  gap={1}>
                  <Typography className='overflow-hidden' fontWeight={600} noWrap >{product?.productName}</Typography>
                  <Typography className='overflow-hidden' variant='subtitle2' >Quantity: <span className='font-semibold'>{quantity}</span></Typography>
                  {flag === false ? 
                    <Typography className='overflow-hidden' variant='subtitle2' >
                      {quantity} X ₹{product?.price} ={" "} <b>₹{product?.price * quantity}</b>
                    </Typography>
                  : 
                    <Button variant='contained' className='w-fit' >Buy Again</Button>
                  }
              </Stack>
            </Link>
        </Stack>
    </div>
  )
}

export default OrderProductCard