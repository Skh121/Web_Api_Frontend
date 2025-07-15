import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changePasswordService,
  deleteMyAccountService,
  exportMyDataService,
} from "../services/admin/securityManagementService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePasswordService,
    onSuccess: (data) => {
      toast.success(data.message || "Password updated successfully!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Password update failed");
    },
  });
};

export const useExportMyData = () => {
  return useMutation({
    mutationFn: exportMyDataService,
    onSuccess: (data) => {
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data, null, 2)
      )}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = "TradeVerse_Data_Export.json";
      link.click();

      toast.success("Your data has been exported successfully!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Data export failed.");
    },
  });
};

export const useDeleteMyAccount = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyAccountService,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.clear();
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to delete account.");
    },
  });
};
