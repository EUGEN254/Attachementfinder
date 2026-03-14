// scripts/createCompanies.js
// import axios from 'axios';
// import logger from '../utils/logger.js';

// const API_URL = ""; 

// const companies = [
//   {
//     email: "safaricom@company.com",
//     password: "Company@123",
//     userType: "company",
//     companyName: "Safaricom"
//   },
//   {
//     email: "kcb@company.com",
//     password: "Company@123",
//     userType: "company",
//     companyName: "KCB Bank"
//   },
//   {
//     email: "twiga@company.com",
//     password: "Company@123",
//     userType: "company",
//     companyName: "Twiga Foods"
//   },
//   {
//     email: "andela@company.com",
//     password: "Company@123",
//     userType: "company",
//     companyName: "Andela"
//   },
//   {
//     email: "equity@company.com",
//     password: "Company@123",
//     userType: "company",
//     companyName: "Equity Bank"
//   },
//   {
//     email: "mkopa@company.com",
//     password: "Company@123",
//     userType: "company",
//     companyName: "M-KOPA Solar"
//   },
//   {
//     email: "cellulant@company.com",
//     password: "Company@123",
//     userType: "company",
//     companyName: "Cellulant"
//   },
//   {
//     email: "brck@company.com",
//     password: "Company@123",
//     userType: "company",
//     companyName: "BRCK"
//   },
//   {
//     email: "copia@company.com",
//     password: "Company@123",
//     userType: "company",
//     companyName: "Copia Kenya"
//   },
//   {
//     email: "ihub@company.com",
//     password: "Company@123",
//     userType: "company",
//     companyName: "iHub"
//   }
// ];

// async function createCompany(companyData) {
//   try {
//     logger.info(`Creating company: ${companyData.companyName}...`);
    
//     const response = await axios.post(`${API_URL}/register`, companyData, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     logger.success(`✅ Created: ${companyData.companyName}`);
//     return { success: true, data: response.data };
    
//   } catch (error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       if (error.response.data?.message === "Email already registered") {
//         logger.warn(`⚠️ Already exists: ${companyData.companyName} (${companyData.email})`);
//         return { success: true, exists: true };
//       }
//       logger.error(`❌ Failed: ${companyData.companyName} - ${error.response.data?.message || error.message}`);
//     } else if (error.request) {
//       // The request was made but no response was received
//       logger.error(`❌ No response from server for: ${companyData.companyName}`);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       logger.error(`❌ Error: ${companyData.companyName} - ${error.message}`);
//     }
//     return { success: false, error: error.message };
//   }
// }

// async function createAllCompanies() {
//   logger.info("🚀 Starting company registration...");
//   console.log("=================================");
  
//   let successCount = 0;
//   let existsCount = 0;
//   let failedCount = 0;

//   for (let i = 0; i < companies.length; i++) {
//     const company = companies[i];
    
//     console.log(`\n📌 [${i + 1}/${companies.length}] Processing: ${company.companyName}`);
    
//     const result = await createCompany(company);
    
//     if (result.success) {
//       if (result.exists) {
//         existsCount++;
//       } else {
//         successCount++;
//       }
//     } else {
//       failedCount++;
//     }
    
//     // Small delay to avoid overwhelming the server
//     await new Promise(resolve => setTimeout(resolve, 1000));
//   }

//   // Summary
//   console.log("\n=================================");
//   logger.info("📊 Registration Summary:");
//   console.log("=================================");
//   logger.success(`✅ New companies created: ${successCount}`);
//   logger.warn(`⚠️ Already existing: ${existsCount}`);
//   logger.error(`❌ Failed: ${failedCount}`);
//   console.log("=================================");
// }

// Run the function
// createAllCompanies();

// scripts/seedInternships.js
// import axios from 'axios';
// import FormData from 'form-data';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import dotenv from 'dotenv';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load environment variables
// dotenv.config({ path: path.join(__dirname, '../.env') });

// const ASSETS_PATH = path.join(__dirname, "../../client/src/assets");
// const API_URL = "";
// const SEED_KEY = process.env.SEED_KEY || "your-super-secret-seed-key-2024";

