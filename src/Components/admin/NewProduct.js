import React, { useState } from "react";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import MetaData from "../MetaData";

const NewProduct = ({ history }) => {
  const alert = useAlert();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your form submission logic, API calls, etc.
    alert.success("Product created successfully!");
    history.push("/admin/dashboard"); // Redirect to dashboard after successful creation
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, file]);
        }
      };

      reader.readAsDataURL(file);
    });
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

          <div className="w-full relative flex items-center mb-4">
            <input
              type="file"
              name="images"
              accept="image/*"
              onChange={handleImagesChange}
              multiple
              className="border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
            />
          </div>

          <div className="flex flex-wrap">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" className="w-20 h-20 object-cover m-2" />
            ))}
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
