import React, { useState } from 'react';
import './ChatPanel.css';

const ChatPanel = () => {
  const [messages, setMessages] = useState([
    { sender: "user", text: "How do we calculate the size of an structure" },
    { sender: "bot", text: "While calculating the size..." },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    setMessages([...messages, { sender: "user", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="chat-panel">
      <h3>Live Chat</h3>
      <button className="chat-close">✖</button>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPanel;