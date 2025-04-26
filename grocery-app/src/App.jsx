import React from 'react'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from './Components/AddProduct'
import ProductList from './Components/ProductList'
import Header from './Components/Customer/Header'
import MainPage from './Components/Customer/MainPage';
function App() {

  return (
    <>
      <div>
        <Header/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<MainPage/>}/>

        </Routes>
      </div>
    </>
  )
}

export default App
