import React, { useEffect, useState } from "react";
import { MessageList, Input } from "react-chat-elements";
import axios from "axios";

const ChatComponent = ({ currentUser, recipient }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!recipient) return;

    const fetchMessages = () => {
      axios
        .get("http://localhost:8080/messages", { withCredentials: true })
        .then((res) => {
          const filteredMessages = res.data.filter(
            (msg) =>
              (msg.sender.id === currentUser.id &&
                msg.receiver.id === recipient.id) ||
              (msg.sender.id === recipient.id &&
                msg.receiver.id === currentUser.id)
          );

          const formatted = filteredMessages.map((msg) => ({
            position: msg.sender.id === currentUser.id ? "right" : "left",
            type: "text",
            text: msg.content,
            date: new Date(msg.sentAt),
          }));

          setMessages(formatted);
        })
        .catch((err) => console.error("Failed to fetch messages:", err));
    };

    // Fetch initially
    fetchMessages();

    // Set interval for every 1 second
    const intervalId = setInterval(fetchMessages, 1000);

    // Clear on unmount or when recipient changes
    return () => clearInterval(intervalId);
  }, [currentUser, recipient]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      sender: { id: currentUser.id },
      receiver: { id: recipient.id },
      content: inputValue,
    };

    axios
      .post("http://localhost:8080/messages", newMessage, {
        withCredentials: true,
      })
      .then((res) => {
        setMessages((prev) => [
          ...prev,
          {
            position: "right",
            type: "text",
            text: inputValue,
            date: new Date(),
          },
        ]);
        setInputValue("");
      })
      .catch((err) => console.error("Failed to send message:", err));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <MessageList
        className="message-list"
        lockable
        toBottomHeight="100%"
        dataSource={messages}
      />
      <div style={{ marginTop: "1rem" }}>
        <Input
          className=" rounded-xl pl-2"
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
