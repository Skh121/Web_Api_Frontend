import {
  getMyProfileApi,
  updateMyProfileApi,
} from "../../api/admin/profileManagementApi";

export const getMyProfileService = async () => {
  const response = await getMyProfileApi();
  return response.data;
};

export const updateMyProfileService = async (formData) => {
  const response = await updateMyProfileApi(formData);
  return response.data;
};
