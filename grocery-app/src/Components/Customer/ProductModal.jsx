import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductModal({ id, image, name, type, price, description, quantity }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [currentQuantity, setCurrentQuantity] = useState(0);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const updateCartFromLocalStorage = () => {
      const data = JSON.parse(localStorage.getItem('Parentcart')) || [];
      setCartData(Array.isArray(data) ? data : []);
    };

    updateCartFromLocalStorage();
    window.addEventListener("storage", updateCartFromLocalStorage);
    return () => window.removeEventListener("storage", updateCartFromLocalStorage);
  }, []);

  useEffect(() => {
    const item = cartData.find((item) => item.name === name);
    setCurrentQuantity(item ? item.quantity : 0);
  }, [cartData, name]);

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


    const Add = async () => {
        try {
          const currentQuantity = await fetchProductQuantity(id);
  
          if (currentQuantity > 0) {
            const existingItem = cartData.find(item => item.name === name);
            let updatedCart;
  
            if (!existingItem) {
              updatedCart = [...cartData, { _id:id, name,url:image, type, price, description, quantity: 1 }];
            } else {
              updatedCart = cartData.map(item =>
                item.name === name ? { ...item, quantity: item.quantity + 1 } : item
              );
            }
            setCartData(updatedCart);
            localStorage.setItem('Parentcart', JSON.stringify(updatedCart));
            await updateProductQuantity(id, currentQuantity - 1);
          } else {
            toast.error("Item Out Of Stock");
          }
        } catch (error) {
          console.log("Error in Add function:", error);
        }
      };
  
        const remove = async () => {
        try {
          const currentItem = cartData.find(item => item.name === name);
          if (!currentItem) return;
          const backendQuantity = await fetchProductQuantity(id);
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
  
          await updateProductQuantity(id, backendQuantity + 1); 
        } catch (error) {
          console.log("Error in remove function:", error);
        }
      };

  return (
    <div>
      <div
        onClick={openModal}
        className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 p-4"
      >
        <div className="flex justify-center items-center h-40 mb-2">
          <img src={image} alt={name} className="h-32 object-contain" />
        </div>
        <h3 className="text-center text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-center text-green-600 font-bold">Rs. {price}</p>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <img src={image} alt={name} className="rounded-lg w-full object-contain h-60" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                <p className="text-lg text-green-700 font-semibold mt-2">Rs. {price}</p>
                <p className="text-sm text-gray-500 mt-1 mb-2">Category: <span className="capitalize">{type}</span></p>

                <div className="flex items-center border border-gray-300 rounded-lg mt-4 w-max">
                  <button
                    className="text-xl px-4 py-1 hover:bg-gray-200"
                    onClick={remove}
                  >
                    −
                  </button>
                  <span className="px-4 font-medium">{currentQuantity}</span>
                  <button
                    className="text-xl px-4 py-1 hover:bg-gray-200"
                    onClick={Add}
                  >
                    +
                  </button>
                </div>

                {/* Description */}
                <h3 className="text-md font-semibold mt-6 text-gray-700">Product Description</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {description?.slice(0, 160)}...
                </p>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
