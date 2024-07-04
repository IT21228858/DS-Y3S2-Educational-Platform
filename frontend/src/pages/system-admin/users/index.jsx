import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { confirmMessage } from "../../../utils/Alert";
import { BootstrapTable } from "../../../components";
import { useAuthStore } from "../../../store/useAuthStore";
import { useUserData } from "../../../hooks/useUserData";
import UserAPI from "../../../api/UserAPI";
import { useUserStore } from "../../../store/useUserStore";
import Toast from "../../../utils/Toast";
import EditUserModal from "./EditUserModal";
//
const index = () => {
  const { user: loggedInUser } = useAuthStore((state) => ({
    user: state.user,
  }));
  //
  const { setSelectedUser, openEditUserModal } = useUserStore((state) => ({
    setSelectedUser: state.setSelectedUser,
    openEditUserModal: state.openEditUserModal,
  }));
  // Get the data from the react-query hook
  const { data: users, refetch: refetchUsers } = useUserData("");

  // Handle Edit User
  const handleEditUser = (user) => {
    setSelectedUser(user);
    openEditUserModal();
  };

  // Delete mutation
  const { mutate } = useMutation({
    mutationFn: (id) => UserAPI.deleteUser(id),
    onSuccess: (res) => {
      refetchUsers();
      Toast({ type: "success", message: res?.data?.message });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Delete function
  const onDelete = (id) => {
    confirmMessage(
      "Are you sure?",
      "This action can be undone. It will set the user to inactive.",
      () => {
        mutate(id);
      }
    );
  };

  const headers = ["Name", "Email", "Role", "Status", "Actions"];

  return (
    <div className="container mt-2">
      <EditUserModal />

      <h1 className="mb-4">User Management</h1>

      <div className="mt-4">
        <BootstrapTable
          headers={headers}
          children={
            users &&
            users?.data?.users.map((user) => (
              <tr key={user._id}>
                <td>
                  {user?.name === loggedInUser?.name ? (
                    <span>
                      {user?.name}{" "}
                      {user?.name === user?.name && (
                        <span className="badge bg-primary">You</span>
                      )}
                    </span>
                  ) : (
                    user?.name
                  )}
                </td>
                <td>{user?.email}</td>
                <td>
                  {user?.role === "SYSTEM_ADMIN" ? (
                    <span className="badge bg-danger">SYSTEM ADMIN</span>
                  ) : (
                    user?.role
                  )}
                </td>
                <td>
                  {user?.status === "ACTIVE" ? (
                    <span className="badge bg-success">ACTIVE</span>
                  ) : (
                    <span className="badge bg-warning">INACTIVE</span>
                  )}
                </td>
                <td>
                  <Button
                    className="m-1 px-3"
                    variant="primary"
                    size="sm"
                    onClick={() => handleEditUser(user)}
                  >
                    <span>Edit</span>
                  </Button>
                  {user?.status === "ACTIVE" && (
                    <Button
                      className="m-1 px-3"
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(user._id)}
                    >
                      <span>Delete</span>
                    </Button>
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
