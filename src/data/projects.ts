export type VisualKind = "grid" | "route" | "stack" | "scan";

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  period?: string;
  visual: VisualKind;
  summary: string;
  details: string[];
  stack: string[];
  links: { label: string; href: string }[];
  disclaimer?: string;
};

export const projects: Project[] = [
  {
    id: "civicconnect",
    index: "01",
    title: "CIVICCONNECT",
    subtitle: "Multilingual civic issue management",
    visual: "route",
    summary:
      "An AI-assisted platform where residents report local problems, the system categorises and routes them, and officials track resolution in real time.",
    details: [
      "AI-powered issue reporting with assisted categorisation and routing",
      "Multilingual support so reports can be filed in regional languages",
      "Real-time tracking driven by WebSocket-based updates",
      "Three coordinated modules — citizen, official and administrator",
    ],
    stack: ["React.js", "Node.js", "PostgreSQL", "WebSockets", "AI", "Multilingual"],
    links: [],
  },
  {
    id: "skillbridge",
    index: "02",
    title: "SKILLBRIDGE",
    subtitle: "AI-powered rural student upskilling",
    period: "June 2026",
    visual: "stack",
    summary:
      "A centralised learning platform that gives rural students access to industry-relevant courses, videos, notes and quizzes — with content translated into regional languages.",
    details: [
      "Flask backend and RESTful APIs for authentication, courses, quizzes and resources",
      "AI-powered multilingual translation of course and quiz content",
      "AI assistant that explains concepts and helps students navigate resources",
      "Responsive student dashboard with course tracking and learning progress",
    ],
    stack: [
      "Python",
      "Flask",
      "SQLite / MySQL",
      "JavaScript",
      "REST API",
      "AI / NLP",
      "Translation APIs",
    ],
    links: [],
  },
  {
    id: "oncolens",
    index: "03",
    title: "ONCOLENS AI",
    subtitle: "AI-assisted medical imaging prototype",
    period: "March 2026",
    visual: "scan",
    summary:
      "A student-built imaging prototype that accepts CT, MRI and X-ray scans and runs deep-learning classification to assist a reviewer's read.",
    details: [
      "Flask REST APIs wrapping deep-learning image classification models",
      "OpenCV and TensorFlow preprocessing for scan enhancement and anomaly detection",
      "Automated report generation with confidence scoring for identified regions",
      "Role-based dashboards for scans, records and trend visualisation",
    ],
    stack: ["Python", "Flask", "TensorFlow", "OpenCV", "MySQL"],
    links: [],
    disclaimer:
      "Academic prototype built for learning. Not a clinically validated medical device.",
  },
  {
    id: "tictactoe",
    index: "04",
    title: "TIC TAC TOE",
    subtitle: "Full-stack game on .NET Web API",
    visual: "grid",
    summary:
      "A responsive tic-tac-toe game played against the computer, with the client and the game logic split across a real REST boundary.",
    details: [
      "Interactive 3×3 board with a computer opponent",
      "Undo a move, running scoreboard and timed moves",
      "Angular client consuming a .NET Web API over REST",
      "API verified end-to-end with Postman",
    ],
    stack: ["Angular", "C#", ".NET", ".NET Web API", "REST API", "Postman"],
    links: [],
  },
];
