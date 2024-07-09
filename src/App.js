import axios from 'axios';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './Components/Cart';
import Account from './Components/Account';
import OrderDetails from './Components/OrderDetails';
import UserOrders from './Components/UserOrders';

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
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<UserOrders />} />
          <Route path="/orderdetails" element={<OrderDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
