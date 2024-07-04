import { useQuery } from "@tanstack/react-query";
import UserAPI from "../api/UserAPI";

export const useUserData = (role) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => UserAPI.getAllUsers(role),
  });
};

export const useCurrentUserData = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => UserAPI.getCurrentUser(),
  });
};

export const useUserCount = (role) => {
  return useQuery({
    queryKey: ["userCount"],
    queryFn: () => UserAPI.getUserCount(role),
  });
};

export const useUserDataById = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => UserAPI.getUserById(id),
  });
};
