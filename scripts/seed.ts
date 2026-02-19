/**
 * Seed script — migrates existing static data into MongoDB.
 *
 * Usage: npx tsx scripts/seed.ts
 */

import mongoose from "mongoose"
import * as dotenv from "dotenv"
import path from "path"
import fs from "fs"

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, "../.env.local") })

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "portfolio"

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in .env.local")
    process.exit(1)
}

// ─── Import models (inline to avoid Next.js module issues) ───

import Project from "../models/Project"
import BlogPost from "../models/BlogPost"
import Profile from "../models/Profile"

// ─── Load existing data ───

const portfolioDataPath = path.resolve(__dirname, "../data/portfolio-data.json")
const portfolioData = JSON.parse(fs.readFileSync(portfolioDataPath, "utf-8"))

// Projects data (same as lib/projects.ts)
const projectsData = [
    {
        slug: "job-finder-app",
        title: "Job Finder App",
        category: "Mobile App",
        shortDescription: "A modern job search application designed to connect job seekers with employers efficiently.",
        description: [
            "The Job Finder App is a comprehensive mobile application designed to streamline the job search process. It provides an intuitive interface for job seekers to discover opportunities that match their skills and preferences.",
            "The app features a smart matching algorithm that analyzes user profiles and job requirements to suggest the most relevant positions. Users can easily filter jobs by location, industry, experience level, and salary range.",
            "For employers, the platform offers tools to post job listings, review applications, and communicate with potential candidates directly through the app.",
        ],
        features: [
            "Personalized job recommendations based on user skills and preferences",
            "Real-time notifications for new job postings and application updates",
            "In-app messaging system for direct communication between employers and candidates",
            "Resume builder with templates and formatting tools",
            "Interview scheduling and calendar integration",
            "Detailed analytics for job seekers to track their application progress",
        ],
        technologies: ["React Native", "TypeScript", "Node.js", "Express", "MongoDB", "AWS", "Firebase"],
        coverImage: "/job-finder-cover.png",
        thumbnailImage: "/modern-finance-app.png",
        gallery: [
            { url: "/job-finder-screen1.png", caption: "Home Screen with Job Recommendations" },
            { url: "/job-finder-screen2.png", caption: "Job Detail View" },
            { url: "/job-finder-screen3.png", caption: "User Profile and Skills" },
            { url: "/job-finder-screen4.png", caption: "Application Tracking Dashboard" },
        ],
        timeline: "3 months (Q2 2023)",
        role: "Lead Product Designer",
        liveUrl: "https://example.com/job-finder",
        githubUrl: "https://github.com/example/job-finder",
        relatedProjects: [
            { slug: "finance-dashboard", title: "Finance Dashboard", category: "Web Application", image: "/modern-finance-overview.png" },
            { slug: "ecommerce-redesign", title: "E-Commerce Redesign", category: "UX Case Study", image: "/modern-apparel-storefront.png" },
        ],
        isPublished: true,
    },
    {
        slug: "finance-dashboard",
        title: "Finance Dashboard",
        category: "Web Application",
        shortDescription: "A comprehensive financial management dashboard for tracking investments, expenses, and financial goals.",
        description: [
            "The Finance Dashboard is a powerful web application designed to help users manage their personal finances in one centralized location. It provides real-time insights into spending patterns, investment performance, and progress toward financial goals.",
            "The dashboard features interactive charts and visualizations that make complex financial data easy to understand at a glance. Users can connect multiple accounts, categorize transactions automatically, and receive personalized recommendations to improve their financial health.",
            "The application was designed with a focus on security, using bank-level encryption and authentication protocols to protect sensitive financial information.",
        ],
        features: [
            "Account aggregation from multiple financial institutions",
            "Automated transaction categorization and tagging",
            "Budget creation and expense tracking",
            "Investment portfolio analysis and performance metrics",
            "Goal setting with progress tracking",
            "Customizable reports and data exports",
            "Financial insights and recommendations",
        ],
        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Chart.js", "Plaid API", "PostgreSQL", "Vercel"],
        coverImage: "/finance-dashboard-cover.png",
        thumbnailImage: "/modern-finance-overview.png",
        gallery: [
            { url: "/finance-dashboard-screen1.png", caption: "Main Dashboard Overview" },
            { url: "/finance-dashboard-screen2.png", caption: "Expense Analysis" },
            { url: "/finance-dashboard-screen3.png", caption: "Investment Portfolio" },
            { url: "/finance-dashboard-screen4.png", caption: "Financial Goals Tracker" },
        ],
        timeline: "4 months (Q3-Q4 2022)",
        role: "UX/UI Designer & Frontend Developer",
        liveUrl: "https://example.com/finance-dashboard",
        githubUrl: "https://github.com/example/finance-dashboard",
        relatedProjects: [
            { slug: "job-finder-app", title: "Job Finder App", category: "Mobile App", image: "/modern-finance-app.png" },
            { slug: "ecommerce-redesign", title: "E-Commerce Redesign", category: "UX Case Study", image: "/modern-apparel-storefront.png" },
        ],
        isPublished: true,
    },
    {
        slug: "ecommerce-redesign",
        title: "E-Commerce Redesign",
        category: "UX Case Study",
        shortDescription: "A complete redesign of an e-commerce platform focused on improving user experience and conversion rates.",
        description: [
            "This project involved a comprehensive redesign of an established e-commerce platform that was struggling with user engagement and conversion rates. The goal was to create a more intuitive, visually appealing shopping experience that would drive sales and customer satisfaction.",
            "The redesign process began with extensive user research, including interviews, surveys, and usability testing of the existing platform. This research revealed key pain points in the customer journey, such as a complicated checkout process and difficulty finding products.",
            "Based on these insights, I developed a new information architecture and user flow that simplified navigation and streamlined the purchase process. The visual design was updated with a clean, modern aesthetic that highlighted product imagery and created a consistent brand experience across all touchpoints.",
        ],
        features: [
            "Simplified product navigation and filtering system",
            "Redesigned product detail pages with enhanced imagery and information",
            "Streamlined checkout process reducing steps by 40%",
            "Personalized product recommendations based on browsing history",
            "Mobile-first responsive design",
            "Improved search functionality with predictive suggestions",
            "Enhanced wishlist and saved items functionality",
        ],
        technologies: ["Figma", "Adobe XD", "HTML/CSS", "JavaScript", "Shopify", "Hotjar", "Google Analytics"],
        coverImage: "/ecommerce-redesign-cover.png",
        thumbnailImage: "/modern-apparel-storefront.png",
        gallery: [
            { url: "/ecommerce-redesign-screen1.png", caption: "Homepage Design" },
            { url: "/ecommerce-redesign-screen2.png", caption: "Product Category Page" },
            { url: "/ecommerce-redesign-screen3.png", caption: "Product Detail Page" },
            { url: "/ecommerce-redesign-screen4.png", caption: "Checkout Process" },
        ],
        client: "Fashion Retailer Inc.",
        timeline: "6 months (Q1-Q2 2022)",
        role: "Lead UX Designer",
        liveUrl: "https://example.com/fashion-retailer",
        relatedProjects: [
            { slug: "job-finder-app", title: "Job Finder App", category: "Mobile App", image: "/modern-finance-app.png" },
            { slug: "finance-dashboard", title: "Finance Dashboard", category: "Web Application", image: "/modern-finance-overview.png" },
        ],
        isPublished: true,
    },
]

