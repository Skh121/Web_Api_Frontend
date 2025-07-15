import React, { useState, useEffect, useRef, useContext } from "react";
import io from "socket.io-client";
import { AuthContext } from "../../auth/AuthProvider";
import {
  useGetConversations,
  useGetMessages,
  useCreateMessage,
  useFindOrCreateConversation,
  useGetChatUsers,
} from "../../hooks/useConversation";
import { useGetMyProfile } from "../../hooks/useProfileSettings";
import { FiMessageSquare, FiX, FiPlus } from "react-icons/fi";

const socket = io.connect("http://localhost:5050");

const NewChatModal = ({ users, onSelectUser, onClose, isLoading }) => (
  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          Start a New Conversation
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition"
        >
          <FiX />
        </button>
      </div>
      <ul className="space-y-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
        {isLoading && <li className="p-3 text-gray-400">Loading users...</li>}
        {users?.map((user) => (
          <li
            key={user._id}
            onClick={() => onSelectUser(user._id)}
            className="p-3 hover:bg-gray-700 rounded-md cursor-pointer flex justify-between items-center"
          >
            <span>{user.fullName}</span>
            <span className="text-xs uppercase bg-gray-600 px-2 py-1 rounded-full">
              {user.role}
            </span>
          </li>
        ))}
        {!isLoading && users?.length === 0 && (
          <li className="p-3 text-gray-500 text-center">
            No users available to chat.
          </li>
        )}
      </ul>
    </div>
  </div>
);

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messageEndRef = useRef(null);

  const { data: profileData } = useGetMyProfile();
  const { data: conversations, isLoading: isLoadingConversations } =
    useGetConversations();
  const { data: chatUsers, isLoading: isLoadingChatUsers } = useGetChatUsers();
  const { data: messageHistory, isLoading: isLoadingMessages } = useGetMessages(
    currentConversation?._id
  );
  const { mutate: createMessage } = useCreateMessage();
  const { mutate: findOrCreateChat } = useFindOrCreateConversation();

  useEffect(() => {
    if (messageHistory) setMessages(messageHistory);
  }, [messageHistory]);

  useEffect(() => {
    if (currentConversation)
      socket.emit("join_conversation", currentConversation._id);

    const handleReceiveMessage = (data) => {
      if (data.conversationId === currentConversation?._id) {
        setMessages((list) => [...list, data]);
      }
    };

    socket.on("receive_message", handleReceiveMessage);
    return () => socket.off("receive_message", handleReceiveMessage);
  }, [currentConversation]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectUserToChat = (recipientId) => {
    findOrCreateChat(recipientId, {
      onSuccess: (conversation) => {
        setCurrentConversation(conversation);
        setIsModalOpen(false);
      },
    });
  };

  const sendMessage = () => {
    if ((!newMessage.trim() && !imageFile) || !currentConversation || !user)
      return;

    const recipient = currentConversation.participants.find(
      (p) => p._id !== user._id
    );
    if (!recipient) return;

    const formData = new FormData();
    formData.append("conversationId", currentConversation._id);
    formData.append("recipient", recipient._id);
    formData.append("text", newMessage);
    if (imageFile) formData.append("file", imageFile);

    const tempMessage = {
      conversationId: currentConversation._id,
      text: newMessage,
      sender: user._id,
      recipient: recipient._id,
      createdAt: new Date().toISOString(),
      file: imageFile ? URL.createObjectURL(imageFile) : null,
    };

    setMessages((list) => [...list, tempMessage]);
    setNewMessage("");
    setImageFile(null);
    socket.emit("send_message", tempMessage);
    createMessage(formData);
  };

  const otherParticipant =
    currentConversation &&
    currentConversation.participants.find(
      (p) => String(p._id) !== String(user?._id)
    );

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans relative">
      {isModalOpen && (
        <NewChatModal
          users={chatUsers}
          isLoading={isLoadingChatUsers}
          onSelectUser={handleSelectUserToChat}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 text-xl font-semibold border-b border-gray-700">
          Conversations
        </div>
        <ul className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-700">
          {isLoadingConversations ? (
            <p className="p-4 text-gray-400 text-sm">Loading chats...</p>
          ) : (
            conversations?.map((convo) => {
              const participant = convo.participants.find(
                (p) => String(p._id) !== String(user?._id)
              );
              return (
                <li
                  key={convo._id}
                  onClick={() => setCurrentConversation(convo)}
                  className={`p-4 hover:bg-gray-700 cursor-pointer transition-colors ${
                    currentConversation?._id === convo._id
                      ? "bg-blue-600/20"
                      : ""
                  }`}
                >
                  {participant?.fullName || "Support Chat"}
                </li>
              );
            })
          )}
        </ul>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition"
          >
            <FiMessageSquare className="text-lg" />
            <span className="text-sm">New Conversation</span>
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-full md:w-3/4 flex flex-col bg-gray-900">
        {/* Chat header */}
        {currentConversation && (
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center gap-3">
              {otherParticipant?.avatar ? (
                <img
                  src={otherParticipant.avatar}
                  alt="User"
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  {otherParticipant?.fullName?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <div className="text-sm font-semibold">
                {otherParticipant?.fullName}
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-grow p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 space-y-4">
          {!currentConversation && (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              Select a conversation or start a new one
            </div>
          )}
          {isLoadingMessages && (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              Loading messages...
            </div>
          )}
          {currentConversation &&
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === user?._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl shadow text-sm ${
                    msg.sender === user?._id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {msg.text && <p>{msg.text}</p>}
                  {msg.file && (
                    <img
                      src={msg.file}
                      alt="Sent"
                      className="mt-2 rounded-lg max-w-full max-h-60 object-cover"
                    />
                  )}
                </div>
              </div>
            ))}
          <div ref={messageEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-gray-800 border-t border-gray-700 flex flex-col gap-2">
          {/* Image Preview */}
          {imageFile && (
            <div className="relative w-32 h-32">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="preview"
                className="w-full h-full object-cover rounded-md border border-gray-600"
              />
              <button
                onClick={() => setImageFile(null)}
                className="absolute top-0 right-0 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
                title="Remove"
              >
                <FiX />
              </button>
            </div>
          )}

          {/* Chat input area */}
          <div className="flex items-center gap-4">
            {/* File Upload Icon */}
            <div className="relative">
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="hidden"
              />
              <label htmlFor="file-upload">
                <div className="cursor-pointer p-2 rounded-full hover:bg-gray-700 transition">
                  <FiPlus className="text-white text-xl" />
                </div>
              </label>
            </div>

            {/* Text Input */}
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={
                currentConversation
                  ? "Type a message..."
                  : "Select a conversation to start"
              }
              className="flex-grow bg-gray-700 text-white placeholder-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              disabled={!currentConversation || isLoadingMessages}
            />

            {/* Send Button */}
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50"
              disabled={!currentConversation || isLoadingMessages}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
