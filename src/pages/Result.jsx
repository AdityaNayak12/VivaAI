import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { evaluateAll } from "../utils/evaluate";
import { saveVivaSession } from "../services/dbService";

function ScoreBar({ score, max }) {
  const pct = max > 0 ? (score / max) * 100 : 0;
  const color = pct >= 66 ? "#4ade80" : pct >= 33 ? "#facc15" : "#f87171";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
      <div style={{
        flex: 1, height: 4,
        background: "var(--glass-border)",
        borderRadius: 999, overflow: "hidden",
      }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: color, borderRadius: 999,
          transition: "width 0.6s ease",
        }} />
      </div>
      <span style={{ fontSize: "0.82rem", color, fontWeight: 600, minWidth: 36, textAlign: "right" }}>
        {score}/{max}
      </span>
    </div>
  );
}
const MemoizedScoreBar = React.memo(ScoreBar);

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { questions = [], answers = [], topic } = location.state || {};
  const [scores, setScores] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const maxTotal = useMemo(() => questions.length > 0 ? questions.reduce((s, q) => s + q.keywords.length + 1, 0) : 0, [questions]);

  useEffect(() => {
    if (!questions.length || !answers.length) return;

    const { scores: computed, totalScore: total } = evaluateAll(answers, questions);
    setScores(computed);
    setTotalScore(total);

    saveVivaSession({
      userId: user.uid,
      email: user.email,
      topic, questions, answers,
      scores: computed, totalScore: total,
    }).catch((err) => console.error("Failed to save result:", err));
  }, []);

  if (!questions.length) {
    return (
      <div style={{ minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text-muted)" }}>No session data found.</p>
      </div>
    );
  }

  const pct = maxTotal > 0 ? Math.round((totalScore / maxTotal) * 100) : 0;
  const grade = pct >= 80 ? "Excellent" : pct >= 55 ? "Good" : pct >= 30 ? "Fair" : "Needs work";
  const gradeColor = pct >= 80 ? "#4ade80" : pct >= 55 ? "#a78bfa" : pct >= 30 ? "#facc15" : "#f87171";

  return (
    <div style={{ minHeight: "calc(100vh - 60px)", padding: "48px clamp(20px, 5vw, 60px)" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>

        {/* Score header */}
        <div className="glass-elevated fade-up-1" style={{
          padding: "36px 36px",
          textAlign: "center",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse 60% 80% at 50% 50%, ${gradeColor}18 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500, letterSpacing: "0.08em", marginBottom: 12 }}>
            SESSION COMPLETE · {topic?.toUpperCase()}
          </p>
          <div style={{
            fontSize: "4.5rem", fontWeight: 800, letterSpacing: "-0.04em",
            color: gradeColor, lineHeight: 1, marginBottom: 8,
          }}>
            {pct}<span style={{ fontSize: "2rem" }}>%</span>
          </div>
          <div style={{
            display: "inline-block",
            background: `${gradeColor}20`,
            border: `1px solid ${gradeColor}50`,
            color: gradeColor,
            borderRadius: 999,
            padding: "4px 16px",
            fontSize: "0.82rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}>
            {grade}
          </div>
        </div>

        {/* Q&A breakdown */}
        <div className="fade-up-2" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
          {questions.map((q, i) => {
            const maxQ = q.keywords.length + 1;
            return (
              <div key={i} className="glass card-hover" style={{ padding: "22px 24px" }}>
                <p style={{ fontSize: "0.78rem", color: "var(--text-subtle)", fontWeight: 500, marginBottom: 6, letterSpacing: "0.04em" }}>
                  QUESTION {i + 1}
                </p>
                <p style={{ fontWeight: 500, color: "var(--text)", marginBottom: 10, lineHeight: 1.5 }}>{q.question}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.6, fontStyle: "italic" }}>
                  "{answers[i]}"
                </p>
                <MemoizedScoreBar score={scores[i] || 0} max={maxQ} />
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="fade-up-3" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => navigate("/dashboard")} className="btn-ghost" style={{ padding: "11px 28px" }}>
            ← Dashboard
          </button>
          <button onClick={() => navigate("/viva", { state: { topic } })} className="btn-primary" style={{ padding: "11px 28px" }}>
            Try again
          </button>
        </div>

      </div>
    </div>
  );
}