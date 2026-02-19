import swaggerJsdoc from "swagger-jsdoc"

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Portfolio API",
            version: "1.0.0",
            description:
                "REST API for Vũ Nguyễn Quốc Huy's Portfolio — Projects, Blog Posts, and Personal Profile",
            contact: {
                name: "Vũ Nguyễn Quốc Huy",
                email: "vunguyenquochuy2000@gmail.com",
            },
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5000}`,
                description: "Development server",
            },
        ],
        tags: [
            { name: "Health", description: "Server health check" },
            { name: "Projects", description: "Portfolio projects CRUD" },
            { name: "Blog", description: "Blog posts CRUD with pagination" },
            { name: "Profile", description: "Personal profile management" },
        ],
    },
    apis: ["./src/routes/*.ts"],
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
