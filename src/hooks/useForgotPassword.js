import { toast } from "react-toastify";
import {
  requestResetPasswordService,
  resetPasswordService,
} from "../services/authService";
import { useMutation } from "@tanstack/react-query";

export const useRequestResetPassword = () => {
  return useMutation({
    mutationFn: requestResetPasswordService,
    onSuccess: (data) => {
      toast.success(data.message || "Request reset password successful");
    },
    onError: (error) => {
      toast.error(error.message || "Request reset password failed");
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ data, token }) => resetPasswordService(data, token),
    onSuccess: (data) => {
      toast.success(data.message || "Reset password successful");
    },
    onError: (error) => {
      toast.error(error.message || "Reset password failed");
    },
  });
};