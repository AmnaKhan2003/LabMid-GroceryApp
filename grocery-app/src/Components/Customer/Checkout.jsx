import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Checkout() {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
    const [cartData, setCartData] = useState([]);
    const standardDelivery = 159;
    const service=7.99;
    const packaging=10;
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await axios.get(`http://localhost:5000/api/User/indvidual/${email}`, {
          withCredentials: true,
        });
        setName(userData.data.user.name || '');
        setAddress(userData.data.user.address || '');
        setPhone(userData.data.user.phone || '');
      } catch (err) {
        console.error("Error fetching user Data", err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
      const updateCartFromLocalStorage = () => {
        const data = JSON.parse(localStorage.getItem('Parentcart')) || [];
        if (Array.isArray(data)) {
          setCartData(data);
          console.log("showing cart in sumary page")
          console.log(cartData);
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

  return (
    <div>
        <p className='text-center text-2xl font-bold text-green-800 mb-4 mt-10'>Your Order Was Confirmed</p>
    <div className="flex flex-col md:flex-row justify-center items-start mt-16 space-y-8 md:space-y-0 md:space-x-10 px-4">
      {/* Personal Info Card */}
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
        <div className="space-y-2">
          <div>
            <label className="text-gray-500 text-sm">Name</label>
            <p className="text-gray-800 font-medium">{name}</p>
          </div>
          <div>
            <label className="text-gray-500 text-sm">Email</label>
            <p className="text-gray-800 font-medium">{email}</p>
          </div>
          <div>
            <label className="text-gray-500 text-sm">Phone</label>
            <p className="text-gray-800 font-medium">{phone}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Delivery Address</h3>
          <p className="text-gray-800">{address}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-[500px] text-gray-800">
            <h2 className="text-lg font-bold mb-1">Your order from</h2>
            <p className="text-sm text-gray-600 mb-4 font-medium">
                Greeno - Islamabad (ISB)
            </p>

           {cartData.map((cart, index) => (
            <div key={index} className="flex justify-between mb-2">
                <p className="text-gray-800 text-sm">
                {cart.quantity} × {cart.name}
                </p>
                <p className="text-gray-800 text-sm">Rs. {cart.price}</p>
            </div>
            ))}

            <hr className="my-4" />

            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                <span>Subtotal</span>
                <p className="text-lg font-semibold text-gray-900">
                Rs.{" "}
                {cartData
                  .reduce((total, item) => total + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
                </div>
                <div className="flex justify-between">
                <span>Standard delivery</span>
                <span>Rs. 159</span>
                </div>
                <div className="flex justify-between">
                <span>Small order fee</span>
                <span>Rs. 239</span>
                </div>
                <div className="flex justify-between">
                <span>Service fee</span>
                <span>Rs. 7.99</span>
                </div>
                <div className="flex justify-between">
                <span>Packaging Fee</span>
                <span>Rs. 25</span>
                </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <p className="text-lg font-semibold text-gray-900">
                Rs.{" "}
                {cartData
                  .reduce((total, item) => (total + item.price * item.quantity)+ packaging+service+standardDelivery, 0)
                  .toFixed(2)}
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-1">(incl. fees and tax)</p>
            </div>
    </div>
    </div>
  );
}
