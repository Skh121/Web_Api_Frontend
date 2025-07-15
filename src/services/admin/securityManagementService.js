import {
  changePasswordApi,
  exportMyDataApi,
  deleteMyAccountApi,
} from "../../api/admin/securityManagementApi";

export const changePasswordService = async (passwordData) => {
  const response = await changePasswordApi(passwordData);
  return response.data;
};

export const exportMyDataService = async () => {
  const response = await exportMyDataApi();
  return response.data;
};

export const deleteMyAccountService = async () => {
  const response = await deleteMyAccountApi();
  return response.data;
};
