# AI Chat Integration Guide

## Overview
The AI Tools page now includes a chat interface similar to ChatGPT. The UI is complete and functional, but you need to integrate it with your preferred AI service.

## Current Implementation
- **Frontend**: `src/components/AiChatInterface.tsx` - A fully functional chat UI with message history
- **Backend**: `src/app/api/ai-chat/route.ts` - API endpoint that currently returns mock responses
- **Page**: `src/app/(main)/ai-tools/page.tsx` - The main AI tools page

## Integration Options

### Option 1: OpenAI (ChatGPT)

1. Install the OpenAI SDK:
```bash
npm install openai
```

2. Add your API key to `.env.local`:
```env
OPENAI_API_KEY=your_api_key_here
```

3. Update `src/app/api/ai-chat/route.ts`:
```typescript
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    return NextResponse.json({
      response: completion.choices[0].message.content,
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
```

### Option 2: Anthropic Claude

1. Install the Anthropic SDK:
```bash
npm install @anthropic-ai/sdk
```

2. Add your API key to `.env.local`:
```env
ANTHROPIC_API_KEY=your_api_key_here
```

3. Update `src/app/api/ai-chat/route.ts`:
```typescript
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      messages: [{ role: "user", content: message }],
    });

    return NextResponse.json({
      response: response.content[0].text,
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
```

### Option 3: Google Gemini

1. Install the Google Generative AI SDK:
```bash
npm install @google/generative-ai
```

2. Add your API key to `.env.local`:
```env
GOOGLE_AI_API_KEY=your_api_key_here
```

3. Update `src/app/api/ai-chat/route.ts`:
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    const response = await result.response;

    return NextResponse.json({
      response: response.text(),
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
```

## Features Included

- ✅ Clean, modern UI matching the provided design
- ✅ Message history with user/assistant differentiation
- ✅ Loading states with animated dots
- ✅ Quick action buttons (Create image, Give advice, etc.)
- ✅ Model selector dropdown (ChatGPT-5-mini)
- ✅ Send button and Enter key support
- ✅ Responsive design
- ✅ Error handling
- ✅ API endpoint structure

## Next Steps

1. Choose your preferred AI service from the options above
2. Install the required SDK
3. Add your API key to environment variables
4. Update the API route with the integration code
5. Test the chat functionality
6. (Optional) Customize the system prompt or add conversation history

## Customization

### Change Model Selector Options
Edit `src/components/AiChatInterface.tsx` and modify the model selector button text.

### Add Conversation History
Store messages in a database and pass conversation history to the AI service for context-aware responses.

### Customize Suggestion Buttons
Edit the `suggestionButtons` array in `src/components/AiChatInterface.tsx` to add/remove quick actions.

## Security Notes

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Consider implementing rate limiting
- Add authentication checks if needed
- Validate and sanitize user input
