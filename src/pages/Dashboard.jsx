import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export default function Dashboard() {
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  //(replace later with Firestore)
  const stats = {
    totalVivas: 5,
    avgScore: 7.8,
    lastTopic: "React Hooks",
  };

  const handleStart = () => {
    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    navigate("/viva", { state: { topic } });
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">

      {/* Logout */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Welcome */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold">Welcome 👋</h1>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
        
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Total Vivas</p>
          <h2 className="text-2xl font-bold">{stats.totalVivas}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Average Score</p>
          <h2 className="text-2xl font-bold">{stats.avgScore}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Last Topic</p>
          <h2 className="text-lg font-medium">{stats.lastTopic}</h2>
        </div>

      </div>

      {/* 🔹 Main Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg mx-auto text-center">

        <h2 className="text-xl font-semibold mb-4">
          Start a New Viva
        </h2>

        <input
          type="text"
          placeholder="Enter topic (e.g., React Hooks)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button
          onClick={handleStart}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Start Viva
        </button>

      </div>

    </div>
  );
}