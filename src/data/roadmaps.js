/* Learning roadmaps per course track — six stages from first principles to
   job-ready, referencing real courses from the catalog where relevant. */
export const ROADMAPS = {
  "Programming": {
    stages: [
      { stage: "Beginner", focus: "Language fundamentals", items: ["Python Programming", "Java Fundamentals", "Practice basic syntax daily for 30 minutes"] },
      { stage: "Intermediate", focus: "Data structures & problem solving", items: ["Lists, dictionaries, and OOP basics", "Solve 2-3 coding practice problems a week", "Learn to read and debug stack traces"] },
      { stage: "Advanced", focus: "Design & efficiency", items: ["Big-O and algorithm trade-offs", "Design small multi-file programs", "Write and run your own unit tests"] },
      { stage: "Projects", items: ["Command-line to-do app", "Simple text-based game", "A small automation script for a repetitive task"] },
      { stage: "Interview Prep", items: ["Practice HR + technical Q&A", "Solve timed coding challenges", "Do one mock interview session"] },
      { stage: "Job Ready", items: ["Polish 2-3 portfolio projects on GitHub", "Tailor your resume with concrete outcomes", "Apply to entry-level developer roles"] },
    ],
  },
  "Web Development": {
    stages: [
      { stage: "Beginner", focus: "Client-side foundations", items: ["JavaScript Essentials", "React for Beginners", "Build static pages with HTML/CSS"] },
      { stage: "Intermediate", focus: "Full applications", items: ["Node.js & Express", "Connect a frontend to a backend API", "Learn form validation & state management"] },
      { stage: "Advanced", focus: "Production concerns", items: ["Full-Stack Web Development", "Add authentication & authorization", "Learn caching and performance basics"] },
      { stage: "Projects", items: ["Personal portfolio site", "Full-stack CRUD app with a database", "A small SaaS-style side project"] },
      { stage: "Interview Prep", items: ["Practice explaining component/API design decisions", "Timed coding challenges in JavaScript", "Mock system-design walkthrough"] },
      { stage: "Job Ready", items: ["Deploy 2-3 projects live with working links", "Write clear READMEs for each project", "Apply to junior/full-stack roles"] },
    ],
  },
  "Data & AI": {
    stages: [
      { stage: "Beginner", focus: "Data & statistics basics", items: ["SQL for Everyone", "Data Analytics Fundamentals", "Comfortable with mean/median/variance"] },
      { stage: "Intermediate", focus: "Modeling fundamentals", items: ["Machine Learning Foundations", "MongoDB Fundamentals", "Practice EDA on public datasets"] },
      { stage: "Advanced", focus: "Applied AI & specialization", items: ["Artificial Intelligence Basics", "Data Science Bootcamp", "Feature engineering on a real dataset"] },
      { stage: "Projects", items: ["End-to-end EDA + model on a Kaggle dataset", "A small predictive model deployed behind an API", "A dashboard summarizing your findings"] },
      { stage: "Interview Prep", items: ["Practice explaining model trade-offs", "SQL + ML technical question drills", "Mock case-study interview"] },
      { stage: "Job Ready", items: ["Publish 2-3 write-ups of your analysis/modeling projects", "Quantify impact in your resume", "Apply to analyst/junior data science roles"] },
    ],
  },
  "Cloud & DevOps": {
    stages: [
      { stage: "Beginner", focus: "Core concepts", items: ["Cloud Computing Fundamentals", "AWS Cloud Practitioner", "Understand IaaS/PaaS/SaaS"] },
      { stage: "Intermediate", focus: "Automation", items: ["DevOps Essentials", "Containerize an app with Docker", "Set up your first CI pipeline"] },
      { stage: "Advanced", focus: "Reliability at scale", items: ["Infrastructure as Code with Terraform", "Basic Kubernetes concepts", "Monitoring & alerting basics"] },
      { stage: "Projects", items: ["Deploy a static site to the cloud", "A CI/CD pipeline for a sample repo", "An IaC template provisioning a small stack"] },
      { stage: "Interview Prep", items: ["Practice troubleshooting scenarios", "Explain a deployment pipeline you built", "Mock on-call incident interview"] },
      { stage: "Job Ready", items: ["Consider an associate cloud certification", "Document your infra projects clearly", "Apply to cloud/DevOps engineer roles"] },
    ],
  },
  "BI & Analytics": {
    stages: [
      { stage: "Beginner", focus: "Spreadsheets & querying", items: ["Data Analytics Fundamentals", "SQL for Everyone", "Comfortable with pivot tables"] },
      { stage: "Intermediate", focus: "Dashboards", items: ["Power BI for Analysts", "Build your first interactive dashboard", "Practice data cleaning on messy datasets"] },
      { stage: "Advanced", focus: "Storytelling with data", items: ["Advanced DAX measures", "Design a data model with relationships", "Practice presenting insights to stakeholders"] },
      { stage: "Projects", items: ["A sales performance dashboard", "A retail dataset deep-dive with recommendations", "An automated monthly reporting workflow"] },
      { stage: "Interview Prep", items: ["Practice SQL interview questions", "Mock a business-case walkthrough", "Prepare 2-3 dashboard case studies"] },
      { stage: "Job Ready", items: ["Publish dashboard case studies with context", "Tailor your resume with business impact", "Apply to analyst/BI roles"] },
    ],
  },
};

export const ROADMAP_TRACKS = Object.keys(ROADMAPS);
