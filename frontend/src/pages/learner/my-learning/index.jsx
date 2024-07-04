import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { confirmMessage } from "../../../utils/Alert";
import { BootstrapTable } from "../../../components";
import { AiTwotoneDelete } from "react-icons/ai";
import { useAuthStore } from "../../../store/useAuthStore";
import { useEnrollmentsDataByLearner } from "../../../hooks/useEnrollmentData";
import EnrollmentAPI from "../../../api/EnrollmentAPI";
import { Link } from "react-router-dom";
//
const index = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the data from the react-query hook
  const { data: enrollments, refetch: refetchEnrollments } =
    useEnrollmentsDataByLearner();

  // Unenroll mutation
  const { mutate: unenrollMutation } = useMutation({
    mutationFn: (id) => EnrollmentAPI.unenroll(id),
    onSuccess: () => {
      refetchEnrollments();
    },
  });

  // Delete function
  const onUnenroll = (id) => {
    confirmMessage(
      "Are you sure?",
      "This action will unenroll you from the course and you will not get a refund",
      () => {
        unenrollMutation(id);
      }
    );
  };

  const headers = ["Course Title", "Description", "Price", "Actions"];

  return (
    <div className="container mt-2">
      <h1 className="mb-4">My learning</h1>
      <div className="mt-5">
        <BootstrapTable
          headers={headers}
          children={
            enrollments &&
            enrollments?.data?.enrollments.map((enrollment) => (
              <tr key={enrollment._id}>
                <td>
                  <Link to={`/course/${enrollment?.course?._id}`}>
                    {enrollment?.course?.title}
                  </Link>
                </td>
                <td>{enrollment?.course?.description.slice(0, 50)}...</td>
                <td>{enrollment?.course?.price}</td>
                <td>
                  {/* Continue Learning Button */}
                  <Link
                    to={`/continue-learning/${enrollment?._id}?courseId=${enrollment?.course?._id}`}
                    className="m-1 px-3"
                  >
                    <Button variant="primary" size="sm">
                      Continue Learning
                    </Button>
                  </Link>
                  <Button
                    className="m-1 px-3"
                    variant="danger"
                    onClick={() => onUnenroll(enrollment?.course?._id)}
                    size="sm"
                  >
                    <span>Unenroll</span>
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
