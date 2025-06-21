import { useMutation, useQueryClient,useQuery } from "@tanstack/react-query"
import {logManagementService,getTradeByIdService,getTradesService,updateTradeService,deleteTradeService} from "../services/admin/logManagementService"
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";

const useLogManagement=()=>{
    return useMutation(
        {
            mutationFn:logManagementService,
            mutationKey:['log-management'],
            onSuccess:(data)=>{
                toast.success(data.message || "Log Creation Successfull")
            },
            onError:(err)=>{
                toast.error(err.message || "Log Creation Failed")
            }
        }
    )
}

export const useGetTrades = () => {
    return useQuery({
        queryKey: ['trades'],
        queryFn: getTradesService
    });
};

// Hook for READING A SINGLE trade by ID
export const useGetTradeById = (tradeId) => {
    return useQuery({
        queryKey: ['trades', tradeId], // The query key includes the ID for unique caching
        queryFn: () => getTradeByIdService(tradeId),
        enabled: !!tradeId, // The query will not run until a tradeId is provided
    });
};

// Hook for UPDATING a trade
export const useUpdateTrade = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: updateTradeService, // Expects an object { tradeId, formData }
        onSuccess: (data, variables) => {
            toast.success(data.message || "Trade updated successfully!");
            // Invalidate both the list and the specific trade detail query
            queryClient.invalidateQueries({ queryKey: ['trades'] });
            queryClient.invalidateQueries({ queryKey: ['trades', variables.tradeId] });
            navigate('/trades');
        },
        onError: (err) => {
            toast.error(err.message || "Update failed");
        }
    });
};

// Hook for DELETING a trade
export const useDeleteTrade = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTradeService, // Expects a tradeId
        onSuccess: (data) => {
            toast.success(data.message || "Trade deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ['trades'] });
        },
        onError: (err) => {
            toast.error(err.message || "Delete failed");
        }
    });
};

export default useLogManagement;
