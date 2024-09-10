import React, { useState } from "react";

const AddProjectModal = ({ onClose }) => {
  const [projectType, setProjectType] = useState("projects");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [isTeamWork, setIsTeamWork] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", {
      projectType,
      title,
      description,
      department,
      date,
      isTeamWork,
      teamMembers,
      ...getAdditionalFields(),
    });
    onClose();
  };

  const getAdditionalFields = () => {
    switch (projectType) {
      case "projects":
        return { fundingSource, duration };
      case "publications":
        return { journalConference, doi };
      case "patents":
        return { patentNumber, filingDate };
      case "grants":
        return { grantingAgency, amount };
      case "competitions":
        return { competitionName, rankPosition };
      default:
        return {};
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4 z-99">
      <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-2xl w-full max-h-[40rem]">
        <h2 className="text-2xl font-bold mb-4">Add Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Type
            </label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <option value="projects">Projects</option>
              <option value="publications">Publications</option>
              <option value="patents">Patents</option>
              <option value="grants">Grants</option>
              <option value="competitions">Competitions</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="3"
              required></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          {/* Solo/Team Work Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Is this a team work?
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="isTeamWork"
                  value="false"
                  checked={!isTeamWork}
                  onChange={() => setIsTeamWork(false)}
                />
                <span className="ml-2">Solo Work</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="isTeamWork"
                  value="true"
                  checked={isTeamWork}
                  onChange={() => setIsTeamWork(true)}
                />
                <span className="ml-2">Team Work</span>
              </label>
            </div>
          </div>

          {/* Team Members */}
          {isTeamWork && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Members
              </label>
              {teamMembers.map((member, index) => (
                <div key={index} className="mb-4 p-4 border rounded-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) =>
                          updateTeamMember(index, "name", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) =>
                          updateTeamMember(index, "email", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Department
                      </label>
                      <input
                        type="text"
                        value={member.department}
                        onChange={(e) =>
                          updateTeamMember(index, "department", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Year
                      </label>
                      <input
                        type="number"
                        value={member.year}
                        onChange={(e) =>
                          updateTeamMember(index, "year", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="mt-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addTeamMember}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                Add Team Member
              </button>
            </div>
          )}

          {/* Dynamic fields based on project type */}
          {projectType === "projects" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Funding Source
                </label>
                <input
                  type="text"
                  value={fundingSource}
                  onChange={(e) => setFundingSource(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </>
          )}
          {projectType === "publications" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Journal/Conference
                </label>
                <input
                  type="text"
                  value={journalConference}
                  onChange={(e) => setJournalConference(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  DOI
                </label>
                <input
                  type="text"
                  value={doi}
                  onChange={(e) => setDoi(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </>
          )}
          {projectType === "patents" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Patent Number
                </label>
                <input
                  type="text"
                  value={patentNumber}
                  onChange={(e) => setPatentNumber(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Filing Date
                </label>
                <input
                  type="date"
                  value={filingDate}
                  onChange={(e) => setFilingDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </>
          )}
          {projectType === "grants" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Granting Agency
                </label>
                <input
                  type="text"
                  value={grantingAgency}
                  onChange={(e) => setGrantingAgency(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </>
          )}
          {projectType === "competitions" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Competition Name
                </label>
                <input
                  type="text"
                  value={competitionName}
                  onChange={(e) => setCompetitionName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rank/Position
                </label>
                <input
                  type="text"
                  value={rankPosition}
                  onChange={(e) => setRankPosition(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
