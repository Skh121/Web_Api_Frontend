import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { useGenerateReport } from "../../hooks/uselogManagement"; // Adjust path if needed
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import { format } from "date-fns";

// Reusable styled input component
const Input = (props) => (
  <input
    {...props}
    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
  />
);

// Helper to calculate P&L using the correct monetary position size formula
const getPnl = (trade) => {
  if (!trade.exitPrice || !trade.entryPrice) return 0;

  const entryValue = trade.entryPrice * trade.positionSize;
  const exitValue = trade.exitPrice * trade.positionSize;
  const fees = trade.fees || 0;

  return trade.tradeDirection.toLowerCase() === "long"
    ? exitValue - entryValue - fees
    : entryValue - exitValue - fees;
};

// Helper to generate a PDF Trade Log
const generatePdfTradeLog = (trades, startDate, endDate) => {
  const doc = new jsPDF();
  const tableColumn = [
    "Date",
    "Symbol",
    "Direction",
    "Entry",
    "Exit",
    "P&L ($)",
  ];
  const tableRows = [];

  trades.forEach((trade) => {
    const tradeData = [
      format(new Date(trade.exitDate), "yyyy-MM-dd"),
      trade.symbol,
      trade.tradeDirection,
      trade.entryPrice,
      trade.exitPrice,
      getPnl(trade).toFixed(2),
    ];
    tableRows.push(tradeData);
  });

  doc.text(
    `Detailed Trade Log (${format(new Date(startDate), "PP")} - ${format(
      new Date(endDate),
      "PP"
    )})`,
    14,
    15
  );
  autoTable(doc, { head: [tableColumn], body: tableRows, startY: 25 });
  doc.save("trade_log.pdf");
};

// Helper to generate a PDF P&L Statement
const generatePnlStatementPdf = (trades, startDate, endDate) => {
  const doc = new jsPDF();
  const grossProfit = trades
    .filter((t) => getPnl(t) > 0)
    .reduce((sum, t) => sum + getPnl(t), 0);
  const grossLoss = trades
    .filter((t) => getPnl(t) < 0)
    .reduce((sum, t) => sum + getPnl(t), 0);
  const totalPnl = grossProfit + grossLoss;

  doc.setFontSize(18);
  doc.text("Profit & Loss Statement", 14, 22);
  doc.setFontSize(12);
  doc.text(
    `For the period: ${format(new Date(startDate), "PP")} to ${format(
      new Date(endDate),
      "PP"
    )}`,
    14,
    30
  );

  autoTable(doc, {
    startY: 40,
    head: [["Metric", "Value"]],
    body: [
      ["Gross Profit", `$${grossProfit.toFixed(2)}`],
      ["Gross Loss", `$${grossLoss.toFixed(2)}`],
      ["Total Trades", trades.length],
    ],
    foot: [["Net P&L", `$${totalPnl.toFixed(2)}`]],
    theme: "striped",
  });
  doc.save("pnl_statement.pdf");
};

// Helper function to generate a CSV Trade Log
const generateCsv = (trades) => {
  const csvData = trades.map((trade) => ({
    Date: format(new Date(trade.exitDate), "yyyy-MM-dd"),
    Symbol: trade.symbol,
    Direction: trade.tradeDirection,
    Entry: trade.entryPrice,
    Exit: trade.exitPrice,
    "P&L ($)": getPnl(trade).toFixed(2),
    Tags: trade.tags.join(", "),
  }));

  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "trade_report.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const ReportsPage = () => {
  const [reportType, setReportType] = useState("pnl_statement");
  const [formatType, setFormatType] = useState("pdf");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { mutate: generateReport, isLoading: isGenerating } =
    useGenerateReport();

  const handleGenerateReport = (e) => {
    e.preventDefault();

    // Call the mutation hook to fetch data from the backend
    generateReport(
      { startDate, endDate },
      {
        onSuccess: (trades) => {
          if (!trades || trades.length === 0) {
            alert("No trades found for the selected date range.");
            return;
          }

          // Once data is fetched, generate the file based on user selection
          if (formatType === "pdf") {
            if (reportType === "trade_log") {
              generatePdfTradeLog(trades, startDate, endDate);
            } else {
              generatePnlStatementPdf(trades, startDate, endDate);
            }
          } else {
            // CSV format
            generateCsv(trades);
          }
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Reports</h1>
          <p className="text-gray-400">
            Generate and download detailed summaries of your trading activity.
          </p>
        </header>

        <form
          onSubmit={handleGenerateReport}
          className="bg-gray-800 rounded-xl p-8 border border-gray-700"
        >
          <div className="space-y-8">
            {/* Report Type Selection */}
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                1. Select Report Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setReportType("pnl_statement")}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    reportType === "pnl_statement"
                      ? "bg-blue-500/10 border-blue-500"
                      : "bg-gray-700/50 border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <h4 className="font-bold text-white">P&L Statement</h4>
                  <p className="text-sm text-gray-400">
                    A summary of your profits, losses, and net performance.
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setReportType("trade_log")}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    reportType === "trade_log"
                      ? "bg-blue-500/10 border-blue-500"
                      : "bg-gray-700/50 border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <h4 className="font-bold text-white">Detailed Trade Log</h4>
                  <p className="text-sm text-gray-400">
                    A complete export of all individual trades in the period.
                  </p>
                </button>
              </div>
            </div>

            {/* Date Range Selection */}
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                2. Select Date Range
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    End Date
                  </label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Format Selection */}
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                3. Choose Format
              </label>
              <div className="flex items-center space-x-4">
                <label
                  className={`flex items-center space-x-2 cursor-pointer p-3 rounded-md ${
                    formatType === "pdf" ? "bg-gray-700" : "bg-gray-900/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value="pdf"
                    checked={formatType === "pdf"}
                    onChange={() => setFormatType("pdf")}
                    className="form-radio bg-gray-600 text-blue-500"
                  />
                  <span>PDF</span>
                </label>
                <label
                  className={`flex items-center space-x-2 cursor-pointer p-3 rounded-md ${
                    formatType === "csv" ? "bg-gray-700" : "bg-gray-900/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value="csv"
                    checked={formatType === "csv"}
                    onChange={() => setFormatType("csv")}
                    className="form-radio bg-gray-600 text-blue-500"
                  />
                  <span>CSV</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-10 pt-6 border-t border-gray-700">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50 transition-colors"
            >
              <FiDownload />
              <span>{isGenerating ? "Generating..." : "Generate Report"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportsPage;
