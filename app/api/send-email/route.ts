import sgMail from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const UTILITY_LABELS: Record<string, { icon: string; label: string }> = {
  electric: { icon: "⚡", label: "Electric" },
  gas: { icon: "🔥", label: "Gas / Heating" },
  water: { icon: "💧", label: "Water" },
  sewer: { icon: "🔧", label: "Sewer / Septic" },
  trash: { icon: "♻️", label: "Trash & Recycling" },
  internet: { icon: "📡", label: "Internet / Cable" },
  hoa: { icon: "🏘️", label: "HOA / Condo" },
  oil: { icon: "🛢️", label: "Oil / Propane" },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      agentEmail,
      agentName,
      propertyAddress,
      submittedDate,
      utilities = {},
    } = body;

    if (!agentEmail || !propertyAddress) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Build table rows
    const rows = Object.entries(UTILITY_LABELS)
      .map(([key, { icon, label }]) => {
        return `
          <tr>
            <td style="padding:12px 16px;border-bottom:1px solid #f0ebe4;color:#78716c;font-weight:600;font-size:13px;width:38%;">
              ${icon}&nbsp; ${label}
            </td>
            <td style="padding:12px 16px;border-bottom:1px solid #f0ebe4;color:#1c1917;font-weight:700;font-size:14px;">
              ${
                utilities[key] ||
                "<span style='color:#d4cfc9;'>Not provided</span>"
              }
            </td>
          </tr>
        `;
      })
      .join("");

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
      </head>
      <body style="margin:0;padding:0;background:#f5f0eb;font-family:'Segoe UI',sans-serif;">
        <div style="max-width:580px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <div style="background:linear-gradient(135deg,#1c1917,#292524);padding:32px 36px;">
            <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.4);margin-bottom:6px;">
              Utility Info Sheet
            </div>
            <div style="font-size:22px;font-weight:700;color:#fff;margin-bottom:6px;">
              ${propertyAddress}
            </div>
            <div style="font-size:12px;color:rgba(255,255,255,0.4);">
              Submitted ${submittedDate || ""}
            </div>
          </div>

          <div style="padding:28px 36px;">
            <p style="font-size:15px;color:#1c1917;margin:0 0 8px;">
              Hi ${agentName || "there"},
            </p>

            <p style="font-size:14px;color:#78716c;line-height:1.7;margin:0 0 24px;">
              Your seller has submitted their utility information for 
              <strong style="color:#1c1917;">${propertyAddress}</strong>.
            </p>

            <div style="border:1px solid #ece8e1;border-radius:12px;overflow:hidden;margin-bottom:28px;">
              <div style="background:#faf9f7;padding:12px 16px;border-bottom:1px solid #ece8e1;">
                <span style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#a8a29e;">
                  Utility Providers
                </span>
              </div>

              <table style="width:100%;border-collapse:collapse;">
                ${rows}
              </table>
            </div>

            <hr style="border:none;border-top:1px solid #f0ebe4;margin:0 0 16px;" />

            <p style="font-size:11px;color:#c4b9b0;margin:0;text-align:center;">
              Sent by UtilityCollect · ${propertyAddress} · ${submittedDate || ""}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sgMail.send({
      to: agentEmail,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: "UtilityCollect",
      },
      subject: `🏠 Utility Sheet Submitted — ${propertyAddress}`,
      html,
      text: `Utility sheet submitted for ${propertyAddress} on ${submittedDate}.

${Object.entries(UTILITY_LABELS)
  .map(([key, { label }]) => `${label}: ${utilities[key] || "Not provided"}`)
  .join("\n")}
`,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("SendGrid error:", err?.response?.body || err?.message);

    return NextResponse.json(
      {
        error: "Failed to send email",
        details: err?.response?.body?.errors || err?.message,
      },
      { status: 500 },
    );
  }
}
