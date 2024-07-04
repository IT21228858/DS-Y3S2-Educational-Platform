import { useQuery } from "@tanstack/react-query";
import CourseAPI from "../api/CourseAPI";

export const useCourseData = (status) => {
  return useQuery({
    queryKey: ["courses", status],
    queryFn: () => CourseAPI.getAllCourses(status),
  });
};

export const useCourseCount = () => {
  return useQuery({
    queryKey: ["courseCount"],
    queryFn: () => CourseAPI.getCourseCount(),
  });
};

export const useCoursesByInstructor = (instructorId) => {
  return useQuery({
    queryKey: ["coursesByInstructor", instructorId],
    queryFn: () => CourseAPI.getCoursesByInstructor(instructorId),
  });
};

export const useCourseById = (id) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => CourseAPI.getCourseById(id),
  });
};
