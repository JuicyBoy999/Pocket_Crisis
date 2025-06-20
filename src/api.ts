import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getMindEaseReply(userMessage: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4" if you have access
      messages: [
        {
          role: "system",
          content:
            "You are MindEase, a supportive, warm, and emotionally intelligent assistant designed to comfort users in distress. Respond with empathy, clarity, and non-judgmental understanding."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.7
    });

    return response.choices[0]?.message?.content?.trim() || "I'm here for you.";
  } catch (error) {
    console.error("AI error:", error);
    return "Sorry, I’m having trouble responding right now. Please try again later.";
  }
}
