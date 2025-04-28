import React, { useEffect, useState } from 'react'
import ProductList from '../ProductList';
import AddButton from './AddButton';
import { Link } from 'react-router-dom';
import ProductModal from './ProductModal';

export default function Products() {
   const [product,setproduct]=useState([]);
   useEffect(()=>{
    const productData=localStorage.getItem('products');
    if (productData){
      setproduct(JSON.parse(productData));
    } else {
      setproduct([]);
    }
   },[])
   console.log(product)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-20 my-10 ">
    {product.map((items, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform  transition-all duration-300 cursor-pointer">
          <ProductModal name={items.name} image={items.url} type={items.type} price={items.price} description={items.description} quantity={items.quantity}/>
          <div className="p-4">
            <p className="text-lg font-bold text-center text-gray-800">{items.name}</p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-green-700 font-semibold ml-2">Rs. {items.price}</p>
              <div className="mr-2">
                <AddButton image={items.url} type={items.type} name={items.name} price={items.price} description={items.description} quantity={items.quantity}/>
              </div>
            </div>
          </div>
        </div>
    ))}
</div>

  )
}
