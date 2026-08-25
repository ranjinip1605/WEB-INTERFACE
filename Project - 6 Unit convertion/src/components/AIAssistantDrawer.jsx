import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, User } from 'lucide-react';

export function AIAssistantDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your AI Conversion Assistant. Ask me anything about real-world unit conversions, baking substitutions, fuel economy, or travel math!'
    }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    'How many cups of flour in 500 grams?',
    'How much fuel is 50 liters for a 15 km/l car?',
    'What is 100 Mbps in MB per second?',
    'Convert 70 kg to pounds and stone'
  ];

  const handleSend = (textToSend) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg = { sender: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate intelligent AI response
    setTimeout(() => {
      let aiText = '';
      const lower = q.toLowerCase();

      if (lower.includes('flour') || lower.includes('500 grams')) {
        aiText = 'For All-Purpose Flour, 1 US Cup ≈ 125 grams. Therefore, 500 grams of flour is approximately 4 US Cups (or 16 tablespoons).';
      } else if (lower.includes('fuel') || lower.includes('50 liters')) {
        aiText = 'With 50 liters of fuel and an average efficiency of 15 km/liter, your car can travel approximately 750 kilometers (466 miles).';
      } else if (lower.includes('100 mbps')) {
        aiText = 'Internet speeds are measured in Megabits (Mbps). 1 Byte = 8 Bits. So 100 Mbps equals 12.5 Megabytes per second (MB/s). A 1 GB file will download in ~80 seconds.';
      } else if (lower.includes('70 kg')) {
        aiText = '70 kilograms equals 154.32 pounds (lbs) or 11 stone 0.32 lbs. In real-life context, this is about the weight of an adult human male.';
      } else {
        aiText = `Great question regarding "${q}"! You can use OmniConvert's live converter tabs or type natural numbers like "50 lbs to kg" into the Smart Conversion bar above for instant calculations!`;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiText }]);
    }, 600);
  };

  return (
    <div className="ai-drawer-backdrop" onClick={onClose}>
      <div className="ai-drawer-content glass-panel animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="ai-drawer-header">
          <div className="ai-title-group">
            <Bot className="text-red" />
            <h3>AI Conversion Assistant</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="ai-messages-container">
          {messages.map((msg, index) => (
            <div key={index} className={`ai-msg-bubble ${msg.sender}`}>
              <div className="msg-avatar">
                {msg.sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className="msg-text-card">
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="ai-prompts-ribbon">
          <span className="prompts-label">Try asking:</span>
          {quickPrompts.map((prompt, i) => (
            <button key={i} className="prompt-chip" onClick={() => handleSend(prompt)}>
              <Sparkles size={12} /> {prompt}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="ai-input-form"
        >
          <input
            type="text"
            className="ai-chat-input"
            placeholder="Ask AI conversion question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="ai-send-btn">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