// ─── Build Profile data from portfolio-data.json ───

const en = portfolioData.en
const vi = portfolioData.vi

const profileData = {
    name: en.personal.name,
    title: { en: en.personal.title, vi: vi.personal.title },
    location: { en: en.personal.location, vi: vi.personal.location },
    avatar: en.personal.avatar,
    email: en.personal.email,
    phone: en.personal.phone,
    workingHours: { en: en.personal.workingHours, vi: vi.personal.workingHours },
    availableForWork: en.personal.availableForWork,
    badges: { en: en.personal.badges, vi: vi.personal.badges },
    bio: { en: en.about.bio, vi: vi.about.bio },
    social: en.personal.social,
    focus: { en: en.about.focus, vi: vi.about.focus },
    languages: en.about.languages,
    interests: { en: en.about.interests, vi: vi.about.interests },
    experience: { en: en.experience, vi: vi.experience },
    credentials: { en: en.credentials, vi: vi.credentials },
    technicalSkills: { en: en.technicalSkills, vi: vi.technicalSkills },
    navigation: { en: en.navigation, vi: vi.navigation },
    meta: { en: en.meta, vi: vi.meta },
}

// ─── Seed function ───

async function seed() {
    console.log("🌱 Starting seed...\n")

    await mongoose.connect(MONGODB_URI!, { dbName: MONGODB_DB_NAME })
    console.log("✅ Connected to MongoDB\n")

    // --- Projects ---
    console.log("📦 Seeding projects...")
    await Project.deleteMany({})
    const createdProjects = await Project.insertMany(projectsData)
    console.log(`   ✅ ${createdProjects.length} projects seeded\n`)

    // --- Profile ---
    console.log("👤 Seeding profile...")
    await Profile.deleteMany({})
    await Profile.create(profileData)
    console.log("   ✅ Profile seeded\n")

    // --- Blog (empty collection, just ensure it exists) ---
    console.log("📝 Ensuring blog collection exists...")
    await BlogPost.createCollection()
    console.log("   ✅ Blog collection ready (0 posts — add via API)\n")

    console.log("🎉 Seed complete!")
    await mongoose.disconnect()
    process.exit(0)
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err)
    process.exit(1)
})
