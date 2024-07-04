import { useQuery } from "@tanstack/react-query";
import EnrollmentAPI from "../api/EnrollmentAPI";

export const useEnrollmentsDataByLearner = () => {
  return useQuery({
    queryKey: ["enrollmentsByLearner"],
    queryFn: () => EnrollmentAPI.getEnrollmentsByLearner(),
  });
};

export const useEnrollmentsDataByCourse = (courseId) => {
  return useQuery({
    queryKey: ["enrollmentsByCourse", courseId],
    queryFn: () => EnrollmentAPI.getEnrollmentsByCourse(courseId),
  });
};

export const useEnrollmentDataById = (id) => {
  return useQuery({
    queryKey: ["enrollment", id],
    queryFn: () => EnrollmentAPI.getEnrollmentById(id),
  });
};
