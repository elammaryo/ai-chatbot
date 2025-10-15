function ChatInput({ chatMessages, setChatMessages, setLoading }) {
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
    setInputText("");
    setLoading(true);
    const chatbotResponse = await getOpenAiMessage(newChatmessages);
    setLoading(false);
    setChatMessages([
      ...newChatmessages,
      {
        content: chatbotResponse,
        role: "assistant",
        id: crypto.randomUUID(),
      },
    ]);
  }

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInput}
        onKeyPress={(event) => {
          if (event.key == "Enter") {
            sendMessage();
          }
        }}
        value={inputText}
      />
      <button className="send-button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

function ChatMessage({ message, role, loading }) {
  return (
    <div
      className={
        role === "assistant" ? "chat-message-chatbot" : "chat-message-user"
      }
    >
      {role === "assistant" && (
        <img className="chatbot-icon" src="chatbot-icon.png" />
      )}
      <div className="chat-message-text">
        {loading ? (
          <SyncLoader size={8} color="#303030" speedMultiplier={20} />
        ) : (
          message
        )}
      </div>
      {role === "user" && <img className="user-icon" src="profile.svg" />}
    </div>
  );
}

function ChatMessages({ chatMessages, loading }) {
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
            loading={false}
          />
        );
      })}
      {loading && <ChatMessage message="" role="assistant" loading={loading} />}
    </div>
  );
}

function App() {
  const [loading, setLoading] = React.useState(false);
  const [chatMessages, setChatMessages] = React.useState([
    {
      content:
        "Hey, I'm Brobot your AI assistant. I'm ready to answer questions, brainstorm, or just chat. How can I help today? \n\nNote:\n My first response may take a few seconds. Please be patient with me :)",
      role: "assistant",
      id: crypto.randomUUID(),
    },
  ]);

  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} loading={loading} />{" "}
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        setLoading={setLoading}
      />
    </div>
  );
}
