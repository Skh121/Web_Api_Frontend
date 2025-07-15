import { useQuery } from "@tanstack/react-query";
import { fetchCalendarStatsService } from "../services/admin/logManagementService";

/**
 * Hook for fetching calendar statistics for a given year and month.
 * @param {object} params - The parameters for the query.
 * @param {number} params.year - The year to fetch data for.
 * @param {number} params.month - The month to fetch data for (1-12).
 */
export const useCalendarStats = ({ year, month }) => {
  return useQuery({
    queryKey: ["calendarStats", year, month],
    queryFn: () => fetchCalendarStatsService(year, month),
    enabled: !!year && !!month,
    keepPreviousData: true,
  });
};
