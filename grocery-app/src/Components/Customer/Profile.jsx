import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        const StoredEmail =localStorage.getItem('email');
        if (!email) return;
        try {
          const userData = await axios.get(`http://localhost:5000/api/User/indvidual/${email}`);
          console.log(userData.data);
          
          setName(userData.data.user.name || '');
          
          setPhone(userData.data.user.phone || '');
          setAddress(userData.data.user.address || '');
          console.log("member data");
          console.log(phone);
          console.log(address);
        } catch (err) {
          
          console.error("Error fetching user data:", err);
        }
      };
      fetchData();
    }, []);
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const userData = await axios.put(`http://localhost:5000/api/User/editMember/${email}`,{
        name, 
        email,
        password, 
        address,
        phone
      },{
        withCredentials : true
      });
      if (userData){
        toast.success("Profile Updated Successfully ! ");

      }
        setName(name);
        setPassword(password || '');
        setAddress(address),
        setPhone(phone);
       
      
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  return (
    <div className="bg-green-100 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border text-gray-500 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            disabled
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
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
          <p className='text-gray-500 text-sm'>Enter New Passowrd If You Want To Change !</p>

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <textarea
            placeholder="Address"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 cursor-pointer rounded font-semibold hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
