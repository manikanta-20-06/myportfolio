export const profile = {
  name: "MANIKANTA J N",
  shortName: "MANIKANTA JN",
  role: "AI & ML Student",
  degree: "B.E. Artificial Intelligence & Machine Learning",
  college: "S.E.A. College of Engineering & Technology",
  university: "Visvesvaraya Technological University (VTU)",
  graduation: "2028",
  location: "Bengaluru, Karnataka, India",
  email: "manikantajn2006@gmail.com",
  phone: "+91 9108985805",
  linkedin: "https://www.linkedin.com/in/manikanta-jn-9a567b373",
  github: "",
  resume: "/resume.pdf",
  intro:
    "I build practical AI and web systems — multilingual NLP, computer vision prototypes, REST APIs and learning tools.",
};

export const nav = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "CONTACT", href: "#connect" },
];

export const education = [
  {
    degree: "Bachelor of Technology",
    field: "Artificial Intelligence and Machine Learning",
    school: "Visvesvaraya Technological University, Belagavi",
    period: "2024 — MAY 2028",
    metric: "CGPA",
    value: "8.02",
    note: "Undergraduate · currently pursuing",
  },
  {
    degree: "Pre-University Education (II PUC)",
    field: "Science",
    school: "Government PU College, Kolar, Bengaluru",
    period: "Completed",
    metric: "Percentage",
    value: "87.89",
    note: "State board",
  },
];

export const skillGroups = [
  {
    index: "01",
    title: "AI / ML",
    items: ["Machine Learning", "Deep Learning", "NLP", "TensorFlow", "OpenCV"],
  },
  {
    index: "02",
    title: "Programming",
    items: ["Python", "Java", "JavaScript", "SQL"],
  },
  {
    index: "03",
    title: "Backend",
    items: ["Flask", "REST APIs", "JWT Authentication", "SQLAlchemy"],
  },
  {
    index: "04",
    title: "Data",
    items: ["MySQL", "SQLite", "Database Design", "SQL Joins"],
  },
  {
    index: "05",
    title: "Frontend",
    items: ["HTML5", "CSS3", "Responsive Interfaces"],
  },
  {
    index: "06",
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Postman"],
  },
];

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credential?: string;
  detail?: string;
};

export const certifications: Certification[] = [
  {
    id: "01",
    title: "Bharatiya Antariksh Hackathon 2026 — Certificate of Participation",
    issuer: "ISRO & Hack2skill",
    year: "2026",
    credential: "2026H2S06BAH-P07647",
  },
  {
    id: "02",
    title: "National Level Short Term Training Program — Java Full Stack with React JS & AI",
    issuer: "NSTTP",
    year: "2 Dec — 22 Dec 2024",
    credential: "NSTTP-BSA336",
  },
  {
    id: "03",
    title: "ZYNEX 2026 – Vision with Velocity Hackathon",
    issuer: "Google Developer Group on Campus (GDGoC), Cambridge Institute of Technology",
    year: "22–23 May 2026",
    detail: "Certificate of Participation · Round 2 · Team Vayu Veton",
  },
];

export const achievements = [
  {
    value: "87.89%",
    label: "Pre-University examination",
    sub: "Government PU College, Kolar",
  },
  {
    value: "8.02",
    label: "B.E. cumulative GPA",
    sub: "VTU · Artificial Intelligence & Machine Learning",
  },
];
