import React from 'react';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import FrontPage from './Components/FrontPage';
import SignUp from './Components/SignUp';
import {ToastContainer} from 'react-toastify';
import Products from './Components/Customer/Products';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div  className='min-h-screen'>
              <Header />
                <FrontPage />
              <MainFooter/>
            </div>
          }
        />
        <Route path="/login" element={<><Header/><Login /></>}/>
        <Route path="/signup" element={<><Header/><SignUp/></>}/>
        <Route path="/products" element={<><Header/><Products/></>}/>
        <Route path="/feedback" element={<><Header/><Feedback/></>}/>
        <Route path="/cart" element={<><Cart/></>}/>
        <Route path="/products" element={<><Logout/> <ProductList /><Footer /></>} />
        <Route path="/add-product" element={<><Logout/>  <AddProduct /><Footer /></>} />
        <Route path="/dashboard" element={<> <Logout/> <Dashboard /><Footer /></>} />

      </Routes>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
