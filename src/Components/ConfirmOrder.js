import React, { Fragment } from "react";
import MetaData from "./MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = ({ history }) => {
  // Static values
  const shippingInfo = {
    address: "123 Main St",
    city: "Anytown",
    state: "Anystate",
    pinCode: "12345",
    country: "Country",
    phoneNo: "123-456-7890",
  };

  const user = {
    name: "John Does",
  };

  const cartItems = [
    {
      product: "1",
      name: "Product 1",
      price: 100,
      quantity: 2,
      image: "/images/product1.jpg",
    },
    {
      product: "2",
      name: "Product 2",
      price: 200,
      quantity: 1,
      image: "/images/product2.jpg",
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <div className="grid grid-cols-6 h-screen bg-white">
        <div className="col-span-4 p-20">
          <div>
            <Typography className="text-2xl">Shipping Info</Typography>
            <div className="mt-8">
              <div className="flex my-4">
                <p className="font-medium text-lg">Name:</p>
                <span className="ml-4 text-gray-600">{user.name}</span>
              </div>
              <div className="flex my-4">
                <p className="font-medium text-lg">Phone:</p>
                <span className="ml-4 text-gray-600">
                  {shippingInfo.phoneNo}
                </span>
              </div>
              <div className="flex my-4">
                <p className="font-medium text-lg">Address:</p>
                <span className="ml-4 text-gray-600">{address}</span>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Typography className="text-2xl">Your Cart Items:</Typography>
            <div className="mt-8 max-h-80 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className="flex items-center justify-between my-4"
                >
                  <img src={item.image} alt="Product" className="w-12" />
                  <Link
                    to={`/product/${item.product}`}
                    className="ml-8 text-gray-600 w-1/2"
                  >
                    {item.name}
                  </Link>
                  <span className="text-gray-600">
                    {item.quantity} X ₹{item.price} ={" "}
                    <b>₹{item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2 border-l border-gray-300 p-20">
          <div>
            <Typography className="text-2xl text-center border-b border-gray-300 pb-4">
              Order Summary
            </Typography>
            <div className="mt-8">
              <div className="flex justify-between my-4">
                <p className="text-lg">Subtotal:</p>
                <span className="text-gray-700">₹{subtotal}</span>
              </div>
              <div className="flex justify-between my-4">
                <p className="text-lg">Shipping Charges:</p>
                <span className="text-gray-700">₹{shippingCharges}</span>
              </div>
              <div className="flex justify-between my-4">
                <p className="text-lg">GST:</p>
                <span className="text-gray-700">₹{tax}</span>
              </div>
            </div>
            <div className="flex justify-between my-8 border-t border-gray-300 pt-4">
              <p className="text-lg font-medium">Total:</p>
              <span className="text-gray-700 font-medium">₹{totalPrice}</span>
            </div>
            <Link
              to="/orderSuccess"
              className="w-full bg-red-500 text-white py-4 transition duration-500 hover:bg-red-600 text-lg font-medium text-center block"
            >
              Confirm Order
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
