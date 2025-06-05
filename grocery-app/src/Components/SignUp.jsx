import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
export default function SignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
       e.preventDefault(); 
        try {
          const response = await axios.post(
            "http://localhost:5000/api/User/signup",
            { name, email, password },
            { withCredentials: true }
          );
          console.log(response.data);
          navigate('/products')
         if (response.data && response.data.newuser) {
              toast.success(`${response.data.newuser.name} successfully registered`);
            }
          
        } catch (error) {
          if (error.response) {
            console.error("Response error:", error.response.data);
            const msg = error.response.data.message;
            if (Array.isArray(msg)) {
              toast.error(msg.join('\n'));  
            } else {
              toast.error(msg || "Registration failed");
            }
          }
        }
      };

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>

        <div className='w-full md:w-1/2 bg-green-100 flex pt-30  justify-center'>
            <div className='w-full max-w-md text-left'>
                <h1 className='text-4xl  font-bold text-green-700 mb-8 text-center'>SignUp</h1>
                <div className=''>
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="name"
                        placeholder="Enter your Name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div>
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <br />
                    <p className='text-gray-500'> "Password must include:",</p>
                   <p className='text-gray-500'>"- Uppercase letter",</p>
                   <p className='text-gray-500'>"- Lowercase letter"</p> 
                    <p className='text-gray-500'>"- Number",</p>
                    <p className='text-gray-500'>"- Special character"</p>
                    </div>
                    <button
                    type="submit"
                    className="w-full cursor-pointer bg-green-700 text-white py-3 rounded font-semibold hover:opacity-80"
                    >
                    Register
                    </button>
                    </form>
                </div>
                
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
  )
}
