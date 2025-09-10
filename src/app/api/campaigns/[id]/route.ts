import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { campaigns,leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm"; 

// export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
//   const data = await req.json();

//   const updated = await db
//     .update(campaigns)
//     .set({
//       name: data.name,
//       status: data.status,
//     })
//     .where(eq(campaigns.id, Number(params.id))) 
//     .returning();

//   return NextResponse.json(updated[0] || null); // return first row
// }

// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//   await db.delete(campaigns).where(eq(campaigns.id, Number(params.id))); // ✅ use eq()
//   return NextResponse.json({ message: "Deleted successfully" });
// }


// app/api/campaigns/[id]/route.ts

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const campaignId = Number(params.id);

  // 1. Campaign info
  const campaign = await db.query.campaigns.findFirst({
    where: eq(campaigns.id, campaignId),
  });

  if (!campaign) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  // 2. Leads of this campaign
  const campaignLeads = await db.query.leads.findMany({
    where: eq(leads.campaignId, campaignId),
  });

  // 3. Aggregate stats
  const totalLeads = campaignLeads.length;
  const requestsSent = campaignLeads.filter((l) =>
    l.status?.toLowerCase().includes("sent")
  ).length;
  const requestsReplied = campaignLeads.filter((l) =>
    l.status?.toLowerCase().includes("reply")
  ).length;
  const leadsContacted = campaignLeads.filter(
    (l) => l.status && l.status !== "Pending Approval"
  ).length;

  const acceptanceRate =
    totalLeads > 0 ? (requestsReplied / totalLeads) * 100 : 0;
  const replyRate =
    requestsSent > 0 ? (requestsReplied / requestsSent) * 100 : 0;

  return NextResponse.json({
    campaign,
    stats: {
      totalLeads,
      requestsSent,
      requestsReplied,
      leadsContacted,
      acceptanceRate: acceptanceRate.toFixed(2),
      replyRate: replyRate.toFixed(2),
    },
    leads: campaignLeads,
  });
}
