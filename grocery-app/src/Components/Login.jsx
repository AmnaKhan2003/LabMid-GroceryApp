import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const adminMail = "admin@gmail.com";
  const adminPassword = "12345";
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid Email Format.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/User/login", {
        email,
        password,
      }, {
        withCredentials: true,
      });
      const { token, message } = response.data;
      if (token) {
        localStorage.setItem("token", token);
      }

      if (response.data.success) {
        const Data=localStorage.getItem("token");
        const TokenData=jwtDecode(Data);
        const role =TokenData.role;
        if(role ==="admin"){
          navigate("/products");
          toast.success("Login successful!");
          localStorage.setItem('email',email);
          window.dispatchEvent(new Event('userLoggedIn'));
        }
        else{
          navigate("/productList",{state: {email}})
          toast.success("Login successful!");
          localStorage.setItem('email',email); 
          window.dispatchEvent(new Event('userLoggedIn'));
        } 
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row ">

      <div className="w-full md:w-1/2 flex pt-30 justify-center p-8 bg-green-100">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-green-700 mb-8 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="relative">
              <input
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={showPassword ? '/view.png' : '/hidden.png'}
                alt="toggle visibility"
                className="w-5 h-5 absolute top-3.5 right-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
          </div>
            <button
              type="submit"
              className="w-full cursor-pointer  bg-green-700 text-white py-3 rounded font-semibold hover:opacity-80"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-green-600 p-4">
        <img
          src="./login.jpg"
          alt="Login Visual"
          className="w-full max-w-md rounded-xl shadow-xl object-cover"
        />
      </div>
    </div>
  );
}

export default Login;
