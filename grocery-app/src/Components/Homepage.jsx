import React from 'react'
export default function Homepage() {
  return (
    <div>
        <div className="w-full flex justify-center mt-5">
            <div className="bg-indigo-50 rounded-2xl overflow-hidden w-140 h-70 flex items-center justify-center shadow-lg">
            <img
                src="https://static.vecteezy.com/system/resources/previews/022/835/620/non_2x/modern-logo-vegetable-in-box-with-wheels-for-grocery-delivery-logo-design-vector.jpg"
                alt="Grocery Store"
                className="object-cover w-full h-full"
            />

            </div>
        </div>
        <div className='mt-6 flex justify-center'>
            <p className="text-2xl font-bold text-black flex items-center">
                Crave, Cook, Enjoy
                <img
                src="https://cdn-icons-png.flaticon.com/128/1625/1625048.png"
                className="w-8 h-8 ml-2 inline-block"
                alt="Food Icon"
                />
                <img src='https://cdn-icons-png.flaticon.com/128/7557/7557560.png' className="w-8 h-8 ml-2 inline-block"
                alt="drink Icon"/>
            </p>
        </div>
    </div> 
  
  )
}