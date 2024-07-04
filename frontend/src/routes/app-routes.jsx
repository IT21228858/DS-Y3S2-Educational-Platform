import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CheckLoginStatus from "./CheckLoginStatus";
import { USER_ROLES } from "../constants/roles";

import {
  Home,
  Login,
  Signup,
  CourseList,
  Course,
  Enroll,
  LearnerDashboard,
  InstructorDashboard,
  SystemAdminDashboard,
  ContinueLearning,
} from "../pages";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Check Login Status */}
          <Route element={<CheckLoginStatus />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Common Private Routes */}
          <Route
            element={
              <PrivateRoute
                permissionLevel={[
                  USER_ROLES.LEARNER,
                  USER_ROLES.COURSE_INSTRUCTOR,
                  USER_ROLES.SYSTEM_ADMIN,
                ]}
              />
            }
          >
            <Route path="/courses" element={<CourseList />} />
            <Route path="/course/:id" element={<Course />} />
          </Route>

          {/* System Admin Private Routes */}
          <Route
            element={
              <PrivateRoute permissionLevel={[USER_ROLES.SYSTEM_ADMIN]} />
            }
          >
            <Route path="/system-admin" element={<SystemAdminDashboard />} />
          </Route>

          {/* Course Instructor Private Routes */}
          <Route
            element={
              <PrivateRoute permissionLevel={[USER_ROLES.COURSE_INSTRUCTOR]} />
            }
          >
            <Route
              path="/course-instructor"
              element={<InstructorDashboard />}
            />
          </Route>

          {/* Learner Private Routes */}
          <Route
            element={<PrivateRoute permissionLevel={[USER_ROLES.LEARNER]} />}
          >
            <Route path="/learner" element={<LearnerDashboard />} />
            <Route path="/enroll/:id" element={<Enroll />} />
            <Route
              path="/continue-learning/:id"
              element={<ContinueLearning />}
            />
          </Route>

          {/* return 404 page */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
