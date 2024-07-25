import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
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
import { Box, LinearProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Actions/ProductActions";
import { AllUsers } from "../../Actions/UserActions";
import { AllOrder } from "../../Actions/OrderAction";

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
  const dispatch = useDispatch();
  const { products,loading } = useSelector((state)=>state.products);
  const {orders, loading:loadingOrders} = useSelector((state)=>state.allOrders);
  const {users, loading:loadingUsers} = useSelector((state)=>state.allUsers);
  let outOfStock = products.filter((product)=>product.stockLevel === 0)?.length;

  useEffect(()=> {
    dispatch(getProducts());
    dispatch(AllUsers());
    dispatch(AllOrder());
  },[dispatch])

  let totalAmount = 0;
  orders?.forEach((item) => {
    totalAmount += item.price;
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
        data: [outOfStock, products?.length - outOfStock],
      },
    ],
  };
  if(loading||loadingOrders||loadingUsers) {
    return  <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
    <LinearProgress color='secondary' />
  </Box>
  }

  return (
    <div className="w-screen max-w-full grid grid-cols-1 md:grid-cols-5">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="md:col-span-4 border-l border-gray-200 bg-white p-12">
        <Typography variant="h3" className="text-gray-800 w-full font-light text-2xl text-center py-3 mx-auto">
          Dashboard
        </Typography>

        <div className="my-8">
          <div className="flex bg-white justify-center">
            <Typography variant="h5" className="bg-blue-500 text-white font-light text-lg text-center p-2 w-full mx-20">
              Total Sales <br /><span className="font-extrabold"> ₹{totalAmount}</span>
            </Typography>
          </div>
          <div className="flex justify-center items-center my-8">
            <Link to="/admin/products" className="text-black font-light text-2xl text-center bg-red-500 no-underline p-6 w-40 h-40 m-8 rounded-full flex justify-center items-center flex-col">
              <p>Products</p>
              <p>{products?.length}</p>
            </Link>
            <Link to="/admin/orders" className="text-black font-light text-2xl text-center bg-amber-300 no-underline p-6 w-40 h-40 m-8 rounded-full flex justify-center items-center flex-col">
              <p>Orders</p>
              <p>{orders?.length}</p>
            </Link>
            <Link to="/admin/users" className="text-white font-light text-2xl text-center bg-gray-800 no-underline p-6 w-40 h-40 m-8 rounded-full flex justify-center items-center flex-col">
              <p>Users</p>
              <p>{users?.length}</p>
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