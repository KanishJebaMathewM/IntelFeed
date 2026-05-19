export type Category = "scholarship" | "club" | "exam" | "internship" | "dept" | "office";
export type TipStatus = "published" | "pending" | "disputed";

export interface Verifier {
  id: string;
  name: string;
  initials: string;
  dept: string;
  year: string;
  note?: string;
}

export interface Tip {
  id: string;
  title: string;
  body: string;
  category: Category;
  dept: string;
  college: string;
  submittedAgo: string;
  deadline?: string;
  daysLeft?: number;
  verifiers: Verifier[];
  status: TipStatus;
  urgent?: boolean;
}

export const categoryMeta: Record<Category, { label: string; tone: "primary" | "coral" | "mint" | "yellow" | "muted" }> = {
  scholarship: { label: "Scholarship", tone: "coral" },
  club:        { label: "Club",        tone: "mint" },
  exam:        { label: "Exam",        tone: "yellow" },
  internship:  { label: "Internship",  tone: "primary" },
  dept:        { label: "Dept Norms",  tone: "primary" },
  office:      { label: "Office Hours", tone: "muted" },
};

const verifiers: Verifier[] = [
  { id: "v1", name: "Priya R.",   initials: "PR", dept: "CSE",    year: "Final Year", note: "I applied last cycle — process is exactly this." },
  { id: "v2", name: "Aman S.",    initials: "AS", dept: "ECE",    year: "Final Year", note: "Confirmed with the dept office on Tuesday." },
  { id: "v3", name: "Neha K.",    initials: "NK", dept: "CSE",    year: "3rd Year",   note: "Saw the notice on the placement portal." },
  { id: "v4", name: "Rohit M.",   initials: "RM", dept: "Mech",   year: "Final Year" },
  { id: "v5", name: "Sana V.",    initials: "SV", dept: "CSE",    year: "Final Year" },
  { id: "v6", name: "Karthik J.", initials: "KJ", dept: "Civil",  year: "3rd Year" },
];

export const tips: Tip[] = [
  {
    id: "t1",
    title: "PMSSS scholarship portal closes Friday — you can still re-upload your domicile certificate after submitting.",
    body: "The Prime Minister's Special Scholarship Scheme portal officially closes this Friday at 11:59 PM. What most freshers don't realize: even after you hit submit, you can edit your domicile certificate up to 24 hours after submission by emailing pmsss-support@aicte.gov.in with your application number in the subject line. Don't wait until Thursday — server crashes are guaranteed.",
    category: "scholarship",
    dept: "All Depts",
    college: "IIT Madras",
    submittedAgo: "4h ago",
    deadline: "Fri, 24 May",
    daysLeft: 2,
    verifiers: [verifiers[0], verifiers[1], verifiers[2], verifiers[4]],
    status: "published",
    urgent: true,
  },
  {
    id: "t2",
    title: "Prof. Iyer's CS2810 midterm always has one question from the last tutorial sheet — verbatim.",
    body: "Every year for the last four batches, the midterm for CS2810 (Operating Systems) has had exactly one question copied verbatim from the final tutorial sheet handed out the week before the exam. Don't skip that sheet. The question is usually worth 10–12 marks.",
    category: "exam",
    dept: "CSE",
    college: "IIT Madras",
    submittedAgo: "1d ago",
    deadline: "Mon, 27 May",
    daysLeft: 5,
    verifiers: [verifiers[0], verifiers[2], verifiers[4]],
    status: "published",
    urgent: true,
  },
  {
    id: "t3",
    title: "Robotics Club open recruitment — they only take freshers who attend the first Saturday workshop.",
    body: "The Robotics Club's official 'apply anytime' policy is misleading. In practice, the core team only seriously considers freshers who showed up to the very first Saturday introductory workshop in August. If you missed it, you're being polite-rejected. Email the secretary directly and ask to attend a project meeting instead.",
    category: "club",
    dept: "All Depts",
    college: "IIT Madras",
    submittedAgo: "2d ago",
    verifiers: [verifiers[1], verifiers[3]],
    status: "published",
  },
  {
    id: "t4",
    title: "Microsoft summer internship referrals close internally on the 30th — ping any senior who interned there.",
    body: "Microsoft's official summer internship portal is open until June 15, but referrals from current/past interns must be submitted via the internal MS Referral Hub by May 30. After that, your application goes into the general pile and the conversion rate drops sharply.",
    category: "internship",
    dept: "CSE",
    college: "IIT Madras",
    submittedAgo: "6h ago",
    deadline: "Thu, 30 May",
    daysLeft: 8,
    verifiers: [verifiers[0], verifiers[4]],
    status: "published",
  },
  {
    id: "t5",
    title: "Mech dept lets you swap one elective in the first 3 weeks — but only if you email the HoD, not the office.",
    body: "Officially the elective swap window is administered by the dept office, but in reality the office will tell you 'no swaps allowed.' Email Prof. Subramanian (HoD) directly with a one-line reason — he approves almost all of them in the first 3 weeks of semester.",
    category: "dept",
    dept: "Mech",
    college: "IIT Madras",
    submittedAgo: "3d ago",
    verifiers: [verifiers[3], verifiers[5]],
    status: "published",
  },
  {
    id: "t6",
    title: "Prof. Menon's office hours are technically Wed 3–5pm but he's actually around every weekday after 6pm.",
    body: "Listed office hours are nearly useless — too crowded. Walk into his office any weekday after 6pm, door is open, he's almost always there grading or reading. Much better conversations.",
    category: "office",
    dept: "ECE",
    college: "IIT Madras",
    submittedAgo: "5d ago",
    verifiers: [verifiers[1], verifiers[2], verifiers[5]],
    status: "published",
  },
];

