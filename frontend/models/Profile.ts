import mongoose, { Schema, Document } from "mongoose"

// Bilingual field type
interface BilingualString {
    en: string
    vi: string
}

interface BilingualStringArray {
    en: string[]
    vi: string[]
}

interface ISocialLink {
    platform: string
    url: string
    icon: string
}

interface ILanguageSkill {
    name: string
    proficiency: string
    level: number
    flag: string
}

interface IExperienceItem {
    title: string
    company: string
    period: string
    description: string
    achievements: string[]
    technologies: string[]
}

interface ICertification {
    name: string
    issuer: string
    date: string
    logo: string
}

interface IEducation {
    degree: string
    institution: string
    year: string
    logo: string
}

interface ICredentials {
    certifications: ICertification[]
    education: IEducation[]
    skills: string[]
}

interface ITechnicalSkills {
    design: string[]
    development: string[]
    uxMethods: string[]
    softSkills: string[]
}

interface INavItem {
    label: string
    href: string
}

interface IMeta {
    title: string
    description: string
}

export interface IProfile extends Document {
    name: string
    title: BilingualString
    location: BilingualString
    avatar: string
    email: string
    phone: string
    workingHours: BilingualString
    availableForWork: boolean
    badges: BilingualStringArray
    bio: BilingualString
    social: ISocialLink[]
    focus: BilingualStringArray
    languages: ILanguageSkill[]
    interests: BilingualStringArray
    experience: {
        en: IExperienceItem[]
        vi: IExperienceItem[]
    }
    credentials: {
        en: ICredentials
        vi: ICredentials
    }
    technicalSkills: {
        en: ITechnicalSkills
        vi: ITechnicalSkills
    }
    navigation: {
        en: INavItem[]
        vi: INavItem[]
    }
    meta: {
        en: IMeta
        vi: IMeta
    }
    createdAt: Date
    updatedAt: Date
}

const BilingualStringSchema = new Schema(
    { en: { type: String, default: "" }, vi: { type: String, default: "" } },
    { _id: false }
)

const BilingualStringArraySchema = new Schema(
    { en: [{ type: String }], vi: [{ type: String }] },
    { _id: false }
)

const SocialLinkSchema = new Schema(
    {
        platform: { type: String, required: true },
        url: { type: String, required: true },
        icon: { type: String, required: true },
    },
    { _id: false }
)

const LanguageSkillSchema = new Schema(
    {
        name: { type: String, required: true },
        proficiency: { type: String, required: true },
        level: { type: Number, required: true },
        flag: { type: String },
    },
    { _id: false }
)

const ExperienceItemSchema = new Schema(
    {
        title: { type: String, required: true },
        company: { type: String, required: true },
        period: { type: String, required: true },
        description: { type: String },
        achievements: [{ type: String }],
        technologies: [{ type: String }],
    },
    { _id: false }
)

const CertificationSchema = new Schema(
    {
        name: { type: String, required: true },
        issuer: { type: String, required: true },
        date: { type: String },
        logo: { type: String },
    },
    { _id: false }
)

const EducationSchema = new Schema(
    {
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        year: { type: String },
        logo: { type: String },
    },
    { _id: false }
)

const CredentialsSchema = new Schema(
    {
        certifications: [CertificationSchema],
        education: [EducationSchema],
        skills: [{ type: String }],
    },
    { _id: false }
)

const TechnicalSkillsSchema = new Schema(
    {
        design: [{ type: String }],
        development: [{ type: String }],
        uxMethods: [{ type: String }],
        softSkills: [{ type: String }],
    },
    { _id: false }
)

const NavItemSchema = new Schema(
    {
        label: { type: String, required: true },
        href: { type: String, required: true },
    },
    { _id: false }
)

const MetaSchema = new Schema(
    {
        title: { type: String },
        description: { type: String },
    },
    { _id: false }
)

const ProfileSchema = new Schema<IProfile>(
    {
        name: { type: String, required: true },
        title: BilingualStringSchema,
        location: BilingualStringSchema,
        avatar: { type: String, default: "" },
        email: { type: String, required: true },
        phone: { type: String },
        workingHours: BilingualStringSchema,
        availableForWork: { type: Boolean, default: true },
        badges: BilingualStringArraySchema,
        bio: BilingualStringSchema,
        social: [SocialLinkSchema],
        focus: BilingualStringArraySchema,
        languages: [LanguageSkillSchema],
        interests: BilingualStringArraySchema,
        experience: {
            en: [ExperienceItemSchema],
            vi: [ExperienceItemSchema],
        },
        credentials: {
            en: CredentialsSchema,
            vi: CredentialsSchema,
        },
        technicalSkills: {
            en: TechnicalSkillsSchema,
            vi: TechnicalSkillsSchema,
        },
        navigation: {
            en: [NavItemSchema],
            vi: [NavItemSchema],
        },
        meta: {
            en: MetaSchema,
            vi: MetaSchema,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.models.Profile ||
    mongoose.model<IProfile>("Profile", ProfileSchema)
