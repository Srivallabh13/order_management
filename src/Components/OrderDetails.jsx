import { Card, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderProductCard from "../Utils/OrderProductCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OrderById } from "../Actions/OrderAction";
import { getUserById } from "../Actions/UserActions";

const OrderDetails = () => {
  const { id } = useParams();

  const { order } = useSelector((state) => state.orderById);
  const { user } = useSelector((state) => state.userById);
  const currentUser = useSelector((state) => state.currentUser.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(OrderById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getUserById(currentUser.id));
  }, [dispatch]);
  return (
    <div className="mx-72 mt-2 h-full">
      {/* {console.log(order, user)} */}
      <Typography variant="h4" pt={3} fontWeight={600}>
        Order Details
      </Typography>
      <Stack direction={"row"} gap={5}>
        <Typography variant="subtitle1" py={1}>
          Ordered on {order?.date}
        </Typography>
        <Typography variant="subtitle1" py={1}>
          Order# {order?.id}
        </Typography>
      </Stack>
      <Card className="w-full my-5" variant="outlined">
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack px={3} direction={"row"} className="w-[30%] py-2">
            <Stack direction={"column"} px={1}>
              <Typography variant="subtitle1" fontWeight={600} py={1}>
                Shipping Address
              </Typography>
              <Typography
                variant="subtitle1"
                className="flex-wrap h-full"
                py={1}
              >
                {user?.address}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} className="w-[30%]">
            <Stack direction={"column"} className="w-full px-5 py-2">
              <Typography variant="subtitle1" fontWeight={600} py={1}>
                Order Summary
              </Typography>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="subtitle1" className="flex-wrap">
                  item(s) Subtotal:
                </Typography>
                <Typography variant="subtitle1" className="flex-wrap">
                  ₹{order?.price}
                </Typography>
              </Stack>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="subtitle1" className="flex-wrap">
                  Shipping:{" "}
                </Typography>
                <Typography variant="subtitle1" className="flex-wrap">
                  ₹0
                </Typography>
              </Stack>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="subtitle1" className="flex-wrap">
                  Total:
                </Typography>
                <Typography variant="subtitle1" className="flex-wrap">
                  ₹{order?.price}
                </Typography>
              </Stack>
              <Stack direction={"row"} justifyContent={"space-between"}>
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
            <>
              <OrderProductCard
                key={product.productId}
                id={product?.productId}
                quantity={product?.quantity}
              />
              <Divider></Divider>
            </>
          ))}
      </Card>
    </div>
  );
};

export default OrderDetails;
