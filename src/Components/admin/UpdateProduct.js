import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";

const productData = {
  _id: "1",
  name: "Sample Product",
  price: 100,
  description: "This is a sample product",
  category: "Laptop",
  Stock: 10,
  images: [
    {
      url: "https://via.placeholder.com/150",
    },
  ],
};

const UpdateProduct = ({ history }) => {
  const alert = useAlert();

  const [name, setName] = useState(productData.name);
  const [price, setPrice] = useState(productData.price);
  const [description, setDescription] = useState(productData.description);
  const [category, setCategory] = useState(productData.category);
  const [Stock, setStock] = useState(productData.Stock);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState(productData.images);
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

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    alert.success("Product Updated Successfully");
    history.push("/admin/products");
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
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
            <h1 className="text-xl font-semibold text-gray-700">Update Product</h1>

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

            {/* <div className="w-full relative flex items-center mb-4">
              <AccountTreeIcon className="absolute left-4 text-gray-600" />
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="pl-12 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="w-full relative flex items-center mb-4">
              <StorageIcon className="absolute left-4 text-gray-600" />
              <input
                type="number"
                placeholder="Stock"
                required
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
                className="pl-12 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="w-full relative flex items-center mb-4">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
                className="border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="flex flex-wrap">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" className="w-20 h-20 object-cover m-2" />
                ))}
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
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
