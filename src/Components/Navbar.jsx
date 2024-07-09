import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className = " text-white flex flex-row w-full justify-between py-5 md:px-10 px-3 bg-sky-950">
      <Link to={'/'}>
        <span className='text-lg font-semibold' > ORDER MANAGEMENT SYSTEM</span>
      </Link>
          <ul className="flex flex-row gap-4 md:gap-16">
            <Link to={'/'}>
              <li>Home</li>
            </Link>
            <Link to={'/cart'}>
              <li>Cart</li>
            </Link>
            <Link to={'/account'}>
              <li>Account</li>
            </Link>
            <Link>
              <li>Logout</li>
            </Link>
          </ul>
    </div> 
  )
}

export default Navbar