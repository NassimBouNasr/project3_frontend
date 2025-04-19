import React, { useState } from "react";
import { MessageBox, MessageList, Input } from "react-chat-elements";

const ChatComponent = () => {
  const [messages, setMessages] = useState([
    {
      position: "left",
      type: "text",
      text: "Welcome to the chat!",
      date: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      position: "right", // Assuming current user is on the right
      type: "text",
      text: inputValue,
      date: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <MessageList
        className="message-list"
        lockable={true}
        toBottomHeight="100%"
        dataSource={messages}
      />
      <div style={{ marginTop: "1rem" }}>
        <Input
          placeholder="Type your message..."
          multiline={false}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rightButtons={
            <button onClick={handleSend} style={{ padding: "0.5rem 1rem" }}>
              Send
            </button>
          }
        />
      </div>
    </div>
  );
};

export default ChatComponent;
