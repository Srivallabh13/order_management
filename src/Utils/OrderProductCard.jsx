import { Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Product from '../assets/Images/iphone12.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../Actions/ProductActions'
import axios from 'axios'
import { Link } from 'react-router-dom'

const OrderProductCard = ({id, quantity}) => {
  // useEffect(()=> {
  //   dispatch(getProductDetails(id));
  // },[dispatch,id])
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(id)
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
  // console.log(id, quantity, status);
  return (
    <div className='p-2'>
        {/* <Typography variant='h6'>{status}</Typography> */}
        {/* {status === "Confirmed" ?
          <Typography variant='subtitle2'>Package is getting ready to dispatch</Typography> : status ==='Dispatched' ? <Typography variant='subtitle2'>Package has been dispatched</Typography> : status ==='Shipped' ? <Typography variant='subtitle2'>Package has been shipped</Typography>:  <Typography variant='subtitle2'>Package was handed to resident</Typography>} */}
        <Stack direction={'row'} gap={2} p={1}>
            <img src={Product} alt="" width={100} height={100} />
            <Link to={`/singleproduct/${id}`}>
              <Stack direction={'column'} className='w-full'  gap={1}>
                  <Typography className='overflow-hidden' fontWeight={600} noWrap >{product?.productName}</Typography>
                  <Typography className='overflow-hidden' variant='subtitle2' >Quantity: <span className='font-semibold'>{quantity}</span></Typography>
                  <Button variant='contained' className='w-fit' >Buy Again</Button>
              </Stack>
            </Link>
        </Stack>
    </div>
  )
}

export default OrderProductCard