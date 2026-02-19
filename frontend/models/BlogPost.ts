import mongoose, { Schema, Document } from "mongoose"

export interface IBlogPost extends Document {
    slug: string
    title: string
    excerpt: string
    content: string
    coverImage: string
    tags: string[]
    author: string
    isPublished: boolean
    publishedAt?: Date
    createdAt: Date
    updatedAt: Date
}

const BlogPostSchema = new Schema<IBlogPost>(
    {
        slug: { type: String, required: true, unique: true, index: true },
        title: { type: String, required: true },
        excerpt: { type: String, required: true },
        content: { type: String, required: true },
        coverImage: { type: String, default: "" },
        tags: [{ type: String }],
        author: { type: String, default: "Vũ Nguyễn Quốc Huy" },
        isPublished: { type: Boolean, default: false },
        publishedAt: { type: Date },
    },
    {
        timestamps: true,
    }
)

// Auto-set publishedAt when isPublished is set to true
BlogPostSchema.pre("save", function (next) {
    if (this.isModified("isPublished") && this.isPublished && !this.publishedAt) {
        this.publishedAt = new Date()
    }
    next()
})

export default mongoose.models.BlogPost ||
    mongoose.model<IBlogPost>("BlogPost", BlogPostSchema)
