import axios from 'axios';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './Components/Cart';
import SingleProductPage from './Components/SingleProductPage';
import Account from './Components/Account';
import OrderDetails from './Components/OrderDetails';
import UserOrders from './Components/UserOrders';
import LoginSecurity from './Components/LoginSecurity';
import Contact from './Components/ContactUs';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './Actions/UserActions';
import { useEffect } from 'react';
import Dashboard from './Components/Admin/Dashboard';
import ProcessOrder from './Components/Admin/ProcessOrder';
import NewProduct from './Components/Admin/NewProduct';
import UpdateProduct from './Components/Admin/UpdateProduct';
import UsersList from './Components/Admin/UsersList';
import OrderSuccess from './Components/OrderSuccess';
import OrderList from './Components/Admin/OrderList';
import ProductList from './Components/Admin/ProductList';
import Profile from './Components/Profile';

function App() {
  axios.defaults.baseURL = "http://localhost:5062/api"
  const { user } = useSelector((state)=>state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className='h-screen'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
      {user && user!==null ? 
        <>
          <Route path="/cart" element={<Cart />} />
          <Route path="/singleproduct/:id" element={<SingleProductPage/>} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<UserOrders />} />
          <Route path="/orderdetails/:id" element={<OrderDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/security" element={<LoginSecurity />} />
          <Route path="/orderSuccess" element={<OrderSuccess />} />
          {user?.role === "admin" && 
          <>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/processOrder/:id" element={<ProcessOrder />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product/create" element={<NewProduct />} />
          <Route path="/admin/update/:id" element={<UpdateProduct />} />
          <Route path="/admin/users" element={<UsersList />} />
          </>
        }
        </>
       : 
       <>
       <Route path='/login' element={<Login />}/>
      <Route path="/register" element={<Register />} />
       </>
      }
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
