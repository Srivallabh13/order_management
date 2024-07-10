import React from 'react'
import logo from '../assets/Images/iphone12.jpg'
const Product = ({name, price,desc}) => {
  return (
    <div className='p-5  rounded-xl bg-white'>
      <img src={logo} className='bg-cyan-900 w-64 h-64 rounded-lg object-cover' alt="product image" />
      <p className=" text-center text-lg ">{name}</p>
      <p className="text-center text-lg ">{desc}</p>
<<<<<<< HEAD
      <p className="text-center text-lg font-semibold">{'$'+price}</p>
      
=======
      <p className="text-center text-lg font-semibold">₹{price}</p>
>>>>>>> d33fc055c6d7ede8924d48ed6b75dcdff30964a9
      <button className='w-full py-1 bg-blue-900 text-white rounded-lg hover:bg-blue-800 p-2 mb-3'>Buy Now</button>
      <button className='w-full py-1  bg-sky-700 text-white rounded-lg hover:bg-sky-600 p-2'>Add To Cart</button>
    </div>
  )
}

export default Product