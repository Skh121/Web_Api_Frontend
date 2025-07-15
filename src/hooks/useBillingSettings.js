import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  getSubscriptionStatusService,
  getPaymentHistoryService,
  createSubscriptionService,
} from "../services/admin/billingManagementService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useGetSubscriptionStatus = () => {
  return useQuery({
    queryKey: ["subscriptionStatus"],
    queryFn: getSubscriptionStatusService,
  });
};

export const useGetPaymentHistory = () => {
  return useQuery({
    queryKey: ["paymentHistory"],
    queryFn: getPaymentHistoryService,
  });
};

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createSubscriptionService,
    onSuccess: (data) => {
      toast.success(data.message || "Subscription successful!");
      queryClient.invalidateQueries({ queryKey: ["subscriptionStatus"] });
      queryClient.invalidateQueries({ queryKey: ["paymentHistory"] });
      navigate("/settings/billing");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Subscription failed.");
    },
  });
};

