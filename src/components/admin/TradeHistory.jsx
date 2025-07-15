import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetTrades, useDeleteTrade } from "../../hooks/uselogManagement";
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";
import Header from "./logManagement/Header";

// A simple loading skeleton
const TableSkeleton = () => (
  <div className="animate-pulse space-y-2">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-14 bg-gray-700 rounded-md"></div>
    ))}
  </div>
);

const TradeHistory = () => {
  const [page, setPage] = useState(1);
  const limit = 5; // Number of trades per page

  const { data, isLoading, isError, error } = useGetTrades(page, limit);
  const { mutate: deleteTrade, isPending: isDeleting } = useDeleteTrade();

  const trades = data?.trades || [];
  const totalPages = data?.totalPages || 1;

  const handleDelete = (tradeId) => {
    if (
      window.confirm("Are you sure you want to delete this trade? This action cannot be undone.")
    ) {
      deleteTrade(tradeId);
    }
  };

  const calculatePL = (trade) => {
    if (!trade.exitPrice || !trade.entryPrice) return 0;
    const entryValue = trade.entryPrice * trade.positionSize;
    const exitValue = trade.exitPrice * trade.positionSize;
    const fees = trade.fees || 0;

    return trade.tradeDirection.toLowerCase() === "long"
      ? exitValue - entryValue - fees
      : entryValue - exitValue - fees;
  };

  const renderContent = () => {
    if (isLoading) return <TableSkeleton />;
    if (isError) return <p className="text-center text-red-400">Error: {error.message}</p>;

    if (!trades || trades.length === 0) {
      return (
        <div className="text-center py-10 bg-gray-800 rounded-lg">
          <p className="text-gray-400">You haven't logged any trades yet.</p>
          <Link
            to="/admin/log-trade"
            className="mt-4 inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Log Your First Trade
          </Link>
        </div>
      );
    }

    return (
      <>
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th className="px-4 py-3">Chart</th>
                <th className="px-6 py-3">Symbol</th>
                <th className="px-6 py-3">Direction</th>
                <th className="px-6 py-3">Entry Date</th>
                <th className="px-6 py-3">P/L ($)</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              {trades.map((trade) => {
                const pl = calculatePL(trade);
                const plColor = pl >= 0 ? "text-green-500" : "text-red-500";
                const directionColor =
                  trade.tradeDirection.toLowerCase() === "long"
                    ? "text-green-400"
                    : "text-red-400";

                return (
                  <tr
                    key={trade._id}
                    className="border-b border-gray-700 hover:bg-gray-700/50"
                  >
                    <td className="px-4 py-3">
                      {trade.chartScreenshotUrl ? (
                        <a
                          href={trade.chartScreenshotUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={trade.chartScreenshotUrl}
                            alt={trade.symbol}
                            className="w-20 h-12 object-cover rounded-md hover:opacity-80 transition-opacity"
                          />
                        </a>
                      ) : (
                        <div className="w-20 h-12 flex items-center justify-center bg-gray-700 rounded-md">
                          <FaImage className="text-gray-500" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{trade.symbol}</td>
                    <td className={`px-6 py-4 font-semibold ${directionColor}`}>
                      {trade.tradeDirection.toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(trade.entryDate).toLocaleDateString()}
                    </td>
                    <td className={`px-6 py-4 font-bold ${plColor}`}>
                      {pl.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-4">
                      <Link
                        to={`/log/edit/${trade._id}`}
                        className="text-blue-500 hover:text-blue-400 text-lg"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(trade._id)}
                        className="text-red-500 hover:text-red-400 text-lg disabled:opacity-50"
                        disabled={isDeleting}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-2 px-4 rounded-lg"
          >
            Previous
          </button>
          <span>
            Page {data?.currentPage || page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages || trades.length === 0}
            className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-2 px-4 rounded-lg"
          >
            Next
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <div className="mt-8">{renderContent()}</div>
      </div>
    </div>
  );
};

export default TradeHistory;
