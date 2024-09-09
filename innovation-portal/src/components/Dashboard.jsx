import React from 'react';
import Navbar from './Navbar';
import Tabs from './Tabs';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';

export default function Dashboard() {
  useSupabaseAuth(); // Use the custom hook to handle auth state

  return (
    <div className='bg-white w-screen h-screen flex flex-col p-4'>
      <Navbar />
      <Tabs />
    </div>
  );
}