import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const location = useLocation();
  const user = location.state;

  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { text: "Hey 👋", sender: "other" },
    { text: "Hi, how can I help you?", sender: "other" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "me" }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2fb] via-[#f0f6ff] to-[#e8f4f8] flex items-center justify-center p-4">
      {/* 💎 CHAT CONTAINER */}
      <div className="w-full max-w-4xl h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* 🔥 HEADER */}

        <div className="flex items-center gap-3 px-6 py-4 border-b bg-white">
          {/* 🔙 BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-slate-100 transition"
          >
            <IoArrowBack className="text-xl text-gray-700" />
          </button>

          {/* USER INFO */}
          <img
            src={user?.profilePicture}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <h2 className="font-semibold text-gray-800">{user?.name}</h2>
            <p className="text-xs text-green-500">● Online</p>
          </div>
        </div>

        {/* 💬 CHAT AREA */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-slate-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                  msg.sender === "me"
                    ? "bg-[#1a4fba] text-white rounded-br-md"
                    : "bg-white text-gray-800 rounded-bl-md border"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* ✍️ INPUT */}
        <div className="px-6 py-4 border-t bg-white flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Type your message..."
            className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1a4fba]"
          />

          <button
            onClick={sendMessage}
            className="bg-[#1a4fba] text-white px-5 py-2.5 rounded-xl hover:bg-[#163fa0] transition font-medium shadow"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}