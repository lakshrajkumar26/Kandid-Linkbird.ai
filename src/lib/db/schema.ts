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
   activity  : integer("activity").default(1),
  created_at: timestamp("created_at").defaultNow(),
 
});

// export const leads = pgTable("leads", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
//   email: text("email"),
//   company: text("company"),
//   campaign_id: integer("campaign_id").references(() => campaigns.id),
//   status: text("status").default("Pending"),
//   last_contacted: timestamp("last_contacted").defaultNow(),
//   created_at: timestamp("created_at").defaultNow(),
//   updated_at: timestamp("updated_at").defaultNow(), 
// });



//new Leads 
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  company: text("company"),

  // relation: which campaign this lead belongs to
  campaignId: integer("campaign_id")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),

  // status of lead in the campaign
  status: text("status").default("Pending").notNull(), 
  // Could be "Pending", "Connected", "Messaged", "FollowUp1", "FollowUp2", "Replied", "DoNotContact"

  lastContacted: timestamp("last_contacted"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

//Mow LeadMessages
export const leadMessages = pgTable("lead_messages", {
  id: serial("id").primaryKey(),

  leadId: integer("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),

  type: text("type").notNull(),  
  // e.g. "ConnectionRequest", "Message", "FollowUp1", "FollowUp2", "Reply"

  content: text("content"), // message text you sent or reply from lead

  direction: text("direction").default("outgoing").notNull(), 
  // "outgoing" = you → lead
  // "incoming" = lead → you

  sentAt: timestamp("sent_at").defaultNow().notNull(),
});



export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  // firstName : text("firstname"), //check later
  // lastName : text("lastname"), //check later
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
