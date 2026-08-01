import { CATEGORIES, COURSES } from "./courses";
import { C } from "../utils/theme";

export const STUDENTS = [
  { id: "u1", name: "Aditi Sharma", email: "aditi.sharma@mail.com", program: "B.Tech CSE", status: "Active", progress: 74, joined: "Jan 2026" },
  { id: "u2", name: "Rohan Iyer", email: "rohan.iyer@mail.com", program: "B.Sc Data Science", status: "Active", progress: 51, joined: "Feb 2026" },
  { id: "u3", name: "Meera Nair", email: "meera.nair@mail.com", program: "MBA", status: "Inactive", progress: 12, joined: "Mar 2026" },
  { id: "u4", name: "Kabir Malhotra", email: "kabir.m@mail.com", program: "B.Tech IT", status: "Active", progress: 89, joined: "Nov 2025" },
  { id: "u5", name: "Sana Sheikh", email: "sana.sheikh@mail.com", program: "B.Com", status: "Active", progress: 33, joined: "Apr 2026" },
];

export const SIGNUP_TREND = [
  { m: "Feb", students: 2140 }, { m: "Mar", students: 2480 }, { m: "Apr", students: 2890 },
  { m: "May", students: 3260 }, { m: "Jun", students: 3710 }, { m: "Jul", students: 4180 },
];
export const REVENUE_TREND = [
  { m: "Feb", revenue: 480000 }, { m: "Mar", revenue: 540000 }, { m: "Apr", revenue: 610000 },
  { m: "May", revenue: 705000 }, { m: "Jun", revenue: 782000 }, { m: "Jul", revenue: 864000 },
];

export const TRACK_DIST = CATEGORIES.map((cat) => ({ name: cat, value: COURSES.filter((c) => c.category === cat).reduce((a, c) => a + c.enrolled, 0) }));
export const PIE_COLORS = [C.navy, C.amber, C.green, C.red, C.slate];

export const MONTHLY_REPORT = [
  { month: "Apr 2026", newUsers: 470, revenue: "₹6.1L", avgScore: "72%", coursesCompleted: 298 },
  { month: "May 2026", newUsers: 520, revenue: "₹7.1L", avgScore: "73%", coursesCompleted: 340 },
  { month: "Jun 2026", newUsers: 610, revenue: "₹7.8L", avgScore: "74%", coursesCompleted: 385 },
  { month: "Jul 2026", newUsers: 590, revenue: "₹8.6L", avgScore: "74%", coursesCompleted: 402 },
];

export const CERT_TEMPLATES = [{ course: "Cloud Computing Fundamentals", issued: "Feb 04, 2026" }];
