// components/Footer.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  

  return (
    <div className="fixed bottom-0 w-full py-3 flex justify-around bg-gradient-to-r from-green-500 to-green-400">
      <button className="text-xl text-black-600 font-semibold" onClick={() => navigate('/products')}>Products</button>
      <button className="text-xl text-black-600 font-semibold" onClick={() => navigate('/add-product')}>Add Product</button>
      <button className="text-xl text-black-600 font-semibold" onClick={() => navigate('/dashboard')}>Dashboard</button>
    </div>
  );
}

export default Footer;
