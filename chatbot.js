function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = React.useState("");

  function saveInput(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    const newChatmessages = [
      ...chatMessages,
      {
        content: inputText,
        role: "user",
        id: crypto.randomUUID(),
      },
    ];
    setChatMessages(newChatmessages);
    const chatbotResponse = await getAiMessage({
      inputMessage: inputText,
    });
    setChatMessages([
      ...newChatmessages,
      {
        content: chatbotResponse,
        role: "assistant",
        id: crypto.randomUUID(),
      },
    ]);

    setInputText("");
  }

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInput}
        value={inputText}
      />
      <button className="send-button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

function ChatMessage({ message, role }) {
  return (
    <div
      className={
        role === "assistant" ? "chat-message-chatbot" : "chat-message-user"
      }
    >
      {role === "assistant" && (
        <img className="chatbot-icon" src="chatbot-icon.png" />
      )}
      <div className="chat-message-text">{message}</div>
      {role === "user" && <img className="user-icon" src="profile.svg" />}
    </div>
  );
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = React.useRef(null);
  React.useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.content}
            role={chatMessage.role}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

function App() {
  const [chatMessages, setChatMessages] = React.useState([
    {
      content: "What's up ding dong",
      role: "assistant",
      id: crypto.randomUUID(),
    },
  ]);

  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />{" "}
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}
