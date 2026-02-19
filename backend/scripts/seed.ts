/**
 * Seed script — migrates existing static data into MongoDB.
 * Usage: npm run seed (from backend directory)
 */

import "dotenv/config"
import mongoose from "mongoose"
import * as fs from "fs"
import * as path from "path"

import Project from "../src/models/Project"
import BlogPost from "../src/models/BlogPost"
import Profile from "../src/models/Profile"

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "portfolio"

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in .env")
    process.exit(1)
}

// Load portfolio data from frontend
const portfolioDataPath = path.resolve(__dirname, "../../frontend/data/portfolio-data.json")
let portfolioData: any
try {
    portfolioData = JSON.parse(fs.readFileSync(portfolioDataPath, "utf-8"))
} catch {
    // Fallback to root level if frontend not yet moved
    const fallbackPath = path.resolve(__dirname, "../../data/portfolio-data.json")
    portfolioData = JSON.parse(fs.readFileSync(fallbackPath, "utf-8"))
}

const projectsData = [
    {
        slug: "job-finder-app",
        title: "Job Finder App",
        category: "Mobile App",
        shortDescription: "A modern job search application designed to connect job seekers with employers efficiently.",
        description: [
            "The Job Finder App is a comprehensive mobile application designed to streamline the job search process.",
            "The app features a smart matching algorithm that analyzes user profiles and job requirements.",
            "For employers, the platform offers tools to post job listings and communicate with candidates.",
        ],
        features: ["Personalized job recommendations", "Real-time notifications", "In-app messaging", "Resume builder", "Interview scheduling", "Application tracking"],
        technologies: ["React Native", "TypeScript", "Node.js", "Express", "MongoDB", "AWS", "Firebase"],
        coverImage: "/job-finder-cover.png",
        thumbnailImage: "/modern-finance-app.png",
        gallery: [
            { url: "/job-finder-screen1.png", caption: "Home Screen" },
            { url: "/job-finder-screen2.png", caption: "Job Detail View" },
            { url: "/job-finder-screen3.png", caption: "User Profile" },
            { url: "/job-finder-screen4.png", caption: "Application Tracking" },
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
        shortDescription: "A comprehensive financial management dashboard for tracking investments and goals.",
        description: [
            "The Finance Dashboard helps users manage personal finances in one centralized location.",
            "Features interactive charts and visualizations for complex financial data.",
            "Designed with bank-level encryption and authentication protocols.",
        ],
        features: ["Account aggregation", "Automated categorization", "Budget tracking", "Portfolio analysis", "Goal tracking", "Custom reports", "Financial insights"],
        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Chart.js", "Plaid API", "PostgreSQL", "Vercel"],
        coverImage: "/finance-dashboard-cover.png",
        thumbnailImage: "/modern-finance-overview.png",
        gallery: [
            { url: "/finance-dashboard-screen1.png", caption: "Dashboard Overview" },
            { url: "/finance-dashboard-screen2.png", caption: "Expense Analysis" },
            { url: "/finance-dashboard-screen3.png", caption: "Investment Portfolio" },
            { url: "/finance-dashboard-screen4.png", caption: "Financial Goals" },
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
        shortDescription: "A complete redesign of an e-commerce platform focused on user experience.",
        description: [
            "Comprehensive redesign of an e-commerce platform struggling with engagement.",
            "Began with extensive user research including interviews and usability testing.",
            "Developed new information architecture that simplified navigation and checkout.",
        ],
        features: ["Simplified navigation", "Enhanced product pages", "Streamlined checkout", "Personalized recommendations", "Mobile-first design", "Predictive search", "Enhanced wishlist"],
        technologies: ["Figma", "Adobe XD", "HTML/CSS", "JavaScript", "Shopify", "Hotjar", "Google Analytics"],
        coverImage: "/ecommerce-redesign-cover.png",
        thumbnailImage: "/modern-apparel-storefront.png",
        gallery: [
            { url: "/ecommerce-redesign-screen1.png", caption: "Homepage" },
            { url: "/ecommerce-redesign-screen2.png", caption: "Category Page" },
            { url: "/ecommerce-redesign-screen3.png", caption: "Product Detail" },
            { url: "/ecommerce-redesign-screen4.png", caption: "Checkout" },
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

// Build profile from portfolio data
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

async function seed() {
    console.log("🌱 Starting seed...\n")
    await mongoose.connect(MONGODB_URI!, { dbName: MONGODB_DB_NAME })
    console.log("✅ Connected to MongoDB\n")

    console.log("📦 Seeding projects...")
    await Project.deleteMany({})
    const created = await Project.insertMany(projectsData)
    console.log(`   ✅ ${created.length} projects seeded\n`)

    console.log("👤 Seeding profile...")
    await Profile.deleteMany({})
    await Profile.create(profileData)
    console.log("   ✅ Profile seeded\n")

    console.log("📝 Ensuring blog collection exists...")
    await BlogPost.createCollection()
    console.log("   ✅ Blog collection ready\n")

    console.log("🎉 Seed complete!")
    await mongoose.disconnect()
    process.exit(0)
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err)
    process.exit(1)
})
