// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { leads } from "@/lib/db/schema";
// import { eq } from "drizzle-orm";  


// // export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
// //   const result = await db
// //     .select()
// //     .from(leads)
// //     .where(eq(leads.id, Number(params.id)))
// //     .limit(1); // returns array

// //   return NextResponse.json(result[0] || null);
// // }


// // export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
// //   const data = await req.json();

// //   const updated = await db
// //     .update(leads)
// //     .set({
// //       name: data.name,
// //       email: data.email,
// //       company: data.company,
// //       campaign_id: data.campaignId,
// //       status: data.status,
// //       last_contacted: data.lastContacted,
// //     })
// //     .where(eq(leads.id, Number(params.id)))  
// //     .returning();

// //   return NextResponse.json(updated);
// // }

// // export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
// //   await db.delete(leads).where(eq(leads.id, Number(params.id)));  
// //   return NextResponse.json({ message: "Deleted successfully" });
// // }


// export async function GET(_: Request, { params }: { params: { id: string } }) {
//   const lead = await db.query.leads.findFirst({
//     where: eq(leads.id, Number(params.id)),
//   });
//   return NextResponse.json(lead);
// }

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   const body = await req.json();
//   const updated = await db.update(leads).set(body).where(eq(leads.id, Number(params.id))).returning();
//   return NextResponse.json(updated[0]);
// }

// export async function DELETE(_: Request, { params }: { params: { id: string } }) {
//   await db.delete(leads).where(eq(leads.id, Number(params.id)));
//   return NextResponse.json({ success: true });
// }


import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET single lead
export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;
  const lead = await db.query.leads.findFirst({
    where: eq(leads.id, Number(id)),
  });
  return NextResponse.json(lead);
}

// UPDATE lead
export async function PUT(req: NextRequest, context: any) {
  const { id } = context.params;
  const body = await req.json();
  const updated = await db
    .update(leads)
    .set(body)
    .where(eq(leads.id, Number(id)))
    .returning();

  return NextResponse.json(updated[0]);
}

// DELETE lead
export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params;
  await db.delete(leads).where(eq(leads.id, Number(id)));
  return NextResponse.json({ success: true });
}

