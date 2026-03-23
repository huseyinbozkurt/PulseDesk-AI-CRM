import Link from "next/link";
import type { Metadata } from "next";

const highlights = [
  "7+ years building React, TypeScript, and Node.js products",
  "Hands-on experience across CRM platforms, data visualization, and AI-assisted workflows",
  "Engineering leadership spanning release management, mentoring, and frontend delivery"
];

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Unit Testing",
  "Artificial Intelligence",
  "Local LLMs",
  "Data Visualization",
  "CRM",
  "REST APIs",
  "Redux",
  "Express.js",
  "Webpack",
  "Jest",
  "Git",
  "HTML",
  "CSS",
  "Mentorship",
  "Release Management",
  "Prompt Engineering"
];

const experience = [
  {
    title: "Freelance Software Engineer",
    company: "Freelance",
    period: "Jun 2025 - Mar 2026",
    location: "Canada",
    points: [
      "Partnered with an early-stage startup on codebase revisions and feature development using React, TypeScript, and GitHub Copilot.",
      "Refactored existing implementations to improve maintainability and long-term scalability.",
      "Delivered new product work in an Agile environment aligned with roadmap priorities."
    ]
  },
  {
    title: "Senior Software Engineer & Team Lead",
    company: "Huawei",
    period: "Jan 2024 - Jun 2025",
    location: "Turkey",
    points: [
      "Led frontend development of an enterprise CRM platform with React and TypeScript across multiple release cycles.",
      "Established post-release analysis practices to reduce recurring issues and improve stability.",
      "Owned release management standards and mentored teammates through debugging and delivery challenges."
    ]
  },
  {
    title: "Software Engineer",
    company: "Turk Telekom",
    period: "Feb 2022 - Dec 2023",
    location: "Turkey",
    points: [
      "Modernized a React and TypeScript data visualization tool for better performance, testability, and maintainability.",
      "Migrated charting logic from D3.js to Recharts to improve developer productivity.",
      "Simplified state management by moving from Immutable.js to Redux Toolkit."
    ]
  },
  {
    title: "Software Engineer",
    company: "Caunos BV",
    period: "Aug 2020 - Dec 2021",
    location: "Netherlands",
    points: [
      "Delivered React, TypeScript, Redux-Saga, and Material UI projects in Agile sprint cycles.",
      "Built internal admin panels and public-facing sites for international clients.",
      "Contributed to testing, code reviews, estimation, and documentation to keep sprint delivery consistent."
    ]
  },
  {
    title: "Software Engineer",
    company: "KNS IT Technologies",
    period: "Oct 2018 - Sep 2019",
    location: "Turkey",
    points: [
      "Built and maintained 20+ React Native apps across multiple client industries.",
      "Published updates to the App Store and Google Play and supported white-label releases.",
      "Packaged reusable UI components into shared libraries with technical documentation."
    ]
  },
  {
    title: "Software Engineer",
    company: "Corebit Tech",
    period: "Feb 2018 - Sep 2018",
    location: "Turkey",
    points: [
      "Integrated airline and travel service provider APIs for corporate expense workflows.",
      "Worked with global provider integrations including Amadeus.",
      "Developed Node.js and Express.js REST APIs with unit testing in Jest."
    ]
  }
];

export const metadata: Metadata = {
  title: "About Huseyin Bozkurt | PulseDesk AI CRM",
  description:
    "Background, experience, and product context for Huseyin Bozkurt, the engineer behind PulseDesk AI CRM."
};

export default function AboutPage() {
  return (
    <main className="about-page-shell">
      <section className="about-hero">
        <div className="about-hero-copy">
          <span className="hero-kicker">About The Builder</span>
          <h1 className="hero-title about-title">Huseyin Bozkurt</h1>
          <p className="about-subtitle">Software Engineer based in Toronto, ON, Canada</p>
          <p className="hero-copy">
            Software Engineer with 7+ years of experience in React, TypeScript, and Node.js,
            specializing in CRM platforms, data visualization, and AI integration. This project is
            the open-source product featured in my CV: a privacy-first AI-powered CRM designed to
            keep customer context local while still benefiting from modern language models.
          </p>

          <div className="about-actions">
            <Link className="button button-primary" href="/">
              Open PulseDesk
            </Link>
            <a
              className="button button-secondary"
              href="https://github.com/huseyinbozkurt/PulseDesk-AI-CRM"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </a>
          </div>
        </div>

        <aside className="about-contact-card">
          <h2>Contact</h2>
          <div className="about-contact-list">
            <a href="mailto:huseyinbozkuurt@gmail.com">huseyinbozkuurt@gmail.com</a>
            <a href="tel:+14374846009">+1 437 484 6009</a>
            <a href="https://linkedin.com/in/huseyinbozkurt" target="_blank" rel="noreferrer">
              linkedin.com/in/huseyinbozkurt
            </a>
            <a href="https://github.com/huseyinbozkurt" target="_blank" rel="noreferrer">
              github.com/huseyinbozkurt
            </a>
          </div>
        </aside>
      </section>

      <section className="about-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>What I Work On</h2>
              <p className="muted">
                Product-minded frontend and full-stack engineering with a strong CRM and platform
                systems bias.
              </p>
            </div>
          </div>

          <div className="about-highlight-list">
            {highlights.map((highlight) => (
              <article className="about-highlight-card" key={highlight}>
                {highlight}
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>This Project</h2>
              <p className="muted">
                PulseDesk AI CRM is the clearest expression of the kind of software I like to
                build.
              </p>
            </div>
          </div>

          <div className="about-project-copy">
            <p>
              It combines CRM workflow design, AI integration, and practical interface thinking in
              one focused product. The direction is privacy-first: local LLM support through
              Ollama or LM Studio, so sensitive customer data can stay on-device rather than being
              sent to third-party APIs by default.
            </p>
            <p>
              The roadmap includes natural language contact search, AI-generated
              email drafts, smart contact summaries, and sentiment analysis on customer
              interactions.
            </p>
          </div>
        </section>

        <section className="panel about-panel-wide">
          <div className="panel-header">
            <div>
              <h2>Experience</h2>
              <p className="muted">
                Roles across startups, enterprise CRM delivery, data tooling, mobile products, and
                backend integrations.
              </p>
            </div>
          </div>

          <div className="about-timeline">
            {experience.map((role) => (
              <article className="about-timeline-item" key={`${role.company}-${role.period}`}>
                <div className="about-timeline-head">
                  <div>
                    <h3>
                      {role.title} · {role.company}
                    </h3>
                    <p className="muted">
                      {role.period} · {role.location}
                    </p>
                  </div>
                </div>

                <ul className="about-points">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Core Skills</h2>
              <p className="muted">The stack and strengths I use most often.</p>
            </div>
          </div>

          <div className="about-skill-grid">
            {skills.map((skill) => (
              <span className="badge about-skill-badge" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Education</h2>
              <p className="muted">Computer Engineering foundation.</p>
            </div>
          </div>

          <div className="about-education">
            <strong>Bachelor&apos;s Degree in Computer Engineering</strong>
            <p className="muted">Manisa Celal Bayar University · Sep 2013 - Feb 2018 · Turkey</p>
          </div>
        </section>
      </section>
    </main>
  );
}
