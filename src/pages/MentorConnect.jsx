import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Navbar from '../components/Navbar';

const MentorConnect = () => {
  return (
    <div>
      <Navbar/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Connect with Mentors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
    </div>
  );
};

const MentorCard = ({ mentor }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      
      {/* <img 
        src={mentor.photo} 
        alt={mentor.name} 
        className="w-full h-48 object-cover object-center"
      /> */}
      <FontAwesomeIcon icon={faUser} className="w-full h-48 object-cover object-center"/>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{mentor.name}</h2>
        <p className="text-gray-600 mb-4">{mentor.department}</p>
        <button 
          onClick={() => window.location.href = `mailto:${mentor.email}`}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          Contact
        </button>
      </div>
    </div>
  );
};

// Dummy mentor data
const mentors = [
  {
    id: 1,
    name: "Dr. Emily Chen",
    department: "Computer Science",
    email: "emily.chen@university.edu",
    photo: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    name: "Prof. Michael Johnson",
    department: "Electrical Engineering",
    email: "michael.johnson@university.edu",
    photo: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    name: "Dr. Sarah Thompson",
    department: "Mechanical Engineering",
    email: "sarah.thompson@university.edu",
    photo: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: 4,
    name: "Prof. David Lee",
    department: "Data Science",
    email: "david.lee@university.edu",
    photo: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    id: 5,
    name: "Dr. Rachel Garcia",
    department: "Artificial Intelligence",
    email: "rachel.garcia@university.edu",
    photo: "https://randomuser.me/api/portraits/women/5.jpg"
  },
  {
    id: 6,
    name: "Prof. James Wilson",
    department: "Robotics",
    email: "james.wilson@university.edu",
    photo: "https://randomuser.me/api/portraits/men/6.jpg"
  },
  {
    id: 7,
    name: "Dr. Lisa Brown",
    department: "Cybersecurity",
    email: "lisa.brown@university.edu",
    photo: "https://randomuser.me/api/portraits/women/7.jpg"
  },
  {
    id: 8,
    name: "Prof. Robert Taylor",
    department: "Software Engineering",
    email: "robert.taylor@university.edu",
    photo: "https://randomuser.me/api/portraits/men/8.jpg"
  },
  {
    id: 9,
    name: "Dr. Jennifer Martinez",
    department: "Bioinformatics",
    email: "jennifer.martinez@university.edu",
    photo: "https://randomuser.me/api/portraits/women/9.jpg"
  }
];

export default MentorConnect;
