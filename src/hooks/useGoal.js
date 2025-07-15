import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createGoalService,
  getGoalsService,
  updateGoalService,
  deleteGoalService,
} from "../services/admin/goalService";
import { toast } from "react-toastify";

// ✅ GET Goals
export const useGetGoals = () =>
  useQuery({
    queryKey: ["goals"],
    queryFn: getGoalsService,
  });

// ✅ CREATE Goal
export const useCreateGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGoalService,
    onSuccess: () => {
      toast.success("🎯 Goal created and notification sent!");
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};

// ✅ UPDATE Goal
export const useUpdateGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ goalId, updates }) => updateGoalService(goalId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};

// ✅ DELETE Goal
export const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGoalService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};
