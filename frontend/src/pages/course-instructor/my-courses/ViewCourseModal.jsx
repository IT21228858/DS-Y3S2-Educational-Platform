import { useMutation } from "@tanstack/react-query";
import { useCourseStore } from "../../../store/useCourseStore";
import { useCoursesByInstructor } from "../../../hooks/useCourseData";
import { BootstrapModal } from "../../../components";
import CourseAPI from "../../../api/CourseAPI";
import Toast from "../../../utils/Toast";
import { ImCross } from "react-icons/im";
import { useAuthStore } from "../../../store/useAuthStore";
import { confirmMessage } from "../../../utils/Alert";
import { useEnrollmentsDataByCourse } from "../../../hooks/useEnrollmentData";
import { USER_ROLES } from "../../../constants/roles";

const ViewCourseModal = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  // Get the state and actions from the store
  const { isViewCourseModalOpen, closeViewCourseModal, selectedCourse } =
    useCourseStore((state) => ({
      isViewCourseModalOpen: state.isViewCourseModalOpen,
      closeViewCourseModal: state.closeViewCourseModal,
      selectedCourse: state.selectedCourse,
    }));
  //
  // Get the data from the react-query hook
  const { refetch: refetchCourses } = useCoursesByInstructor(user._id);
  const { data: enrollments } = useEnrollmentsDataByCourse(selectedCourse?._id);
  // Delete mutation
  const { mutate } = useMutation({
    mutationFn: (values) => CourseAPI.deleteLesson(values),
    onSuccess: () => {
      refetchCourses();
      Toast({ type: "success", message: "Lesson deleted successfully" });
      closeViewCourseModal();
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Delete function
  const onDelete = (lesson) => {
    confirmMessage("Are you sure?", "This action cannot be undone.", () => {
      mutate({ id: selectedCourse._id, lessonId: lesson._id });
    });
  };
  //
  return (
    <BootstrapModal
      show={isViewCourseModalOpen}
      handleClose={closeViewCourseModal}
      title={`View: ${selectedCourse?.title} - ${selectedCourse?.status}`}
      size={"xl"}
    >
      <div className="container mt-2">
        {selectedCourse && (
          <div>
            <p>
              Description: <strong>{selectedCourse?.description}</strong>
            </p>
            <p>
              Price: <strong>Rs.{selectedCourse?.price}</strong>
            </p>
            <p>
              Students Enrolled:{" "}
              <strong>
                {enrollments?.data?.enrollments.length || 0} students
              </strong>
            </p>
            {/* Lessons */}
            <div
              className="mt-3 p-2 rounded"
              style={{
                maxHeight: "450px",
                overflowY: "auto",
                border: "1px solid #000",
              }}
            >
              {selectedCourse?.lessons.length > 0 ? (
                <>
                  <h2 className="text-center mt-2 mb-3">Lessons</h2>
                  <ul>
                    {selectedCourse?.lessons.map((lesson, index) => (
                      <>
                        <li
                          key={lesson._id}
                          style={{ listStyleType: "none" }}
                          className="mb-3"
                        >
                          <div className="d-flex flex-row gap-5">
                            <iframe
                              width="560"
                              height="315"
                              src={lesson?.video}
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerpolicy="strict-origin-when-cross-origin"
                              allowfullscreen
                            ></iframe>
                            {/* fixed width for Lecture Notes */}
                            <p style={{ width: "300px" }}>
                              <strong>Lecture Notes:</strong>{" "}
                              {lesson?.lectureNotes}
                            </p>
                            {user.role === USER_ROLES.COURSE_INSTRUCTOR && (
                              <button
                                className="btn btn-danger my-2 mx-2 h-50"
                                onClick={() => {
                                  onDelete(lesson);
                                }}
                              >
                                <ImCross />
                              </button>
                            )}
                          </div>

                          {lesson?.quizQuestion && (
                            <div className="border p-2 rounded my-2">
                              <p className="mt-2">
                                <strong>Quiz Question:</strong>{" "}
                                {lesson?.quizQuestion}
                              </p>
                              <p>
                                <strong>Options:</strong>{" "}
                                {lesson?.quizOptions.map((option, index) => (
                                  <span key={option} className="mx-2">
                                    {index + 1}. {option}
                                  </span>
                                ))}
                              </p>
                              <p>
                                <strong>Answer:</strong>{" "}
                                {lesson?.quizOptions[lesson?.quizAnswer - 1]}
                              </p>
                            </div>
                          )}
                        </li>
                        <hr />
                      </>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="bg-warning text-dark p-2">No lessons found</p>
              )}
            </div>
          </div>
        )}
      </div>
    </BootstrapModal>
  );
};

export default ViewCourseModal;
