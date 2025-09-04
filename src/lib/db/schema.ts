import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

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
