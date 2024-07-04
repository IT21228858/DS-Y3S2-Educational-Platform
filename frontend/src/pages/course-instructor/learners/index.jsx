import React, { useState } from "react";
import { useCoursesByInstructor } from "../../../hooks/useCourseData";
import { useAuthStore } from "../../../store/useAuthStore";
import { useEnrollmentsDataByCourse } from "../../../hooks/useEnrollmentData";

const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  //
  const [selectedCourseId, setSelectedCourseId] = useState("");
  //
  const { data: courses, refetch: refetchCourses } = useCoursesByInstructor(
    user._id
  );
  const { data: enrollments } = useEnrollmentsDataByCourse(selectedCourseId);
  //
  return (
    <div className="container mt-2">
      <h1 className="mb-4">My Learners</h1>
      {/* course selector */}
      <div className="mb-3">
        <select
          className="form-select"
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          <option value="">Select a course</option>
          {courses &&
            courses?.data?.courses?.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
        </select>
      </div>

      {/* learners table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Enrolled On</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {enrollments?.data?.enrollments?.length > 0 ? (
            enrollments?.data?.enrollments.map((enrollment) => (
              <tr key={enrollment._id}>
                <td>{enrollment?.learner?.name}</td>
                <td>{enrollment?.learner?.email}</td>
                <td>{new Date(enrollment?.createdAt).toDateString()}</td>
                <td>
                  {/* course has lessons list get count from it and get completedLessons from enrollment */}
                  {enrollment?.completedLessons.length} /{" "}
                  {enrollment?.course?.lessons.length}
                </td>
              </tr>
            ))
          ) : selectedCourseId ? (
            <tr className="text-center">
              <td className="bg-warning text-dark" colSpan="4">
                No learners enrolled yet
              </td>
            </tr>
          ) : (
            <tr className="text-center">
              <td className="bg-danger text-white" colSpan="4">
                Select a course to view learners
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default index;
