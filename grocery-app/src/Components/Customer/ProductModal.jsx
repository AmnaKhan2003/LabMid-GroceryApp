import React, { useState } from 'react';

export default function ProductModal({ image, name }) {
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
          <div className="relative p-6 bg-white rounded-lg shadow-lg max-w-lg w-120 h-150" onClick={(e) => e.stopPropagation()}>
            <div className='flex items-center justify-content-center'>
                <div className="mt-4 bg-gray-200 rounded-md px-4 py-4">
                    <img src={image} alt={name} className="w-40 h-35 " />
                </div>
            </div>
            <div className="mt-6 flex justify-end">
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
