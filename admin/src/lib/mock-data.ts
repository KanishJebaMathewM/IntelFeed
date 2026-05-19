export const COLLEGES = [
  "IIT Bombay",
  "IIT Delhi",
  "BITS Pilani",
  "NIT Trichy",
  "VIT Vellore",
  "IIIT Hyderabad",
];

export const BRANCHES = ["CSE", "ECE", "MECH", "EEE", "CIVIL", "CHEM"];

export const DEPARTMENTS = [
  "Placements",
  "Scholarships",
  "Internships",
  "Hackathons",
  "Faculty Notes",
  "Hostel & Mess",
  "Research",
  "Exams",
];

export type TipStatus = "Pending" | "Published" | "Disputed" | "Expired";

export interface Tip {
  id: string;
  text: string;
  category: string;
  department: string;
  college: string;
  submitter: { name: string; initials: string; role: string };
  verifiers: { initials: string }[];
  verifierCount: number;
  status: TipStatus;
  deadline: string; // ISO
  body: string;
}

const today = new Date();
const daysFrom = (n: number) =>
  new Date(today.getTime() + n * 86_400_000).toISOString();

export const TIPS: Tip[] = [
  {
    id: "t1",
    text: "Tata scholarship portal opens Friday — keep income proof PDF ready",
    category: "Scholarship",
    department: "Scholarships",
    college: "IIT Bombay",
    submitter: { name: "Ravi K.", initials: "RK", role: "Senior · CSE" },
    verifiers: [{ initials: "AS" }, { initials: "MM" }, { initials: "PL" }],
    verifierCount: 7,
    status: "Pending",
    deadline: daysFrom(2),
    body: "The Tata Scholarship portal is opening on Friday at 10am. You need a scanned PDF of income proof under 2MB, latest marksheet, and a 200-word SOP. Last year cutoff was around 8.4 CGPA for CSE.",
  },
  {
    id: "t2",
    text: "Goldman Sachs is pre-screening from CDC portal — apply by Sunday",
    category: "Placement",
    department: "Placements",
    college: "BITS Pilani",
    submitter: { name: "Anika S.", initials: "AS", role: "Senior · ECE" },
    verifiers: [{ initials: "RK" }, { initials: "VP" }],
    verifierCount: 12,
    status: "Published",
    deadline: daysFrom(5),
    body: "Goldman Sachs Engineering is pre-screening shortlists via the CDC portal. Resume deadline Sunday 11:59pm. CGPA cutoff 7.5, no active backlogs.",
  },
  {
    id: "t3",
    text: "DRDO summer internship slots open — only 4 seats per branch",
    category: "Internship",
    department: "Internships",
    college: "NIT Trichy",
    submitter: { name: "Manish M.", initials: "MM", role: "Senior · MECH" },
    verifiers: [{ initials: "AS" }],
    verifierCount: 3,
    status: "Pending",
    deadline: daysFrom(1),
    body: "DRDO has opened a summer internship cycle. 4 seats per branch, application via institute portal. Stipend ₹15k/month, 8 weeks.",
  },
  {
    id: "t4",
    text: "Smart India Hackathon team registration extended to next week",
    category: "Hackathon",
    department: "Hackathons",
    college: "VIT Vellore",
    submitter: { name: "Priya L.", initials: "PL", role: "Senior · CSE" },
    verifiers: [{ initials: "RK" }, { initials: "MM" }, { initials: "VP" }, { initials: "AS" }],
    verifierCount: 18,
    status: "Published",
    deadline: daysFrom(8),
    body: "SIH team registrations extended by one week. Teams of 6, at least 1 female member required, faculty mentor optional but recommended.",
  },
  {
    id: "t5",
    text: "Prof. Mehta is taking over Algorithms — uses old 2019 question bank",
    category: "Faculty",
    department: "Faculty Notes",
    college: "IIIT Hyderabad",
    submitter: { name: "Vikram P.", initials: "VP", role: "Senior · CSE" },
    verifiers: [],
    verifierCount: 0,
    status: "Disputed",
    deadline: daysFrom(-1),
    body: "Heard from a TA that Prof. Mehta is taking the Algorithms course this semester and tends to repeat questions from the 2019 question bank.",
  },
  {
    id: "t6",
    text: "Mess menu changing from Monday — non-veg moved to Thursday only",
    category: "Hostel",
    department: "Hostel & Mess",
    college: "IIT Delhi",
    submitter: { name: "Shreya D.", initials: "SD", role: "Senior · CHEM" },
    verifiers: [{ initials: "VP" }],
    verifierCount: 5,
    status: "Published",
    deadline: daysFrom(14),
    body: "Mess committee finalized new menu. Non-veg only on Thursdays. Sunday brunch continues.",
  },
  {
    id: "t7",
    text: "End-sem reschedule rumor — official notice still pending",
    category: "Exams",
    department: "Exams",
    college: "IIT Bombay",
    submitter: { name: "Karthik R.", initials: "KR", role: "Senior · EEE" },
    verifiers: [],
    verifierCount: 0,
    status: "Expired",
    deadline: daysFrom(-3),
    body: "Rumor of end-sem being pushed by a week. No official notice yet — treat as unverified.",
  },
  {
    id: "t8",
    text: "Microsoft IDC research apprentice applications close Wed midnight",
    category: "Research",
    department: "Research",
    college: "IIIT Hyderabad",
    submitter: { name: "Anika S.", initials: "AS", role: "Senior · CSE" },
    verifiers: [{ initials: "RK" }, { initials: "VP" }, { initials: "MM" }],
    verifierCount: 9,
    status: "Pending",
    deadline: daysFrom(3),
    body: "Microsoft IDC research apprentice program — 6 month, paid, work with PhD researchers. Apply via Microsoft careers portal.",
  },
];

