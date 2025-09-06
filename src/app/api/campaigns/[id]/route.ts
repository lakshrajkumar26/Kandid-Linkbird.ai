import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { campaigns } from "@/lib/db/schema";
import { eq } from "drizzle-orm"; 

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();

  const updated = await db
    .update(campaigns)
    .set({
      name: data.name,
      status: data.status,
    })
    .where(eq(campaigns.id, Number(params.id))) 
    .returning();

  return NextResponse.json(updated[0] || null); // return first row
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await db.delete(campaigns).where(eq(campaigns.id, Number(params.id))); // ✅ use eq()
  return NextResponse.json({ message: "Deleted successfully" });
}
