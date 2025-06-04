
// App.js
import React from 'react';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login';
import ProductList from './Components/ProductList';
import AddProduct from './Components/AddProduct';
import Dashboard from './Components/Dashboard';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Logout from './Components/Logout';
import MainPage from './Components/Customer/MainPage'; 
import Cart from './Components/Customer/Cart';
import MainFooter from './Components/Customer/MainFooter';
import Feedback from './Components/Customer/Feedback';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<><Header/><MainPage/><MainFooter/></>}/>
        <Route path="/login" element={<><Login /></>}/>
        <Route path="/feedback" element={<><Header/><Feedback/></>}/>
        <Route path="/cart" element={<><Cart/></>}/>
        <Route path="/products" element={<><Logout/> <ProductList /><Footer /></>} />
        <Route path="/add-product" element={<><Logout/>  <AddProduct /><Footer /></>} />
        <Route path="/dashboard" element={<> <Logout/> <Dashboard /><Footer /></>} />

      </Routes>
    </Router>
     <ToastContainer />
    </>
  );
}

export default App;
