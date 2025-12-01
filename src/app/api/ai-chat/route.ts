import { NextRequest, NextResponse } from "next/server";
import { OpenRouter } from '@openrouter/sdk';

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await openRouter.chat.send({
      model: "openai/gpt-4o",
      messages: [{ role: "user", content: message }],
    });
    const aiResponse = response.choices[0].message.content;

    // For now, return a mock response
    // const aiResponse = `I received your message: "${message}". This is a placeholder response. Please integrate with your preferred AI service (OpenAI, Anthropic Claude, Google Gemini, etc.) by adding your API key and updating this endpoint.`;

    return NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
