import React, { useEffect, useState } from 'react'
import AddButton from './AddButton';
import { Link } from 'react-router-dom';
export default function Cart() {
  const [cartData,setCartData]=useState([]);
  useEffect(()=>{
    const data=localStorage.getItem('cart');
    if(data){
      setCartData(JSON.parse(data));
      console.log(cartData)
    }
    else{
      setCartData([]);
    }
  },[])
  return (
    <div>
    <div className="flex items-center justify-center mt-8 mb-10"> 
      <div className='p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg w-120 h-auto  '>
        <div>
          {cartData.map((item,index)=>(
            <div key={index} className='flex justify-content-center items-center mt-4'>
              <div className='flex items-center justify-content-between'>
                <div className='w-20 h-20 bg-gray-300 rounded-md shadow-md'>
                <img src={item.image} className='size-20 p-2'/>
                </div>
                <p className='text-black text-2xl-10 ml-20 font-bold'>{item.name}   </p>
              </div>
              <div className='ml-30'>
                <AddButton image={item.image} type={item.type} name={item.name} price={item.price} description={item.description} quantity={item.quantity}/>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
    <Link to='/feedback'>
    <button className='w-30 h-15 mb-20 ml-170 text-white bg-green-500 rounded-md shadow-green-700 cursor-pointer hover:bg-green-300'>Checkout</button>
    </Link>
    </div>
  )
}
