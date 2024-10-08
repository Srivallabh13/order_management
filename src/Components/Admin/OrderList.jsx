import React, { Fragment, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MetaData from "../MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { AllOrder, DeleteOrder } from "../../Actions/OrderAction";
import { Box, LinearProgress } from "@mui/material";

const OrderList = ({ history }) => {
  const ordersData = useSelector((state)=>state.allOrders.orders);
  const {loading} = useSelector((state)=>state.allOrders);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(AllOrder());
  },[dispatch])
  const [orders, setOrders] = useState(ordersData);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (ordersData) {
      setOrders(ordersData);
    }
  }, [ordersData]);
  const alert = useAlert();

  const deleteOrderHandler = (id) => {
    setLoad(true);
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    dispatch(DeleteOrder(id));
    alert.success("Order Deleted Successfully");
    setLoad(false);
  };

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) =>
        params.value === "Delivered" ? "text-green-500" : params.value === "Shipped"? "text-purple-700" : "text-yellow-600",
    },
    {
      field: "date",
      headerName: "Order Date",
      type: "number",
      minWidth: 100,
      flex: 0.4,
    },
    {
      field: "price",
      headerName: "Amount",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/processOrder/${params.row.id}`}>
            <EditIcon />
          </Link>
          <Button onClick={() => deleteOrderHandler(params.row.id)}>
            <DeleteIcon />
          </Button>
        </Fragment>
      ),
    },
  ];

  if(loading || load) {
    return   <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
      <LinearProgress color='secondary' />
    </Box>
    }
  return (
    <div className=" w-screen max-w-full grid grid-cols-1 md:grid-cols-5">
      <SideBar className="w-1/5" />

      <div className=" md:col-span-4 border-l border-gray-200 bg-white p-6 overflow-auto">
        <MetaData title="Order List - Admin Panel" />
        <h1 className="text-2xl font-semibold mt-7 text-black-700 text-center mb-6">ALL ORDERS</h1>

        <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
          <DataGrid
            rows={orders}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            className="bg-white border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderList;