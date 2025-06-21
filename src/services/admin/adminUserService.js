import { adminUserApi, deleteUserApi } from "../../api/admin/adminUserApi";

export const adminUserService = {
  getUsers: async ({ page, limit, searchTerm }) => {
    const response = await adminUserApi({ page, limit, searchTerm });
    return response.data;
  },
  deleteUser: async (userId) => {
    const response = await deleteUserApi(userId);
    return response.data;
  },
};
