import React from 'react';

// This is the individual row for each strategy
const StrategyRow = ({ strategy }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-800 last:border-b-0">
      {/* Left side: Strategy Name and Trade Count */}
      <div>
        <p className="text-lg font-semibold text-white">{strategy.name}</p>
        <p className="text-sm text-gray-400">{strategy.tradeCount} trades</p>
      </div>

      {/* Right side: Stats */}
      <div className="flex items-center space-x-8 sm:space-x-12">
        <div className="text-right">
          <p className="text-base text-white">{strategy.winRate}%</p>
          <p className="text-xs text-gray-400">Win Rate</p>
        </div>
        <div className="text-right">
          <p className="text-base text-white">{formatCurrency(strategy.avgPnl)}</p>
          <p className="text-xs text-gray-400">Avg P&L</p>
        </div>
        <div className="text-right">
          <p className="text-base font-bold text-green-400">{formatCurrency(strategy.totalPnl)}</p>
          <p className="text-xs text-gray-400">Total P&L</p>
        </div>
      </div>
    </div>
  );
};

// This is the main component for the Strategies page
const Strategies = ({ data }) => {
  return (
    <div className="mt-6 border border-gray-700 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white">Strategy Performance Comparison</h2>
      <p className="text-gray-400 mb-4">Analyze performance across different trading strategies</p>

      <div>
        {data.strategyPerformance && data.strategyPerformance.length > 0 ? (
          data.strategyPerformance.map(strategy => (
            <StrategyRow key={strategy.name} strategy={strategy} />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No strategy data available.</p>
            <p className="text-sm">Ensure trades are assigned a 'strategy' to see metrics here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Strategies;