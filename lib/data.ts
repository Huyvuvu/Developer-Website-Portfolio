import portfolioData from "@/data/portfolio-data.json"
import { projects, getAllProjects, getProjectBySlug, getRelatedProjects } from "@/lib/projects"

// Type for language
export type Language = "en" | "vi"

// Export the portfolio data
export const data = portfolioData

// Export the projects data
export { projects, getAllProjects, getProjectBySlug, getRelatedProjects }

// Type definitions for the portfolio data
export type PortfolioData = typeof portfolioData

// Get data for a specific language
function getDataForLanguage(lang: Language = "en") {
  return portfolioData[lang]
}

// Helper function to get navigation items
export function getNavItems(lang: Language = "en") {
  return getDataForLanguage(lang).navigation
}

// Helper function to get personal information
export function getPersonalInfo(lang: Language = "en") {
  return getDataForLanguage(lang).personal
}

// Helper function to get about information
export function getAboutInfo(lang: Language = "en") {
  return getDataForLanguage(lang).about
}

// Helper function to get experience information
export function getExperienceInfo(lang: Language = "en") {
  return getDataForLanguage(lang).experience
}

// Helper function to get credentials information
export function getCredentialsInfo(lang: Language = "en") {
  return getDataForLanguage(lang).credentials
}

// Helper function to get technical skills information
export function getTechnicalSkillsInfo(lang: Language = "en") {
  return getDataForLanguage(lang).technicalSkills
}

// Helper function to get meta information
export function getMetaInfo(lang: Language = "en") {
  return getDataForLanguage(lang).meta
}
