import React, { useState, useEffect } from 'react';

export default function AddButton({ image, name, type, price, description }) {
  const [cart, setCart] = useState([]);
  const [parentCart,setParentCart]=useState([]);
 useEffect(()=>{
    try{
      const data = JSON.parse(localStorage.getItem('cart'));
      if(Array.isArray(data)){
        setCart(data);
        setParentCart((prev)=>[...prev,data]);
      }

    }
    catch(error){
      console.log("error in fetching cart")
    }
  },[])
  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart));
    console.log(localStorage.getItem('cart'))
  },[cart])

  const currentItem = cart.find(item => item.name === name);
  const currentQuantity = currentItem ? currentItem.quantity : 0;
  const add = () => {
    let updatedCart;
    if (currentItem) {
      updatedCart= cart.map(item =>item.name === name ? { ...item, quantity: item.quantity + 1 } : item);
    } else {
      const newItem = { name, image, type, price, description, quantity: 1 };
      updatedCart = [...cart, newItem];
    }
    setCart(updatedCart);
  };

  const remove = () => {
    if (currentItem && currentItem.quantity > 1) {
      const updatedCart = cart.map(item =>
        item.name === name ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
    } else if (currentItem && (currentItem.quantity === 1 || currentItem.quantity===0)) {
      const updatedCart = cart.filter(item => item.name !== name);
      setCart(updatedCart);
    }
    
  };

  return (
    <div className='flex items-center'>
      <button onClick={remove}>
        <img src='https://cdn-icons-png.flaticon.com/128/4436/4436695.png' className='w-5 h-5 mr-1 hover:bg-gray-300 rounded-md' />
      </button>
      <p>{currentQuantity}</p>
      <button onClick={add}>
        <img src='https://cdn-icons-png.flaticon.com/128/4315/4315609.png' className='w-5 h-5 ml-1 hover:bg-gray-300 rounded-md' />
      </button>
    </div>
  );
}
