const baseURL = "http://localhost:3000";

async function getAiMessage({ inputMessage }) {
  try {
    const response = await fetch(`${baseURL}/chatbot/aiChatResponse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "user",
        content: inputMessage,
      }),
    });

    const data = (await response.json()) ?? [];

    return data.content;
  } catch (e) {
    console.error(e);
  }
}

window.getAiMessage = getAiMessage;
