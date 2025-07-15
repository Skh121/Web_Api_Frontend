import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FiDollarSign, FiTrendingUp, FiCheckCircle } from "react-icons/fi";
import { FaArrowUp, FaArrowDown, FaRegCalendarAlt } from "react-icons/fa";
import { useTradeStats } from "../../hooks/useTradeStats";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Card = ({ children, className = "" }) => (
  <div className={`bg-gray-800 p-6 rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);

const StatCard = ({ icon, title, value, change, changeType }) => (
  <Card>
    <div className="flex justify-between items-start">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <div className="text-gray-500">{icon}</div>
    </div>
    <p className="text-3xl font-bold mt-2 text-white">{value}</p>
    <div
      className={`flex items-center text-sm mt-2 ${
        changeType === "increase" ? "text-green-400" : "text-red-400"
      }`}
    >
      {changeType === "increase" ? (
        <FaArrowUp className="mr-1" />
      ) : (
        <FaArrowDown className="mr-1" />
      )}
      {change} from last month
    </div>
  </Card>
);

const Dashboard = () => {
  const { data, isLoading } = useTradeStats();

  if (isLoading || !data) {
    return <div className="text-white text-center p-10">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-400">
            Welcome back! Here's your trading overview.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={<FiDollarSign size={20} />}
              title="Total P&L"
              value={`$${data.totalPL.toLocaleString()}`}
              change={data.totalPLChange}
              changeType={
                data.totalPLChange.startsWith("+") ? "increase" : "decrease"
              }
            />
            <StatCard
              icon={<FiCheckCircle size={20} />}
              title="Win Rate"
              value={`${data.winRate.toFixed(2)}%`}
              change={data.winRateChange}
              changeType={
                data.winRateChange.startsWith("+") ? "increase" : "decrease"
              }
            />
            <StatCard
              icon={<FiTrendingUp size={20} />}
              title="Profit Factor"
              value={
                data.profitFactor === Infinity
                  ? "∞"
                  : data.profitFactor
              }
              change={data.profitFactorChange}
              changeType={
                data.profitFactorChange.startsWith("+")
                  ? "increase"
                  : "decrease"
              }
            />
            <StatCard
              icon={<FaRegCalendarAlt size={20} />}
              title="Total Trades"
              value={data.totalTrades}
              change={data.totalTradesChange}
              changeType={
                data.totalTradesChange.startsWith("+") ? "increase" : "decrease"
              }
            />
          </div>
        </div>

        <Card className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-1">Equity Curve</h2>
          <p className="text-gray-400 text-sm mb-4">
            Your account balance over time
          </p>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart
                data={data.equityCurve}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis dataKey="name" stroke="#A0AEC0" />
                <YAxis stroke="#A0AEC0" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#2D3748", border: "none" }}
                />
                <Area
                  type="natural"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUv)"
                  isAnimationActive={true}
                  animationDuration={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-1">Monthly P&L</h2>
          <p className="text-gray-400 text-sm mb-4">
            Profit and loss breakdown by month
          </p>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={data.monthlyPnl}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis dataKey="name" stroke="#A0AEC0" />
                <YAxis stroke="#A0AEC0" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#2D3748", border: "none" }}
                  cursor={{ fill: "rgba(128, 128, 128, 0.1)" }}
                />
                <Bar dataKey="profit" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="loss" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2 xl:col-span-1">
          <h2 className="text-xl font-bold mb-1">Asset Distribution</h2>
          <p className="text-gray-400 text-sm mb-4">Breakdown by asset class</p>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data.assetDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                >
                  {data.assetDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#2D3748", border: "none" }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2 xl:col-span-3">
          <h2 className="text-xl font-bold mb-1">Recent Trades</h2>
          <p className="text-gray-400 text-sm mb-4">
            Your latest trading activity
          </p>
          <div className="space-y-4">
            {data.recentTrades.map((trade, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-900 p-4 rounded-lg"
              >
                <div>
                  <span className="font-bold text-lg">{trade.ticker}</span>
                  <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                    <span>{new Date(trade.date).toLocaleDateString()}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        trade.type === "Long"
                          ? "bg-blue-600 text-blue-100"
                          : "bg-purple-600 text-purple-100"
                      }`}
                    >
                      {trade.type}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        trade.status === "closed"
                          ? "bg-gray-600 text-gray-200"
                          : "bg-yellow-500 text-yellow-100"
                      }`}
                    >
                      {trade.status}
                    </span>
                  </div>
                </div>
                {trade.status === "closed" && (
                  <div
                    className={`font-bold text-lg ${
                      trade.pnl > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {trade.pnl > 0 ? "+" : ""}${trade.pnl.toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
