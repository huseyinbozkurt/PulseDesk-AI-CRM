# PulseDesk AI CRM

A simple AI-assisted CRM and productivity dashboard built with Next.js and TypeScript. The UI includes:

- CRM metrics and active pipeline
- Contact tracking and task management
- A small AI assistant panel for summaries, prioritization, and outreach drafting
- A local-first integration path for Ollama or OpenAI-compatible local LLM servers
- Optional Postgres-backed CRM storage with automatic fallback to dummy data

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

## Database integration

The dashboard now supports Postgres on the server side.

- If no database is configured, the app uses the built-in dummy CRM dataset.
- If `DATABASE_URL` is configured, the app reads from Postgres instead.
- On first run with a configured database, the app creates a `crm_snapshots` table and seeds it with the current dummy dataset if the table is empty.

Use one of these environment variables:

- `DATABASE_URL=postgresql://user:password@localhost:5432/pulsedesk`
- `POSTGRES_URL=postgresql://user:password@localhost:5432/pulsedesk`

Current schema:

```sql
CREATE TABLE IF NOT EXISTS crm_snapshots (
  id BIGSERIAL PRIMARY KEY,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

`payload` stores the full CRM snapshot as JSON. The app always reads the most recent row.

## Notes

- The dummy dataset remains the fallback path when no DB is configured or the DB payload is invalid.
- The AI assistant is intentionally limited to light-touch support instead of autonomous actions.
