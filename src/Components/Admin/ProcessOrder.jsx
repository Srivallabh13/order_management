import React, { useEffect, useState } from "react";
import MetaData from "../MetaData";
import { useParams } from "react-router-dom";
import SideBar from "./Sidebar";
import { AccountTree } from "@mui/icons-material";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { OrderById, UpdateOrderStatus } from "../../Actions/OrderAction";
import { getUserById } from "../../Actions/UserActions";
import OrderProductCard from "../../Utils/OrderProductCard";
import { useAlert } from "react-alert";

const ProcessOrder = () => {
  const {id} = useParams();
  const userData = useSelector((state)=>state.userById.user);
  const load = useSelector((state)=>state.userById.loading);
  const {order, loading} = useSelector((state)=>state.orderById);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(()=>{
    dispatch(OrderById(id));
  }, [dispatch, id])

  useEffect(()=>{
    dispatch(getUserById(order?.custId));
  }, [dispatch, order?.custId])

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(UpdateOrderStatus(id, status)).then(() => {
      dispatch(OrderById(id));
      alert.success("Order Updated Successfully");
    })
    .catch(error => {
      alert.error("Failed to update status: " + error.message);
    });
  };
  if(loading || load) {
    return   <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
      <LinearProgress color='secondary' />
    </Box>
    }

  return (
    <div className="w-screen max-w-full grid grid-cols-1 md:grid-cols-5">
      <MetaData title="Process Order" />
      <SideBar className="md:col-span-1" />
      <div className="md:col-span-3 border-l border-gray-200 bg-white p-6 pr-0 overflow-auto">
        <div className="bg-white shadow-md rounded-md p-9">
          <div className="confirmshippingArea">
            <Typography variant="h6">Shipping Info</Typography>
            <div className="space-y-2 mt-4">
              <div className="flex">
                <p className="w-1/4">Name:</p>
                <p className="w-3/4">{userData?.fullName}</p>
              </div>
              <div className="flex">
                <p className="w-1/4">Phone:</p>
                <p className="w-3/4">
                  {userData?.phoneNumber}
                </p>
              </div>
              <div className="flex">
                <p className="w-1/4">Address:</p>
                <p className="w-3/4">
                  {userData?.address}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Typography variant="h6">Payment</Typography>
            <div className="space-y-2 mt-4">
             
              <div className="flex">
                <p className="w-1/4">Amount:</p>
                <p className="w-3/4">{order?.price}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Typography variant="h6">Order Status</Typography>
            <div className="mt-4">
              <Typography variant="h6"
                className={
                  order?.status && order?.status === "Delivered"
                    ? "text-green-500"
                    : order?.status && order?.status === "Shipped" ? "text-purple-500": "text-red-500"
                }
              >
                {order?.status}
              </Typography>
            </div>
          </div>

          <div className="mt-6">
            <Typography variant="h6">Your Cart Item(s):</Typography>
            <div className="space-y-4 mt-4">
              {order?.products?.$values &&
                order?.products?.$values?.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center space-x-4"
                  >
                    <OrderProductCard id = {item.productId} flag = {false} quantity = {item.quantity} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-1 border-l border-gray-200 bg-white p-6 overflow-auto">
        <div className="bg-white shadow-md rounded-md p-6">
          <form onSubmit={updateOrderSubmitHandler}>
            <h1 className="text-2xl font-bold mb-4">Process Order</h1>

            <div className="relative mb-4">
              <AccountTree className="absolute left-4 top-3 text-gray-600" />
              <select
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className="pl-12 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
              >
                <option value="">Choose Category</option>
                {order?.status === "Confirmed" && (
                  <option value="Shipped">Shipped</option>
                )}
                {order?.status === "Shipped" && (
                  <option value="Delivered">Delivered</option>
                )}
              </select>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={!status}
              className="w-full bg-blue-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition duration-500"
            >
              Process
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProcessOrder;