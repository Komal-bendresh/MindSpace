
import React, { useEffect, useState, useRef } from "react";
import {
  getChatHistory,
  sendMessageToAI,
  clearChatHistory,
  startNewChat,
  deleteChat
} from "../api/auth";
import ChatEntryPanel from "../components/ChatEntryPanel";
import { toast } from "react-hot-toast";
import { Send, Trash2, Plus, MessageSquare, Bot, User, Loader2 } from "lucide-react";


const AIChatPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);
    const scriptRef = useRef(null);

  const fetchChats = async () => {
    try {
      const res = await getChatHistory();
      setChats(res || []);
      if (res?.length > 0) setSelectedChat(res[0]);
    } catch {
      toast.error("Failed to load chats");
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);
  
  useEffect(() => {

  const script = document.createElement("script");
  script.src = "https://backend.omnidim.io/web_widget.js?secret_key=3072ce0cc21d246a71fd2a2e24d0edd0";
  script.async = true;
  script.id = "omnidimension-web-widget";
  scriptRef.current = script;
  document.body.appendChild(script);

  return () => { 
    if (scriptRef.current) {
      document.body.removeChild(scriptRef.current);
    }

    const omnidiv = document.querySelector('[id^="omnidim-widget-container"]');
    if (omnidiv) omnidiv.remove();
  };
}, []);

  const handleSend = async () => {
    if (!message.trim() || !selectedChat) return;
    setLoading(true);
    const chatId = selectedChat._id;
    const userMsg = {
      role: "user",
      content: message,
      date: new Date().toISOString(),
    };
    const updated = {
      ...selectedChat,
      messages: [...selectedChat.messages, userMsg],
    };
    setSelectedChat(updated);
    setMessage("");

    try {
      const reply = await sendMessageToAI(chatId, message);
      const aiMsg = {
        role: "assistant",
        content: reply,
        date: new Date().toISOString(),
      };
      const updated2 = {
        ...updated,
        messages: [...updated.messages, aiMsg],
      };
      setSelectedChat(updated2);
      setChats((prev) =>
        prev.map((c) => (c._id === chatId ? updated2 : c))
      );
    } catch {
      toast.error("Failed to send");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (!selectedChat) return;
    try {
      await clearChatHistory(selectedChat._id);
      const updated = {
        ...selectedChat,
        messages: [],
      };
      setSelectedChat(updated);
      setChats((prev) =>
        prev.map((c) => (c._id === selectedChat._id ? updated : c))
      );
      toast.success("Chat cleared");
    } catch {
      toast.error("Failed to clear chat");
    }
  };

  const handleNewChat = async () => {
    try {
      const newChat = await startNewChat();
      setChats((prev) => [newChat, ...prev]);
      setSelectedChat(newChat);
    } catch {
      toast.error("Failed to start chat");
    }
  };
  const handleDeleteChat = async (chatId) => {
  try {
    await deleteChat(chatId);
    setChats(prev => prev.filter(chat => chat._id !== chatId));
    toast.success("Chat deleted");
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete chat");
  }
};


  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [selectedChat?.messages]);

  return (
  <div className={`min-h-screen  mt-10 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 `}>


    <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            AI Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Your intelligent conversation partner
          </p>
        </div>

   
    <div className="flex flex-col  lg:flex-row p-4 gap-4">
   
      <div className="w-full lg:w-2/3 p-4 flex flex-col">
       
          <div
              ref={chatBoxRef}
              className="flex-1 h-96 overflow-y-auto p-6 space-y-4 bg-gray-50/30 dark:bg-gray-900/30"
            >
              {!selectedChat?.messages?.length ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare size={32} className="text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No messages yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Start a conversation with your AI assistant
                  </p>
                </div>
              ) : (
                selectedChat.messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === "user" 
                        ? "bg-gradient-to-br from-green-400 to-blue-500" 
                        : "bg-gradient-to-br from-blue-400 to-purple-500"
                    }`}>
                      {msg.role === "user" ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <Bot size={16} className="text-white" />
                      )}
                    </div>
                    <div className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${
                      msg.role === "user" ? "text-right" : "text-left"
                    }`}>
                      <div
                        className={`inline-block px-4 py-3 rounded-2xl shadow-sm ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    
                    </div>
                  </div>
                ))
              )}
         
              {loading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-400 to-purple-500">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-700 px-4 py-3 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-blue-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}
        </div>

        
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex gap-3 flex-wrap" >
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !message.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
                <button
                    onClick={handleClear}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Clear
          </button>
              </div>
            </div>
          

      </div>
           <ChatEntryPanel
        chats={chats}
        onSelect={setSelectedChat}
        onNewChat={handleNewChat}
        onDelete={handleDeleteChat}
      />
    </div>
    </div>
  );
};

export default AIChatPage;