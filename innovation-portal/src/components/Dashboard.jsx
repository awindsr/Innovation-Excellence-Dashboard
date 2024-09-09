import React from 'react'
import Navbar from './Navbar'
import Tabs from './Tabs'

export default function Dashboard() {
  return (
    <div className='bg-white w-screen h-screen flex flex-col p-4'>
        <Navbar/>
        <Tabs/>
    </div>
  )
}
