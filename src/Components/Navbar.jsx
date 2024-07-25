import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../Actions/UserActions';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Home } from '@mui/icons-material';
import { Avatar, Badge, Stack, Typography } from '@mui/material';
import Login from './Login';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    sessionStorage.removeItem('cart');
    dispatch(getUser());
    navigate('/', { replace: true });
  };

  const { user, loading } = useSelector((state) => state.currentUser);
  const { products } = useSelector((state) => state.cart);

  return (
    <div className="text-white flex flex-row w-full justify-between py-4 md:px-10 px-3 bg-sky-950">
      <Link to={'/'}>
        <span className='text-lg font-semibold'>ORDER MANAGEMENT SYSTEM</span>
      </Link>
      <ul className="flex flex-row gap-4 md:gap-12">
      {user && loading ===false && user?.role === 'admin' &&
            <Link to={'/admin/dashboard'}>
              <li>
                <Typography>Admin panel</Typography>
              </li>
            </Link>
      }
        {!user && loading ===false&&
        <>
          <Link to={'/'}>
            <li><Home /></li>
          </Link>
          <Link to={'/login'}>
            <li>Login</li>
          </Link>
          <Link to={'/register'}>
            <li>Register</li>
          </Link>
        </>
        }
        
        {user && loading === false && 
          <>
            <Link to={'/'}>
              <li><Home /></li>
            </Link>
            <Link to={'/cart'}>
              <li>
                <Badge badgeContent={products?.length || 0} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </li>
            </Link>
            <Link to={'/account'}>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <Avatar sx={{width: 30, height:30}} src={user?.imageUrl}/>
                <Typography>{user.username}</Typography>
            </Stack>
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
