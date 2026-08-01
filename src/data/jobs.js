export const COMPANIES = [
  { id: "co1", name: "NimbusTech", industry: "Enterprise SaaS", hq: "Bengaluru, IN", size: "500-1000", founded: "2015", color: "navy", about: "NimbusTech builds workflow automation software used by mid-size enterprises." },
  { id: "co2", name: "Quanta Analytics", industry: "Data & Analytics", hq: "Remote-first", size: "100-500", founded: "2018", color: "green", about: "Quanta Analytics turns raw retail data into decisions for e-commerce clients." },
  { id: "co3", name: "PixelForge Labs", industry: "Consumer Tech", hq: "Hyderabad, IN", size: "50-100", founded: "2020", color: "amber", about: "PixelForge Labs designs fast, delightful consumer mobile apps." },
  { id: "co4", name: "Cortex AI", industry: "Artificial Intelligence", hq: "Remote-first", size: "100-500", founded: "2021", color: "slate", about: "Cortex AI ships applied machine learning systems for healthcare partners." },
  { id: "co5", name: "StratoNet", industry: "Cloud Infrastructure", hq: "Pune, IN", size: "1000+", founded: "2012", color: "navy", about: "StratoNet provides managed cloud hosting for enterprise customers." },
];

export const JOBS = [
  { id: "j1", title: "Software Engineer Intern", companyId: "co1", location: "Bengaluru, IN", remote: false, type: "Internship", salary: "₹35,000/mo", posted: "2 days ago", skills: ["React", "Node.js"], description: "Join the platform team building internal dashboard features.", status: "Open" },
  { id: "j2", title: "Junior Data Analyst", companyId: "co2", location: "Remote", remote: true, type: "Full-time", salary: "₹6–8 LPA", posted: "5 days ago", skills: ["SQL", "Power BI"], description: "Build dashboards and reports guiding product decisions.", status: "Open" },
  { id: "j3", title: "Frontend Developer", companyId: "co3", location: "Hyderabad, IN", remote: false, type: "Full-time", salary: "₹7–10 LPA", posted: "1 week ago", skills: ["React", "CSS"], description: "Own the UI layer of our flagship mobile-first web app.", status: "Open" },
  { id: "j4", title: "ML Research Intern", companyId: "co4", location: "Remote", remote: true, type: "Internship", salary: "₹40,000/mo", posted: "3 days ago", skills: ["Python", "ML"], description: "Prototype ML models for healthcare imaging use cases.", status: "Open" },
  { id: "j5", title: "Cloud Support Engineer", companyId: "co5", location: "Pune, IN", remote: false, type: "Full-time", salary: "₹5–7 LPA", posted: "6 days ago", skills: ["AWS", "Linux"], description: "Troubleshoot and optimize customer cloud infrastructure.", status: "Open" },
  { id: "j6", title: "Data Science Intern", companyId: "co2", location: "Remote", remote: true, type: "Internship", salary: "₹30,000/mo", posted: "Just now", skills: ["Python", "Pandas"], description: "Explore transaction data to uncover client-facing trends.", status: "Open" },
];

export const INITIAL_APPLICATIONS = [
  { id: "app1", jobId: "j3", status: "Interview Scheduled", appliedOn: "Jul 14, 2026" },
  { id: "app2", jobId: "j5", status: "Under Review", appliedOn: "Jul 18, 2026" },
];
export const STATUS_STEPS = ["Applied", "Under Review", "Interview Scheduled", "Offer"];
export const STATUS_TONE = { Applied: "navy", "Under Review": "amber", "Interview Scheduled": "green", Offer: "green", Rejected: "red" };
