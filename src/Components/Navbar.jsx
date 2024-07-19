import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../Actions/UserActions';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Home } from '@mui/icons-material';
import { Badge, Typography } from '@mui/material';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    sessionStorage.removeItem('cart');
    dispatch(getUser());
    navigate('/', { replace: true });
  };

  const { user } = useSelector((state) => state.currentUser);
  const { products } = useSelector((state) => state.cart);

  return (
    <div className="text-white flex flex-row w-full justify-between py-4 md:px-10 px-3 bg-sky-950">
      <Link to={'/'}>
        <span className='text-lg font-semibold'>ORDER MANAGEMENT SYSTEM</span>
      </Link>
      <ul className="flex flex-row gap-4 md:gap-12">
      {user && user?.role === 'admin' &&
            <Link to={'/admin/dashboard'}>
              <li>
                <Typography>Admin panel</Typography>
              </li>
            </Link>
            }
        <Link to={'/'}>
          <li><Home /></li>
        </Link>
        
        {user && 
          <>
            <Link to={'/cart'}>
              <li>
                <Badge badgeContent={products?.length || 0} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </li>
            </Link>
            <Link to={'/account'}>
              <li>
                <AccountCircleIcon /> {user.username}
              </li>
            </Link>
            
            <li>
              <button onClick={handleLogout}><LogoutIcon /></button>
            </li>
          </>
        }
      </ul>
    </div>
  );
};

export default Navbar;
