import React, { useState } from 'react';
import Overview from './Overview';
import Projects from './Projects';
import Publications from './Publications';
import Patents from './Patents';
import Grants from './Grants';
import Competitions from './Competitions';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { name: 'overview', label: 'Overview' },
    { name: 'projects', label: 'Projects' },
    { name: 'publications', label: 'Publications' },
    { name: 'grants', label: 'Grants' },
    { name: 'patents', label: 'Patents' },
    { name: 'competitions', label: 'Competitions' },
  ];

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='inline-flex mt-3 bg-[#f4f4f5] p-1 font-poppins rounded-lg gap-2 sm:gap-5 px-2 sm:px-3 text-[.7rem] sm:text-[.8rem] whitespace-nowrap'>
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`px-2 sm:px-4 py-2 ${
                activeTab === tab.name
                  ? 'bg-white text-black rounded-lg font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabClick(tab.name)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className='mt-4'>
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'publications' && <Publications />}
        {activeTab === 'patents' && <Patents />}
        {activeTab === 'grants' && <Grants />}
        {activeTab === 'competitions' && <Competitions />}
      </div>
    </div>
  );
};

export default Tabs;