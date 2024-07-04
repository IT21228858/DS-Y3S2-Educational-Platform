import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../../../store/useUserStore";
import { useUserData } from "../../../hooks/useUserData";
import { BootstrapModal } from "../../../components";
import Toast from "../../../utils/Toast";
import UserAPI from "../../../api/UserAPI";
import { USER_ROLES } from "../../../constants/roles";

const EditUserModal = () => {
  // Get the state and actions from the store
  const { isEditUserModalOpen, closeEditUserModal, selectedUser } =
    useUserStore((state) => ({
      isEditUserModalOpen: state.isEditUserModalOpen,
      closeEditUserModal: state.closeEditUserModal,
      selectedUser: state.selectedUser,
    }));

  // Get the data from the react-query hook
  const { refetch: refetchUsers } = useUserData("");

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: (values) => UserAPI.updateUser(values),
    onSuccess: () => {
      refetchUsers();
      closeEditUserModal();
      Toast({ type: "success", message: "User updated successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedUser._id, data });
    reset();
  };

  useEffect(() => {
    // Set the form values when the selectedUser changes
    if (selectedUser) {
      setValue("name", selectedUser.name);
      setValue("email", selectedUser.email);
      setValue("role", selectedUser.role);
      setValue("status", selectedUser.status);
    }
  }, [selectedUser, setValue]);

  return (
    <BootstrapModal
      show={isEditUserModalOpen}
      handleClose={closeEditUserModal}
      title={`Edit: ${selectedUser?.name}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <small className="form-text text-danger">Name is required</small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <small className="form-text text-danger">Email is required</small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-select"
            id="role"
            name="role"
            {...register("role", { required: true })}
          >
            {Object.values(USER_ROLES).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && (
            <small className="form-text text-danger">Role is required</small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            id="status"
            name="status"
            {...register("status", { required: true })}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
          {errors.status && (
            <small className="form-text text-danger">Status is required</small>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditUserModal;
