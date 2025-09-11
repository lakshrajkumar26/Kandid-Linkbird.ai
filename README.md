# LeadManager

**LeadManager** is a modern Campaign & Lead Management System designed to help businesses organize leads, track campaigns, and monitor progress easily.
Deploy Link - https://kandid-linkbird-ai2.vercel.app/
## Features

- **Campaign Management**: Create, edit, and delete campaigns.
- **Lead Tracking**: Manage leads per campaign and track their status (pending, sent, replied).
- **Analytics Dashboard**: View campaign statistics including acceptance and reply rates.

## Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Backend**: TypeScript for type safety
- **Database**: PostgreSQL or MySQL with Drizzle ORM
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Prerequisites

Before setting up the project, ensure you have:

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL or MySQL database

## Setup Instructions

### 1. Clone the Repository

```bash
git clone (https://github.com/lakshrajkumar26/Kandid-Linkbird.ai)
cd leadmanager
2. Install Dependencies
bash
Copy code
npm install
# or
yarn install
3. Configure Environment Variables
Create a .env.local file in the root directory:

env

NEXT_PUBLIC_VERCEL_URL=(https://kandid-linkbird-ai2.vercel.app/)
Replace user, password, and database info with your actual credentials.

4. Run Migrations
Use Drizzle ORM migrations to set up your database schema.

bash

npx drizzle-kit migrate dev
5. Start the Development Server
bash

npm run dev
# or
yarn dev
Visit http://localhost:3000 in your browser.

Deployment on Vercel
Push your code to a Git repository (GitHub, GitLab, or Bitbucket).

Go to Vercel and log in.

Click "New Project" and import your repository.

Set environment variables in the Vercel dashboard:

env
Copy code
DATABASE_URL=your-production-database-url
NEXT_PUBLIC_VERCEL_URL=your-vercel-url
Click "Deploy" and wait for the process to finish.

Your app will be live on Vercel’s domain.

Contributing
Fork the repository.

Create a new branch:

bash
Copy code
git checkout -b feature/your-feature
Make your changes and commit:

bash
Copy code
git commit -am 'Add new feature'
Push to your branch:

bash
Copy code
git push origin feature/your-feature
