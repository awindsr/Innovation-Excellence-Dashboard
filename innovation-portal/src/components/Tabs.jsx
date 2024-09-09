import React, { useState } from 'react';
import Overview from './Overview';
import Projects from './Projects';
import Publications from './Publications';
import Patents from './Patents';
import Grants from './Grants';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('overview'); // Default active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className='inline-flex mt-3 bg-[#f4f4f5] p-1 font-poppins rounded-lg gap-5 px-3 text-[.8rem]'>
        <button
          className={` px-4 py-2  ${activeTab === 'overview' ? 'bg-white text-black  rounded-lg ' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => handleTabClick('overview')}
        >
          Overview
        </button>
        <button
          className={` px-4 py-2 ${activeTab === 'projects' ? 'bg-white text-black  rounded-lg font-medium' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => handleTabClick('projects')}
        >
          Projects
        </button>
        <button
          className={` px-4 py-2  ${activeTab === 'publications' ? 'bg-white text-black  rounded-lg font-medium' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => handleTabClick('publications')}
        >
          Publications
        </button>
        <button
          className={` px-4 py-2  ${activeTab === 'grants' ? 'bg-white text-black  rounded-lg font-medium' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => handleTabClick('grants')}
        >
          Grants
        </button>
        <button
          className={` px-4 py-2  ${activeTab === 'patents' ? 'bg-white text-black  rounded-lg font-medium' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => handleTabClick('patents')}
        >
          Patents
        </button>
      </div>
      
      <div className='mt-4'>
      {activeTab === 'overview' && <Overview/>}
        {activeTab === 'projects' && <Projects/>}
        {activeTab === 'publications' && <Publications/>}
        {activeTab === 'patents' && <Patents/>}
        {activeTab === 'grants' && <Grants/>}
      </div>
    </div>
  );
};

export default Tabs;
