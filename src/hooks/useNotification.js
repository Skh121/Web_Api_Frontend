import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotificationsService,
  markAsReadService,
} from "../services/admin/notificationService";

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotificationsService,
  });
};
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAsReadService,
    onSuccess: () => {
      queryClient.setQueryData(
        ["notifications"],
        (oldData) => oldData?.map((n) => ({ ...n, isRead: true })) || []
      );
    },
  });
};
