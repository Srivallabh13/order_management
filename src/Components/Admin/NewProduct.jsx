import React, { useState } from "react";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
// import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import SideBar from "./Sidebar";
import MetaData from "../MetaData";
import { useDispatch } from "react-redux";
import { CreateProduct } from "../../Actions/ProductActions";

const NewProduct = ({ history }) => {
  const alert = useAlert();

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState();
  const [threshold, setThreshold] = useState();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stockLevel", stock);
    formData.append("threshold", threshold);

    dispatch(CreateProduct(formData));
  };


  return (
    <div className="w-screen max-w-full grid grid-cols-1 md:grid-cols-5 absolute">
      <SideBar />
      <div className="md:col-span-4 border-l border-gray-200 bg-gray-100 p-12 min-h-screen">
        <MetaData title="Create Product" />
        <form
          className="createProductForm flex flex-col items-center mx-auto p-6 space-y-4 w-half max-w-sm bg-gray-300 shadow-md rounded-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="text-xl font-semibold text-gray-700">
            Create Product
          </h1>

          <div className="w-full relative flex items-center mb-4">
            <SpellcheckIcon className="absolute left-4 text-gray-600" />
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
            <AttachMoneyIcon className="absolute left-4 text-gray-600" />
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
            <DescriptionIcon className="absolute left-4 text-gray-600 top-2" />
            <textarea
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="pl-12 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
            ></textarea>
          </div>

          <div className="w-full relative flex items-center mb-4">
            <DataThresholdingIcon className="absolute left-4 text-gray-600" />
            <input
              type="number"
              placeholder="Threshold"
              required
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="pl-12 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="w-full relative flex items-center mb-4">
            <StorageIcon className="absolute left-4 text-gray-600" />
            <input
              type="number"
              placeholder="Stock"
              required
              value={stock}
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
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;