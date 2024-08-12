// import { Box, Card, Divider, LinearProgress, Stack, Typography } from "@mui/material";
// import React, { useEffect } from "react";
// import OrderProductCard from "../Utils/OrderProductCard";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { OrderById } from "../Actions/OrderAction";
// import { getUserById } from "../Actions/UserActions";

// const OrderDetails = () => {
//   const { id } = useParams();

//   const { order, loading } = useSelector((state) => state.orderById);
//   const { user } = useSelector((state) => state.userById);
//   const currentUser = useSelector((state) => state.currentUser.user);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(OrderById(id));
//   }, [dispatch, id]);

//   useEffect(() => {
//     dispatch(getUserById(currentUser.id));
//   }, [dispatch,currentUser.id]);
  
//   if(loading){
//     return <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
//     <LinearProgress color='secondary' />
//   </Box>
//   }
//   return (
//     <div className="mx-72 mt-2 h-full">
//       <Typography variant="h4" pt={3} fontWeight={600}>
//         Order Details
//       </Typography>
//       <Stack direction={"row"} gap={5}>
//         <Typography variant="subtitle1" py={1}>
//           Ordered on {order?.date}
//         </Typography>
//         <Typography variant="subtitle1" py={1}>
//           Order# {order?.id}
//         </Typography>
//       </Stack>
//       <Card className="w-full my-5" variant="outlined">
//         <Stack direction={"row"} justifyContent={"space-between"}>
//           <Stack px={3} direction={"row"} className="w-[30%] py-2">
//             <Stack direction={"column"} px={1}>
//               <Typography variant="subtitle1" fontWeight={600} py={1}>
//                 Shipping Address
//               </Typography>
//               <Typography
//                 variant="subtitle1"
//                 className="flex-wrap h-full"
//                 py={1}
//               >
//                 {user?.address}
//               </Typography>
//             </Stack>
//           </Stack>
//           <Stack direction={"row"} className="w-[30%]">
//             <Stack direction={"column"} className="w-full px-5 py-2">
//               <Typography variant="subtitle1" fontWeight={600} py={1}>
//                 Order Summary
//               </Typography>
//               <Stack direction={"row"} justifyContent={"space-between"}>
//                 <Typography variant="subtitle1" className="flex-wrap">
//                   item(s) Subtotal:
//                 </Typography>
//                 <Typography variant="subtitle1" className="flex-wrap">
//                   ₹{order?.price}
//                 </Typography>
//               </Stack>
//               <Stack direction={"row"} justifyContent={"space-between"}>
//                 <Typography variant="subtitle1" className="flex-wrap">
//                   Shipping:{" "}
//                 </Typography>
//                 <Typography variant="subtitle1" className="flex-wrap">
//                   ₹0
//                 </Typography>
//               </Stack>
//               <Stack direction={"row"} justifyContent={"space-between"}>
//                 <Typography variant="subtitle1" className="flex-wrap">
//                   Total:
//                 </Typography>
//                 <Typography variant="subtitle1" className="flex-wrap">
//                   ₹{order?.price}
//                 </Typography>
//               </Stack>
//               <Stack direction={"row"} justifyContent={"space-between"}>
//                 <Typography
//                   variant="subtitle1"
//                   fontWeight={600}
//                   className="flex-wrap"
//                 >
//                   Grand total:
//                 </Typography>
//                 <Typography
//                   variant="subtitle1"
//                   fontWeight={600}
//                   className="flex-wrap"
//                 >
//                   ₹{order?.price}
//                 </Typography>
//               </Stack>
//             </Stack>
//           </Stack>
//         </Stack>
//       </Card>
//       <Card variant="outlined" className="p-4">
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
//         <Divider></Divider>

//         {order?.products?.$values &&
//           order.products.$values.map((product) => (
//             <>
//               <OrderProductCard
//                 key={product.productId}
//                 id={product?.productId}
//                 quantity={product?.quantity}
//               />
//               <Divider></Divider>
//             </>
//           ))}
//       </Card>
//     </div>
//   );
// };

// export default OrderDetails;


import { Box, Card, Divider, LinearProgress, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import OrderProductCard from "../Utils/OrderProductCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OrderById } from "../Actions/OrderAction";
import { getUserById } from "../Actions/UserActions";

const OrderDetails = () => {
  const { id } = useParams();

  const { order, loading } = useSelector((state) => state.orderById);
  const { user } = useSelector((state) => state.userById);
  const currentUser = useSelector((state) => state.currentUser.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(OrderById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getUserById(currentUser.id));
  }, [dispatch,currentUser.id]);
  
  if (loading) {
    return <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
      <LinearProgress color='secondary' />
    </Box>
  }

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-72 mt-2 h-full">
      <Typography variant="h4" pt={3} fontWeight={600}>
        Order Details
      </Typography>
      <Stack direction={{ xs: 'column', sm:'row'}} gap={{xs:0, sm:5}} >
        <Typography variant="subtitle1" py={1}>
          Ordered on {order?.date?.substring(0,10)}
        </Typography>
        <Typography variant="subtitle1" py={1}>
          Order# {order?.id}
        </Typography>
      </Stack>
      <Card className="w-full my-5" variant="outlined">
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between">
          <Stack px={3} direction="column" className="w-full md:w-[30%] py-2">
            <Typography variant="subtitle1" fontWeight={600}  py={{xs:0, sm:1}}>
              Shipping Address
            </Typography>
            <Typography
              variant="subtitle1"
              className="flex-wrap h-full"
              py={{xs:0, sm:1}}
            >
              {user?.address}
            </Typography>
          </Stack>
          <Stack direction="column" className="w-full md:w-[30%] px-5 py-2">
            <Typography variant="subtitle1" fontWeight={600} py={1}>
              Order Summary
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" className="flex-wrap">
                item(s) Subtotal:
              </Typography>
              <Typography variant="subtitle1" className="flex-wrap">
                ₹{order?.price}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" className="flex-wrap">
                Shipping:{" "}
              </Typography>
              <Typography variant="subtitle1" className="flex-wrap">
                ₹0
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" className="flex-wrap">
                Total:
              </Typography>
              <Typography variant="subtitle1" className="flex-wrap">
                ₹{order?.price}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                variant="subtitle1"
                fontWeight={600}
                className="flex-wrap"
              >
                Grand total:
              </Typography>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                className="flex-wrap"
              >
                ₹{order?.price}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Card>
      <Card variant="outlined" className="p-4">
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
        <Divider></Divider>

        {order?.products?.$values &&
          order.products.$values.map((product) => (
            <div key={product.productId}>
              <OrderProductCard
                id={product?.productId}
                quantity={product?.quantity}
              />
              <Divider></Divider>
            </div>
          ))}
      </Card>
    </div>
  );
};

export default OrderDetails;
