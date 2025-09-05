import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest){
  const body = await req.json(); // { email, password, name }
  try {
    // call Better Auth server API endpoint for sign-up
    // this returns a Response when asResponse: true
    const response = await auth.api.signUpEmail({
      body,
      asResponse: true,
    });
    // return that Response directly (it includes cookies/headers)
    return response;
  } catch (err:any) {
    return new Response(JSON.stringify({ error: err.message || String(err) }), { status: 400, headers: { "content-type":"application/json" }});
  }
}
