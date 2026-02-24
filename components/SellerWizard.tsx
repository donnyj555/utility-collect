import { useState, useEffect, useRef } from "react";

const UTILITY_STEPS = [
  {
    id: "electric",
    label: "Electric",
    icon: "⚡",
    color: "#FEF08A",
    question: "Who provides your electricity?",
    hint: "Check your electric bill or meter box",
  },
  {
    id: "gas",
    label: "Gas / Heating",
    icon: "🔥",
    color: "#FED7AA",
    question: "Who provides your natural gas?",
    hint: "Check your gas bill — or choose 'No Natural Gas' if it doesn't apply",
  },
  {
    id: "water",
    label: "Water",
    icon: "💧",
    color: "#BAE6FD",
    question: "Where does your water come from?",
    hint: "Check your water bill or well pump",
  },
  {
    id: "sewer",
    label: "Sewer / Septic",
    icon: "🔧",
    color: "#D9F99D",
    question: "How is waste water handled?",
    hint: "Check your municipal bill or property records",
  },
  {
    id: "trash",
    label: "Trash & Recycling",
    icon: "♻️",
    color: "#A7F3D0",
    question: "Who picks up your trash?",
    hint: "Check the sticker on your bin or your bill",
  },
  {
    id: "internet",
    label: "Internet / Cable",
    icon: "📡",
    color: "#E9D5FF",
    question: "Who provides your internet or cable?",
    hint: "Check your router label or monthly bill",
  },
  {
    id: "hoa",
    label: "HOA / Condo",
    icon: "🏘️",
    color: "#FECDD3",
    question: "Is there an HOA or condo association?",
    hint: "Check your deed or closing documents",
  },
  {
    id: "oil",
    label: "Oil / Propane",
    icon: "🛢️",
    color: "#FDE68A",
    question: "Do you use heating oil or propane?",
    hint: "Look for a tank in the basement or yard",
  },
];

// Shown while API loads, and as fallback if API call fails
const STATIC_PROVIDERS: any = {
  electric: [
    "PPL Electric Utilities",
    "PECO Energy",
    "Met-Ed (FirstEnergy)",
    "Duquesne Light",
    "West Penn Power",
  ],
  gas: [
    "UGI Utilities",
    "Peoples Natural Gas",
    "Columbia Gas of PA",
    "National Fuel Gas",
  ],
  water: [
    "Pennsylvania American Water",
    "Aqua Pennsylvania",
    "Municipal Water Authority",
    "Private Well / No Public Water",
  ],
  sewer: [
    "Municipal Sewer Authority",
    "Private Septic System",
    "Township Sewer",
    "City Sewer",
  ],
  trash: [
    "Republic Services",
    "Waste Management",
    "Municipal Collection (included in taxes)",
    "Private Hauler",
  ],
  internet: [
    "Comcast / Xfinity",
    "Verizon Fios",
    "Spectrum",
    "T-Mobile Home Internet",
    "Starlink",
    "No Service Available",
  ],
  hoa: [
    "Yes — HOA applies",
    "Yes — Condo / POA Association",
    "No HOA",
    "Not Sure",
  ],
  oil: [
    "Suburban Propane",
    "Ferrellgas",
    "AmeriGas",
    "Local Oil Dealer",
    "UGI Hearth & Home",
    "Not Applicable",
  ],
};

// These options always appear regardless of what Google Places returns
const ALWAYS_INCLUDE: any = {
  gas: [
    "No Natural Gas / Oil Heat",
    "No Natural Gas / Electric Heat",
    "No Natural Gas / Propane Only",
  ],
  water: ["Private Well / No Public Water"],
  sewer: ["Private Septic System"],
  oil: ["Not Applicable"],
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function useTypewriter(text: any, speed = 25) {
  const [d, setD] = useState("");
  useEffect(() => {
    setD("");
    let i = 0;
    const t = setInterval(() => {
      setD(text.slice(0, ++i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text]);
  return d;
}

function ProgressBar({ current, total }: any) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        marginBottom: 26,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: i === current ? 3 : 1,
            height: 5,
            borderRadius: 99,
            background:
              i < current ? "#1c1917" : i === current ? "#d97706" : "#e7e5e4",
            transition: "all 0.4s ease",
          }}
        />
      ))}
      <span
        style={{
          fontSize: 11,
          color: "#a8a29e",
          whiteSpace: "nowrap",
          marginLeft: 4,
        }}
      >
        {current + 1}/{total}
      </span>
    </div>
  );
}

