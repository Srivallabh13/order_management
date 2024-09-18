// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUser } from '../Actions/UserActions';
// import LogoutIcon from '@mui/icons-material/Logout';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { Home } from '@mui/icons-material';
// import { Avatar, Badge, Stack, Typography } from '@mui/material';
// import SearchBar from './SearchBar';

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('jwt');
//     sessionStorage.removeItem('cart');
//     dispatch(getUser());
//     navigate('/', { replace: true });
//   };

//   const { user, loading } = useSelector((state) => state.currentUser);
//   const { products } = useSelector((state) => state.cart);

//   return (
//     <div style={{alignItems:"center"}} className="text-white flex flex-row w-full justify-between py-4 md:px-10 px-3 bg-sky-950">
//       <Link to={'/'}>
//         <span className='text-lg font-semibold'>ORDER MANAGEMENT SYSTEM</span>
//       </Link>
//       {user && 
//         <SearchBar />
//       }
//       <ul style={{alignItems:"center"}} className="flex flex-row h-full gap-4 md:gap-12">
//       {user && loading ===false && user?.role === 'admin' &&
//             <Link to={'/admin/dashboard'}>
//               <li>
//                 <Typography>Admin panel</Typography>
//               </li>
//             </Link>
//       }
//         {!user && loading ===false&&
//         <>
//           <Link to={'/'}>
//             <li><Home /></li>
//           </Link>
//           <Link to={'/login'}>
//             <li>Login</li>
//           </Link>
//           <Link to={'/register'}>
//             <li>Register</li>
//           </Link>
//         </>
//         }
        
//         {user && loading === false && 
//           <>
//             <Link to={'/'}>
//               <li><Home /></li>
//             </Link>
//             <Link to={'/cart'}>
//               <li>
//                 <Badge badgeContent={products?.length || 0} color="primary">
//                   <ShoppingCartIcon />
//                 </Badge>
//               </li>
//             </Link>
//             <Link to={'/account'}>
//             <Stack direction={'row'} spacing={1} alignItems={'center'}>
//                 <Avatar sx={{width: 30, height:30}} src={user?.imageUrl}/>
//                 <Typography>{user.username}</Typography>
//             </Stack>
//             </Link>
//             <li>
//               <button onClick={handleLogout}><LogoutIcon /></button>
//             </li>
//           </>
//         }
//       </ul>
//     </div>
//   );
// };

// export default Navbar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../Actions/UserActions';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Home } from '@mui/icons-material';
import { Avatar, Badge, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import SearchBar from './SearchBar';
import logo from '../assets/Images/orm.png'
import DrawerComp from '../Utils/Drawer';
const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))
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
    <div className="flex items-center justify-between md:py-4 py-2 px-3 md:px-10 md:w-full bg-sky-950 text-white">
      <Link to={'/'}>
        <span className='text-lg font-semibold hidden lg:block'>ORDER MANAGEMENT SYSTEM</span>
        {/* <span className='text-lg font-semibold md:hidden'>OMS</span> */}
        <div className='lg:hidden'>
        <Avatar src={logo} sx = {{backgroundColor:'white', padding:1, marginRight:2}} />
        </div>
      </Link>
      {user && 
        <SearchBar />
      }
    {isMatch? (
          <DrawerComp showAdmin = {user?.role === 'admin'} />
        ):(
      <ul className="flex items-center gap-4 md:gap-12 h-full">
        {user && loading === false && user?.role === 'admin' &&
          <Link to={'/admin/dashboard'}>
            <li className="hidden md:block">
              <Typography>Admin panel</Typography>
            </li>
          </Link>
        }
        {!user && loading === false &&
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
              <li>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                  <Avatar sx={{ width: 30, height: 30 }} src={user?.imageUrl} />
                  <Typography className="hidden md:block">{user.username}</Typography>
                </Stack>
              </li>
            </Link>
            <li>
              <button onClick={handleLogout}><LogoutIcon /></button>
            </li>
          </>
        }
      </ul>
        )}
    </div>
  );
};

export default Navbar;


