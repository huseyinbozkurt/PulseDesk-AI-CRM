import { DashboardShell } from "@/components/dashboard-shell";
import { crmSeed } from "@/lib/crm-data";

export default function Home() {
  return <DashboardShell data={crmSeed} />;
}
