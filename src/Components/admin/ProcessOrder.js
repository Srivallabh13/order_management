import React, { useState } from "react";
import MetaData from "../MetaData";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import SideBar from "./Sidebar";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

const ProcessOrder = ({ match }) => {
  const [order, setOrder] = useState({
    orderStatus: "Processing",
    user: { name: "John Doe" },
    shippingInfo: {
      phoneNo: "1234567890",
      address: "123 Street",
      city: "City",
      state: "State",
      pinCode: "123456",
      country: "Country",
    },
    paymentInfo: { status: "succeeded" },
    totalPrice: 500,
    orderItems: [
      {
        product: "1",
        name: "Sample Product",
        image: "https://via.placeholder.com/150",
        quantity: 2,
        price: 250,
      },
    ],
  });

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    // Simulate API call or update process
    const updatedOrder = { ...order, orderStatus: status };
    setOrder(updatedOrder);
    alert("Order Updated Successfully");
  };

  return (
    <div className="w-screen max-w-full grid grid-cols-1 md:grid-cols-5 absolute">
      <MetaData title="Process Order" />
      <SideBar className="md:col-span-1" />
      <div className="md:col-span-3 border-l border-gray-200 bg-white p-6 pr-0 overflow-auto">
        <div className="bg-white shadow-md rounded-md p-9">
          <div className="confirmshippingArea">
            <Typography variant="h6">Shipping Info</Typography>
            <div className="space-y-2 mt-4">
              <div className="flex">
                <p className="w-1/4">Name:</p>
                <p className="w-3/4">{order.user && order.user.name}</p>
              </div>
              <div className="flex">
                <p className="w-1/4">Phone:</p>
                <p className="w-3/4">
                  {order.shippingInfo && order.shippingInfo.phoneNo}
                </p>
              </div>
              <div className="flex">
                <p className="w-1/4">Address:</p>
                <p className="w-3/4">
                  {order.shippingInfo &&
                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Typography variant="h6">Payment</Typography>
            <div className="space-y-2 mt-4">
              <div className="flex">
                <p
                  className={
                    order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "text-green-500 w-1/4"
                      : "text-red-500 w-1/4"
                  }
                >
                  {order.paymentInfo && order.paymentInfo.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"}
                </p>
              </div>
              <div className="flex">
                <p className="w-1/4">Amount:</p>
                <p className="w-3/4">{order.totalPrice && order.totalPrice}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Typography variant="h6">Order Status</Typography>
            <div className="mt-4">
              <p
                className={
                  order.orderStatus && order.orderStatus === "Delivered"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {order.orderStatus && order.orderStatus}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Typography variant="h6">Your Cart Items:</Typography>
            <div className="space-y-4 mt-4">
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div
                    key={item.product}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={item.image}
                      alt="Product"
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-blue-600 hover:underline"
                      >
                        {item.name}
                      </Link>{" "}
                      <p>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </p>
                    </div>
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
              <AccountTreeIcon className="absolute left-4 top-3 text-gray-600" />
              <select
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className="pl-12 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
              >
                <option value="">Choose Category</option>
                {order.orderStatus === "Processing" && (
                  <option value="Shipped">Shipped</option>
                )}
                {order.orderStatus === "Shipped" && (
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
