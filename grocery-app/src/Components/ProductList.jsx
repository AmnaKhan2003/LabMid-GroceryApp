import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/products", {
        withCredentials: true,
      });
      const products = response.data || [];
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
        withCredentials: true,
      });
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedProduct.name || !selectedProduct.type || !selectedProduct.quantity || !selectedProduct.price || !selectedProduct.description) {  
      toast.error("Please fill all fields");
      return; 
    }
    if (isNaN(selectedProduct.price) || selectedProduct.price < 0) {
      toast.error("Please enter a valid price");
      return;
    }
    if (isNaN(selectedProduct.quantity) || selectedProduct.quantity < 0) {
      toast.error("Please enter a valid quantity");
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/admin/products/${selectedProduct._id}`,
        selectedProduct,
        { withCredentials: true }
      );
      fetchProducts();
      setShowModal(false);
      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error("Update failed");
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">Product List</h2>
      {products.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table-auto w-full border-collapse">
            <thead className="w-full bg-green-700 py-2 rounded  text-white">
              <tr>
                <th className="border border-gray-300 px-6 py-3">Image</th>
                <th className="border border-gray-300 px-6 py-3">Name</th>
                <th className="border border-gray-300 px-6 py-3">Type</th>
                <th className="border border-gray-300 px-6 py-3">Quantity</th>
                <th className="border border-gray-300 px-6 py-3">Price (Rs)</th>
                <th className="border border-gray-300 px-6 py-3">Description</th>
                <th className="border border-gray-300 px-6 py-3"></th>
                <th className="border border-gray-300 px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {products.map((product, index) => (
                <tr key={index} className="hover:bg-green-100 transition">
                  <td className="border border-gray-300 px-4 py-2">
                    <img src={product.url} alt={product.name} className="w-16 h-16 object-cover mx-auto rounded-lg shadow-md" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.type}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img src="/edit.png" alt="edit" className="w-10 h-10 cursor-pointer" onClick={() => handleEdit(product)} />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img src="/delete.png" alt="delete" className="w-10 h-10 cursor-pointer" onClick={() => deleteData(product._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-center">No products found</p>
      )}

      {showModal && selectedProduct && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-4xl font-semibold mb-8 text-center text-gray-800">Edit Product</h3>
            <form className="space-y-3" onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded"
              value={selectedProduct.name}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
            />
            <select className="w-full p-2 border rounded" value={selectedProduct.type} onChange={(e) => setSelectedProduct({ ...selectedProduct, type: e.target.value })}>
              <option value="">Select Product Type</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Quantity"
              className="w-full border px-3 py-2 mb-2"
              value={selectedProduct.quantity}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, quantity: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full border px-3 py-2 mb-2"
              value={selectedProduct.price}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full border px-3 py-2 mb-2"
              value={selectedProduct.description}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="w-full bg-blue-500 text-white py-2 rounded bg-gradient-to-r from-green-500 to-green-400 text-gray-700" onClick={handleUpdate}>
                Save
              </button>
            </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
