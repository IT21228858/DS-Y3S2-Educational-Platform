import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCourseById } from "../../hooks/useCourseData";
import NavBar from "../../components/NavBar";
import { USER_ROLES } from "../../constants/roles";
import { useAuthStore } from "../../store/useAuthStore";
import { useEnrollmentsDataByLearner } from "../../hooks/useEnrollmentData";
import { useMutation } from "@tanstack/react-query";
import EnrollmentAPI from "../../api/EnrollmentAPI";
import { confirmMessage } from "../../utils/Alert";

const Course = () => {
  const navigate = useNavigate();
  //
  const { id } = useParams();
  //
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  //
  const { data } = useCourseById(id);
  const { data: enrollments, refetch: refetchEnrollments } =
    useEnrollmentsDataByLearner();

  //
  const course = data?.data?.course;
  //
  // Handle Enroll
  const navigateToEnroll = () => {
    navigate(`/enroll/${id}`);
  };
  //
  // Unenroll Mutation
  const { mutate: unenrollMutation } = useMutation({
    mutationFn: () => EnrollmentAPI.unenroll(id),
    onSuccess: () => {
      refetchEnrollments();
    },
  });
  //
  // Handle Unenroll
  const handleUnenroll = () => {
    confirmMessage(
      "Are you sure?",
      "This action will unenroll you from the course and you will not get a refund",
      () => {
        unenrollMutation();
      }
    );
  };
  //
  return (
    <>
      <NavBar />
      <Container className="mt-5">
        {course && (
          <>
            <h1>{course.title}</h1>
            <Row className="mt-4">
              <Col xs={12} md={6}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={course.image}
                    alt={course.title}
                    style={{ objectFit: "cover", height: "400px" }}
                  />
                </Card>
              </Col>
              <Col xs={12} md={6}>
                <Card>
                  <Card.Body>
                    <p>{course.description}</p>
                    <h4 className="fw-bold">Rs.{course.price}</h4>
                    <h4 className="text-muted">
                      Instructor: {course.instructor.name}
                    </h4>
                    <div className="d-flex justify-content-end align-items-center">
                      {course?.status === "Pending" ? (
                        // disabled button if course status is pending
                        <Button variant="warning" disabled>
                          Course Pending Approval
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          className="mt-3"
                          disabled={user?.role !== USER_ROLES.LEARNER}
                          // if not enrolled, call handleEnroll on click else call handleUnenroll
                          onClick={
                            enrollments?.data?.enrollments.some(
                              (enrollment) =>
                                enrollment.course._id === course._id
                            )
                              ? handleUnenroll
                              : navigateToEnroll
                          }
                        >
                          {user?.role !== USER_ROLES.LEARNER
                            ? "Login as a Learner to Enroll"
                            : enrollments?.data?.enrollments.some(
                                (enrollment) =>
                                  enrollment.course._id === course._id
                              )
                            ? "Unenroll"
                            : "Enroll Now"}
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Course;
