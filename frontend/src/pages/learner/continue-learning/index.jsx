import React, { useState } from "react";
import NavBar from "../../../components/NavBar";
import { useParams, useSearchParams } from "react-router-dom";
import { useCourseById } from "../../../hooks/useCourseData";
import { useMutation } from "@tanstack/react-query";
import EnrollmentAPI from "../../../api/EnrollmentAPI";
import Toast from "../../../utils/Toast";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useEnrollmentDataById } from "../../../hooks/useEnrollmentData";
import { successMessage, errorMessage } from "../../../utils/Alert";

const Index = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  const { data, refetch } = useCourseById(courseId);
  const course = data?.data?.course;
  const { data: enrollmentData, refetch: refetchEnrollmentData } =
    useEnrollmentDataById(id);

  const { mutate: completeLessonMutation } = useMutation({
    mutationFn: (values) => EnrollmentAPI.completeLesson(values),
    onSuccess: () => {
      refetch();
      refetchEnrollmentData();
      Toast({ type: "success", message: "Lesson marked as complete" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  const handleCompleteLesson = (lessonId) => {
    completeLessonMutation({ id, lessonId });
  };

  const { mutate: incompleteLessonMutation } = useMutation({
    mutationFn: (values) => EnrollmentAPI.incompleteLesson(values),
    onSuccess: () => {
      refetch();
      refetchEnrollmentData();
      Toast({ type: "success", message: "Lesson marked as incomplete" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  const handleIncompleteLesson = (lessonId) => {
    incompleteLessonMutation({ id, lessonId });
  };

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  return (
    <>
      <NavBar />
      <Container className="mt-5">
        {course && (
          <div>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            {course.lessons.map((lesson) => (
              <Card key={lesson._id} className="mb-3">
                <Card.Body>
                  <Row>
                    <Col md={12} lg={6}>
                      <iframe
                        width="100%"
                        height="315"
                        src={lesson?.video}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                      ></iframe>
                    </Col>
                    <Col md={12} lg={6}>
                      <Card.Text>{lesson.lectureNotes}</Card.Text>
                      {enrollmentData?.data?.enrollment?.completedLessons.includes(
                        lesson._id
                      ) ? (
                        <Button
                          variant="danger"
                          onClick={() => handleIncompleteLesson(lesson._id)}
                        >
                          Mark as Incomplete
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => handleCompleteLesson(lesson._id)}
                        >
                          Mark as Complete
                        </Button>
                      )}
                    </Col>
                    {/* if quiz is present */}
                    {lesson?.quizQuestion && (
                      <Col md={12} lg={6} className="mt-3">
                        <Card>
                          <Card.Body>
                            <Card.Title>Quiz</Card.Title>
                            <Card.Text>{lesson.quizQuestion}</Card.Text>
                            <Card.Text>
                              {/* options as radio buttons */}
                              {lesson.quizOptions.map((option, index) => (
                                <div key={option} className="mb-3">
                                  <input
                                    type="radio"
                                    id={option}
                                    name="quiz"
                                    value={option}
                                    onChange={(e) =>
                                      setSelectedAnswer(index + 1)
                                    }
                                  />
                                  <label htmlFor={option}>{option}</label>
                                </div>
                              ))}
                            </Card.Text>
                            <Button
                              onClick={() => {
                                if (selectedAnswer === lesson.quizAnswer) {
                                  successMessage(
                                    "Correct",
                                    "Your answer is correct"
                                  );
                                } else {
                                  errorMessage(
                                    "Incorrect",
                                    "Your answer is incorrect"
                                  );
                                }
                              }}
                            >
                              Check Answer
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default Index;