export const tipById = (id: string) => tips.find(t => t.id === id) ?? tips[0];

export const user = {
  name: "Arjun Mehta",
  initials: "AM",
  dept: "CSE · 2nd Year",
  shortDept: "CSE",
  college: "IIT Madras",
  credibility: 87,
  tier: "Oracle" as const,
  stats: { submitted: 14, verified: 12, accuracy: 91 },
};

export const deadlines = [
  { id: "d1", title: "PMSSS scholarship final submission", daysLeft: 2, tone: "coral" as const },
  { id: "d2", title: "CS2810 midterm", daysLeft: 5, tone: "yellow" as const },
  { id: "d3", title: "Microsoft referral cutoff", daysLeft: 8, tone: "primary" as const },
];

export const contributors = [
  { id: "c1", name: "Priya Raghavan", initials: "PR", dept: "CSE · Final Year", score: 94 },
  { id: "c2", name: "Aman Sethi",     initials: "AS", dept: "ECE · Final Year", score: 89 },
  { id: "c3", name: "Neha Kapoor",    initials: "NK", dept: "CSE · 3rd Year",   score: 82 },
];

export const branchCoverage = [
  { dept: "CSE",      count: 184, tone: "mint" as const },
  { dept: "ECE",      count: 121, tone: "mint" as const },
  { dept: "Mech",     count: 67,  tone: "mint" as const },
  { dept: "Civil",    count: 28,  tone: "coral" as const },
  { dept: "Chemical", count: 14,  tone: "coral" as const },
  { dept: "Metallurgy", count: 9, tone: "coral" as const },
];

export const notifications = [
  { id: "n1", urgent: true,  unread: true,  title: "PMSSS portal closes in 2 days", subtitle: "Scholarship · verified by 4 seniors", chip: "2d left", time: "4h ago" },
  { id: "n2", urgent: true,  unread: true,  title: "CS2810 midterm tip just verified", subtitle: "Exam · verified by 3 seniors",    chip: "5d left", time: "6h ago" },
  { id: "n3", urgent: false, unread: false, title: "Your tip on Robotics Club went live", subtitle: "Club · 2 verifiers",            chip: "",        time: "1d ago" },
  { id: "n4", urgent: false, unread: false, title: "Aman Sethi added context to your tip", subtitle: "Internship · 1 new note",      chip: "",        time: "2d ago" },
  { id: "n5", urgent: false, unread: false, title: "3 new tips in CSE this week",       subtitle: "Branch digest",                   chip: "",        time: "3d ago" },
];

export const mySubmissions = [
  { id: "m1", title: "Mech dept elective swap email trick", category: "dept" as Category,        dept: "Mech", date: "12 May", status: "published" as TipStatus, verifierCount: 4 },
  { id: "m2", title: "MS referral cutoff is May 30",        category: "internship" as Category,  dept: "CSE",  date: "8 May",  status: "published" as TipStatus, verifierCount: 5 },
  { id: "m3", title: "PMSSS late-edit window",              category: "scholarship" as Category, dept: "All",  date: "2 May",  status: "published" as TipStatus, verifierCount: 6 },
  { id: "m4", title: "DSA TA grading is generous on style", category: "exam" as Category,        dept: "CSE",  date: "1 May",  status: "pending" as TipStatus,   verifierCount: 1 },
  { id: "m5", title: "Quiz 2 schedule rumour",              category: "exam" as Category,        dept: "CSE",  date: "28 Apr", status: "disputed" as TipStatus,  verifierCount: 3 },
];
