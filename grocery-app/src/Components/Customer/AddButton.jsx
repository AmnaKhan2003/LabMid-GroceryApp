import React from 'react'

export default function AddButton({quantity}) {
    
  return (
    <div className='flex items-center'>
     
        <img src='https://cdn-icons-png.flaticon.com/128/9146/9146915.png' className='w-5 h-5 mr-1 hover:bg-gray-300 rounded-md'/>
      <p>0</p>
         <img src='https://cdn-icons-png.flaticon.com/128/3018/3018447.png' className='w-5 h-5 ml-1 hover:bg-gray-300 rounded-md'/>
    </div>
  )
}
