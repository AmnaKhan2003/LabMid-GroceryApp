import React, { useState,useEffect } from 'react';
import Products from './Products';
import { useLocation } from 'react-router-dom';
import Cart from './Cart';
import SliderImage from './SliderImage';

export default function MainPage() {
  const location = useLocation();
  const data = location.state?.cartState;

  const images = [
   {
      src: " https://untappedbrilliance.com/wp-content/uploads/2015/10/ADHD-and-Grocery-Shopping.jpg",
      alt: "Fresh Veggies",
    },
    {
      src: "https://cdn.metro-online.com/-/media/Project/MCW/PK_Metro/2020-to-2021/Product-World-2021/14-Grocery-World.jpg?h=464&iar=0&w=1392&rev=2a4b13f3d92f4567bd71e474fbb178e7&hash=C4A1E457EC733D851253DD2E227DBD6B",
      alt: "Fresh Veggies",
    },
    {
      src: "https://assets.aboutamazon.com/dims4/default/d573e3b/2147483647/strip/false/crop/1320x743+0+0/resize/1320x743!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F92%2F06%2Fbb204a6842a49e7bdc66523a070c%2Fblog2.jpg",
      alt: "Healthy Bowl",
    },
    {
      src: "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-06/beautiful-tasty-appetizing-ingredients-spices-grocery-cooking-healthy-kitchen-blue-old-wooden-background-top-view.jpg",
      alt: "Organic Juice",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

    useEffect(() => {
    const interval = setInterval(() => {
        nextSlide();
    }, 5000); 
    return () => clearInterval(interval);
    }, [current]);


  return (
    <div className="flex min-h-screen w-full">
      <div className="bg-white min-h-screen w-full max-h-[90vh] overflow-y-auto px-4">
        {/* Slider */}
        <div className="relative w-full rounded-xl overflow-hidden mt-4">
          <img
            src={images[current].src}
            alt={images[current].alt}
            className="w-full h-[400px] object-cover transition duration-500 ease-in-out"
          />

          <button
            onClick={prevSlide}
            className="absolute cursor-pointer top-1/2 left-4 transform -translate-y-1/2  bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
          >
            ❮
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 cursor-pointer right-4 transform -translate-y-1/2   bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
          >
            ❯
          </button>
        </div>

        {/* Conditional section */}
        <div className="mt-10">
          {!data ? (
            <SliderImage />
          ) : (
            <>
              <div className="flex items-center">
                <h1 className="text-black font-bold text-2xl ml-10">Your Cart</h1>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/9453/9453946.png"
                  className="size-10 ml-4"
                  alt="Cart Icon"
                />
              </div>
              <Cart />
            </>
          )}
        </div>
      </div>

      {/* Right side cart */}
      <div className="hidden lg:block w-2/5 bg-green-50 p-6 border-l border-gray-100 min-h-screen h-full">
        <div className="max-h-[90vh] overflow-y-auto">
          <Cart />
        </div>
      </div>
    </div>
  );
}
