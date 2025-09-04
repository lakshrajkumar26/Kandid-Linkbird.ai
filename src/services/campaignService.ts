import { db } from "../lib/db";
import { campaigns } from "../lib/db/schema";

export async function getAllCampaigns() {
  return await db.select().from(campaigns);
}

export async function getCampaignById(id: number) {
  return await db.select().from(campaigns).where(campaigns.id.eq(id));
}

export async function createCampaign(data: { name: string; status: string }) {
  return await db.insert(campaigns).values(data).returning();
}
