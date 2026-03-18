export type CRMSeed = {
  metrics: {
    winRate: number;
    monthlyForecast: number;
    completedTasks: number;
    responseSlaHours: number;
    expansionCandidates: number;
  };
  contacts: Array<{
    id: string;
    name: string;
    company: string;
    role: string;
    lastTouch: string;
    nextStep: string;
    health: "Healthy" | "Warm" | "At risk";
  }>;
  deals: Array<{
    id: string;
    name: string;
    account: string;
    stage: "Discovery" | "Proposal" | "Negotiation";
    value: number;
    probability: number;
    closeDate: string;
  }>;
  pipeline: Array<{
    name: "Discovery" | "Proposal" | "Negotiation";
    description: string;
    totalValue: number;
  }>;
  tasks: Array<{
    id: string;
    title: string;
    owner: string;
    dueDate: string;
    priority: "High" | "Medium" | "Low";
    status: "Open" | "Blocked" | "Done";
  }>;
  activity: Array<{
    id: string;
    label: string;
    title: string;
    description: string;
    time: string;
    owner: string;
  }>;
};

export const crmSeed: CRMSeed = {
  metrics: {
    winRate: 34,
    monthlyForecast: 148000,
    completedTasks: 27,
    responseSlaHours: 3,
    expansionCandidates: 5
  },
  contacts: [
    {
      id: "c1",
      name: "Nadia Brooks",
      company: "Northstar Health",
      role: "Operations Director",
      lastTouch: "2 days ago",
      nextStep: "Send revised rollout plan after Friday call",
      health: "Healthy"
    },
    {
      id: "c2",
      name: "Evan Cole",
      company: "Sable Freight",
      role: "VP Revenue Ops",
      lastTouch: "6 days ago",
      nextStep: "Re-engage with ROI summary and pilot scope",
      health: "At risk"
    },
    {
      id: "c3",
      name: "Priya Nair",
      company: "Aster Labs",
      role: "Founder",
      lastTouch: "Yesterday",
      nextStep: "Confirm procurement path before proposal",
      health: "Warm"
    },
    {
      id: "c4",
      name: "Jonah Kim",
      company: "Fieldcraft Energy",
      role: "Head of Partnerships",
      lastTouch: "Today",
      nextStep: "Draft mutual action plan and intro to finance lead",
      health: "Healthy"
    }
  ],
  deals: [
    {
      id: "d1",
      name: "Northstar expansion",
      account: "Northstar Health",
      stage: "Negotiation",
      value: 62000,
      probability: 78,
      closeDate: "Mar 28"
    },
    {
      id: "d2",
      name: "Aster pilot",
      account: "Aster Labs",
      stage: "Proposal",
      value: 36000,
      probability: 52,
      closeDate: "Apr 05"
    },
    {
      id: "d3",
      name: "Fieldcraft onboarding",
      account: "Fieldcraft Energy",
      stage: "Discovery",
      value: 24000,
      probability: 28,
      closeDate: "Apr 18"
    },
    {
      id: "d4",
      name: "Sable reactivation",
      account: "Sable Freight",
      stage: "Proposal",
      value: 18000,
      probability: 33,
      closeDate: "Apr 11"
    }
  ],
  pipeline: [
    {
      name: "Discovery",
      description: "Early qualification and stakeholder mapping.",
      totalValue: 24000
    },
    {
      name: "Proposal",
      description: "Commercial terms and solution framing.",
      totalValue: 54000
    },
    {
      name: "Negotiation",
      description: "Final scope, budget alignment, and close plan.",
      totalValue: 62000
    }
  ],
  tasks: [
    {
      id: "t1",
      title: "Send ROI summary to Sable Freight",
      owner: "Huseyin",
      dueDate: "Today",
      priority: "High",
      status: "Open"
    },
    {
      id: "t2",
      title: "Prepare Northstar procurement Q&A",
      owner: "Huseyin",
      dueDate: "Today",
      priority: "High",
      status: "Open"
    },
    {
      id: "t3",
      title: "Confirm Aster security checklist owner",
      owner: "Operations",
      dueDate: "Tomorrow",
      priority: "Medium",
      status: "Blocked"
    },
    {
      id: "t4",
      title: "Log Fieldcraft partnership notes",
      owner: "Huseyin",
      dueDate: "Today",
      priority: "Low",
      status: "Done"
    }
  ],
  activity: [
    {
      id: "a1",
      label: "AI",
      title: "Assistant suggested a churn-risk summary",
      description: "Flagged Sable Freight due to a six-day silence and open ROI objections.",
      time: "09:10",
      owner: "System"
    },
    {
      id: "a2",
      label: "CL",
      title: "Call logged with Northstar Health",
      description: "Budget approved pending legal language in the rollout addendum.",
      time: "10:35",
      owner: "Huseyin"
    },
    {
      id: "a3",
      label: "EM",
      title: "Proposal sent to Aster Labs",
      description: "Included pilot scope, pricing, and a lightweight implementation timeline.",
      time: "11:20",
      owner: "Huseyin"
    }
  ]
};
