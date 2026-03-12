// components/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  MdChat,
  MdClose,
  MdSend,
  MdSmartToy,
  MdPerson,
  MdHelp,
  MdWork,
  MdSchool,
  MdAssignment,
  MdArrowBack,
  MdRefresh,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "👋 Hi there! I'm InternBot. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const quickReplies = [
    { icon: <MdWork />, text: "Find internships" },
    { icon: <MdSchool />, text: "Application tips" },
    { icon: <MdAssignment />, text: "Resume help" },
    { icon: <MdHelp />, text: "FAQ" },
  ];

  const knowledgeBase = {
    "hello": "Hi there! How can I assist you with your internship journey today?",
    "hi": "Hello! Looking for internship help? I'm here for you!",
    "internship": "You can browse hundreds of internships! Would you like to see available positions in tech, marketing, finance, or design?",
    "apply": "To apply for internships, create a profile, complete your information, and click 'Apply' on any position. Need help with your profile?",
    "profile": "A strong profile includes your education, skills, experience, and a professional photo. I can guide you through each section!",
    "resume": "Need resume help? We have templates and tips. Would you like to see our resume builder?",
    "interview": "Interview prep is key! We have guides, practice questions, and tips from recruiters. Want to explore?",
    "account": "Having account issues? You can reset your password or update settings in your profile. Need specific help?",
    "price": "InternConnect is free for students! Employers have paid plans starting at $99 per posting.",
    "contact": "You can reach our support team at support@internconnect.com or use the contact form in the help section.",
    "faq": "Check our FAQ page for common questions about applications, profiles, and more!",
    "thank": "You're welcome! Anything else I can help with?",
    "bye": "Good luck with your internship search! Come back anytime 👋"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const findBestMatch = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Check for exact matches
    for (const [key, response] of Object.entries(knowledgeBase)) {
      if (input.includes(key)) {
        return response;
      }
    }

    // Check for partial matches
    if (input.includes("how to") || input.includes("how do i")) return knowledgeBase["help"];
    if (input.includes("job") || input.includes("position")) return knowledgeBase["internship"];
    if (input.includes("sign up") || input.includes("register")) return knowledgeBase["account"];
    if (input.includes("cost") || input.includes("free")) return knowledgeBase["price"];
    if (input.includes("help") || input.includes("support")) return knowledgeBase["contact"];

    return null;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = findBestMatch(inputMessage) || 
        "I'm not sure about that. Would you like to speak with a human support agent or check our FAQ page?";
      
      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: !findBestMatch(inputMessage) ? ["Contact Support", "View FAQ", "Browse Internships"] : null
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (text) => {
    setInputMessage(text);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleSuggestionClick = (suggestion) => {
    switch(suggestion) {
      case "Contact Support":
        navigate("/contact");
        setIsOpen(false);
        break;
      case "View FAQ":
        navigate("/faq");
        setIsOpen(false);
        break;
      case "Browse Internships":
        navigate("/internships");
        setIsOpen(false);
        break;
      default:
        handleQuickReply(suggestion);
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      type: "bot",
      text: "👋 Hi there! I'm InternBot. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 w-14 h-14 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center z-50 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <MdChat size={24} />
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-6 left-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 z-50 border border-gray-200 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-900 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <MdSmartToy size={20} />
            </div>
            <div>
              <h3 className="font-semibold">InternBot</h3>
              <p className="text-xs text-gray-300">Online • Usually replies instantly</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
              title="New chat"
            >
              <MdRefresh size={18} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
            >
              <MdClose size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 mb-4 ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.type === "bot" && (
                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MdSmartToy size={16} className="text-gray-600" />
                </div>
              )}
              <div className={`max-w-[80%] ${
                message.type === "user" ? "order-1" : "order-2"
              }`}>
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.type === "user"
                      ? "bg-gray-900 text-white rounded-br-none"
                      : "bg-white border border-gray-200 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <div className={`flex items-center gap-2 mt-1 text-xs text-gray-400 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}>
                  <span>{message.timestamp}</span>
                  {message.type === "bot" && <span>• InternBot</span>}
                </div>

                {/* Suggestions */}
                {message.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:bg-gray-50 transition"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {message.type === "user" && (
                <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MdPerson size={16} className="text-gray-600" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <MdSmartToy size={16} className="text-gray-600" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickReplies.map((reply, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickReply(reply.text)}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs whitespace-nowrap hover:border-gray-300 hover:bg-gray-50 transition"
              >
                <span className="text-gray-500">{reply.icon}</span>
                {reply.text}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100 bg-white rounded-b-2xl">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className={`px-4 py-2 rounded-lg flex items-center justify-center transition ${
                inputMessage.trim()
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <MdSend size={18} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Powered by InternConnect • 
            <button onClick={() => navigate("/privacy")} className="hover:underline ml-1">
              Privacy
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Chatbot;