import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from "date-fns";
import { FiChevronLeft, FiChevronRight, FiGrid } from "react-icons/fi";
import { useCalendarStats } from "../../hooks/useCalendarStats";

// A helper function to format P&L values
const formatCurrency = (value) => {
  if (typeof value !== "number" || isNaN(value)) {
    return "$0.00";
  }
  const absValue = Math.abs(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: absValue >= 1000 ? "compact" : "standard",
    minimumFractionDigits: absValue >= 1000 ? 1 : 2,
    maximumFractionDigits: absValue >= 1000 ? 1 : 2,
  }).format(value);
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 2. Use the hook to fetch data. It handles loading, caching, and state automatically.
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month as 1-12 for the API
  const { data: calendarData, isLoading } = useCalendarStats({ year, month });

  // --- All date logic for building the grid remains the same ---
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const goToPreviousMonth = () => {
  setCurrentDate(prevDate => {
    const newDate = new Date(prevDate); // 1. Create a copy of the old date
    newDate.setMonth(newDate.getMonth() - 1); // 2. Modify the copy
    return newDate; // 3. Return the new, modified date
  });
};

const goToNextMonth = () => {
  setCurrentDate(prevDate => {
    const newDate = new Date(prevDate); // 1. Create a copy
    newDate.setMonth(newDate.getMonth() + 1); // 2. Modify the copy
    return newDate; // 3. Return the new date
  });
};

  return (
    <div className="mt-6 border border-gray-700 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white">Trading Calendar</h2>
      <p className="text-gray-400 mb-6">
        Visual representation of your trading activity
      </p>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 bg-gray-800 rounded-md hover:bg-gray-600"
          >
            <FiChevronLeft />
          </button>
          <span className="text-lg font-semibold w-32 text-center">
            {format(currentDate, "MMMM yyyy")}
          </span>
          <button
            onClick={goToNextMonth}
            className="p-2 bg-gray-800 rounded-md hover:bg-gray-600"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* 3. The JSX for rendering the grid can now be simpler */}
      {isLoading && (
        <div className="text-center py-20 text-gray-500">
          Loading Calendar...
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center font-bold text-xs text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
          {days.map((day, index) => {
            const dayNumber = format(day, "d");
            // Use the data from the hook. Default to null if data hasn't arrived.
            const dataForDay = calendarData ? calendarData[dayNumber] : null;
            const isCurrentMonth = isSameMonth(day, monthStart);

            if (!isCurrentMonth) {
              return (
                <div key={index} className="rounded-md bg-gray-800/30"></div>
              );
            }

            const isWin = dataForDay && dataForDay.totalPnl > 0;
            const isLoss = dataForDay && dataForDay.totalPnl < 0;

            return (
              <div
                key={index}
                className={`rounded-md p-2 h-32 flex flex-col relative transition-colors
                                ${
                                  isWin
                                    ? "bg-green-900/40 border-green-700/50"
                                    : ""
                                }
                                ${
                                  isLoss
                                    ? "bg-red-900/40 border-red-700/50"
                                    : ""
                                }
                                ${!dataForDay ? "bg-gray-800/60" : "border"}
                            `}
              >
                <span
                  className={`font-bold text-xs self-end ${
                    isToday(day)
                      ? "bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      : ""
                  }`}
                >
                  {dayNumber}
                </span>

                {dataForDay && (
                  <div className="flex-grow flex flex-col justify-end text-left mt-1">
                    <p
                      className={`font-bold text-lg ${
                        isWin ? "text-green-300" : "text-red-300"
                      }`}
                    >
                      {formatCurrency(dataForDay.totalPnl)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {dataForDay.tradeCount} trade
                      {dataForDay.tradeCount > 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-gray-500">
                      {dataForDay.rMultiple}R, {dataForDay.winRate}%
                    </p>
                    <FiGrid className="absolute top-2 left-2 text-gray-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Calendar;
