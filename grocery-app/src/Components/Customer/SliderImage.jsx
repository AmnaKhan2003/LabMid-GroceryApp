import React from 'react'
import Products from './Products'

export default function SliderImage() {
  return (
    <div>
       <p className="text-2xl ml-8 font-bold text-black flex items-center">
        Crave, Cook, Enjoy
        <img
            src="https://cdn-icons-png.flaticon.com/128/1625/1625048.png"
            className="w-8 h-8 ml-2 inline-block"
            alt="Food Icon"
        />
        <img
            src="https://cdn-icons-png.flaticon.com/128/7557/7557560.png"
            className="w-8 h-8 ml-2 inline-block"
            alt="Drink Icon"
        />
    </p>
    <Products />
    </div>
  )
}
