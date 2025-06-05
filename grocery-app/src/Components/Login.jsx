import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const adminMail = "admin@gmail.com";
  const adminPassword = "12345";

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      if (email !== adminMail) {
        alert('Please enter correct email');
        return;
      } else if (password !== adminPassword) {
        alert('Please enter correct password');
        return;
      }
      alert('Congratulations! Login Successful');
      navigate('/products');
    } else {
      alert('Please fill all fields');
    }
  }

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
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full  bg-green-700 text-white py-3 rounded font-semibold hover:opacity-80"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Right: Image */}
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
