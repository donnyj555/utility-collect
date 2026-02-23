import { supabase } from "@/lib/supabase"
import sgMail from "@sendgrid/mail"
import { NextRequest } from "next/server"

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

interface UtilityData {
  [key: string]: unknown
}

interface RequestBody {
  listingId: string
}

export async function POST(req: NextRequest) {
  const { listingId }: RequestBody = await req.json()

  const { data } = await supabase
    .from("utilities")
    .select("*")
    .eq("listing_id", listingId)
    .single<UtilityData>()

  await sgMail.send({
    to: process.env.SENDGRID_FROM_EMAIL!,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: "Utility Information Submitted",
    html: `<pre>${JSON.stringify(data, null, 2)}</pre>`
  })

  return new Response("OK")
}