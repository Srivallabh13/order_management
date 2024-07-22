// import React, { Fragment, useEffect, useState } from "react";
// import { useAlert } from "react-alert";
// import MetaData from "../MetaData";
// // import AccountTreeIcon from "@material-ui/icons/AccountTree";
// import SideBar from "./Sidebar";
// import { AttachMoney, DataThresholding, Description, Spellcheck, Storage } from "@mui/icons-material";
// import { Box, Button, LinearProgress, Typography } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getProductDetails, updateProduct } from "../../Actions/ProductActions";

// const UpdateProduct = ({ history }) => {
//   const {id} = useParams();
//   const alert = useAlert();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {product:productData, loading:loadingProducts} = useSelector((state)=>state.productDetails);
  
//   const [product, setProduct] = useState(productData);
//   useEffect(()=> {
//     dispatch(getProductDetails(id)).then(() => {
//       setProduct(productData);
//     })
//   }, [dispatch, id])
  
//   const [name, setName] = useState(product?.productName);
//   const [price, setPrice] = useState(product?.price);
//   const [description, setDescription] = useState(product?.description);
//   const [stock, setStock] = useState(product?.stockLevel);
//   const [threshold, setThreshold] = useState(product?.threshold);
//   const [loading, setLoading] = useState(false);
  
//     useEffect(() => {
//     if (productData) {
//       setProduct(productData);
//     }
//   }, [productData]);


//   const updateProductSubmitHandler = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("productName", name);
//     formData.append("price", price===undefined?0:price);
//     formData.append("description", description);
//     formData.append("stockLevel", stock===undefined?0:stock);
//     formData.append("threshold", threshold===undefined?0:threshold);
//     dispatch(updateProduct(id, formData));
//     alert.success("Product Updated Successfully");
//     setLoading(false);
//     navigate('/admin/products');
//   };
 
//   const isFormValid = name?.length>0 || price > 0 || description?.length>0 || stock > 0 || threshold > 0;
  
//   if(loading || loadingProducts) {
//     return   <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
//       <LinearProgress color='secondary' />
//     </Box>
//     }
  
//   return (
//     <Fragment>
//       <MetaData title="Update Product" />
//       {(loading || loadingProducts) && 
//         <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
//         <LinearProgress color='secondary' />
//       </Box>
//       }
//       <div className="w-screen max-w-full grid grid-cols-1 md:grid-cols-5">
//         <SideBar />
//         <div className="md:col-span-4 border-l border-gray-200 bg-gray-100 p-8 min-h-screen">
//           <form
//             className="createProductForm flex flex-col items-center mx-auto p-6 space-y-4 w-half max-w-sm bg-gray-300 shadow-md rounded-lg"
//             encType="multipart/form-data"
//             onSubmit={updateProductSubmitHandler}
//           >
//             <Typography variant="h6" className="text-xl font-semibold text-gray-700">Update Product</Typography>

//             <div className="w-full relative flex items-center mb-4">
//               <Spellcheck className="absolute left-4 text-gray-600" />
//               <input
//                 type="text"
//                 placeholder="Product Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="pl-12 pr-4 text-gray-500 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
//               />
//             </div>

//             <div className="w-full relative flex items-center mb-4">
//               <AttachMoney className="absolute left-4 text-gray-600" />
//               <input
//                 type="number"
//                 placeholder="Price"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 className="pl-12 pr-4 text-gray-500 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
//               />
//             </div>

//             <div className="w-full relative flex items-center mb-4">
//               <Description className="absolute left-4 text-gray-600 top-2" />
//               <textarea
//                 placeholder="Product Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows="4"
//                 className="pl-12 pr-4 text-gray-500 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
//               ></textarea>
//             </div>

//             <div className="w-full relative flex items-center mb-4">
//               <Storage className="absolute left-4 text-gray-600" />
//               <input
//                 type="number"
//                 placeholder="Stock"
//                 value={stock}
//                 onChange={(e) => setStock(e.target.value)}
//                 className="pl-12 pr-4 text-gray-500 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
//               />
//             </div>

//             <div className="w-full relative flex items-center mb-4">
//               <DataThresholding className="absolute left-4 text-gray-600" />
//               <input
//                 type="number"
//                 placeholder="Threshold"
//                 value={threshold}
//                 onChange={(e) => setThreshold(e.target.value)}
//                 className="pl-12 pr-4 text-gray-500 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
//               />
//             </div>

//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               disabled={loading || !isFormValid}
//               className="w-full bg-tomato hover:bg-red-600 text-white font-semibold py-2 rounded-md transition duration-500"
//             >
//               Update
//             </Button>
//           </form>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default UpdateProduct;

import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import MetaData from "../MetaData";
import SideBar from "./Sidebar";
import { AttachMoney, DataThresholding, Description, Spellcheck, Storage } from "@mui/icons-material";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, updateProduct } from "../../Actions/ProductActions";

const UpdateProduct = () => {
  const { id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product: productData, loading: loadingProducts } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (productData) {
      setName(productData.productName || "");
      setPrice(productData.price || 0);
      setDescription(productData.description || "");
      setStock(productData.stockLevel || 0);
      setThreshold(productData.threshold || 0);
    }
  }, [productData]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("productName", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("stockLevel", stock);
    formData.append("threshold", threshold);
    dispatch(updateProduct(id, formData))
      .then(() => {
        alert.success("Product Updated Successfully");
        navigate('/admin/products');
      })
      .catch((error) => {
        alert.error("Error updating product");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isFormValid = name.length > 0 && price > 0 && description.length > 0 && stock > 0 && threshold > 0;

  if (loading || loadingProducts) {
    return (
      <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
        <LinearProgress color='secondary' />
      </Box>
    );
  }

  return (
    <Fragment>
      <MetaData title="Update Product" />
      {(loading || loadingProducts) && 
        <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
          <LinearProgress color='secondary' />
        </Box>
      }
      <div className="w-screen max-w-full grid grid-cols-1 md:grid-cols-5">
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-12 pr-4 text-gray-500 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="w-full relative flex items-center mb-4">
              <AttachMoney className="absolute left-4 text-gray-600" />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pl-12 pr-4 text-gray-500 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="w-full relative flex items-center mb-4">
              <Description className="absolute left-4 text-gray-600 top-2" />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="pl-12 pr-4 text-gray-500 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
              ></textarea>
            </div>

            <div className="w-full relative flex items-center mb-4">
              <Storage className="absolute left-4 text-gray-600" />
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="pl-12 pr-4 text-gray-500 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="w-full relative flex items-center mb-4">
              <DataThresholding className="absolute left-4 text-gray-600" />
              <input
                type="number"
                placeholder="Threshold"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className="pl-12 pr-4 text-gray-500 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-gray-500"
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || !isFormValid}
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
