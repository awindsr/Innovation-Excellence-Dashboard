import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../utils/supabaseclient";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShare,
  faProjectDiagram,
  faBook,
  faCertificate,
  faHandHoldingUsd,
  faTrophy,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.user);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [publications, setPublications] = useState([]);
  const [patents, setPatents] = useState([]);
  const [grants, setGrants] = useState([]);
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        // Fetch user data for shared profile
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", id)
          .single();
        if (error) console.error("Error fetching user:", error);
        else setUser(data);
      } else if (currentUser) {
        // Use current user data for personal profile
        setUser(currentUser);
      } else {
        // Redirect to login if no user is found
        navigate("/login");
      }
    };

    fetchUserData();
  }, [id, currentUser, navigate]);

  useEffect(() => {
    const fetchUserSubmissions = async () => {
      if (user) {
        const userId = user.id;

        // Fetch projects
        const { data: projectsData } = await supabase
          .from("projects")
          .select("*")
          .or(`done_by.eq.${userId}` || `team_members.cs.{id: ${userId}}`);
        setProjects(projectsData || []);

        // Fetch publications
        const { data: publicationsData } = await supabase
          .from("publications")
          .select("*")
          .or(`authors.cs.{${user.name}}` || `team_members.cs.{id: ${userId}}`);
        setPublications(publicationsData || []);

        // Fetch patents
        const { data: patentsData } = await supabase
          .from("patents")
          .select("*")
          .or(
            `inventors.cs.{${user.name}}` || `team_members.cs.{id: ${userId}}`
          );
        setPatents(patentsData || []);

        // Fetch grants
        const { data: grantsData } = await supabase
          .from("grants")
          .select("*")
          .or(
            `principal_investigator.eq.${userId}` ||
              `team_members.cs.{id: ${userId}}`
          );
        setGrants(grantsData || []);

        // Fetch competitions
        const { data: competitionsData } = await supabase
          .from("competitions")
          .select("*")
          .or(
            `participants.cs.{${user.name}}` ||
              `team_members.cs.{id: ${userId}}`
          );
        setCompetitions(competitionsData || []);
      }
    };

    fetchUserSubmissions();
  }, [user]);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/profile/${user.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Profile link copied to clipboard!");
    });
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="text-4xl mr-4" />
            <h1 className="text-4xl font-bold">{user.name}</h1>
          </div>
          <button
            onClick={handleShare}
            className="bg-black text-white px-4 py-2 rounded-full flex items-center hover:bg-gray-800 transition duration-300">
            <FontAwesomeIcon icon={faShare} className="mr-2" />
            Share Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CategorySection
            title="Projects"
            icon={faProjectDiagram}
            items={projects}
            renderItem={(project) => (
              <div className="mb-2">
                <div className="w-full flex gap-3 items-center justify-start">
                  <h4 className="font-semibold text-2xl">{project.title} </h4>

                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faLink}
                      className="text-black text-[.8rem]"
                    />
                  </a>
                </div>
                <p>{project.description}</p>
              </div>
            )}
          />

          <CategorySection
            title="Publications"
            icon={faBook}
            items={publications}
            renderItem={(publication) => (
              <div className="mb-2">
                <h4 className="font-semibold">{publication.title}</h4>
                <FontAwesomeIcon icon={faLink} className="text-black text-[.8rem] " />
                <p className="text-sm text-gray-600">{publication.journal}</p>
              </div>
            )}
          />

          <CategorySection
            title="Patents"
            icon={faCertificate}
            items={patents}
            renderItem={(patent) => (
              <div className="mb-2">
                <h4 className="font-semibold">{patent.title}</h4>
                {/* <FontAwesomeIcon icon={faLink} className="text-black text-[.8rem] " onClick={navigate(`${patents.link}`)}/> */}
                <p className="text-sm text-gray-600">{patent.status}</p>
              </div>
            )}
          />

          <CategorySection
            title="Grants"
            icon={faHandHoldingUsd}
            items={grants}
            renderItem={(grant) => (
              <div className="mb-2">
                <h4 className="font-semibold">{grant.title}</h4>
                {/* <FontAwesomeIcon icon={faLink} className="text-black text-[.8rem] " onClick={navigate(`${project.link}`)}/> */}
                <p className="text-sm text-gray-600">{grant.granting_agency}</p>
              </div>
            )}
          />

          <CategorySection
            title="Competitions"
            icon={faTrophy}
            items={competitions}
            renderItem={(competition) => (
              <div className="mb-2">
                <h4 className="font-semibold">{competition.title}</h4>
                <p className="text-sm text-gray-600">
                  {competition.rank_achieved}
                </p>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

const CategorySection = ({ title, icon, items, renderItem }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <FontAwesomeIcon icon={icon} className="text-2xl mr-2" />
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
    <div className="space-y-4">
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-md shadow">
            {renderItem(item)}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No {title.toLowerCase()} to display.</p>
      )}
    </div>
  </div>
);

export default ProfilePage;
