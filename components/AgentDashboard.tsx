import { useState, useEffect } from "react";
import {
  getListings,
  createListing,
  getAgentProfile,
  signOut,
} from "../lib/supabase";

const STATUS_STYLE: any = {
  submitted: {
    bg: "#dcfce7",
    text: "#15803d",
    dot: "#22c55e",
    label: "✓ Submitted",
  },
  in_progress: {
    bg: "#dbeafe",
    text: "#1d4ed8",
    dot: "#3b82f6",
    label: "⟳ In Progress",
  },
  sent: { bg: "#fef9c3", text: "#854d0e", dot: "#eab308", label: "→ Sent" },
  overdue: {
    bg: "#fee2e2",
    text: "#b91c1c",
    dot: "#ef4444",
    label: "! Overdue",
  },
};

const UTILITY_LABELS = {
  electric: { icon: "⚡", label: "Electric" },
  gas: { icon: "🔥", label: "Gas / Heating" },
  water: { icon: "💧", label: "Water" },
  sewer: { icon: "🔧", label: "Sewer / Septic" },
  trash: { icon: "♻️", label: "Trash & Recycling" },
  internet: { icon: "📡", label: "Internet / Cable" },
  hoa: { icon: "🏘️", label: "HOA / Condo" },
  oil: { icon: "🛢️", label: "Oil / Propane" },
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://utilitycollect.app";

function StatusBadge({ status }: any) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.sent;
  return (
    <span
      style={{
        background: s.bg,
        color: s.text,
        borderRadius: 99,
        padding: "4px 11px",
        fontSize: 11,
        fontWeight: 700,
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: s.dot,
          display: "inline-block",
        }}
      />
      {s.label}
    </span>
  );
}

