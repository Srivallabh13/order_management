import React, { useEffect } from 'react'
import Product from './Product'
import { getProducts } from '../Actions/ProductActions'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { getUser } from '../Actions/UserActions'

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state)=>state.products);
  const { user } = useSelector((state)=>state.currentUser);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUser());
  }, [dispatch])
  
  
  return (
    <div className='bg-zinc-100 p-5'>
      <div className='flex flex-wrap mx-16 gap-10'>

        {products && products.map(product => (
          user && user!=null ? 
          <Link key={product.productID}  to={`/singleproduct/${product.productID}`}>
            <Product product = {product} />
          </Link>:
          <Link key={product.productID}  to={`/login`}>
            <Product product = {product} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home


/* {products.forEach(product => {
          
          <Product
              name={product.productName}
              price={product.price}
              desc={product.description}
          />
        })}; */