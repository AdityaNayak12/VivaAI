/**
 * Answer textarea with a dynamic submit button.
 */
export default function AnswerInput({ value, onChange, onSubmit, isLast }) {
  return (
    <div>
      <label style={{
        display: "block",
        fontSize: "0.8rem",
        fontWeight: 500,
        color: "var(--text-muted)",
        letterSpacing: "0.04em",
        marginBottom: 10,
      }}>
        YOUR ANSWER
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Type your answer here…"
        style={{
          height: 128,
          resize: "vertical",
          marginBottom: 16,
        }}
      />
      <button
        onClick={onSubmit}
        className="btn-primary"
        style={{ width: "100%", padding: "13px" }}
      >
        {isLast ? "Finish Viva ✓" : "Next question →"}
      </button>
    </div>
  );
}
