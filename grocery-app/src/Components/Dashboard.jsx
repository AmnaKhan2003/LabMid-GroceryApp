import React, { useState, useEffect} from 'react'

export default function Dashboard() {
  const [counts, setCounts] = useState({total:0, vegetables:0, fruits: 0, others:0});

  useEffect(() => {
    const data = localStorage.getItem('products');
    const products = data ? JSON.parse(data) : [];
    let vegetables=0
    let fruits=0
    let others=0
        products.forEach((product)=>{
            if(product.type==="Vegetable"){
                vegetables++
            }
            else if(product.type==="Fruit"){
                fruits++
            }
            else{
                others++
            }
    
        })
        setCounts({total:products.length,vegetables,fruits,others})
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 bg-gray-100 rounded-lg shadow-sm flex flex-col justify-center items-center">
          <h3 className="text-2xl font-semibold text-gray-700">Total Products</h3>
          <p className="text-3xl font-bold text-blue-500">{counts.total}</p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg shadow-sm flex flex-col justify-center items-center">
          <h3 className="text-2xl font-semibold text-gray-700">Fruits</h3>
          <p className="text-3xl font-bold text-green-500">{counts.fruits}</p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg shadow-sm flex flex-col justify-center items-center">
          <h3 className="text-2xl font-semibold text-gray-700">Vegetables</h3>
          <p className="text-3xl font-bold text-yellow-500">{counts.vegetables}</p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg shadow-sm flex flex-col justify-center items-center">
          <h3 className="text-2xl font-semibold text-gray-700">Others</h3>
          <p className="text-3xl font-bold text-red-500">{counts.others}</p>
        </div>
      </div>
    </div>
  );
}
