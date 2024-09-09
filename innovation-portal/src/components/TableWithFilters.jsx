import React, { useState } from 'react';
import FilterModal from './FilterModal';

const TableWithFilters = ({ type, data, headers }) => {
  const [search, setSearch] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: prev[filterName]?.has(value)
        ? new Set([...prev[filterName]].filter(item => item !== value))
        : new Set([...(prev[filterName] || []), value])
    }));
  };

  const filteredData = data.filter(item => {
    const matchesSearch = Object.values(item).some(value => 
      String(value).toLowerCase().includes(search.toLowerCase())
    );
    const matchesFilters = Object.entries(selectedFilters).every(([key, values]) => 
      values.size === 0 || values.has(String(item[key]))
    );
    return matchesSearch && matchesFilters;
  });

  const uniqueValues = (key) => [...new Set(data.map(item => String(item[key])))];

  return (
    <div className="p-4 max-w-screen overflow-auto">
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 mr-2"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Filter
        </button>
      </div>

      <FilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-4">
          <h2 className="text-lg font-bold mb-4">Filters</h2>
          {headers.map(header => (
            <div key={header}>
              <h3 className="text-md font-semibold mb-2">{header}</h3>
              {uniqueValues(header).map((value) => (
                <label key={value} className="block">
                  <input
                    type="checkbox"
                    checked={selectedFilters[header]?.has(value)}
                    onChange={() => handleFilterChange(header, value)}
                    className="mr-2"
                  />
                  {value}
                </label>
              ))}
            </div>
          ))}
        </div>
      </FilterModal>

      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 mt-4">
        <thead className="bg-gray-100">
          <tr>
            {headers.map(header => (
              <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                {headers.map(header => (
                  <td key={header} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Array.isArray(item[header]) 
                      ? item[header].map((tag, idx) => (
                          <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))
                      : item[header]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-6 py-4 text-center text-sm text-gray-500">No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithFilters;