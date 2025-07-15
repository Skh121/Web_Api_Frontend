import { useQuery } from "@tanstack/react-query";
import { fetchTradeStatsService } from "../services/admin/logManagementService";
export const useTradeStats = () => {
  const query = useQuery({
    queryKey: ["trade-stats"],
    queryFn: fetchTradeStatsService,
    keepPreviousData: true,
  });
  return {
    ...query,
  };
};
