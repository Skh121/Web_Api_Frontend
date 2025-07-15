import instance from "../api";

export const changePasswordApi = async (passwordData) => {
  const response = await instance.patch(
    "/admin/settings/security/change-password",
    passwordData
  );
  return response;
};

export const exportMyDataApi = async () => {
  const response = await instance.get("/admin/settings/security/me/export");
  return response;
};

export const deleteMyAccountApi = async () => {
  const response = await instance.delete("/admin/settings/security/me");
  return response;
};
