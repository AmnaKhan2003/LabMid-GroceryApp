import React from 'react'
import ProductList from '../ProductList';
import AddButton from './AddButton';

export default function Products() {
    const products = [
        {
          name: "Tomato",
          type: "Vegetable",
          quantity: "1 kg",
          detail: "Fresh and juicy tomatoes, perfect for salads and cooking.",
          price: 60,
          image: "https://cdn-icons-png.flaticon.com/128/4264/4264979.png",
        },
        {
          name: "Apple",
          type: "Fruit",
          quantity: "1 kg",
          detail: "Sweet and crunchy red apples, rich in fiber and vitamin C.",
          price: 150,
          image: "https://cdn-icons-png.flaticon.com/128/415/415733.png",
        },
        {
          name: "Milk",
          type: "Dairy",
          quantity: "1 liter",
          detail: "Fresh cow milk, full cream, rich in calcium.",
          price: 90,
          image: "https://cdn-icons-png.flaticon.com/128/2978/2978981.png",
        },
        {
          name: "Bread",
          type: "Bakery",
          quantity: "1 loaf",
          detail: "Soft and fresh brown bread, perfect for breakfast.",
          price: 70,
          image: "https://cdn-icons-png.flaticon.com/128/5521/5521222.png",
        },
        {
          name: "Cheddar Cheese",
          type: "Dairy",
          quantity: "200g",
          detail: "Rich and creamy cheddar cheese slices.",
          price: 250,
          image: "https://cdn-icons-png.flaticon.com/128/2553/2553691.png",
        },
        {
          name: "Chicken Breast",
          type: "Meat",
          quantity: "500g",
          detail: "Lean and tender chicken breast, hormone-free.",
          price: 380,
          image: "https://cdn-icons-png.flaticon.com/128/1046/1046784.png",
        },
        {
          name: "Rice",
          type: "Grain",
          quantity: "5 kg",
          detail: "Premium basmati rice with long grains and rich aroma.",
          price: 900,
          image: "https://cdn-icons-png.flaticon.com/128/994/994928.png",
        },
        {
          name: "Orange Juice",
          type: "Beverage",
          quantity: "1 liter",
          detail: "Freshly squeezed orange juice, no added sugar.",
          price: 180,
          image: "https://cdn-icons-png.flaticon.com/128/1118/1118577.png",
        },
        {
          name: "Banana",
          type: "Fruit",
          quantity: "1 dozen",
          detail: "Naturally ripened bananas, full of potassium.",
          price: 120,
          image: "https://cdn-icons-png.flaticon.com/128/415/415746.png",
        },
        {
          name: "Onion",
          type: "Vegetable",
          quantity: "1 kg",
          detail: "Fresh onions with strong flavor, ideal for cooking.",
          price: 50,
          image: "https://cdn-icons-png.flaticon.com/128/679/679922.png",
        },
        {
          name: "Eggs",
          type: "Dairy",
          quantity: "1 dozen",
          detail: "Farm fresh eggs, rich in protein.",
          price: 180,
          image: "https://cdn-icons-png.flaticon.com/128/2897/2897751.png",
        },
        {
          name: "Yogurt",
          type: "Dairy",
          quantity: "500g",
          detail: "Creamy and thick natural yogurt.",
          price: 90,
          image: "https://cdn-icons-png.flaticon.com/128/4605/4605854.png",
        },
        {
          name: "Carrot",
          type: "Vegetable",
          quantity: "1 kg",
          detail: "Bright orange carrots, full of beta-carotene.",
          price: 55,
          image: "https://cdn-icons-png.flaticon.com/128/590/590685.png",
        },
        {
          name: "Potato",
          type: "Vegetable",
          quantity: "2 kg",
          detail: "Organic potatoes, great for baking and mashing.",
          price: 80,
          image: "https://cdn-icons-png.flaticon.com/128/590/590685.png",
        },
        {
          name: "Pepsi",
          type: "Beverage",
          quantity: "1.5 liter",
          detail: "Chilled refreshing Pepsi drink.",
          price: 140,
          image: "https://cdn-icons-png.flaticon.com/128/1046/1046754.png",
        }
      ];
      console.log(products)
      
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-20 my-10">
    {products.map((items, index) => (
      <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform  transition-all duration-300 cursor-pointer">
        <div className="flex justify-center items-center h-40 bg-gray-100 rounded-t-2xl">
          <img src={items.image} alt={items.name} className="h-28 w-auto object-contain" />
        </div>
        <div className="p-4">
          <p className="text-lg font-bold text-center text-gray-800">{items.name}</p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-green-700 font-semibold ml-2">Rs. {items.price}</p>
            <div className="mr-2">
              <AddButton quantity={items.quantity} />
            </div>
          </div>
        </div>
      </div>
    ))}
</div>

  )
}
