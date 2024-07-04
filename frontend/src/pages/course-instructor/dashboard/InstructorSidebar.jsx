import React, { useState } from "react";
import LOGO from "../../../assets/logo.jpeg";
import { FiLogOut } from "react-icons/fi";
import { useAuthStore } from "../../../store/useAuthStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import MyCourses from "../my-courses";
import Learners from "../learners";
//
const InstructorSidebar = () => {
  // get the initial active content from the URL using react router dom
  const { content } = useParams();
  const navigate = useNavigate();
  //
  const [activeContent, setActiveContent] = useState(content || "Dashboard");
  //
  const handleLinkClick = (content) => {
    setActiveContent(content);
    navigate(`/course-instructor?content=${content}`);
  };
  //
  const { logout } = useAuthStore((state) => ({
    logout: state.logout,
  }));
  //
  const renderContent = () => {
    switch (activeContent) {
      case "Dashboard":
        return (
          <>
            <Dashboard />
          </>
        );
      case "My-Courses":
        return (
          <>
            <MyCourses />
          </>
        );
      case "Learners":
        return (
          <>
            <Learners />
          </>
        );
      default:
        return (
          <p>
            Welcome to the application. Please select a link from the sidebar.
          </p>
        );
    }
  };

  // Function to handle logout logic
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  //
  // custom css for nav-link and active nav-link
  const navLinkStyle = {
    color: "#fff",
    backgroundColor: "#000",
  };
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <div
        className="d-flex flex-column flex-shrink-0 p-3"
        style={{ width: "280px", backgroundColor: "#6db0fd" }}
      >
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <img
            src={LOGO}
            alt="Emerald Bay"
            style={{
              maxWidth: "100%",
              maxHeight: "60px",
              padding: "5px",
              backgroundColor: "#fff",
            }}
            className="rounded"
          />
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <p
              className="nav-link"
              style={
                activeContent === "Dashboard"
                  ? { ...navLinkStyle, cursor: "pointer" }
                  : { color: "#000", cursor: "pointer" }
              }
              onClick={() => handleLinkClick("Dashboard")}
            >
              Dashboard
            </p>
          </li>

          <li>
            <p
              className="nav-link"
              style={
                activeContent === "My-Courses"
                  ? { ...navLinkStyle, cursor: "pointer" }
                  : { color: "#000", cursor: "pointer" }
              }
              onClick={() => handleLinkClick("My-Courses")}
            >
              Course Management
            </p>
          </li>
          <li>
            <p
              className="nav-link"
              style={
                activeContent === "Learners"
                  ? { ...navLinkStyle, cursor: "pointer" }
                  : { color: "#000", cursor: "pointer" }
              }
              onClick={() => handleLinkClick("Learners")}
            >
              My Learners
            </p>
          </li>
        </ul>
        <div className="mt-auto">
          <button
            // danger outline button
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
            onClick={handleLogout}
          >
            <FiLogOut className="me-2" /> Logout
          </button>
        </div>
      </div>
      <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
        {renderContent()}
      </div>
    </div>
  );
};
//
export default InstructorSidebar;
