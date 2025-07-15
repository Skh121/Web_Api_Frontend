import instance from "../api";

export const getSubscriptionStatusApi = async () => {
  const response = await instance.get("/admin/settings/billing/status");
  return response;
};

export const getPaymentHistoryApi = async () => {
  const response = await instance.get("/admin/settings/billing/history");
  return response;
};

export const createSubscriptionApi = async (subscriptionData) => {
  const response = await instance.post(
    "/admin/settings/billing/subscribe",
    subscriptionData
  );
  return response;
};
