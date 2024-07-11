import React from "react";
import Sidebar from "./Sidebar.js";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import MetaData from "../MetaData";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  // Static values for demonstration
  const products = [
    { name: "Product 1", Stock: 20 },
    { name: "Product 2", Stock: 0 },
    { name: "Product 3", Stock: 5 },
    { name: "Product 3", Stock: 5 },
    { name: "Product 3", Stock: 12 },
  ];

  const orders = [
    { id: 1, totalPrice: 100 },
    { id: 2, totalPrice: 200 },
    { id: 4, totalPrice: 600 },
  ];

  const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ];

  let outOfStock = 0;

  products.forEach((item) => {
    if (item.Stock === 0) {
      outOfStock += 1;
    }
  });

  let totalAmount = 0;
  orders.forEach((item) => {
    totalAmount += item.totalPrice;
  });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["blue", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="w-screen max-w-full grid grid-cols-1 md:grid-cols-5 absolute">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="md:col-span-4 border-l border-gray-200 bg-white p-12">
        <Typography variant="h3" className="text-gray-800 w-full font-light text-2xl text-center w-1/2 py-3 mx-auto">
          Dashboard
        </Typography>

        <div className="my-8">
          <div className="flex bg-white justify-center">
            <p className="bg-blue-500 text-white font-light text-lg text-center p-2 w-full mx-20">
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="flex justify-center items-center my-8">
            <Link to="/admin/products" className="text-black font-light text-2xl text-center bg-red-500 no-underline p-6 w-40 h-40 m-8 rounded-full flex justify-center items-center flex-col">
              <p>Product</p>
              <p>{products.length}</p>
            </Link>
            <Link to="/admin/orders" className="text-black font-light text-2xl text-center bg-amber-300 no-underline p-6 w-40 h-40 m-8 rounded-full flex justify-center items-center flex-col">
              <p>Orders</p>
              <p>{orders.length}</p>
            </Link>
            <Link to="/admin/users" className="text-white font-light text-2xl text-center bg-gray-800 no-underline p-6 w-40 h-40 m-8 rounded-full flex justify-center items-center flex-col">
              <p>Users</p>
              <p>{users.length}</p>
            </Link>
          </div>
        </div>

        <div className="w-4/5 mx-auto">
          <Line data={lineState} style={{}} />
        </div>

        <div className="w-80 mx-auto mt-8">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
