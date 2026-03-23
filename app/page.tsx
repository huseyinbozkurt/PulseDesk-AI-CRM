import { DashboardShell } from "@/components/dashboard-shell";
import { SignInButton } from "@/components/auth-controls";
import { getAIConfig } from "@/lib/ai-config";
import { authOptions, googleAuthConfigured } from "@/lib/auth";
import { loadCRMData } from "@/lib/crm-store";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return (
      <main className="auth-page-shell">
        <section className="auth-card">
          <span className="hero-kicker">PulseDesk AI • Private CRM access</span>
          <h1 className="hero-title auth-title">Sign in to unlock your CRM workspace.</h1>
          <p className="hero-copy auth-copy">
            Google authentication protects the dashboard and assistant route so CRM records never
            render for anonymous visitors.
          </p>

          <div className="auth-actions">
            <SignInButton disabled={!googleAuthConfigured} />
            <p className="helper-text auth-helper">
              {googleAuthConfigured
                ? "Use your Google account to open the protected dashboard."
                : "Set AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, and NEXTAUTH_SECRET to enable Google sign-in."}
            </p>
          </div>
        </section>
      </main>
    );
  }

  const { data, source } = await loadCRMData();
  const { configured: aiConfigured } = getAIConfig();

  return (
    <DashboardShell
      data={data}
      source={source}
      aiConfigured={aiConfigured}
      user={{
        name: user.name || user.email || "Operator",
        email: user.email || null
      }}
    />
  );
}
