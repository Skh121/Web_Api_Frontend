import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  getMyProfileService,
  updateMyProfileService,
} from "../services/admin/profileManagementService";
import { toast } from "react-toastify";

export const useGetMyProfile = (options = {}) => {
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfileService,
    enabled: options.enabled, 
  });
};

export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfileService,
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated successfully!");

      // Invalidate the 'myProfile' query to refetch the fresh data automatically
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Profile update failed");
    },
  });
};
