import React from 'react'

export default function Card() {

  return (
    <div className='font-poppins p-4 text-black bg-white border border-gray-300 rounded-lg  h-[10rem] flex flex-col items-start justify-between w-1/4'>
        <h2 className='font-medium text-left'>
           Total Projects
        </h2>
        <div>
            <p className='text-4xl font-medium '>
                65
            </p>
            <p className='text-gray-500'>
                +10% from last month
            </p>
        </div>
    </div>
  )
}
