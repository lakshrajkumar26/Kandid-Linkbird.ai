"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <html lang="en">
      <body className="bg-gray-50 font-sans">
        {/* Navbar */}
        <header className="bg-white shadow-md">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              LeadManager
            </Link>
            <div>
              <Link
                href="/auth"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Login
              </Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 py-20 text-center">
          {/* Hero Section */}
          <section className="mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to LeadManager
            </h1>
            <p className="text-gray-600 mb-6">
              Efficiently manage your campaigns and leads with real-time tracking, analytics, and organized dashboards.
            </p>
            <Link
              href="/auth"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
              Login to Continue
            </Link>
          </section>

          {/* About Project Section */}
          <section className="text-left bg-white shadow-md rounded p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About LeadManager</h2>
            <p className="text-gray-700 mb-4">
              LeadManager is a modern Campaign & Lead Management System designed to help businesses organize leads, track campaigns, and monitor progress easily.
            </p>
            <h3 className="text-xl font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Create, edit, and delete campaigns</li>
              <li>Manage leads per campaign</li>
              <li>Track lead status: pending, sent, replied</li>
              <li>View campaign statistics: acceptance & reply rates</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Tech Stack:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Next.js 15 (App Router)</li>
              <li>TypeScript for type safety</li>
              <li>Drizzle ORM for database queries</li>
              <li>PostgreSQL or MySQL as database</li>
              <li>Tailwind CSS for styling</li>
              <li>Vercel for deployment</li>
            </ul>
          </section>
        </main>
      </body>
    </html>
  );
}
