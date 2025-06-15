// components/Footer.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 w-full py-3 flex justify-around bg-green-700">
      <button className="text-xl text-white font-semibold cursor-pointer" onClick={() => navigate('/products')}>Products</button>
      <button className="text-xl text-white font-semibold cursor-pointer" onClick={() => navigate('/add-product')}>Add Product</button>
      <button className="text-xl text-white font-semibold cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</button>
    </div>
  );
}

export default Footer;
