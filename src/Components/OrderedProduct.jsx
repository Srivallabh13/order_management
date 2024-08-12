// import { Card, Divider, Stack, Typography } from '@mui/material'
// import React from 'react'
// import { Link } from 'react-router-dom'
// import OrderProductCard from '../Utils/OrderProductCard'

// const OrderedProduct = ({order, user}) => {
//     const firstProduct = order?.products?.$values?.[0];
//     console.log(order);
//   return (
//     <Card variant='outlined' className='rounded-md my-5 w-full'>
//         <Stack direction={'row'} gap={3} p={1} className='bg-slate-200' justifyContent={'space-between'}>
//             <Stack direction={'row'} flex={2} justifyContent={'space-between'}>
//                 <Stack direction={'column'}>
//                     <Typography variant='overline'>Order Placed</Typography>
//                     <Typography fontWeight={600} variant='subtitle2'>{order.date.substring(0, 10)}</Typography>
//                 </Stack>
//                 <Stack direction={'column'}>
//                     <Typography variant='overline'>Total</Typography>
//                     <Typography fontWeight={600} variant='subtitle2'>{order.price}</Typography>
//                 </Stack>
//                 <Stack direction={'column'}>
//                     <Typography variant='overline'>shiped to</Typography>
//                     <Typography fontWeight={600} variant='subtitle2'>{user.username}</Typography>
//                 </Stack>
//             </Stack>
//             <Stack flex={3} direction={'column'} alignItems={'flex-end'}>
//                 <Typography variant='overline'>Order # {order.id}</Typography>
//                 <Link to={`/orderdetails/${order.id}`}>
//                   <Typography variant='inherit' className='text-blue-800'>
//                     View order details
//                   </Typography>
//                 </Link>
//             </Stack>
//         </Stack>
//         <Divider></Divider>
        
//         <Card variant="outlined" className="p-4">
//         <Typography variant="h6">{order?.status}</Typography>
//         {order?.status === "Confirmed" ? (
//           <Typography variant="subtitle2">
//             Package is getting ready to dispatch
//           </Typography>
//         ) : order?.status === "Dispatched" ? (
//           <Typography variant="subtitle2">
//             Package has been dispatched
//           </Typography>
//         ) : order?.status === "Shipped" ? (
//           <Typography variant="subtitle2">Package has been shipped</Typography>
//         ) : (
//           <Typography variant="subtitle2">
//             Package was handed to resident
//           </Typography>
//         )}
//          {firstProduct && (
//           <OrderProductCard
//             id={firstProduct?.productId}
//             quantity={firstProduct?.quantity}
//           />
//       )}
//       </Card>
//       {order?.products?.$values?.length>1?
//         <Typography variant='inherit' p={2} className='bg-slate-200'>+{order?.products?.$values?.length-1} more product</Typography>: null
//       }
//     </Card>
//   )
// }

// export default OrderedProduct

import { Card, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import OrderProductCard from '../Utils/OrderProductCard';

const OrderedProduct = ({ order, user }) => {
  const firstProduct = order?.products?.$values?.[0];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card variant="outlined" className="rounded-md my-5 w-full">
      <Stack direction={{ xs: 'column', md: 'row' }} gap={1} p={1} className="bg-slate-200" justifyContent="space-between">
        <Stack direction={{ xs: 'column', sm: 'row' }} flex={2} justifyContent="space-between">
          <Stack direction={{xs : "row", sm:"column"}} justifyContent={{xs:'space-between', sm:'center'}} className="mb-4 sm:mb-0">
            <Typography variant="overline">Order Placed</Typography>
            <Typography fontWeight={600} sx={{marginY:'auto'}} variant="subtitle2">{order.date.substring(0, 10)}</Typography>
          </Stack>
          <Stack direction={{xs : "row", sm:"column"}} justifyContent={{xs:'space-between', sm:'center'}} className="mb-4 sm:mb-0">
            <Typography variant="overline">Total</Typography>
            <Typography fontWeight={600} sx={{marginY:'auto'}} variant="subtitle2">{order.price}</Typography>
          </Stack>
          <Stack direction={{xs : "row", sm:"column"}} justifyContent={{xs:'space-between', sm:'center'}}>
            <Typography variant="overline">Shipped to</Typography>
            <Typography fontWeight={600} sx={{marginY:'auto'}} variant="subtitle2">{user.username}</Typography>
          </Stack>
        </Stack>
        <Stack flex={3} direction="column" alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
          <Typography variant={isMobile?'caption':'subtitle1'}>Order # {order.id}</Typography>
          <Link to={`/orderdetails/${order.id}`}>
            <Typography variant="inherit" className="text-blue-800">
              View order details
            </Typography>
          </Link>
        </Stack>
      </Stack>
      <Divider />
      
      <Card variant="outlined" className="p-1 sm:p-4">
        <Typography variant="h6">{order?.status}</Typography>
        {order?.status === "Confirmed" ? (
          <Typography variant="subtitle2">
            Package is getting ready to dispatch
          </Typography>
        ) : order?.status === "Dispatched" ? (
          <Typography variant="subtitle2">
            Package has been dispatched
          </Typography>
        ) : order?.status === "Shipped" ? (
          <Typography variant="subtitle2">Package has been shipped</Typography>
        ) : (
          <Typography variant="subtitle2">
            Package was handed to resident
          </Typography>
        )}
        {firstProduct && (
          <OrderProductCard
            id={firstProduct?.productId}
            quantity={firstProduct?.quantity}
          />
        )}
      </Card>
      {order?.products?.$values?.length > 1 ? (
        <Typography variant="inherit" p={2} className="bg-slate-200">
          +{order?.products?.$values?.length - 1} more product{order?.products?.$values?.length > 2 && 's'}
        </Typography>
      ) : null}
    </Card>
  );
};

export default OrderedProduct;
