import {
  logManagementApi,
  getTradesApi,
  getTradeByIdApi,
  updateTradeApi,
  deleteTradeApi,
  fetchTradeStats,
  fetchCalendarStats,
  getTradesForReportApi
} from "../../api/admin/logManagementApi";

export const logManagementService = async (formData) => {
  try {
    const response = await logManagementApi(formData);
    return response.data;
  } catch (e) {
    throw e.response?.data || { message: "Log Creation Failed" };
  }
};

export const getTradesService = async ({ page, limit }) => {
  try {
    const response = await getTradesApi({ page, limit });
    return response.data;
  } catch (e) {
    throw e.response?.data || { message: "Failed to fetch trades" };
  }
};

export const getTradeByIdService = async (tradeId) => {
  try {
    const response = await getTradeByIdApi(tradeId);
    return response.data;
  } catch (e) {
    throw e.response?.data || { message: "Failed to fetch trade details" };
  }
};

export const updateTradeService = async ({ tradeId, formData }) => {
  try {
    const response = await updateTradeApi(tradeId, formData);
    return response.data;
  } catch (e) {
    throw e.response?.data || { message: "Failed to update trade" };
  }
};

export const deleteTradeService = async (tradeId) => {
  try {
    const response = await deleteTradeApi(tradeId);
    return response.data;
  } catch (e) {
    throw e.response?.data || { message: "Failed to delete trade" };
  }
};

export const fetchTradeStatsService = async () => {
  const response = await fetchTradeStats();
  return response.data;
};

export const fetchCalendarStatsService = async (year,month) => {
  const response = await fetchCalendarStats(year,month);
  return response.data;
};

export const getTradesForReportService = async ({ startDate, endDate }) => {
  try {
    const response = await getTradesForReportApi({ startDate, endDate });
    return response.data;
  } catch (e) {
    throw e.response?.data || { message: "Failed to fetch report data" };
  }
};
