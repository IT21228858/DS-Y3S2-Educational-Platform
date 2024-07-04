import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useCourseStore } from "../../../store/useCourseStore";
import { useCoursesByInstructor } from "../../../hooks/useCourseData";
import { BootstrapModal } from "../../../components";
import CourseAPI from "../../../api/CourseAPI";
import Toast from "../../../utils/Toast";
import { useAuthStore } from "../../../store/useAuthStore";
import { useState } from "react";
import { handleUpload } from "../../../utils/HandleUpload";

const AddLessonModal = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the state and actions from the store
  const { isAddLessonModalOpen, closeAddLessonModal, selectedCourse } =
    useCourseStore((state) => ({
      isAddLessonModalOpen: state.isAddLessonModalOpen,
      closeAddLessonModal: state.closeAddLessonModal,
      selectedCourse: state.selectedCourse,
    }));

  // Get refetch function from react-query hook
  const { refetch } = useCoursesByInstructor(user._id);

  // React hook form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation({
    mutationFn: (values) => CourseAPI.addLesson(values),
    onSuccess: () => {
      // close the modal and refetch the data
      closeAddLessonModal();
      refetch();
      Toast({ type: "success", message: "Course created successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error.message });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    values.quizAnswer = Number(values.quizAnswer);
    //
    // if one of quizQuestion or quizAnswer or quizOptions is empty, remove all of them
    if (!values.quizQuestion || !values.quizAnswer || !values.quizOptions) {
      delete values.quizQuestion;
      delete values.quizAnswer;
      delete values.quizOptions;
    }
    //
    // if quizOptions is not empty, split it by comma
    if (values.quizOptions) {
      values.quizOptions = values.quizOptions.split(",");
    }
    //
    mutate({ id: selectedCourse._id, data: values });
    reset();
  };

  return (
    <BootstrapModal
      show={isAddLessonModalOpen}
      handleClose={closeAddLessonModal}
      title={`Add Lesson to ${selectedCourse?.title} Course`}
      size={"lg"}
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="form-group">
          <label className="my-2" htmlFor="lectureNotes">
            Lecture Notes
          </label>
          <textarea
            className="form-control"
            id="lectureNotes"
            name="lectureNotes"
            {...register("lectureNotes", { required: true })}
          />
          {errors.lectureNotes && (
            <small className="form-text text-danger">
              Lecture Notes is required
            </small>
          )}
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="video">
            Video{" "}
            <small>
              <a
                href="https://support.google.com/youtube/answer/171780"
                target="_blank"
                rel="noreferrer"
              >
                (Learn how to get the video URL)
              </a>
            </small>
          </label>
          <input
            type="text"
            className="form-control"
            id="video"
            name="video"
            {...register("video", { required: true })}
          />
          {errors.video && (
            <small className="form-text text-danger">Video is required</small>
          )}
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="quizQuestion">
            Quiz Question
          </label>
          <input
            type="text"
            className="form-control"
            id="quizQuestion"
            name="quizQuestion"
            {...register("quizQuestion")}
          />
        </div>

        {/* comma separated quiz options */}
        <div className="form-group">
          <label className="my-2" htmlFor="quizOptions">
            Quiz Options (comma separated)
          </label>
          <input
            type="text"
            className="form-control"
            id="quizOptions"
            name="quizOptions"
            {...register("quizOptions")}
          />
        </div>

        <div className="form-group">
          <label className="my-2" htmlFor="quizAnswer">
            Quiz Answer
          </label>
          <input
            type="number"
            className="form-control"
            id="quizAnswer"
            name="quizAnswer"
            {...register("quizAnswer")}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddLessonModal;
