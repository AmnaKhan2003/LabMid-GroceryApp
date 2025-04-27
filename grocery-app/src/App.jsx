
// App.js
import React from 'react';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import ProductList from './Components/ProductList';
import AddProduct from './Components/AddProduct';
import Dashboard from './Components/Dashboard';
import Footer from './Components/Footer';
import Homepage from './Components/Homepage';
import Header from './Components/Header';
import Logout from './Components/Logout';
import MainPage from './Components/Customer/MainPage'; 
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<><Header/><MainPage/></>}/>
        <Route path="/login" element={<><Login /></>}/>
        <Route path="/products" element={<><Logout/> <ProductList /><Footer /></>} />
        <Route path="/add-product" element={<><Logout/>  <AddProduct /><Footer /></>} />
        <Route path="/dashboard" element={<> <Logout/> <Dashboard /><Footer /></>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
