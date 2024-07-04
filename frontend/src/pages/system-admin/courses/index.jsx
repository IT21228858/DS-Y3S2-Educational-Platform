import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { confirmMessage } from "../../../utils/Alert";
import { BootstrapTable } from "../../../components";
import { useAuthStore } from "../../../store/useAuthStore";
import { useCourseData } from "../../../hooks/useCourseData";
import { Link } from "react-router-dom";
import CourseAPI from "../../../api/CourseAPI";
import { useCourseStore } from "../../../store/useCourseStore";
import { IoMdAddCircleOutline } from "react-icons/io";
import Toast from "../../../utils/Toast";
import ViewCourseModal from "../../course-instructor/my-courses/ViewCourseModal";
//
const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  //
  const { setSelectedCourse, openViewCourseModal } = useCourseStore(
    (state) => ({
      setSelectedCourse: state.setSelectedCourse,
      openViewCourseModal: state.openViewCourseModal,
    })
  );
  // Get the data from the react-query hook
  const { data: courses, refetch: refetchCourses } = useCourseData("");

  const { mutate } = useMutation({
    mutationFn: (values) => CourseAPI.updateCourse(values),
    onSuccess: () => {
      refetchCourses();
      Toast({ type: "success", message: "Course updated successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Approve Course
  const approveCourse = (course) => {
    const updatedCourse = {
      id: course._id,
      data: { status: "Approved" },
    };
    mutate(updatedCourse);
  };

  // Reject Course
  const rejectCourse = (course) => {
    const updatedCourse = {
      id: course._id,
      data: { status: "Rejected" },
    };
    mutate(updatedCourse);
  };

  // Headers View Course
  const headersViewCourse = (course) => {
    setSelectedCourse(course);
    openViewCourseModal(course);
  };

  const headers = [
    "Course Title",
    "Description",
    "Lessons Count",
    "Status",
    "Price",
    "Actions",
  ];

  return (
    <div className="container mt-2">
      <ViewCourseModal />

      <h1 className="mb-4">Course Management</h1>

      <div className="mt-4">
        <BootstrapTable
          headers={headers}
          children={
            courses &&
            courses?.data?.courses.map((course) => (
              <tr key={course._id}>
                <td>
                  <Link to={`/course/${course?._id}`}>{course?.title}</Link>
                </td>
                <td>{course?.description.slice(0, 50)}...</td>
                <td>{course?.lessons.length}</td>
                {/* show status in badge with different colors - "Pending", "Approved", "Rejected" */}
                <td>
                  <span
                    className={`badge ${
                      course?.status === "Pending"
                        ? "bg-warning"
                        : course?.status === "Approved"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {course?.status}
                  </span>
                </td>
                <td>{course?.price}</td>
                <td>
                  <Button
                    className="m-1 px-3"
                    variant="primary"
                    size="sm"
                    onClick={() => headersViewCourse(course)}
                  >
                    <span>View</span>
                  </Button>
                  {/* show approve or reject button based on the status */}
                  {course?.status === "Pending" && (
                    <>
                      <Button
                        className="m-1 px-3"
                        variant="success"
                        size="sm"
                        onClick={() =>
                          confirmMessage(
                            "Approve Course",
                            "Are you sure you want to approve this course?",
                            () => approveCourse(course)
                          )
                        }
                      >
                        <span>Approve</span>
                      </Button>
                      <Button
                        className="m-1 px-3"
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          confirmMessage(
                            "Reject Course",
                            "Are you sure you want to reject this course?",
                            () => rejectCourse(course)
                          )
                        }
                      >
                        <span>Reject</span>
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))
          }
        />
      </div>
    </div>
  );
};

export default index;
