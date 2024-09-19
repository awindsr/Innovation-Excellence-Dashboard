//handle entries submitted by user.
//on submission, notify faculty to approve/verify submission

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