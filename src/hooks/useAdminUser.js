import { useQuery } from "@tanstack/react-query";
import { adminUserService } from "../services/admin/adminUserService";
export const useAdminUser = (page, limit = 5,searchTerm) => {
  const query = useQuery({
    queryKey: ["admin_users", page,searchTerm],
    queryFn: () => adminUserService.getUsers({ page, limit,searchTerm }),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};
