import React from 'react'

export default function Card({ title, value, change }) {
  return (
    <div className='font-poppins p-4 text-black bg-white border border-gray-300 rounded-lg flex flex-col items-start justify-between w-full md:w-1/4 h-[10rem] mb-4 sm:mb-0'>
      <h2 className='font-medium text-left text-sm sm:text-base'>
        {title}
      </h2>
      <div>
        <p className='text-2xl sm:text-3xl lg:text-4xl font-medium'>
          {value}
        </p>
        <p className='text-green-700 text-xs sm:text-sm'>
          {change}
        </p>
      </div>
    </div>
  )
}