import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: ["http://localhost:5501", "http://127.0.0.1:5501"] }));
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
        model: "google/gemma-3n-e4b-it",
        messages: [request.body],
        temperature: 0.7,
        max_tokens: 256,
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
