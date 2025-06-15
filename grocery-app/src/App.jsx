import React from 'react';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import FrontPage from './Components/FrontPage';
import SignUp from './Components/SignUp';
import {ToastContainer} from 'react-toastify';
import Profile from './Components/Customer/Profile';
import Products from './Components/Customer/Products';
import SliderImage from './Components/Customer/SliderImage';
import Checkout from './Components/Customer/Checkout';
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
        <Route path="/profile/:email" element={<><Header/><Profile/></>}/>
        <Route path="/signup" element={<><Header/><SignUp/></>}/>
        <Route path="/productList" element={<><Header/><MainPage/></>}/>
        <Route path="/feedback" element={<><Header/><Feedback/></>}/>
        <Route path="/checkout" element={<><Header/><Checkout/></>}/>

        <Route path="/cart" element={<><Cart/></>}/>
        <Route path="/products" element={<><Header/> <ProductList /><Footer /></>} />
        <Route path="/add-product" element={<><Header/>  <AddProduct /><Footer /></>} />
        <Route path="/dashboard" element={<> <Header/> <Dashboard /><Footer /></>} />

      </Routes>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
