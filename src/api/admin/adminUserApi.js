import instance from "../api";
export const adminUserApi = async ({ page, limit, searchTerm }) => {
  const response = await instance.get("/admin/user", {
    params: { page, limit, search: searchTerm },
  });
  return response;
};
export const deleteUserApi = async (userId)=>{
  const response = await instance.delete(`/admin/user/${userId}`);
  return response;
}
