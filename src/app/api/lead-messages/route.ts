import { db } from "@/lib/db";
import { campaigns,leadMessages } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const inserted = await db.insert(leadMessages).values({
    leadId: body.leadId,
    type: body.type,
    content: body.content,
    direction: body.direction ?? "outgoing",
  }).returning();
  return NextResponse.json(inserted[0]);
}
