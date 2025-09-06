import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";

function serializeLead(lead: any) {
  return {
    ...lead,
    created_at: lead.created_at ? lead.created_at.toISOString() : null,
    updated_at: lead.updated_at ? lead.updated_at.toISOString() : null,
    // Convert BigInt to string if you have any BigInt IDs
    id: typeof lead.id === "bigint" ? lead.id.toString() : lead.id,
  };
}

export async function GET() {
  const allLeads = await db.select().from(leads);
  const safeLeads = allLeads.map(serializeLead);
  return NextResponse.json(safeLeads);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const created = await db
    .insert(leads)
    .values({
      name: data.name,
      email: data.email,
      company: data.company,
      campaign_id: data.campaignId,
      status: data.status || "Pending",
    })
    .returning();

  const safeCreated = created.map(serializeLead);
  return NextResponse.json(safeCreated);
}

