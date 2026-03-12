// companies logos
import safaricom from "./safaricom.jpg";
import kcb from "./kcb.jpg";
import twiga from "./twiga.jpg";
import andela from "./andela.jpg";
import equity from "./Equity.jpg";
import mkopa from "./mkopa.jpg";
import cellulant from "./l.jpg";
import brck from "./brc.jpg";
import copia from "./copia.jpg";
import ihub from "./ihub.jpg";

// internship images
import backendIntern from "./backend.jpg";
import marketingIntern from "./marketing.jpg";
import dataAnalystIntern from "./data.jpg";
import frontendIntern from "./frontend.jpg";
import financeIntern from "./finance.jpg";
import salesIntern from "./sales.jpg";
import mobileIntern from "./mobile.jpg";
import hardwareIntern from "./hardware.jpg";
import logisticsIntern from "./logistics.jpg";
import communityIntern from "./community.jpg";

// Dummy Users (Students)
export const users = [
  {
    id: 1,
    name: "John Mwangi",
    email: "john.mwangi@example.com",
    university: "Moi University",
    skills: ["Python", "React", "SQL"],
    profileImage: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Mary Wanjiru",
    email: "mary.wanjiru@example.com",
    university: "Kenyatta University",
    skills: ["Marketing", "Excel", "Communication"],
    profileImage: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "David Otieno",
    email: "david.otieno@example.com",
    university: "University of Nairobi",
    skills: ["JavaScript", "Node.js", "CSS"],
    profileImage: "https://via.placeholder.com/150",
  },
];

// dummy companies
export const companies = [
  {
    id: 1,
    name: "Safaricom",
    location: "Nairobi",
    industry: "Telecommunications",
    logo: safaricom,
  },
  {
    id: 2,
    name: "KCB Bank",
    location: "Nairobi",
    industry: "Banking",
    logo: kcb,
  },
  {
    id: 3,
    name: "Twiga Foods",
    location: "Nairobi",
    industry: "Agriculture",
    logo: twiga,
  },
  {
    id: 4,
    name: "Andela",
    location: "Nairobi",
    industry: "Technology",
    logo: andela,
  },
  {
    id: 5,
    name: "Equity Bank",
    location: "Nairobi",
    industry: "Banking",
    logo: equity,
  },
  {
    id: 6,
    name: "M-KOPA Solar",
    location: "Nairobi",
    industry: "Renewable Energy",
    logo: mkopa,
  },
  {
    id: 7,
    name: "Cellulant",
    location: "Nairobi",
    industry: "Fintech",
    logo: cellulant,
  },
  {
    id: 8,
    name: "BRCK",
    location: "Nairobi",
    industry: "Hardware & Connectivity",
    logo: brck,
  },
  {
    id: 9,
    name: "Copia Kenya",
    location: "Nairobi",
    industry: "E-commerce",
    logo: copia,
  },
  {
    id: 10,
    name: "iHub",
    location: "Nairobi",
    industry: "Innovation Hub",
    logo: ihub,
  },
];

