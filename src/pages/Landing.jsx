import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "⚡",
    title: "AI-Generated Questions",
    desc: "Get 3 sharp, topic-specific viva questions instantly powered by state-of-the-art LLMs.",
  },
  {
    icon: "🎯",
    title: "Instant Scoring",
    desc: "Your answers are evaluated against key concepts the moment you finish — no waiting.",
  },
  {
    icon: "📈",
    title: "Session History",
    desc: "Track total vivas, average scores, and your most-practiced topics across sessions.",
  },
  {
    icon: "🔐",
    title: "Secure & Private",
    desc: "Sign in with Google or email. Your sessions are stored privately in your account.",
  },
];

const steps = [
  { num: "01", title: "Pick a topic", desc: "Enter any subject — from React Hooks to Thermodynamics." },
  { num: "02", title: "Answer questions", desc: "The AI presents 3 oral-style questions one at a time." },
  { num: "03", title: "Get your score", desc: "Keyword-based scoring gives you instant, objective feedback." },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── Nav ─────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 clamp(24px, 5vw, 80px)",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(7, 7, 17, 0.70)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--glass-border)",
      }}>
        <span style={{ fontWeight: 700, fontSize: "1.2rem", letterSpacing: "0.05em" }}>
          <span className="gradient-text">Viva</span>
          <span style={{ color: "var(--text)" }}>AI</span>
        </span>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn-ghost" style={{ padding: "8px 20px" }} onClick={() => navigate("/login")}>
            Log in
          </button>
          <button className="btn-primary" style={{ padding: "8px 20px" }} onClick={() => navigate("/login")}>
            Get Started
          </button>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: "100px clamp(24px, 5vw, 80px) 80px",
      }}>
        {/* Badge */}
        <div className="fade-up-1" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "var(--accent-dim)",
          border: "1px solid rgba(124,111,255,0.25)",
          borderRadius: 999,
          padding: "6px 16px",
          marginBottom: 32,
          fontSize: "0.82rem",
          fontWeight: 500,
          color: "var(--accent-2)",
          letterSpacing: "0.04em",
        }}>
          <span className="glow-dot" />
          AI-Powered Oral Exam Practice
        </div>

        {/* Headline */}
        <h1 className="fade-up-2" style={{
          fontSize: "clamp(2.6rem, 6vw, 5rem)",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          maxWidth: 780,
          marginBottom: 24,
        }}>
          Ace every viva with{" "}
          <span className="gradient-text">AI precision</span>
        </h1>

        {/* Sub */}
        <p className="fade-up-3" style={{
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          color: "var(--text-muted)",
          maxWidth: 540,
          lineHeight: 1.7,
          marginBottom: 44,
        }}>
          Practice oral exams on any topic. Get AI-generated questions, type your answers,
          and receive instant objective scoring — all in minutes.
        </p>

        {/* CTA */}
        <div className="fade-up-4" style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-primary" style={{ padding: "14px 36px", fontSize: "1rem" }} onClick={() => navigate("/login")}>
            Start practising free →
          </button>
          <button className="btn-ghost" style={{ padding: "14px 36px", fontSize: "1rem" }}
            onClick={() => document.getElementById("how-it-works").scrollIntoView({ behavior: "smooth" })}>
            How it works
          </button>
        </div>

        {/* Hero Card Preview */}
        <div className="fade-up-4 glass card-hover" style={{
          marginTop: 72,
          padding: "28px 32px",
          width: "100%",
          maxWidth: 560,
          textAlign: "left",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span className="glow-dot" />
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", letterSpacing: "0.05em", fontWeight: 500 }}>
              LIVE SESSION · React Hooks
            </span>
            <span style={{ marginLeft: "auto", fontSize: "0.78rem", color: "var(--text-subtle)" }}>Q 2 of 3</span>
          </div>
          <p style={{ fontSize: "1.05rem", fontWeight: 500, color: "var(--text)", marginBottom: 14, lineHeight: 1.5 }}>
            Explain the difference between <code style={{ color: "var(--accent-2)", background: "var(--accent-dim)", padding: "1px 6px", borderRadius: 4 }}>useEffect</code> and <code style={{ color: "var(--accent-2)", background: "var(--accent-dim)", padding: "1px 6px", borderRadius: 4 }}>useLayoutEffect</code>, and when would you use each?
          </p>
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--glass-border)",
            borderRadius: 8,
            padding: "12px 14px",
            color: "var(--text-muted)",
            fontSize: "0.9rem",
            fontStyle: "italic",
            lineHeight: 1.6,
          }}>
            "useEffect runs after paint, making it non-blocking. useLayoutEffect fires synchronously after DOM mutations, useful for measurements..."
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button className="btn-primary" style={{ padding: "8px 22px", fontSize: "0.88rem" }}>Next →</button>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────── */}
      <section style={{
        padding: "100px clamp(24px, 5vw, 80px)",
        maxWidth: 1100,
        margin: "0 auto",
      }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p style={{ color: "var(--accent-2)", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: 12 }}>FEATURES</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Everything you need to prepare
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
        }}>
          {features.map((f, i) => (
            <div key={i} className="glass card-hover" style={{ padding: "28px 24px" }}>
              <div style={{
                width: 44, height: 44,
                background: "var(--accent-dim)",
                border: "1px solid rgba(124,111,255,0.20)",
                borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.3rem",
                marginBottom: 18,
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 600, fontSize: "1rem", marginBottom: 8, color: "var(--text)" }}>{f.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section id="how-it-works" style={{
        padding: "100px clamp(24px, 5vw, 80px)",
        maxWidth: 860,
        margin: "0 auto",
        textAlign: "center",
      }}>
        <p style={{ color: "var(--accent-2)", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: 12 }}>HOW IT WORKS</p>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 60 }}>
          Three steps to mastery
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, textAlign: "left" }}>
          {steps.map((s, i) => (
            <div key={i} className="glass card-hover" style={{
              padding: "26px 28px",
              display: "flex",
              alignItems: "flex-start",
              gap: 24,
            }}>
              <span style={{
                fontSize: "2rem",
                fontWeight: 800,
                color: "var(--accent)",
                opacity: 0.4,
                lineHeight: 1,
                minWidth: 44,
              }}>{s.num}</span>
              <div>
                <h3 style={{ fontWeight: 600, fontSize: "1.05rem", marginBottom: 6 }}>{s.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────── */}
      <section style={{ padding: "80px clamp(24px, 5vw, 80px) 120px" }}>
        <div className="glass-elevated" style={{
          maxWidth: 700,
          margin: "0 auto",
          padding: "60px 48px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Glow blob behind */}
          <div style={{
            position: "absolute",
            width: 320, height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,111,255,0.18) 0%, transparent 70%)",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }} />
          <h2 style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 16,
            position: "relative",
          }}>
            Ready to ace your next viva?
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: 36, lineHeight: 1.7, position: "relative" }}>
            Join students who use VivaAI to prepare smarter and walk in with confidence.
          </p>
          <button
            className="btn-primary"
            style={{ padding: "14px 44px", fontSize: "1rem", position: "relative" }}
            onClick={() => navigate("/login")}
          >
            Get started — it's free
          </button>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer style={{
        textAlign: "center",
        padding: "28px 24px",
        borderTop: "1px solid var(--glass-border)",
        color: "var(--text-subtle)",
        fontSize: "0.82rem",
      }}>
        © {new Date().getFullYear()} VivaAI · Built by Aditya Nayak
      </footer>

    </div>
  );
}
