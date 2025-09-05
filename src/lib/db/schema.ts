import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";

/* -------------------------------
   Your CRM Tables
--------------------------------*/
export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  status: text("status").default("Draft"),
  created_at: timestamp("created_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  company: text("company"),
  campaign_id: integer("campaign_id").references(() => campaigns.id),
  status: text("status").default("Pending"),
  last_contacted: timestamp("last_contacted").defaultNow(),
});

/* -------------------------------
   BetterAuth Tables
--------------------------------*/
// export const user  = pgTable("user", {
//   id: text("id").primaryKey(),
//   email: text("email").notNull().unique(),
//   password: text("password"), // used for email/password login
//   name: text("name"),
//   emailVerified: boolean("email_verified").default(false).notNull(),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   updatedAt: timestamp("updated_at").defaultNow().notNull(),
// });

// export const account = pgTable("account", {
//   id: text("id").primaryKey(),
//   userId: text("user_id")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),
//   accountId: text("account_id").notNull(),
//   providerId: text("provider_id").notNull(),
//   provider: text("provider").default("credential").notNull(),
//   type: text("type").default("credential").notNull(),
//   accessToken: text("access_token"),
//   refreshToken: text("refresh_token"),
//   password: text("password"),
//   expiresAt: integer("expires_at"),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   updatedAt: timestamp("updated_at").defaultNow().notNull(),
// });


// export const session = pgTable("session", {
//   sessionToken: text("session_token").primaryKey().notNull(),
//   userId: text("user_id")
//     .notNull()
//     .references(() => user .id, { onDelete: "cascade" }),
//   expires: timestamp("expires").notNull(),
// });

// export const verificationTokens = pgTable(
//   "verification_tokens",
//   {
//     identifier: text("identifier").notNull(),
//     token: text("token").notNull(),
//     expires: timestamp("expires").notNull(),
//   },
//   (table) => ({
//     pk: primaryKey({ columns: [table.identifier, table.token] }),
//   })
// );

//  ----------- From  npx @better-auth/cli generate -----------------

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  firstName : text("firstname"), //check later
  lastName : text("lastname"), //check later
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