// dummy internships
export const internships = [
  {
    id: 1,
    companyId: 1,
    role: "Backend Intern",
    location: "Nairobi",
    duration: "3 Months",
    description: "Work with the software team to develop backend services.",
    requiredSkills: ["Python", "SQL", "Django"],
    stipend: "200/month",
    image: backendIntern,
  },
  {
    id: 2,
    companyId: 2,
    role: "Marketing Intern",
    location: "Nairobi",
    duration: "2 Months",
    description: "Support the marketing team with campaigns and research.",
    requiredSkills: ["Marketing", "Excel", "Communication"],
    stipend: "150/month",
    image: marketingIntern,
  },
  {
    id: 3,
    companyId: 3,
    role: "Data Analyst Intern",
    location: "Nairobi",
    duration: "3 Months",
    description: "Analyze data from operations and produce reports.",
    requiredSkills: ["Excel", "SQL", "Python"],
    stipend: "180/month",
    image: dataAnalystIntern,
  },
  {
    id: 4,
    companyId: 4,
    role: "Frontend Developer Intern",
    location: "Nairobi (Remote)",
    duration: "4 Months",
    description: "Build responsive web applications using modern frameworks.",
    requiredSkills: ["JavaScript", "React", "CSS", "HTML"],
    stipend: "250/month",
    image: frontendIntern,
  },
  {
    id: 5,
    companyId: 5,
    role: "Finance Intern",
    location: "Nairobi",
    duration: "3 Months",
    description: "Assist with financial analysis and reporting.",
    requiredSkills: ["Excel", "Accounting", "Financial Analysis"],
    stipend: "160/month",
    image: financeIntern,
  },
  {
    id: 6,
    companyId: 6,
    role: "Sales Intern",
    location: "Nairobi",
    duration: "3 Months",
    description:
      "Support sales team with customer outreach and lead generation.",
    requiredSkills: ["Sales", "Communication", "CRM"],
    stipend: "$140/month",
    image: salesIntern,
  },
  {
    id: 7,
    companyId: 7,
    role: "Mobile Developer Intern",
    location: "Nairobi",
    duration: "4 Months",
    description: "Develop and maintain mobile applications.",
    requiredSkills: ["Android", "Java", "Kotlin"],
    stipend: "220/month",
    image: mobileIntern,
  },
  {
    id: 8,
    companyId: 8,
    role: "Hardware Engineering Intern",
    location: "Nairobi",
    duration: "3 Months",
    description: "Assist in testing and assembling hardware components.",
    requiredSkills: ["Electronics", "Soldering", "Testing"],
    stipend: "170/month",
    image: hardwareIntern,
  },
  {
    id: 9,
    companyId: 9,
    role: "Logistics Intern",
    location: "Nairobi",
    duration: "2 Months",
    description: "Help optimize supply chain and delivery operations.",
    requiredSkills: ["Logistics", "Excel", "Problem Solving"],
    stipend: "$150/month",
    image: logisticsIntern,
  },
  {
    id: 10,
    companyId: 10,
    role: "Community Manager Intern",
    location: "Nairobi",
    duration: "3 Months",
    description: "Manage community events and social media engagement.",
    requiredSkills: ["Social Media", "Event Planning", "Communication"],
    stipend: "160/month",
    image: communityIntern,
  },
];

// Skills
export const skills = [
  "Python",
  "JavaScript",
  "React",
  "Node.js",
  "SQL",
  "Excel",
  "Marketing",
  "Communication",
  "Django",
  "CSS",
  "Problem Solving",
];

// Internship Categories
export const categories = [
  "Software Development",
  "Marketing",
  "Finance",
  "Data Analysis",
  "Operations",
  "Design",
];


// Dummy Applications 
export const applications = [
  {
    id: 1,
    studentId: 1, // John Mwangi
    internshipId: 1, // Backend Intern at Safaricom
    status: "Under Review",
    appliedAt: "2026-03-08T10:00:00Z",
  },
  {
    id: 2,
    studentId: 2, // Mary Wanjiru
    internshipId: 1, // Backend Intern at Safaricom
    status: "Interview Scheduled",
    appliedAt: "2026-03-08T11:00:00Z",
  },
  {
    id: 3,
    studentId: 2, // Mary Wanjiru
    internshipId: 2, // Marketing Intern at KCB
    status: "Accepted",
    appliedAt: "2026-03-08T12:00:00Z",
  },
  {
    id: 4,
    studentId: 1, // John Mwangi
    internshipId: 3, // Data Analyst at Twiga Foods
    status: "Interview Scheduled",
    appliedAt: "2026-03-09T09:30:00Z",
  },
  {
    id: 5,
    studentId: 1, // John Mwangi
    internshipId: 4, // Frontend Developer at Andela
    status: "Pending",
    appliedAt: "2026-03-10T14:15:00Z",
  },
  {
    id: 6,
    studentId: 3, // David Otieno
    internshipId: 4, // Frontend Developer at Andela
    status: "Under Review",
    appliedAt: "2026-03-07T16:20:00Z",
  },
  {
    id: 7,
    studentId: 3, // David Otieno
    internshipId: 7, // Mobile Developer at Cellulant
    status: "Rejected",
    appliedAt: "2026-03-05T11:45:00Z",
  },
  {
    id: 8,
    studentId: 3, // David Otieno
    internshipId: 10, // Community Manager at iHub
    status: "Accepted",
    appliedAt: "2026-03-06T13:10:00Z",
  },
];


  // Get applications for current user (using user from context)
  // const userApplications = users[0] //&& isAuthenticated && user 
  //   ? applications.filter((app) => app.studentId === user[0].id)
  //   : [];