import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { checkRateLimit } from '@/app/lib/rate-limit';

const dgxApiKey = process.env.DGX_API_KEY;
const dgxBaseUrl = process.env.DGX_API_URL;

if (!dgxApiKey) {
  console.warn('DGX_API_KEY is not set. Some features may not work.');
}

if (!dgxBaseUrl) {
  console.warn('DGX_API_URL is not set. Some features may not work.');
}

const dgx = createOpenAI({
  baseURL: dgxBaseUrl || 'http://localhost:8000/v1',
  apiKey: dgxApiKey || 'local-dev',
  fetch: async (url, options) => {
    console.log('Fetching:', url);
    const response = await fetch(url, options);
    if (!response.ok) {
        try {
            console.log('Error Response:', await response.clone().text());
        } catch (e) {
            console.error('Failed to read error response:', e);
        }
    }
    return response;
  }
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
  const { allowed, remaining } = checkRateLimit(ip);

  if (!allowed) {
    return streamText({
      model: dgx(process.env.VLLM_MODEL_NAME || 'openai/gpt-oss-120b'),
      messages: [],
      system: 'Rate limit exceeded. Please try again later.',
    }).toUIMessageStreamResponse({ 
      headers: { 'X-RateLimit-Remaining': '0' } 
    });
  }

  const { messages } = await req.json();

  console.log('Incoming messages:', JSON.stringify(messages, null, 2));

  // Generate text using GPT-OSS-120B
  const modelName = process.env.VLLM_MODEL_NAME || 'openai/gpt-oss-120b';

  interface MessagePart {
    type?: string;
    text?: string;
  }

  interface ChatMessage {
    role: string;
    content?: string | MessagePart[];
    parts?: MessagePart[];
  }

  const coreMessages = messages.map((m: ChatMessage) => {
    let content = m.content;

    const parts = Array.isArray(m.parts) ? m.parts : (Array.isArray(m.content) ? m.content : [] as MessagePart[]);

    if (parts.length > 0) {
      const textParts = parts.filter((p: MessagePart) => p.type === 'text' || p.type === 'input_text' || p.type === 'output_text');
      const otherParts = parts.filter((p: MessagePart) => p.type !== 'text' && p.type !== 'input_text' && p.type !== 'output_text');

      if (otherParts.length === 0) {
        content = textParts.map((p: MessagePart) => p.text || '').join('');
      } else {
        content = parts.map((p: MessagePart) => {
          if (p.type === 'text' || p.type === 'input_text' || p.type === 'output_text') {
            return { type: 'text', text: p.text || '' };
          }
          return p;
        });
      }
    }

    return {
      role: m.role,
      content: content,
    };
  });

  console.log('Normalized messages:', JSON.stringify(coreMessages, null, 2));

  const result = await streamText({
    model: dgx(modelName),
    messages: coreMessages,
    system: "You are a helpful assistant running on a local NVIDIA DGX Spark.",
  });

  return result.toUIMessageStreamResponse({
    headers: { 'X-RateLimit-Remaining': remaining.toString() }
  });
}