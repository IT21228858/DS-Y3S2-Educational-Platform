import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import LOGO from "../assets/logo.jpeg";
import { USER_ROLES } from "../constants/roles";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  //
  const { logout, user } = useAuthStore((state) => ({
    logout: state.logout,
    user: state.user,
  }));
  //
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#6db0fd" }}
    >
      {/* logo */}
      <Link className="navbar-brand mx-3" to="/">
        <img
          src={LOGO}
          alt="Logo"
          style={{
            maxWidth: "100%",
            maxHeight: "45px",
            backgroundColor: "#fff",
          }}
          className="rounded"
        />
      </Link>

      {/* vertical line using plain css */}
      <div
        className="d-none d-lg-block"
        style={{ borderLeft: "3px solid #fff", height: 40 }}
      ></div>

      {/* Navbar links */}
      <Link
        className="ms-3 text-decoration-none text-dark rounded-pill px-3 py-1 bg-white border border-1 border-dark fw-bold"
        to="/courses"
      >
        Courses
      </Link>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        {user && (
          <>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-3">
                <img
                  src={`https://api.dicebear.com/8.x/micah/svg?seed=${user?.name}&flip=true&backgroundType=gradientLinear&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`}
                  alt="User Avatar"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "2px solid #fff",
                  }}
                />{" "}
              </li>

              <li className="nav-item mx-2 align-self-center">
                <Link
                  className="btn btn-primary btn-sm"
                  to={
                    user.role === USER_ROLES.LEARNER
                      ? "/learner"
                      : user.role === USER_ROLES.COURSE_INSTRUCTOR
                      ? "/course-instructor"
                      : user.role === USER_ROLES.SYSTEM_ADMIN
                      ? "/system-admin"
                      : "/"
                  }
                >
                  {
                    {
                      [USER_ROLES.LEARNER]: "Learner Dashboard",
                      [USER_ROLES.COURSE_INSTRUCTOR]: "Instructor Dashboard",
                      [USER_ROLES.SYSTEM_ADMIN]: "Admin Dashboard",
                    }[user.role]
                  }
                </Link>
              </li>
              <li className="nav-item mx-2 align-self-center">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
