import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        if (name && email && password) {
            alert('congratulations!!! Login Successfully');
            navigate('/products')
          } else {
            alert('Please fill all fields');
          }
    }
  return (
    <div className="p-6 max-w-md mx-auto"> 
        <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full p-2 border rounded" type="text" placeholder='Enter Your Name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <input className="w-full p-2 border rounded" type="email" placeholder='Enter Your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <input className="w-full p-2 border rounded" type="password" placeholder='Enter Your Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button className="w-full bg-blue-500 text-white py-2 rounded bg-gradient-to-r from-green-500 to-green-400 text-gray-700" type='submit'>Login</button>

        </form>


    </div>
  )
}

export default Login
