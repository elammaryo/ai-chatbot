const baseURL = "https://ai-chatbot-kcyl.onrender.com";

async function getAiMessage(allMessages) {
  try {
    const response = await fetch(`${baseURL}/chatbot/aiChatResponse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(allMessages),
    });

    const data = (await response.json()) ?? [];

    return data.content;
  } catch (e) {
    console.error(e);
  }
}

async function getOpenAiMessage(messages) {
  const allMessages = messages.map((message, i) => {
    return { content: message.content, role: message.role };
  });
  try {
    const response = await fetch(`${baseURL}/chatbot/openaiChatResponse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: allMessages }),
    });

    const data = (await response.json()) ?? {
      content: "Oops! There seems to be an issue. 🥲\n\nPlease try again later.",
    };

    return data.content;
  } catch (e) {
    console.error(e);
  }
}
