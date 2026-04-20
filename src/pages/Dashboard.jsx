import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchUserSessions, computeStats } from "../services/dbService";
import { getDisplayName } from "../utils/getDisplayName";

export default function Dashboard() {
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalVivas: 0, avgScore: "—", lastTopic: "—" });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const sessions = await fetchUserSessions(user.uid);
        setStats(computeStats(sessions));
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoadingStats(false);
      }
    };
    if (user) loadStats();
  }, [user]);

  const handleStart = () => {
    if (!topic.trim()) return;
    navigate("/viva", { state: { topic } });
  };

  const statCards = [
    { label: "Total Vivas", value: loadingStats ? "…" : stats.totalVivas, icon: "🎓" },
    { label: "Avg Score",   value: loadingStats ? "…" : stats.avgScore,   icon: "📊" },
    { label: "Last Topic",  value: loadingStats ? "…" : stats.lastTopic,  icon: "📝", small: true },
  ];

  return (
    <div style={{ minHeight: "calc(100vh - 60px)", padding: "48px clamp(20px, 5vw, 60px)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div className="fade-up-1" style={{ marginBottom: 44 }}>
          <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 6 }}>
            Good to see you, {getDisplayName(user)} 👋
          </h1>
        </div>

        {/* Stats */}
        <div className="fade-up-2" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 44,
        }}>
          {statCards.map((s, i) => (
            <div key={i} className="glass card-hover" style={{ padding: "22px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span>{s.icon}</span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500, letterSpacing: "0.04em" }}>
                  {s.label.toUpperCase()}
                </span>
              </div>
              <div style={{
                fontSize: s.small ? "1.1rem" : "2rem",
                fontWeight: 700,
                color: "var(--text)",
                lineHeight: 1.2,
                wordBreak: "break-word",
              }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Start card */}
        <div className="glass-elevated fade-up-3" style={{ padding: "40px 36px", maxWidth: 520, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span className="glow-dot" />
            <h2 style={{ fontSize: "1.15rem", fontWeight: 600 }}>Start a new viva</h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: 24 }}>
            Enter any topic and the AI will generate 3 targeted questions for you.
          </p>
          <input
            type="text"
            placeholder="e.g. React Hooks, Thermodynamics, DBMS…"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
            style={{ marginBottom: 16 }}
          />
          <button
            onClick={handleStart}
            disabled={!topic.trim()}
            className="btn-primary"
            style={{ width: "100%", padding: "13px" }}
          >
            Generate questions →
          </button>
        </div>

      </div>
    </div>
  );
}