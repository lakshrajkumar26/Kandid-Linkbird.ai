import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { campaigns, leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";

function serializeLead(lead: any) {
  return {
    ...lead,
    created_at: lead.created_at ? lead.created_at.toISOString() : null,
    updated_at: lead.updated_at ? lead.updated_at.toISOString() : null,
    // Convert BigInt to string if you have any BigInt IDs
    id: typeof lead.id === "bigint" ? lead.id.toString() : lead.id,
  };
}


 //without pagination 

export async function GET(req :Request) {

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1"); // default page 1
  const limit = parseInt(url.searchParams.get("limit") || "10"); // default 10 per page
  const offset = (page - 1) * limit;
  
  const allLeadsWithCampaign = await db
    .select({
      id: leads.id,
      name: leads.name,
      email: leads.email,
      company: leads.company,
      status: leads.status,
      last_contacted: leads.last_contacted,
      campaignId: campaigns.id,
      campaignName: campaigns.name,
      campaignStatus: campaigns.status,
      activity : campaigns.activity
    })
    .from(leads)
    .innerJoin(campaigns, eq(leads.campaign_id, campaigns.id));

  return NextResponse.json(allLeadsWithCampaign);
}



// # wiuth pagionation

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const page = parseInt(url.searchParams.get("page") || "1"); // default page 1
//   const limit = parseInt(url.searchParams.get("limit") || "10"); // default 10 per page
//   const offset = (page - 1) * limit;

//   // Paginated leads with campaign
//   const allLeadsWithCampaign = await db
//     .select({
//       id: leads.id,
//       name: leads.name,
//       email: leads.email,
//       company: leads.company,
//       status: leads.status,
//       last_contacted: leads.last_contacted,
//       campaignId: campaigns.id,
//       campaignName: campaigns.name,
//       campaignStatus: campaigns.status,
//       activity: campaigns.activity,
//     })
//     .from(leads)
//     .innerJoin(campaigns, eq(leads.campaign_id, campaigns.id))
//     .limit(limit)
//     .offset(offset);

//   // Total count
//   const totalResult = await db.select({ count: sql<number>`count(${leads.id})` }).from(leads);
//   const total = Number(totalResult[0].count);

//   const hasMore = offset + limit < total;

//   return NextResponse.json({
//     leads: allLeadsWithCampaign,
//     hasMore,
//   });
// }


export async function POST(req: NextRequest) {
  const data = await req.json();

  const created = await db
    .insert(leads)
    .values({
      name: data.name,
      email: data.email,
      company: data.company,
      campaign_id: data.campaign_id ? parseInt(data.campaign_id) : null,
      status: data.status || "Pending Approval",
    })
    .returning();

  const safeCreated = created.map(serializeLead);
  return NextResponse.json(safeCreated);
}



