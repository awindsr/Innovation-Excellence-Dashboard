import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseclient";
import { clearUser } from "../features/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = !!user;
  const [role, setRole] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const id = user?.id;

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
            return;
          }

          if (data) {
            console.log("Role fetched:", data.role);
            setRole(data.role);
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    if (user?.id) {
      getUserRole();
    }
  }, [user]);

  function handleProfileClick() {
    navigate(`/profile/${id}`);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(clearUser());
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white">
      <div className="w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl sm:text-2xl font-medium text-black">
            Innovation Excellence Dashboard
          </h1>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="bg-black text-white px-3 py-2 rounded-lg text-sm">
                    Logout
                  </button>

                  {role === "student" && (
                    <button
                      onClick={() => navigate("/add-project")}
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm">
                      Add Project
                    </button>
                  )}
                  {role === "faculty" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate("/review-requests")}
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm">
                        Review Requests
                      </button>
                      <button
                        onClick={() => navigate("/review-requests")}
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm">
                        Student Statistics
                      </button>
                    </div>
                  )}
                  {role === "admin" && (
                    <button
                      onClick={() => navigate("/admin-dashboard")}
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm">
                      Admin Dashboard
                    </button>
                  )}
                  <button onClick={handleProfileClick}>
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-white bg-black p-3 rounded-full"
                    />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-black text-white px-3 py-2 rounded-lg text-sm">
                  Login
                </button>
              )}
            </div>
          </div>
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left bg-red-500 text-white px-3 py-2 rounded-lg text-base">
                  Logout
                </button>
                {role === "student" && (
                  <button
                    onClick={() => {
                      navigate("/add-project");
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left bg-blue-500 text-white px-3 py-2 rounded-lg text-base">
                    Add Project
                  </button>
                )}
                {role === "faculty" && (
                  <button
                    onClick={() => {
                      navigate("/review-requests");
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left bg-blue-500 text-white px-3 py-2 rounded-lg text-base">
                    Review Submissions
                  </button>
                )}
                {role === "admin" && (
                  <button
                    onClick={() => {
                      navigate("/admin-dashboard");
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left bg-blue-500 text-white px-3 py-2 rounded-lg text-base">
                    Admin Dashboard
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left bg-black text-white px-3 py-2 rounded-lg text-base">
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
