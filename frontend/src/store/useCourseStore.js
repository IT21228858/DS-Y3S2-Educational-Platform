import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  courses: [],
  selectedCourse: null,
  isAddCourseModalOpen: false,
  isEditCourseModalOpen: false,
  isViewCourseModalOpen: false,
  isAddLessonModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setCourses: (courses) => set({ courses }),
  setSelectedCourse: (course) => set({ selectedCourse: course }),
  openAddCourseModal: () => set({ isAddCourseModalOpen: true }),
  closeAddCourseModal: () => set({ isAddCourseModalOpen: false }),
  openEditCourseModal: () => set({ isEditCourseModalOpen: true }),
  closeEditCourseModal: () => set({ isEditCourseModalOpen: false }),
  openViewCourseModal: () => set({ isViewCourseModalOpen: true }),
  closeViewCourseModal: () => set({ isViewCourseModalOpen: false }),
  openAddLessonModal: () => set({ isAddLessonModalOpen: true }),
  closeAddLessonModal: () => set({ isAddLessonModalOpen: false }),
});

export const useCourseStore = create(devtools(store, "courseStore"));
