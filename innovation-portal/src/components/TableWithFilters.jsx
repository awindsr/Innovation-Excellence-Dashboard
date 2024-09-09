import React, { useState } from 'react';
import FilterModal from './FilterModal';


const dummyData = [
  {
    title: 'Project A',
    status: 'In Progress',
    doneBy: 'John Doe',
    department: 'Engineering',
    faculty: 'Science',
    tags: ['urgent', 'high-priority'],
  },
  {
    title: 'Task B',
    status: 'Completed',
    doneBy: 'Jane Smith',
    department: 'Marketing',
    faculty: 'Business',
    tags: ['campaign', 'social-media'],
  },
  {
    title: 'Research C',
    status: 'Pending',
    doneBy: 'Alice Johnson',
    department: 'Research',
    faculty: 'Arts',
    tags: ['long-term', 'collaborative'],
  },
  {
    title: 'Report D',
    status: 'In Review',
    doneBy: 'Bob Williams',
    department: 'Finance',
    faculty: 'Economics',
    tags: ['quarterly', 'financial'],
  },
  {
    title: 'Event E',
    status: 'Planned',
    doneBy: 'Carol Brown',
    department: 'Events',
    faculty: 'Student Affairs',
    tags: ['annual', 'campus-wide'],
  },
];

const TableWithFilters = () => {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(new Set());
  const [selectedDepartment, setSelectedDepartment] = useState(new Set());
  const [selectedFaculty, setSelectedFaculty] = useState(new Set());
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = (status) => {
    setSelectedStatus(prev =>
      prev.has(status) ? new Set([...prev].filter(item => item !== status)) : new Set(prev).add(status)
    );
  };

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(prev =>
      prev.has(department) ? new Set([...prev].filter(item => item !== department)) : new Set(prev).add(department)
    );
  };

  const handleFacultyChange = (faculty) => {
    setSelectedFaculty(prev =>
      prev.has(faculty) ? new Set([...prev].filter(item => item !== faculty)) : new Set(prev).add(faculty)
    );
  };

  const handleTagChange = (tag) => {
    setSelectedTags(prev =>
      prev.has(tag) ? new Set([...prev].filter(item => item !== tag)) : new Set(prev).add(tag)
    );
  };

  const filteredData = dummyData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus.size ? selectedStatus.has(item.status) : true;
    const matchesDepartment = selectedDepartment.size ? selectedDepartment.has(item.department) : true;
    const matchesFaculty = selectedFaculty.size ? selectedFaculty.has(item.faculty) : true;
    const matchesTags = selectedTags.size ? item.tags.some(tag => selectedTags.has(tag)) : true;

    return matchesSearch && matchesStatus && matchesDepartment && matchesFaculty && matchesTags;
  });

  const uniqueValues = (key) => [...new Set(dummyData.map(item => item[key]))];

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by title..."
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
          <div>
            <h3 className="text-md font-semibold mb-2">Status</h3>
            {uniqueValues('status').map((status) => (
              <label key={status} className="block">
                <input
                  type="checkbox"
                  checked={selectedStatus.has(status)}
                  onChange={() => handleStatusChange(status)}
                  className="mr-2"
                />
                {status}
              </label>
            ))}
          </div>
          <div>
            <h3 className="text-md font-semibold mb-2">Department</h3>
            {uniqueValues('department').map((department) => (
              <label key={department} className="block">
                <input
                  type="checkbox"
                  checked={selectedDepartment.has(department)}
                  onChange={() => handleDepartmentChange(department)}
                  className="mr-2"
                />
                {department}
              </label>
            ))}
          </div>
          <div>
            <h3 className="text-md font-semibold mb-2">Faculty</h3>
            {uniqueValues('faculty').map((faculty) => (
              <label key={faculty} className="block">
                <input
                  type="checkbox"
                  checked={selectedFaculty.has(faculty)}
                  onChange={() => handleFacultyChange(faculty)}
                  className="mr-2"
                />
                {faculty}
              </label>
            ))}
          </div>
          <div>
            <h3 className="text-md font-semibold mb-2">Tags</h3>
            {uniqueValues('tags').map((tag) => (
              <label key={tag} className="block">
                <input
                  type="checkbox"
                  checked={selectedTags.has(tag)}
                  onChange={() => handleTagChange(tag)}
                  className="mr-2"
                />
                {tag}
              </label>
            ))}
          </div>
        </div>
      </FilterModal>

      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Done By</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.doneBy}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.faculty}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithFilters;
