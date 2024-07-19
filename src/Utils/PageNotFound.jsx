import React from 'react'
import image from '../assets/Images/pageNotFound.jpg'
// import { Link } from 'react-router-dom'
import { Box } from '@mui/material'
const PageNotFound = ({loading}) => {
  return (
    <Box display={loading?false:true} className="flex items-center justify-center overflow-hidden bg-white-100">
        <img src={image} alt="404 Error" className='animate-pulse' />
    </Box>
  )
}

export default PageNotFound
{/* <Link
  to="/"
  className="absolute mt-80 px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition duration-300"
>
    Home
</Link> */}