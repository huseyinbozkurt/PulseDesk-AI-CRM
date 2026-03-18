import type { CRMSeed } from "@/lib/crm-data";

export function buildAssistantContext(data: CRMSeed) {
  const contactLines = data.contacts.map(
    (contact) =>
      `- ${contact.name} at ${contact.company} (${contact.role}), health: ${contact.health}, next step: ${contact.nextStep}`
  );

  const dealLines = data.deals.map(
    (deal) =>
      `- ${deal.name} for ${deal.account}, stage: ${deal.stage}, value: $${deal.value}, probability: ${deal.probability}%, close target: ${deal.closeDate}`
  );

  const taskLines = data.tasks.map(
    (task) =>
      `- ${task.title}, owner: ${task.owner}, due: ${task.dueDate}, priority: ${task.priority}, status: ${task.status}`
  );

  return [
    "CRM dashboard context:",
    `Win rate: ${data.metrics.winRate}%`,
    `Monthly forecast: $${data.metrics.monthlyForecast}`,
    `Completed tasks: ${data.metrics.completedTasks}`,
    "",
    "Contacts:",
    ...contactLines,
    "",
    "Deals:",
    ...dealLines,
    "",
    "Tasks:",
    ...taskLines
  ].join("\n");
}
