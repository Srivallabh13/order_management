import { Pagination, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from './Product';

const SearchResult = () => {
  const { user } = useSelector((state) => state.currentUser);
  const { products: searchedProducts } = useSelector((state) => state.search);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchedProducts?.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-24 xl:mx-48 py-5">
      <Typography variant='h4' fontWeight={600} className="text-center mb-5">Results</Typography>
      <div className="py-10 flex flex-wrap gap-5 justify-center">
        {searchedProducts === null 
          ? <Typography variant='h6' color={'grey'}>Type something in the search bar to get results.</Typography> 
          : currentProducts !== null 
            ? currentProducts.length === 0 
              ? <Typography variant='h6'>No Product Found</Typography> 
              : currentProducts.map(product => (
                user ? 
                <Link key={product.productID} to={`/singleproduct/${product.productID}`}>
                  <Product product={product} />
                </Link>
                : 
                <Link key={product.productID} to={`/login`}>
                  <Product product={product} />
                </Link>
              ))
            : <Typography variant='h5'>No Product Found</Typography>
        }
      </div>
      {searchedProducts && searchedProducts.length > 0 && (
        <div className="py-5 flex justify-center">
          <Pagination
            count={Math.ceil(searchedProducts.length / productsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            color="secondary"
          />
        </div>
      )}
    </div>
  );
}

export default SearchResult;