function SheetModal({ listing, onClose }: any) {
  const [copied, setCopied] = useState(false);
  const link = `${APP_URL}/seller/${listing.intake_token}`;
  const copy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(28,25,23,0.6)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          width: "100%",
          maxWidth: 540,
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            background: "linear-gradient(135deg,#1c1917,#292524)",
            padding: "26px 28px",
            borderRadius: "20px 20px 0 0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 4,
                }}
              >
                Utility Info Sheet
              </div>
              <div
                style={{
                  fontSize: 19,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                }}
              >
                {listing.address}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  marginTop: 4,
                }}
              >
                Seller: {listing.seller_name}
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "#fff",
                borderRadius: 8,
                width: 32,
                height: 32,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        </div>
        <div style={{ padding: 24 }}>
          {listing.status === "submitted" ? (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                {Object.entries(UTILITY_LABELS).map(
                  ([key, { icon, label }]) => (
                    <div
                      key={key}
                      style={{
                        background: "#faf9f7",
                        borderRadius: 12,
                        padding: "14px 16px",
                        border: "1px solid #f0ebe4",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: "#a8a29e",
                          marginBottom: 4,
                        }}
                      >
                        {icon} {label}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: listing.utilities?.[key]
                            ? "#1c1917"
                            : "#d4cfc9",
                        }}
                      >
                        {listing.utilities?.[key] || "—"}
                      </div>
                    </div>
                  ),
                )}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  style={{
                    flex: 1,
                    background: "#1c1917",
                    color: "#fff",
                    border: "none",
                    borderRadius: 11,
                    padding: "13px",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  📥 Download PDF
                </button>
                <button
                  onClick={copy}
                  style={{
                    flex: 1,
                    background: "#faf9f7",
                    color: "#78716c",
                    border: "1px solid #e7e5e4",
                    borderRadius: 11,
                    padding: "13px",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {copied ? "✓ Copied!" : "🔗 Copy Share Link"}
                </button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
              <div
                style={{
                  fontWeight: 700,
                  color: "#1c1917",
                  marginBottom: 6,
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                  fontSize: 20,
                }}
              >
                Awaiting seller submission
              </div>
              <p style={{ color: "#78716c", fontSize: 13, marginBottom: 20 }}>
                Share this link with your seller — takes about 2 minutes to
                complete.
              </p>
              <div
                style={{
                  background: "#faf9f7",
                  border: "1px solid #e7e5e4",
                  borderRadius: 10,
                  padding: "10px 14px",
                  fontSize: 13,
                  fontFamily: "monospace",
                  color: "#1c1917",
                  marginBottom: 14,
                  wordBreak: "break-all",
                }}
              >
                {link}
              </div>
              <button
                onClick={copy}
                style={{
                  background: "#d97706",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "11px 20px",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {copied ? "✓ Copied!" : "📋 Copy Seller Link"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NewListingModal({ onClose, onAdd, saving }: any) {
  const [form, setForm] = useState<any>({
    address: "",
    city: "",
    sellerName: "",
    sellerEmail: "",
    listPrice: "",
    mlsNumber: "",
  });
  const set = (k: any, v: any) => setForm((f: any) => ({ ...f, [k]: v }));
  const fields = [
    {
      key: "address",
      label: "Property Address",
      placeholder: "123 Main Street",
      full: true,
    },
    {
      key: "city",
      label: "City, State, ZIP",
      placeholder: "Philadelphia, PA 19103",
    },
    {
      key: "sellerName",
      label: "Seller Name",
      placeholder: "John & Jane Smith",
    },
    {
      key: "sellerEmail",
      label: "Seller Email",
      placeholder: "seller@email.com",
    },
    { key: "listPrice", label: "List Price", placeholder: "$450,000" },
    { key: "mlsNumber", label: "MLS Number", placeholder: "PAPH2024-0001" },
  ];
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(28,25,23,0.6)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          width: "100%",
          maxWidth: 480,
          boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "26px 28px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#1c1917",
                  margin: 0,
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                }}
              >
                New Listing
              </h2>
              <p style={{ fontSize: 13, color: "#a8a29e", margin: "4px 0 0" }}>
                A unique seller link is generated automatically.
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "#f5f0eb",
                border: "none",
                color: "#78716c",
                borderRadius: 8,
                width: 32,
                height: 32,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 20,
            }}
          >
            {fields.map((f) => (
              <div
                key={f.key}
                style={{ gridColumn: f.full ? "1 / -1" : "auto" }}
              >
                <label
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    color: "#78716c",
                    display: "block",
                    marginBottom: 5,
                  }}
                >
                  {f.label}
                </label>
                <input
                  value={form[f.key]}
                  onChange={(e) => set(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  style={{
                    width: "100%",
                    border: "1px solid #e7e5e4",
                    borderRadius: 9,
                    padding: "10px 12px",
                    fontSize: 13,
                    outline: "none",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    background: "#faf9f7",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#d97706")}
                  onBlur={(e) => (e.target.style.borderColor = "#e7e5e4")}
                />
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "0 28px 26px", display: "flex", gap: 8 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: "#faf9f7",
              color: "#78716c",
              border: "1px solid #e7e5e4",
              borderRadius: 11,
              padding: "13px",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onAdd(form)}
            disabled={!form.address || !form.sellerName || saving}
            style={{
              flex: 2,
              background:
                !form.address || !form.sellerName ? "#e7e5e4" : "#1c1917",
              color: !form.address || !form.sellerName ? "#a8a29e" : "#fff",
              border: "none",
              borderRadius: 11,
              padding: "13px",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {saving ? "⏳ Saving…" : "Create Listing →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Toast({ message, onDone }: any) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#1c1917",
        color: "#fff",
        borderRadius: 12,
        padding: "13px 22px",
        fontSize: 14,
        fontWeight: 600,
        zIndex: 200,
        boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
        whiteSpace: "nowrap",
      }}
    >
      {message}
    </div>
  );
}

export default function AgentDashboard() {
  const [listings, setListings] = useState<any>([]);
  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [viewListing, setViewListing] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    Promise.all([getListings(), getAgentProfile()])
      .then(([l, a]: any) => {
        setListings(l || []);
        setAgent(a);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Auto-calculate overdue status client-side (no cron job needed)
  const enriched = listings.map((l: any) => ({
    ...l,
    status:
      l.status === "sent" &&
      Date.now() - new Date(l.sent_at).getTime() > 7 * 86400000
        ? "overdue"
        : l.status,
  }));

  const filtered = enriched.filter(
    (l: any) =>
      (filter === "all" || l.status === filter) &&
      (!search ||
        l.address.toLowerCase().includes(search.toLowerCase()) ||
        l.seller_name.toLowerCase().includes(search.toLowerCase())),
  );

  const stats = {
    total: enriched.length,
    submitted: enriched.filter((l: any) => l.status === "submitted").length,
    pending: enriched.filter((l: any) =>
      ["sent", "in_progress"].includes(l.status),
    ).length,
    overdue: enriched.filter((l: any) => l.status === "overdue").length,
  };

  const handleAdd = async (form: any) => {
    setSaving(true);
    try {
      const newL: any = await createListing(form);
      setListings((prev: any) => [newL, ...prev]);
      setShowNew(false);
      setToast("✅ Listing created! Copy the seller link to share.");
    } catch (err: any) {
      setToast("❌ Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const initials =
    agent?.full_name
      ?.split(" ")
      .map((n: any) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AG";

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f0eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "inherit",
        }}
      >
        <div style={{ textAlign: "center", color: "#78716c" }}>
          ⚙️ Loading your listings…
        </div>
      </div>
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box} body{margin:0;background:#f5f0eb}
        button:hover{opacity:.88}
      `}</style>
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f0eb",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            width: 220,
            background: "#1c1917",
            display: "flex",
            flexDirection: "column",
            zIndex: 10,
          }}
        >
          <div
            style={{
              padding: "28px 20px 24px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.35)",
                marginBottom: 5,
              }}
            >
              Real Estate
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#fff",
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                lineHeight: 1.1,
              }}
            >
              Utility
              <br />
              Collect
            </div>
          </div>
          <nav style={{ flex: 1, padding: "18px 12px" }}>
            {[
              { icon: "🏠", label: "My Listings", active: true },
              { icon: "⚙️", label: "Settings", active: false },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 10,
                  marginBottom: 2,
                  cursor: "pointer",
                  background: item.active
                    ? "rgba(217,119,6,0.15)"
                    : "transparent",
                  color: item.active ? "#f59e0b" : "rgba(255,255,255,0.45)",
                  fontWeight: item.active ? 700 : 500,
                  fontSize: 13,
                }}
              >
                <span style={{ fontSize: 15 }}>{item.icon}</span> {item.label}
              </div>
            ))}
          </nav>
          <div
            style={{
              padding: "16px 20px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#f59e0b,#d97706)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                {initials}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
                  {agent?.full_name || "Agent"}
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
                  {agent?.brokerage || ""}
                </div>
              </div>
            </div>
            <button
              onClick={signOut}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.06)",
                border: "none",
                color: "rgba(255,255,255,0.4)",
                borderRadius: 8,
                padding: "8px",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Main content */}
        <div style={{ marginLeft: 220, padding: "36px 36px 60px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 28,
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#1c1917",
                  margin: 0,
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                }}
              >
                My Listings
              </h1>
              <p style={{ color: "#a8a29e", fontSize: 14, marginTop: 4 }}>
                Collect utility info from sellers — no back-and-forth.
              </p>
            </div>
            <button
              onClick={() => setShowNew(true)}
              style={{
                background: "#d97706",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "12px 20px",
                fontWeight: 800,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 6px 20px rgba(217,119,6,0.35)",
              }}
            >
              + Add Listing
            </button>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 14,
              marginBottom: 24,
            }}
          >
            {[
              {
                value: stats.total,
                label: "Total Listings",
                sub: "This month",
                accent: "#d97706",
              },
              {
                value: stats.submitted,
                label: "Sheets Complete",
                sub: "PDF ready to share",
                accent: "#22c55e",
              },
              {
                value: stats.pending,
                label: "Awaiting Sellers",
                sub: "Sent or in progress",
                accent: "#3b82f6",
              },
              {
                value: stats.overdue,
                label: "Overdue",
                sub: "7+ days, no response",
                accent: "#ef4444",
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#fff",
                  border: "1px solid #ece8e1",
                  borderRadius: 16,
                  padding: "22px 24px",
                  borderTop: `3px solid ${s.accent}`,
                }}
              >
                <div
                  style={{
                    fontSize: 34,
                    fontWeight: 900,
                    color: "#1c1917",
                    fontFamily: "'Cormorant Garamond',Georgia,serif",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1c1917",
                    marginTop: 6,
                  }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: 11, color: "#a8a29e", marginTop: 2 }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Reusable link */}
          {agent?.intake_slug && (
            <div
              style={{
                background: "linear-gradient(135deg,#292524,#1c1917)",
                borderRadius: 14,
                padding: "18px 22px",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: 4,
                  }}
                >
                  Your Reusable Intake Link
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#fff",
                    fontFamily: "monospace",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 7,
                    padding: "5px 12px",
                    display: "inline-block",
                  }}
                >
                  {APP_URL}/agent/{agent.intake_slug}
                </div>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${APP_URL}/agent/${agent.intake_slug}`,
                  );
                  setToast("🔗 Link copied!");
                }}
                style={{
                  background: "#d97706",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9,
                  padding: "10px 16px",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                }}
              >
                📋 Copy My Link
              </button>
            </div>
          )}

          {/* Filters */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 14,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, position: "relative", minWidth: 180 }}>
              <span
                style={{
                  position: "absolute",
                  left: 11,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 13,
                }}
              >
                🔍
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search address or seller…"
                style={{
                  width: "100%",
                  border: "1px solid #e7e5e4",
                  borderRadius: 9,
                  padding: "9px 12px 9px 32px",
                  fontSize: 13,
                  outline: "none",
                  fontFamily: "inherit",
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              />
            </div>
            {["all", "submitted", "in_progress", "sent", "overdue"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  background: filter === f ? "#1c1917" : "#fff",
                  color: filter === f ? "#fff" : "#78716c",
                  border: "1px solid",
                  borderColor: filter === f ? "#1c1917" : "#e7e5e4",
                  borderRadius: 9,
                  padding: "8px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                }}
              >
                {
                  {
                    all: "All",
                    submitted: "Submitted",
                    in_progress: "In Progress",
                    sent: "Sent",
                    overdue: "Overdue",
                  }[f]
                }
                {f !== "all" && (
                  <span
                    style={{
                      marginLeft: 5,
                      fontSize: 10,
                      background:
                        filter === f ? "rgba(255,255,255,0.15)" : "#f5f0eb",
                      borderRadius: 99,
                      padding: "1px 6px",
                    }}
                  >
                    {enriched.filter((l: any) => l.status === f).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Listings table */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #ece8e1",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "13px 22px",
                borderBottom: "1px solid #f5f0eb",
                background: "#faf9f7",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#a8a29e",
                }}
              >
                {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
              </span>
              {stats.overdue > 0 && (
                <span
                  style={{
                    fontSize: 11,
                    color: "#b91c1c",
                    fontWeight: 700,
                    background: "#fee2e2",
                    borderRadius: 99,
                    padding: "3px 10px",
                  }}
                >
                  ⚠ {stats.overdue} overdue
                </span>
              )}
            </div>
            {filtered.length === 0 ? (
              <div
                style={{
                  padding: "48px 24px",
                  textAlign: "center",
                  color: "#a8a29e",
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 10 }}>🏠</div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>
                  No listings found
                </div>
                <div style={{ fontSize: 13 }}>
                  {listings.length === 0
                    ? "Add your first listing to get started."
                    : "Try a different filter."}
                </div>
              </div>
            ) : (
              filtered.map((listing: any, i: any) => (
                <div
                  key={listing.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 12,
                    padding: "16px 22px",
                    borderBottom:
                      i < filtered.length - 1 ? "1px solid #f5f0eb" : "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#faf9f7")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 3,
                        borderRadius: 99,
                        background:
                          STATUS_STYLE[listing.status]?.dot || "#e2e8f0",
                        alignSelf: "stretch",
                        flexShrink: 0,
                        minHeight: 36,
                      }}
                    />
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 9,
                          flexWrap: "wrap",
                          marginBottom: 2,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#1c1917",
                            fontFamily: "'Cormorant Garamond',Georgia,serif",
                          }}
                        >
                          {listing.address}
                        </span>
                        <StatusBadge status={listing.status} />
                      </div>
                      <div style={{ fontSize: 12, color: "#a8a29e" }}>
                        {listing.city && `${listing.city} · `}Seller:{" "}
                        {listing.seller_name}
                        {listing.list_price && ` · ${listing.list_price}`}
                        {listing.mls_number && ` · MLS ${listing.mls_number}`}
                      </div>
                      <div
                        style={{ fontSize: 11, color: "#c4b9b0", marginTop: 2 }}
                      >
                        Sent{" "}
                        {new Date(listing.sent_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {listing.submitted_at &&
                          ` · Submitted ${new Date(listing.submitted_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", gap: 6, alignItems: "center" }}
                  >
                    <button
                      onClick={() => setViewListing(listing)}
                      style={{
                        background:
                          listing.status === "submitted"
                            ? "#f0fdf4"
                            : "#faf9f7",
                        color:
                          listing.status === "submitted"
                            ? "#15803d"
                            : "#78716c",
                        border: `1px solid ${listing.status === "submitted" ? "#bbf7d0" : "#e7e5e4"}`,
                        borderRadius: 8,
                        padding: "6px 12px",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      {listing.status === "submitted"
                        ? "📄 View Sheet"
                        : "👁 View"}
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${APP_URL}/seller/${listing.intake_token}`,
                        );
                        setToast("🔗 Seller link copied!");
                      }}
                      style={{
                        background: "#faf9f7",
                        color: "#78716c",
                        border: "1px solid #e7e5e4",
                        borderRadius: 8,
                        padding: "6px 12px",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      🔗
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {viewListing && (
        <SheetModal
          listing={viewListing}
          onClose={() => setViewListing(null)}
        />
      )}
      {showNew && (
        <NewListingModal
          onClose={() => setShowNew(false)}
          onAdd={handleAdd}
          saving={saving}
        />
      )}
      {toast && <Toast message={toast} onDone={() => setToast("")} />}
    </>
  );
}
