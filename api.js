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

window.getAiMessage = getAiMessage;
