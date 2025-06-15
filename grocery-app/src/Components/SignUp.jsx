import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
export default function SignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone,setPhone]=useState('');
    const [address,setAddress]=useState('');
    const navigate=useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = async (e) => {
       e.preventDefault(); 
        try {
          const response = await axios.post(
            "http://localhost:5000/api/User/signup",
            { name, email, password ,phone,address},
            { withCredentials: true }
          );
           const { token, message } = response.data;
           console.log("fetching token")
           console.log(token);
                if (token) {
                  localStorage.setItem("token", token);
                }
                if (response.data.success) {
                  console.log("i am here");
                  const Data=localStorage.getItem("token");
                  const TokenData=jwtDecode(Data);
                  const role =TokenData.role;
                  console.log(role);
                  localStorage.setItem('email',email);
                  if(role ==="admin"){
                    navigate("/products");
                    toast.success("Admin");
                    window.dispatchEvent(new Event('userLoggedIn'));
                  }
                  else{
                    navigate("/productList", {state:{email}})
                    toast.success(`${response.data.newuser.name} successfully registered`);
                    window.dispatchEvent(new Event('userLoggedIn'));
                  } 
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

        <div className='w-full md:w-1/2 bg-green-100 flex pt-7  justify-center'>
            <div className='w-full max-w-md text-left'>
                <h1 className='text-4xl  font-bold text-green-700 mb-8 text-center'>SignUp</h1>
                <div className=''>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className='flex justify-content-center items-center'>
                    <input
                        type="name"
                        placeholder="Enter your Name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="tel"
                      placeholder="11 Digit Phone Number"
                      value={phone}
                      required
                      pattern="\d{11}"
                      onChange={(e)=>setPhone(e.target.value)}
                      className="ml-4 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"

                    />
                    </div>
                     <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
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
                     <div className="relative">
                      <div>
                        <input
                            type= {showPassword ? 'text':'password'}
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
                            <p className='text-gray-500'>"- 8 Character Long"</p>

                        </div>
                      <img
                        src={showPassword ? '/view.png' : '/hidden.png'}
                        alt="toggle visibility"
                        className="w-5 h-5 absolute top-3.5 right-4 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
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
