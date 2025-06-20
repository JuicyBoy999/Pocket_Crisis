import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Bot, User } from 'lucide-react';

const MindEaseChat: React.FC = () => {
  const { setCurrentScreen } = useAppContext();
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    const botReply = {
      sender: 'bot',
      text: generateBotResponse(input),
    };

    setMessages(prev => [...prev, userMessage, botReply]);
    setInput('');
  };

  const generateBotResponse = (userInput: string): string => {
    // Simple empathetic logic (you can replace this with smarter AI later)
    const lowered = userInput.toLowerCase();
    if (lowered.includes('anxious') || lowered.includes('nervous')) {
      return "It’s completely okay to feel anxious sometimes. Want to try a calming technique together?";
    } else if (lowered.includes('sad')) {
      return "I’m here for you. Do you want to talk more about what’s making you feel this way?";
    } else if (lowered.includes('alone')) {
      return "You’re not alone right now — I’m here with you. Would it help to reflect on your reasons to stay?";
    } else {
      return "I’m here and listening. Tell me more, at your pace 💛";
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
