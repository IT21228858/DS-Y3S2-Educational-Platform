import React from "react";
import Pay from "./Pay";
import { useMutation } from "@tanstack/react-query";
import EnrollmentAPI from "../../api/EnrollmentAPI";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useCourseById } from "../../hooks/useCourseData";
import NotificationAPI from "../../api/NotificationAPI";
import { useAuthStore } from "../../store/useAuthStore";

const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  //
  const { id } = useParams();
  //
  const { data } = useCourseById(id);
  const course = data?.data?.course;
  // Email Send Mutation
  const { mutate: emailSendMutation } = useMutation({
    mutationFn: (data) => NotificationAPI.emailSend(data),
  });
  // Enroll Mutation
  const { mutate: enrollMutation } = useMutation({
    mutationFn: () => EnrollmentAPI.createEnrollment(id),
    onSuccess: () => {
      refetchEnrollments();
    },
  });
  //
  // Handle Enroll
  const handleEnroll = () => {
    enrollMutation();
    emailSendMutation({
      email: user.email,
      subject: "Enrollment Confirmation",
      template: "enrollmentConfirmation",
      data: {
        userName: user.name,
        courseName: course.title,
      },
    });
  };
  //
  return (
    <>
      <NavBar />
      <Pay course={course} handleEnroll={handleEnroll} />
    </>
  );
};

export default index;
