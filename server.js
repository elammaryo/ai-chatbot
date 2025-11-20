import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getOpenAiResponse } from "./openai-chat-response.js";
import { getAiMlResponse } from "./ai-chat-response.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "https://ai-brobot.netlify.app",
      "https://omerelammary.netlify.app",
      "https://omerelammary.com",
    ],
  })
);
app.use(express.json());

app.post("/chatbot/aiChatResponse", async (request, response) =>
  getAiMlResponse(request, response)
);

app.post("/chatbot/openaiChatResponse", async (request, response) =>
  getOpenAiResponse(request, response)
);

app.listen(3000, () => console.log("API on http://localhost:3000"));
