import { USER_ROLES } from "../../../constants/roles";
import { useUserCount } from "../../../hooks/useUserData";
import { useAuthStore } from "../../../store/useAuthStore";

const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the data from the react-query hook
  const { data: learners } = useUserCount(USER_ROLES.LEARNER);
  const { data: instructors } = useUserCount(USER_ROLES.COURSE_INSTRUCTOR);
  const { data: admins } = useUserCount(USER_ROLES.SYSTEM_ADMIN);
  //
  return (
    <div className="container mt-4">
      {user && (
        <div className="alert alert-primary" role="alert">
          You are logged in as <strong>{user.role}</strong>
        </div>
      )}

      <div className="row">
        <h2 className="mb-3">
          {/* greeting message based on the time of the day */}
          {new Date().getHours() < 12
            ? "Good Morning"
            : new Date().getHours() < 18
            ? "Good Afternoon"
            : "Good Evening"}
          , {user && user.name}
        </h2>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">👨‍🎓Total Learners</h5>
              <p className="card-text fs-4 fw-bold">
                {learners ? learners.data.count : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">👨‍🏫Total Instructors</h5>
              <p className="card-text fs-4 fw-bold">
                {instructors ? instructors.data.count : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body">
              <h5 className="card-title">👨‍💼Total Admins</h5>
              <p className="card-text fs-4 fw-bold">
                {admins ? admins.data.count : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
