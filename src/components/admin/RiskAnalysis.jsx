import React from 'react';

// A reusable component for each metric row
const MetricRow = ({ label, value, unit = '', color = 'text-white' }) => (
  <div className="flex justify-between items-center py-2">
    <p className="text-gray-400">{label}</p>
    <p className={`font-mono ${color}`}>{value}{unit}</p>
  </div>
);

const RiskAnalysis = ({ data }) => {
  const { riskAnalysis } = data;

  return (
    <div className="mt-6 border border-gray-700 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white">Risk Analysis</h2>
      <p className="text-gray-400 mb-6">Understand your risk exposure and management</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {/* Left Column: Risk Metrics */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Risk Metrics</h3>
          <MetricRow label="Max Drawdown" value={riskAnalysis.maxDrawdown} unit="%" color="text-red-400" />
          <MetricRow label="Sharpe Ratio" value={riskAnalysis.sharpeRatio} />
          <MetricRow label="Profit Factor" value={riskAnalysis.profitFactor} />
          <MetricRow label="Recovery Factor" value={riskAnalysis.recoveryFactor} />
        </div>

        {/* Right Column: Position Sizing */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Position Sizing</h3>
          <MetricRow label="Avg Position Size" value={riskAnalysis.avgPositionSize.toLocaleString()} unit="$" />
          <MetricRow label="Max Position Size" value={riskAnalysis.maxPositionSize.toLocaleString()} unit="$" />
          <MetricRow label="Risk per Trade" value={riskAnalysis.avgRiskPerTrade.toLocaleString()} unit="$" />
          <p className="text-xs text-gray-500 mt-2 text-right">Note: Sizes shown in absolute $ amount.</p>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;