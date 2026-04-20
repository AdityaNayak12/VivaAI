import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { generateViva } from "../services/ai.Service";
import QuestionCard from "../components/QuestionCard";
import AnswerInput from "../components/AnswerInput";

export default function VivaRoom() {
  const location = useLocation();
  const navigate = useNavigate();
  const topic = location.state?.topic;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!topic) { navigate("/dashboard"); return; }

    const loadQuestions = async () => {
      setLoading(true);
      const data = await generateViva(topic);
      setQuestions(data);
      setLoading(false);
    };

    loadQuestions();
  }, [topic]);

  const handleNext = useCallback(() => {
    if (!currentAnswer.trim()) return;
    const updatedAnswers = [...answers, currentAnswer];
    setAnswers(updatedAnswers);
    setCurrentAnswer("");

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/result", { state: { questions, answers: updatedAnswers, topic } });
    }
  }, [currentAnswer, answers, currentIndex, questions, topic, navigate]);

  if (loading) {
    return (
      <div style={{
        minHeight: "calc(100vh - 60px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 16,
      }}>
        {/* Spinner */}
        <div style={{
          width: 44, height: 44,
          border: "3px solid var(--glass-border)",
          borderTop: "3px solid var(--accent)",
          borderRadius: "50%",
          animation: "spin 0.85s linear infinite",
        }} />
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Generating questions for <strong style={{ color: "var(--text)" }}>{topic}</strong>…
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "calc(100vh - 60px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px clamp(20px, 5vw, 48px)",
    }}>
      <div className="glass-elevated fade-up" style={{ width: "100%", maxWidth: 580, padding: "36px 36px" }}>
        <QuestionCard
          question={questions[currentIndex].question}
          currentIndex={currentIndex}
          total={questions.length}
          topic={topic}
        />
        <AnswerInput
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          onSubmit={handleNext}
          isLast={currentIndex + 1 === questions.length}
        />
      </div>
    </div>
  );
}