// // Company UUID mapping
// const companyIdMap = {
//   "Safaricom": "bfd98fc5-eb18-4ffd-bb4d-a40ea924f03b",
//   "KCB Bank": "7798e2ab-4286-4853-90f5-cfa30c5452e7",
//   "Twiga Foods": "d0daefe9-9823-4ea9-b1c0-213a3e43a837",
//   "Andela": "30ef9d80-a309-4e4c-ad35-0086c2303878",
//   "Equity Bank": "96627895-00d2-4582-8a43-7ca3cf8b81a4",
//   "M-KOPA Solar": "bb6ca0bc-ed9f-4a49-897a-da941e3411c4",
//   "Cellulant": "077f2f06-14bc-45ac-b835-e870e8bbbc59",
//   "BRCK": "5cd77864-9d2f-4499-a762-6759ac83504a",
//   "Copia Kenya": "109cea74-63f7-445d-a8f0-dd1a8fd33f88",
//   "iHub": "f68452a2-77fe-4c41-bc74-6b47d83662c2"
// };

// // Dummy companies data
// const dummyCompanies = [
//   { id: 1, name: "Safaricom", logo: "safaricom.jpg" },
//   { id: 2, name: "KCB Bank", logo: "kcb.jpg" },
//   { id: 3, name: "Twiga Foods", logo: "twiga.jpg" },
//   { id: 4, name: "Andela", logo: "andela.jpg" },
//   { id: 5, name: "Equity Bank", logo: "Equity.jpg" },
//   { id: 6, name: "M-KOPA Solar", logo: "mkopa.jpg" },
//   { id: 7, name: "Cellulant", logo: "l.jpg" },
//   { id: 8, name: "BRCK", logo: "brc.jpg" },
//   { id: 9, name: "Copia Kenya", logo: "copia.jpg" },
//   { id: 10, name: "iHub", logo: "ihub.jpg" }
// ];

