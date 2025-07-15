import instance from "../api";

export const logManagementApi = async (formData) => {
  const response = await instance.post("/admin/log", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getTradesApi = async ({ page, limit }) => {
  const response = await instance.get("/admin/log", {
    params: { page, limit },
  });
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

export const fetchTradeStats = async () => {
  const response = await instance.get("/admin/log/stats");
  return response;
};

export const fetchCalendarStats = async (year, month) => {
  const response = await instance.get("/admin/log/calendar", {
    params: {
      year,
      month,
    },
  });
  return response;
};

export const getTradesForReportApi = async ({ startDate, endDate }) => {
  const response = await instance.get("/admin/log/report", {
    params: {
      startDate,
      endDate,
    },
  });
  return response;
};
