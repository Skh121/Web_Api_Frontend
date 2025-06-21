import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { FiMoreVertical, FiArrowUp, FiArrowDown, FiPlus, FiDollarSign, FiPercent, FiTrendingUp, FiHash, FiPieChart, FiCheckCircle } from 'react-icons/fi';
import { FaArrowUp, FaArrowDown, FaRegCalendarAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';


// --- MOCK DATA (Replace with your actual data) ---

const equityData = [
    { name: 'Jan', value: 9000 },
    { name: 'Feb', value: 9500 },
    { name: 'Mar', value: 10000 },
    { name: 'Apr', value: 11500 },
    { name: 'May', value: 11000 },
    { name: 'Jun', value: 12500 },
    { name: 'Jul', value: 14000 },
    { name: 'Aug', value: 15500 },
];

const monthlyPnlData = [
    { name: 'Jan', profit: 600, loss: 0 },
    { name: 'Feb', profit: 0, loss: -300 },
    { name: 'Mar', profit: 900, loss: 0 },
    { name: 'Apr', profit: 0, loss: -1100 },
    { name: 'May', profit: 1300, loss: 0 },
    { name: 'Jun', profit: 0, loss: -500 },
    { name: 'Jul', profit: 950, loss: 0 },
    { name: 'Aug', profit: 1400, loss: 0 },
    { name: 'Sep', profit: 0, loss: -400 },
];

const assetData = [
    { name: 'Stocks', value: 45 },
    { name: 'Crypto', value: 25 },
    { name: 'Forex', value: 15 },
    { name: 'Options', value: 15 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentTrades = [
    { ticker: 'AAPL', type: 'Long', status: 'closed', pnl: 555, date: '2024-01-15' },
    { ticker: 'TSLA', type: 'Short', status: 'closed', pnl: 670, date: '2024-01-14' },
    { ticker: 'BTC/USD', type: 'Long', status: 'closed', pnl: -1300, date: '2024-01-13' },
    { ticker: 'NVDA', type: 'Long', status: 'open', pnl: 0, date: '2024-01-12' },
];


// --- Reusable Components ---

// Card component for wrapping sections
const Card = ({ children, className = '' }) => (
    <div className={`bg-gray-800 p-6 rounded-xl shadow-lg ${className}`}>
        {children}
    </div>
);

// Stat Card for the top summary
const StatCard = ({ icon, title, value, change, changeType }) => (
    <Card>
        <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-400">{title}</h3>
            <div className="text-gray-500">{icon}</div>
        </div>
        <p className="text-3xl font-bold mt-2 text-white">{value}</p>
        <div className={`flex items-center text-sm mt-2 ${changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
            {changeType === 'increase' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
            {change} from last month
        </div>
    </Card>
);

// --- Main Dashboard Component ---

const Dashboard = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen p-8 font-sans">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-gray-400">Welcome back! Here's your trading overview.</p>
                </div>
                <button className="flex items-center bg-white text-gray-900 font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition-colors">
                    <FiPlus className="mr-2" /> Log New Trade
                </button>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Stats Section */}
                <div className="lg:col-span-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard icon={<FiDollarSign size={20} />} title="Total P&L" value="+$6,200" change="+12.4%" changeType="increase" />
                        <StatCard icon={<FiCheckCircle size={20} />} title="Win Rate" value="68.5%" change="+2.1%" changeType="increase" />
                        <StatCard icon={<FiTrendingUp size={20} />} title="Avg R:R" value="2.3:1" change="+0.2" changeType="increase" />
                        <StatCard icon={<FaRegCalendarAlt size={20} />} title="Total Trades" value="147" change="+23" changeType="increase" />
                    </div>
                </div>

                {/* Equity Curve */}
                <Card className="lg:col-span-2">
                    <h2 className="text-xl font-bold mb-1">Equity Curve</h2>
                    <p className="text-gray-400 text-sm mb-4">Your account balance over time</p>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <AreaChart data={equityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                                <XAxis dataKey="name" stroke="#A0AEC0" />
                                <YAxis stroke="#A0AEC0" />
                                <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: 'none' }} />
                                <Area type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Monthly P&L */}
                <Card className="lg:col-span-2">
                    <h2 className="text-xl font-bold mb-1">Monthly P&L</h2>
                    <p className="text-gray-400 text-sm mb-4">Profit and loss breakdown by month</p>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                             <BarChart data={monthlyPnlData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                                <XAxis dataKey="name" stroke="#A0AEC0" />
                                <YAxis stroke="#A0AEC0" />
                                <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: 'none' }} cursor={{fill: 'rgba(128, 128, 128, 0.1)'}}/>
                                <Bar dataKey="profit" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="loss" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Asset Distribution */}
                <Card className="lg:col-span-2 xl:col-span-1">
                    <h2 className="text-xl font-bold mb-1">Asset Distribution</h2>
                    <p className="text-gray-400 text-sm mb-4">Breakdown by asset class</p>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                             <PieChart>
                                <Pie data={assetData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
                                    {assetData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: 'none' }} />
                                <Legend iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Recent Trades */}
                <Card className="lg:col-span-2 xl:col-span-3">
                    <h2 className="text-xl font-bold mb-1">Recent Trades</h2>
                    <p className="text-gray-400 text-sm mb-4">Your latest trading activity</p>
                    <div className="space-y-4">
                        {recentTrades.map((trade, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-900 p-4 rounded-lg">
                                <div>
                                    <span className="font-bold text-lg">{trade.ticker}</span>
                                    <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                                        <span>{trade.date}</span>
                                        <span className={`px-2 py-0.5 rounded-full ${trade.type === 'Long' ? 'bg-blue-600 text-blue-100' : 'bg-purple-600 text-purple-100'}`}>{trade.type}</span>
                                        <span className={`px-2 py-0.5 rounded-full ${trade.status === 'closed' ? 'bg-gray-600 text-gray-200' : 'bg-yellow-500 text-yellow-100'}`}>{trade.status}</span>
                                    </div>
                                </div>
                                {trade.status === 'closed' && (
                                     <div className={`font-bold text-lg ${trade.pnl > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {trade.pnl > 0 ? `+` : ''}${trade.pnl.toLocaleString()}
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