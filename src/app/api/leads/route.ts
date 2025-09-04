// import { NextRequest, NextResponse } from "next/server";
// import { getAllLeads, createLead, getLeadById, updateLeadStatus } from "../../../services/leadsService";

import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const url = new URL(req.url);
//   const id = url.searchParams.get("id");

//   if (id) {
//     const lead = await getLeadById(Number(id));
//     return NextResponse.json(lead);
//   }

//   const leads = await getAllLeads();
//   return NextResponse.json(leads);
// }

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const newLead = await createLead(body);
//   return NextResponse.json(newLead);
// }

// export async function PATCH(req: NextRequest) {
//   const body = await req.json();
//   const updatedLead = await updateLeadStatus(body.id, body.status);
//   return NextResponse.json(updatedLead);
// }

 export async function GET() {
    try{
        const allLeads = await db.select().from(leads);
        return NextResponse.json({message : "Leads fetched successfully",data : allLeads},{status:200})

    }
    catch (err) {
        console.log("Error fetching leads",err);
        return NextResponse.json({message:`Failed to fetch leads`,error:err},{status:500})
    }
 }
  export  async function POST(req:NextRequest) {
    try{
         const body = await req.json();
         const newLeads = await db.insert(leads).values(body).returning();
         return NextResponse.json({message : "Leads created",data :newLeads},{status :201})
    }
    catch(err){
         console.log("Error fetching leads",err);
        return NextResponse.json({message:`Failed to fetch leads`,error:err},{status:500})
    }
   
  }

