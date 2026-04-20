import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VivaRoom() {
  const location = useLocation();
  const navigate = useNavigate();

  const topic = location.state?.topic;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");

  // 🔹 Static fallback questions
  const questionBank = {
    "React Hooks": [
      "What is useState?",
      "What is useEffect?",
      "Difference between state and props?",
    ],
    default: [
      "Explain the topic briefly",
      "What are key concepts?",
      "Give a real-world example",
    ],
  };

  useEffect(() => {
    if (!topic) {
      navigate("/dashboard");
      return;
    }

    // pick questions
    const selected =
      questionBank[topic] || questionBank["default"];

    setQuestions(selected);
  }, [topic]);

  const handleNext = () => {
    if (!currentAnswer.trim()) {
      alert("Please enter an answer");
      return;
    }

    const updatedAnswers = [...answers, currentAnswer];
    setAnswers(updatedAnswers);
    setCurrentAnswer("");

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // navigate to result page
      navigate("/result", {
        state: {
          questions,
          answers: updatedAnswers,
          topic,
        },
      });
    }
  };

  if (questions.length === 0) {
    return <p className="text-center mt-10">Loading questions...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">

        {/* Header */}
        <h2 className="text-xl font-semibold mb-2">
          Viva on: {topic}
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Question {currentIndex + 1} of {questions.length}
        </p>

        {/* Question */}
        <div className="mb-4">
          <p className="text-lg font-medium">
            {questions[currentIndex]}
          </p>
        </div>

        {/* Answer Input */}
        <textarea
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full border rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {currentIndex + 1 === questions.length
            ? "Finish Viva"
            : "Next Question"}
        </button>

      </div>
    </div>
  );
}