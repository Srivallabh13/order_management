import React, { Fragment, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MetaData from "../MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { useAlert } from "react-alert";

const productsData = [
  { id: "1", name: "Product 1", stock: 20, price: 150 },
  { id: "2", name: "Product 2", stock: 0, price: 100 },
  { id: "3", name: "Product 3", stock: 5, price: 50 },
];

const ProductList = ({ history }) => {
  const [products, setProducts] = useState(productsData);
  const alert = useAlert();

  const deleteProductHandler = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    alert.success("Product Deleted Successfully");
  };

  useEffect(() => {
    // Example: Fetching data from an API endpoint
    // Replace with your actual data fetching logic
    // fetchProducts()
    //   .then(data => setProducts(data))
    //   .catch(error => alert.error(error.message));
  }, [alert]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
    { field: "stock", headerName: "Stock", type: "number", minWidth: 100, flex: 0.5 },
    { field: "price", headerName: "Price", type: "number", minWidth: 150, flex: 0.5 },
    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/product/${params.row.id}`}>
            <EditIcon className="text-blue-500 hover:text-blue-700" />
          </Link>
          <Button onClick={() => deleteProductHandler(params.row.id)}>
            <DeleteIcon className="text-red-500 hover:text-red-700" />
          </Button>
        </Fragment>
      ),
    },
  ];

  return (
    <div className="w-screen max-w-full grid grid-cols-1 md:grid-cols-5 absolute">
      <MetaData title="Product List - Admin Panel" />
      <SideBar className="md:col-span-1" />

      <div className="md:col-span-4 border-l border-gray-200 bg-white p-6 overflow-auto">
        <h1 className="text-2xl font-semibold mt-7 text-black-700 text-center mb-6">ALL PRODUCTS</h1>

        <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
          <DataGrid
            rows={products}
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

export default ProductList;
