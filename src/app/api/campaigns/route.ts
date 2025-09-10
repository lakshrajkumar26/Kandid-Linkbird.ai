import { db } from "@/lib/db";
import { campaigns } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";

//For GET and POST
// and inside the [id] for PATCH and DELETE 

//@GET
// export async function GET () {
//   try{
//   const allCampaigns = await  db.select().from(campaigns);
//   return NextResponse.json({message:"seccuessfull",data :allCampaigns},{status:200})
//   }
//   catch(err){
//    console.log(err);
//    return NextResponse.json({message :"error in fetching coampaigns",error : err},{status:500})
//   }

// }


// //@POST
// export async function POST (req: NextRequest) {
//   try{
//     const data  = await req.json(); // ==========>  for body 
//        const newCampaign = await db.insert(campaigns).values({
//         name :data.name,
//         status :data.status ||"Draft",
//   }).returning();
//        return NextResponse.json({message: "new Campaign created",data : newCampaign},{status : 201})
//   }
//   catch(err){
//     console.log(err);
//     return NextResponse.json({message : "error in creating campaign",error :err},{status:500});
//   }
// }




export async function GET() {
  const all = await db.select().from(campaigns);
  return NextResponse.json(all);
}

export async function POST(req: Request) {
  const body = await req.json();
  const inserted = await db
    .insert(campaigns)
    .values({
      name: body.name,
      status: body.status ?? "Draft",
      activity: body.activity ?? 1,
    })
    .returning();
  return NextResponse.json(inserted[0]);
}
