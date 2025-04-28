import React, { useState } from 'react'

export default function Feedback() {
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[description,setDescription]=useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (name && email && description) {
            alert(`${name} Your Feedback Submitted Successfully`);
            setName('');
            setEmail('');
            setDescription('');
        } else {
            alert(`${name} Please Fill All Fields!`);
        }
    }
  return (
    <div className="p-6 max-w-md mx-auto"> 
    <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">Happy Shopping !!!!!</h1>

    <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">Feedback</h2>
    <form  className="space-y-3" onSubmit={handleSubmit}>
    <input className="w-full p-2 border rounded" type="text" placeholder='Enter Your Name' value={name} onChange={(e)=>setName(e.target.value)}/>
    <input className="w-full p-2 border rounded" type="email" placeholder='Enter Your Email'  value={email} onChange={(e)=>setEmail(e.target.value)} />
    <input className="w-full h-20 p-2 border rounded" type="text-box" placeholder='Write Your Feedback' value={description} onChange={(e)=>setDescription(e.target.value)}/>
    <button className="w-full bg-blue-500 text-white py-2 rounded bg-gradient-to-r from-green-500 to-green-400 text-gray-700" type='submit'>Submit Feedback</button>

    </form>
</div>
  )
}
