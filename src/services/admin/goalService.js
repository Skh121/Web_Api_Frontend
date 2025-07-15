import {
  createGoalApi,
  getGoalsApi,
  updateGoalApi,
  deleteGoalApi,
} from "../../api/admin/goalApi";

export const createGoalService = async (goalData) => {
  const response = await createGoalApi(goalData);
  return response.data;
};

export const getGoalsService = async () => {
  const response = await getGoalsApi();
  return response.data;
};

export const updateGoalService = async (goalId, updates) => {
  const response = await updateGoalApi(goalId, updates);
  return response.data;
};

export const deleteGoalService = async (goalId) => {
  const response = await deleteGoalApi(goalId);
  return response.data;
};
