import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { getMindEaseReply } from '../../api'; // ✅ new import

const MindEaseChat: React.FC = () => {
  const { setCurrentScreen } = useAppContext();
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // ✅ async sendMessage using real AI
  const sendMessage = async () => {
    const trimmed = input.trim();
    if (trimmed === '') return;

    const userMessage = { sender: 'user' as const, text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const reply = await getMindEaseReply(trimmed);
      const botReply = { sender: 'bot' as const, text: reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      const errorReply = {
        sender: 'bot' as const,
        text: "Oops! I'm having trouble responding right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errorReply]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen p-4 bg-white">
      <div className="flex items-center mb-4">
        <button
          onClick={() => setCurrentScreen('welcome')}
          className="text-gray-600 hover:text-gray-800 mr-4"
        >
          ← Back
        </button>
        <h1 className="text-xl font-semibold text-gray-800">💬 Chat with MindEase</h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 px-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <textarea
          className="flex-1 border p-2 rounded text-gray-800"
          placeholder="Type your thoughts..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MindEaseChat;
