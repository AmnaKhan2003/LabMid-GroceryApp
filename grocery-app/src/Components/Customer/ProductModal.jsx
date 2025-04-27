import React, { useState } from 'react';
import AddButton from './AddButton';

export default function ProductModal({ image, name,type,price,description }){
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div>
      <div onClick={openModal}  className="block text-white bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        <div className="flex justify-center items-center h-40 bg-gray-100 rounded-t-2xl">
          <img src={image} alt={name} className="h-28 w-auto object-contain" />
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="relative p-6 bg-white rounded-lg shadow-lg max-w-lg w-120 h-120" onClick={(e) => e.stopPropagation()}>
            <div className='flex items-center justify-between'>
                <div className="mt-4 bg-gray-200 rounded-md px-4 py-4">
                    <img src={image} alt={name} className="w-40 h-35 " />
                </div>
                <div className=''>
                  <p className='text-2xl text-black font-extrabold mr-20'>{name}</p>
                  
                  <p className='text-2xl text-green-700 font-bold mt-3'> Rs. {price}</p>
                  <p>Category: {type}</p>
                </div>
            </div>

            <div className='mt-8'>
              {description} ....
            </div>
            <div className='w-30 h-15 px-6 py-4 bg-gray-200 rounded-md shadow-md ml-30 mt-8'><AddButton/></div>
            <div className="mt-15 flex justify-end">
              <button onClick={closeModal} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
