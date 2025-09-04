import { db } from "../lib/db";
import { leads } from "../lib/db/schema";

export async function getAllLeads() {
  return await db.select().from(leads);
}

export async function getLeadById(id: number) {
  return await db.select().from(leads).where(leads.id.eq(id));
}

export async function createLead(data: { name: string; email: string; company: string; campaign_id: number }) {
  return await db.insert(leads).values(data).returning();
}

export async function updateLeadStatus(id: number, status: string) {
  return await db.update(leads).set({ status }).where(leads.id.eq(id)).returning();
}
