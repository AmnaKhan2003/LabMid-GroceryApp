import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const [cartState, setCartState] = useState(false); 

    const HandleCart = () => {
        setCartState(false); 
        navigate('/', { state: { cartState } }); 
    }

    const HandleMainPage = () => {
        setCartState(true); 
        navigate('/', { state: { cartState } }); 
    }

    return (
        <>
        <div className="bg-gradient-to-r from-green-500 to-green-400 mx-auto h-16 max-w-10xl px-4 sm:px-6 lg:px-8 ">
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-content-start'>
                    <button onClick={HandleMainPage} className='cursor-pointer'><img src="https://cdn-icons-png.flaticon.com/128/1261/1261163.png" className="size-12 mt-2" alt="Home" /></button>
                    <p className='ml-5 mt-3 text-2xl font-bold italic bg-gradient-to-l from-green-500 to-green-400  font-mono'>Greeno Store</p>
                </div>
                <div className='flex items-center'>
                    <div>
                        <button className='text-black text-2xl mr-5 cursor-pointer font-bold hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 transition-normal duration-300 ease-in-out' onClick={() => navigate('/Login')}>Login</button>
                    </div>
                    <button className='flex items-center ml-5 cursor-pointer' onClick={HandleCart}>
                        <img src="https://cdn-icons-png.flaticon.com/128/7640/7640571.png" className='size-10 hover:size-11 transition-all duration-300 ease-in-out' alt="Cart" />
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}
