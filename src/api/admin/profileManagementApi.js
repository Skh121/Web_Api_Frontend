import instance from "../api";

export const getMyProfileApi = async () => {
  const response = await instance.get("/admin/settings/profile/me");
  return response;
};

export const updateMyProfileApi = async (formData) => {
  const response = await instance.patch("/admin/settings/profile/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
