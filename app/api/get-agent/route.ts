import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // IMPORTANT
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ success: false });
  }

  // 1️⃣ Get listing by intake_token
  const { data: listing, error } = await supabase
    .from("listings")
    .select("agent_id")
    .eq("intake_token", token)
    .single();

  if (error || !listing) {
    return NextResponse.json({ success: false });
  }

  // 2️⃣ Get agent
  const { data: agent } = await supabase
    .from("agents")
    .select("email, full_name")
    .eq("id", listing.agent_id)
    .single();

  return NextResponse.json({
    success: true,
    agent,
  });
}