// // Dummy internships data with CORRECT field names (snake_case)
// const dummyInternships = [
//   {
//     id: 1,
//     companyId: 1,
//     title: "Backend Intern",
//     location: "Nairobi",
//     duration: "3 Months",
//     description: "Work with the software team to develop backend services.",
//     required_skills: ["Python", "SQL", "Django"],
//     stipend: "KSh 20000/month",
//     image: "backend.jpg",
//     internship_type: "onsite",
//     experience_level: "beginner",
//     max_applications: 15,
//     perks: ["Certificate", "Mentorship", "Flexible hours"],
//     responsibilities: ["Complete assigned tasks", "Attend team meetings", "Submit weekly reports"]
//   },
//   {
//     id: 2,
//     companyId: 2,
//     title: "Marketing Intern",
//     location: "Nairobi",
//     duration: "2 Months",
//     description: "Support the marketing team with campaigns and research.",
//     required_skills: ["Marketing", "Excel", "Communication"],
//     stipend: "KSh 15000/month",
//     image: "marketing.jpg",
//     internship_type: "onsite",
//     experience_level: "beginner",
//     max_applications: 10,
//     perks: ["Certificate", "Mentorship"],
//     responsibilities: ["Create marketing content", "Analyze campaign data", "Support team activities"]
//   },
//   {
//     id: 3,
//     companyId: 3,
//     title: "Data Analyst Intern",
//     location: "Nairobi",
//     duration: "3 Months",
//     description: "Analyze data from operations and produce reports.",
//     required_skills: ["Excel", "SQL", "Python"],
//     stipend: "KSh 18000/month",
//     image: "data.jpg",
//     internship_type: "onsite",
//     experience_level: "beginner",
//     max_applications: 12,
//     perks: ["Certificate", "Mentorship", "Flexible hours"],
//     responsibilities: ["Clean and analyze data", "Create reports", "Present findings"]
//   },
//   {
//     id: 4,
//     companyId: 4,
//     title: "Frontend Developer Intern",
//     location: "Nairobi (Remote)",
//     duration: "4 Months",
//     description: "Build responsive web applications using modern frameworks.",
//     required_skills: ["JavaScript", "React", "CSS", "HTML"],
//     stipend: "KSh 25000/month",
//     image: "frontend.jpg",
//     internship_type: "remote",
//     experience_level: "beginner",
//     max_applications: 20,
//     perks: ["Certificate", "Mentorship", "Remote work", "Flexible hours"],
//     responsibilities: ["Build UI components", "Fix bugs", "Collaborate with team"]
//   },
//   {
//     id: 5,
//     companyId: 5,
//     title: "Finance Intern",
//     location: "Nairobi",
//     duration: "3 Months",
//     description: "Assist with financial analysis and reporting.",
//     required_skills: ["Excel", "Accounting", "Financial Analysis"],
//     stipend: "KSh 16000/month",
//     image: "finance.jpg",
//     internship_type: "onsite",
//     experience_level: "beginner",
//     max_applications: 8,
//     perks: ["Certificate", "Mentorship"],
//     responsibilities: ["Prepare financial reports", "Analyze data", "Assist with audits"]
//   },
//   {
//     id: 6,
//     companyId: 6,
//     title: "Sales Intern",
//     location: "Nairobi",
//     duration: "3 Months",
//     description: "Support sales team with customer outreach and lead generation.",
//     required_skills: ["Sales", "Communication", "CRM"],
//     stipend: "KSh 14000/month",
//     image: "sales.jpg",
//     internship_type: "onsite",
//     experience_level: "beginner",
//     max_applications: 15,
//     perks: ["Certificate", "Commission"],
//     responsibilities: ["Reach out to leads", "Update CRM", "Support sales team"]
//   },
//   {
//     id: 7,
//     companyId: 7,
//     title: "Mobile Developer Intern",
//     location: "Nairobi",
//     duration: "4 Months",
//     description: "Develop and maintain mobile applications.",
//     required_skills: ["Android", "Java", "Kotlin"],
//     stipend: "KSh 22000/month",
//     image: "mobile.jpg",
//     internship_type: "onsite",
//     experience_level: "intermediate",
//     max_applications: 10,
//     perks: ["Certificate", "Mentorship", "Equipment"],
//     responsibilities: ["Develop features", "Fix bugs", "Write documentation"]
//   },
//   {
//     id: 8,
//     companyId: 8,
//     title: "Hardware Engineering Intern",
//     location: "Nairobi",
//     duration: "3 Months",
//     description: "Assist in testing and assembling hardware components.",
//     required_skills: ["Electronics", "Soldering", "Testing"],
//     stipend: "KSh 17000/month",
//     image: "hardware.jpg",
//     internship_type: "onsite",
//     experience_level: "beginner",
//     max_applications: 6,
//     perks: ["Certificate", "Hands-on experience"],
//     responsibilities: ["Assemble hardware", "Run tests", "Document results"]
//   },
//   {
//     id: 9,
//     companyId: 9,
//     title: "Logistics Intern",
//     location: "Nairobi",
//     duration: "2 Months",
//     description: "Help optimize supply chain and delivery operations.",
//     required_skills: ["Logistics", "Excel", "Problem Solving"],
//     stipend: "KSh 15000/month",
//     image: "logistics.jpg",
//     internship_type: "onsite",
//     experience_level: "beginner",
//     max_applications: 10,
//     perks: ["Certificate", "Mentorship"],
//     responsibilities: ["Track deliveries", "Optimize routes", "Coordinate with drivers"]
//   },
//   {
//     id: 10,
//     companyId: 10,
//     title: "Community Manager Intern",
//     location: "Nairobi",
//     duration: "3 Months",
//     description: "Manage community events and social media engagement.",
//     required_skills: ["Social Media", "Event Planning", "Communication"],
//     stipend: "KSh 16000/month",
//     image: "community.jpg",
//     internship_type: "hybrid",
//     experience_level: "beginner",
//     max_applications: 12,
//     perks: ["Certificate", "Networking", "Flexible hours"],
//     responsibilities: ["Manage social media", "Plan events", "Engage with community"]
//   }
// ];

