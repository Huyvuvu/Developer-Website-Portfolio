# Portfolio Website

A personal developer portfolio website structured as a monorepo with **Next.js 14** (Frontend) and **Express.js** (Backend).

## Structure

- **`frontend/`**: Next.js application (App Router, Tailwind CSS, Shadcn UI).
- **`backend/`**: Express.js API with Mongoose (MongoDB).
- **`package.json`**: Root script to orchestrate both services.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn or pnpm
- MongoDB instance

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies (Root, Frontend, Backend):**
    ```bash
    npm run install:all
    ```
    *Or manually:*
    ```bash
    npm install
    cd frontend && npm install
    cd ../backend && npm install
    ```

3.  **Environment Setup:**
    - **Frontend**: Create `frontend/.env.local`.
    - **Backend**: Create `backend/.env`.

### Running the Project

To run both the frontend and backend simultaneously:

```bash
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000 (default)

## Scripts

- `npm run dev`: Runs both frontend and backend.
- `dev:frontend`: Runs only the frontend.
- `dev:backend`: Runs only the backend.
- `install:all`: Installs dependencies for root, frontend, and backend.