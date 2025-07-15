import {
  getSubscriptionStatusApi,
  getPaymentHistoryApi,
  createSubscriptionApi,
} from "../../api/admin/billingManagementApi";

export const getSubscriptionStatusService = async () => {
  const response = await getSubscriptionStatusApi();
  return response.data;
};

export const getPaymentHistoryService = async () => {
  const response = await getPaymentHistoryApi();
  return response.data;
};

export const createSubscriptionService = async (subscriptionData) => {
  const response = await createSubscriptionApi(subscriptionData);
  return response.data;
};
