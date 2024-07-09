import React from 'react'

const Navbar = () => {
  return (
    <div className = " text-white flex flex-row w-full justify-between py-5 md:px-10 px-3 bg-sky-950">
        <span className='text-lg font-semibold' > ORDER MANAGEMENT SYSTEM</span>
        <div className="flex flex-row gap-4 md:gap-16">
          <span>Home</span>
          <span>Cart</span>
          <span>Profile</span>
          <span>Logout</span>
        </div>
    </div> 
  )
}

export default Navbar