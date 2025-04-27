import React, { useEffect } from 'react'
import { useState } from 'react'
export default function AddButton({quantity}) {
    const [cart,setCart]=useState([]);
    const[cartQuantity,setCartQuantity]=useState(0);
    useEffect(()=>{
      const data=localStorage.getItem('products');
      if (data){
        setCart(JSON.parse(data));
      }
      else{
        setCart([])
      }
    },[])
    const add=()=>{
      console.log(cart.name)
      if(cart.quantity>0){
        setCart(cart.quantity-1);
        setCartQuantity(cartQuantity+1);
        localStorage.setItem('cart',JSON.stringify(cartQuantity));
      }
    }
    const remove=()=>{
      if(cart.quantity<0){
        setCart(0);
        setCartQuantity(0);
        localStorage.setItem('cart',JSON.stringify(cartQuantity));
      }
      else{
        setCart(cart.quantity+1);
        setCartQuantity(cartQuantity-1);
        localStorage.setItem('cart',JSON.stringify(cartQuantity));
      }
    }
  return (
    <div className='flex items-center'>
     
        <button onClick={remove}><img src='https://cdn-icons-png.flaticon.com/128/4436/4436695.png' className='w-5 h-5 mr-1 hover:bg-gray-300 rounded-md'/></button>
        <p>{cartQuantity}</p>
         <button onClick={add}><img src='https://cdn-icons-png.flaticon.com/128/4315/4315609.png' className='w-5 h-5 ml-1 hover:bg-gray-300 rounded-md'/></button>
    </div>
  )
}
