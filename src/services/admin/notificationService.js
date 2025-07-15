import {
  getNotificationsApi,
  markAsReadApi,
} from "../../api/admin/notificationApi";

export const getNotificationsService = async () => {
  const response = await getNotificationsApi();
  return response.data;
};

export const markAsReadService = async () => {
  const response = await markAsReadApi();
  return response.data;
};
