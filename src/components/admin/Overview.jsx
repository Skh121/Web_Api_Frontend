import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FiBarChart2,
  FiAlertCircle,
  FiTrendingUp,
  FiDollarSign,
} from "react-icons/fi";

const Overview = ({ data }) => {
  const monthlyPerformanceData = data.monthlyPnl.map((month) => ({
    name: month.name,
    pnl: parseFloat((month.profit + month.loss).toFixed(2)),
    winRate: month.winRate,
  }));

  const COLORS = ["#10B981", "#EF4444"]; // Green for profit, red for loss

  const profitComposition = [
    { name: "Gross Profit", value: data.grossProfit },
    { name: "Gross Loss", value: data.grossLoss },
  ];

  const hasProfitData = data.grossProfit > 0 || data.grossLoss > 0;

  return (
    <div className="mt-6">
      {/* Stat Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Trades"
          value={data.totalTrades}
          change={data.totalTradesChange}
          icon={<FiBarChart2 size={20} />}
        />
        <StatCard
          title="Win Rate"
          value={`${data.winRate}%`}
          change={data.winRateChange}
          icon={<FiAlertCircle size={20} />}
        />
        <StatCard
          title="Profit Factor"
          value={
            data.profitFactor === Infinity ? "∞" : data.profitFactor
          }
          change={data.profitFactorChange}
          icon={<FiTrendingUp size={20} />}
        />
        <StatCard
          title="Expectancy"
          value={`$${data.expectancy}`}
          change={data.expectancyChange}
          icon={<FiDollarSign size={20} />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white">
            Monthly Performance Trend
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Win rate and P&L over time
          </p>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                data={monthlyPerformanceData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis dataKey="name" stroke="#A0AEC0" />
                <YAxis yAxisId="left" stroke="#A0AEC0" />
                <YAxis yAxisId="right" orientation="right" stroke="#A0AEC0" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A202C",
                    border: "1px solid #4A5568",
                  }}
                />
                <Legend iconType="plainline" />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="winRate"
                  name="Win Rate (%)"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="pnl"
                  name="P&L ($)"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl flex flex-col">
          <h3 className="text-lg font-semibold text-white">
            Profit Composition
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Gross profit vs gross loss
          </p>
          {hasProfitData ? (
            <>
              <div className="flex-grow flex items-center justify-center">
                <div style={{ width: "100%", height: 220 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={profitComposition}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={1}
                        dataKey="value"
                      >
                        {profitComposition.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => `$${value.toLocaleString()}`}
                        contentStyle={{
                          backgroundColor: "#374151",
                          border: "1px solid #4A5568",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex justify-center items-center space-x-6 mt-4">
                {profitComposition.map((entry, index) => (
                  <div
                    key={`legend-${index}`}
                    className="flex items-center space-x-2"
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></span>
                    <span className="text-sm text-gray-300">{entry.name}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center text-center text-gray-500">
              <p>
                No profit/loss data available.
                <br />
                Ensure trades are closed and P&L is computed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Stat card component
const StatCard = ({ title, value, change, icon }) => (
  <div className="bg-gray-800 p-5 rounded-xl flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <span className="text-gray-400 text-sm">{title}</span>
      <div className="text-gray-500">{icon}</div>
    </div>
    <div>
      <p className="text-3xl font-bold text-white">{value}</p>
      {change && (
        <p
          className={`text-sm ${
            change.startsWith("+") || change.startsWith("+$")
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {change} {title !== "Expectancy" && "from last month"}
        </p>
      )}
    </div>
  </div>
);

export default Overview;
