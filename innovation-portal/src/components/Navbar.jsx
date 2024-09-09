import React from 'react'

export default function Navbar() {
  return (
    <div className='flex flex-row justify-between  text-black font-poppins'>
        <h1 className='text-2xl font-medium'>Innovation Excellence Dashboard</h1>
        <div>
            <button className='bg-black text-white px-3 py-2 rounded-lg'>
                Login
            </button>
        </div>
    </div>
  )
}
