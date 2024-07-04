import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useCourseStore } from "../../../store/useCourseStore";
import { useCoursesByInstructor } from "../../../hooks/useCourseData";
import { BootstrapModal } from "../../../components";
import Toast from "../../../utils/Toast";
import CourseAPI from "../../../api/CourseAPI";
import { handleUpload } from "../../../utils/HandleUpload";
import { useAuthStore } from "../../../store/useAuthStore";

const EditCourseModal = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the state and actions from the store
  const { isEditCourseModalOpen, closeEditCourseModal, selectedCourse } =
    useCourseStore((state) => ({
      isEditCourseModalOpen: state.isEditCourseModalOpen,
      closeEditCourseModal: state.closeEditCourseModal,
      selectedCourse: state.selectedCourse,
    }));

  // Get the data from the react-query hook
  const { refetch: refetchCourses } = useCoursesByInstructor(user._id);

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  // Handle image upload
  const handleImageUpload = (e) => {
    setFile(file);
    handleUpload({ file, setPercent, setDocument: setImage });
  };

  // Handle change
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const { mutate } = useMutation({
    mutationFn: (values) => CourseAPI.updateCourse(values),
    onSuccess: () => {
      refetchCourses();
      closeEditCourseModal();
      Toast({ type: "success", message: "Course updated successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    data.image = image;
    //
    data.price = Number(data.price);
    //
    mutate({ id: selectedCourse._id, data });
    reset();
    // reset the percent and image state
    setPercent(0);
    setImage("");
  };

  useEffect(() => {
    // Set the form values when the selectedCourse changes
    if (selectedCourse) {
      setValue("title", selectedCourse.title);
      setValue("description", selectedCourse.description);
      setValue("price", selectedCourse.price);
      setImage(selectedCourse.image);
    }
  }, [selectedCourse, setValue]);

  // categories
  const categories = ["Electronics", "Clothes", "Shoes", "Accessories"];

  return (
    <BootstrapModal
      show={isEditCourseModalOpen}
      handleClose={closeEditCourseModal}
      title={`Edit: ${selectedCourse?.title}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            title="title"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <small className="form-text text-danger">Title is required</small>
          )}
        </div>

        {/* description */}
        <div className="mb-2">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <small className="form-text text-danger">
              Description is required
            </small>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Current Image
          </label>
          <br />
          <img
            src={selectedCourse?.image}
            alt={selectedCourse?.name}
            width="50"
            height="50"
          />
        </div>

        {/* image */}
        <div className="form-group mb-3">
          <label htmlFor="image">New Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            placeholder="Upload image"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={handleImageUpload}
            disabled={!file || percent === 100}
            className="btn btn-outline-dark mt-2 btn-sm"
          >
            Upload
          </button>
          <div className="progress mt-2">
            <div
              className={`progress-bar bg-success ${
                percent < 100
                  ? "progress-bar-animated progress-bar-striped"
                  : ""
              }`}
              role="progressbar"
              style={{ width: `${percent}%` }}
              aria-valuenow={percent}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {percent < 100 ? `Uploading ${percent}%` : `Uploaded ${percent}%`}
            </div>
          </div>
        </div>

        {/* price */}
        <div className="mb-2">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <small className="form-text text-danger">Price is required</small>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditCourseModal;
