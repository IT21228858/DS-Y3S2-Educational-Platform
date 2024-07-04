import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { USER_ROLES } from "../constants/roles";

const CheckLoginStatus = () => {
  const user = useAuthStore.getState().user;

  if (!user) {
    return <Outlet />;
  }

  const permissionLevel = user.role;

  if (permissionLevel === USER_ROLES.SYSTEM_ADMIN) {
    return <Navigate to="/system-admin" />;
  } else if (permissionLevel === USER_ROLES.COURSE_INSTRUCTOR) {
    return <Navigate to="/course-instructor" />;
  } else if (permissionLevel === USER_ROLES.LEARNER) {
    return <Navigate to="/learner" />;
  } else {
    return <Outlet />;
  }
};

export default CheckLoginStatus;
