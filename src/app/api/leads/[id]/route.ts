import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";  


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const result = await db
    .select()
    .from(leads)
    .where(eq(leads.id, Number(params.id)))
    .limit(1); // returns array

  return NextResponse.json(result[0] || null);
}


export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();

  const updated = await db
    .update(leads)
    .set({
      name: data.name,
      email: data.email,
      company: data.company,
      campaign_id: data.campaignId,
      status: data.status,
      last_contacted: data.lastContacted,
    })
    .where(eq(leads.id, Number(params.id)))  
    .returning();

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await db.delete(leads).where(eq(leads.id, Number(params.id)));  
  return NextResponse.json({ message: "Deleted successfully" });
}
