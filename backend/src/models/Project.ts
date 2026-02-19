import mongoose, { Schema, Document } from "mongoose"

export interface IProjectGalleryImage {
    url: string
    caption?: string
}

export interface IRelatedProject {
    slug: string
    title: string
    category: string
    image: string
}

export interface IProject extends Document {
    slug: string
    title: string
    category: string
    shortDescription: string
    description: string[]
    features: string[]
    technologies: string[]
    coverImage: string
    thumbnailImage: string
    gallery: IProjectGalleryImage[]
    client?: string
    timeline: string
    role: string
    liveUrl?: string
    githubUrl?: string
    relatedProjects: IRelatedProject[]
    isPublished: boolean
    createdAt: Date
    updatedAt: Date
}

const GalleryImageSchema = new Schema(
    { url: { type: String, required: true }, caption: { type: String } },
    { _id: false }
)

const RelatedProjectSchema = new Schema(
    {
        slug: { type: String, required: true },
        title: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
    },
    { _id: false }
)

const ProjectSchema = new Schema<IProject>(
    {
        slug: { type: String, required: true, unique: true, index: true },
        title: { type: String, required: true },
        category: { type: String, required: true },
        shortDescription: { type: String, required: true },
        description: [{ type: String }],
        features: [{ type: String }],
        technologies: [{ type: String }],
        coverImage: { type: String, required: true },
        thumbnailImage: { type: String, required: true },
        gallery: [GalleryImageSchema],
        client: { type: String },
        timeline: { type: String, required: true },
        role: { type: String, required: true },
        liveUrl: { type: String },
        githubUrl: { type: String },
        relatedProjects: [RelatedProjectSchema],
        isPublished: { type: Boolean, default: true },
    },
    { timestamps: true }
)

export default mongoose.models.Project ||
    mongoose.model<IProject>("Project", ProjectSchema)
