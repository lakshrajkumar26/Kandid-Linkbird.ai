import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db/";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    // If you manage your schema manually, you can pass it here:
    // schema: { user, account, session, verification, ... }
  }),

  emailAndPassword: {
    enabled: true, // Enables email/password login
  },
  //2 step after env
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

 adapter: {
    user: {
      extend: {
        firstname: { type: "string", required: false },
        lastname: { type: "string", required: false },
      },
    },
  },
  trustedOrigins: [process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"],
});
