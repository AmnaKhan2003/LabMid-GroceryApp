import React from 'react'
import { useState } from 'react'
function AddProduct() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        if (name && type && quantity && price && description) {

            const newProduct = { name, type, quantity, price, description };
            const exists = localStorage.getItem('products');
            const products = exists ? JSON.parse(exists) : [];
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            alert('Product added successfully');
        
            setName('');
            setType('');
            setQuantity('');
            setPrice('');
            setDescription('');


        } 
        else {
            alert('Please fill all fields');
        }
    }



  return (
    <div className="p-6 max-w-md mx-auto">
    <h1 className="text-xl font-semibold mb-4 text-center" text-center>Add Product</h1>
    <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full p-2 border rounded" placeholder="Enter Product Name" value={name} onChange={(e) => setName(e.target.value)} />
        <select className="w-full p-2 border rounded" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select Product Type</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruits">Fruit</option>
            <option value="Other">Other</option>
        </select>
        <input className="w-full p-2 border rounded" placeholder="Enter Product Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder=" Enter Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Enter Product Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button className="w-full bg-green-500 text-white py-2 rounded" type="submit">Add Product</button>
      </form>
        
    </div>
  )
}

export default AddProduct
