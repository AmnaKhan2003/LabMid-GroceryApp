import React, { useEffect, useState } from 'react'
import ProductList from '../ProductList';
import AddButton from './AddButton';
import { Link } from 'react-router-dom';
import ProductModal from './ProductModal';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Products() {
   const [product,setproduct]=useState([]);
   const [cart,setCart]=useState([]);
   const [stock,setStock]=useState(false);
   const [currentQuantity,setCurrentQuantity]=useState(0);
   const [searchQuery,setSearchQuery]=useState('');
   const [ActualQuantity,setQuantity]=useState(0);
   useEffect(()=>{
    const fetchProduct=async()=>{
      try{
         const ProductData= await axios.get("http://localhost:5000/api/admin/products", { 
        withCredentials:true
      })
      setproduct(ProductData.data);
      console.log("showing product data")
      console.log(product);
      }
      catch(error){
        console.log("error in fetching product list", error)
      }
    }
    fetchProduct();
   },[])
   
  useEffect(() => {
    const updateCartFromLocalStorage = () => {
      const data = JSON.parse(localStorage.getItem('Parentcart')) || [];
      if (Array.isArray(data)) {
        setCart(data);
      } else {
        setCart([]);
      }
    };
    updateCartFromLocalStorage();
    window.addEventListener("storage", updateCartFromLocalStorage);
    return () => {
      window.removeEventListener("storage", updateCartFromLocalStorage);
    };
  }, []);
   
  useEffect(() => {
        console.log("Cart state:", cart);
  }, [cart]);

    const fetchProductQuantity = async (_id) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/IndvidualProduct/${_id}`);
        return res.data.product.quantity;
      } catch (err) {
        console.error("Error fetching product:", err);
        return null;
      }
    };

    const updateProductQuantity = async (_id, newQuantity) => {
      try {
        const res = await axios.put(`http://localhost:5000/api/admin/UpdateProduct/${_id}`, {
          quantity: newQuantity
        }, { withCredentials: true });
        return res.data;
      } catch (err) {
        console.error("Error updating product:", err);
      }
    };

      const Add = async ({ _id, name, url, type, price, description }) => {
      try {
        const currentQuantity = await fetchProductQuantity(_id);

        if (currentQuantity > 0) {
          const existingItem = cart.find(item => item.name === name);
          let updatedCart;

          if (!existingItem) {
            updatedCart = [...cart, { _id, name, url, type, price, description, quantity: 1 }];
          } else {
            updatedCart = cart.map(item =>
              item.name === name ? { ...item, quantity: item.quantity + 1 } : item
            );
          }
          setCart(updatedCart);
          localStorage.setItem('Parentcart', JSON.stringify(updatedCart));
          await updateProductQuantity(_id, currentQuantity - 1);
        } else {
          toast.error("Item Out Of Stock");
        }
      } catch (error) {
        console.log("Error in Add function:", error);
      }
    };

      const remove = async ({ _id, name }) => {
      try {
        const currentItem = cart.find(item => item.name === name);
        if (!currentItem) return;
        const backendQuantity = await fetchProductQuantity(_id);
        const currentQuantity = currentItem.quantity;
        let updatedCart;

        if (currentQuantity > 1) {
          updatedCart = cart.map(item =>
            item.name === name ? { ...item, quantity: item.quantity - 1 } : item
          );
        } else {
          updatedCart = cart.filter(item => item.name !== name);
        }

        setCart(updatedCart);
        localStorage.setItem('Parentcart', JSON.stringify(updatedCart));

        await updateProductQuantity(_id, backendQuantity + 1); 
      } catch (error) {
        console.log("Error in remove function:", error);
      }
    };

  const filteredItems=product.filter(item=>item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div>
      <div className='items-center justify-content-center mt-10'>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Explore Our Products</h1>

        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search for a product..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
       </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-20 my-10 ">
        {filteredItems.length >0 ? 
        <>
          {filteredItems.map((items, index) => (
              <div key={index} className="bg-green-100 rounded-2xl shadow-md hover:shadow-2xl transform  transition-all duration-300 cursor-pointer">
                <ProductModal id={items._id}name={items.name} image={items.url} type={items.type} price={items.price} description={items.description} quantity={items.quantity}/>
                <div className="p-4">
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-green-700 font-semibold ml-2">Rs. {items.price}</p>
                    <div className="flex items-center border rounded-lg px-2 py-1 shadow-sm">
                        <button className="text-xl text-black px-2 py-1 cursor-pointer" onClick={()=>remove(items)}>-</button>
                      <p>{cart.find(c => c.name === items.name)?.quantity || 0}</p>
                        <button  className="text-xl text-black px-2 py-1 cursor-pointer" onClick={()=>Add(items)}>+</button>
                      </div>
                  
                  </div>
                </div>
              </div>
          ))}
        </>
        :
        <div className='items-center justify-content-center'>
         <p className=' text-center text-2xl font-bold text-green-600'>No Product Found!</p>
        </div>
        }
    </div>
</div>

  )
}
