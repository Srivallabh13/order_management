import { Pagination, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from './Product';

const SearchResult = () => {
  const { user } = useSelector((state)=>state.currentUser);
  const { products:searchedProducts } = useSelector((state)=>state.search);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchedProducts?.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="mx-72 py-5">
        <Typography variant='h4' fontWeight={600}>Results</Typography>
      <div className="top-[50%] py-10 left-0 right-0 overflow-auto flex flex-wrap gap-10 justify-center">
      {searchedProducts === null ? <Typography variant='h6' color={'grey'}>Type something in the search bar to get results.</Typography>  : currentProducts !== null ? currentProducts?.length === 0 ? <Typography variant='h6'>No Product Found</Typography> :
        currentProducts && currentProducts.map(product => (
          user && user!=null ? 
          <Link key={product.productID}  to={`/singleproduct/${product.productID}`}>
            <Product product = {product} />
          </Link>:
          <Link key={product.productID}  to={`/login`}>
            <Product product = {product} />
          </Link>
        )): (<Typography variant='h5'>No Product Found</Typography>)}
      </div>

    { searchedProducts && searchedProducts.length>0 && 

      <div className=" py-5 flex justify-center">
        <Pagination
          count={Math.ceil(searchedProducts?.length / productsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          color="secondary"
          />
      </div>
        }
    </div>
  )
}

export default SearchResult