import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseclient";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const AddProject = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [projectType, setProjectType] = useState("projects");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [isTeamWork, setIsTeamWork] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [tags, setTags] = useState([]);
  const [link, setLink] = useState("");
 

  // Additional fields for specific project types
  const [fundingSource, setFundingSource] = useState("");
  const [duration, setDuration] = useState("");
  const [journalConference, setJournalConference] = useState("");
  const [doi, setDoi] = useState("");
  const [patentNumber, setPatentNumber] = useState("");
  const [filingDate, setFilingDate] = useState("");
  const [grantingAgency, setGrantingAgency] = useState("");
  const [amount, setAmount] = useState("");
  const [competitionName, setCompetitionName] = useState("");
  const [rankPosition, setRankPosition] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commonData = {
      title,
      description,
      department,
      date,
      is_team_work: isTeamWork,
      team_members: isTeamWork ? teamMembers : null,
      done_by: user.id,
    };

    let tableData = {};
    let tableName = "";

    switch (projectType) {
      case "projects":
        tableData = {
          ...commonData,
          funding_source: fundingSource,
          duration,
          status: "In Progress", // You might want to adjust this based on your workflow
        };
        tableName = "projects";
        break;
      case "publications":
        tableData = {
          ...commonData,
          journal: journalConference,
          doi,
          type: "Journal", // You might want to make this selectable in the form
          authors: isTeamWork
            ? teamMembers.map((member) => member.name)
            : [user.name],
        };
        tableName = "publications";
        break;
      case "patents":
        tableData = {
          ...commonData,
          patent_number: patentNumber,
          filing_date: filingDate,
          status: "In Progress", // You might want to adjust this based on your workflow
          inventors: isTeamWork
            ? teamMembers.map((member) => member.name)
            : [user.name],
        };
        tableName = "patents";
        break;
      case "grants":
        tableData = {
          ...commonData,
          granting_agency: grantingAgency,
          amount: parseFloat(amount),
          date: date, // Assuming the date field is used as start_date for grants
          status: "Active", // You might want to adjust this based on your workflow
         done_by: user.id,
        };
        tableName = "grants";
        break;
      case "competitions":
        tableData = {
          ...commonData, 
          title: competitionName,
          rank_achieved: rankPosition,
          participants: isTeamWork
            ? teamMembers.map((member) => member.name)
            : [user.name],
          status: "In Progress", // You might want to adjust this based on your workflow
        };
        tableName = "competitions";
        break;
      default:
        console.error("Invalid project type");
        return;
    }

    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert([tableData]);

      if (error) throw error;

      console.log("Data inserted successfully:", data);
      navigate("/"); // Redirect to home page or project list
    } catch (error) {
      console.error("Error inserting data:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const addTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
      { name: "", email: "", department: "", year: "" },
    ]);
  };

  const updateTeamMember = (index, field, value) => {
    const updatedMembers = teamMembers.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    setTeamMembers(updatedMembers);
  };

  const removeTeamMember = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Project</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black">
              <option value="projects">Projects</option>
              <option value="publications">Publications</option>
              <option value="patents">Patents</option>
              <option value="grants">Grants</option>
              <option value="competitions">Competitions</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              rows="3"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <input
              type="text"
              value={tags.join(", ")}
              onChange={(e) => setTags(e.target.value.split(",").map((tag) => tag.trim()))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              placeholder="Enter tags separated by commas"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Is this a team work?</label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-black"
                  name="isTeamWork"
                  value="false"
                  checked={!isTeamWork}
                  onChange={() => setIsTeamWork(false)}
                />
                <span className="ml-2">Solo Work</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-black"
                  name="isTeamWork"
                  value="true"
                  checked={isTeamWork}
                  onChange={() => setIsTeamWork(true)}
                />
                <span className="ml-2">Team Work</span>
              </label>
            </div>
          </div>

          {isTeamWork && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
              {teamMembers.map((member, index) => (
                <div key={index} className="mb-4 p-4 border rounded-md bg-white">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) => updateTeamMember(index, "email", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        value={member.department}
                        onChange={(e) => updateTeamMember(index, "department", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <input
                        type="number"
                        value={member.year}
                        onChange={(e) => updateTeamMember(index, "year", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="mt-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    <FontAwesomeIcon icon={faTimes} /> Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addTeamMember}
                className="mt-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
              >
                <FontAwesomeIcon icon={faPlus} /> Add Team Member
              </button>
            </div>
          )}

          {/* Dynamic fields based on project type */}
          {projectType === "projects" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Funding Source</label>
                <input
                  type="text"
                  value={fundingSource}
                  onChange={(e) => setFundingSource(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </>
          )}
          {projectType === "publications" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Journal/Conference</label>
                <input
                  type="text"
                  value={journalConference}
                  onChange={(e) => setJournalConference(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DOI</label>
                <input
                  type="text"
                  value={doi}
                  onChange={(e) => setDoi(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </>
          )}
          {projectType === "patents" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patent Number</label>
                <input
                  type="text"
                  value={patentNumber}
                  onChange={(e) => setPatentNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filing Date</label>
                <input
                  type="date"
                  value={filingDate}
                  onChange={(e) => setFilingDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </>
          )}
          {projectType === "grants" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Granting Agency</label>
                <input
                  type="text"
                  value={grantingAgency}
                  onChange={(e) => setGrantingAgency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </>
          )}
          {projectType === "competitions" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Competition Name</label>
                <input
                  type="text"
                  value={competitionName}
                  onChange={(e) => setCompetitionName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rank/Position</label>
                <input
                  type="text"
                  value={rankPosition}
                  onChange={(e) => setRankPosition(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