function Chip({ label, selected, onClick }: any) {
  return (
    <button
      onClick={onClick}
      style={{
        border: `2px solid ${selected ? "#d97706" : "#e7e5e4"}`,
        background: selected ? "#d97706" : "#fff",
        color: selected ? "#fff" : "#374151",
        borderRadius: 10,
        padding: "8px 14px",
        fontSize: 13,
        fontWeight: selected ? 700 : 500,
        cursor: "pointer",
        transition: "all 0.15s",
        transform: selected ? "scale(1.03)" : "scale(1)",
        boxShadow: selected ? "0 4px 12px rgba(217,119,6,0.25)" : "none",
        fontFamily: "inherit",
      }}
    >
      {selected ? "✓ " : ""}
      {label}
    </button>
  );
}

// ── Address Screen ────────────────────────────────────────────────────────────
function AddressScreen({ onNext }: any) {
  const [address, setAddress] = useState("");
  const [focused, setFocused] = useState(false);
  const ph = useTypewriter("123 Maple Street, Philadelphia, PA 19103", 40);

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          background: "#fffbeb",
          borderRadius: 99,
          padding: "5px 13px",
          marginBottom: 18,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#d97706",
            display: "inline-block",
            animation: "pulse 2s infinite",
          }}
        />
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: "#d97706",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Utility Info Request
        </span>
      </div>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: "#1c1917",
          margin: "0 0 10px",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          lineHeight: 1.2,
        }}
      >
        What's the
        <br />
        property address?
      </h1>
      <p
        style={{
          color: "#78716c",
          fontSize: 14,
          marginBottom: 26,
          lineHeight: 1.7,
        }}
      >
        Takes about <strong style={{ color: "#1c1917" }}>2 minutes</strong>. No
        account needed.
        <br />
        We find real local providers near your address.
      </p>
      <div style={{ position: "relative", marginBottom: 12 }}>
        <span
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 17,
          }}
        >
          📍
        </span>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={ph || "Enter full property address..."}
          style={{
            width: "100%",
            border: `2px solid ${focused ? "#d97706" : "#e7e5e4"}`,
            borderRadius: 12,
            padding: "14px 14px 14px 44px",
            fontSize: 15,
            boxSizing: "border-box",
            outline: "none",
            transition: "all 0.2s",
            fontFamily: "inherit",
            background: "#faf9f7",
            boxShadow: focused ? "0 0 0 4px rgba(217,119,6,0.1)" : "none",
          }}
        />
      </div>
      <button
        onClick={() => address.trim() && onNext(address)}
        disabled={!address.trim()}
        style={{
          width: "100%",
          background: address.trim() ? "#1c1917" : "#e7e5e4",
          color: address.trim() ? "#fff" : "#a8a29e",
          border: "none",
          borderRadius: 12,
          padding: "14px",
          fontWeight: 800,
          fontSize: 15,
          cursor: address.trim() ? "pointer" : "default",
          transition: "all 0.2s",
          fontFamily: "inherit",
          boxShadow: address.trim() ? "0 8px 24px rgba(28,25,23,0.18)" : "none",
        }}
      >
        Find My Providers →
      </button>
    </div>
  );
}

