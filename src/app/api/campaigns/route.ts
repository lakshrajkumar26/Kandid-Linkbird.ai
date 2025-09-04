import { db } from "@/lib/db";
import { campaigns } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
// import { getAllCampaigns, createCampaign } from "../../../services/campaignsService";

// export async function GET() {
//   const campaigns = await getAllCampaigns();
//   return NextResponse.json(campaigns);
// }

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const newCampaign = await createCampaign(body);
//   return NextResponse.json(newCampaign);
// }

 
export async function GET () {
  try{
  const allCampaigns = await  db.select().from(campaigns);
  return NextResponse.json({message:"seccuessfull",data :allCampaigns},{status:200})
  }
  catch(err){
   console.log(err);
   return NextResponse.json({message :"error in fetching coampaigns",error : err},{status:500})
  }

}

export async function POST (req: NextRequest) {
  try{
    const body = await req.json(); // ==========>  for body 
       const newCampaign = await db.insert(campaigns).values(body).returning();
       return NextResponse.json({message: "new Campaign created",data : newCampaign},{status : 201})
  }
  catch(err){
    console.log(err);
    return NextResponse.json({message : "error in creating campaign",error :err},{status:500});
  }
}