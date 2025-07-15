import {
  getConversationsApi,
  getMessagesApi,
  createMessageApi,
  findOrCreateConversationApi,
  getChatUsersApi,
} from "../../api/admin/conversationApi";

export const getChatUsersService = async () => (await getChatUsersApi()).data;

export const getConversationsService = async () =>
  (await getConversationsApi()).data;

export const getMessagesService = async (conversationId) =>
  (await getMessagesApi(conversationId)).data;

export const createMessageService = async (messageData) =>
  (await createMessageApi(messageData)).data;

export const findOrCreateConversationService = async (recipientId) =>
  (await findOrCreateConversationApi(recipientId)).data;
