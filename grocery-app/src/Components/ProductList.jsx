import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('products');
    if (data){
        setProducts(JSON.parse(data));
    } else {
      setProducts([]);
    }
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Product List</h2>
      {products.length > 0 ? (
        <ul className="space-y-2">
          {products.map((product, index) => (
            <li key={index} className="border p-4 rounded shadow-md bg-white">
              <p><span className="font-semibold">Name:</span> {product.name}</p>
              <p><span className="font-semibold">Type:</span> {product.type}</p>
              <p><span className="font-semibold">Quantity:</span> {product.quantity}</p>
              <p><span className="font-semibold">Price:</span> {product.price} Rs</p>
              <p><span className="font-semibold">Description:</span> {product.description}</p>

            </li>
          ))}
        </ul>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

export default ProductList;
