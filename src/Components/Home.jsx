// import React, { useEffect, useState } from 'react';
// import Product from './Product';
// import { getProducts } from '../Actions/ProductActions';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getUser } from '../Actions/UserActions';
// import { Pagination } from '@mui/material';
// import CarouselComponent from '../Utils/Carousel';

// const Home = () => {
//   const dispatch = useDispatch();
//   const { products } = useSelector((state) => state.products);
//   const { user } = useSelector((state) => state.currentUser);

//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 12;

//   useEffect(() => {
//     dispatch(getProducts());
//     dispatch(getUser());
//   }, [dispatch]);

//   const handleChangePage = (event, value) => {
//     setCurrentPage(value);
//   };

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

//   return (
//     <div className="relative ">
//       <CarouselComponent />

//       <div className="absolute top-[50%] left-0 right-0 overflow-auto flex flex-wrap gap-10 justify-center">
//         {currentProducts && currentProducts.map(product => (
//           user && user !== null ? 
//           <Link key={product.productID} to={`/singleproduct/${product.productID}`}>
//             <Product product={product} />
//           </Link> :
//           <Link key={product.productID} to={`/login`}>
//             <Product product={product} />
//           </Link>
//         ))}
//       </div>

//       <div className=" py-5 flex justify-center">
//         <Pagination
//           count={Math.ceil(products.length / productsPerPage)}
//           page={currentPage}
//           onChange={handleChangePage}
//           color="secondary"
//         />
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useEffect } from 'react';
import Product from './Product';
import { getProducts } from '../Actions/ProductActions';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../Actions/UserActions';
import CarouselComponent from '../Utils/Carousel';
import { Box, useMediaQuery, useTheme } from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.currentUser);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(500))
  const isTab = useMediaQuery(theme.breakpoints.between(500,640))
  const isSmallLaptop = useMediaQuery(theme.breakpoints.between(640,710))
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUser());
  }, [dispatch]);
  
  return (
    <div className="relative ">
      <CarouselComponent />

      <Box sx={{top:isMobile ? '15%' : isTab? '30%': isSmallLaptop ? '35%' : '40%'}} className="absolute py-10 left-0 right-0 overflow-auto flex flex-wrap gap-10 justify-center">
        {products && products.map(product => (
          user && user !== null ? 
          <Link key={product.productID} to={`/singleproduct/${product.productID}`}>
            <Product product={product} />
          </Link> :
          <Link key={product.productID} to={`/login`}>
            <Product product={product} />
          </Link>
        ))}
      </Box>

    </div>
  );
}

export default Home;