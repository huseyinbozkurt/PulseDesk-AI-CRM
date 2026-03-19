export type LocalLLMMode = "ollama" | "openai";

export type AIConfig = {
  configured: boolean;
  mode: LocalLLMMode;
  baseUrl: string;
  model: string | null;
};

export function getAIConfig(): AIConfig {
  const rawMode = process.env.LOCAL_LLM_MODE?.trim().toLowerCase();
  const mode: LocalLLMMode = rawMode === "openai" ? "openai" : "ollama";
  const baseUrl = process.env.LOCAL_LLM_BASE_URL?.trim() || "http://127.0.0.1:11434";
  const model = process.env.LOCAL_LLM_MODEL?.trim() || null;

  return {
    configured: Boolean(model),
    mode,
    baseUrl,
    model
  };
}
