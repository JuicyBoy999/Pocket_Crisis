import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Button from '../ui/Button';

const MindEaseChat: React.FC = () => {
  const { setCurrentScreen } = useAppContext();
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot reply
    const botReply = {
      role: 'bot',
      text: `I'm here for you. You said: "${input}"`, // Replace this with real AI logic later
    };
    setMessages(prev => [...prev, botReply]);
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex items-center mb-4">
        <button onClick={() => setCurrentScreen('welcome')} className="text-xl mr-2">←</button>
        <h2 className="text-xl font-bold text-gray-800">💬 Chat with MindEase</h2>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded max-w-xs ${
              msg.role === 'user'
                ? 'bg-blue-100 self-end text-right'
                : 'bg-gray-200 self-start text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type how you're feeling..."
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default MindEaseChat;
