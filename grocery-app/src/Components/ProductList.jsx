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
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">Product List</h2>
      {products.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table-auto w-full border-collapse">
            <thead className="w-full bg-blue-500 py-2 rounded bg-gradient-to-r from-green-500 to-green-400 text-gray-700">
              <tr>
                <th className="border border-gray-300 px-6 py-3">Image</th>
                <th className="border border-gray-300 px-6 py-3">Name</th>
                <th className="border border-gray-300 px-6 py-3">Type</th>
                <th className="border border-gray-300 px-6 py-3">Quantity</th>
                <th className="border border-gray-300 px-6 py-3">Price (Rs)</th>
                <th className="border border-gray-300 px-6 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {products.map((product, index) => (
                <tr
                  key={index}
                  className= 'hover:bg-green-100 transition'
                >
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={product.url}
                      alt={product.name}
                      className="w-16 h-16 object-cover mx-auto rounded-lg shadow-md"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.type}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-center">No products found</p>
      )}
    </div>
  );
  
}

export default ProductList;
