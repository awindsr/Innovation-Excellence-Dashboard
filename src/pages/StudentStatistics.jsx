import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseclient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faBook,
  faCertificate,
  faHandHoldingUsd,
  faTrophy,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";

const StudentStatistics = () => {
  const user = useSelector((state) => state.user.user);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const [roleChecked, setRoleChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserRole = async () => {
      try {
        if (user?.id) {
          const { data, error } = await supabase
            .from("users")
            .select("role")
            .eq("id", user.id)
            .single();

          if (error) {
            console.error("Error fetching role:", error);
            setRole(null);
          } else if (data) {
            console.log("Role fetched:", data.role);
            setRole(data.role);
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        setRole(null);
      } finally {
        setRoleChecked(true);
      }
    };

    if (user?.id) {
      getUserRole();
    } else {
      setRoleChecked(true);
    }
  }, [user]);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (role !== 'faculty') return;

      try {
        setLoading(true);
        const { data: studentsData, error: studentsError } = await supabase
          .from('users')
          .select('*')
          .eq('role', 'student');

        if (studentsError) throw studentsError;

        const studentsWithSubmissions = await Promise.all(
          studentsData.map(async (student) => {
            const [projects, publications, patents, grants, competitions] = await Promise.all([
              fetchSubmissions('projects', student.id),
              fetchSubmissions('publications', student.id),
              fetchSubmissions('patents', student.id),
              fetchSubmissions('grants', student.id),
              fetchSubmissions('competitions', student.id),
            ]);

            return {
              ...student,
              projects,
              publications,
              patents,
              grants,
              competitions,
            };
          })
        );

        setStudents(studentsWithSubmissions);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Failed to fetch student data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [role]);

  const fetchSubmissions = async (table, userId) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('done_by', userId);

    if (error) throw error;
    return data;
  };

  if(!user || role === 'student'){
    navigate("/unauthorized");
  }
  console.log("Current user:", user);
  console.log("Current role:", role);
  console.log("Role checked:", roleChecked);

  if (!roleChecked) {
    return <div className="flex justify-center items-center h-screen">Checking permissions...</div>;
  }

  // if (!user || role !== "faculty") {
  //   console.log("Redirecting to unauthorized");
  //   return <Navigate to="/unauthorized" replace />;
  // }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading student statistics...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Student Statistics
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-gray-800 text-white p-4">
                <h2 className="text-xl font-semibold">{student.name}</h2>
                <p className="text-sm">{student.department}</p>
              </div>
              <div className="p-4">
                <StatItem
                  icon={faProjectDiagram}
                  label="Projects"
                  items={student.projects}
                />
                <StatItem
                  icon={faBook}
                  label="Publications"
                  items={student.publications}
                />
                <StatItem
                  icon={faCertificate}
                  label="Patents"
                  items={student.patents}
                />
                <StatItem
                  icon={faHandHoldingUsd}
                  label="Grants"
                  items={student.grants}
                />
                <StatItem
                  icon={faTrophy}
                  label="Competitions"
                  items={student.competitions}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ icon, label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(items);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div
        className="flex items-center justify-between py-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center">
          <FontAwesomeIcon icon={icon} className="text-gray-600 mr-2" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-semibold mr-2">{items.length}</span>
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            className="text-gray-600"
          />
        </div>
      </div>
      {isOpen && (
        <div className="pl-8 pb-2">
          {items.length > 0 ? (
            <ul className="list-none list-inside">
              {items.map((item, index) => (
                <li key={index} className="text-sm text-gray-600">
                  <div className="flex items-start gap-2 justify-start">
                    {item.title}{" "}
                    {item.link ? (
                      <FontAwesomeIcon icon={faLink} className="text-black" />
                    ) : (
                      ""
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No {label.toLowerCase()} to display.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentStatistics;
