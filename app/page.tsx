import { DashboardShell } from "@/components/dashboard-shell";
import { getAIConfig } from "@/lib/ai-config";
import { loadCRMData } from "@/lib/crm-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data, source } = await loadCRMData();
  const { configured: aiConfigured } = getAIConfig();

  return <DashboardShell data={data} source={source} aiConfigured={aiConfigured} />;
}
