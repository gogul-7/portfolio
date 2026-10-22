export const profile = {
  name: "Gogul Krishna",
  role: "Full Stack Developer",
  location: "Bangalore, India",
  email: "gogulcp3@gmail.com",
  phone: "+91 9037403283",
  phoneHref: "tel:+919037403283",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/gogul-7" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/gogul-krishna-a1288226b/" },
  { label: "X", href: "https://x.com/gogulkrishnak" },
];

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export const stats = [
  { value: 3, suffix: "+", label: "Years building" },
  { value: 20, suffix: "+", label: "Projects shipped" },
  { value: 1000, suffix: "+", label: "App users on Play Store" },
];

export const experiences = [
  {
    role: "Full Stack Developer",
    company: "Liquidlab Infosystems LLP",
    place: "Bengaluru",
    period: "Apr 2025 — Present",
    description:
      "Designing and developing end-to-end IoT systems that connect frontend dashboards, backend services and hardware devices. Building real-time monitoring for enterprise clients.",
    details: [
      "Scalable React dashboards for real-time asset & parking monitoring",
      "Node.js services for high-frequency device data streams",
      "MQTT device-to-server communication pipelines",
      "UDP communication for real-time display boards",
      "APIs for RFID and ANPR-based tracking systems",
      "Role-based auth with Azure Active Directory",
    ],
  },
  {
    role: "Frontend Developer",
    company: "ParkQwik",
    place: "Bengaluru",
    period: "Jun 2023 — Apr 2025",
    description:
      "Built web and mobile applications with React.js and React Native. Created reusable UI components and improved frontend architecture for faster, smoother experiences.",
    details: [
      "Shipped a React Native app with 1000+ active users on Play Store",
      "Reusable UI component library for a consistent design",
      "REST API integrations tuned for performance",
      "Improved responsiveness and load times",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Luminar Technolab",
    place: "Kochi",
    period: "Jun 2022 — Dec 2022",
    description:
      "Built full-stack applications with React.js and Node.js, worked with MongoDB and SQL databases, and assisted with cloud deployment workflows.",
    details: [
      "Full-stack apps with React.js and Node.js",
      "MongoDB and SQL data modelling",
      "AWS-based cloud deployment workflows",
    ],
  },
];

export type ProjectVisual = "tims" | "cpgs" | "anpr";

export const projects: {
  title: string;
  short: string;
  description: string;
  tags: string[];
  highlights: string[];
  visual: ProjectVisual;
}[] = [
  {
    title: "Trolley Inventory Management System",
    short: "TIMS",
    description:
      "RFID-based real-time trolley tracking deployed at Kempegowda International Airport. A central dashboard for live monitoring, alerts, zone-based inventory on interactive floor plans, and analytics.",
    tags: ["React", "Node.js", "RFID", "Azure AD", "MongoDB"],
    highlights: ["Live in production at BLR airport", "Zone-level floor plans", "Real-time alerts"],
    visual: "tims",
  },
  {
    title: "Camera-Based Parking Guidance System",
    short: "CPGS",
    description:
      "Real-time parking management on Raspberry Pi camera devices. Live slot visualisation, MQTT for instant updates and UDP-driven display boards that show availability at every level.",
    tags: ["React", "Node.js", "MQTT", "Raspberry Pi", "UDP"],
    highlights: ["Edge devices on Raspberry Pi", "MQTT event pipeline", "UDP display boards"],
    visual: "cpgs",
  },
  {
    title: "ANPR Parking Management System",
    short: "ANPR",
    description:
      "Ticketless parking with Automatic Number Plate Recognition. Entry and exit tracking, automated tariff calculation, and fuzzy search that finds the closest matching plate with optimised queries.",
    tags: ["React", "Node.js", "ANPR", "MongoDB", "Fuzzy Search"],
    highlights: ["Ticketless entry & exit", "Automated tariffs", "Fuzzy plate matching"],
    visual: "anpr",
  },
];

export const skillGroups = [
  {
    category: "Frontend",
    blurb: "Interfaces that stay fast while data streams in.",
    skills: ["React.js", "Next.js", "TypeScript", "Redux", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Mobile",
    blurb: "Shipped to real users on the Play Store.",
    skills: ["React Native", "Play Store Deployment", "REST APIs"],
  },
  {
    category: "Backend",
    blurb: "Services built for high-frequency device data.",
    skills: ["Node.js", "Express", "MongoDB", "SQL", "REST APIs"],
  },
  {
    category: "IoT & Real-time",
    blurb: "Hardware talking to dashboards, live.",
    skills: ["MQTT", "UDP", "RFID", "ANPR", "Raspberry Pi"],
  },
  {
    category: "Cloud & Auth",
    blurb: "Secure, deployable, enterprise-ready.",
    skills: ["Azure AD", "AWS", "CI/CD", "Git"],
  },
];

export const marqueeItems = [
  "React.js", "React Native", "Node.js", "MongoDB", "MQTT", "Next.js",
  "TypeScript", "RFID", "UDP", "Raspberry Pi", "Azure AD", "AWS", "Express", "ANPR",
];