// function getRandomFutureDate() {
//   const date = new Date();
//   date.setDate(date.getDate() + Math.floor(Math.random() * 30) + 30);
//   return date.toISOString().split('T')[0];
// }

// async function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function createInternshipViaAPI(internship, companyName) {
//   try {
//     const companyId = companyIdMap[companyName];
    
//     if (!companyId) {
//       console.error(`❌ No UUID for company: ${companyName}`);
//       return false;
//     }

//     // Prepare form data
//     const formData = new FormData();
    
//     // Add all fields with CORRECT snake_case names
//     formData.append('companyId', companyId);
//     formData.append('title', internship.title);
//     formData.append('description', internship.description);
//     formData.append('location', internship.location);
//     formData.append('duration', internship.duration);
//     formData.append('stipend', internship.stipend);
//     formData.append('internship_type', internship.internship_type);
//     formData.append('experience_level', internship.experience_level);
//     formData.append('max_applications', internship.max_applications);
//     formData.append('application_deadline', getRandomFutureDate());
    
//     // Create requirements string
//     const requirements = `Required skills: ${internship.required_skills.join(", ")}`;
//     formData.append('requirements', requirements);
    
//     // Arrays need to be stringified
//     formData.append('required_skills', JSON.stringify(internship.required_skills));
//     formData.append('perks', JSON.stringify(internship.perks));
//     formData.append('responsibilities', JSON.stringify(internship.responsibilities));
    
//     // Add image if exists
//     if (internship.image) {
//       const imagePath = path.join(ASSETS_PATH, internship.image);
//       if (fs.existsSync(imagePath)) {
//         formData.append('image', fs.createReadStream(imagePath));
//         console.log(`   📸 Attaching image: ${internship.image}`);
//       } else {
//         console.log(`   ⚠️ Image not found: ${internship.image}`);
//       }
//     }

//     // Make API request
//     const response = await axios.post(`${API_URL}/internships/create`, formData, {
//       headers: {
//         ...formData.getHeaders(),
//         'x-seed-key': SEED_KEY
//       }
//     });

//     if (response.data.success) {
//       console.log(`   ✅ Success: ${internship.title} at ${companyName}`);
//       return true;
//     } else {
//       console.error(`   ❌ Failed: ${response.data.message}`);
//       return false;
//     }
//   } catch (error) {
//     console.error(`   ❌ Error:`, error.response?.data?.message || error.message);
//     return false;
//   }
// }

// async function seedInternships() {
//   console.log("🚀 Starting internship seeding via API...");
//   console.log("==========================================");

//   // Check if assets directory exists
//   if (!fs.existsSync(ASSETS_PATH)) {
//     console.error(`❌ Assets directory not found: ${ASSETS_PATH}`);
//     return;
//   }

//   console.log(`📁 Looking for images in: ${ASSETS_PATH}`);
  
//   // List available images
//   const availableImages = fs.readdirSync(ASSETS_PATH).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));
//   console.log(`📸 Available images: ${availableImages.join(', ')}`);

//   let successCount = 0;
//   let failedCount = 0;

//   for (let i = 0; i < dummyInternships.length; i++) {
//     const internship = dummyInternships[i];
//     const company = dummyCompanies.find(c => c.id === internship.companyId);
    
//     if (!company) {
//       console.error(`❌ Company not found for ID: ${internship.companyId}`);
//       failedCount++;
//       continue;
//     }

//     console.log(`\n📌 [${i + 1}/${dummyInternships.length}] ${internship.title} at ${company.name}`);
    
//     const success = await createInternshipViaAPI(internship, company.name);
    
//     if (success) {
//       successCount++;
//     } else {
//       failedCount++;
//     }
    
//     // Small delay between requests
//     await sleep(1000);
// //   }

//   // Summary
//   console.log("\n=================================");
//   console.log("📊 Internship Seeding Summary:");
//   console.log("=================================");
//   console.log(`✅ Successfully created: ${successCount}`);
//   console.log(`❌ Failed: ${failedCount}`);
//   console.log("=================================");
// }

// // Run the seed
// seedInternships();