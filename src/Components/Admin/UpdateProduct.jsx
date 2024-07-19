import React, { Fragment, useState } from "react";
import { useAlert } from "react-alert";
import MetaData from "../MetaData";
// import AccountTreeIcon from "@material-ui/icons/AccountTree";
import SideBar from "./Sidebar";
import { AttachMoney, Description, Spellcheck, Storage } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UpdateProduct = ({ history }) => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [Stock, setStock] = useState('');

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    alert.success("Product Updated Successfully");
    navigate('/admin/products');
  };

  return (
    <Fragment>
      <MetaData title="Update Product" />
      <div className="w-screen max-w-full grid grid-cols-1 md:grid-cols-5 absolute">
        <SideBar />
        <div className="md:col-span-4 border-l border-gray-200 bg-gray-100 p-8 min-h-screen">
          <form
            className="createProductForm flex flex-col items-center mx-auto p-6 space-y-4 w-half max-w-sm bg-gray-300 shadow-md rounded-lg"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <Typography variant="h6" className="text-xl font-semibold text-gray-700">Update Product</Typography>

            <div className="w-full relative flex items-center mb-4">
              <Spellcheck className="absolute left-4 text-gray-600" />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-12 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="w-full relative flex items-center mb-4">
              <AttachMoney className="absolute left-4 text-gray-600" />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pl-12 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="w-full relative flex items-center mb-4">
              <Description className="absolute left-4 text-gray-600 top-2" />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="pl-12 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
              ></textarea>
            </div>

            <div className="w-full relative flex items-center mb-4">
              <Storage className="absolute left-4 text-gray-600" />
              <input
                type="number"
                placeholder="Stock"
                required
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
                className="pl-12 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full bg-tomato hover:bg-red-600 text-white font-semibold py-2 rounded-md transition duration-500"
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;


// import React from 'react'

// const UpdateProduct = () => {
//   return (
//     <div>UpdateProduct</div>
//   )
// }

// export default UpdateProduct