import instance from "../api";
export const getNotificationsApi = async () => {
  const response = await instance.get("/admin/notifications");
  return response;
};

export const markAsReadApi = async () => {
  const response = await instance.post("/admin/notifications/read");
  return response;
};
