"use client";

import { useState } from "react";
import { SignOutButton } from "@/components/auth-controls";
import type { CRMSeed } from "@/lib/crm-data";
import type { CRMDataSource } from "@/lib/crm-store";

type DashboardShellProps = {
  data: CRMSeed;
  source: CRMDataSource;
  aiConfigured: boolean;
  user: {
    name: string;
    email: string | null;
  };
};

const SUMMARY_PROMPT =
  "Create a concise CRM summary for the operator dashboard. Include overall pipeline health, the most urgent follow-ups, at-risk accounts, and the single best next action.";

export function DashboardShell({ data, source, aiConfigured, user }: DashboardShellProps) {
  const [prompt, setPrompt] = useState("Summarize the highest priority follow-ups for today.");
  const [reply, setReply] = useState(
    "Ask for a daily summary, suggested outreach, account risk review, or pipeline cleanup recommendations."
  );
  const [summary, setSummary] = useState(
    aiConfigured
      ? "Generate an AI summary to get a compact readout of pipeline health, urgent follow-ups, and the next best move."
      : "Configure `LOCAL_LLM_MODEL` to enable AI-generated summaries in the dashboard."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const totalPipeline = data.deals.reduce((sum, deal) => sum + deal.value, 0);
  const openTasks = data.tasks.filter((task) => task.status !== "Done").length;
  const atRiskAccounts = data.contacts.filter((contact) => contact.health === "At risk").length;

  async function runAssistant(nextPrompt?: string) {
    const activePrompt = (nextPrompt || prompt).trim();

    if (!activePrompt) {
      setError("Add a short instruction for the assistant.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: activePrompt })
      });

      const payload = (await response.json()) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "The assistant could not complete that request.");
      }

      setReply(payload.reply || "No response returned.");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The assistant could not complete that request."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function generateSummary() {
    if (!aiConfigured) {
      setSummaryError("AI model is not configured.");
      return;
    }

    setIsSummaryLoading(true);
    setSummaryError(null);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: SUMMARY_PROMPT })
      });

      const payload = (await response.json()) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "The AI summary could not be created.");
      }

      setSummary(payload.reply || "No summary returned.");
    } catch (requestError) {
      setSummaryError(
        requestError instanceof Error
          ? requestError.message
          : "The AI summary could not be created."
      );
    } finally {
      setIsSummaryLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-card">
          <div className="hero-row">
            <span className="hero-kicker">PulseDesk AI • CRM + productivity cockpit</span>
            <SignOutButton name={user.name} />
          </div>
          <h1 className="hero-title">Work the day, not the chaos.</h1>
          <p className="hero-copy">
            A compact CRM dashboard for relationship tracking, task follow-through, and AI-guided
            prioritization. It is deliberately simple today so it stays easy to adapt to a local
            LLM workflow tomorrow.
          </p>
          <p className="muted signed-in-copy">
            Signed in as <strong>{user.name}</strong>
            {user.email ? ` · ${user.email}` : ""}
          </p>

          <div className="hero-metrics">
            <div className="metric-chip">
              <span className="metric-label">Pipeline value</span>
              <span className="metric-value">${formatCompact(totalPipeline)}</span>
            </div>
            <div className="metric-chip">
              <span className="metric-label">Open tasks</span>
              <span className="metric-value">{openTasks}</span>
            </div>
            <div className="metric-chip">
              <span className="metric-label">At-risk accounts</span>
              <span className="metric-value">{atRiskAccounts}</span>
            </div>
            <div className="metric-chip">
              <span className="metric-label">Data source</span>
              <span className="metric-value">{source === "database" ? "Postgres" : "Dummy"}</span>
            </div>
          </div>
        </div>

        <aside className="hero-card status-card">
          <div>
            <h2>Today&apos;s operator brief</h2>
            <p className="muted">
              Best used as a personal CRM view, a founder sales desk, or a lightweight ops console.
            </p>
          </div>

          <div className="status-stack">
            <div className="status-item">
              <strong>Focus lane</strong>
              Close stalled mid-market opportunities and reactivate two quiet accounts.
            </div>
            <div className="status-item">
              <strong>AI mode</strong>
              Limited assist by design: summaries, suggestions, draft messaging, and prioritization.
            </div>
            <div className="status-item">
              <strong>Local model ready</strong>
              Supports `Ollama` by default or any OpenAI-compatible local endpoint via env vars.
            </div>
          </div>
        </aside>
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-column">
          <section className="panel">
            <div className="panel-header">
              <div>
                <h2>AI Summary</h2>
                <p className="muted">
                  Generate a compact operating summary from the configured AI model and current CRM
                  context.
                </p>
              </div>
              <span className="badge">{aiConfigured ? "Configured" : "Not configured"}</span>
            </div>

            <div className="summary-panel">
              <div className="summary-actions">
                <button
                  className="button button-primary"
                  type="button"
                  onClick={generateSummary}
                  disabled={!aiConfigured || isSummaryLoading}
                >
                  {isSummaryLoading ? "Generating..." : "Generate summary"}
                </button>
                <span className="helper-text">
                  {aiConfigured
                    ? "Uses the currently configured local or OpenAI-compatible model."
                    : "Set `LOCAL_LLM_MODEL` in your environment to enable this panel."}
                </span>
              </div>

              <div className={`assistant-output summary-output${summaryError ? " is-error" : ""}`}>
                {summaryError ? `Error: ${summaryError}` : summary}
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <div>
                <h2>Revenue snapshot</h2>
                <p className="muted">Quick numbers for your day-to-day operating rhythm.</p>
              </div>
              <span className="badge">{data.metrics.winRate}% win rate</span>
            </div>

            <div className="card-grid">
              <div className="mini-card">
                <span className="muted">Forecast this month</span>
                <strong>${formatCompact(data.metrics.monthlyForecast)}</strong>
                <span className="muted">Projected weighted pipeline</span>
              </div>
              <div className="mini-card">
                <span className="muted">Tasks completed</span>
                <strong>{data.metrics.completedTasks}</strong>
                <span className="muted">Across sales and follow-up workflows</span>
              </div>
              <div className="mini-card">
                <span className="muted">Response SLA</span>
                <strong>{data.metrics.responseSlaHours}h</strong>
                <span className="muted">Average first response time</span>
              </div>
              <div className="mini-card">
                <span className="muted">Expansion candidates</span>
                <strong>{data.metrics.expansionCandidates}</strong>
                <span className="muted">Accounts showing upsell potential</span>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <div>
                <h2>Active contacts</h2>
                <p className="muted">Keep context close so follow-ups stay sharp.</p>
              </div>
              <span className="badge">{data.contacts.length} tracked people</span>
            </div>

            <div className="list">
              {data.contacts.map((contact) => (
                <article className="list-item" key={contact.id}>
                  <strong className="line-title">
                    {contact.name} · {contact.company}
                  </strong>
                  <div className="muted">
                    {contact.role} · Last touch {contact.lastTouch}
                  </div>
                  <div className="list-meta">
                    <span>{contact.nextStep}</span>
                    <span
                      className={`priority-tag ${
                        contact.health === "At risk"
                          ? "priority-high"
                          : contact.health === "Warm"
                            ? "priority-medium"
                            : "priority-low"
                      }`}
                    >
                      {contact.health}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <div>
                <h2>Pipeline</h2>
                <p className="muted">Simple stage view with enough detail to act fast.</p>
              </div>
              <span className="badge">{data.deals.length} live deals</span>
            </div>

            <div className="pipeline">
              {data.pipeline.map((stage) => (
                <section className="pipeline-stage" key={stage.name}>
                  <header>
                    <div>
                      <h3>{stage.name}</h3>
                      <p className="muted">{stage.description}</p>
                    </div>
                    <span className="deal-tag">${formatCompact(stage.totalValue)}</span>
                  </header>

                  <div className="list">
                    {data.deals
                      .filter((deal) => deal.stage === stage.name)
                      .map((deal) => (
                        <div className="list-item" key={deal.id}>
                          <strong className="line-title">{deal.name}</strong>
                          <div className="muted">
                            {deal.account} · Close target {deal.closeDate}
                          </div>
                          <div className="list-meta">
                            <span>{deal.probability}% confidence</span>
                            <span className="deal-tag">${formatCompact(deal.value)}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        </div>

        <div className="dashboard-column">
          <section className="panel">
            <div className="panel-header">
              <div>
                <h2>AI assistant</h2>
                <p className="muted">
                  Limited interaction layer intended for local LLMs so sensitive CRM context can
                  stay close to home.
                </p>
              </div>
              <span className="badge">Local-first</span>
            </div>

            <div className="assistant-form">
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Ask for task prioritization, draft outreach, pipeline review, or account summaries."
              />

              <div className="assistant-actions">
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => runAssistant()}
                  disabled={isLoading}
                >
                  {isLoading ? "Thinking..." : "Ask assistant"}
                </button>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() =>
                    runAssistant("Draft a concise follow-up email for the most at-risk account.")
                  }
                  disabled={isLoading}
                >
                  Quick prompt
                </button>
              </div>

              <div className="helper-text">
                {aiConfigured
                  ? "Uses the configured AI model for custom CRM prompts."
                  : "Configure `LOCAL_LLM_MODEL` to attach a local assistant endpoint."}
              </div>
            </div>

            {(reply || error) && (
              <div className="assistant-output">
                {error ? `Error: ${error}` : reply}
              </div>
            )}
          </section>

          <section className="panel">
            <div className="panel-header">
              <div>
                <h2>Tasks</h2>
                <p className="muted">One glance at what matters next.</p>
              </div>
              <span className="badge">
                {data.tasks.filter((task) => task.status === "Blocked").length} blocked
              </span>
            </div>

            <div className="list">
              {data.tasks.map((task) => (
                <article className="list-item" key={task.id}>
                  <strong className="line-title">{task.title}</strong>
                  <div className="muted">{task.owner}</div>
                  <div className="list-meta">
                    <span>{task.dueDate}</span>
                    <span
                      className={`priority-tag ${
                        task.priority === "High"
                          ? "priority-high"
                          : task.priority === "Medium"
                            ? "priority-medium"
                            : "priority-low"
                      }`}
                    >
                      {task.priority} · {task.status}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <div>
                <h2>Recent activity</h2>
                <p className="muted">Short timeline for conversations and execution.</p>
              </div>
            </div>

            <div className="list">
              {data.activity.map((item) => (
                <article className="activity-item" key={item.id}>
                  <div className="activity-dot">{item.label}</div>
                  <div className="list-item">
                    <strong className="line-title">{item.title}</strong>
                    <div className="muted">{item.description}</div>
                    <div className="list-meta">
                      <span>{item.time}</span>
                      <span>{item.owner}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}
