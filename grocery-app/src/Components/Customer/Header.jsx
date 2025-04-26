import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
    <div className="  bg-gradient-to-r from-green-500 to-green-400 mx-auto h-16 max-w-10xl px-4 sm:px-6 lg:px-8 ">
    <div className='flex items-center justify-between'>
        <div className='flex items-center justify-content-start'>
            <img src="https://cdn-icons-png.flaticon.com/128/1261/1261163.png" className="size-12 mt-2"/>
            <Link to='/'>
            <p className='ml-5 mt-3 text-2xl font-bold italic bg-gradient-to-l from-green-500 to-green-400  font-mono'> Greeno Store</p>
            </Link>
        </div>
        <div>
            <Link to="/login">
            <button className='text-black text-2xl mr-5 cursor-pointer font-bold hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 transition-normal duration-300 ease-in-out'>Login</button>
            </Link>
        </div>
    </div>
    </div>
    </>
  )
}
