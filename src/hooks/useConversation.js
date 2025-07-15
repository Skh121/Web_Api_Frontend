import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMessagesService,
  createMessageService,
  getConversationsService,
  getChatUsersService,
  findOrCreateConversationService,
} from "../services/admin/conversationService";

export const useGetConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: getConversationsService,
  });
};

export const useGetMessages = (conversationId) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessagesService(conversationId),
    enabled: !!conversationId, // Only run the query if a conversationId is provided
  });
};

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMessageService,
    onSuccess: (data) => {
      // Invalidate the query for this conversation to keep cache fresh,
      // though real-time updates are handled by Socket.IO.
      queryClient.invalidateQueries({
        queryKey: ["messages", data.conversationId],
      });
    },
  });
};
export const useGetChatUsers = () => {
  return useQuery({
    queryKey: ["chatUsers"],
    queryFn: getChatUsersService,
  });
};

export const useFindOrCreateConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: findOrCreateConversationService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};
