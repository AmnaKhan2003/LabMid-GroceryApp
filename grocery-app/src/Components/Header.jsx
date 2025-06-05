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
        <div className="bg-green-700 max-w-10xl px-4 sm:px-6 p-2">
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-content-start ml-5' onClick={HandleMainPage}>
                    <button  className='cursor-pointer bg-green-700 rounded-lg'><img src="https://cdn-icons-gif.flaticon.com/15547/15547182.gif" className="size-12 mt-2 rounded-2xl" alt="Home" /></button>
                    <button className='cursor-pointer'><p className='ml-5 mt-3 text-2xl text-white font-bold'>Greeno Store</p></button>
                </div>
                <div className='flex items-center'>
                    <div>
                        <button className=' text-lg mr-2  cursor-pointer text-white  hover:bg-green-800 hover:text-white rounded-lg px-2 py-1 transition-normal duration-300 ease-in-out' onClick={() => navigate('/Login')}>Login</button>
                    </div>
                    <div>
                        <button className=' text-lg  mr-5 cursor-pointer text-white  hover:bg-green-800 hover:text-white rounded-lg px-2 py-1 transition-normal duration-600 ease-in-out' onClick={() => navigate('/signup')}>SignUp</button>
                    </div>
                    {/* <button className='flex items-center ml-5 cursor-pointer' onClick={HandleCart}>
                        <img src="https://cdn-icons-png.flaticon.com/128/7640/7640571.png" className='size-10 hover:size-11 transition-all duration-300 ease-in-out' alt="Cart" />
                    </button> */}
                </div>
            </div>
        </div>
        </>
    );
}
