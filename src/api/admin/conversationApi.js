import instance from "../api";

export const getChatUsersApi = async () =>
  await instance.get("/admin/conversations/users");

export const getConversationsApi = async () => {
  const response = await instance.get("/admin/conversations");
  return response;
};

export const getMessagesApi = async (conversationId) => {
  const response = await instance.get(
    `/admin/conversations/${conversationId}/messages`
  );
  return response;
};

export const createMessageApi = async (messageData) => {
  const response = await instance.post(
    "/admin/conversations/messages",
    messageData,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  );
  return response;
};

export const findOrCreateConversationApi = async (recipientId) =>
  await instance.post("/admin/conversations/find-or-create", { recipientId });
