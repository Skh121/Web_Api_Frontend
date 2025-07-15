import instance from "../api";

// CREATE a new goal
export const createGoalApi = async (goalData) => {
  const response = await instance.post("/admin/goals", goalData);
  return response;
};

// GET all goals with progress
export const getGoalsApi = async () => {
  const response = await instance.get("/admin/goals");
  return response;
};

// UPDATE a specific goal
export const updateGoalApi = async (goalId, updates) => {
  const response = await instance.put(`/admin/goals/${goalId}`, updates);
  return response;
};

// DELETE a goal by ID
export const deleteGoalApi = async (goalId) => {
  const response = await instance.delete(`/admin/goals/${goalId}`);
  return response;
};
