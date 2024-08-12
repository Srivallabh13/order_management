import React, { useState } from 'react'
import { Drawer, IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar } from '@mui/material'
import { AdminPanelSettings, AppRegistrationRounded, ChevronRight, Home, Login, Logout, ShoppingCart } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../Actions/UserActions';
 
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const DrawerComp = ({showAdmin = false}) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        sessionStorage.removeItem('cart');
        dispatch(getUser());
        navigate('/', { replace: true });
      };

    const {user} = useSelector((state)=>state.currentUser)
    
  return (
    <>
      <Drawer
        sx={{
          width: '50%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '50%',
          },
          position:'absolute'
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={()=>setOpen(false)} >
            <ChevronRight />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link to="/">
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary='Home' />
                </ListItemButton>
            </ListItem>
          </Link>
          {showAdmin && 
          <Link to="/admin/dashboard">
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary='Admin Panel' />
                </ListItemButton>
            </ListItem>
          </Link>
          }
          {user !== null ? 
          <>
          <Link to="/cart">
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <ShoppingCart />
                </ListItemIcon>
                <ListItemText primary='cart' />
                </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/account">
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <Avatar src={user?.imageUrl} sx={{width:24, height:24}}/>
                </ListItemIcon>
                <ListItemText primary='Profile' />
                </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/">
            <ListItem disablePadding onClick={handleLogout}>
                <ListItemButton>
                <ListItemIcon>
                    <Logout />
                </ListItemIcon>
                <ListItemText primary='Logout' />
                </ListItemButton>
            </ListItem>
          </Link>
          </>
           : 
            <>
            <Link to="/login">
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <Login />
                </ListItemIcon>
                <ListItemText primary='Login' />
                </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/register">
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <AppRegistrationRounded />
                </ListItemIcon>
                <ListItemText primary='Register' />
                </ListItemButton>
            </ListItem>
          </Link>
            </>
          }
        </List>
        </Drawer>
        <IconButton size='large' onClick={()=> setOpen(!open)}>
            <MenuIcon htmlColor='#fff'/>
        </IconButton>
    </>
  )
}

export default DrawerComp