# PulseDesk AI CRM

A simple AI-assisted CRM and productivity dashboard built with Next.js and TypeScript. The UI includes:

- CRM metrics and active pipeline
- Contact tracking and task management
- A small AI assistant panel for summaries, prioritization, and outreach drafting
- A local-first integration path for Ollama or OpenAI-compatible local LLM servers

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and adjust it for your local model server:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Local AI integration

By default, the assistant route expects an Ollama server at `http://127.0.0.1:11434`.

Use these environment variables:

- `LOCAL_LLM_MODE=ollama` for Ollama's `/api/chat`
- `LOCAL_LLM_MODE=openai` for OpenAI-compatible `/v1/chat/completions`
- `LOCAL_LLM_BASE_URL` to point at your local server
- `LOCAL_LLM_MODEL` to choose the model
- `LOCAL_LLM_API_KEY` if your local OpenAI-compatible endpoint requires one

## Notes

- The project uses static seed data for now, which makes it easy to later replace with a database or CRM API.
- The AI assistant is intentionally limited to light-touch support instead of autonomous actions.
