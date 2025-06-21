import { useQueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import { adminUserService } from "../services/admin/adminUserService";
import { toast } from "react-toastify";

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId) => adminUserService.deleteUser(userId),
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin_users"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete user.");
    },
  });
};

export default useDeleteUser;
