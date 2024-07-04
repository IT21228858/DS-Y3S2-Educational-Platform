import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { confirmMessage } from "../../../utils/Alert";
import { BootstrapTable } from "../../../components";
import { useAuthStore } from "../../../store/useAuthStore";
import { useCoursesByInstructor } from "../../../hooks/useCourseData";
import { Link } from "react-router-dom";
import CourseAPI from "../../../api/CourseAPI";
import { useCourseStore } from "../../../store/useCourseStore";
import { IoMdAddCircleOutline } from "react-icons/io";
import Toast from "../../../utils/Toast";
import AddCourseModal from "./AddCourseModal";
import AddLessonModal from "./AddLessonModal";
import ViewCourseModal from "./ViewCourseModal";
import EditCourseModal from "./EditCourseModal";
//
const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  //
  const {
    openAddCourseModal,
    setSelectedCourse,
    openAddLessonModal,
    openViewCourseModal,
    openEditCourseModal,
  } = useCourseStore((state) => ({
    openAddCourseModal: state.openAddCourseModal,
    setSelectedCourse: state.setSelectedCourse,
    openAddLessonModal: state.openAddLessonModal,
    openViewCourseModal: state.openViewCourseModal,
    openEditCourseModal: state.openEditCourseModal,
  }));
  // Get the data from the react-query hook
  const { data: courses, refetch: refetchCourses } = useCoursesByInstructor(
    user._id
  );

  // Delete mutation
  const { mutate } = useMutation({
    mutationFn: (id) => CourseAPI.deleteCourse(id),
    onSuccess: () => {
      refetchCourses();
      Toast({ type: "success", message: "Course deleted successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Delete function
  const onDelete = (id) => {
    confirmMessage("Are you sure?", "This action cannot be undone.", () => {
      mutate(id);
    });
  };

  // Handle Lesson Add
  const handleAddLesson = (course) => {
    setSelectedCourse(course);
    openAddLessonModal();
  };

  // Headers View Course
  const headersViewCourse = (course) => {
    setSelectedCourse(course);
    openViewCourseModal(course);
  };

  // Headers Edit Course
  const headersEditCourse = (course) => {
    setSelectedCourse(course);
    openEditCourseModal(course);
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
      <AddCourseModal />
      <AddLessonModal />
      <ViewCourseModal />
      <EditCourseModal />

      <h1 className="mb-4">My Courses</h1>

      <Button variant="primary" onClick={openAddCourseModal}>
        <IoMdAddCircleOutline className="mb-1" /> <span>Add Course</span>
      </Button>

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
                    onClick={() => handleAddLesson(course)}
                  >
                    <IoMdAddCircleOutline className="mb-1" />
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="success"
                    size="sm"
                    onClick={() => headersViewCourse(course)}
                  >
                    <span>View</span>
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="info"
                    size="sm"
                    onClick={() => headersEditCourse(course)}
                  >
                    <span>Edit</span>
                  </Button>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onDelete(course._id)}
                    size="sm"
                  >
                    <span>Delete</span>
                  </Button>
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
