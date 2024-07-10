import axios from 'axios';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './Components/Cart';
<<<<<<< HEAD
import SingleProductPage from './Components/SingleProductPage';
=======
import Account from './Components/Account';
import OrderDetails from './Components/OrderDetails';
import UserOrders from './Components/UserOrders';
>>>>>>> d33fc055c6d7ede8924d48ed6b75dcdff30964a9

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
<<<<<<< HEAD
          <Route path="/singleporoduct" element={<SingleProductPage  />} />
=======
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<UserOrders />} />
          <Route path="/orderdetails" element={<OrderDetails />} />
>>>>>>> d33fc055c6d7ede8924d48ed6b75dcdff30964a9
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
