import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: ["https://ai-brobot.netlify.app"] }));
app.use(express.json());

app.post("/chatbot/aiChatResponse", async (request, response) => {
  const uri = "https://api.aimlapi.com/v1/chat/completions";
  const apiKey = process.env.AIML_API_KEY;
  try {
    const aiResponse = await fetch(`${uri}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          {
            role: "user",
            content: process.env.ADMIN_PROMPT,
            id: crypto.randomUUID(),
          },
          {
            role: "user",
            content: process.env.ADMIN_PROMPT_2,
            id: crypto.randomUUID(),
          },
          ...request.body,
        ],
        temperature: 0.7,
        top_p: 0.7,
        frequency_penalty: 1,
        max_tokens: 1536,
        top_k: 50,
      }),
    });

    const jsonResponse = await aiResponse.json();

    response.send(
      jsonResponse.choices[0]?.message ?? {
        role: "assistant",
        content:
          "Oops! There seems to be an issue.\n\nPlease try again, or refresh to continue ",
      }
    );
  } catch (e) {
    console.error(e);
  }
});

app.listen(3000, () => console.log("API on http://localhost:3000"));
