import React from 'react'
import Products from './Products'
import { useLocation } from 'react-router-dom'
import Cart from './Cart';
import SliderImage from './SliderImage';

export default function MainPage() {
    const location = useLocation();
    const data = location.state?.cartState;
    console.log(data)

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
            <div className="mt-10">
                {!data ? (
                    <>
                       <SliderImage/>
                    </>
                ) : (
                    <>
                    <div className='flex items-center'>
                        <h1 className=' text-black  font-bold text-2xl ml-50 lg:ml-170 md:ml-100'>Your Cart</h1>
                        <img src="https://cdn-icons-png.flaticon.com/128/9453/9453946.png" className='size-10 ml-7'/>
                    </div>
                    <Cart />
                    </>
                )}
            </div>
        </div>
    )
}
 