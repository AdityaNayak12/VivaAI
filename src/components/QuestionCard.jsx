/**
 * Displays the current viva question with topic, progress, and a progress bar.
 */
export default function QuestionCard({ question, currentIndex, total, topic }) {
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div style={{ marginBottom: 24 }}>
      {/* Topic + progress */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="glow-dot" />
          <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
            {topic.toUpperCase()}
          </span>
        </div>
        <span style={{ fontSize: "0.8rem", color: "var(--text-subtle)" }}>
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{
        height: 3,
        background: "var(--glass-border)",
        borderRadius: 999,
        marginBottom: 28,
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: "var(--gradient)",
          borderRadius: 999,
          transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }} />
      </div>

      {/* Question */}
      <p style={{
        fontSize: "1.15rem",
        fontWeight: 500,
        lineHeight: 1.6,
        color: "var(--text)",
      }}>
        {question}
      </p>
    </div>
  );
}
