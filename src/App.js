import axios from 'axios';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import ConfirmOrder from './Components/ConfirmOrder';
import OrderSuccess from './Components/OrderSuccess';
import Dashboard from './Components/admin/Dashboard';
import OrderList from './Components/admin/OrderList';
import ProcessOrder from './Components/admin/ProcessOrder';
import ProductList from './Components/admin/ProductList';
import NewProduct from './Components/admin/NewProduct';
import UpdateProduct from './Components/admin/UpdateProduct';
import UsersList from './Components/admin/UsersList';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './Components/Cart';
import SingleProductPage from './Components/SingleProductPage';
import Account from './Components/Account';
import OrderDetails from './Components/OrderDetails';
import UserOrders from './Components/UserOrders';
import Profile from './Components/Profile';
import EditProfileDialog from './Components/EditProfileDialog';
import LoginSecurity from './Components/LoginSecurity';
import Contact from './Components/ContactUs';

function App() {
  axios.defaults.baseURL = "http://localhost:5062/api"
  return (
    <div className='h-screen'>
      <BrowserRouter>
       <Navbar />
        <Routes>
        <Route path='/login' element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/confirmOrder" element={<ConfirmOrder />} />
          <Route path="/orderSuccess" element={<OrderSuccess />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/order/processOrder" element={<ProcessOrder />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product" element={<NewProduct />} />
          <Route path="/admin/product/updateProduct" element={<UpdateProduct />} />
          <Route path="/admin/users" element={<UsersList />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
