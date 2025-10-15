import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function getOpenAiResponse(request, response) {
  const messages = request.body.messages;

  try {
    const aiResponse = await openai.responses.create({
      model: "gpt-4o-mini",
      input: messages,
      instructions: `${process.env.ADMIN_PROMPT}\n\n\n${process.env.ADMIN_PROMPT}`,
    });

    response.send({
      content: aiResponse.output_text,
    });
  } catch (e) {
    console.error(e);
  }
}