export const DEPT_ACTIVITY = [
  { dept: "Placements", count: 312 },
  { dept: "Scholarships", count: 248 },
  { dept: "Internships", count: 196 },
  { dept: "Hackathons", count: 142 },
  { dept: "Faculty Notes", count: 118 },
  { dept: "Hostel & Mess", count: 89 },
  { dept: "Research", count: 64 },
  { dept: "Exams", count: 31 },
];

export interface ActivityEvent {
  id: string;
  type: "verified" | "submitted" | "disputed";
  text: string;
  college: string;
  branch: string;
  ago: string;
}

export const ACTIVITY: ActivityEvent[] = [
  { id: "a1", type: "verified", text: "Tip on TCS hiring freeze verified by 5 seniors", college: "IIT Bombay", branch: "CSE", ago: "2m" },
  { id: "a2", type: "submitted", text: "New tip submitted — Adobe internship deadline", college: "BITS Pilani", branch: "CSE", ago: "6m" },
  { id: "a3", type: "disputed", text: "Faculty note disputed — conflicting reports", college: "IIIT Hyderabad", branch: "CSE", ago: "12m" },
  { id: "a4", type: "verified", text: "Hostel mess change verified", college: "IIT Delhi", branch: "CHEM", ago: "24m" },
  { id: "a5", type: "submitted", text: "Smart India Hackathon update submitted", college: "VIT Vellore", branch: "ECE", ago: "38m" },
  { id: "a6", type: "verified", text: "Goldman Sachs JD verified by 12 seniors", college: "BITS Pilani", branch: "ECE", ago: "1h" },
  { id: "a7", type: "submitted", text: "DRDO internship intel submitted", college: "NIT Trichy", branch: "MECH", ago: "1h" },
  { id: "a8", type: "disputed", text: "End-sem reschedule rumor flagged", college: "IIT Bombay", branch: "EEE", ago: "2h" },
];

export interface CollegeHealth {
  college: string;
  total: number;
  verified: number;
  pending: number;
  disputed: number;
}

export const COLLEGE_HEALTH: CollegeHealth[] = [
  { college: "IIT Bombay", total: 312, verified: 248, pending: 42, disputed: 22 },
  { college: "IIT Delhi", total: 287, verified: 231, pending: 38, disputed: 18 },
  { college: "BITS Pilani", total: 264, verified: 219, pending: 31, disputed: 14 },
  { college: "NIT Trichy", total: 198, verified: 152, pending: 35, disputed: 11 },
  { college: "VIT Vellore", total: 156, verified: 118, pending: 27, disputed: 11 },
  { college: "IIIT Hyderabad", total: 142, verified: 108, pending: 22, disputed: 12 },
];

export type AccountStatus = "Active" | "Banned" | "Pending";
export type UserRole = "Student" | "Senior";

export interface AdminUser {
  id: string;
  name: string;
  initials: string;
  email: string;
  college: string;
  branch: string;
  role: UserRole;
  credibility: number; // 0-100
  tipsSubmitted: number;
  tipsVerified: number;
  accuracy: number;
  status: AccountStatus;
}

