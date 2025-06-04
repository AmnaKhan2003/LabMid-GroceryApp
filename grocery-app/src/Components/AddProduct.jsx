import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddProduct() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !type || !quantity || !price || !description) {
      toast.error('Please fill all fields');
      return;
    }

    if (isNaN(price) || price < 0) {
      toast.error('Please enter a valid price');
      return;
    }

    if (isNaN(quantity) || quantity < 0) {
      toast.error('Please enter a valid quantity');
      return;
    }

    const newProduct = { name, type, quantity, price, description, url };

    try {
      const response = await axios.post('http://localhost:5000/api/admin/products', newProduct);
      toast.success('Product added successfully');

      // Reset form
      setName('');
      setType('');
      setQuantity('');
      setPrice('');
      setDescription('');
      setUrl('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full p-2 border rounded" placeholder="Enter Product Name" value={name} onChange={(e) => setName(e.target.value)} />
        <select className="w-full p-2 border rounded" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Product Type</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Fruit">Fruit</option>
          <option value="Other">Other</option>
        </select>
        <input className="w-full p-2 border rounded" placeholder="Enter Product Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Enter Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Enter Product Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Add Product Image Url" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button className="w-full bg-blue-500 text-white py-2 rounded bg-gradient-to-r from-green-500 to-green-400 text-gray-700" type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
