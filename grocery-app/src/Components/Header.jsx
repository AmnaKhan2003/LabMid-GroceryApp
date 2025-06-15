import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartState, setCartState] = useState(false);
  const [ToggleHeader, setToggleHeader] = useState(false);
  const [decodeRole, setDecodeRole] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [userName,setUserName]=useState();
  const [email, setEmail] = useState(localStorage.getItem('email') || '');

  const HandleCart = () => {
    setCartState(false);
    navigate('/productList');
  };

  const HandleMainPage = () => {
    setCartState(true);
    navigate('/', { state: { cartState } });
  };

  const handleLogout = async () => {
    localStorage.removeItem('token');
    await axios.post("http://localhost:5000/api/admin/logout", {}, { withCredentials: true });
    toast.success("Logged out successfully.");
    setToggleHeader(false);
    navigate("/");
  };

  useEffect(() => {
    try {
    
      const data = localStorage.getItem('token');
      if (data) {
        const decoded = jwtDecode(data);
        setDecodeRole(decoded.role);
        setToggleHeader(true);
      }
    } catch (error) {
      console.log("Error decoding token", error);
    }
  }, [location]);

  useEffect(() => {
    const checkSession = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
        const response = await axios.get("http://localhost:5000/api/User/check-session", {
            withCredentials: true,
        });

        if (!response.data.loggedIn) throw new Error("Session expired");
        } catch (err) {
        localStorage.removeItem("token");
        toast.error("Please login First.");
        navigate("/");
        }
    };

    checkSession();
    const interval = setInterval(() => {
        console.log("Checking session..."); 
        checkSession();
    }, 60000);

    return () => clearInterval(interval);
    }, []);
    useEffect(() => {
      const fetchData = async () => {
        const StoredEmail =localStorage.getItem('email');
        if (!email) return;
        try {
          const userData = await axios.get(`http://localhost:5000/api/User/indvidual/${StoredEmail}`);
          console.log(userData.data);
          setUserName(userData.data.user.name);
          setEmail(StoredEmail);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      };
      fetchData();
    }, [location]);


  return (
    <div className="bg-green-700 max-w-10xl px-4 sm:px-6 p-2">
      <div className='flex items-center justify-between'>
        <div className='flex items-center ml-5' onClick={HandleMainPage}>
          <button className='cursor-pointer bg-green-700 rounded-lg'>
            <img src="https://cdn-icons-gif.flaticon.com/15547/15547182.gif" className="size-12 mt-2 rounded-2xl" alt="Home" />
          </button>
          <button className='cursor-pointer'>
            <p className='ml-5 mt-3 text-2xl text-white font-bold'>Greeno Store</p>
          </button>
        </div>

        {!ToggleHeader ? (
          <div className='flex items-center'>
            <button className='text-lg mr-2 cursor-pointer text-white hover:bg-green-800 rounded-lg px-2 py-1 transition duration-300' onClick={() => navigate('/Login')}>Login</button>
            <button className='text-lg mr-5 cursor-pointer text-white hover:bg-green-800 rounded-lg px-2 py-1 transition duration-300' onClick={() => navigate('/signup')}>SignUp</button>
          </div>
        ) : (
          <div className="flex items-center space-x-4 mr-5">
            {decodeRole !== "admin" ? (
             <div 
                className='relative inline-block' 
                onMouseEnter={() => setOpen(true)} 
                onMouseLeave={() => setOpen(false)}
                >
                <button className='cursor-pointer'>
                    <div className='flex items-center'>
                        <img src="/user.png" alt="User" className="w-12 h-12 rounded-full shadow-md object-cover cursor-pointer" />
                    </div>
                </button>
                <div className={`absolute right-0  w-60 bg-white border border-gray-200 rounded-xl shadow-xl z-50 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`} >
                    <div className='ml-2 mt-2 mb-2 flex justify-content-center items-center'>
                        <img src="/user.png" alt="User" className="w-12 h-12 rounded-full shadow-md object-cover" />
                        <p className='ml-3'>{userName}</p>
                    </div>
                    <hr className='border-t border-green-200'/>
                    <div className='flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-green-100' onClick={()=>navigate(`/profile/${email}`)}>
                        
                        <p className="cursor-pointer px-6 py-4 hover:bg-green-100" >  {userName}</p>
                        <img src="/user.png" className="w-8 h-8 rounded-full object-cover"/>

                    </div>
                    <hr className='border-t border-green-200'/>
                    <div className='flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-green-100' onClick={HandleCart}>
                        <p className="cursor-pointer px-6 py-4 hover:bg-green-100" >
                        Explore Products
                        </p>
                        <img src="./list.png" className="w-8 h-8 rounded-full object-cover"/>

                    </div>
                     <hr className='border-t border-green-200'/>
                    <div className='flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-green-100' onClick={()=>navigate('/checkout')}>
                        <p className="cursor-pointer px-6 py-4 hover:bg-green-100" >
                         Summary
                        </p>
                        <img src="./icon1.png" className="w-8 h-8 rounded-full object-cover"/>

                    </div>
                    <hr className='border-t border-green-200'/>
                    <div className='flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-green-100' onClick={handleLogout}>
                        <p className="cursor-pointer px-6 py-4 hover:bg-green-100"  onClick={handleLogout} >
                        Logout
                        </p>
                        <img src="https://cdn-icons-png.flaticon.com/128/9367/9367790.png" className="w-8 h-8 rounded-full object-cover"/>
                    </div>
                </div>
                </div>

            ) : (
              <button 
                className="text-white bg-green-900 text-lg cursor-pointer font-medium hover:bg-green-600 rounded-md px-4 py-2 transition duration-300 ease-in-out"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