const userSeed: Omit<AdminUser, "id" | "initials">[] = [
  { name: "Anika Sharma", email: "anika.s@iitb.ac.in", college: "IIT Bombay", branch: "CSE", role: "Senior", credibility: 92, tipsSubmitted: 47, tipsVerified: 31, accuracy: 94, status: "Active" },
  { name: "Ravi Kumar", email: "ravi.k@iitb.ac.in", college: "IIT Bombay", branch: "CSE", role: "Senior", credibility: 88, tipsSubmitted: 39, tipsVerified: 28, accuracy: 90, status: "Active" },
  { name: "Priya Lal", email: "priya.l@vit.ac.in", college: "VIT Vellore", branch: "CSE", role: "Senior", credibility: 81, tipsSubmitted: 33, tipsVerified: 22, accuracy: 86, status: "Active" },
  { name: "Manish Menon", email: "manish.m@nitt.edu", college: "NIT Trichy", branch: "MECH", role: "Senior", credibility: 76, tipsSubmitted: 28, tipsVerified: 18, accuracy: 82, status: "Active" },
  { name: "Vikram P.", email: "vikram.p@iiit.ac.in", college: "IIIT Hyderabad", branch: "CSE", role: "Senior", credibility: 54, tipsSubmitted: 22, tipsVerified: 11, accuracy: 64, status: "Active" },
  { name: "Karthik R.", email: "karthik.r@iitd.ac.in", college: "IIT Delhi", branch: "EEE", role: "Senior", credibility: 38, tipsSubmitted: 12, tipsVerified: 4, accuracy: 48, status: "Banned" },
  { name: "Shreya Das", email: "shreya.d@iitd.ac.in", college: "IIT Delhi", branch: "CHEM", role: "Senior", credibility: 84, tipsSubmitted: 31, tipsVerified: 24, accuracy: 88, status: "Active" },
  { name: "Neha Iyer", email: "neha.i@bits.ac.in", college: "BITS Pilani", branch: "ECE", role: "Student", credibility: 71, tipsSubmitted: 9, tipsVerified: 0, accuracy: 78, status: "Active" },
  { name: "Arjun M.", email: "arjun.m@vit.ac.in", college: "VIT Vellore", branch: "MECH", role: "Student", credibility: 0, tipsSubmitted: 0, tipsVerified: 0, accuracy: 0, status: "Pending" },
  { name: "Divya R.", email: "divya.r@iitb.ac.in", college: "IIT Bombay", branch: "CIVIL", role: "Student", credibility: 62, tipsSubmitted: 4, tipsVerified: 0, accuracy: 72, status: "Active" },
];

export const USERS: AdminUser[] = userSeed.map((u, i) => ({
  ...u,
  id: `u${i + 1}`,
  initials: u.name.split(" ").map((p) => p[0]).slice(0, 2).join(""),
}));

export interface CoverageDept {
  department: string;
  college: string;
  tips: number;
  lastIntelDays: number | null;
}

export const COVERAGE: CoverageDept[] = [
  { department: "Placements", college: "IIT Bombay", tips: 24, lastIntelDays: 1 },
  { department: "Scholarships", college: "IIT Bombay", tips: 14, lastIntelDays: 3 },
  { department: "Hostel & Mess", college: "IIT Bombay", tips: 2, lastIntelDays: 12 },
  { department: "Research", college: "IIT Bombay", tips: 0, lastIntelDays: null },
  { department: "Placements", college: "IIT Delhi", tips: 19, lastIntelDays: 2 },
  { department: "Faculty Notes", college: "IIT Delhi", tips: 3, lastIntelDays: 8 },
  { department: "Exams", college: "IIT Delhi", tips: 0, lastIntelDays: null },
  { department: "Internships", college: "BITS Pilani", tips: 22, lastIntelDays: 1 },
  { department: "Hackathons", college: "BITS Pilani", tips: 11, lastIntelDays: 4 },
  { department: "Research", college: "BITS Pilani", tips: 1, lastIntelDays: 21 },
  { department: "Placements", college: "NIT Trichy", tips: 17, lastIntelDays: 2 },
  { department: "Faculty Notes", college: "NIT Trichy", tips: 0, lastIntelDays: null },
  { department: "Internships", college: "VIT Vellore", tips: 9, lastIntelDays: 5 },
  { department: "Scholarships", college: "VIT Vellore", tips: 2, lastIntelDays: 14 },
  { department: "Research", college: "IIIT Hyderabad", tips: 18, lastIntelDays: 1 },
  { department: "Hostel & Mess", college: "IIIT Hyderabad", tips: 0, lastIntelDays: null },
];

export const DAILY_SERIES = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(today.getTime() - (13 - i) * 86_400_000);
  const submitted = 40 + Math.round(Math.sin(i / 2) * 12 + i * 1.4 + 10);
  const verified = Math.round(submitted * (0.6 + Math.cos(i / 3) * 0.08));
  return {
    date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    submitted,
    verified,
  };
});

export const COLLEGE_BREAKDOWN = COLLEGE_HEALTH.map((c) => ({
  college: c.college,
  total: c.total,
  published: c.verified,
  pending: c.pending,
  disputed: c.disputed,
  expired: Math.round(c.total * 0.04),
  activeSeniors: 8 + Math.round(c.total / 18),
  coverage:
    c.verified / c.total > 0.78
      ? ("High" as const)
      : c.verified / c.total > 0.7
        ? ("Medium" as const)
        : ("Low" as const),
}));
