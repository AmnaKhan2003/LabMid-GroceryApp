import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

    // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/check-session", {
          withCredentials: true,
        });

        if (!response.data.loggedIn) {
          throw new Error("Session expired");
        }
      } catch (err) {
        localStorage.removeItem('token');
        toast.error("Please login First.");
        navigate("/");
      }
    };

    checkSession();

    // Auto check every minute
    const interval = setInterval(checkSession, 60000); // 1 minute

    return () => clearInterval(interval);
  }, []);

   const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/products", {
        withCredentials: true,
      });
      const products = response.data || [];
      setProducts(products);
      
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };


    useEffect(() => {
    fetchProducts();
  }, []);

   const updateData = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/products/${id}`, {}, {
        withCredentials: true,
      });
      fetchProducts();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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
                  onClick={() => updateData(product._id)}
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