// ── Utility Step ──────────────────────────────────────────────────────────────
function UtilityStep({
  util,
  stepIndex,
  totalSteps,
  onNext,
  onBack,
  selections,
  setSelections,
  address,
}: any) {
  const [providers, setProviders] = useState(STATIC_PROVIDERS[util.id] || []);
  const [loading, setLoading] = useState(false);
  const [isLocal, setIsLocal] = useState(false);
  const [custom, setCustom] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const fetched = useRef(false);
  const selected = selections[util.id];
  const typed = useTypewriter(util.question, 22);

  useEffect(() => {
    if (!address || util.id === "hoa" || fetched.current) return;
    fetched.current = true;
    setLoading(true);
    fetch(
      `/api/providers?utilityType=${encodeURIComponent(util.id)}&address=${encodeURIComponent(address)}`,
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.providers?.length > 0) {
          const always = ALWAYS_INCLUDE[util.id] || [];
          const merged = [...new Set([...data.providers, ...always])];
          setProviders(merged);
          setIsLocal(data.source === "google_places");
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [util.id, address]);

  // Build display list — merge providers + always-include options, remove duplicates
  const always = ALWAYS_INCLUDE[util.id] || [];
  const displayList = [...new Set([...providers, ...always])];

  return (
    <div style={{ animation: "fadeUp 0.35s ease both" }}>
      <ProgressBar current={stepIndex} total={totalSteps} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 14,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: util.color + "88",
            borderRadius: 10,
            padding: "6px 13px",
          }}
        >
          <span style={{ fontSize: 17 }}>{util.icon}</span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: "#1c1917",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
            }}
          >
            {util.label}
          </span>
        </div>
        {loading && (
          <span style={{ fontSize: 11, color: "#a8a29e" }}>
            ⏳ Finding local providers…
          </span>
        )}
        {!loading && isLocal && (
          <span
            style={{
              fontSize: 11,
              color: "#15803d",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: 99,
              padding: "2px 9px",
            }}
          >
            📍 Local results
          </span>
        )}
      </div>

      <h2
        style={{
          fontSize: 23,
          fontWeight: 800,
          color: "#1c1917",
          margin: "0 0 5px",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          minHeight: 56,
          lineHeight: 1.25,
        }}
      >
        {typed}
      </h2>
      <p style={{ color: "#a8a29e", fontSize: 12, marginBottom: 18 }}>
        💡 {util.hint}
      </p>

      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 12 }}
      >
        {displayList.map((p) => (
          <Chip
            key={p}
            label={p}
            selected={selected === p}
            onClick={() => {
              setSelections((s: any) => ({ ...s, [util.id]: p }));
              setCustom("");
              setShowCustom(false);
            }}
          />
        ))}
        <Chip
          label="Not Sure"
          selected={selected === "Not Sure"}
          onClick={() => {
            setSelections((s: any) => ({ ...s, [util.id]: "Not Sure" }));
            setCustom("");
            setShowCustom(false);
          }}
        />
      </div>

      {!showCustom ? (
        <button
          onClick={() => setShowCustom(true)}
          style={{
            background: "none",
            border: "1px dashed #d4cfc9",
            borderRadius: 9,
            padding: "7px 13px",
            fontSize: 12,
            color: "#78716c",
            cursor: "pointer",
            fontFamily: "inherit",
            marginBottom: 18,
          }}
        >
          ✏️ My provider isn't listed
        </button>
      ) : (
        <div style={{ display: "flex", gap: 7, marginBottom: 18 }}>
          <input
            autoFocus
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              custom.trim() &&
              setSelections((s: any) => ({ ...s, [util.id]: custom.trim() }))
            }
            placeholder="Type exact provider name..."
            style={{
              flex: 1,
              border: "2px solid #d97706",
              borderRadius: 9,
              padding: "9px 12px",
              fontSize: 13,
              outline: "none",
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={() =>
              custom.trim() &&
              setSelections((s: any) => ({ ...s, [util.id]: custom.trim() }))
            }
            style={{
              background: "#d97706",
              color: "#fff",
              border: "none",
              borderRadius: 9,
              padding: "9px 14px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ✓
          </button>
        </div>
      )}

      {selected && (
        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>✅</span>
          <div>
            <div
              style={{
                fontSize: 10,
                color: "#15803d",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              Selected
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#166534" }}>
              {selected}
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 8 }}>
        {stepIndex > 0 && (
          <button
            onClick={onBack}
            style={{
              flex: 1,
              background: "#faf9f7",
              color: "#78716c",
              border: "1px solid #e7e5e4",
              borderRadius: 11,
              padding: "12px",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            ← Back
          </button>
        )}
        <button
          onClick={onNext}
          style={{
            flex: 3,
            background: selected ? "#1c1917" : "#e7e5e4",
            color: selected ? "#fff" : "#a8a29e",
            border: "none",
            borderRadius: 11,
            padding: "12px",
            fontWeight: 800,
            fontSize: 14,
            cursor: selected ? "pointer" : "default",
            transition: "all 0.2s",
            fontFamily: "inherit",
            boxShadow: selected ? "0 6px 20px rgba(28,25,23,0.18)" : "none",
          }}
        >
          {stepIndex === totalSteps - 1 ? "Review & Submit →" : "Next →"}
        </button>
      </div>
      {!selected && (
        <button
          onClick={onNext}
          style={{
            width: "100%",
            marginTop: 8,
            background: "none",
            border: "none",
            color: "#a8a29e",
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Skip this utility
        </button>
      )}
    </div>
  );
}

// ── Review Screen ─────────────────────────────────────────────────────────────
function ReviewScreen({
  address,
  selections,
  onEdit,
  onSubmit,
  submitting,
}: any) {
  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: "#1c1917",
          margin: "0 0 4px",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}
      >
        Everything look right?
      </h2>
      <p
        style={{
          color: "#78716c",
          fontSize: 13,
          marginTop: 0,
          marginBottom: 18,
        }}
      >
        📍 {address}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 7,
          marginBottom: 20,
        }}
      >
        {UTILITY_STEPS.map((util, i) => {
          const val = selections[util.id];
          return (
            <div
              key={util.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: val ? "#fff" : "#faf9f7",
                border: `1px solid ${val ? "#e7e5e4" : "#f0ebe4"}`,
                borderRadius: 11,
                padding: "10px 14px",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 15 }}>{util.icon}</span>
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "#a8a29e",
                    }}
                  >
                    {util.label}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: val ? "#1c1917" : "#d4cfc9",
                    }}
                  >
                    {val || "Not provided"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => onEdit(i)}
                style={{
                  background: "none",
                  border: "1px solid #e7e5e4",
                  borderRadius: 7,
                  padding: "4px 10px",
                  fontSize: 11,
                  color: "#78716c",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>
      <button
        onClick={onSubmit}
        disabled={submitting}
        style={{
          width: "100%",
          background: submitting
            ? "#a8a29e"
            : "linear-gradient(135deg,#d97706,#b45309)",
          color: "#fff",
          border: "none",
          borderRadius: 13,
          padding: "15px",
          fontWeight: 800,
          fontSize: 15,
          cursor: submitting ? "default" : "pointer",
          fontFamily: "inherit",
          boxShadow: submitting ? "none" : "0 8px 28px rgba(217,119,6,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {submitting ? (
          <>⏳ Sending to your agent…</>
        ) : (
          "✅ Submit & Notify Agent"
        )}
      </button>
      <p
        style={{
          textAlign: "center",
          fontSize: 11,
          color: "#a8a29e",
          marginTop: 8,
        }}
      >
        Your agent receives the full utility sheet instantly.
      </p>
    </div>
  );
}

// ── Success Screen ────────────────────────────────────────────────────────────
function SuccessScreen({ address, selections, emailSent, emailError }: any) {
  return (
    <div style={{ textAlign: "center", animation: "fadeUp 0.5s ease both" }}>
      <div style={{ fontSize: 60, marginBottom: 12 }}>🎉</div>
      <h2
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: "#1c1917",
          margin: "0 0 8px",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}
      >
        All done!
      </h2>
      <p
        style={{
          color: "#78716c",
          fontSize: 14,
          marginBottom: 24,
          lineHeight: 1.7,
        }}
      >
        Your agent has been notified with the full utility sheet.
      </p>
      {emailSent ? (
        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
            textAlign: "left",
          }}
        >
          <span style={{ fontSize: 20 }}>📧</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#15803d" }}>
              Email sent to your agent!
            </div>
            <div style={{ fontSize: 12, color: "#166534" }}>
              They have the full utility sheet in their inbox now.
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 16,
            textAlign: "left",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: "#dc2626" }}>
            ⚠️ Email could not send
          </div>
          <div style={{ fontSize: 12, color: "#991b1b", marginTop: 3 }}>
            {emailError || "Please contact your agent directly."}
          </div>
        </div>
      )}
      <div
        style={{
          background: "linear-gradient(135deg,#1c1917,#292524)",
          borderRadius: 16,
          padding: 22,
          textAlign: "left",
        }}
      >
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
          Your Utility Sheet
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 14,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          {address}
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          {UTILITY_STEPS.map((u) => (
            <div
              key={u.id}
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: 9,
                padding: "9px 11px",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.4)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: 2,
                }}
              >
                {u.icon} {u.label}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: selections[u.id] ? "#fff" : "rgba(255,255,255,0.2)",
                }}
              >
                {selections[u.id] || "—"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function SellerWizard({ token }: { token: string }) {
  const [screen, setScreen] = useState("address");
  const [address, setAddress] = useState("");
  const [utilIndex, setUtilIndex] = useState(0);
  const [selections, setSelections] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [agentEmail, setAgentEmail] = useState("");
  const [agentName, setAgentName] = useState("");
  const [loadingAgent, setLoadingAgent] = useState(true);

  useEffect(() => {
    async function fetchAgent() {
      try {
        const res = await fetch(`/api/get-agent?token=${token}`);
        const data = await res.json();

        console.log("data", data);

        if (data.success) {
          setAgentEmail(data.agent.email);
          setAgentName(data.agent.full_name);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingAgent(false);
      }
    }

    fetchAgent();
  }, [token]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentEmail,
          agentName,
          propertyAddress: address,
          submittedDate: new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          utilities: selections,
        }),
      });
      const data = await res.json();
      if (data.success) setEmailSent(true);
      else setEmailError(data.error || "Unknown error");
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "Unknown error");
    }
    setSubmitting(false);
    setScreen("success");
  };

  if (loadingAgent) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        *{box-sizing:border-box} body{margin:0}
      `}</style>
      <div
        style={{
          minHeight: "100vh",
          background:
            screen === "success"
              ? "linear-gradient(135deg,#fffbeb,#fef3c7)"
              : "linear-gradient(160deg,#faf9f7,#f5f0eb)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 480,
            background: "#fff",
            borderRadius: 22,
            padding: "36px 32px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >
          {screen === "address" && (
            <AddressScreen
              onNext={(a: any) => {
                setAddress(a);
                setUtilIndex(0);
                setScreen("utility");
              }}
            />
          )}
          {screen === "utility" && (
            <UtilityStep
              util={UTILITY_STEPS[utilIndex]}
              stepIndex={utilIndex}
              totalSteps={UTILITY_STEPS.length}
              selections={selections}
              setSelections={setSelections}
              address={address}
              onNext={() =>
                utilIndex < UTILITY_STEPS.length - 1
                  ? setUtilIndex((i) => i + 1)
                  : setScreen("review")
              }
              onBack={() =>
                utilIndex > 0
                  ? setUtilIndex((i) => i - 1)
                  : setScreen("address")
              }
            />
          )}
          {screen === "review" && (
            <ReviewScreen
              address={address}
              selections={selections}
              submitting={submitting}
              onEdit={(i: number) => {
                setUtilIndex(i);
                setScreen("utility");
              }}
              onSubmit={handleSubmit}
            />
          )}
          {screen === "success" && (
            <SuccessScreen
              address={address}
              selections={selections}
              emailSent={emailSent}
              emailError={emailError}
            />
          )}
        </div>
      </div>
    </>
  );
}
