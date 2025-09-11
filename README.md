LeadManager

LeadManager is a modern Campaign & Lead Management System designed to help businesses organize leads, track campaigns, and monitor progress easily.

Features

Campaign Management: Create, edit, and delete campaigns.

Lead Tracking: Manage leads per campaign and track their status (pending, sent, replied).

Analytics Dashboard: View campaign statistics including acceptance and reply rates.

Tech Stack

Frontend: Next.js 15 (App Router)

Backend: TypeScript for type safety

Database: PostgreSQL or MySQL with Drizzle ORM for database queries

Styling: Tailwind CSS for styling

Deployment: Vercel for seamless deployment

Prerequisites

Before setting up the project, ensure you have the following installed:

Node.js (v18 or higher)

npm or yarn

PostgreSQL or MySQL database

Setup Instructions
1. Clone the Repository
git clone https://github.com/yourusername/leadmanager.git
cd leadmanager

2. Install Dependencies
npm install
# or
yarn install

3. Configure Environment Variables

Create a .env.local file in the root directory and add the following environment variables:

DATABASE_URL=postgresql://user:password@localhost:5432/leadmanager
NEXT_PUBLIC_VERCEL_URL=your-vercel-url


Replace user, password, and localhost:5432/leadmanager with your actual database credentials and URL.

4. Run Migrations

Ensure your database schema is up to date by running the necessary migrations. If you're using Drizzle ORM, follow the migration steps outlined in the Drizzle documentation
.

5. Start the Development Server
npm run dev
# or
yarn dev


Visit http://localhost:3000 in your browser to view the application.

Deployment on Vercel

To deploy LeadManager on Vercel:

Push your code to a Git repository (GitHub, GitLab, or Bitbucket).

Go to Vercel
 and log in or sign up.

Click on "New Project" and import your repository.

Vercel will automatically detect the Next.js framework and configure the deployment settings.

Set the environment variables in the Vercel dashboard:

DATABASE_URL: Your production database connection string.

NEXT_PUBLIC_VERCEL_URL: Your Vercel project URL.

Click "Deploy" and wait for the process to complete.

Once deployed, your application will be live on Vercel's domain.

Contributing

We welcome contributions to LeadManager! To contribute:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature).

Make your changes and commit them (git commit -am 'Add new feature').

Push to your fork (git push origin feature/your-feature).

Create a new Pull Request.

License
