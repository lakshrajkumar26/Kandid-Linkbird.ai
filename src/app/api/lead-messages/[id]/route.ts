import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leadMessages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";



export async function GET(_: Request, { params }: { params: { id: string } }) {
  const msg = await db.query.leadMessages.findFirst({
    where: eq(leadMessages.id, Number(params.id)),
  });
  return NextResponse.json(msg);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await db.delete(leadMessages).where(eq(leadMessages.id, Number(params.id)));
  return NextResponse.json({ success: true });
}
