

import React, { useEffect, useState, useRef } from "react";
import { Trash2, Plus, MessageSquare,  } from "lucide-react";


const ChatEntryPanel = ({ chats, onSelect, onNewChat ,onDelete}) => {
  return (
    <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden max-h-[80vh]">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Chats
          </h2>
          <button
            onClick={onNewChat}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus size={16} />
            New
          </button>
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1 p-2">
        <ul className="space-y-2">
          {chats.map((chat) => (
            <li key={chat._id} className="flex items-center justify-between group">
              <button
                onClick={() => onSelect(chat)}
                className={`flex-1 text-left p-3 rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 `}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={14} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate text-sm">
                      {chat.sessionName || chat.title || "Untitled Chat"}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {chat.messages?.length || 0} messages
                    </p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => onDelete(chat._id)}
                className="ml-2 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="Delete chat"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default ChatEntryPanel;
