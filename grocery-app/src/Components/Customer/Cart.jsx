import React, { useEffect, useState } from 'react';
import AddButton from './AddButton';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Cart() {
  const [cartData, setCartData] = useState([]);
   const [currentQuantity,setCurrentQuantity]=useState(0);
  const navigate=useNavigate();
   const standardDelivery = 159;
    const service=7.99;
    const packaging=10;

  useEffect(() => {
    const updateCartFromLocalStorage = () => {
      const data = JSON.parse(localStorage.getItem('Parentcart')) || [];
      if (Array.isArray(data)) {
        setCartData(data);
      } else {
        setCartData([]);
      }
    };
    updateCartFromLocalStorage();
    window.addEventListener("storage", updateCartFromLocalStorage);
    return () => {
      window.removeEventListener("storage", updateCartFromLocalStorage);
    };
  }, []);

  useEffect(() => {
        console.log("Cart state:", cartData);
  }, [cartData]);

    const fetchProductQuantity = async (_id) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/IndvidualProduct/${_id}`);
        return res.data.product.quantity;
      } catch (err) {
        console.error("Error fetching product:", err);
        return null;
      }
    };

    const updateProductQuantity = async (_id, newQuantity) => {
      try {
        const res = await axios.put(`http://localhost:5000/api/admin/UpdateProduct/${_id}`, {
          quantity: newQuantity
        }, { withCredentials: true });
        return res.data;
      } catch (err) {
        console.error("Error updating product:", err);
      }
    };

     const Add = async ({ _id, name, url, type, price, description }) => {
          try {
            const currentQuantity = await fetchProductQuantity(_id);
    
            if (currentQuantity > 0) {
              const existingItem = cartData.find(item => item.name === name);
              let updatedCart;
    
              if (!existingItem) {
                updatedCart = [...cartData, { _id, name, url, type, price, description, quantity: 1 }];
              } else {
                updatedCart = cartData.map(item =>
                  item.name === name ? { ...item, quantity: item.quantity + 1 } : item
                );
              }
              setCartData(updatedCart);
              localStorage.setItem('Parentcart', JSON.stringify(updatedCart));
              await updateProductQuantity(_id, currentQuantity - 1);
            } else {
              toast.error("Item Out Of Stock");
            }
          } catch (error) {
            console.log("Error in Add function:", error);
          }
        };
    
          const remove = async ({ _id, name }) => {
          try {
            const currentItem = cartData.find(item => item.name === name);
            if (!currentItem) return;
            const backendQuantity = await fetchProductQuantity(_id);
            const currentQuantity = currentItem.quantity;
            let updatedCart;
    
            if (currentQuantity > 1) {
              updatedCart = cartData.map(item =>
                item.name === name ? { ...item, quantity: item.quantity - 1 } : item
              );
            } else {
              updatedCart = cartData.filter(item => item.name !== name);
            }
    
            setCartData(updatedCart);
            localStorage.setItem('Parentcart', JSON.stringify(updatedCart));
    
            await updateProductQuantity(_id, backendQuantity + 1); 
          } catch (error) {
            console.log("Error in remove function:", error);
          }
        };
  return (
    <div className="flex flex-col min-h-screen p-5 max-w-md mx-auto bg-white shadow-md">
  <div className="text-center text-gray-500 text-lg mb-2">🚚 Standard (15 – 30 mins)</div>
  <h2 className="text-center font-semibold text-lg mb-4">
    Your order from <span className="text-black">Greeno – Blue Area</span>
  </h2>

  <div className="flex-1 overflow-y-auto pr-2 mb-4">
    {cartData.length > 0 ? (
      cartData.map((item, index) => (
        <div key={index} className="flex items-center justify-between mb-4">
          <img src={item.url} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
          <div className="flex-1 mx-4">
            <p className="text-sm font-medium text-gray-800">{item.name}</p>
            <p className="text-sm font-semibold text-gray-600 mt-1">Rs. {item.price}</p>
          </div>
          <div className="flex items-center border rounded-lg px-2 py-1 shadow-sm">
            <button className="text-xl px-4 rounded-sm hover:bg-gray-200 cursor-pointer" onClick={() => remove(item)}>−</button>
            <span className="px-2 text-sm">{item.quantity}</span>
            <button className="text-xl px-4 rounded-sm hover:bg-gray-200 cursor-pointer" onClick={() => Add(item)}>+</button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-400 mt-16 text-base">Your cart is empty 🛒</p>
    )}
  </div>

  {cartData.length > 0 && (
    <div className="sticky bottom-0 bg-white pb-2 border-t mb-20 ">
      <div className="flex justify-between items-center mb-3 px-1">
        <p className="text-sm text-gray-500">Total (incl. fees and tax)</p>
        <p className="text-lg font-semibold text-gray-800">
          Rs. {cartData.reduce((total, item) => (total + item.price * item.quantity)+packaging+service+standardDelivery, 0).toFixed(2)}
        </p>
      </div>
      <div className="flex justify-between">
                <span className='text-gray-700'>Standard delivery</span>
                <span className='text-gray-700'>Rs. 159</span>
                </div>
                
                <div className="flex justify-between">
                <span className='text-gray-700'>Service fee</span>
                <span className='text-gray-700'>Rs. 7.99</span>
                </div>
                <div className="flex justify-between">
                <span className='text-gray-700'>Packaging Fee</span>
                <span className='text-gray-700'>Rs. 25</span>
                </div>
      <button
        className="w-full bg-green-600 mt-5 cursor-pointer hover:bg-green-500 text-white text-md font-bold py-3 rounded-lg"
        onClick={() => {
          navigate('/checkout');
          alert('Your Order Has Been Confimed !')
        }}
        
      >
        Go to checkout
      </button>
    </div>
  )}
</div>

  );
}
