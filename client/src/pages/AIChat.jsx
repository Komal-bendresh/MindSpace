import React, { useState, useEffect, useRef } from "react";
import { sendMessageToAI, getChatHistory } from "../api/auth"; // adjust path
import { toast } from "react-hot-toast";

const AIChat = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const messages = await getChatHistory();
        setChatHistory(messages || []);
      } catch (err) {
        toast.error("Failed to load chat history");
      }
    };

    fetchHistory();
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const reply = await sendMessageToAI(message);
      const aiMessage = { role: "assistant", content: reply };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (err) {
      toast.error("Chat failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">AI Mental Health Assistant</h2>

      <div
        className="h-[500px] overflow-y-auto border rounded-lg p-4 bg-white dark:bg-zinc-900 dark:text-white shadow"
        ref={chatBoxRef}
      >
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`mb-3 text-sm ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-zinc-800 text-black dark:text-white"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-left text-sm text-gray-400">AI is typing...</div>}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask your mental health question..."
          className="flex-1 p-2 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;
