import instance from "../api";

export const logManagementApi = async (formData) => {
  const response = await instance.post("/admin/log", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getTradesApi = async () => {
  const response = await instance.get("/admin/log");
  return response;
};

export const getTradeByIdApi = async (tradeId) => {
  const response = await instance.get(`/admin/log/${tradeId}`);
  return response;
};

export const updateTradeApi = async (tradeId, formData) => {
  const response = await instance.patch(`/admin/log/${tradeId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const deleteTradeApi = async (tradeId) => {
  const response = await instance.delete(`/admin/log/${tradeId}`);
  return response;
};
