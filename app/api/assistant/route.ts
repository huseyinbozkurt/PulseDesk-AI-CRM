import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAIConfig } from "@/lib/ai-config";
import { buildAssistantContext } from "@/lib/assistant-context";
import { authOptions } from "@/lib/auth";
import { loadCRMData } from "@/lib/crm-store";

type AssistantPayload = {
  prompt?: string;
};

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Authentication is required." }, { status: 401 });
    }

    const config = getAIConfig();
    const body = (await request.json()) as AssistantPayload;
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    if (!config.configured || !config.model) {
      return NextResponse.json(
        { error: "AI model is not configured. Set LOCAL_LLM_MODEL to enable assistant features." },
        { status: 503 }
      );
    }

    const { data } = await loadCRMData();
    const context = buildAssistantContext(data);

    const systemPrompt =
      "You are an AI copilot inside a CRM dashboard. Keep answers concise, practical, and business-focused. Prefer summaries, next steps, outreach ideas, prioritization, and CRM hygiene recommendations.";

    let reply: string;

    if (config.mode === "openai") {
      reply = await queryOpenAICompatible(systemPrompt, context, prompt, config.baseUrl, config.model);
    } else {
      reply = await queryOllama(systemPrompt, context, prompt, config.baseUrl, config.model);
    }

    return NextResponse.json({ reply });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "The local AI service could not be reached. Verify your local model server and environment variables.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function queryOllama(
  systemPrompt: string,
  context: string,
  prompt: string,
  baseUrl: string,
  model: string
) {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      stream: false,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `${context}\n\nUser request:\n${prompt}` }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed with status ${response.status}.`);
  }

  const data = (await response.json()) as {
    message?: { content?: string };
  };

  return data.message?.content?.trim() || "No reply returned from the local model.";
}

async function queryOpenAICompatible(
  systemPrompt: string,
  context: string,
  prompt: string,
  baseUrl: string,
  model: string
) {
  const apiKey = process.env.LOCAL_LLM_API_KEY;

  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {})
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `${context}\n\nUser request:\n${prompt}` }
      ],
      temperature: 0.4
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI-compatible request failed with status ${response.status}.`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  return data.choices?.[0]?.message?.content?.trim() || "No reply returned from the local model.";
}
