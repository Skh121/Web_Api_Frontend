import React, { useState } from "react";
import { useGetGoals, useCreateGoal, useDeleteGoal } from "../../hooks/useGoal";
import { format } from "date-fns";
import { toast } from "react-toastify";

const Goal = () => {
  const [formData, setFormData] = useState({
    type: "pnl",
    period: "weekly",
    targetValue: "",
    startDate: "",
    endDate: "",
  });

  const { data: goals, isLoading } = useGetGoals();
  const { mutate: createGoal } = useCreateGoal();
  const { mutate: deleteGoal } = useDeleteGoal();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createGoal(formData);
    setFormData({
      type: "pnl",
      period: "weekly",
      targetValue: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleDelete = (goalId) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      deleteGoal(goalId);
    }
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-6 mx-auto">
      <h1 className="text-3xl font-bold mb-2">🎯 Trading Goals</h1>
      <p className="mb-6 text-gray-400">
        Set, monitor, and track your P&L or Win Rate goals.
      </p>

      <div className="bg-[#1e293b] rounded-xl p-6 shadow border border-[#334155] mb-8">
        <h2 className="text-xl font-semibold mb-4">1. Set Goal</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="text-sm text-gray-400 block mb-1">
              Goal Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded bg-[#0f172a] text-white border border-[#334155] p-2"
            >
              <option value="pnl">P&L</option>
              <option value="win_rate">Win Rate</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">Period</label>
            <select
              name="period"
              value={formData.period}
              onChange={handleChange}
              className="w-full rounded bg-[#0f172a] text-white border border-[#334155] p-2"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-400 block mb-1">
              Target Value
            </label>
            <input
              type="number"
              name="targetValue"
              placeholder="e.g. 500 or 65"
              value={formData.targetValue}
              onChange={handleChange}
              className="w-full rounded bg-[#0f172a] text-white border border-[#334155] p-2"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full rounded bg-[#0f172a] text-white border border-[#334155] p-2"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full rounded bg-[#0f172a] text-white border border-[#334155] p-2"
              required
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-2"
            >
              🎯 Save Goal
            </button>
          </div>
        </form>
      </div>

      <div className="bg-[#1e293b] rounded-xl p-6 shadow border border-[#334155]">
        <h2 className="text-xl font-semibold mb-4">2. Goal Overview</h2>

        {isLoading ? (
          <p className="text-gray-400">Loading...</p>
        ) : goals?.length === 0 ? (
          <p className="text-gray-400">No goals set yet.</p>
        ) : (
          <ul className="space-y-4">
            {goals.map((goal) => (
              <li
                key={goal._id}
                className="bg-[#0f172a] border border-[#334155] rounded p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-medium text-white">
                      {goal.type === "pnl" ? "P&L Goal" : "Win Rate Goal"} (
                      {goal.period})
                    </p>
                    <p className="text-sm text-gray-400">
                      {format(new Date(goal.startDate), "MMM d, yyyy")} →{" "}
                      {format(new Date(goal.endDate), "MMM d, yyyy")}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(goal._id)}
                    className="text-red-400 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>

                <div className="text-sm mb-2">
                  🎯 Target:{" "}
                  <span className="text-white font-semibold">
                    {goal.targetValue}
                  </span>
                </div>

                <div className="w-full bg-gray-700 rounded h-2">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Progress: {goal.progress}%{" "}
                  {goal.achieved && (
                    <span className="text-green-400 font-semibold ml-2">
                      ✅ Achieved!
                    </span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Goal;
